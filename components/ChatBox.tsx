
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2, RefreshCw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { chatWithGemini, ChatMessage } from '../services/geminiService';

/**
 * Utility for tailwind class merging
 */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Component to render text with a typing effect
 */
const TypingEffect: React.FC<{ text: string }> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      if (i > text.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 5); // Fast typing speed

    return () => clearInterval(interval);
  }, [text]);

  return (
    <div className="max-w-none text-slate-800">
      <ReactMarkdown>{displayedText}</ReactMarkdown>
      {isTyping && <span className="inline-block w-2 h-4 bg-indigo-600/50 ml-1 animate-pulse" />}
    </div>
  );
};

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('orie_chat_history');
    return saved ? JSON.parse(saved) : [
      { role: 'model', text: 'Chào bạn! Tôi là Orie Map AI Mentor. Tôi ở đây để giúp bạn định hướng nghề nghiệp, chọn trường và xây dựng lộ trình học tập. Bạn đang quan tâm đến lĩnh vực nào?' }
    ];
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isLoading]);

  // Save history to localStorage
  useEffect(() => {
    localStorage.setItem('orie_chat_history', JSON.stringify(messages));
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    const newUserMsg: ChatMessage = { role: 'user', text: userMessage };
    
    setMessages(prev => [...prev, newUserMsg]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const aiResponse = await chatWithGemini(messages, userMessage);
      setMessages(prev => [...prev, { role: 'model', text: aiResponse }]);
    } catch (err: any) {
      setError(err.message || "Đã xảy ra lỗi không xác định.");
      setMessages(prev => [...prev, { role: 'model', text: "⚠️ Rất tiếc, tôi đang gặp sự cố kỹ thuật. Vui lòng thử lại sau giây lát." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = () => {
    if (window.confirm("Bạn có chắc muốn xóa toàn bộ lịch sử trò chuyện?")) {
      const initialMsg: ChatMessage = { role: 'model', text: 'Chào bạn! Tôi là Orie Map AI Mentor. Tôi ở đây để giúp bạn định hướng nghề nghiệp, chọn trường và xây dựng lộ trình học tập. Bạn đang quan tâm đến lĩnh vực nào?' };
      setMessages([initialMsg]);
      localStorage.removeItem('orie_chat_history');
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-indigo-600 text-white flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg leading-tight">AI Career Mentor</h3>
            <p className="text-xs text-indigo-100 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Đang trực tuyến
            </p>
          </div>
        </div>
        <button 
          onClick={clearHistory}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          title="Xóa lịch sử"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-slate-50/50"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "flex gap-3 max-w-[85%]",
                msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm",
                msg.role === 'user' ? "bg-indigo-600 text-white" : "bg-white text-indigo-600 border border-slate-200"
              )}>
                {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>
              
              <div className={cn(
                "p-4 rounded-2xl text-sm leading-relaxed shadow-sm",
                msg.role === 'user' 
                  ? "bg-indigo-600 text-white rounded-tr-none" 
                  : "bg-white border border-slate-200 text-slate-800 rounded-tl-none"
              )}>
                {msg.role === 'model' && idx === messages.length - 1 && !isLoading ? (
                  <TypingEffect text={msg.text} />
                ) : (
                  <div className={cn(
                    "max-w-none",
                    msg.role === 'user' ? "text-white" : "text-slate-800"
                  )}>
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3 mr-auto max-w-[85%]"
          >
            <div className="w-8 h-8 rounded-lg bg-white text-indigo-600 border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
              <Bot className="w-5 h-5" />
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2 text-slate-400 text-sm">
              <Loader2 className="w-4 h-4 animate-spin" />
              AI Mentor đang suy nghĩ...
            </div>
          </motion.div>
        )}

        {error && (
          <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-xs rounded-xl text-center">
            {error}
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto flex gap-2">
          <textarea
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Hỏi AI Mentor về ngành học, trường học..."
            className="flex-1 p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none text-sm transition-all bg-slate-50 focus:bg-white"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center transition-all shadow-lg",
              isLoading || !input.trim() 
                ? "bg-slate-100 text-slate-400 cursor-not-allowed shadow-none" 
                : "bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 active:scale-95"
            )}
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </div>
        <p className="text-[10px] text-slate-400 text-center mt-3">
          AI Mentor có thể đưa ra thông tin chưa chính xác. Hãy tham khảo thêm ý kiến từ thầy cô và gia đình.
        </p>
      </div>
    </div>
  );
};

export default ChatBox;
