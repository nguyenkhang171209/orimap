
import React, { useState, useEffect, useMemo } from 'react';
import { 
  LayoutDashboard, Compass, Calendar, BookOpen, Settings, Bell, 
  CheckCircle, AlertTriangle, ArrowRight, UserCircle, 
  Camera, Save, LogOut, Sparkles, Trophy, Rocket,
  Lightbulb, Brain, Briefcase, GraduationCap, TrendingUp, BarChart3,
  Layers, Code, Wand2, Terminal, Cpu, MonitorPlay, Search, Star,
  Users, Zap, Lock, Bookmark, Check, Plus, Edit2, Trash2, X, Clock,
  LayoutList, CalendarDays, ChevronLeft, ChevronRight, Target, BrainCircuit
} from 'lucide-react';
import { MAJORS } from '../constants';

interface Exam {
  id: string;
  subject: string;
  date: string;
  time: string;
  room: string;
  building: string;
}

interface DashboardProps {
  savedMajorIds: string[];
  userProfile: {
    name: string;
    email: string;
    school: string;
    grade: string;
    avatar: string;
  };
  onUpdateProfile: (profile: any) => void;
  onLogout: () => void;
  onNavigate: (page: string, params?: any) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ savedMajorIds, userProfile, onUpdateProfile, onLogout, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'settings' | 'upgrade' | 'exams' | 'majors' | 'roadmap'>('overview');
  const [examViewMode, setExamViewMode] = useState<'list' | 'calendar'>('list');
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [deletingId, setDeletingId] = useState<string | null>(null);
  
  // Quản lý Lịch thi - Tải từ localStorage
  const [exams, setExams] = useState<Exam[]>(() => {
    const savedExams = localStorage.getItem('examSchedule');
    return savedExams ? JSON.parse(savedExams) : [
      { id: '1', subject: 'Toán học', date: '2026-06-27', time: '14:30', room: '204', building: 'Nhà A' },
      { id: '2', subject: 'Ngữ văn', date: '2026-06-28', time: '07:30', room: '102', building: 'Nhà B' }
    ];
  });

  const [isExamModalOpen, setIsExamModalOpen] = useState(false);
  const [editingExam, setEditingExam] = useState<Exam | null>(null);
  const [examFormData, setExamFormData] = useState<Omit<Exam, 'id'>>({
    subject: '',
    date: '',
    time: '',
    room: '',
    building: ''
  });

  // Tự động lưu vào localStorage mỗi khi exams thay đổi
  useEffect(() => {
    localStorage.setItem('examSchedule', JSON.stringify(exams));
  }, [exams]);

  // Form Profile State
  const [editProfile, setEditProfile] = useState(userProfile);
  const [isSaving, setIsSaving] = useState(false);
  const [showSaveToast, setShowSaveToast] = useState(false);

  useEffect(() => {
    setEditProfile(userProfile);
  }, [userProfile]);

  const userSavedMajors = MAJORS.filter(m => savedMajorIds.includes(m.id));
  const [selectedMajorId, setSelectedMajorId] = useState<string>('');

  useEffect(() => {
    if (userSavedMajors.length > 0 && (!selectedMajorId || !savedMajorIds.includes(selectedMajorId))) {
      setSelectedMajorId(userSavedMajors[0].id);
    }
  }, [savedMajorIds, userSavedMajors, selectedMajorId]);

  const selectedMajor = MAJORS.find(m => m.id === selectedMajorId) || (userSavedMajors.length > 0 ? userSavedMajors[0] : null);

  const handleSaveProfile = () => {
    setIsSaving(true);
    setTimeout(() => {
      onUpdateProfile(editProfile);
      setIsSaving(false);
      setShowSaveToast(true);
      setTimeout(() => setShowSaveToast(false), 3000);
    }, 800);
  };

  // Handlers cho Lịch thi
  const openAddModal = () => {
    setEditingExam(null);
    setExamFormData({ subject: '', date: '', time: '', room: '', building: '' });
    setIsExamModalOpen(true);
  };

  const openEditModal = (exam: Exam) => {
    setEditingExam(exam);
    setExamFormData({
      subject: exam.subject,
      date: exam.date,
      time: exam.time,
      room: exam.room,
      building: exam.building
    });
    setIsExamModalOpen(true);
  };

  // CHỨC NĂNG XÓA ĐÃ ĐƯỢC TỐI ƯU
  const deleteExam = (id: string) => {
    if (window.confirm('Bạn có chắc muốn xóa lịch thi này?')) {
      // 1. Kích hoạt hiệu ứng fade-out bằng cách đặt ID đang xóa
      setDeletingId(id);
      
      // 2. Đợi hiệu ứng kết thúc (300ms) rồi mới xóa dữ liệu
      setTimeout(() => {
        setExams(currentExams => currentExams.filter(exam => exam.id !== id));
        setDeletingId(null);
      }, 300);
    }
  };

