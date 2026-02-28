
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import SearchPage from './pages/Search';
import MajorProfile from './pages/MajorProfile';
import AIRoadmap from './pages/AIRoadmap';
import AIQuiz from './pages/AIQuiz';
import AIEngine from './pages/AIEngine';
import CareerMentor from './pages/CareerMentor';
import Dashboard from './pages/Dashboard';
import { BrainCircuit, Mail, Facebook, Instagram, Linkedin } from 'lucide-react';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [pageParams, setPageParams] = useState<any>(null);
  const [savedMajorIds, setSavedMajorIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('savedMajorIds');
    return saved ? JSON.parse(saved) : [];
  });

  // Thông tin học sinh mặc định hoặc từ localStorage
  const [studentProfile, setStudentProfile] = useState(() => {
    const savedProfile = localStorage.getItem('studentProfile');
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
    localStorage.setItem('studentProfile', JSON.stringify(studentProfile));
  }, [studentProfile]);

  const toggleSaveMajor = (id: string) => {
    setSavedMajorIds(prev => 
      prev.includes(id) ? prev.filter(mid => mid !== id) : [...prev, id]
    );
  };

  const updateStudentProfile = (newProfile: any) => {
    setStudentProfile(newProfile);
  };

  const navigate = (page: string, params: any = null) => {
    setCurrentPage(page);
    setPageParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home onNavigate={navigate} />;
      case 'search': return (
        <SearchPage 
          onNavigate={navigate} 
          savedMajorIds={savedMajorIds} 
          onToggleSave={toggleSaveMajor} 
        />
      );
      case 'major-profile': return <MajorProfile majorId={pageParams?.id} onNavigate={navigate} />;
      case 'ai-engine': return <AIEngine />;
      case 'roadmap': return <AIRoadmap />;
      case 'quiz': return <AIQuiz />;
      case 'mentor': return <CareerMentor onNavigate={navigate} />;
      case 'dashboard': return (
        <Dashboard 
          savedMajorIds={savedMajorIds} 
          studentProfile={studentProfile}
          onUpdateProfile={updateStudentProfile}
          onNavigate={navigate} 
        />
      );
      default: return <Home onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-secondary-100 selection:text-secondary-dark">
      <div className={currentPage === 'dashboard' ? 'lg:hidden' : ''}>
        <Navbar onNavigate={navigate} currentPage={currentPage} />
      </div>
      
      <main className="flex-1">
        {renderPage()}
      </main>
      
      {currentPage !== 'dashboard' && <Footer onNavigate={navigate} />}
      <ScrollToTop />
    </div>
  );
};

export default App;
