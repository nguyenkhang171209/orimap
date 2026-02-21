
import React from 'react';
import ChatBox from '../components/ChatBox';
import { Sparkles, History } from 'lucide-react';

const CareerMentor: React.FC = () => {
  return (
    <div className="flex h-[calc(100vh-56px)] md:h-[calc(100vh-4rem)] bg-slate-50">
      {/* Sidebar History - Desktop Only */}
      <aside className="w-80 border-r border-slate-200 bg-white hidden lg:flex flex-col">
        <div className="p-6 border-b border-slate-200">
          <button className="w-full flex items-center justify-center gap-2 bg-indigo-50 text-indigo-600 py-3 rounded-xl font-bold hover:bg-indigo-100 transition-all group">
            <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" /> 
            Đoạn chat mới
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-4">Lịch sử tư vấn</h4>
          {[
            { title: 'Ngành CNTT 2024', date: 'Hôm nay' },
            { title: 'Luyện thi khối A', date: 'Hôm qua' },
            { title: 'Du học hay nội địa?', date: '3 ngày trước' }
          ].map((h, i) => (
            <button key={i} className="w-full text-left px-4 py-3 rounded-xl text-sm text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-3 group">
              <History className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors" /> 
              <div className="flex flex-col">
                <span className="font-medium">{h.title}</span>
                <span className="text-[10px] text-slate-400">{h.date}</span>
              </div>
            </button>
          ))}
        </div>
        <div className="p-6 border-t border-slate-200 bg-slate-50/50">
          <div className="p-4 bg-indigo-600 rounded-xl text-white space-y-2">
            <p className="text-xs font-bold opacity-80 uppercase tracking-wider">Mẹo nhỏ</p>
            <p className="text-sm leading-relaxed">Hãy hỏi AI về lộ trình 3 năm cấp 3 để có sự chuẩn bị tốt nhất!</p>
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col p-4 md:p-8 lg:p-10">
        <div className="max-w-5xl mx-auto w-full h-full">
          <ChatBox />
        </div>
      </main>
    </div>
  );
};

export default CareerMentor;
