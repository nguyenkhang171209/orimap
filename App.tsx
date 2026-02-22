
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import ChatBox from './components/ChatBox';
import Home from './pages/Home';
import SearchPage from './pages/Search';
import MajorProfile from './pages/MajorProfile';
import AIRoadmap from './pages/AIRoadmap';
import AIQuiz from './pages/AIQuiz';
import CareerMentor from './pages/CareerMentor';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import { BrainCircuit, Mail, Facebook, Instagram, Linkedin } from 'lucide-react';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [pageParams, setPageParams] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [savedMajorIds, setSavedMajorIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('savedMajorIds');
    return saved ? JSON.parse(saved) : [];
  });

  // Thông tin người dùng mặc định hoặc từ localStorage
  const [userProfile, setUserProfile] = useState(() => {
    const savedProfile = localStorage.getItem('userProfile');
    return savedProfile ? JSON.parse(savedProfile) : {
      name: 'Nguyễn Minh Anh',
      email: 'minhanh.edu@gmail.com',
      school: 'THPT Chuyên Hà Nội - Amsterdam',
      grade: 'Lớp 12',
      avatar: 'https://i.pravatar.cc/150?u=minhanh'
    };
  });

  // Lưu state vào localStorage mỗi khi thay đổi
  useEffect(() => {
    localStorage.setItem('savedMajorIds', JSON.stringify(savedMajorIds));
  }, [savedMajorIds]);

  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
  }, [userProfile]);

  const toggleSaveMajor = (id: string) => {
    setSavedMajorIds(prev => 
      prev.includes(id) ? prev.filter(mid => mid !== id) : [...prev, id]
    );
  };

  const updateUserProfile = (newProfile: any) => {
    setUserProfile(newProfile);
  };

  const navigate = (page: string, params: any = null) => {
    if (!isLoggedIn && (page === 'roadmap' || page === 'dashboard' || page === 'mentor')) {
      setCurrentPage('login');
      setPageParams({ redirectTo: page });
    } else {
      setCurrentPage(page);
      setPageParams(params);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    const targetPage = pageParams?.redirectTo || 'dashboard';
    setCurrentPage(targetPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home onNavigate={navigate} />;
      case 'login': return <Login onLoginSuccess={handleLoginSuccess} onNavigate={navigate} />;
      case 'search': return (
        <SearchPage 
          onNavigate={navigate} 
          savedMajorIds={savedMajorIds} 
          onToggleSave={toggleSaveMajor} 
        />
      );
      case 'major-profile': return <MajorProfile majorId={pageParams?.id} onNavigate={navigate} />;
      case 'roadmap': return <AIRoadmap />;
      case 'quiz': return <AIQuiz />;
      case 'mentor': return <CareerMentor />;
      case 'dashboard': return (
        <Dashboard 
          savedMajorIds={savedMajorIds} 
          userProfile={userProfile}
          onUpdateProfile={updateUserProfile}
          onLogout={handleLogout}
          onNavigate={navigate} 
        />
      );
      default: return <Home onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-orange-100 selection:text-orange-900">
      <div className={currentPage === 'dashboard' ? 'lg:hidden' : ''}>
        <Navbar onNavigate={navigate} currentPage={currentPage} />
      </div>
      
      <main className="flex-1">
        {renderPage()}
      </main>
      
      {currentPage !== 'dashboard' && (
        <footer className="relative text-white overflow-hidden bg-[#111E6C] border-t border-white/5">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-10 md:gap-16">
            <div className="space-y-6 md:space-y-8">
              <div className="flex items-center gap-3 md:gap-4 cursor-pointer group" onClick={() => navigate('home')}>
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shadow-xl group-hover:scale-105 group-hover:bg-white/10 transition-all duration-300">
                  <BrainCircuit className="text-white w-7 h-7 md:w-9 md:h-9" />
                </div>
                <span className="text-2xl md:text-4xl font-[900] tracking-tighter leading-none">
                  <span className="text-white">Orie</span>
                  <span style={{ color: '#FF8C00' }}> Map</span>
                </span>
              </div>
              <p className="text-blue-100/60 text-sm md:text-lg leading-relaxed font-medium max-w-sm">
                Nền tảng hướng nghiệp toàn diện cho học sinh thế hệ mới. Kiến tạo tương lai bằng trí tuệ và đam mê.
              </p>
            </div>

            <div>
              <h4 className="text-white font-[900] text-[10px] md:text-xs uppercase tracking-[0.3em] mb-6 md:mb-10 flex items-center gap-3 md:gap-4 opacity-80">
                <span className="w-6 md:w-8 h-px bg-[#FF8C00]"></span> KHÁM PHÁ
              </h4>
              <ul className="space-y-4 md:space-y-6">
                {[
                  { id: 'search', label: 'Ngành & Trường' },
                  { id: 'roadmap', label: 'Lộ trình AI' },
                  { id: 'quiz', label: 'Trắc nghiệm AI' },
                  { id: 'mentor', label: 'AI Career Mentor' }
                ].map((link) => (
                  <li key={link.id}>
                    <button 
                      onClick={() => navigate(link.id)}
                      className="text-blue-100/50 hover:text-white font-bold text-base md:text-lg transition-all flex items-center gap-3 md:gap-4 group text-left"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FF8C00] scale-0 group-hover:scale-100 transition-transform"></div>
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-[900] text-[10px] md:text-xs uppercase tracking-[0.3em] mb-6 md:mb-10 flex items-center gap-3 md:gap-4 opacity-80">
                <span className="w-6 md:w-8 h-px bg-[#FF8C00]"></span> TÀI LIỆU
              </h4>
              <ul className="space-y-4 md:space-y-6">
                {['Cẩm nang tuyển sinh', 'Blog hướng nghiệp', 'Thống kê thị trường'].map((label) => (
                  <li key={label}>
                    <a href="#" className="text-blue-100/50 hover:text-white font-bold text-base md:text-lg transition-all flex items-center gap-3 md:gap-4 group">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FF8C00] scale-0 group-hover:scale-100 transition-transform"></div>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-[900] text-[10px] md:text-xs uppercase tracking-[0.3em] mb-6 md:mb-10 flex items-center gap-3 md:gap-4 opacity-80">
                <span className="w-6 md:w-8 h-px bg-[#FF8C00]"></span> KẾT NỐI
              </h4>
              <div className="space-y-8 md:space-y-10">
                <a 
                  href="mailto:contact@oriemap.ai"
                  className="group flex items-start gap-3 md:gap-4 transition-all duration-300"
                >
                  <div className="mt-1 w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-[#FF8C00] group-hover:border-[#FF8C00] transition-all shadow-sm">
                    <Mail className="w-4 h-4 md:w-5 md:h-5 text-[#FF8C00] group-hover:text-white transition-colors" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[#FF8C00] uppercase text-[8px] md:text-[10px] tracking-[0.2em] font-black group-hover:text-white transition-colors">EMAIL</p>
                    <p className="text-white font-extrabold text-base md:text-xl break-all group-hover:underline underline-offset-4 decoration-[#FF8C00]/30 transition-all">
                      contact@oriemap.ai
                    </p>
                  </div>
                </a>

                <div className="flex gap-3 md:gap-4 pt-2 md:pt-4">
                  {[
                    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
                    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
                    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" }
                  ].map((social, idx) => (
                    <a 
                      key={idx} 
                      href={social.href} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FF8C00] hover:text-white hover:bg-[#FF8C00] hover:border-[#FF8C00] transition-all duration-300 shadow-lg"
                    >
                      <social.icon className="w-5 h-5 md:w-6 md:h-6" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 md:mt-20 pt-8 md:pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-blue-100/30 font-bold text-xs">© 2024 Orie Map AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
      )}
      <ScrollToTop />
      <ChatBox isFloating={true} />
    </div>
  );
};

export default App;
