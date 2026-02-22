import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const SYSTEM_INSTRUCTION = `Bạn là "AI Mentor OrieMap" – Chuyên gia tư vấn hướng nghiệp thông minh dành cho học sinh THPT Việt Nam (lớp 10-12).

PHONG CÁCH & THÁI ĐỘ:
- Thân thiện, chuyên nghiệp, truyền cảm hứng.
- Ngôn ngữ dễ hiểu, không quá học thuật.
- Luôn khuyến khích học sinh tự khám phá bản thân.

QUY TẮC PHẢN HỒI (MANDATORY):
1. Luôn sử dụng Markdown để định dạng câu trả lời:
   - Sử dụng tiêu đề lớn (##) cho các mục chính.
   - Sử dụng bullet points cho danh sách.
   - Sử dụng bảng (table) khi so sánh hoặc liệt kê thông tin chi tiết.
   - Sử dụng icon/emoji phù hợp để tăng tính trực quan.
2. Cấu trúc câu trả lời luôn bao gồm:
   - Một câu trả lời trực tiếp, ngắn gọn ở đầu.
   - Nội dung chi tiết được phân loại rõ ràng.
   - Phần "## 🎯 Tóm tắt nhanh" ở cuối.
   - Phần "## 🚀 Hành động tiếp theo" với các bước cụ thể.

TÍCH HỢP BIỂU ĐỒ (JSON DATA):
Khi người dùng yêu cầu hoặc khi cần thiết để minh họa cho:
- So sánh các ngành học/nghề nghiệp.
- So sánh các trường đại học.
- Lộ trình học tập (Timeline).
- Xu hướng nghề nghiệp trong tương lai.
- Phân tích điểm mạnh/kỹ năng cá nhân.

Bạn PHẢI trả về một khối JSON riêng biệt ở CUỐI câu trả lời (sau phần Markdown) theo định dạng sau:
\`\`\`json
{
  "type": "chart",
  "chartType": "radar" | "bar" | "line" | "pie",
  "title": "Tiêu đề biểu đồ",
  "labels": ["Nhãn 1", "Nhãn 2", ...],
  "data": [giá trị 1, giá trị 2, ...]
}
\`\`\`
Lưu ý: Chỉ trả về JSON nếu thực sự cần thiết để minh họa dữ liệu số hoặc so sánh.

LỘ TRÌNH THPT (TIMELINE):
Khi tư vấn lộ trình, hãy chia rõ:
- Lớp 10: Tập trung khám phá, xây dựng nền tảng.
- Lớp 11: Chọn khối thi, rèn luyện kỹ năng chuyên sâu.
- Lớp 12: Luyện thi, chọn trường và nộp hồ sơ.

THÔNG TIN TẠI VIỆT NAM:
- Ưu tiên gợi ý các trường đại học và xu hướng thị trường lao động tại Việt Nam.
- Cập nhật các phương thức tuyển sinh phổ biến (Xét học bạ, Đánh giá năng lực, IELTS...).

HÀNH ĐỘNG:
- Nếu thiếu thông tin (về sở thích, khối học, học lực), hãy đặt câu hỏi gợi mở.
- Không bịa đặt số liệu.
- Không giải thích nội bộ.`;

export interface ChartData {
  type: "chart";
  chartType: "radar" | "bar" | "line" | "pie";
  title: string;
  labels: string[];
  data: number[];
}

export interface ProcessedResponse {
  text: string;
  chart?: ChartData;
}

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
  }

  async *generateStream(message: string, history: { role: "user" | "model"; parts: { text: string }[] }[]) {
    // Keep only last 6-8 messages to optimize speed as requested
    const optimizedHistory = history.slice(-6);

    const responseStream = await this.ai.models.generateContentStream({
      model: "gemini-3-flash-preview",
      contents: [
        ...optimizedHistory,
        { role: "user", parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        topP: 0.95,
      },
    });

    for await (const chunk of responseStream) {
      yield chunk.text;
    }
  }

  static parseResponse(fullText: string): ProcessedResponse {
    const jsonRegex = /```json\s*([\s\S]*?)\s*```/g;
    let match;
    let chart: ChartData | undefined;
    let cleanText = fullText;

    while ((match = jsonRegex.exec(fullText)) !== null) {
      try {
        const parsed = JSON.parse(match[1]);
        if (parsed.type === "chart") {
          chart = parsed;
          // Remove the JSON block from the display text
          cleanText = cleanText.replace(match[0], "");
        }
      } catch (e) {
        console.error("Failed to parse chart JSON", e);
      }
    }

    return {
      text: cleanText.trim(),
      chart
    };
  }
}

export const geminiService = new GeminiService();
