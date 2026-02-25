
import { CareerVectorProfile, QuizQuestion, QuizOption } from '../types';

export class QuizService {
  static analyze(questions: QuizQuestion[], selectedOptionIds: string[]): CareerVectorProfile {
    const riasec: Record<'R' | 'I' | 'A' | 'S' | 'E' | 'C', number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    const thinking: Record<'Linear' | 'Lateral' | 'Abstract' | 'Concrete', number> = { Linear: 0, Lateral: 0, Abstract: 0, Concrete: 0 };
    let pressureSum = 0;
    let pressureCount = 0;
    let intrinsicCount = 0;
    let extrinsicCount = 0;

    selectedOptionIds.forEach((optionId, index) => {
      const question = questions[index];
      const option = question.options.find(o => o.value === optionId);
      if (!option) return;

      const { weights } = option;

      // RIASEC
      if (weights.riasec) {
        Object.entries(weights.riasec).forEach(([key, val]) => {
          riasec[key as keyof typeof riasec] += val || 0;
        });
      }

      // Thinking
      if (weights.thinking) {
        Object.entries(weights.thinking).forEach(([key, val]) => {
          thinking[key as keyof typeof thinking] += val || 0;
        });
      }

      // Pressure
      if (weights.pressure !== undefined) {
        pressureSum += weights.pressure;
        pressureCount++;
      }

      // Motivation
      if (weights.motivation === 'Intrinsic') intrinsicCount++;
      if (weights.motivation === 'Extrinsic') extrinsicCount++;
    });

    // Normalize Thinking Style
    const thinkingStyle = Object.entries(thinking).reduce((a, b) => (a[1] > b[1] ? a : b))[0];
    
    // Pressure Tolerance (-1 to 1)
    const pressureTolerance = pressureCount > 0 ? pressureSum / pressureCount : 0;

    // Motivation Type
    const motivationType = intrinsicCount >= extrinsicCount ? 'Nội tại (Intrinsic)' : 'Ngoại tại (Extrinsic)';

    // Strengths & Weaknesses (Logic based on RIASEC & Thinking)
    const strengths: string[] = [];
    const weaknesses: string[] = [];
    const contradictions: string[] = [];

    if (riasec.I > 15) strengths.push('Tư duy phân tích mạnh mẽ');
    if (riasec.A > 15) strengths.push('Khả năng sáng tạo vượt trội');
    if (riasec.S > 15) strengths.push('Kỹ năng thấu cảm và giao tiếp');
    if (riasec.E > 15) strengths.push('Tố chất lãnh đạo và thuyết phục');
    
    if (thinkingStyle === 'Linear' && riasec.A > 15) contradictions.push('Mâu thuẫn giữa tư duy quy trình và nhu cầu sáng tạo tự do');
    if (riasec.S > 15 && pressureTolerance > 0.7) strengths.push('Bình tĩnh trong các tình huống xã hội căng thẳng');

    // Environment
    let environment = 'Môi trường làm việc ổn định, có quy trình rõ ràng';
    if (riasec.A > 15 || thinkingStyle === 'Lateral') environment = 'Môi trường năng động, khuyến khích sự đổi mới và tự do';
    if (riasec.I > 15) environment = 'Môi trường nghiên cứu, học thuật hoặc công nghệ cao';
    if (riasec.E > 15) environment = 'Môi trường kinh doanh cạnh tranh, định hướng mục tiêu';

    return {
      riasec,
      thinkingStyle,
      pressureTolerance,
      motivationType,
      strengths: strengths.length > 0 ? strengths : ['Đang cập nhật'],
      weaknesses: weaknesses.length > 0 ? weaknesses : ['Đang cập nhật'],
      environment,
      contradictions
    };
  }
}
