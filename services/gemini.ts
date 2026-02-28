
import { GoogleGenAI, Type } from "@google/genai";

export const generateAIRoadmap = async (data: any) => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const prompt = `Xây dựng lộ trình học tập cá nhân hóa cho học sinh lớp ${data.grade}, học lực ${data.performance}, mục tiêu ngành ${data.major} tại trường ${data.school}. 
  Hãy trả về một danh sách các giai đoạn quan trọng từ lớp 10 đến lớp 12 và đại học dưới định dạng JSON với các trường: year, goals (array), activities (array).`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            year: { type: Type.STRING },
            goals: { type: Type.ARRAY, items: { type: Type.STRING } },
            activities: { type: Type.ARRAY, items: { type: Type.STRING } }
          }
        }
      }
    }
  });

  return JSON.parse(response.text || '[]');
};

export const chatWithMentor = async (history: { role: string; text: string }[], message: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `Bạn là một chuyên gia tư vấn hướng nghiệp (Orie Map Career Mentor). 
      Hãy tư vấn cho học sinh Việt Nam một cách thân thiện, thực tế và đầy cảm hứng. 
      Sử dụng dữ liệu thị trường lao động Việt Nam mới nhất.
      
      QUAN TRỌNG: Khi tư vấn về một ngành học hoặc nghề nghiệp cụ thể, hãy LUÔN LUÔN chia câu trả lời thành 3 phần rõ rệt với các tiêu đề chính xác sau:
      ### 🎯 Phù hợp vì
      ### 📚 Lộ trình học
      ### 💼 Cơ hội nghề nghiệp
      
      Trong mỗi phần, hãy sử dụng các gạch đầu dòng (bullet points) ngắn gọn, súc tích. Tránh viết các đoạn văn dài dồn dập.

      BỔ SUNG: Nếu có thể so sánh các kỹ năng hoặc mức lương, hãy cung cấp một khối JSON ở cuối câu trả lời (bao quanh bởi thẻ <chart_data>) với định dạng:
      <chart_data>
      {
        "type": "bar" | "radar" | "pie",
        "title": "Tiêu đề biểu đồ",
        "data": [
          { "name": "Kỹ năng A", "value": 80 },
          { "name": "Kỹ năng B", "value": 65 }
        ]
      }
      </chart_data>`
    }
  });

  const response = await chat.sendMessage({ message });
  return response.text;
};

export const getMajorSuggestions = async (query: string, availableMajors: any[]) => {
  if (!query || query.length < 2) return [];

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const majorsList = availableMajors.map(m => `${m.id}: ${m.majorName} (${m.university})`).join('\n');
  
  const prompt = `Dựa trên danh sách ngành học bên dưới và câu hỏi của người dùng: "${query}", hãy gợi ý tối đa 5 ngành học phù hợp nhất.
  Trả về một mảng JSON chứa các object có trường "id" (phải khớp chính xác với ID trong danh sách) và "reason" (lý do ngắn gọn tại sao ngành này phù hợp, tối đa 10 từ).
  
  Danh sách ngành học:
  ${majorsList}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
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

    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error("AI Suggestions Error:", error);
    return [];
  }
};

export const getMajorInfoWithSearch = async (query: string) => {
  if (!query) return null;
  
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const prompt = `Tìm kiếm thông tin mới nhất về ngành học hoặc trường đại học sau tại Việt Nam: "${query}". 
  Hãy tóm tắt ngắn gọn (khoảng 3-4 câu) về cơ hội việc làm, mức lương trung bình, và xu hướng tuyển sinh mới nhất.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }]
      }
    });
    
    return {
      text: response.text,
      groundingChunks: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    console.error("Google Search Error:", error);
    return null;
  }
};
