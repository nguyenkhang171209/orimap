
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { sendMessageToGemini, type ChatMessage } from '../services/geminiService';

// Utility để merge tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    // Thử khôi phục từ localStorage nếu có (Nâng cấp đề xuất)
    const saved = localStorage.getItem('oriemap_chat_history');
    return saved ? JSON.parse(saved) : [
      { role: 'model', text: 'Chào bạn! Tôi là Orie Map AI Mentor. Tôi có thể giúp gì cho bạn trong việc định hướng nghề nghiệp hôm nay?' }
    ];
  });
  
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Tự động scroll xuống cuối khi có tin nhắn mới
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Lưu lịch sử vào localStorage (Nâng cấp đề xuất)
  useEffect(() => {
    localStorage.setItem('oriemap_chat_history', JSON.stringify(messages));
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    const newMessages = [...messages, userMessage];
    
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      // Gửi toàn bộ lịch sử (trừ tin nhắn chào mừng đầu tiên nếu muốn tiết kiệm token, 
      // nhưng ở đây ta gửi hết theo yêu cầu)
      const aiResponse = await sendMessageToGemini(messages, input);
      
      setMessages(prev => [...prev, { role: 'model', text: aiResponse || 'Xin lỗi, tôi không nhận được phản hồi.' }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: '⚠️ Đã có lỗi xảy ra khi kết nối với AI Mentor. Vui lòng kiểm tra kết nối mạng hoặc API Key của bạn.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    if (window.confirm('Bạn có chắc muốn xóa toàn bộ lịch sử trò chuyện?')) {
      const initialMsg: ChatMessage = { role: 'model', text: 'Chào bạn! Tôi là Orie Map AI Mentor. Tôi có thể giúp gì cho bạn trong việc định hướng nghề nghiệp hôm nay?' };
      setMessages([initialMsg]);
      localStorage.removeItem('oriemap_chat_history');
    }
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
      {/* Header */}
      <div className="bg-[#111E6C] p-4 flex justify-between items-center text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
            <Bot className="w-6 h-6 text-orange-400" />
          </div>
          <div>
            <h3 className="font-bold text-lg leading-tight">AI Career Mentor</h3>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[10px] text-blue-100/70 uppercase tracking-widest font-bold">Trực tuyến</span>
            </div>
          </div>
        </div>
        <button 
          onClick={clearChat}
          className="text-xs text-blue-100/50 hover:text-white transition-colors font-medium px-3 py-1 rounded-lg hover:bg-white/5"
        >
          Xóa lịch sử
        </button>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-slate-50/50 custom-scrollbar"
      >
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={cn(
              "flex gap-3 md:gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300",
              msg.role === 'user' ? "flex-row-reverse" : "flex-row"
            )}
          >
            {/* Avatar */}
            <div className={cn(
              "w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm",
              msg.role === 'user' ? "bg-orange-500 text-white" : "bg-white text-[#111E6C] border border-slate-200"
            )}>
              {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
            </div>

            {/* Bubble */}
            <div className={cn(
              "max-w-[85%] md:max-w-[75%] p-3 md:p-4 rounded-2xl shadow-sm text-sm md:text-base leading-relaxed",
              msg.role === 'user' 
                ? "bg-orange-500 text-white rounded-tr-none" 
                : "bg-white border border-slate-200 text-slate-800 rounded-tl-none"
            )}>
              <div className="prose prose-sm md:prose-base max-w-none prose-slate">
                <ReactMarkdown
                  components={{
                    p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                    ul: ({ children }) => <ul className="list-disc pl-4 mb-2">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal pl-4 mb-2">{children}</ol>,
                    li: ({ children }) => <li className="mb-1">{children}</li>,
                    strong: ({ children }) => <strong className="font-bold text-inherit">{children}</strong>,
                  }}
                >
                  {msg.text}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        ))}

        {/* Loading State */}
        {isLoading && (
          <div className="flex gap-3 md:gap-4 flex-row animate-pulse">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center">
              <Bot className="w-5 h-5 text-slate-300" />
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-2xl rounded-tl-none flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-orange-500" />
              <span className="text-slate-400 text-sm font-medium">AI Mentor đang suy nghĩ...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto relative group">
          <textarea
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Hỏi AI Mentor về ngành học, trường học..."
            className="w-full p-4 pr-14 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-orange-100 focus:border-orange-300 outline-none transition-all resize-none text-slate-800"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className={cn(
              "absolute right-2 top-2 w-10 h-10 rounded-lg flex items-center justify-center transition-all",
              input.trim() && !isLoading 
                ? "bg-[#111E6C] text-white hover:bg-blue-800 shadow-lg" 
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            )}
          >
            <Send className={cn("w-5 h-5", isLoading && "animate-pulse")} />
          </button>
        </div>
        <div className="flex items-center justify-center gap-2 mt-3">
          <Sparkles className="w-3 h-3 text-orange-400" />
          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
            Powered by Gemini AI • Orie Map Career Guidance
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
