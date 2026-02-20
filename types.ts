
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

export interface QuizQuestion {
  id: number;
  question: string;
  options: { text: string; value: string }[];
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface UserProgress {
  major: string;
  progress: number;
  checklist: { task: string; done: boolean }[];
  deadlines: { title: string; date: string; type: 'warning' | 'info' }[];
}
