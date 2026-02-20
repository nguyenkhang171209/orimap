import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { Message, Major } from "../types";

// Get API key from environment variables
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// Initialize the Gemini API client
const getAIClient = () => {
  return new GoogleGenAI({ apiKey: apiKey || "" });
};

const SYSTEM_INSTRUCTION = `Bạn là Orie Map Career Mentor - một Senior AI Engineer & Career Coach chuyên nghiệp dành cho học sinh THPT Việt Nam.
Phong cách: Thân thiện, dễ hiểu, không quá học thuật, hướng dẫn từng bước.

NHIỆM VỤ:
1. Tư vấn hướng nghiệp, chọn ngành, chọn trường.
2. Thiết kế lộ trình học tập 3 năm THPT.
3. Phân tích xu hướng nghề nghiệp.

QUY TẮC PHẢN HỒI:
- Luôn sử dụng Markdown đẹp: Tiêu đề (##), Bullet points, Bảng biểu, Icon phù hợp.
- Có phần "Tóm tắt nhanh" ở đầu và "Hành động tiếp theo" ở cuối.
- Nếu cần so sánh hoặc phân tích dữ liệu, hãy cung cấp dữ liệu biểu đồ.

ĐỊNH DẠNG ĐẦU RA:
Bạn phải trả về phản hồi theo cấu trúc sau:
---CONTENT---
[Nội dung Markdown ở đây]
---CHART---
[Dữ liệu JSON biểu đồ ở đây nếu có, nếu không thì để trống]
---END---

DỮ LIỆU BIỂU ĐỒ (JSON):
Nếu có biểu đồ, JSON phải tuân theo cấu trúc:
{
  "type": "chart",
  "chartType": "bar" | "radar" | "line" | "pie",
  "labels": ["A", "B", "C"],
  "data": [10, 20, 30],
  "title": "Tiêu đề biểu đồ"
}
Ví dụ: So sánh lương, So sánh độ phù hợp, Xu hướng tuyển dụng.`;

/**
 * AI Suggestion for Search
 */
export const getMajorSuggestions = async (searchTerm: string, majors: Major[]): Promise<{ id: string; reason: string }[]> => {
  try {
    const ai = getAIClient();
    const majorList = majors.map(m => ({ id: m.id, name: m.majorName, uni: m.university })).slice(0, 50);
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Dựa trên từ khóa tìm kiếm "${searchTerm}", hãy chọn ra tối đa 3 ngành học phù hợp nhất từ danh sách sau:
      ${JSON.stringify(majorList)}
      
      Trả về kết quả dưới dạng mảng JSON các đối tượng có id và reason (lý do ngắn gọn tại sao ngành này phù hợp, tối đa 15 từ).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              reason: { type: Type.STRING }
            },
            required: ["id", "reason"]
          }
        }
      }
    });

    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Error in getMajorSuggestions:", error);
    return [];
  }
};

/**
 * AI Roadmap Generation
 */
export const generateAIRoadmap = async (formData: any): Promise<any> => {
  try {
    const ai = getAIClient();
    const prompt = `Hãy tạo một lộ trình học tập chi tiết cho học sinh lớp ${formData.grade}, học lực ${formData.performance}, mục tiêu vào ngành ${formData.major} tại trường ${formData.school}.
    Lộ trình cần bao gồm:
    1. Các môn học trọng tâm cần tập trung.
    2. Các kỹ năng mềm cần rèn luyện.
    3. Các cột mốc quan trọng (Milestones) theo từng năm/kỳ học.
    4. Lời khuyên cá nhân hóa.
    5. Dữ liệu biểu đồ Radar về các kỹ năng cần thiết.
    
    Trả về kết quả dưới dạng JSON.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            focusSubjects: { type: Type.ARRAY, items: { type: Type.STRING } },
            softSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
            milestones: { 
              type: Type.ARRAY, 
              items: { 
                type: Type.OBJECT, 
                properties: {
                  time: { type: Type.STRING },
                  task: { type: Type.STRING }
                }
              } 
            },
            advice: { type: Type.STRING },
            chartData: {
              type: Type.OBJECT,
              properties: {
                labels: { type: Type.ARRAY, items: { type: Type.STRING } },
                data: { type: Type.ARRAY, items: { type: Type.NUMBER } }
              }
            }
          }
        }
      }
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Error in generateAIRoadmap:", error);
    throw error;
  }
};

/**
 * Career Mentor Chat (Streaming)
 */
export const chatWithMentorStream = async (history: Message[], input: string, onChunk: (chunk: string) => void) => {
  try {
    const ai = getAIClient();
    
    // Limit history to last 8 messages
    const limitedHistory = history.slice(-8).map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: limitedHistory
    });

    const result = await chat.sendMessageStream({ message: input });
    
    let fullText = "";
    for await (const chunk of result) {
      const text = (chunk as GenerateContentResponse).text || "";
      fullText += text;
      onChunk(fullText);
    }
    
    return fullText;
  } catch (error) {
    console.error("Error in chatWithMentorStream:", error);
    throw error;
  }
};

/**
 * Legacy support for non-streaming chat
 */
export const chatWithMentor = async (history: Message[], input: string): Promise<string> => {
  try {
    const ai = getAIClient();
    const limitedHistory = history.slice(-8).map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: limitedHistory
    });

    const response = await chat.sendMessage({ message: input });
    return response.text || "Tôi không thể trả lời lúc này.";
  } catch (error) {
    console.error("Error in chatWithMentor:", error);
    return "Xin lỗi, tôi gặp sự cố kết nối.";
  }
};
