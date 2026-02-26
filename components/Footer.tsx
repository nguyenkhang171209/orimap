
import React from 'react';
import { 
  BrainCircuit, 
  Mail, 
  Github, 
  Facebook, 
  Sparkles
} from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#050505] text-white overflow-hidden pt-24 pb-12 border-t border-white/5">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] translate-y-1/2 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* Column 1: Brand */}
          <div className="lg:col-span-4 space-y-8">
            <div 
              className="flex items-center gap-3 cursor-pointer group w-fit" 
              onClick={() => onNavigate('home')}
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-500">
                <BrainCircuit className="text-white w-7 h-7" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tighter leading-none group-hover:drop-shadow-[0_0_8px_var(--color-primary)] transition-all duration-300">
                  <span className="text-white">Orie</span>
                  <span className="text-secondary">Map</span>
                </span>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">AI Career Orientation</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="text-indigo-100/60 text-base leading-relaxed max-w-sm font-medium">
                Nền tảng hướng nghiệp toàn diện ứng dụng trí tuệ nhân tạo thế hệ mới cho học sinh Việt Nam.
              </p>
              <p className="text-indigo-100/40 text-sm leading-relaxed max-w-sm">
                Kiến tạo tương lai bằng cách kết nối đam mê cá nhân với dữ liệu thị trường lao động thực tế.
              </p>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full w-fit">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span className="text-[10px] font-black uppercase tracking-widest text-primary-100/80">Premium AI Startup</span>
            </div>
          </div>

          {/* Column 2: Platform */}
          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] opacity-90 flex items-center gap-2">
              <span className="w-4 h-px bg-primary"></span> Nền tảng
            </h4>
            <ul className="space-y-4">
              {[
                { id: 'mentor', label: 'AI Career Mentor' },
                { id: 'search', label: 'Smart Major Search' },
                { id: 'search', label: 'University Explorer' },
                { id: 'roadmap', label: 'Career Roadmap' }
              ].map((link, idx) => (
                <li key={idx}>
                  <button 
                    onClick={() => onNavigate(link.id)}
                    className="text-primary-100/50 hover:text-white font-bold text-sm transition-all duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                    <span className="relative overflow-hidden">
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-full h-px bg-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] opacity-90 flex items-center gap-2">
              <span className="w-4 h-px bg-secondary"></span> Tài nguyên
            </h4>
            <ul className="space-y-4">
              {[
                'Blog hướng nghiệp',
                'Câu hỏi thường gặp',
                'Cẩm nang học sinh',
                'So sánh đại học'
              ].map((label, idx) => (
                <li key={idx}>
                  <a 
                    href="#" 
                    className="text-primary-100/50 hover:text-white font-bold text-sm transition-all duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                    <span className="relative overflow-hidden">
                      {label}
                      <span className="absolute bottom-0 left-0 w-full h-px bg-secondary -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div className="lg:col-span-4 space-y-8">
            <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] opacity-90 flex items-center gap-2">
              <span className="w-4 h-px bg-secondary"></span> Kết nối
            </h4>
            
            <div className="space-y-6">
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: Mail, href: "mailto:contact@oriemap.ai", label: "Email" },
                  { icon: Github, href: "https://github.com", label: "GitHub" },
                  { icon: Facebook, href: "https://facebook.com", label: "Facebook" }
                ].map((social, idx) => (
                  <a 
                    key={idx} 
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary-100 hover:text-white hover:bg-primary hover:border-primary transition-all duration-500 group"
                  >
                    <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-10 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p className="text-primary-100/30 font-bold text-xs uppercase tracking-widest">
              © {currentYear} OrieMap AI. All rights reserved.
            </p>
            <div className="h-4 w-px bg-white/10 hidden md:block"></div>
            <p className="text-primary-100/40 font-bold text-xs">
              Built by <span className="text-primary-100/80">Nguyen Nguyen Khang</span>
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[10px] font-black uppercase tracking-widest text-primary-100/60">Powered by Gemini AI</span>
            </div>
            <div className="flex gap-6">
              {['Privacy', 'Terms'].map((link) => (
                <a key={link} href="#" className="text-primary-100/30 hover:text-primary-100/60 text-[10px] font-black uppercase tracking-widest transition-colors">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