  const handleSaveExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingExam) {
      setExams(prev => prev.map(e => e.id === editingExam.id ? { ...e, ...examFormData } : e));
    } else {
      const newExam: Exam = {
        id: Date.now().toString(),
        ...examFormData
      };
      setExams(prev => [...prev, newExam]);
    }
    setIsExamModalOpen(false);
  };

  const calendarDays = useMemo(() => {
    const year = calendarDate.getFullYear();
    const month = calendarDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  }, [calendarDate]);

  const changeMonth = (offset: number) => {
    setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() + offset, 1));
  };

  const renderOverview = () => (
    <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Stats Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: 'Tiến độ mục tiêu', value: '65%', icon: Target, color: 'text-indigo-600', bg: 'bg-indigo-50', trend: '+5% so với tuần trước' },
          { label: 'Chuyên đề hoàn thành', value: '12/18', icon: BookOpen, color: 'text-emerald-600', bg: 'bg-emerald-50', trend: 'Đúng tiến độ' },
          { label: 'Điểm đánh giá AI', value: '8.5', icon: Brain, color: 'text-orange-600', bg: 'bg-orange-50', trend: 'Top 15% toàn khối' },
          { label: 'Ngày còn lại', value: '128', icon: Clock, color: 'text-rose-600', bg: 'bg-rose-50', trend: 'Kỳ thi THPT Quốc gia' },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 hover:shadow-md lg:hover:-translate-y-1 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <div className={`w-10 h-10 md:w-12 md:h-12 ${stat.bg} ${stat.color} rounded-lg md:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <span className="text-[10px] md:text-xs font-medium text-gray-400 uppercase tracking-wider">Thống kê</span>
            </div>
            <div className="space-y-1">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-xs md:text-sm font-semibold text-gray-500">{stat.label}</p>
            </div>
            <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-50">
              <p className="text-[10px] md:text-xs text-gray-400 flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-emerald-500" /> {stat.trend}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2/3) */}
        <div className="lg:col-span-2 space-y-6 order-2 lg:order-1">
          {/* Progress Card */}
          <div className="bg-white rounded-xl md:rounded-2xl p-5 md:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
            <div className="flex justify-between items-start mb-6 md:mb-8">
              <div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1">Lộ trình học tập cá nhân</h3>
                <p className="text-xs md:text-sm text-gray-500">Dựa trên mục tiêu: {userSavedMajors.length > 0 ? userSavedMajors[0].majorName : 'Chưa chọn ngành'}</p>
              </div>
              <button className="text-indigo-600 text-xs md:text-sm font-bold hover:underline">Xem chi tiết</button>
            </div>
            
            <div className="space-y-5 md:space-y-6">
              <div className="flex items-center gap-4 md:gap-6">
                <div className="flex-1">
                  <div className="flex justify-between mb-2">
                    <span className="text-xs md:text-sm font-bold text-gray-700">Kiến thức nền tảng</span>
                    <span className="text-xs md:text-sm font-bold text-indigo-600">85%</span>
                  </div>
                  <div className="w-full h-2 md:h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-indigo-100 flex items-center justify-center text-[10px] md:text-xs font-bold text-indigo-600 shrink-0">
                  85%
                </div>
              </div>

              <div className="flex items-center gap-4 md:gap-6">
                <div className="flex-1">
                  <div className="flex justify-between mb-2">
                    <span className="text-xs md:text-sm font-bold text-gray-700">Luyện đề nâng cao</span>
                    <span className="text-xs md:text-sm font-bold text-orange-500">42%</span>
                  </div>
                  <div className="w-full h-2 md:h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 rounded-full" style={{ width: '42%' }}></div>
                  </div>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-orange-100 flex items-center justify-center text-[10px] md:text-xs font-bold text-orange-500 shrink-0">
                  42%
                </div>
              </div>
            </div>

            <div className="mt-8 md:mt-10 p-4 md:p-6 bg-indigo-50 rounded-xl md:rounded-2xl border border-indigo-100 flex items-center gap-3 md:gap-4">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-lg md:rounded-xl flex items-center justify-center shadow-sm shrink-0">
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-indigo-600" />
              </div>
              <p className="text-xs md:text-sm text-indigo-900 font-medium">
                <span className="font-bold">Gợi ý từ AI:</span> Bạn nên dành thêm 30 phút mỗi ngày cho phần Hình học không gian để cải thiện điểm số.
              </p>
            </div>
          </div>

          {/* Activity Card */}
          <div className="bg-white rounded-xl md:rounded-2xl p-5 md:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
            <h3 className="text-base md:text-lg font-bold text-gray-900 mb-5 md:mb-6">Hoạt động gần đây</h3>
            <div className="space-y-5 md:space-y-6">
              {[
                { title: 'Hoàn thành bài test Tư duy Logic', time: '2 giờ trước', icon: CheckCircle, color: 'text-emerald-500' },
                { title: 'Đã lưu ngành Công nghệ thông tin', time: '5 giờ trước', icon: Bookmark, color: 'text-indigo-500' },
                { title: 'Cập nhật lịch thi học kỳ II', time: 'Hôm qua', icon: Calendar, color: 'text-orange-500' },
              ].map((activity, i) => (
                <div key={i} className="flex items-start gap-3 md:gap-4">
                  <div className={`mt-0.5 w-7 h-7 md:w-8 md:h-8 rounded-lg bg-gray-50 flex items-center justify-center ${activity.color} shrink-0`}>
                    <activity.icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs md:text-sm font-bold text-gray-800">{activity.title}</p>
                    <p className="text-[10px] md:text-xs text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (1/3) */}
        <div className="space-y-6 order-3 lg:order-2">
          {/* Upcoming Exam - Moved up for mobile order requirement */}
          <div className="bg-white rounded-xl md:rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100 hover:shadow-md lg:hover:-translate-y-1 transition-all duration-300">
            <h3 className="text-[10px] md:text-sm font-black text-gray-400 uppercase tracking-widest mb-4">Lịch thi sắp tới</h3>
            {exams.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-50 text-orange-600 rounded-lg md:rounded-xl flex flex-col items-center justify-center shrink-0">
                    <span className="text-[9px] md:text-[10px] font-black leading-none mb-1">{new Date(exams[0].date).getDate()}</span>
                    <span className="text-xs md:text-sm font-black leading-none">T{new Date(exams[0].date).getMonth() + 1}</span>
                  </div>
                  <div>
                    <p className="text-xs md:text-sm font-bold text-gray-900">{exams[0].subject}</p>
                    <p className="text-[10px] md:text-xs text-gray-500">{exams[0].time} • Phòng {exams[0].room}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setActiveTab('exams')}
                  className="w-full py-2.5 text-indigo-600 text-xs font-bold border border-indigo-100 rounded-lg md:rounded-xl hover:bg-indigo-50 transition-colors"
                >
                  Xem tất cả lịch thi
                </button>
              </div>
            ) : (
              <p className="text-xs md:text-sm text-gray-400 italic">Chưa có lịch thi sắp tới</p>
            )}
          </div>

          {/* AI Suggestions */}
          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-xl md:rounded-2xl p-5 md:p-6 shadow-lg text-white hover:shadow-xl lg:hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-white/10 rounded-full -mr-12 -mt-12 md:-mr-16 md:-mt-16 blur-xl md:blur-2xl"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3 md:mb-4">
                <Wand2 className="w-4 h-4 md:w-5 md:h-5 text-indigo-200" />
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-100">AI Mentor</span>
              </div>
              <h4 className="text-base md:text-lg font-bold mb-1.5 md:mb-2">Phân tích năng lực mới</h4>
              <p className="text-xs md:text-sm text-indigo-100/80 mb-5 md:mb-6 leading-relaxed">Dựa trên kết quả bài test gần nhất, bạn có tiềm năng lớn trong lĩnh vực Phân tích dữ liệu.</p>
              <button className="w-full py-3 bg-white text-indigo-600 rounded-lg md:rounded-xl font-bold text-xs md:text-sm hover:bg-indigo-50 transition-colors">
                Xem gợi ý nghề nghiệp
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl md:rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100 hover:shadow-md lg:hover:-translate-y-1 transition-all duration-300">
            <h3 className="text-[10px] md:text-sm font-black text-gray-400 uppercase tracking-widest mb-4">Thao tác nhanh</h3>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => onNavigate('search')}
                className="flex flex-col items-center justify-center p-3 md:p-4 bg-gray-50 rounded-lg md:rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-all group"
              >
                <Search className="w-4 h-4 md:w-5 md:h-5 mb-2 text-gray-400 group-hover:text-indigo-600" />
                <span className="text-[9px] md:text-[10px] font-bold uppercase">Tìm ngành</span>
              </button>
              <button 
                onClick={() => onNavigate('quiz')}
                className="flex flex-col items-center justify-center p-3 md:p-4 bg-gray-50 rounded-lg md:rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-all group"
              >
                <Brain className="w-4 h-4 md:w-5 md:h-5 mb-2 text-gray-400 group-hover:text-indigo-600" />
                <span className="text-[9px] md:text-[10px] font-bold uppercase">Làm Quiz</span>
              </button>
              <button 
                onClick={() => onNavigate('mentor')}
                className="flex flex-col items-center justify-center p-3 md:p-4 bg-gray-50 rounded-lg md:rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-all group"
              >
                <Users className="w-4 h-4 md:w-5 md:h-5 mb-2 text-gray-400 group-hover:text-indigo-600" />
                <span className="text-[9px] md:text-[10px] font-bold uppercase">Hỏi Mentor</span>
              </button>
              <button 
                onClick={() => setActiveTab('roadmap')}
                className="flex flex-col items-center justify-center p-3 md:p-4 bg-gray-50 rounded-lg md:rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-all group"
              >
                <Rocket className="w-4 h-4 md:w-5 md:h-5 mb-2 text-gray-400 group-hover:text-indigo-600" />
                <span className="text-[9px] md:text-[10px] font-bold uppercase">Lộ trình</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderExams = () => {
    return (
      <div className="space-y-8 animate-in fade-in duration-500 pb-20">
        <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-6 rounded-[2.5rem] border border-blue-100 shadow-sm gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-[#4F46E5] flex items-center justify-center">
              <Calendar className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Lịch thi chi tiết</h3>
            
            <div className="bg-slate-100 p-1 rounded-2xl flex items-center border border-slate-200 ml-2">
              <button 
                onClick={() => setExamViewMode('list')}
                className={`p-2 rounded-xl transition-all ${examViewMode === 'list' ? 'bg-white shadow-md text-[#4F46E5]' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <LayoutList className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setExamViewMode('calendar')}
                className={`p-2 rounded-xl transition-all ${examViewMode === 'calendar' ? 'bg-white shadow-md text-[#4F46E5]' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <CalendarDays className="w-5 h-5" />
              </button>
            </div>
          </div>

          <button 
            onClick={openAddModal}
            className="flex items-center gap-2 px-8 py-4 bg-[#4F46E5] text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/30 active:scale-95"
          >
            <Plus className="w-5 h-5" /> Thêm lịch thi
          </button>
        </div>

        {examViewMode === 'list' ? (
          exams.length > 0 ? (
            <div className="grid gap-6">
              {exams.map((exam) => {
                const isDeleting = deletingId === exam.id;
                const dateObj = new Date(exam.date);
                
                return (
                  <div 
                    key={exam.id} 
                    className={`bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row items-center justify-between relative overflow-hidden animate-in fade-in slide-in-from-left-4 ${isDeleting ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}
                  >
                    <div className="flex items-center gap-10 flex-1">
                      <div className="w-20 h-20 rounded-[2rem] bg-indigo-50 border border-indigo-100 flex flex-col items-center justify-center shrink-0">
                        <span className="text-[12px] font-black text-[#4F46E5] uppercase leading-none mb-1">{dateObj.getDate()}</span>
                        <span className="text-2xl font-black text-slate-900 leading-none">Th.{dateObj.getMonth() + 1}</span>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="text-3xl font-black text-slate-900 tracking-tight">{exam.subject}</h4>
                        <div className="flex flex-wrap gap-6">
                          <div className="flex items-center gap-2.5 text-base font-bold text-slate-500">
                            <Clock className="w-5 h-5 text-[#4F46E5]" />
                            <span>{exam.time}</span>
                          </div>
                          <div className="flex items-center gap-2.5 text-base font-bold text-slate-500">
                            <GraduationCap className="w-5 h-5 text-[#4F46E5]" />
                            <span>Phòng {exam.room} • {exam.building}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4 mt-8 md:mt-0 items-center relative z-10">
                      <button 
                        onClick={(e) => { e.stopPropagation(); openEditModal(exam); }}
                        className="px-8 py-3 bg-slate-100 text-slate-500 hover:bg-slate-200 rounded-2xl font-black text-sm transition-all shadow-sm active:scale-95"
                      >
                        Sửa
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); deleteExam(exam.id); }}
                        className="px-8 py-3 bg-[#EF4444] hover:bg-red-700 text-white rounded-2xl font-black text-sm transition-all shadow-xl shadow-red-500/20 active:scale-95 cursor-pointer pointer-events-auto"
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white border-2 border-dashed border-slate-200 rounded-[3rem] py-24 text-center space-y-6">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
                <Calendar className="w-10 h-10 text-slate-200" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xl font-black text-slate-900">Chưa có lịch thi</h4>
                <p className="text-slate-400 font-medium">Hãy nhấn nút "Thêm lịch thi" để bắt đầu quản lý.</p>
              </div>
            </div>
          )
        ) : (
          <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm p-10 space-y-10 animate-in fade-in duration-500">
            <div className="flex items-center justify-between px-4">
              <h4 className="text-2xl font-black text-slate-900">
                Tháng {calendarDate.getMonth() + 1}, {calendarDate.getFullYear()}
              </h4>
              <div className="flex gap-3">
                <button onClick={() => changeMonth(-1)} className="p-3 hover:bg-slate-100 rounded-full transition-colors border border-slate-100">
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button onClick={() => changeMonth(1)} className="p-3 hover:bg-slate-100 rounded-full transition-colors border border-slate-100">
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-px bg-slate-100 border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm">
              {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map(day => (
                <div key={day} className="bg-slate-50 py-5 text-center text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                  {day}
                </div>
              ))}
              {calendarDays.map((day, idx) => {
                if (!day) return <div key={`empty-${idx}`} className="bg-white min-h-[140px]"></div>;
                
                const dateStr = `${calendarDate.getFullYear()}-${String(calendarDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const dayExams = exams.filter(e => e.date === dateStr);
                const isToday = new Date().toDateString() === new Date(calendarDate.getFullYear(), calendarDate.getMonth(), day).toDateString();

                return (
                  <div key={day} className={`bg-white min-h-[140px] p-4 border-r border-b border-slate-50 transition-colors hover:bg-indigo-50/20 group relative`}>
                    <span className={`text-base font-black ${isToday ? 'bg-[#4F46E5] text-white w-8 h-8 flex items-center justify-center rounded-full mb-2' : 'text-slate-400'}`}>
                      {day}
                    </span>
                    <div className="space-y-2 mt-3">
                      {dayExams.map(exam => (
                        <button 
                          key={exam.id}
                          onClick={() => openEditModal(exam)}
                          className="w-full text-left p-2.5 bg-indigo-50 border border-indigo-100 rounded-xl text-[11px] font-black text-indigo-700 hover:bg-indigo-100 transition-colors truncate shadow-sm"
                        >
                          {exam.time} - {exam.subject}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {isExamModalOpen && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="p-10 space-y-8">
                <div className="flex justify-between items-center">
                  <h3 className="text-3xl font-black text-slate-900">{editingExam ? 'Sửa lịch thi' : 'Thêm lịch thi'}</h3>
                  <button onClick={() => setIsExamModalOpen(false)} className="p-3 hover:bg-slate-100 rounded-full transition-colors">
                    <X className="w-6 h-6 text-slate-400" />
                  </button>
                </div>

                <form onSubmit={handleSaveExam} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Môn thi</label>
                    <input 
                      required
                      type="text" 
                      value={examFormData.subject}
                      onChange={(e) => setExamFormData({...examFormData, subject: e.target.value})}
                      placeholder="VD: Toán học"
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-4 ring-indigo-50 focus:bg-white transition-all outline-none font-bold text-slate-700" 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Ngày thi</label>
                      <input 
                        required
                        type="date" 
                        value={examFormData.date}
                        onChange={(e) => setExamFormData({...examFormData, date: e.target.value})}
                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-4 ring-indigo-50 focus:bg-white transition-all outline-none font-bold text-slate-700" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Giờ thi</label>
                      <input 
                        required
                        type="time" 
                        value={examFormData.time}
                        onChange={(e) => setExamFormData({...examFormData, time: e.target.value})}
                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-4 ring-indigo-50 focus:bg-white transition-all outline-none font-bold text-slate-700" 
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Phòng</label>
                      <input 
                        required
                        type="text" 
                        value={examFormData.room}
                        onChange={(e) => setExamFormData({...examFormData, room: e.target.value})}
                        placeholder="VD: 204"
                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-4 ring-indigo-50 focus:bg-white transition-all outline-none font-bold text-slate-700" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Tòa nhà</label>
                      <input 
                        required
                        type="text" 
                        value={examFormData.building}
                        onChange={(e) => setExamFormData({...examFormData, building: e.target.value})}
                        placeholder="VD: Nhà A"
                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-4 ring-indigo-50 focus:bg-white transition-all outline-none font-bold text-slate-700" 
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-5 bg-[#4F46E5] text-white rounded-[2rem] font-black text-lg shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all active:scale-95 mt-4"
                  >
                    Lưu lịch thi
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderMajors = () => (
    <div className="flex flex-col xl:flex-row gap-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="xl:w-1/3 space-y-6">
        <h3 className="text-xl font-[900] text-slate-900 px-4">Ngành đã lưu ({userSavedMajors.length})</h3>
        <div className="space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar pr-2">
          {userSavedMajors.length > 0 ? (
            userSavedMajors.map((major) => (
              <button
                key={major.id}
                onClick={() => setSelectedMajorId(major.id)}
                className={`w-full text-left p-6 rounded-[2rem] border transition-all relative overflow-hidden ${
                  selectedMajorId === major.id 
                    ? 'bg-white border-[#4F46E5] shadow-xl shadow-indigo-900/5 ring-2 ring-indigo-50' 
                    : 'bg-slate-50 border-slate-100 hover:bg-white hover:border-slate-200'
                }`}
              >
                {selectedMajorId === major.id && (
                   <div className="absolute top-0 left-0 w-1.5 h-full bg-[#4F46E5]"></div>
                )}
                <div className="flex justify-between items-start mb-3">
                  <span className={`flex items-center gap-1 px-3 py-1 bg-indigo-600 text-white rounded-lg text-[9px] font-black uppercase tracking-widest shadow-lg shadow-indigo-600/10`}>
                    <Bookmark className="w-3 h-3 fill-current" /> Quan tâm
                  </span>
                  <Star className={`w-5 h-5 ${selectedMajorId === major.id ? 'text-[#FF8C00] fill-[#FF8C00]' : 'text-slate-300'}`} />
                </div>
                <h4 className="text-xl font-[800] text-slate-900 mb-2">{major.majorName}</h4>
                <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                  <span className="flex items-center gap-1.5"><GraduationCap className="w-4 h-4" /> {major.university}</span>
                </div>
              </button>
            ))
          ) : (
            <div className="p-10 border-2 border-dashed border-slate-200 rounded-[2rem] text-center space-y-4">
              <p className="text-slate-400 font-bold">Danh sách yêu thích đang trống</p>
              <button 
                onClick={() => onNavigate('search')}
                className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 mx-auto"
              >
                <Search className="w-4 h-4" /> Khám phá ngay
              </button>
            </div>
          )}
          <button 
            onClick={() => onNavigate('search')}
            className="w-full py-6 border-2 border-dashed border-slate-200 rounded-[2rem] text-slate-400 font-bold hover:border-blue-300 hover:text-blue-400 transition-all flex items-center justify-center gap-2"
          >
             + Tìm thêm ngành mới
          </button>
        </div>
      </div>

      <div className="xl:w-2/3 space-y-10">
        {selectedMajor ? (
          <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm p-10 lg:p-14 space-y-12 animate-in fade-in slide-in-from-right-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 border-b border-slate-100 pb-12">
              <div className="space-y-4">
                <h2 className="text-4xl font-[900] text-[#111E6C]">{selectedMajor.majorName}</h2>
                <div className="flex flex-wrap gap-3">
                  {selectedMajor.blocks.map(tag => (
                    <span key={tag} className="px-4 py-1.5 bg-slate-100 text-slate-600 rounded-xl text-xs font-black uppercase tracking-widest">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="bg-blue-50/50 p-6 rounded-[2.5rem] border border-blue-100 flex items-center gap-6 shrink-0">
                <div className="w-20 h-20 rounded-full border-8 border-blue-100 border-t-[#4F46E5] flex items-center justify-center">
                  <span className="text-xl font-black text-[#4F46E5]">92%</span>
                </div>
                <div>
                  <p className="text-[10px] font-black text-[#4F46E5] uppercase tracking-widest mb-1">Độ phù hợp AI</p>
                  <p className="text-sm font-bold text-slate-600 leading-tight">Rất phù hợp với<br />tư duy logic của bạn</p>
                </div>
              </div>
            </div>

            <section className="space-y-6">
              <h3 className="text-2xl font-[900] text-slate-900 flex items-center gap-3">
                <Lightbulb className="w-6 h-6 text-orange-400" /> Tổng quan ngành học
              </h3>
              <p className="text-lg text-slate-500 font-medium leading-relaxed">
                {selectedMajor.description || 'Ngành học này không chỉ cung cấp kiến thức chuyên môn vững chắc mà còn rèn luyện khả năng tư duy giải quyết vấn đề linh hoạt, một trong những kỹ năng quan trọng nhất trong kỷ nguyên số.'}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-4">
                <div className="bg-slate-50 p-6 rounded-3xl">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Thu nhập khởi điểm</p>
                  <p className="text-lg font-black text-slate-900">{selectedMajor.avgSalary || '15-25 triệu'}</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-3xl">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Tỷ lệ có việc làm</p>
                  <p className="text-lg font-black text-green-600">{selectedMajor.employmentRate || '96%'}</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-3xl hidden md:block">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Học phí trung bình</p>
                  <p className="text-lg font-black text-slate-900 truncate">{selectedMajor.tuition}</p>
                </div>
              </div>
            </section>

            <section className="space-y-8">
              <h3 className="text-2xl font-[900] text-slate-900 flex items-center gap-3">
                <BarChart3 className="w-6 h-6 text-[#4F46E5]" /> Bản đồ năng lực cần thiết
              </h3>
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Kỹ năng chuyên môn</p>
                  {(selectedMajor.skills || [{name: 'Tư duy logic', level: 85}, {name: 'Năng lực tự học', level: 90}]).map((skill, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between font-bold text-sm">
                        <span className="text-slate-700">{skill.name}</span>
                        <span className="text-[#4F46E5]">{skill.level}%</span>
                      </div>
                      <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-400 to-[#4F46E5] rounded-full" style={{ width: `${skill.level}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-slate-50 p-8 rounded-[2.5rem] space-y-6 border border-slate-100">
                  <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Lời khuyên từ Mentor</p>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                      <Sparkles className="w-5 h-5 text-orange-400" />
                    </div>
                    <p className="text-sm font-bold text-slate-600 leading-relaxed italic">
                      "Đối với ngành {selectedMajor.majorName}, bạn nên tập trung xây dựng Portfolio dự án cá nhân ngay từ sớm để tăng tính cạnh tranh."
                    </p>
                  </div>
                  <button className="w-full py-4 bg-[#111E6C] text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-900 transition-all">
                    Lấy Checklist kỹ năng
                  </button>
                </div>
              </div>
            </section>

            <div className="pt-10 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => onNavigate('major-profile', { id: selectedMajor.id })}
                className="flex-1 bg-[#FF8C00] text-white py-5 rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 hover:shadow-2xl hover:shadow-orange-500/20 transition-all active:scale-95 shadow-xl shadow-orange-500/10"
              >
                <Compass className="w-6 h-6" /> Xem lộ trình học tập 4 năm
              </button>
              <button 
                onClick={() => onNavigate('mentor')}
                className="flex-1 bg-[#4F46E5] text-white py-5 rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 hover:shadow-2xl hover:shadow-indigo-900/20 transition-all active:scale-95 shadow-xl shadow-indigo-900/10"
              >
                <Users className="w-6 h-6" /> Hỏi Mentor AI về ngành này
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-[3rem] border border-slate-100 border-dashed animate-in fade-in duration-500">
            <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-8">
              <BookOpen className="w-12 h-12 text-indigo-200" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">Chưa có ngành học nào được chọn</h3>
            <p className="text-slate-500 font-medium max-w-sm mb-10">
              Hãy đánh dấu yêu thích (❤️) các ngành học bạn quan tâm để xem thông tin chi tiết tại đây.
            </p>
            <button 
              onClick={() => onNavigate('search')}
              className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20"
            >
              Đi đến Trang Tìm kiếm
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderAIRoadmapTab = () => (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <section className="bg-white p-10 lg:p-14 rounded-[3.5rem] border border-slate-100 shadow-sm flex flex-col lg:flex-row items-center gap-12">
        <div className="relative w-48 h-48 lg:w-56 lg:h-56 shrink-0">
          <svg className="w-full h-full -rotate-90">
            <circle cx="50%" cy="50%" r="45%" className="stroke-slate-100 fill-none" strokeWidth="12" />
            <circle cx="50%" cy="50%" r="45%" className="stroke-[#4F46E5] fill-none" strokeWidth="12" strokeDasharray="283" strokeDashoffset="170" strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl lg:text-5xl font-black text-[#111E6C]">40%</span>
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Mastery</span>
          </div>
        </div>
        <div className="flex-1 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-xl text-[#4F46E5] text-xs font-black uppercase tracking-widest">
            <Star className="w-4 h-4 fill-[#4F46E5]" /> Trình độ: Intermediate (Thực thi)
          </div>
          <h2 className="text-4xl font-[900] text-slate-900 leading-tight">Bạn đang trên đà trở thành <br />một AI Architect thực thụ!</h2>
          <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-2xl">
            Bạn đã hoàn thành các kiến thức cơ bản về Prompting. Thử thách tiếp theo: Xây dựng Website tích hợp AI đầu tiên của bạn.
          </p>
        </div>
      </section>

      <section className="space-y-8">
        <h3 className="text-2xl font-[900] text-slate-900 px-4 flex items-center gap-3">
          <Layers className="w-6 h-6 text-[#FF8C00]" /> Hành trình chinh phục AI
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { level: 'Beginner', title: 'Người Khởi Đầu', status: 'completed', icon: Wand2, color: 'green', desc: 'Hiểu bản chất AI và làm chủ Prompt cơ bản.' },
            { level: 'Intermediate', title: 'Người Thực Thi', status: 'current', icon: Brain, color: 'blue', desc: 'Ứng dụng AI để tự động hóa việc học tập.' },
            { level: 'Advanced', title: 'Người Sáng Tạo', status: 'locked', icon: Code, color: 'orange', desc: 'Tạo Website và App tích hợp Gemini API.' },
            { level: 'Expert', title: 'Bậc Thầy Kiến Tạo', status: 'locked', icon: Trophy, color: 'purple', desc: 'Xây dựng dự án AI thực tế & Portfolio.' }
          ].map((item, idx) => (
            <div key={idx} className={`relative p-8 rounded-[2.5rem] border transition-all flex flex-col h-full ${
              item.status === 'completed' ? 'bg-green-50 border-green-100' :
              item.status === 'current' ? 'bg-white border-[#4F46E5] shadow-xl shadow-indigo-900/5 ring-4 ring-indigo-50' :
              'bg-slate-50 border-slate-100 opacity-60 grayscale'
            }`}>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${
                item.status === 'completed' ? 'bg-green-500 text-white' :
                item.status === 'current' ? 'bg-[#4F46E5] text-white' : 'bg-slate-200 text-slate-400'
              }`}>
                <item.icon className="w-6 h-6" />
              </div>
              <div className="flex-1 space-y-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{item.level}</p>
                <h4 className="text-xl font-[900] text-slate-900">{item.title}</h4>
                <p className="text-sm font-medium text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
              <div className="mt-8">
                 {item.status === 'completed' ? (
                   <span className="flex items-center gap-2 text-green-600 font-black text-xs uppercase tracking-widest"><CheckCircle className="w-4 h-4" /> Đã hoàn thành</span>
                 ) : item.status === 'current' ? (
                   <button className="w-full py-3 bg-[#4F46E5] text-white rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform">Tiếp tục học</button>
                 ) : (
                   <span className="flex items-center gap-2 text-slate-400 font-black text-xs uppercase tracking-widest"><Lock className="w-4 h-4" /> Đang khóa</span>
                 )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const renderUpgrade = () => (
    <div className="max-w-5xl mx-auto space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-full border border-orange-100 text-[#FF8C00] text-xs font-black uppercase tracking-[0.2em]">
          <Zap className="w-4 h-4" /> Giới hạn là do bạn chọn
        </div>
        <h2 className="text-5xl md:text-6xl font-[900] text-[#111E6C] tracking-tighter leading-tight">
          Mở khóa đặc quyền,<br />Kiến tạo tương lai rực rỡ
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          { title: 'AI Tư vấn không giới hạn', desc: 'Trò chuyện 24/7 với Mentor AI về mọi thắc mắc học tập và hướng nghiệp.', icon: Sparkles, color: 'blue' },
          { title: 'Lộ trình 4 năm chi tiết', desc: 'Nhận kế hoạch hành động từng tháng, giúp bạn bám sát mục tiêu trường TOP.', icon: Trophy, color: 'orange' },
          { title: 'Dữ liệu độc quyền', desc: 'Truy cập báo cáo thị trường lao động và dự báo lương ngành trong 10 năm tới.', icon: Rocket, color: 'purple' }
        ].map((benefit, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${
              benefit.color === 'blue' ? 'bg-blue-50 text-blue-600' : 
              benefit.color === 'orange' ? 'bg-orange-50 text-orange-600' : 'bg-purple-50 text-purple-600'
            }`}>
              <benefit.icon className="w-7 h-7" />
            </div>
            <h4 className="text-xl font-[800] text-slate-900 mb-3">{benefit.title}</h4>
            <p className="text-slate-500 font-medium leading-relaxed">{benefit.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#111E6C] rounded-[3rem] p-12 md:p-16 text-center text-white w-full relative overflow-hidden shadow-2xl shadow-blue-900/20">
        <div className="relative z-10 space-y-8">
          <h3 className="text-3xl md:text-4xl font-[900]">Chỉ 1.500 VNĐ / ngày</h3>
          <button className="bg-[#FF8C00] text-white px-12 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-xl shadow-orange-500/30">
            Nâng cấp PRO ngay
          </button>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="max-w-4xl space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {showSaveToast && (
        <div className="fixed bottom-10 right-10 bg-green-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-right-4 z-[100]">
          <Check className="w-5 h-5" />
          <p className="font-bold">Đã lưu thông tin cá nhân thành công!</p>
        </div>
      )}

      <section className="bg-white p-10 rounded-[2.5rem] border border-slate-200/60 shadow-sm space-y-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-[#4F46E5] flex items-center justify-center">
            <UserCircle className="w-7 h-7" />
          </div>
          <h3 className="text-2xl font-[900] text-slate-900">Thông tin cá nhân</h3>
        </div>
        <div className="flex flex-col md:flex-row gap-10 items-start">
          <div className="relative group shrink-0">
            <div className="w-32 h-32 rounded-[2.5rem] bg-slate-100 border-4 border-white shadow-xl overflow-hidden">
              <img src={editProfile.avatar} className="w-full h-full object-cover" alt="Avatar" />
            </div>
            <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-xl shadow-lg border border-slate-100 flex items-center justify-center text-slate-600 hover:text-[#FF8C00] transition-all">
              <Camera className="w-5 h-5" />
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-6 flex-1 w-full">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Họ và tên</label>
              <input 
                type="text" 
                value={editProfile.name}
                onChange={(e) => setEditProfile({...editProfile, name: e.target.value})}
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-4 ring-indigo-50 focus:bg-white transition-all outline-none font-bold text-slate-700" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email</label>
              <input 
                type="email" 
                value={editProfile.email}
                onChange={(e) => setEditProfile({...editProfile, email: e.target.value})}
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-4 ring-indigo-50 focus:bg-white transition-all outline-none font-bold text-slate-700" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Trường học</label>
              <input 
                type="text" 
                value={editProfile.school}
                onChange={(e) => setEditProfile({...editProfile, school: e.target.value})}
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-4 ring-indigo-50 focus:bg-white transition-all outline-none font-bold text-slate-700" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Lớp</label>
              <select 
                value={editProfile.grade}
                onChange={(e) => setEditProfile({...editProfile, grade: e.target.value})}
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-4 ring-indigo-50 focus:bg-white transition-all outline-none font-bold text-slate-700 appearance-none"
              >
                <option>Lớp 10</option>
                <option>Lớp 11</option>
                <option>Lớp 12</option>
              </select>
            </div>
          </div>
        </div>
      </section>
      <div className="flex flex-col sm:flex-row gap-4 pt-10 border-t border-slate-200">
        <button 
          onClick={handleSaveProfile}
          disabled={isSaving}
          className="flex-1 bg-[#4F46E5] text-white py-5 rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 hover:shadow-2xl hover:shadow-indigo-900/20 transition-all active:scale-95 shadow-xl shadow-indigo-900/10 disabled:opacity-50"
        >
          {isSaving ? (
            <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Save className="w-6 h-6" />
          )}
          {isSaving ? 'Đang lưu...' : 'Lưu tất cả thay đổi'}
        </button>
        <button 
          onClick={onLogout}
          className="px-10 py-5 bg-red-50 text-red-600 rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 hover:bg-red-100 transition-all"
        >
          <LogOut className="w-6 h-6" /> Đăng xuất
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - Desktop Only */}
      <aside className="w-[260px] bg-white border-r border-gray-200 hidden lg:flex flex-col fixed inset-y-0 left-0 z-40">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-10 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => onNavigate('home')}>
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200">
              <BrainCircuit className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">Orie Map</span>
          </div>

          <nav className="space-y-1">
            {[
              { id: 'overview', label: 'Tổng quan', icon: LayoutDashboard },
              { id: 'roadmap', label: 'Lộ trình AI', icon: Rocket },
              { id: 'majors', label: 'Ngành yêu thích', icon: Bookmark },
              { id: 'exams', label: 'Lịch thi', icon: Calendar },
              { id: 'settings', label: 'Cài đặt', icon: Settings },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  activeTab === item.id 
                    ? 'bg-indigo-50 text-indigo-600' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-indigo-600' : 'text-gray-400'}`} />
                {item.label}
              </button>
            ))}
            <button
              onClick={() => onNavigate('home')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200"
            >
              <Compass className="w-5 h-5 text-gray-400" />
              Về trang chủ
            </button>
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-gray-100">
          <div className="bg-indigo-600 rounded-2xl p-5 text-white mb-6">
            <p className="text-xs font-bold uppercase tracking-widest opacity-70 mb-1">Gói Pro</p>
            <p className="text-sm font-bold mb-4">Mở khóa full tiềm năng AI của bạn</p>
            <button 
              onClick={() => setActiveTab('upgrade')}
              className="w-full py-2.5 bg-white text-indigo-600 rounded-xl font-bold text-xs hover:bg-indigo-50 transition-colors"
            >
              Nâng cấp ngay
            </button>
          </div>
          
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Đăng xuất
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-[260px] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8">
          {/* Mobile Header (Hidden on Desktop) */}
          <header className="lg:hidden flex justify-between items-center mb-6">
            <div className="space-y-0.5">
              <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-[10px] font-medium text-gray-500">Chào mừng, {userProfile.name}</p>
            </div>
            <button className="p-2.5 bg-white rounded-xl border border-gray-200 shadow-sm relative">
              <Bell className="w-5 h-5 text-gray-500" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
          </header>

          {/* Desktop Header */}
          <header className="hidden lg:flex justify-between items-end mb-10">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                {activeTab === 'overview' ? 'Trung tâm điều khiển 👋' : 
                 activeTab === 'settings' ? 'Cài đặt hệ thống ⚙️' : 
                 activeTab === 'exams' ? 'Lộ trình về đích 🏆' : 
                 activeTab === 'majors' ? 'Thư viện ước mơ 📚' : 
                 activeTab === 'roadmap' ? 'Chiến lược tương lai 🚀' : 'Nâng cấp trải nghiệm ✨'}
              </h1>
              <p className="text-sm text-gray-500 font-medium">
                {activeTab === 'overview' ? 'Chào mừng quay trở lại, ' + userProfile.name : 
                 activeTab === 'settings' ? 'Quản lý tài khoản và bảo mật của bạn' : 
                 activeTab === 'exams' ? 'Tự tin chinh phục mọi thử thách phía trước' : 
                 activeTab === 'majors' ? 'Nơi những lựa chọn trở thành tương lai rực rỡ' : 
                 activeTab === 'roadmap' ? 'Nâng cấp kỹ năng AI để làm chủ kỷ nguyên mới' : 'Trở thành phiên bản tốt nhất cùng Orie Map PRO'}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 px-4 py-2 bg-white rounded-2xl border border-gray-200 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">
                  {userProfile.name.charAt(0)}
                </div>
                <span className="text-sm font-bold text-gray-700">{userProfile.name}</span>
              </div>
              <button className="p-3 bg-white rounded-2xl border border-gray-200 text-gray-400 hover:text-indigo-600 transition-all shadow-sm relative">
                <Bell className="w-6 h-6" />
                <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
              </button>
            </div>
          </header>

          {/* Tab Content */}
          <div className="pb-20">
            {activeTab === 'overview' ? renderOverview() : 
             activeTab === 'settings' ? renderSettings() : 
             activeTab === 'exams' ? renderExams() : 
             activeTab === 'majors' ? renderMajors() : 
             activeTab === 'roadmap' ? renderAIRoadmapTab() : renderUpgrade()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
