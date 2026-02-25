
import { Major } from '../types';

export interface StudentProfile {
  grades: Record<string, number>; // e.g., { 'Toán': 8.5, 'Lý': 8.0, ... }
  skills: Record<string, number>; // e.g., { 'Logic': 90, 'Creative': 70, ... }
  interests: string[]; // e.g., ['Technology', 'Art']
  predictedExamScore: number;
}

export interface SuitabilityResult {
  totalScore: number;
  breakdown: {
    academic: number;
    skills: number;
    interests: number;
    trend: number;
    risk: number;
  };
  category: 'Phù hợp cao' | 'Phù hợp tiềm năng' | 'Cần cân nhắc';
  explanation: string;
}

export class OriMapAIEngine {
  private weights = {
    academic: 0.35,
    skills: 0.20,
    interests: 0.20,
    trend: 0.15,
    risk: 0.10
  };

  calculateSuitability(student: StudentProfile, major: Major): SuitabilityResult {
    const academic = this.calculateAcademicMatch(student, major);
    const skills = this.calculateSkillAlignment(student, major);
    const interests = this.calculateInterestFit(student, major);
    const trend = this.calculateTrendFactor(major);
    const risk = this.calculateRiskFactor(student, major);

    const totalScore = Math.round(
      academic * this.weights.academic +
      skills * this.weights.skills +
      interests * this.weights.interests +
      trend * this.weights.trend +
      risk * this.weights.risk
    );

    let category: SuitabilityResult['category'] = 'Cần cân nhắc';
    if (totalScore >= 80) category = 'Phù hợp cao';
    else if (totalScore >= 60) category = 'Phù hợp tiềm năng';

    const explanation = this.generateExplanation(totalScore, { academic, skills, interests, trend, risk }, major);

    return {
      totalScore,
      breakdown: { academic, skills, interests, trend, risk },
      category,
      explanation
    };
  }

  private calculateAcademicMatch(student: StudentProfile, major: Major): number {
    // Logic: Lấy điểm trung bình các môn trong tổ hợp xét tuyển
    const blockSubjects: Record<string, string[]> = {
      'A00': ['Toán', 'Lý', 'Hóa'],
      'A01': ['Toán', 'Lý', 'Anh'],
      'B00': ['Toán', 'Hóa', 'Sinh'],
      'C00': ['Văn', 'Sử', 'Địa'],
      'D01': ['Toán', 'Văn', 'Anh']
    };

    let bestMatch = 0;
    major.blocks.forEach(block => {
      const subjects = blockSubjects[block] || [];
      if (subjects.length === 0) return;

      const sum = subjects.reduce((acc, sub) => acc + (student.grades[sub] || 0), 0);
      const avg = (sum / subjects.length) * 10; // Quy về thang 100
      if (avg > bestMatch) bestMatch = avg;
    });

    return Math.min(bestMatch, 100);
  }

  private calculateSkillAlignment(student: StudentProfile, major: Major): number {
    if (!major.skills || major.skills.length === 0) return 70; // Default if no data

    let matchSum = 0;
    major.skills.forEach(s => {
      const studentSkill = student.skills[s.name] || 50; // Default mid-level
      // Skill match is high if student skill >= required level
      const diff = studentSkill - s.level;
      matchSum += diff >= 0 ? 100 : 100 + diff; 
    });

    return Math.round(matchSum / major.skills.length);
  }

  private calculateInterestFit(student: StudentProfile, major: Major): number {
    // Giả định major.description chứa các từ khóa về sở thích
    const keywords = student.interests.map(i => i.toLowerCase());
    const desc = (major.description || '').toLowerCase();
    
    let matches = 0;
    keywords.forEach(k => {
      if (desc.includes(k)) matches++;
    });

    return Math.min(50 + (matches / Math.max(1, keywords.length)) * 50, 100);
  }

  private calculateTrendFactor(major: Major): number {
    let score = 70; // Base
    if (major.demand === 'high') score += 20;
    if (major.aiRisk === 'low') score += 10;
    if (major.aiRisk === 'high') score -= 20;
    return Math.max(0, Math.min(100, score));
  }

  private calculateRiskFactor(student: StudentProfile, major: Major): number {
    const diff = student.predictedExamScore - major.score;
    if (diff >= 0) return 100; // Safe
    // Mỗi điểm thiếu trừ 15 điểm risk score
    return Math.max(0, 100 + diff * 15);
  }

  private generateExplanation(total: number, breakdown: any, major: Major): string {
    let text = `Dựa trên phân tích AI, ngành ${major.majorName} có mức độ phù hợp ${total}%. `;
    
    if (breakdown.academic > 85) {
      text += "Bạn có nền tảng học thuật cực kỳ vững chắc cho tổ hợp xét tuyển của ngành này. ";
    } else if (breakdown.academic < 60) {
      text += "Điểm các môn tổ hợp của bạn hiện đang thấp hơn mức kỳ vọng, cần tập trung cải thiện. ";
    }

    if (breakdown.risk < 50) {
      text += "Tuy nhiên, điểm chuẩn dự kiến của ngành này đang cao hơn năng lực hiện tại của bạn, đây là một lựa chọn mạo hiểm. ";
    }

    if (breakdown.trend > 80) {
      text += "Đây là ngành học có triển vọng nghề nghiệp rất tốt trong tương lai.";
    }

    return text;
  }
}
