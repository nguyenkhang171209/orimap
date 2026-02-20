
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search as SearchIcon, MapPin, GraduationCap, ArrowUpRight, Heart, SlidersHorizontal, AlertCircle, Sparkles, Loader2, Bookmark } from 'lucide-react';
import { MAJORS } from '../constants';
import { getMajorSuggestions } from '../services/geminiService';

interface SearchPageProps {
  onNavigate: (page: string, params?: any) => void;
  savedMajorIds: string[];
  onToggleSave: (id: string) => void;
}

const SearchPage: React.FC<SearchPageProps> = ({ onNavigate, savedMajorIds, onToggleSave }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [maxScore, setMaxScore] = useState(30);
  const [selectedBlocks, setSelectedBlocks] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  
  // AI Suggestions State
  const [aiSuggestions, setAiSuggestions] = useState<{ id: string; reason: string }[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionRef = useRef<HTMLDivElement>(null);

  const examBlocks = ['A00', 'A01', 'B00', 'C00', 'D01', 'H00', 'V00'];
  const uniTypes = [
    { id: 'public', label: 'Công lập' },
    { id: 'private', label: 'Tư thục' },
    { id: 'international', label: 'Quốc tế' }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm.length >= 3) {
        setIsAiLoading(true);
        setShowSuggestions(true);
        const suggestions = await getMajorSuggestions(searchTerm, MAJORS);
        setAiSuggestions(suggestions);
        setIsAiLoading(false);
      } else {
        setAiSuggestions([]);
        setShowSuggestions(false);
      }
    }, 800);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // Logic lọc và sắp xếp: Ngành yêu thích lên đầu
  const sortedFilteredMajors = useMemo(() => {
    const filtered = MAJORS.filter((major) => {
      const matchesSearch = 
        major.majorName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        major.university.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesScore = major.score <= maxScore;
      const matchesBlock = selectedBlocks.length === 0 || 
        major.blocks.some(block => selectedBlocks.includes(block));
      const matchesLocation = selectedLocation === 'all' || major.location === selectedLocation;
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(major.type);

      return matchesSearch && matchesScore && matchesBlock && matchesLocation && matchesType;
    });

    // Sắp xếp: true (đã lưu) lên trước false (chưa lưu)
    return [...filtered].sort((a, b) => {
      const aSaved = savedMajorIds.includes(a.id);
      const bSaved = savedMajorIds.includes(b.id);
      if (aSaved && !bSaved) return -1;
      if (!aSaved && bSaved) return 1;
      return 0;
    });
  }, [searchTerm, maxScore, selectedBlocks, selectedLocation, selectedTypes, savedMajorIds]);

  const toggleBlock = (block: string) => {
    setSelectedBlocks(prev => 
      prev.includes(block) ? prev.filter(b => b !== block) : [...prev, block]
    );
  };

  const toggleType = (typeId: string) => {
    setSelectedTypes(prev => 
      prev.includes(typeId) ? prev.filter(t => t !== typeId) : [...prev, typeId]
    );
  };

  const resetFilters = () => {
    setSearchTerm('');
    setMaxScore(30);
    setSelectedBlocks([]);
    setSelectedLocation('all');
    setSelectedTypes([]);
  };

  const handleSelectSuggestion = (majorId: string) => {
    const major = MAJORS.find(m => m.id === majorId);
    if (major) {
      setSearchTerm(major.majorName);
      setShowSuggestions(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
      <div className="mb-10 md:mb-20 text-center">
        <div className="space-y-3 md:space-y-4 mb-8 md:mb-10">
          <h1 className="text-2xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter leading-tight">
            Tìm kiếm <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400">Ngành Học</span>
          </h1>
          <p className="text-slate-500 font-medium text-sm md:text-xl max-w-2xl mx-auto">
            Hệ thống phân tích thông minh giúp bạn tìm thấy bến đỗ ước mơ trong số {MAJORS.length}+ ngành học.
          </p>
        </div>
        
        <div className="relative group max-w-4xl mx-auto" ref={suggestionRef}>
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-orange-400 rounded-2xl md:rounded-[2.5rem] blur opacity-15 group-focus-within:opacity-30 transition duration-1000 group-focus-within:duration-200"></div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 md:pl-7 flex items-center pointer-events-none z-10">
              {isAiLoading ? (
                <Loader2 className="h-5 w-5 md:h-6 md:w-6 text-indigo-500 animate-spin" />
              ) : (
                <SearchIcon className="h-5 w-5 md:h-6 md:w-6 text-indigo-400 group-focus-within:text-indigo-600 transition-colors" />
              )}
            </div>
            <input
              type="text"
              className="block w-full pl-12 md:pl-16 pr-4 md:pr-40 py-4 md:py-6 bg-white border border-slate-200/60 rounded-2xl md:rounded-[2.5rem] shadow-xl md:shadow-2xl shadow-indigo-100/50 focus:ring-4 md:ring-8 focus:ring-indigo-50/50 focus:border-indigo-500 transition-all text-base md:text-xl outline-none font-bold text-slate-800 placeholder:text-slate-300 z-0"
              placeholder="Bạn muốn học gì?..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => searchTerm.length >= 3 && setShowSuggestions(true)}
            />
            <div className="absolute inset-y-3 right-3 px-8 bg-slate-900 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest hidden sm:flex items-center justify-center cursor-default shadow-lg shadow-slate-900/20">
              {sortedFilteredMajors.length} KẾT QUẢ
            </div>
          </div>

          {showSuggestions && (searchTerm.length >= 3) && (
            <div className="absolute top-full left-0 right-0 mt-4 bg-white/90 backdrop-blur-2xl border border-slate-200 rounded-[3rem] shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="p-6 border-b border-slate-100 bg-indigo-50/30 flex items-center justify-between">
                <span className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-indigo-600">
                  <Sparkles className="w-4 h-4" /> Gợi ý thông minh từ Orie AI
                </span>
                {isAiLoading && <span className="text-[10px] text-slate-400 font-bold animate-pulse">Đang tư vấn...</span>}
              </div>
              <div className="p-3 max-h-[400px] overflow-y-auto custom-scrollbar">
                {aiSuggestions.length > 0 ? (
                  aiSuggestions.map((sug, idx) => {
                    const major = MAJORS.find(m => m.id === sug.id);
                    if (!major) return null;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectSuggestion(major.id)}
                        className="w-full text-left p-5 rounded-[2rem] hover:bg-white hover:shadow-xl hover:shadow-indigo-500/5 transition-all group flex items-start gap-5 border border-transparent hover:border-indigo-100/50 mb-1 last:mb-0"
                      >
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                          <GraduationCap className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <p className="font-black text-slate-900 text-lg leading-tight group-hover:text-indigo-600 transition-colors">{major.majorName}</p>
                          <p className="text-sm text-slate-500 font-bold mb-2">{major.university}</p>
                          <div className="flex items-center gap-2">
                             <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-md text-[9px] font-black uppercase tracking-tighter">AI Insight</span>
                             <p className="text-xs text-indigo-500 font-bold italic opacity-80">"{sug.reason}"</p>
                          </div>
                        </div>
                        <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                      </button>
                    );
                  })
                ) : !isAiLoading ? (
                  <div className="py-12 text-center text-slate-400">
                    <div className="mb-4 flex justify-center">
                       <AlertCircle className="w-10 h-10 opacity-20" />
                    </div>
                    <p className="text-sm font-bold">Orie AI đang học hỏi từ truy vấn của bạn...</p>
                    <p className="text-xs font-medium opacity-60">Thử một từ khóa cụ thể hơn</p>
                  </div>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 md:gap-10">
        <aside className="lg:w-80 flex-shrink-0">
          <div className="bg-white p-6 md:p-8 rounded-2xl md:rounded-[3rem] border border-slate-200/60 shadow-sm lg:sticky lg:top-28 space-y-6 md:space-y-10">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 md:pb-6">
              <h3 className="font-black text-base md:text-lg flex items-center gap-2 md:gap-3">
                <SlidersHorizontal className="w-4 h-4 md:w-5 md:h-5 text-indigo-600" /> Bộ lọc
              </h3>
              <button 
                onClick={resetFilters}
                className="text-[10px] font-black text-indigo-600 hover:text-indigo-800 transition-colors uppercase tracking-widest"
              >
                Đặt lại
              </button>
            </div>

            <div className="space-y-4">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Khối thi</label>
              <div className="flex flex-wrap gap-2">
                {examBlocks.map(block => (
                  <button 
                    key={block}
                    onClick={() => toggleBlock(block)}
                    className={`px-3.5 py-2 rounded-xl border text-xs font-bold transition-all ${
                      selectedBlocks.includes(block) 
                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                        : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-400'
                    }`}
                  >
                    {block}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Điểm chuẩn tối đa</label>
                <span className="text-sm font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-lg">{maxScore.toFixed(1)}</span>
              </div>
              <input 
                type="range" 
                className="w-full accent-indigo-600 h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer" 
                min="15" 
                max="30" 
                step="0.5"
                value={maxScore}
                onChange={(e) => setMaxScore(parseFloat(e.target.value))}
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-black">
                <span>15.0</span>
                <span>30.0</span>
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Khu vực</label>
              <div className="relative">
                <select 
                  className="w-full p-4 pl-6 rounded-2xl border border-slate-200 bg-slate-50 outline-none focus:ring-4 ring-indigo-50 focus:bg-white transition-all appearance-none font-bold text-slate-700 text-sm"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  <option value="all">Tất cả khu vực</option>
                  <option value="Hà Nội">Hà Nội</option>
                  <option value="TP.HCM">TP. Hồ Chí Minh</option>
                  <option value="Đà Nẵng">Đà Nẵng</option>
                </select>
                <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Loại hình trường</label>
              <div className="space-y-3">
                {uniTypes.map(type => (
                  <label key={type.id} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 rounded-lg border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer transition-all"
                      checked={selectedTypes.includes(type.id)}
                      onChange={() => toggleType(type.id)}
                    />
                    <span className={`text-sm font-bold transition-colors ${selectedTypes.includes(type.id) ? 'text-indigo-600' : 'text-slate-600 group-hover:text-slate-900'}`}>
                      {type.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1">
          {sortedFilteredMajors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4 md:gap-8 animate-in fade-in duration-500">
              {sortedFilteredMajors.map((major) => {
                const isFavorited = savedMajorIds.includes(major.id);
                return (
                  <div 
                    key={major.id} 
                    className={`bg-white rounded-2xl md:rounded-[2.5rem] border p-5 md:p-8 shadow-sm hover:shadow-xl transition-all group flex flex-col border-b-4 ${
                      isFavorited 
                        ? 'border-indigo-100 ring-2 ring-indigo-50/50 border-b-indigo-500 bg-indigo-50/5' 
                        : 'border-slate-100 border-b-transparent hover:border-b-indigo-500'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4 md:mb-6">
                      <div className="space-y-2 w-full">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            {isFavorited && (
                              <span className="flex items-center gap-1 px-2 py-1 bg-indigo-600 text-white rounded-lg text-[8px] font-black uppercase tracking-widest shadow-md shadow-indigo-600/20">
                                <Bookmark className="w-2.5 h-2.5 fill-current" /> Đang quan tâm
                              </span>
                            )}
                            <span className="px-2 md:px-3 py-1 bg-slate-100 text-slate-500 rounded-lg text-[8px] md:text-[10px] font-black uppercase tracking-widest">
                              {major.location}
                            </span>
                          </div>
                          <div className="flex gap-1">
                            {major.demand === 'high' && (
                              <span className="px-2 py-1 bg-green-50 text-green-600 text-[8px] md:text-[9px] font-bold rounded border border-green-100 uppercase">Cầu cao</span>
                            )}
                          </div>
                        </div>
                        <h3 className="text-lg md:text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">{major.majorName}</h3>
                        <div className="flex items-center gap-2 text-xs md:text-sm text-slate-500 font-bold">
                          <GraduationCap className="w-4 h-4 text-indigo-400" />
                          {major.university}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
                      <div className="bg-white p-3 md:p-4 rounded-xl md:rounded-2xl border border-slate-100 group-hover:bg-indigo-50/30 transition-colors">
                        <span className="text-[8px] md:text-[9px] text-slate-400 font-black uppercase tracking-widest block mb-1">Điểm chuẩn</span>
                        <p className="text-xl md:text-2xl font-black text-indigo-600">{major.score.toFixed(1)}</p>
                      </div>
                      <div className="bg-white p-3 md:p-4 rounded-xl md:rounded-2xl border border-slate-100 group-hover:bg-indigo-50/30 transition-colors">
                        <span className="text-[8px] md:text-[9px] text-slate-400 font-black uppercase tracking-widest block mb-1">Học phí TB</span>
                        <p className="text-xs md:text-sm font-bold text-slate-700 truncate">{major.tuition}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-8 md:mb-10">
                      {major.blocks.map(b => (
                        <span key={b} className="px-2 md:px-3 py-1 md:py-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg md:rounded-xl text-[8px] md:text-[10px] font-black tracking-widest group-hover:border-indigo-200 transition-colors">
                          {b}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto pt-4 md:pt-6 border-t border-slate-100 flex gap-2 md:gap-3">
                      <button 
                        onClick={() => onNavigate('major-profile', { id: major.id })}
                        className="flex-1 bg-slate-900 text-white py-3 md:py-4 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10"
                      >
                        Chi tiết <ArrowUpRight className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => onToggleSave(major.id)}
                        className={`px-4 md:px-5 py-3 md:py-4 border-2 rounded-xl md:rounded-2xl transition-all active:scale-95 ${
                          isFavorited 
                            ? 'bg-red-50 border-red-200 text-red-500' 
                            : 'border-slate-100 text-slate-400 hover:text-red-500 hover:border-red-200'
                        }`}
                      >
                        <Heart className={`w-4 h-4 md:w-5 md:h-5 ${isFavorited ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 md:py-24 text-center bg-white rounded-2xl md:rounded-[3rem] border border-slate-100 border-dashed animate-in fade-in duration-500">
              <div className="w-16 h-16 md:w-24 md:h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6 md:mb-8">
                <AlertCircle className="w-8 h-8 md:w-12 md:h-12 text-indigo-200" />
              </div>
              <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-2">Không tìm thấy ngành phù hợp</h3>
              <p className="text-slate-500 font-medium text-sm md:text-base max-w-sm mb-8 md:mb-10 px-4">
                Thử thay đổi bộ lọc hoặc điều chỉnh từ khóa tìm kiếm để có nhiều kết quả hơn.
              </p>
              <button 
                onClick={resetFilters}
                className="px-6 md:px-8 py-3 md:py-4 bg-indigo-600 text-white rounded-xl md:rounded-2xl font-black text-xs md:text-sm uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20"
              >
                Xóa tất cả bộ lọc
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SearchPage;
