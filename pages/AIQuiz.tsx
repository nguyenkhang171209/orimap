
import React, { useState, useMemo } from 'react';
import { QUIZ_QUESTIONS, MAJORS } from '../constants';
import { BrainCircuit, ChevronRight, Trophy, ArrowRight, Sparkles, Target, Activity, Zap, AlertCircle } from 'lucide-react';
import { QuizService } from '../services/quizService';
import { CareerVectorProfile } from '../types';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip, RadarProps } from 'recharts';

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

  const profile: CareerVectorProfile | null = useMemo(() => {
    if (!isFinished) return null;
    const res = QuizService.analyze(QUIZ_QUESTIONS, answers);
    // Save to localStorage for AI Mentor
    localStorage.setItem('orie_career_profile', JSON.stringify(res));
    return res;
  }, [isFinished, answers]);

  const radarData = useMemo(() => {
    if (!profile) return [];
    return [
      { subject: 'Realistic', value: profile.riasec.R },
      { subject: 'Investigative', value: profile.riasec.I },
      { subject: 'Artistic', value: profile.riasec.A },
      { subject: 'Social', value: profile.riasec.S },
      { subject: 'Enterprising', value: profile.riasec.E },
      { subject: 'Conventional', value: profile.riasec.C },
    ];
  }, [profile]);

  const progress = ((currentStep + 1) / QUIZ_QUESTIONS.length) * 100;

  if (isFinished && profile) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-20 space-y-10 animate-in fade-in duration-700">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black uppercase tracking-widest">
            <Sparkles className="w-4 h-4" /> Career Vector Profile Generated
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">
            Hồ sơ <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">Nghề nghiệp AI</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: RIASEC Chart & Core Stats */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-8 flex items-center gap-2">
                <Target className="w-4 h-4 text-indigo-600" /> Mô hình Holland (RIASEC)
              </h3>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" fontSize={10} tick={{ fill: '#64748b', fontWeight: 'bold' }} />
                    <Radar
                      name="Điểm"
                      dataKey="value"
                      stroke="#6366f1"
                      fill="#6366f1"
                      fillOpacity={0.6}
                    />
                    <Tooltip 
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-indigo-600 p-6 rounded-[2rem] text-white shadow-lg shadow-indigo-600/20">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">Phong cách tư duy</p>
                <p className="text-xl font-black">{profile.thinkingStyle}</p>
              </div>
              <div className="bg-purple-600 p-6 rounded-[2rem] text-white shadow-lg shadow-purple-600/20">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">Chịu áp lực</p>
                <p className="text-xl font-black">{profile.pressureTolerance > 0.5 ? 'Cao' : profile.pressureTolerance > 0 ? 'Trung bình' : 'Thấp'}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Analysis & Recommendations */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-200 shadow-xl space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">Phân tích chuyên sâu</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Động lực: {profile.motivationType}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-3">Điểm mạnh nổi bật</h4>
                  <div className="flex flex-wrap gap-2">
                    {profile.strengths.map((s, i) => (
                      <span key={i} className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-xs font-bold border border-indigo-100">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-3">Môi trường phù hợp</h4>
                  <p className="text-slate-600 text-sm font-medium leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    {profile.environment}
                  </p>
                </div>

                {profile.contradictions.length > 0 && (
                  <div className="p-4 bg-orange-50 border border-orange-100 rounded-2xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-black text-orange-600 uppercase tracking-widest mb-1">Phát hiện mâu thuẫn nội tại</h4>
                      <ul className="text-[11px] text-orange-700 font-medium list-disc pl-4">
                        {profile.contradictions.map((c, i) => <li key={i}>{c}</li>)}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-6 border-t border-slate-100">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-4">Gợi ý ngành học mục tiêu</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {MAJORS.slice(0, 4).map((major) => (
                    <div key={major.id} className="p-4 rounded-2xl border border-slate-100 hover:border-indigo-200 transition-all group cursor-pointer">
                      <p className="font-black text-slate-800 text-sm group-hover:text-indigo-600 transition-colors">{major.majorName}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">{major.university}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all flex items-center justify-center gap-3 shadow-xl shadow-slate-900/10">
                  Lưu hồ sơ & Xem lộ trình chi tiết <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = QUIZ_QUESTIONS[currentStep];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-20">
      <div className="space-y-6 md:space-y-8">
        <div className="flex justify-between items-center text-[10px] md:text-sm font-black text-slate-400 uppercase tracking-widest">
          <span>Câu hỏi {currentStep + 1}/{QUIZ_QUESTIONS.length}</span>
          <span className="text-indigo-600">Tiến trình: {Math.round(progress)}%</span>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-600 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-200 shadow-2xl space-y-8 md:space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-500">
          <div className="flex items-center gap-3 text-indigo-600">
            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <span className="tracking-[0.3em] uppercase font-black text-xs">AI Career Assessment</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-black text-slate-900 leading-tight tracking-tight">
            {currentQuestion.question}
          </h2>
          <div className="grid gap-4">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(option.value)}
                className="group flex items-center justify-between p-6 rounded-2xl border-2 border-slate-50 hover:border-indigo-600 hover:bg-indigo-50/50 transition-all text-left relative overflow-hidden"
              >
                <div className="absolute inset-y-0 left-0 w-1 bg-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="text-lg font-bold text-slate-700 group-hover:text-indigo-900">{option.text}</span>
                <ChevronRight className="w-6 h-6 text-slate-200 group-hover:text-indigo-600 translate-x-0 group-hover:translate-x-2 transition-all shrink-0" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIQuiz;
