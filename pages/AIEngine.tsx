
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BrainCircuit, 
  Target, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronRight, 
  BarChart3,
  GraduationCap,
  Sparkles,
  Info,
  ShieldAlert
} from 'lucide-react';
import { OriMapAIEngine, StudentProfile, SuitabilityResult } from '../services/aiEngine';
import { MAJORS } from '../constants';
import { Major } from '../types';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, Tooltip, Cell 
} from 'recharts';

const AIEngine: React.FC = () => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem('orie_student_profile');
    return saved ? JSON.parse(saved) : {
      grades: { 'Toán': 8.5, 'Văn': 7.0, 'Anh': 8.0, 'Lý': 8.0, 'Hóa': 7.5, 'Sinh': 6.5 },
      skills: { 'Logic': 80, 'Creative': 60, 'Communication': 70, 'Technical': 75 },
      interests: ['Công nghệ', 'Kỹ thuật'],
      predictedExamScore: 25.5
    };
  });

  // Persist profile
  React.useEffect(() => {
    localStorage.setItem('orie_student_profile', JSON.stringify(profile));
  }, [profile]);
  const [selectedMajorId, setSelectedMajorId] = useState(MAJORS[0].id);
  const [result, setResult] = useState<SuitabilityResult | null>(null);

  const engine = useMemo(() => new OriMapAIEngine(), []);

  const handleAnalyze = () => {
    const major = MAJORS.find(m => m.id === selectedMajorId);
    if (major) {
      const res = engine.calculateSuitability(profile, major);
      setResult(res);
      // Save to localStorage for AI Mentor
      localStorage.setItem('orie_last_suitability', JSON.stringify({
        result: res,
        major: major,
        profile: profile,
        timestamp: Date.now()
      }));
      setStep(3);
    }
  };

  const radarData = useMemo(() => {
    if (!result) return [];
    return [
      { subject: 'Học thuật', value: result.breakdown.academic },
      { subject: 'Kỹ năng', value: result.breakdown.skills },
      { subject: 'Sở thích', value: result.breakdown.interests },
      { subject: 'Xu hướng', value: result.breakdown.trend },
      { subject: 'An toàn', value: result.breakdown.risk },
    ];
  }, [result]);

  const barData = useMemo(() => {
    if (!result) return [];
    return [
      { name: 'Học thuật', value: result.breakdown.academic, color: '#6366f1' },
      { name: 'Kỹ năng', value: result.breakdown.skills, color: '#a855f7' },
      { name: 'Sở thích', value: result.breakdown.interests, color: '#ec4899' },
      { name: 'Xu hướng', value: result.breakdown.trend, color: '#f97316' },
      { name: 'An toàn', value: result.breakdown.risk, color: '#10b981' },
    ];
  }, [result]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 md:py-20">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary rounded-full text-xs font-black uppercase tracking-widest mb-4">
          <BrainCircuit className="w-4 h-4" /> Ori-map Multivariate AI Engine
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter mb-4">
          Phân tích <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Độ phù hợp</span>
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto font-medium">
          Thuật toán đa biến độc quyền giúp bạn đánh giá chính xác khả năng thành công trong ngành học mơ ước.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Input / Steps */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm">
            <div className="flex flex-col gap-4">
              {[1, 2, 3].map((s) => (
                <div 
                  key={s}
                  className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
                    step === s ? 'bg-primary-50 border-primary-100 border' : 'opacity-50'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black ${
                    step === s ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400'
                  }`}>
                    {s}
                  </div>
                  <span className="font-bold text-slate-700">
                    {s === 1 ? 'Hồ sơ học tập' : s === 2 ? 'Chọn ngành mục tiêu' : 'Kết quả phân tích'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm space-y-6"
              >
                <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-primary" /> Điểm trung bình (GPA)
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(profile.grades).map(([subject, grade]) => (
                    <div key={subject} className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">{subject}</label>
                      <input 
                        type="number" 
                        step="0.1"
                        className="w-full p-3 rounded-xl border border-slate-100 bg-slate-50 font-bold text-slate-700 outline-none focus:ring-2 ring-primary-50"
                        value={grade}
                        onChange={(e) => setProfile({
                          ...profile, 
                          grades: { ...profile.grades, [subject]: parseFloat(e.target.value) }
                        })}
                      />
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => setStep(2)}
                  className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary transition-all flex items-center justify-center gap-2"
                >
                  Tiếp theo <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm space-y-6"
              >
                <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs flex items-center gap-2">
                  <Target className="w-4 h-4 text-primary" /> Chọn ngành muốn phân tích
                </h3>
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {MAJORS.map(major => (
                    <button 
                      key={major.id}
                      onClick={() => setSelectedMajorId(major.id)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all ${
                        selectedMajorId === major.id 
                          ? 'border-primary-500 bg-primary-50/50 ring-2 ring-primary-50' 
                          : 'border-slate-100 hover:border-primary-200'
                      }`}
                    >
                      <p className="font-bold text-slate-800 text-sm">{major.majorName}</p>
                      <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">{major.university}</p>
                    </button>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setStep(1)}
                    className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all"
                  >
                    Quay lại
                  </button>
                  <button 
                    onClick={handleAnalyze}
                    className="flex-[2] py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                  >
                    Phân tích ngay <Sparkles className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Results */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            {step === 3 && result ? (
              <motion.div 
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                {/* Score Hero */}
                <div className="bg-white rounded-[3rem] border border-slate-200 p-10 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50 blur-3xl"></div>
                  
                  <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                    <div className="relative w-48 h-48 flex items-center justify-center shrink-0">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="96" cy="96" r="88"
                          stroke="currentColor" strokeWidth="12"
                          fill="transparent"
                          className="text-slate-100"
                        />
                        <circle
                          cx="96" cy="96" r="88"
                          stroke="currentColor" strokeWidth="12"
                          fill="transparent"
                          strokeDasharray={552.9}
                          strokeDashoffset={552.9 - (552.9 * result.totalScore) / 100}
                          strokeLinecap="round"
                          className="text-primary transition-all duration-1000 ease-out"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-5xl font-black text-slate-900">{result.totalScore}%</span>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center px-4 mt-1">Độ phù hợp nghề nghiệp</span>
                      </div>
                    </div>

                    <div className="flex-1 space-y-4 text-center md:text-left">
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest ${
                        result.category === 'Phù hợp cao' ? 'bg-green-50 text-green-600' :
                        result.category === 'Phù hợp tiềm năng' ? 'bg-primary-50 text-primary' :
                        'bg-amber-50 text-amber-600'
                      }`}>
                        {result.category === 'Phù hợp cao' ? <CheckCircle2 className="w-4 h-4" /> :
                         result.category === 'Phù hợp tiềm năng' ? <TrendingUp className="w-4 h-4" /> :
                         <AlertTriangle className="w-4 h-4" />}
                        {result.category}
                      </div>
                      <h2 className="text-3xl font-black text-slate-900 leading-tight">
                        {MAJORS.find(m => m.id === selectedMajorId)?.majorName}
                      </h2>
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 relative">
                        <div className="absolute -top-3 -left-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100 text-primary">
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <p className="text-slate-600 font-medium leading-relaxed text-sm">
                          <span className="font-bold text-slate-900">Orie AI Giải thích:</span> {result.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Predictive Intelligence Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Admission Probability */}
                  <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm relative overflow-hidden group hover:border-primary-100 transition-colors">
                    <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-500">
                      <Target className="w-32 h-32 text-primary" />
                    </div>
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                      <Target className="w-4 h-4 text-primary" /> Xác suất trúng tuyển
                    </h3>
                    <div className="flex items-end gap-4 mb-4">
                      <span className="text-6xl font-black text-slate-900 leading-none tracking-tighter">{result.admissionProbability}%</span>
                      <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest mb-1.5 border ${
                        result.admissionProbability >= 70 ? 'bg-green-50 text-green-600 border-green-100' :
                        result.admissionProbability >= 40 ? 'bg-amber-50 text-amber-600 border-amber-100' :
                        'bg-red-50 text-red-600 border-red-100'
                      }`}>
                        {result.admissionProbability >= 70 ? 'An toàn' : result.admissionProbability >= 40 ? 'Cạnh tranh' : 'Rủi ro cao'}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-slate-500 relative z-10">
                      Dựa trên điểm dự kiến <strong className="text-slate-700">{profile.predictedExamScore}</strong> so với điểm chuẩn lịch sử của ngành <strong className="text-slate-700">{MAJORS.find(m => m.id === selectedMajorId)?.majorName}</strong>.
                    </p>
                    
                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-slate-100 rounded-full mt-6 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${
                          result.admissionProbability >= 70 ? 'bg-green-500' :
                          result.admissionProbability >= 40 ? 'bg-amber-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${result.admissionProbability}%` }}
                      />
                    </div>
                  </div>

                  {/* Risk Analysis */}
                  <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm relative overflow-hidden group hover:border-red-100 transition-colors">
                    <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-500">
                      <ShieldAlert className="w-32 h-32 text-red-500" />
                    </div>
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-red-500" /> Phân tích rủi ro
                    </h3>
                    <div className="mb-6">
                      <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border ${
                        result.riskAnalysis.level === 'Thấp' ? 'bg-green-50 text-green-600 border-green-100' :
                        result.riskAnalysis.level === 'Trung bình' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                        'bg-red-50 text-red-600 border-red-100'
                      }`}>
                        Mức độ rủi ro: {result.riskAnalysis.level}
                      </span>
                    </div>
                    <ul className="space-y-3 relative z-10">
                      {result.riskAnalysis.factors.map((factor, idx) => (
                        <li key={idx} className="text-sm font-medium text-slate-600 flex items-start gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <span className={`mt-0.5 shrink-0 ${result.riskAnalysis.level === 'Thấp' ? 'text-green-500' : 'text-red-400'}`}>
                            {result.riskAnalysis.level === 'Thấp' ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                          </span> 
                          {factor}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Radar Chart */}
                  <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-primary" /> Biểu đồ đa biến
                    </h3>
                    <div className="h-64 w-full">
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

                  {/* Bar Chart Breakdown */}
                  <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-primary" /> Chi tiết thành phần
                    </h3>
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={barData} layout="vertical">
                          <XAxis type="number" hide />
                          <YAxis dataKey="name" type="category" fontSize={10} tick={{ fill: '#64748b', fontWeight: 'bold' }} axisLine={false} tickLine={false} width={80} />
                          <Tooltip 
                            cursor={{ fill: 'transparent' }}
                            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                          />
                          <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={20}>
                            {barData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Explainable AI Section */}
                <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Info className="w-32 h-32" />
                  </div>
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-3 text-primary-light">
                    <BrainCircuit className="w-5 h-5" /> Explainable AI (XAI) Logic
                  </h3>
                  <div className="space-y-6 relative z-10">
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Hệ thống Ori-map sử dụng mô hình tính điểm đa biến <code className="text-primary-light font-mono">C = w1A + w2S + w3I + w4T + w5R</code> để đảm bảo tính khách quan:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                        <p className="text-xs font-black text-primary-light mb-1">A - Academic (35%)</p>
                        <p className="text-[10px] text-slate-400">Đánh giá sự tương thích giữa điểm GPA của bạn và khối thi yêu cầu.</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                        <p className="text-xs font-black text-secondary-light mb-1">S - Skills (20%)</p>
                        <p className="text-[10px] text-slate-400">So sánh bộ kỹ năng hiện tại với yêu cầu đặc thù của ngành học.</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                        <p className="text-xs font-black text-pink-400 mb-1">I - Interests (20%)</p>
                        <p className="text-[10px] text-slate-400">Phân tích mức độ đam mê dựa trên từ khóa sở thích và mô tả ngành.</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                        <p className="text-xs font-black text-amber-400 mb-1">T - Trend (15%)</p>
                        <p className="text-[10px] text-slate-400">Tính toán dựa trên nhu cầu thị trường lao động và rủi ro thay thế bởi AI.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button 
                    onClick={() => setStep(2)}
                    className="px-10 py-4 bg-white border border-slate-200 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all"
                  >
                    Phân tích ngành khác
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center py-20 text-center space-y-6">
                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center">
                  <BarChart3 className="w-10 h-10 text-slate-200" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-slate-300 uppercase tracking-widest">Đang chờ dữ liệu</h3>
                  <p className="text-slate-400 text-sm font-medium">Hoàn thành các bước bên trái để xem phân tích chi tiết.</p>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AIEngine;
