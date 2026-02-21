import React from 'react';
import { Sparkles, GraduationCap, Briefcase, TrendingUp, BrainCircuit } from 'lucide-react';
import { motion } from 'motion/react';

interface Suggestion {
  id: string;
  text: string;
  icon: React.ReactNode;
  color: string;
}

const suggestions: Suggestion[] = [
  {
    id: '1',
    text: 'Em học khối A nên chọn ngành gì?',
    icon: <GraduationCap size={16} />,
    color: 'bg-blue-50 text-blue-600 border-blue-100',
  },
  {
    id: '2',
    text: 'Ngành CNTT có khó không?',
    icon: <BrainCircuit size={16} />,
    color: 'bg-purple-50 text-purple-600 border-purple-100',
  },
  {
    id: '3',
    text: 'Lộ trình học để vào FTU là gì?',
    icon: <TrendingUp size={16} />,
    color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  },
  {
    id: '4',
    text: 'So sánh Marketing và Kinh tế',
    icon: <Briefcase size={16} />,
    color: 'bg-orange-50 text-orange-600 border-orange-100',
  },
  {
    id: '5',
    text: 'Em không giỏi Toán thì nên học gì?',
    icon: <Sparkles size={16} />,
    color: 'bg-pink-50 text-pink-600 border-pink-100',
  },
];

interface SuggestionListProps {
  onSelect: (text: string) => void;
}

const SuggestionList: React.FC<SuggestionListProps> = ({ onSelect }) => {
  return (
    <div className="grid grid-cols-1 gap-2 p-4">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">
        Gợi ý câu hỏi thông minh
      </p>
      <div className="flex flex-col gap-2">
        {suggestions.map((suggestion, index) => (
          <motion.button
            key={suggestion.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSelect(suggestion.text)}
            className={`flex items-center gap-3 p-3 rounded-xl border text-left text-xs font-medium transition-all hover:shadow-md active:scale-95 ${suggestion.color}`}
          >
            <span className="p-1.5 bg-white rounded-lg shadow-sm">
              {suggestion.icon}
            </span>
            {suggestion.text}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default SuggestionList;
