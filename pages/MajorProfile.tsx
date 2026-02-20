
import React from 'react';
/* Added AlertCircle to imports */
import { TrendingUp, Users, Briefcase, ChevronRight, CheckCircle2, Star, Target, GraduationCap, AlertCircle } from 'lucide-react';
import { MAJORS } from '../constants';

interface MajorProfileProps {
  majorId: string;
  onNavigate: (page: string) => void;
}

const MajorProfile: React.FC<MajorProfileProps> = ({ majorId, onNavigate }) => {
  const major = MAJORS.find(m => m.id === majorId) || MAJORS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 space-y-6 md:space-y-10">
      {/* Header Info */}
      <div className="bg-[#111E6C] rounded-3xl md:rounded-[3.5rem] p-6 md:p-16 text-white flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12 relative overflow-hidden shadow-2xl shadow-blue-900/20">
        <div className="relative z-10 space-y-4 md:space-y-6 max-w-2xl text-center md:text-left">
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
             {major.blocks.map(b => (
               <span key={b} className="bg-white/10 px-2 md:px-3 py-1 rounded-lg text-[8px] md:text-[10px] font-black uppercase tracking-widest border border-white/10">{b}</span>
             ))}
          </div>
          <h1 className="text-2xl md:text-6xl font-black tracking-tight leading-tight">{major.majorName}</h1>
          <div className="flex items-center gap-2 md:gap-3 text-indigo-200 text-base md:text-xl font-bold justify-center md:justify-start">
            <GraduationCap className="w-5 h-5 md:w-6 md:h-6" />
            {major.university}
          </div>
          <p className="text-indigo-100/60 text-sm md:text-lg leading-relaxed">{major.description || 'Chương trình đào tạo chuyên sâu giúp sinh viên làm chủ kiến thức và kỹ năng thực tế trong ngành.'}</p>
          <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2 md:pt-4">
            <div className="flex items-center gap-2 bg-white/10 px-4 md:px-5 py-2 md:py-3 rounded-xl md:rounded-2xl border border-white/20">
              <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 fill-yellow-400" />
              <span className="font-bold text-xs md:text-sm">Rating: 4.9/5</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 md:px-5 py-2 md:py-3 rounded-xl md:rounded-2xl border border-white/20">
              <Users className="w-4 h-4 md:w-5 md:h-5 text-indigo-300" />
              <span className="font-bold text-xs md:text-sm">Cơ hội: {major.employmentRate || '98%'}</span>
            </div>
          </div>
        </div>
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-2 gap-4 md:gap-6 w-full md:w-auto">
          <div className="bg-white/10 backdrop-blur-xl p-4 md:p-8 rounded-2xl md:rounded-[2.5rem] border border-white/10 text-center shadow-2xl">
            <p className="text-indigo-200 text-[8px] md:text-[10px] font-black uppercase tracking-widest mb-1 md:mb-2 opacity-60">Lương Khởi Điểm</p>
            <p className="text-base md:text-2xl font-black">{major.avgSalary || '15-30 Triệu'}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-xl p-4 md:p-8 rounded-2xl md:rounded-[2.5rem] border border-white/10 text-center shadow-2xl">
            <p className="text-indigo-200 text-[8px] md:text-[10px] font-black uppercase tracking-widest mb-1 md:mb-2 opacity-60">Độ Cạnh Tranh</p>
            <p className="text-base md:text-2xl font-black">Rất Cao</p>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none translate-x-1/4 translate-y-1/4">
          <TrendingUp className="w-[800px] h-[800px]" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6 md:space-y-10">
          {/* Lộ trình học tập */}
          <section className="bg-white p-6 md:p-14 rounded-3xl md:rounded-[3.5rem] border border-slate-100 shadow-sm space-y-8 md:space-y-10">
            <h3 className="text-xl md:text-3xl font-black flex items-center gap-3 md:gap-4 text-slate-900">
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-indigo-600 bg-indigo-50 rounded-xl md:rounded-2xl p-1" /> Lộ trình học tập 4 năm
            </h3>
            <div className="space-y-4 md:space-y-6">
              {(major.timeline || [
                { year: 1, content: 'Đại cương & Cơ sở ngành' },
                { year: 2, content: 'Kiến thức chuyên sâu & Đồ án cơ sở' },
                { year: 3, content: 'Chuyên ngành hẹp & Thực tập doanh nghiệp' },
                { year: 4, content: 'Đồ án tốt nghiệp & Portfolio' }
              ]).map((item, idx) => (
                <div key={idx} className="relative flex gap-4 md:gap-8 pb-6 md:pb-10 last:pb-0">
                  {idx !== (major.timeline?.length || 4) - 1 && (
                    <div className="absolute left-4 md:left-6 top-10 md:top-12 bottom-0 w-0.5 md:w-1 bg-slate-50"></div>
                  )}
                  <div className="flex-shrink-0 w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-[1.2rem] bg-indigo-50 border-2 md:border-4 border-white shadow-lg flex items-center justify-center font-black text-[#111E6C] text-sm md:text-lg z-10">
                    {item.year}
                  </div>
                  <div className="pt-1 md:pt-2">
                    <h4 className="font-black text-base md:text-xl text-slate-900 mb-1 md:mb-2 tracking-tight">Năm thứ {item.year}</h4>
                    <p className="text-slate-500 font-medium leading-relaxed text-sm md:text-lg">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => onNavigate('roadmap')}
              className="w-full bg-[#FF8C00] text-white py-4 md:py-6 rounded-xl md:rounded-[2rem] font-black text-base md:text-xl hover:bg-orange-600 transition-all flex items-center justify-center gap-2 md:gap-3 shadow-xl shadow-orange-500/20 active:scale-95"
            >
              Nhận lộ trình AI cá nhân hóa <Target className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </section>

          {/* Cơ hội việc làm */}
          <section className="bg-white p-6 md:p-14 rounded-3xl md:rounded-[3.5rem] border border-slate-100 shadow-sm space-y-6 md:space-y-8">
            <h3 className="text-xl md:text-3xl font-black text-slate-900 flex items-center gap-3 md:gap-4">
              <Briefcase className="w-6 h-6 md:w-8 md:h-8 text-indigo-600 bg-indigo-50 rounded-xl md:rounded-2xl p-1" /> Vị trí công việc mục tiêu
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {['Chuyên viên cao cấp', 'Trưởng nhóm kỹ thuật', 'Quản lý dự án', 'Chuyên gia tư vấn'].map(job => (
                <div key={job} className="flex items-center gap-3 md:gap-4 p-4 md:p-6 bg-slate-50 rounded-2xl md:rounded-[2rem] border border-slate-100 group hover:bg-white hover:border-indigo-100 transition-all">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-white flex items-center justify-center shadow-sm">
                    <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-green-500" />
                  </div>
                  <span className="font-bold text-slate-700 text-sm md:text-lg group-hover:text-indigo-600">{job}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6 md:space-y-10">
          {/* Skills */}
          <section className="bg-white p-6 md:p-10 rounded-3xl md:rounded-[3rem] border border-slate-100 shadow-sm space-y-8 md:space-y-10">
            <h3 className="text-lg md:text-xl font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-4 md:pb-6">Kỹ năng cốt lõi</h3>
            <div className="space-y-6 md:space-y-8">
              {(major.skills || [
                { name: 'Tư duy logic', level: 95 },
                { name: 'Kỹ năng chuyên môn', level: 90 },
                { name: 'Tiếng Anh chuyên ngành', level: 85 },
                { name: 'Làm việc nhóm', level: 80 }
              ]).map((skill, idx) => (
                <div key={idx} className="space-y-2 md:space-y-3">
                  <div className="flex justify-between text-xs md:text-sm font-black">
                    <span className="text-slate-700 uppercase tracking-widest">{skill.name}</span>
                    <span className="text-indigo-600">{skill.level}%</span>
                  </div>
                  <div className="w-full h-2.5 md:h-3 bg-slate-100 rounded-full overflow-hidden p-0.5">
                    <div className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full shadow-lg shadow-indigo-500/30" style={{ width: `${skill.level}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* AI Risk Assessment */}
          <section className={`p-6 md:p-10 rounded-3xl md:rounded-[3rem] border space-y-4 md:space-y-6 ${
            major.aiRisk === 'low' ? 'bg-green-50 border-green-100' :
            major.aiRisk === 'medium' ? 'bg-orange-50 border-orange-100' : 'bg-red-50 border-red-100'
          }`}>
            <h3 className={`text-lg md:text-xl font-black uppercase tracking-widest ${
              major.aiRisk === 'low' ? 'text-green-800' :
              major.aiRisk === 'medium' ? 'text-orange-800' : 'text-red-800'
            }`}>Đánh giá AI Risk</h3>
            <p className={`text-base md:text-lg font-medium leading-relaxed ${
              major.aiRisk === 'low' ? 'text-green-700' :
              major.aiRisk === 'medium' ? 'text-orange-700' : 'text-red-700'
            }`}>
              {major.aiRisk === 'low' ? 'Ngành này có tính sáng tạo và thấu cảm cao, cực kỳ khó bị thay thế bởi AI.' :
               major.aiRisk === 'medium' ? 'Nhiều tác vụ có thể được tự động hóa, nhưng vai trò con người vẫn rất quan trọng.' :
               'Cảnh báo: Tác động của AI rất lớn, bạn cần học cách sử dụng AI như một công cụ hỗ trợ để thích nghi.'}
            </p>
            <div className="flex items-center gap-3 p-3 md:p-4 bg-white/50 rounded-xl md:rounded-2xl border border-white/20">
              <AlertCircle className="w-4 h-4 md:w-5 md:h-5 shrink-0" />
              <span className="text-xs md:text-sm font-bold">Cập nhật bởi Orie Map AI Analyst</span>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MajorProfile;
