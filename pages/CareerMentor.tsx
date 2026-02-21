
import React, { useState, useEffect } from 'react';
import ChatBox from '../components/ChatBox';
import { Sparkles, History, Trash2 } from 'lucide-react';
import { ChatSession } from '../types';
import { chatStorage } from '../utils/chatStorage';
import { clsx } from 'clsx';

const CareerMentor: React.FC = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);

  useEffect(() => {
    const loadedSessions = chatStorage.getSessions();
    setSessions(loadedSessions);
    // Optionally load the most recent session by default
    // if (loadedSessions.length > 0) setActiveSessionId(loadedSessions[0].id);
  }, []);

  const handleNewChat = () => {
    setActiveSessionId(null);
  };

  const handleSessionSelect = (id: string) => {
    setActiveSessionId(id);
  };

  const handleNewSessionCreated = (session: ChatSession) => {
    setSessions(prev => [session, ...prev]);
    setActiveSessionId(session.id);
  };

  const handleSessionUpdated = (updatedSession: ChatSession) => {
    setSessions(prev => prev.map(s => s.id === updatedSession.id ? updatedSession : s));
  };

  const handleDeleteSession = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm('Bạn có chắc muốn xóa cuộc hội thoại này?')) {
      chatStorage.deleteSession(id);
      setSessions(prev => prev.filter(s => s.id !== id));
      if (activeSessionId === id) setActiveSessionId(null);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Hôm nay';
    if (days === 1) return 'Hôm qua';
    if (days < 7) return `${days} ngày trước`;
    return date.toLocaleDateString('vi-VN');
  };

  return (
    <div className="flex h-[calc(100vh-56px)] md:h-[calc(100vh-4rem)] bg-slate-50">
      {/* Sidebar History - Desktop Only */}
      <aside className="w-80 border-r border-slate-200 bg-white hidden lg:flex flex-col">
        <div className="p-6 border-b border-slate-200">
          <button 
            onClick={handleNewChat}
            className="w-full flex items-center justify-center gap-2 bg-indigo-50 text-indigo-600 py-3 rounded-xl font-bold hover:bg-indigo-100 transition-all group"
          >
            <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" /> 
            Đoạn chat mới
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-4">Lịch sử tư vấn</h4>
          {sessions.length === 0 ? (
            <div className="px-4 py-8 text-center">
              <p className="text-xs text-slate-400">Chưa có lịch sử tư vấn</p>
            </div>
          ) : (
            sessions.map((s) => (
              <button 
                key={s.id} 
                onClick={() => handleSessionSelect(s.id)}
                className={clsx(
                  "w-full text-left px-4 py-3 rounded-xl text-sm transition-all flex items-center justify-between group",
                  activeSessionId === s.id ? "bg-indigo-50 text-indigo-600" : "text-slate-600 hover:bg-slate-50"
                )}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <History className={clsx(
                    "w-4 h-4 shrink-0",
                    activeSessionId === s.id ? "text-indigo-500" : "text-slate-400 group-hover:text-indigo-500"
                  )} /> 
                  <div className="flex flex-col overflow-hidden">
                    <span className="font-medium truncate">{s.title}</span>
                    <span className="text-[10px] text-slate-400">{formatDate(s.createdAt)}</span>
                  </div>
                </div>
                <button 
                  onClick={(e) => handleDeleteSession(e, s.id)}
                  className="p-1.5 opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:text-red-500 rounded-lg transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </button>
            ))
          )}
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
          <ChatBox 
            sessionId={activeSessionId} 
            onNewSessionCreated={handleNewSessionCreated}
            onSessionUpdated={handleSessionUpdated}
          />
        </div>
      </main>
    </div>
  );
};

export default CareerMentor;
