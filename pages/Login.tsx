
import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, BrainCircuit, Chrome, Facebook } from 'lucide-react';

interface LoginProps {
  onLoginSuccess: () => void;
  onNavigate: (page: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess();
  };

  const handleFacebookLogin = () => {
    window.location.href = '/auth/facebook';
  };

  return (
    <div className="min-h-[calc(100vh-56px)] md:min-h-[calc(100vh-6rem)] flex items-center justify-center bg-white p-4 md:p-8">
      <div className="max-w-5xl w-full bg-white rounded-2xl md:rounded-[2.5rem] shadow-2xl shadow-indigo-100/40 overflow-hidden flex flex-col lg:flex-row min-h-[500px] md:min-h-[650px] border border-slate-100">
        
        {/* LEFT SIDE - Premium SaaS Illustration */}
        <div className="hidden lg:flex lg:w-1/2 bg-[#4F46E5] p-12 flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-[100px] -mr-40 -mt-40"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-[80px] -ml-32 -mb-32"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-12">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-xl">
                <BrainCircuit className="text-[#4F46E5] w-7 h-7" />
              </div>
              <span className="text-white text-2xl font-black tracking-tighter">ORIE MAP AI</span>
            </div>
            <h2 className="text-5xl font-extrabold text-white leading-[1.1] mb-8 tracking-tight">
              Bắt đầu hành trình <br />định hướng cùng AI
            </h2>
            <p className="text-indigo-100 text-xl font-medium opacity-90 max-w-md leading-relaxed">
              Phân tích thế mạnh, sở thích và kết nối với ngành học mơ ước thông qua thuật toán thông minh nhất.
            </p>
          </div>

          <div className="relative z-10 bg-white/10 backdrop-blur-xl p-8 rounded-[2rem] border border-white/20 shadow-2xl">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-full border-2 border-white/30 p-1">
                <img src="https://i.pravatar.cc/100?u=st" className="w-full h-full rounded-full object-cover" alt="Student" />
              </div>
              <div>
                <p className="text-white font-bold text-base leading-tight">"Mentor AI giúp mình tiết kiệm 6 tháng tìm tòi lộ trình học!"</p>
                <p className="text-indigo-200 text-sm font-bold mt-2">— Khánh Linh, Lớp 12 Tin</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Clean SaaS Login Form */}
        <div className="flex-1 p-6 md:p-12 lg:p-20 flex flex-col justify-center">
          <div className="mb-8 md:mb-12 text-center lg:text-left">
            <div className="lg:hidden flex justify-center mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#4F46E5] flex items-center justify-center shadow-xl shadow-indigo-200">
                <BrainCircuit className="text-white w-6 h-6" />
              </div>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2 md:mb-4 tracking-tight">Chào mừng trở lại</h1>
            <p className="text-slate-500 font-medium text-sm md:text-lg">Đăng nhập để tiếp tục lộ trình cá nhân</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div className="space-y-1.5 md:space-y-2">
              <label className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1">Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-slate-300 group-focus-within:text-[#4F46E5] transition-colors" />
                <input 
                  type="email" 
                  required
                  placeholder="name@example.com"
                  className="w-full pl-11 md:pl-12 pr-6 py-3.5 md:py-4 rounded-xl bg-slate-50 border border-slate-100 focus:ring-4 ring-indigo-50 focus:border-[#4F46E5] focus:bg-white outline-none transition-all font-semibold text-slate-700 placeholder:text-slate-300 text-sm md:text-base"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1.5 md:space-y-2">
              <label className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1">Mật khẩu</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-slate-300 group-focus-within:text-[#4F46E5] transition-colors" />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full pl-11 md:pl-12 pr-6 py-3.5 md:py-4 rounded-xl bg-slate-50 border border-slate-100 focus:ring-4 ring-indigo-50 focus:border-[#4F46E5] focus:bg-white outline-none transition-all font-semibold text-slate-700 placeholder:text-slate-300 text-sm md:text-base"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between pb-1 md:pb-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 md:w-5 md:h-5 rounded border-slate-200 text-[#4F46E5] focus:ring-[#4F46E5] cursor-pointer transition-all" />
                <span className="text-xs md:text-sm font-bold text-slate-500 group-hover:text-slate-900 transition-colors">Lưu phiên bản</span>
              </label>
              <button type="button" className="text-xs md:text-sm font-bold text-[#4F46E5] hover:text-indigo-800 transition-colors">Quên mật khẩu?</button>
            </div>

            <button 
              type="submit"
              className="w-full bg-[#4F46E5] text-white py-3.5 md:py-4 rounded-xl font-extrabold text-base md:text-lg hover:bg-indigo-700 transition-all active:scale-[0.98] shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2 md:gap-3"
            >
              Tiếp tục <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </form>

          <div className="relative my-8 md:my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-black">
              <span className="bg-white px-4 md:px-6 text-slate-300">hoặc</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 md:gap-4">
            <button className="flex items-center justify-center w-full h-[44px] md:h-[48px] gap-3 px-6 bg-white border-2 border-slate-100 rounded-lg font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-200 transition-all duration-200 active:scale-[0.98] text-sm md:text-base">
              <div className="flex items-center justify-center w-[18px] md:w-[20px] h-[18px] md:h-[20px]">
                <Chrome size={18} className="text-red-500" />
              </div>
              Đăng nhập với Google
            </button>

            <button 
              onClick={handleFacebookLogin}
              className="flex items-center justify-center w-full h-[44px] md:h-[48px] gap-3 px-6 bg-[#1877F2] text-white rounded-lg font-bold transition-all duration-200 hover:brightness-110 active:scale-[0.98] cursor-pointer shadow-lg shadow-blue-600/10 text-sm md:text-base"
            >
              <div className="flex items-center justify-center w-[18px] md:w-[20px] h-[18px] md:h-[20px]">
                <Facebook size={18} fill="white" className="text-white" />
              </div>
              Đăng nhập với Facebook
            </button>
          </div>

          <p className="mt-8 md:mt-12 text-center text-xs md:text-sm font-bold text-slate-400">
            Chưa là thành viên?{' '}
            <button className="text-[#4F46E5] font-black hover:underline underline-offset-4 transition-all" onClick={() => onNavigate('signup')}>Đăng ký ngay</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
