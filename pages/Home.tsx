import React from 'react';
import { ArrowRight, Sparkles, Target, TrendingUp, BrainCircuit, ShieldCheck, Zap } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-8 pb-12 md:pt-12 md:pb-20 lg:pt-20 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          {/* Badge */}
          <div className="flex justify-center mb-6 md:mb-10 lg:mb-16">
            <div className="inline-flex items-center gap-2 md:gap-3 bg-blue-50/50 px-4 md:px-6 py-2 md:py-2.5 rounded-full border border-blue-100 text-[#2F4FA8] text-xs md:text-sm lg:text-lg font-bold tracking-tight animate-fade-in text-center">
              <Sparkles className="w-4 h-4 md:w-5 md:h-5 shrink-0" />
              <span>Cá nhân hóa hành trình sự nghiệp bằng AI</span>
            </div>
          </div>
          
          {/* THE ORANGE BOX CONTAINER */}
          <div className="bg-[#FF8C00] rounded-3xl md:rounded-[3.5rem] py-10 md:py-16 lg:py-20 px-5 md:px-8 lg:px-16 max-w-6xl mx-auto shadow-[0_40px_100px_-20px_rgba(255,140,0,0.3)] overflow-hidden relative group">
            
            {/* Decorative Elements */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/20 rounded-full blur-[100px]"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-black/10 rounded-full blur-[80px]"></div>
            
            <div className="absolute bottom-12 right-12 bg-white p-5 rounded-3xl shadow-2xl animate-float z-30 hidden lg:flex items-center justify-center border border-white/50">
              <TrendingUp className="text-[#FF8C00] w-10 h-10" />
            </div>
            
            <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-8 md:gap-12 lg:gap-16 items-center relative z-10">
              {/* Text Side */}
              <div className="space-y-6 text-center lg:text-left text-white max-w-2xl mx-auto lg:mx-0">
                <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-[800] leading-[1.2] md:leading-[1.1] tracking-tighter whitespace-normal flex flex-wrap justify-center lg:justify-start items-center gap-x-2 md:gap-x-3 gap-y-1 md:gap-y-2">
                  <span className="shrink-0">Kiến tạo nên</span>
                  <span className="text-[#111E6C] shrink-0">Tương Lai</span>
                  <span className="shrink-0">Từ sự thấu hiểu</span>
                  <span className="bg-white/20 px-3 md:px-5 py-1 md:py-1.5 rounded-xl md:rounded-2xl backdrop-blur-md inline-flex items-center justify-center text-white border border-white/10 shrink-0">AI</span>
                </h1>
                
                <p className="text-base md:text-xl lg:text-2xl text-white/90 font-medium leading-relaxed md:leading-[1.4] max-w-xl">
                  Đánh giá năng lực, sở thích và tiềm năng để gợi ý những lựa chọn tối ưu nhất cho con đường học vấn của bạn.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 md:gap-5 justify-center lg:justify-start pt-2">
                  <button 
                    onClick={() => onNavigate('search')}
                    className="w-full sm:w-auto bg-[#111E6C] text-white px-8 md:px-10 py-4 md:py-5 rounded-2xl md:rounded-3xl font-[800] text-base md:text-lg hover:shadow-2xl hover:shadow-blue-900/30 transition-all flex items-center justify-center gap-3 active:scale-95 group/btn"
                  >
                    Khám phá ngay <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                  <button 
                    onClick={() => onNavigate('roadmap')}
                    className="w-full sm:w-auto bg-white text-[#FF8C00] px-8 md:px-10 py-4 md:py-5 rounded-2xl md:rounded-3xl font-[800] text-base md:text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-3 shadow-xl active:scale-95"
                  >
                    Nhận lộ trình AI <Target className="w-5 h-5 md:w-6 md:h-6" />
                  </button>
                </div>
                
                <div className="flex flex-col md:flex-row items-center justify-center lg:justify-start pt-4 md:pt-2 gap-4">
                  <div className="flex -space-x-3 md:-space-x-4">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-10 h-10 md:w-14 md:h-14 rounded-full border-2 md:border-4 border-[#FF8C00] bg-white overflow-hidden shadow-lg">
                        <img src={`https://i.pravatar.cc/150?u=${i}`} className="w-full h-full object-cover" alt="User" />
                      </div>
                    ))}
                    <div className="w-10 h-10 md:w-14 md:h-14 rounded-full border-2 md:border-4 border-[#FF8C00] bg-[#111E6C] flex items-center justify-center text-white text-[10px] md:text-xs font-bold shadow-lg">
                      +50k
                    </div>
                  </div>
                  <p className="text-[10px] md:text-sm font-[800] text-white/80 uppercase tracking-widest text-center md:text-left">Tin dùng bởi hàng ngàn học sinh</p>
                </div>
              </div>
              
              <div className="relative group flex justify-center lg:justify-end mt-4 md:mt-8 lg:mt-0">
                 <div className="absolute -inset-8 md:-inset-12 bg-white/20 rounded-full blur-[60px] md:blur-[100px] opacity-40"></div>
                 <div className="relative bg-white/10 backdrop-blur-md rounded-[2rem] md:rounded-[3rem] p-3 md:p-4 border border-white/40 shadow-2xl w-full max-w-[280px] md:max-w-[340px] transform lg:hover:rotate-2 transition-transform duration-500">
                    <img 
                      src="https://images.unsplash.com/photo-1543269664-56d93c1b41a6?q=80&w=2070&auto=format&fit=crop" 
                      className="rounded-[1.5rem] md:rounded-[2.5rem] shadow-sm w-full h-auto object-cover aspect-[16/20] lg:aspect-[4/5]" 
                      alt="Student" 
                    />
                    <div className="absolute -left-4 md:-left-10 bottom-6 md:bottom-10 bg-white p-3 md:p-5 rounded-xl md:rounded-2xl shadow-2xl border border-slate-100 flex items-center gap-3 md:gap-4 animate-float delay-700">
                      <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-green-500 flex items-center justify-center text-white shrink-0">
                        <ShieldCheck className="w-5 h-5 md:w-7 md:h-7" />
                      </div>
                      <div className="text-left">
                        <p className="text-[8px] md:text-[10px] text-slate-400 font-black uppercase tracking-wider">Độ chính xác</p>
                        <p className="text-xs md:text-base font-black text-slate-900 whitespace-nowrap">98.5% AI Analysis</p>
                      </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="pt-16 pb-12 md:pt-24 md:pb-20 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 md:space-y-20">
          <div className="text-center space-y-4 md:space-y-6">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-[800] text-slate-900 leading-tight">Trải nghiệm hướng nghiệp <br className="md:hidden" /><span className="text-[#FF8C00]">khác biệt</span></h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-base md:text-xl font-medium">Kết hợp dữ liệu tuyển sinh thực tế và thuật toán AI tiên tiến nhất.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            {[
              { title: 'Phân tích đa chiều', desc: 'Sử dụng khung năng lực Holland kết hợp Big Data để đánh giá chính xác tiềm năng.', icon: BrainCircuit, color: '#2F4FA8' },
              { title: 'Tối ưu lộ trình', desc: 'Thiết kế từng bước đi cụ thể từ lớp 10 đến khi ra trường cho từng cá nhân.', icon: Zap, color: '#FF8C00' },
              { title: 'Dữ liệu thời gian thực', desc: 'Luôn cập nhật xu hướng thị trường, mức lương và nhu cầu tuyển dụng mới nhất.', icon: TrendingUp, color: '#111E6C' }
            ].map((f, i) => (
              <div key={i} className="bg-white p-8 md:p-12 rounded-2xl md:rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-slate-100 hover:border-slate-200 transition-all lg:hover-lift group">
                <div style={{ backgroundColor: `${f.color}10`, color: f.color }} className="w-14 h-14 md:w-20 md:h-20 rounded-2xl md:rounded-3xl flex items-center justify-center mb-6 md:mb-10 group-hover:scale-110 transition-transform">
                  <f.icon className="w-7 h-7 md:w-10 md:h-10" />
                </div>
                <h3 className="text-xl md:text-3xl font-[800] text-slate-900 mb-3 md:mb-5">{f.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm md:text-lg font-medium">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="pt-16 pb-16 md:pt-32 md:pb-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 md:gap-24 items-center">
            <div className="lg:w-1/2 space-y-8 md:space-y-12">
              <h2 className="text-3xl md:text-5xl font-[800] text-[#111E6C] leading-tight text-center lg:text-left">Chỉ với 3 bước đơn giản</h2>
              <div className="space-y-8 md:space-y-10">
                {[
                  { step: 1, title: 'Thấu hiểu bản thân', desc: 'Hoàn thành bài test AI để nhận diện nhóm tính cách và thiên hướng nghề nghiệp.' },
                  { step: 2, title: 'Chọn lọc ngành học', desc: 'Hệ thống gợi ý các ngành hot và trường đào tạo chất lượng dựa trên điểm số.' },
                  { step: 3, title: 'Thực thi lộ trình', desc: 'Theo dõi tiến độ, nhận lời khuyên từ Mentor AI mỗi ngày để cán đích thành công.' }
                ].map((s, i) => (
                  <div key={i} className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-8 group text-center md:text-left">
                    <div className="flex-shrink-0 w-14 h-14 md:w-20 md:h-20 bg-[#FF8C00] text-white rounded-2xl md:rounded-[2rem] flex items-center justify-center font-[900] text-2xl md:text-3xl shadow-2xl shadow-orange-500/20 lg:group-hover:rotate-6 transition-transform">
                      {s.step}
                    </div>
                    <div className="space-y-1 md:space-y-2">
                      <h3 className="text-xl md:text-3xl font-[800] text-slate-900">{s.title}</h3>
                      <p className="text-slate-500 text-sm md:text-xl font-medium leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 relative w-full">
              <div className="absolute -inset-2 md:-inset-4 bg-slate-100 rounded-3xl md:rounded-[4rem] -rotate-2 md:-rotate-3"></div>
              <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop" className="relative rounded-2xl md:rounded-[3.5rem] shadow-2xl border-4 md:border-8 border-white object-cover aspect-[4/3] w-full" alt="Steps" />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 md:py-24 bg-slate-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style={{ backgroundColor: '#2F4FA8' }} className="rounded-3xl md:rounded-[4rem] p-8 md:p-16 lg:p-24 text-center text-white space-y-8 md:space-y-12 relative overflow-hidden shadow-2xl shadow-blue-900/20">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white opacity-[0.03] rounded-full blur-[100px]"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-black opacity-[0.05] rounded-full blur-[80px]"></div>
            
            <div className="space-y-4 md:space-y-6">
              <h2 className="text-3xl md:text-5xl lg:text-7xl font-[800] leading-tight">Mở khóa tương lai của bạn</h2>
              <p className="text-blue-100 text-base md:text-2xl max-w-3xl mx-auto font-medium opacity-90">Gia nhập cộng đồng hơn 50,000 học sinh đang chuẩn bị cho sự nghiệp bứt phá.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 md:gap-5 justify-center pt-4 md:pt-8 max-w-3xl mx-auto">
              <input 
                type="email" 
                placeholder="Nhập địa chỉ email..." 
                className="px-6 md:px-10 py-4 md:py-6 rounded-2xl md:rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-blue-100/50 w-full focus:ring-4 ring-orange-400 outline-none text-base md:text-xl font-semibold transition-all" 
              />
              <button className="w-full sm:w-auto bg-[#FF8C00] text-white px-8 md:px-12 py-4 md:py-6 rounded-2xl md:rounded-3xl font-[900] text-base md:text-xl hover:bg-orange-600 transition-all shadow-2xl hover:shadow-orange-500/40 active:scale-95 whitespace-nowrap">
                Đăng ký ngay
              </button>
            </div>
            <p className="text-blue-100/40 text-[10px] md:text-sm font-[800] uppercase tracking-[0.3em]">Hoàn toàn miễn phí cho tất cả học sinh</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;