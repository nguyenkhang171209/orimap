
import { GoogleGenAI, Type } from "@google/genai";

export const generateAIRoadmap = async (data: any) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
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
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: 'Bạn là một chuyên gia tư vấn hướng nghiệp (Orie Map Career Mentor). Hãy tư vấn cho học sinh Việt Nam một cách thân thiện, thực tế và đầy cảm hứng. Hãy sử dụng dữ liệu thị trường lao động Việt Nam mới nhất.'
    }
  });

  const response = await chat.sendMessage({ message });
  return response.text;
};

export const getMajorSuggestions = async (query: string, availableMajors: any[]) => {
  if (!query || query.length < 2) return [];

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
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
