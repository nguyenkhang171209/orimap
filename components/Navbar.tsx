
import React, { useState, useEffect } from 'react';
import { Search, LayoutDashboard, BrainCircuit, Users, Compass, Menu, X, ChevronRight } from 'lucide-react';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Trang chủ', icon: Compass },
    { id: 'search', label: 'Ngành & Trường', icon: Search },
    { id: 'quiz', label: 'Trắc nghiệm AI', icon: BrainCircuit },
    { id: 'mentor', label: 'AI Mentor', icon: Users },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleNavigate = (id: string) => {
    onNavigate(id);
    closeMenu();
  };

  // Disable body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white md:bg-white/70 md:backdrop-blur-xl border-b border-slate-200/60 transition-all duration-300 shadow-sm md:shadow-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-[56px] md:h-20 lg:h-24">
            
            {/* Logo Section */}
            <div 
              className="flex items-center gap-2 md:gap-3 cursor-pointer shrink-0 lg:-ml-4 transition-all hover:opacity-80 active:scale-95" 
              onClick={() => handleNavigate('home')}
            >
              <div className="w-8 h-8 md:w-11 md:h-11 lg:w-13 lg:h-13 rounded-lg md:rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/10 shrink-0" style={{ backgroundColor: '#111E6C' }}>
                <BrainCircuit className="text-white w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
              </div>
              <span className="text-lg md:text-2xl lg:text-3xl font-[800] tracking-tighter whitespace-nowrap">
                <span style={{ color: '#2F4FA8' }}>Orie</span>
                <span style={{ color: '#FF8C00' }}> Map</span>
              </span>
            </div>

            {/* Desktop Navigation Items */}
            <div className="hidden md:flex items-center justify-center flex-1 px-8">
              <div className="flex items-center bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/50">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`flex items-center gap-2 px-4 lg:px-6 py-2 rounded-xl transition-all duration-300 relative font-bold text-sm ${
                      currentPage === item.id 
                        ? 'text-[#FF8C00] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.05)] scale-100' 
                        : 'text-slate-500 hover:text-slate-900 hover:bg-white/40'
                    }`}
                  >
                    <item.icon className={`w-4.5 h-4.5 shrink-0 transition-colors ${currentPage === item.id ? 'text-[#FF8C00]' : 'text-slate-400'}`} />
                    <span className="whitespace-nowrap">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop Action Button */}
            <div className="hidden md:flex items-center justify-end">
              <button 
                onClick={() => onNavigate('roadmap')}
                style={{ backgroundColor: '#111E6C' }}
                className="text-white px-6 lg:px-10 py-3 rounded-full font-[800] hover:shadow-2xl hover:shadow-blue-900/20 transition-all active:scale-95 text-sm lg:text-[16px] whitespace-nowrap"
              >
                Bắt đầu ngay
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex md:hidden items-center">
              <button 
                onClick={toggleMenu}
                className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-all active:scale-90"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
            
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Menu */}
      <div 
        className={`fixed inset-0 z-[60] md:hidden transition-all duration-300 ${isMenuOpen ? 'visible' : 'invisible'}`}
      >
        {/* Overlay */}
        <div 
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={closeMenu}
        />
        
        {/* Menu Content */}
        <div 
          className={`absolute left-0 top-0 h-full w-[280px] bg-white shadow-2xl transition-all duration-300 ease-in-out flex flex-col ${
            isMenuOpen ? 'translate-x-0 opacity-100 scale-100' : '-translate-x-full opacity-0 scale-95'
          }`}
        >
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#111E6C' }}>
                <BrainCircuit className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold tracking-tighter">
                <span style={{ color: '#2F4FA8' }}>Orie</span>
                <span style={{ color: '#FF8C00' }}> Map</span>
              </span>
            </div>
            <button onClick={closeMenu} className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-200 group ${
                  currentPage === item.id 
                    ? 'bg-blue-50 text-[#2F4FA8]' 
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                    currentPage === item.id ? 'bg-white shadow-sm' : 'bg-slate-100 group-hover:bg-white'
                  }`}>
                    <item.icon className={`w-5 h-5 ${currentPage === item.id ? 'text-[#2F4FA8]' : 'text-slate-400 group-hover:text-slate-600'}`} />
                  </div>
                  <span className="font-bold">{item.label}</span>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${currentPage === item.id ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`} />
              </button>
            ))}
          </div>

          <div className="p-6 border-t border-slate-100">
            <button 
              onClick={() => handleNavigate('roadmap')}
              style={{ backgroundColor: '#111E6C' }}
              className="w-full text-white py-4 rounded-2xl font-extrabold shadow-lg shadow-blue-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span>Bắt đầu ngay</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
