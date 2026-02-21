
import { GoogleGenAI } from "@google/genai";

/**
 * Interface for chat messages
 */
export interface ChatMessage {
  role: "user" | "model";
  text: string;
}

// Initialize Gemini AI
// Note: In this environment, we use process.env.GEMINI_API_KEY.
// For a standard Vite project, you would use import.meta.env.VITE_GEMINI_API_KEY.
const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
AI Mentor định hướng nghề nghiệp cho học sinh THPT Việt Nam.
Trả lời rõ ràng, dễ hiểu, có cấu trúc.
Khi chưa đủ thông tin, hãy hỏi lại học sinh.
Đưa gợi ý ngành học, trường học, lộ trình 3 năm THPT nếu cần.
Giọng văn thân thiện nhưng chuyên nghiệp.
Sử dụng dữ liệu về thị trường lao động và hệ thống giáo dục Việt Nam.
`;

/**
 * Sends a message to Gemini and returns the response
 * @param history Full conversation history
 * @param message Current user message
 */
export const chatWithGemini = async (history: ChatMessage[], message: string): Promise<string> => {
  try {
    // We use gemini-3-flash-preview as it's the latest and most efficient model for chat tasks
    const model = "gemini-3-flash-preview";
    
    // Create a chat session with history
    // We need to format history correctly for the SDK
    const formattedHistory = history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));

    const response = await genAI.models.generateContent({
      model,
      contents: [
        ...formattedHistory,
        { role: "user", parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
      }
    });

    return response.text || "Xin lỗi, tôi không thể trả lời lúc này.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Không thể kết nối với AI Mentor. Vui lòng kiểm tra API Key hoặc kết nối mạng.");
  }
};
