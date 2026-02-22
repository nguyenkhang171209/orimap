
import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../constants';
import { BrainCircuit, ChevronRight, Trophy, ArrowRight } from 'lucide-react';

const AIQuiz: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value];
    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setAnswers(newAnswers);
      setCurrentStep(currentStep + 1);
    } else {
      setAnswers(newAnswers);
      setIsFinished(true);
    }
  };

  const progress = ((currentStep + 1) / QUIZ_QUESTIONS.length) * 100;

  if (isFinished) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-20 text-center space-y-8 md:space-y-12">
        <div className="bg-white p-6 md:p-12 rounded-2xl md:rounded-[2rem] border border-slate-200 shadow-xl space-y-6 md:space-y-8">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto">
            <Trophy className="w-8 h-8 md:w-10 md:h-10" />
          </div>
          <div className="space-y-3 md:space-y-4">
            <h2 className="text-xl md:text-3xl font-bold text-slate-900 leading-tight">Kết quả: Nhóm Người Phân Tích (Investigative)</h2>
            <p className="text-slate-600 text-sm md:text-lg">Dựa trên câu trả lời, bạn có khả năng logic tuyệt vời và sự tò mò vô hạn về thế giới xung quanh.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 text-left">
            {[
              { title: 'Ngành gợi ý', content: 'Khoa học dữ liệu, Kỹ sư AI, Kinh tế lượng.' },
              { title: 'Điểm mạnh', content: 'Tư duy hệ thống, kiên trì, giải quyết vấn đề.' },
              { title: 'Môi trường', content: 'Ưu tiên các nơi nghiên cứu, công nghệ cao.' }
            ].map((res, i) => (
              <div key={i} className="bg-slate-50 p-4 md:p-6 rounded-xl md:rounded-2xl border border-slate-100">
                <h4 className="font-bold text-indigo-600 mb-1 md:mb-2 text-sm md:text-base">{res.title}</h4>
                <p className="text-xs md:text-sm text-slate-700 leading-relaxed">{res.content}</p>
              </div>
            ))}
          </div>

          <div className="pt-4 md:pt-8">
            <button className="w-full md:w-auto bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 mx-auto text-sm md:text-base">
              Xem chi tiết lộ trình nghề nghiệp <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = QUIZ_QUESTIONS[currentStep];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-20">
      <div className="space-y-6 md:space-y-8">
        <div className="flex justify-between items-center text-[10px] md:text-sm font-semibold text-slate-500 uppercase tracking-wider">
          <span>Câu hỏi {currentStep + 1}/{QUIZ_QUESTIONS.length}</span>
          <span>Tiến trình: {Math.round(progress)}%</span>
        </div>
        <div className="w-full h-2 md:h-3 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-600 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="bg-white p-6 md:p-10 rounded-2xl md:rounded-[2rem] border border-slate-200 shadow-xl space-y-6 md:space-y-10 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center gap-2 md:gap-3 text-indigo-600 font-bold text-xs md:text-base">
            <BrainCircuit className="w-5 h-5 md:w-6 md:h-6" />
            <span className="tracking-widest uppercase">AI TRẮC NGHIỆM</span>
          </div>
          <h2 className="text-xl md:text-3xl font-bold text-slate-900 leading-tight">
            {currentQuestion.question}
          </h2>
          <div className="grid gap-3 md:gap-4">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(option.value)}
                className="group flex items-center justify-between p-4 md:p-6 rounded-xl md:rounded-2xl border-2 border-slate-100 hover:border-indigo-600 hover:bg-indigo-50 transition-all text-left"
              >
                <span className="text-base md:text-lg font-medium text-slate-700 group-hover:text-indigo-900">{option.text}</span>
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-slate-300 group-hover:text-indigo-600 translate-x-0 group-hover:translate-x-2 transition-all shrink-0" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIQuiz;
