
import { GoogleGenAI } from "@google/genai";

// Lấy API Key từ biến môi trường
// Lưu ý: Trong môi trường này, chúng ta sử dụng process.env.GEMINI_API_KEY theo hướng dẫn của hệ thống
const API_KEY = process.env.GEMINI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.error("Gemini API Key is missing! Please check your .env file.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export interface ChatMessage {
  role: "user" | "model";
  text: string;
}

/**
 * Gửi tin nhắn đến Gemini và nhận phản hồi
 * @param history Lịch sử hội thoại
 * @param message Tin nhắn mới của người dùng
 * @returns Phản hồi từ AI
 */
export const sendMessageToGemini = async (history: ChatMessage[], message: string) => {
  try {
    // Khởi tạo model với system instruction
    const model = "gemini-3-flash-preview"; // Sử dụng model mới nhất theo hướng dẫn
    
    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: "AI Mentor định hướng nghề nghiệp cho học sinh THPT Việt Nam. Trả lời rõ ràng, dễ hiểu, có cấu trúc. Khi chưa đủ thông tin, hãy hỏi lại học sinh. Đưa gợi ý ngành học, trường học, lộ trình 3 năm THPT nếu cần. Giọng văn thân thiện nhưng chuyên nghiệp.",
      },
      // Chuyển đổi lịch sử sang định dạng Gemini yêu cầu
      // Lưu ý: Gemini yêu cầu history là mảng các { role, parts: [{ text }] }
      history: history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }))
    });

    const result = await chat.sendMessage({ message });
    return result.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
};
