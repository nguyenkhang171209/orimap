
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, History, Sparkles, Plus, Trash2, Copy, BarChart3, Map, Check, Edit2, Save, Mic, MicOff } from 'lucide-react';
import { chatWithMentor } from '../services/gemini';
import { Message } from '../types';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  PieChart, Pie, Cell
} from 'recharts';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  timestamp: number;
}

const COLORS = ['#6366f1', '#a855f7', '#f97316', '#ec4899', '#10b981'];

const CareerChart: React.FC<{ data: any }> = ({ data }) => {
  if (!data || !data.data) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full h-64 mt-4 p-4 bg-white/50 backdrop-blur-sm rounded-3xl border border-white/60 shadow-inner"
    >
      <h4 className="text-sm font-bold text-slate-700 mb-4 text-center">{data.title}</h4>
      <ResponsiveContainer width="100%" height="100%">
        {data.type === 'bar' ? (
          <BarChart data={data.data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="name" fontSize={10} tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis fontSize={10} tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
            <Tooltip 
              contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
            />
            <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
          </BarChart>
        ) : data.type === 'radar' ? (
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data.data}>
            <PolarGrid stroke="#e2e8f0" />
            <PolarAngleAxis dataKey="name" fontSize={10} tick={{ fill: '#64748b' }} />
            <Radar name="Kỹ năng" dataKey="value" stroke="#6366f1" fill="#6366f1" fillOpacity={0.6} />
            <Tooltip />
          </RadarChart>
        ) : (
          <PieChart>
            <Pie
              data={data.data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.data.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        )}
      </ResponsiveContainer>
    </motion.div>
  );
};

const TypewriterText: React.FC<{ text: string; speed?: number; onComplete?: () => void }> = ({ text, speed = 10, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [index, text, speed, onComplete]);

  return <ReactMarkdown
    components={{
      p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
      ul: ({ children }) => <ul className="list-disc ml-4 mb-3 space-y-1">{children}</ul>,
      ol: ({ children }) => <ol className="list-decimal ml-4 mb-3 space-y-1">{children}</ol>,
      li: ({ children }) => <li className="pl-1">{children}</li>,
      strong: ({ children }) => <strong className="font-bold text-indigo-600 dark:text-indigo-400">{children}</strong>,
      h3: ({ children }) => <h3 className="text-lg font-bold mb-2 text-slate-900">{children}</h3>,
    }}
  >
    {displayedText}
  </ReactMarkdown>;
};

const SkeletonLoader: React.FC = () => (
  <div className="flex gap-3 md:gap-4 justify-start w-full max-w-[85%]">
    <div className="w-9 h-9 md:w-11 md:h-11 rounded-2xl bg-white border border-white/50 flex items-center justify-center shadow-sm shrink-0">
      <Bot className="w-5 h-5 md:w-6 md:h-6 text-indigo-200 animate-pulse" />
    </div>
    <div className="flex-1 space-y-3 p-6 bg-white/40 backdrop-blur-sm border border-white/50 rounded-[2rem] rounded-tl-none">
      <div className="h-4 bg-slate-200 rounded-full w-3/4 animate-pulse"></div>
      <div className="h-4 bg-slate-200 rounded-full w-full animate-pulse"></div>
      <div className="h-4 bg-slate-200 rounded-full w-5/6 animate-pulse"></div>
      <div className="pt-4 grid grid-cols-1 gap-3">
        {[1, 2].map((i) => (
          <div key={i} className="h-20 bg-white/60 rounded-2xl border border-white/40 animate-pulse"></div>
        ))}
      </div>
    </div>
  </div>
);

