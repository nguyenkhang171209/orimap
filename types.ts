
export interface Major {
  id: string;
  majorName: string;
  university: string;
  score: number;
  tuition: string;
  blocks: string[];
  location: string;
  type: 'public' | 'private' | 'international';
  demand: 'high' | 'medium' | 'low';
  aiRisk: 'low' | 'medium' | 'high';
  // Các trường bổ sung cho trang chi tiết (Profile)
  description?: string;
  avgSalary?: string;
  employmentRate?: string;
  skills?: { name: string; level: number }[];
  timeline?: { year: number; content: string }[];
}

export interface QuizOption {
  text: string;
  value: string;
  weights: {
    riasec?: Partial<Record<'R' | 'I' | 'A' | 'S' | 'E' | 'C', number>>;
    thinking?: Partial<Record<'Linear' | 'Lateral' | 'Abstract' | 'Concrete', number>>;
    pressure?: number; // -1 to 1
    motivation?: 'Intrinsic' | 'Extrinsic';
  };
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
}

export interface CareerVectorProfile {
  riasec: Record<'R' | 'I' | 'A' | 'S' | 'E' | 'C', number>;
  thinkingStyle: string;
  pressureTolerance: number;
  motivationType: string;
  strengths: string[];
  weaknesses: string[];
  environment: string;
  contradictions: string[];
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface ChatSession {
  id: string;
  title: string;
  createdAt: string;
  messages: Message[];
}

export interface UserProgress {
  major: string;
  progress: number;
  checklist: { task: string; done: boolean }[];
  deadlines: { title: string; date: string; type: 'warning' | 'info' }[];
}
