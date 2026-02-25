
import { GoogleGenAI } from "@google/genai";
import { Message, Major, CareerVectorProfile } from "../types";
import { StudentProfile, SuitabilityResult } from "./aiEngine";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export class MentorService {
  private static SYSTEM_INSTRUCTION = `
    Bạn là "AI Mentor OrieMap" – cố vấn hướng nghiệp thông minh dành riêng cho học sinh THPT Việt Nam (lớp 10-12).
    
    PHONG CÁCH ĐỐI THOẠI:
    - Đồng hành & Thấu hiểu: Sử dụng ngôn ngữ gần gũi nhưng chuyên nghiệp.
    - Không áp đặt: Luôn đưa ra gợi ý dưới dạng "Dữ liệu cho thấy..." hoặc "Bạn có thể cân nhắc..." thay vì "Bạn phải...".
    - Dẫn chứng dữ liệu: Sử dụng điểm số, kết quả trắc nghiệm RIASEC và chỉ số Compatibility Score để làm căn cứ.
    
    NHIỆM VỤ CHÍNH:
    1. Phân tích hồ sơ: Kết hợp GPA, kỹ năng, sở thích và kết quả trắc nghiệm.
    2. Cảnh báo rủi ro: Nếu học sinh chọn ngành có điểm chuẩn quá cao so với năng lực hoặc không khớp với tính cách.
    3. Đề xuất lộ trình 3 năm: Chia nhỏ mục tiêu cho từng năm học (Lớp 10, 11, 12).
    4. Đạo đức nghề nghiệp: Khuyến khích sự tự khám phá, không thao túng quyết định, tôn trọng đam mê cá nhân.
    
    DỮ LIỆU ĐẦU VÀO BẠN SẼ NHẬN ĐƯỢC:
    - Hồ sơ học tập (GPA các môn).
    - Career Vector Profile (RIASEC, phong cách tư duy).
    - Kết quả Compatibility Score (nếu có).
    - Lịch sử trò chuyện (Memory).
  `;

  static async generateResponse(
    messages: Message[],
    context: {
      studentProfile: StudentProfile;
      careerProfile?: CareerVectorProfile;
      suitability?: SuitabilityResult;
      targetMajor?: Major;
    }
  ) {
    const model = "gemini-3-flash-preview";
    
    const contextPrompt = `
      HỒ SƠ HỌC SINH HIỆN TẠI:
      - GPA: ${JSON.stringify(context.studentProfile.grades)}
      - Điểm thi dự kiến: ${context.studentProfile.predictedExamScore}
      - Sở thích: ${context.studentProfile.interests.join(", ")}
      
      KẾT QUẢ TRẮC NGHIỆM AI (RIASEC):
      ${context.careerProfile ? JSON.stringify(context.careerProfile) : "Chưa thực hiện"}
      
      PHÂN TÍCH ĐỘ PHÙ HỢP (COMPATIBILITY):
      ${context.suitability ? `Ngành: ${context.targetMajor?.majorName}. Điểm: ${context.suitability.totalScore}/100. Phân loại: ${context.suitability.category}` : "Chưa phân tích ngành cụ thể"}
    `;

    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: this.SYSTEM_INSTRUCTION,
      },
    });

    // Gửi ngữ cảnh trước như một phần của cuộc hội thoại hoặc system instruction bổ sung
    const response = await chat.sendMessage({
      message: `${contextPrompt}\n\nCâu hỏi của học sinh: ${messages[messages.length - 1].text}`,
    });

    return response.text;
  }
}