const CareerMentor: React.FC<{ onNavigate?: (page: string) => void }> = ({ onNavigate }) => {
  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    const saved = localStorage.getItem('orie_chat_sessions');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Chào bạn! Tôi là **Orie Map Career Mentor**. Bạn đang băn khoăn về ngành nghề nào hay cần lộ trình phát triển bản thân? Hãy đặt câu hỏi cho tôi nhé! 🎯' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [activeCharts, setActiveCharts] = useState<Record<number, boolean>>({});
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'vi-VN';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result: any) => result.transcript)
          .join('');
        setInput(transcript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        // Auto send if there's content
        const currentInput = (document.querySelector('textarea') as HTMLTextAreaElement)?.value;
        if (currentInput?.trim()) {
          handleSendFromVoice(currentInput);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setSpeechError('Vui lòng cho phép truy cập micro');
        } else {
          setSpeechError('Lỗi nhận diện giọng nói');
        }
        setTimeout(() => setSpeechError(null), 3000);
      };
    } else {
      setSpeechError('Trình duyệt không hỗ trợ Voice-to-Text');
    }
  }, []);

  const handleSendFromVoice = async (text: string) => {
    if (!text.trim() || loading) return;
    
    const userMsg: Message = { role: 'user', text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await chatWithMentor(messages, text);
      const aiMsg: Message = { role: 'model', text: response };
      const finalMessages = [...newMessages, aiMsg];
      setMessages(finalMessages);

      if (currentSessionId) {
        setSessions(prev => prev.map(s => 
          s.id === currentSessionId 
            ? { ...s, messages: finalMessages, timestamp: Date.now() } 
            : s
        ));
      } else {
        const newSession: ChatSession = {
          id: Date.now().toString(),
          title: text.length > 30 ? text.substring(0, 30) + '...' : text,
          messages: finalMessages,
          timestamp: Date.now()
        };
        setSessions(prev => [newSession, ...prev]);
        setCurrentSessionId(newSession.id);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'Xin lỗi, tôi gặp sự cố kết nối. Vui lòng thử lại sau. 🛠️' }]);
    } finally {
      setLoading(false);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      if (!recognitionRef.current) {
        setSpeechError('Trình duyệt không hỗ trợ Voice-to-Text');
        return;
      }
      setSpeechError(null);
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  useEffect(() => {
    localStorage.setItem('orie_chat_sessions', JSON.stringify(sessions));
  }, [sessions]);

  const parseStructuredMessage = (text: string) => {
    // Remove chart data from display text
    const cleanText = text.replace(/<chart_data>[\s\S]*?<\/chart_data>/g, '').trim();
    
    const sections = [
      { key: '🎯 Phù hợp vì', icon: '🎯', color: 'from-blue-500/10 to-blue-600/10', border: 'border-blue-200/50' },
      { key: '📚 Lộ trình học', icon: '📚', color: 'from-purple-500/10 to-purple-600/10', border: 'border-purple-200/50' },
      { key: '💼 Cơ hội nghề nghiệp', icon: '💼', color: 'from-orange-500/10 to-orange-600/10', border: 'border-orange-200/50' }
    ];

    const result: { title: string; content: string; icon: string; color: string; border: string }[] = [];
    
    // Check if the message contains at least one of the keys
    const hasStructure = sections.some(s => cleanText.includes(s.key));
    
    if (!hasStructure) return null;

    // Split by headers
    const parts = cleanText.split(/###\s+/);
    
    parts.forEach(part => {
      const section = sections.find(s => part.startsWith(s.key));
      if (section) {
        const content = part.replace(section.key, '').trim();
        result.push({
          title: section.key,
          content,
          icon: section.icon,
          color: section.color,
          border: section.border
        });
      }
    });

    return result.length > 0 ? result : null;
  };

  const extractChartData = (text: string) => {
    const match = text.match(/<chart_data>([\s\S]*?)<\/chart_data>/);
    if (match && match[1]) {
      try {
        return JSON.parse(match[1].trim());
      } catch (e) {
        console.error("Failed to parse chart data", e);
        return null;
      }
    }
    return null;
  };

  const copyToClipboard = (text: string, id: number) => {
    const cleanText = text.replace(/<chart_data>[\s\S]*?<\/chart_data>/g, '').trim();
    navigator.clipboard.writeText(cleanText);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleChart = (id: number) => {
    setActiveCharts(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const userMsg: Message = { role: 'user', text: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await chatWithMentor(messages, input);
      const aiMsg: Message = { role: 'model', text: response };
      const finalMessages = [...newMessages, aiMsg];
      setMessages(finalMessages);

      // Update or create session
      if (currentSessionId) {
        setSessions(prev => prev.map(s => 
          s.id === currentSessionId 
            ? { ...s, messages: finalMessages, timestamp: Date.now() } 
            : s
        ));
      } else {
        const newSession: ChatSession = {
          id: Date.now().toString(),
          title: input.length > 30 ? input.substring(0, 30) + '...' : input,
          messages: finalMessages,
          timestamp: Date.now()
        };
        setSessions(prev => [newSession, ...prev]);
        setCurrentSessionId(newSession.id);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'Xin lỗi, tôi gặp sự cố kết nối. Vui lòng thử lại sau. 🛠️' }]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      { role: 'model', text: 'Chào bạn! Tôi là **Orie Map Career Mentor**. Bạn đang băn khoăn về ngành nghề nào hay cần lộ trình phát triển bản thân? Hãy đặt câu hỏi cho tôi nhé! 🎯' }
    ]);
    setCurrentSessionId(null);
  };

  const loadSession = (session: ChatSession) => {
    setMessages(session.messages);
    setCurrentSessionId(session.id);
    setActiveCharts({});
  };

  const deleteSession = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSessions(prev => prev.filter(s => s.id !== id));
    if (currentSessionId === id) {
      clearChat();
    }
  };

  const startRename = (e: React.MouseEvent, session: ChatSession) => {
    e.stopPropagation();
    setRenamingId(session.id);
    setRenameValue(session.title);
  };

  const saveRename = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (renamingId && renameValue.trim()) {
      setSessions(prev => prev.map(s => 
        s.id === renamingId ? { ...s, title: renameValue.trim() } : s
      ));
    }
    setRenamingId(null);
  };

  const cancelRename = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRenamingId(null);
  };

  return (
    <div className="flex h-[calc(100vh-56px)] md:h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-orange-50/50 overflow-hidden">
      {/* Sidebar History - Desktop Only */}
      <aside className="w-80 border-r border-white/40 bg-white/30 backdrop-blur-xl hidden lg:flex flex-col">
        <div className="p-6">
          <button 
            onClick={clearChat}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Plus className="w-5 h-5" /> Đoạn chat mới
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
          <div className="flex items-center justify-between px-2 mb-4">
            <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Lịch sử tư vấn</h4>
            <History className="w-3 h-3 text-slate-400" />
          </div>
          
          {sessions.length === 0 ? (
            <div className="px-4 py-8 text-center">
              <p className="text-xs text-slate-400 font-medium italic">Chưa có lịch sử tư vấn</p>
            </div>
          ) : (
            sessions.map((session) => (
              <div 
                key={session.id}
                onClick={() => loadSession(session)}
                className={cn(
                  "group relative w-full text-left px-4 py-4 rounded-2xl text-sm font-medium transition-all flex items-center gap-3 cursor-pointer",
                  currentSessionId === session.id 
                    ? "bg-indigo-500 text-white shadow-lg shadow-indigo-100" 
                    : "text-slate-600 hover:bg-white/60 hover:shadow-sm"
                )}
              >
                <div className={cn(
                  "w-2 h-2 rounded-full shrink-0",
                  currentSessionId === session.id ? "bg-white" : "bg-indigo-400"
                )} />
                
                {renamingId === session.id ? (
                  <div className="flex-1 flex items-center gap-1" onClick={e => e.stopPropagation()}>
                    <input 
                      autoFocus
                      className="w-full bg-white/20 border-none outline-none text-white px-1 rounded"
                      value={renameValue}
                      onChange={e => setRenameValue(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter') saveRename(e as any);
                        if (e.key === 'Escape') cancelRename(e as any);
                      }}
                    />
                    <button onClick={saveRename} className="p-1 hover:bg-white/20 rounded">
                      <Save className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <span className="truncate flex-1">{session.title}</span>
                )}

                {!renamingId && (
                  <div className={cn(
                    "flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity",
                    currentSessionId === session.id ? "text-white/80" : "text-slate-400"
                  )}>
                    <button 
                      onClick={(e) => startRename(e, session)}
                      className="p-1 hover:bg-black/5 rounded"
                    >
                      <Edit2 className="w-3 h-3" />
                    </button>
                    <button 
                      onClick={(e) => deleteSession(e, session.id)}
                      className="p-1 hover:bg-black/5 rounded"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        <div className="p-6 border-t border-white/40">
          <div className="bg-white/40 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white font-bold">
              MA
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">Minh Anh</p>
              <p className="text-[10px] text-slate-500 font-medium">Học sinh lớp 12</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Chat Area */}
      <main className="flex-1 flex flex-col relative">
        {/* Header - Mobile Only */}
        <div className="lg:hidden p-4 border-b border-white/40 bg-white/30 backdrop-blur-md flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-bold text-slate-800">Career Mentor</span>
          </div>
          <button onClick={clearChat} className="p-2 rounded-lg bg-white/50 text-slate-600">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <div 
          ref={scrollRef} 
          className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 custom-scrollbar scroll-smooth"
        >
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => {
              const structuredData = msg.role === 'model' ? parseStructuredMessage(msg.text) : null;
              
              return (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  className={cn(
                    "flex w-full",
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div className={cn(
                    "flex gap-3 md:gap-4 max-w-[92%] md:max-w-[85%]",
                    msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                  )}>
                    <div className={cn(
                      "w-9 h-9 md:w-11 md:h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-md transition-transform hover:scale-110",
                      msg.role === 'user' 
                        ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white' 
                        : 'bg-white text-indigo-500 border border-white/50'
                    )}>
                      {msg.role === 'user' ? <User className="w-5 h-5 md:w-6 md:h-6" /> : <Bot className="w-5 h-5 md:w-6 md:h-6" />}
                    </div>
                    
                    <div className={cn(
                      "flex flex-col gap-4 w-full",
                      msg.role === 'user' ? 'items-end' : 'items-start'
                    )}>
                      {structuredData ? (
                        <div className="space-y-4 w-full">
                          {/* Introduction if any */}
                          {msg.text.split('###')[0].replace(/<chart_data>[\s\S]*?<\/chart_data>/g, '').trim() && (
                            <motion.div 
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="p-4 md:p-6 rounded-[2rem] rounded-tl-none bg-white/80 backdrop-blur-sm border border-white/50 text-slate-800 shadow-sm"
                            >
                              {i === messages.length - 1 && msg.role === 'model' ? (
                                <TypewriterText text={msg.text.split('###')[0].replace(/<chart_data>[\s\S]*?<\/chart_data>/g, '').trim()} />
                              ) : (
                                <ReactMarkdown>{msg.text.split('###')[0].replace(/<chart_data>[\s\S]*?<\/chart_data>/g, '').trim()}</ReactMarkdown>
                              )}
                            </motion.div>
                          )}
                          
                          {/* Structured Cards */}
                          <div className="grid grid-cols-1 gap-4">
                            {structuredData.map((section, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.15 + 0.2 }}
                                className={cn(
                                  "p-5 md:p-6 rounded-3xl border shadow-sm bg-gradient-to-br",
                                  section.color,
                                  section.border
                                )}
                              >
                                <div className="flex items-center gap-3 mb-4">
                                  <span className="text-2xl">{section.icon}</span>
                                  <h3 className="text-lg font-bold text-slate-800">{section.title.replace(section.icon, '').trim()}</h3>
                                </div>
                                <div className="prose prose-sm md:prose-base max-w-none prose-slate">
                                  {i === messages.length - 1 && msg.role === 'model' ? (
                                    <TypewriterText text={section.content} speed={5} />
                                  ) : (
                                    <ReactMarkdown
                                      components={{
                                        ul: ({ children }) => <ul className="list-disc ml-4 space-y-2">{children}</ul>,
                                        li: ({ children }) => <li className="text-slate-700 font-medium">{children}</li>,
                                      }}
                                    >
                                      {section.content}
                                    </ReactMarkdown>
                                  )}
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className={cn(
                          "p-4 md:p-6 rounded-[2rem] shadow-sm text-sm md:text-base leading-relaxed",
                          msg.role === 'user' 
                            ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-tr-none' 
                            : 'bg-white/80 backdrop-blur-sm border border-white/50 text-slate-800 rounded-tl-none'
                        )}>
                          <div className="prose prose-sm md:prose-base max-w-none prose-slate">
                            {i === messages.length - 1 && msg.role === 'model' ? (
                              <TypewriterText text={msg.text.replace(/<chart_data>[\s\S]*?<\/chart_data>/g, '').trim()} />
                            ) : (
                              <ReactMarkdown
                                components={{
                                  p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
                                  ul: ({ children }) => <ul className="list-disc ml-4 mb-3 space-y-1">{children}</ul>,
                                  ol: ({ children }) => <ol className="list-decimal ml-4 mb-3 space-y-1">{children}</ol>,
                                  li: ({ children }) => <li className="pl-1">{children}</li>,
                                  strong: ({ children }) => <strong className="font-bold text-indigo-600 dark:text-indigo-400">{children}</strong>,
                                  h3: ({ children }) => <h3 className="text-lg font-bold mb-2 text-slate-900">{children}</h3>,
                                }}
                              >
                                {msg.text.replace(/<chart_data>[\s\S]*?<\/chart_data>/g, '').trim()}
                              </ReactMarkdown>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Action Buttons for AI Messages */}
                      {msg.role === 'model' && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          <button 
                            onClick={() => copyToClipboard(msg.text, i)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/50 border border-white/60 text-[10px] font-bold text-slate-500 hover:bg-white hover:text-indigo-600 transition-all shadow-sm"
                          >
                            {copiedId === i ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                            {copiedId === i ? 'Đã chép' : 'Sao chép'}
                          </button>
                          
                          {extractChartData(msg.text) && (
                            <button 
                              onClick={() => toggleChart(i)}
                              className={cn(
                                "flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all shadow-sm text-[10px] font-bold",
                                activeCharts[i] 
                                  ? "bg-indigo-500 border-indigo-500 text-white" 
                                  : "bg-white/50 border-white/60 text-slate-500 hover:bg-white hover:text-indigo-600"
                              )}
                            >
                              <BarChart3 className="w-3 h-3" />
                              {activeCharts[i] ? 'Ẩn biểu đồ' : 'Tạo biểu đồ'}
                            </button>
                          )}

                          <button 
                            onClick={() => onNavigate?.('roadmap')}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/50 border border-white/60 text-[10px] font-bold text-slate-500 hover:bg-white hover:text-indigo-600 transition-all shadow-sm"
                          >
                            <Map className="w-3 h-3" />
                            Xem lộ trình chi tiết
                          </button>
                        </div>
                      )}

                      {/* Chart Display */}
                      {msg.role === 'model' && activeCharts[i] && extractChartData(msg.text) && (
                        <CareerChart data={extractChartData(msg.text)} />
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          
          {loading && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <SkeletonLoader />
            </motion.div>
          )}
        </div>

        {/* Input area */}
        <div className="p-4 md:p-8 bg-gradient-to-t from-white/80 via-white/40 to-transparent backdrop-blur-sm">
          <div className="max-w-4xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 rounded-[2.5rem] blur opacity-20 group-focus-within:opacity-40 transition-opacity duration-500"></div>
            <div className="relative flex items-center">
              <textarea
                rows={1}
                className={cn(
                  "w-full p-4 md:p-6 pr-28 md:pr-36 rounded-[2rem] border border-white/60 bg-white/90 shadow-xl focus:ring-4 ring-indigo-100/50 outline-none resize-none text-slate-800 text-sm md:text-lg placeholder:text-slate-400 transition-all",
                  isListening && "border-red-400 ring-red-100"
                )}
                placeholder={isListening ? "Đang nghe..." : "Hỏi Orie bất cứ điều gì về sự nghiệp..."}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
              />
              <div className="absolute right-3 md:right-4 flex items-center gap-2">
                <button 
                  onClick={toggleListening}
                  className={cn(
                    "w-10 h-10 md:w-14 md:h-14 rounded-2xl flex items-center justify-center transition-all shadow-md",
                    isListening 
                      ? "bg-red-500 text-white animate-pulse" 
                      : "bg-white text-slate-400 hover:text-indigo-500 hover:bg-slate-50"
                  )}
                  title="Voice-to-Text"
                >
                  {isListening ? <MicOff className="w-5 h-5 md:w-6 md:h-6" /> : <Mic className="w-5 h-5 md:w-6 md:h-6" />}
                </button>
                <button 
                  onClick={handleSend}
                  disabled={loading || !input.trim()}
                  className="w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-40 disabled:hover:scale-100 shadow-lg shadow-indigo-200"
                >
                  <Send className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 mt-4">
            {speechError && (
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs font-bold text-red-500 mb-1"
              >
                {speechError}
              </motion.p>
            )}
            <div className="flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-indigo-400" />
              <p className="text-[10px] md:text-xs font-medium text-slate-400">Orie Map AI Mentor • Đồng hành cùng ước mơ của bạn</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CareerMentor;

