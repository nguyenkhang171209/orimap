
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, History, Sparkles, Trash2 } from 'lucide-react';
import { chatWithMentor } from '../services/geminiService';
import { Message } from '../types';
import { chatStorage, ChatSession } from '../utils/chatStorage';

const INITIAL_MESSAGE: Message = { 
  role: 'model', 
  text: 'Chào bạn! Tôi là Orie Map Career Mentor. Bạn đang băn khoăn về ngành nghề nào hay cần lộ trình phát triển bản thân? Hãy đặt câu hỏi cho tôi nhé!' 
};

const CareerMentor: React.FC = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadedSessions = chatStorage.getSessions();
    setSessions(loadedSessions);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleNewChat = () => {
    setCurrentSessionId(null);
    setMessages([INITIAL_MESSAGE]);
    setInput('');
  };

  const handleSelectSession = (id: string) => {
    const session = sessions.find(s => s.id === id);
    if (session) {
      setCurrentSessionId(id);
      setMessages(session.messages);
    }
  };

  const handleDeleteSession = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    chatStorage.deleteSession(id);
    setSessions(chatStorage.getSessions());
    if (currentSessionId === id) {
      handleNewChat();
    }
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const userText = input.trim();
    const userMsg: Message = { role: 'user', text: userText };
    const newMessages = [...messages, userMsg];
    
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    let sessionId = currentSessionId;
    let sessionTitle = '';

    if (!sessionId) {
      sessionId = chatStorage.generateId();
      sessionTitle = userText.length > 30 ? userText.substring(0, 30) + '...' : userText;
      setCurrentSessionId(sessionId);
    } else {
      const existingSession = sessions.find(s => s.id === sessionId);
      sessionTitle = existingSession?.title || 'Cuộc trò chuyện mới';
    }

    const sessionToSave: ChatSession = {
      id: sessionId,
      title: sessionTitle,
      createdAt: sessions.find(s => s.id === sessionId)?.createdAt || Date.now(),
      messages: newMessages
    };
    chatStorage.saveSession(sessionToSave);
    setSessions(chatStorage.getSessions());

    try {
      const response = await chatWithMentor(messages, userText);
      const modelMsg: Message = { role: 'model', text: response };
      const finalMessages = [...newMessages, modelMsg];
      
      setMessages(finalMessages);
      
      chatStorage.saveSession({
        ...sessionToSave,
        messages: finalMessages
      });
      setSessions(chatStorage.getSessions());
    } catch (error) {
      const errorMsg: Message = { role: 'model', text: 'Xin lỗi, tôi gặp sự cố kết nối. Vui lòng thử lại sau.' };
      const finalMessages = [...newMessages, errorMsg];
      setMessages(finalMessages);
      
      chatStorage.saveSession({
        ...sessionToSave,
        messages: finalMessages
      });
      setSessions(chatStorage.getSessions());
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-56px)] md:h-[calc(100vh-4rem)] bg-slate-50">
      {/* Sidebar History */}
      <aside className="w-72 border-r border-slate-200 bg-white hidden lg:flex flex-col">
        <div className="p-6 border-b border-slate-200">
          <button 
            onClick={handleNewChat}
            className="w-full flex items-center justify-center gap-2 bg-indigo-50 text-indigo-600 py-3 rounded-xl font-bold hover:bg-indigo-100 transition-all"
          >
            <Sparkles className="w-4 h-4" /> Đoạn chat mới
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-4">Lịch sử tư vấn</h4>
          {sessions.length === 0 ? (
            <p className="text-xs text-slate-400 px-2 text-center mt-4">Chưa có lịch sử trò chuyện</p>
          ) : (
            sessions.map((session) => (
              <div 
                key={session.id} 
                className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all flex items-center justify-between group cursor-pointer ${
                  currentSessionId === session.id ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-slate-600 hover:bg-slate-50'
                }`}
                onClick={() => handleSelectSession(session.id)}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <History className={`w-4 h-4 shrink-0 ${currentSessionId === session.id ? 'text-indigo-500' : 'text-slate-400'}`} /> 
                  <span className="truncate">{session.title}</span>
                </div>
                <button 
                  onClick={(e) => handleDeleteSession(e, session.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-200 rounded text-slate-400 hover:text-red-500 transition-all"
                  title="Xóa"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))
          )}
        </div>
      </aside>

      {/* Chat Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-10 space-y-6 md:space-y-8 custom-scrollbar">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 md:gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex gap-3 md:gap-4 max-w-[90%] md:max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                  msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600 border border-slate-200'
                }`}>
                  {msg.role === 'user' ? <User className="w-5 h-5 md:w-6 md:h-6" /> : <Bot className="w-5 h-5 md:w-6 md:h-6" />}
                </div>
                <div className={`p-3 md:p-4 rounded-xl md:rounded-2xl shadow-sm text-xs md:text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-800'
                }`}>
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-3 md:gap-4 justify-start animate-pulse">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-white border border-slate-200 flex items-center justify-center"><Bot className="w-5 h-5 md:w-6 md:h-6 text-indigo-300" /></div>
              <div className="p-3 md:p-4 bg-white border border-slate-200 rounded-xl md:rounded-2xl text-slate-400 text-xs md:text-sm">AI đang suy nghĩ...</div>
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="p-4 md:p-10 bg-gradient-to-t from-slate-50 via-slate-50 to-transparent">
          <div className="max-w-4xl mx-auto relative">
            <textarea
              rows={1}
              className="w-full p-3 md:p-4 pr-12 md:pr-16 rounded-xl md:rounded-2xl border border-slate-200 bg-white shadow-lg focus:ring-4 ring-indigo-100 outline-none resize-none text-slate-800 text-sm md:text-base"
              placeholder="Nhập câu hỏi..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
            />
            <button 
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="absolute right-2 md:right-3 top-2 md:top-3 w-8 h-8 md:w-10 md:h-10 bg-indigo-600 text-white rounded-lg md:rounded-xl flex items-center justify-center hover:bg-indigo-700 transition-all disabled:opacity-50"
            >
              <Send className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
          <p className="text-center text-[8px] md:text-[10px] text-slate-400 mt-3 md:mt-4">Orie Map Career Mentor AI có thể đưa ra câu trả lời không chính xác 100%.</p>
        </div>
      </main>
    </div>
  );
};

export default CareerMentor;
