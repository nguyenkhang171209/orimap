
import React, { useState } from 'react';
import { Target, Sparkles, BookOpen, Activity, CheckCircle2, Lightbulb, BarChart3 } from 'lucide-react';
import { generateAIRoadmap } from '../services/gemini';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts';

const AIRoadmap: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState<any>(null);
  const [formData, setFormData] = useState({
    grade: '10',
    performance: 'Khá',
    major: '',
    school: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await generateAIRoadmap(formData);
      setRoadmap(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const chartData = roadmap?.chartData?.labels?.map((label: string, index: number) => ({
    subject: label,
    value: roadmap.chartData.data[index],
    fullMark: 100,
  })) || [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-20 space-y-8 md:space-y-16 animate-in fade-in duration-700">
      <div className="text-center space-y-4 md:space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black uppercase tracking-widest mb-2">
          <Sparkles className="w-4 h-4" /> AI Powered Career Planning
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-tight">
          Lộ trình <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">Chiến lược</span>
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto text-base md:text-xl font-medium opacity-80">
          Dựa trên dữ liệu thực tế và AI, chúng tôi thiết kế bản đồ thành công dành riêng cho bạn.
        </p>
      </div>

      {!roadmap ? (
        <div className="bg-white p-6 md:p-12 rounded-[2rem] md:rounded-[3.5rem] border border-slate-200/60 shadow-2xl max-w-2xl mx-auto relative group overflow-hidden">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-[3.5rem] blur opacity-5 group-hover:opacity-10 transition duration-1000"></div>
          <form onSubmit={handleSubmit} className="relative space-y-8 md:space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Lớp hiện tại</label>
                <div className="relative">
                  <select 
                    className="w-full p-5 pl-6 rounded-2xl border border-slate-200 bg-slate-50 outline-none focus:ring-8 ring-indigo-50 focus:bg-white transition-all appearance-none font-black text-slate-700 text-base"
                    value={formData.grade}
                    onChange={(e) => setFormData({...formData, grade: e.target.value})}
                  >
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                  </select>
                  <BookOpen className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 pointer-events-none" />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Học lực</label>
                <div className="relative">
                  <select 
                    className="w-full p-5 pl-6 rounded-2xl border border-slate-200 bg-slate-50 outline-none focus:ring-8 ring-indigo-50 focus:bg-white transition-all appearance-none font-black text-slate-700 text-base"
                    value={formData.performance}
                    onChange={(e) => setFormData({...formData, performance: e.target.value})}
                  >
                    <option>Giỏi</option>
                    <option>Khá</option>
                    <option>Trung bình</option>
                  </select>
                  <Trophy className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Ngành mục tiêu</label>
              <input 
                type="text" 
                placeholder="VD: Khoa học máy tính, Y đa khoa..."
                className="w-full p-5 pl-8 rounded-2xl border border-slate-200 bg-slate-50 outline-none focus:ring-8 ring-indigo-50 focus:bg-white transition-all font-black text-slate-700 placeholder:text-slate-300 text-base"
                required
                value={formData.major}
                onChange={(e) => setFormData({...formData, major: e.target.value})}
              />
            </div>

            <div className="space-y-3">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Trường mục tiêu</label>
              <input 
                type="text" 
                placeholder="VD: ĐH Bách Khoa, ĐH Ngoại Thương..."
                className="w-full p-5 pl-8 rounded-2xl border border-slate-200 bg-slate-50 outline-none focus:ring-8 ring-indigo-50 focus:bg-white transition-all font-black text-slate-700 placeholder:text-slate-300 text-base"
                required
                value={formData.school}
                onChange={(e) => setFormData({...formData, school: e.target.value})}
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-lg hover:shadow-2xl hover:shadow-indigo-500/30 transition-all flex items-center justify-center gap-3 disabled:opacity-50 active:scale-95 shadow-xl shadow-indigo-500/10"
            >
              {loading ? (
                <><Loader2 className="w-6 h-6 animate-spin" /> Đang phân tích lộ trình...</>
              ) : (
                <><Sparkles className="w-6 h-6" /> Tạo lộ trình ngay</>
              )}
            </button>
          </form>
        </div>
      ) : (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-200 shadow-sm gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-600/20">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-black text-slate-900 leading-tight">Lộ trình Orie AI</h2>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{formData.major} • {formData.school}</p>
              </div>
            </div>
            <button 
              onClick={() => setRoadmap(null)} 
              className="w-full md:w-auto text-xs font-black text-indigo-600 uppercase tracking-widest hover:bg-indigo-50 px-8 py-4 rounded-2xl transition-all border border-indigo-100"
            >
              Thiết lập lại
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Timeline Milestones */}
              <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 md:p-10 shadow-sm">
                <h3 className="text-lg font-black text-slate-900 mb-8 flex items-center gap-3 uppercase tracking-widest">
                  <Activity className="w-5 h-5 text-indigo-600" /> Các cột mốc quan trọng
                </h3>
                <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                  {roadmap.milestones.map((milestone: any, idx: number) => (
                    <div key={idx} className="relative pl-10 group">
                      <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-white border-4 border-indigo-600 z-10 group-hover:scale-125 transition-transform"></div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{milestone.time}</span>
                        <p className="text-base md:text-lg font-black text-slate-800 leading-tight">{milestone.task}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Subjects & Skills */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm">
                  <h3 className="text-sm font-black text-slate-900 mb-6 flex items-center gap-3 uppercase tracking-widest">
                    <BookOpen className="w-4 h-4 text-indigo-600" /> Môn học trọng tâm
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {roadmap.focusSubjects.map((subject: string, i: number) => (
                      <span key={i} className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-xs font-black border border-indigo-100/50">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm">
                  <h3 className="text-sm font-black text-slate-900 mb-6 flex items-center gap-3 uppercase tracking-widest">
                    <CheckCircle2 className="w-4 h-4 text-purple-600" /> Kỹ năng cần có
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {roadmap.softSkills.map((skill: string, i: number) => (
                      <span key={i} className="px-4 py-2 bg-purple-50 text-purple-600 rounded-xl text-xs font-black border border-purple-100/50">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {/* Radar Chart */}
              <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm h-fit">
                <h3 className="text-sm font-black text-slate-900 mb-6 flex items-center gap-3 uppercase tracking-widest">
                  <BarChart3 className="w-4 h-4 text-indigo-600" /> Phân tích năng lực
                </h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                      <PolarGrid stroke="#e2e8f0" />
                      <PolarAngleAxis dataKey="subject" fontSize={10} tick={{ fill: '#64748b', fontWeight: 'bold' }} />
                      <Radar
                        name="Năng lực"
                        dataKey="value"
                        stroke="#6366f1"
                        fill="#6366f1"
                        fillOpacity={0.6}
                      />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-[10px] text-slate-400 font-bold text-center mt-4 italic">Biểu đồ thể hiện mức độ ưu tiên các nhóm năng lực cần phát triển.</p>
              </div>

              {/* AI Advice */}
              <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-indigo-600/20 relative overflow-hidden group">
                <Sparkles className="absolute -right-4 -top-4 w-24 h-24 text-white/10 rotate-12 group-hover:rotate-45 transition-transform duration-1000" />
                <h3 className="text-sm font-black mb-4 flex items-center gap-3 uppercase tracking-widest">
                  <Lightbulb className="w-4 h-4" /> Lời khuyên từ Orie AI
                </h3>
                <p className="text-sm md:text-base font-medium leading-relaxed opacity-90">
                  {roadmap.advice}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Loader2 = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

export default AIRoadmap;
