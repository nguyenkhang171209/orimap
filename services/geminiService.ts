
import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

/**
 * Gemini Service cho OrieMap
 * Sử dụng SDK chính thức @google/genai
 */

// Lấy API Key từ biến môi trường
// Trong môi trường AI Studio, sử dụng process.env.GEMINI_API_KEY
// Trong môi trường local Vite, sử dụng import.meta.env.VITE_GEMINI_API_KEY
const API_KEY = process.env.GEMINI_API_KEY || (import.meta.env?.VITE_GEMINI_API_KEY as string);

// System Instruction cho AI Mentor
const SYSTEM_INSTRUCTION = `
AI Mentor định hướng nghề nghiệp cho học sinh THPT Việt Nam.
Trả lời rõ ràng, dễ hiểu, có cấu trúc.
Khi chưa đủ thông tin, hãy hỏi lại học sinh để hiểu rõ sở thích, học lực và mong muốn.
Đưa gợi ý ngành học, trường học, lộ trình 3 năm THPT nếu cần.
Giọng văn thân thiện nhưng chuyên nghiệp, truyền cảm hứng.
Sử dụng dữ liệu về thị trường lao động và hệ thống giáo dục Việt Nam.
`;

/**
 * Hàm gửi tin nhắn và nhận phản hồi từ Gemini
 * @param history Lịch sử hội thoại
 * @param message Tin nhắn mới từ người dùng
 * @returns Phản hồi từ AI
 */
export const chatWithGemini = async (history: Message[], message: string): Promise<string> => {
  if (!API_KEY) {
    throw new Error("API Key không tồn tại. Vui lòng kiểm tra file .env");
  }

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    
    // Khởi tạo chat với lịch sử và system instruction
    // Lưu ý: Gemini 3 series hỗ trợ systemInstruction trực tiếp trong config
    const chat = ai.chats.create({
      model: "gemini-3-flash-preview", // Sử dụng model mới nhất thay cho gemini-1.5-flash (đã cũ)
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      // Chuyển đổi history sang định dạng Gemini yêu cầu nếu cần
      // Ở đây chúng ta sử dụng sendMessage trực tiếp, Gemini sẽ tự quản lý history nếu dùng chat object
      // Nhưng yêu cầu của user là gửi "full conversation history" mỗi lần
      // Thực tế sendMessage của chat object đã làm việc này.
    });

    // Nếu muốn gửi thủ công toàn bộ history mỗi lần:
    // const response = await ai.models.generateContent({
    //   model: "gemini-3-flash-preview",
    //   contents: [
    //     { role: "user", parts: [{ text: SYSTEM_INSTRUCTION }] },
    //     ...history.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
    //     { role: "user", parts: [{ text: message }] }
    //   ]
    // });

    const result = await chat.sendMessage({ message });
    return result.text || "Xin lỗi, tôi không thể trả lời lúc này.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
