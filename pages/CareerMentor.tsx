
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, History, Sparkles, Loader2, BarChart3, Activity, TrendingUp } from 'lucide-react';
import { chatWithMentorStream } from '../services/gemini';
import { Message } from '../types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Radar, RadarChart, PolarGrid, PolarAngleAxis,
  PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts';

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316', '#eab308'];

const ChartRenderer: React.FC<{ data: any }> = ({ data }) => {
  if (!data || !data.labels || !data.data) return null;

  const chartData = data.labels.map((label: string, index: number) => ({
    name: label,
    value: data.data[index]
  }));

  return (
    <div className="w-full h-64 mt-4 bg-slate-50 rounded-2xl p-4 border border-slate-100">
      <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
        <BarChart3 className="w-3 h-3" /> {data.title || 'Phân tích dữ liệu'}
      </h4>
      <ResponsiveContainer width="100%" height="100%">
        {data.chartType === 'bar' ? (
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="name" fontSize={10} tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis fontSize={10} tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              itemStyle={{ color: '#6366f1', fontWeight: 'bold' }}
            />
            <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
          </BarChart>
        ) : data.chartType === 'radar' ? (
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
            <PolarGrid stroke="#e2e8f0" />
            <PolarAngleAxis dataKey="name" fontSize={10} tick={{ fill: '#64748b' }} />
            <Radar name="Chỉ số" dataKey="value" stroke="#6366f1" fill="#6366f1" fillOpacity={0.6} />
            <Tooltip />
          </RadarChart>
        ) : data.chartType === 'pie' ? (
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {chartData.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        ) : (
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="name" fontSize={10} tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis fontSize={10} tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} dot={{ r: 4, fill: '#6366f1' }} />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

const CareerMentor: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Chào bạn! Tôi là Orie Map Career Mentor. Bạn đang băn khoăn về ngành nghề nào hay cần lộ trình phát triển bản thân? Hãy đặt câu hỏi cho tôi nhé!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, streamingText]);

  const parseResponse = (text: string) => {
    const contentMatch = text.match(/---CONTENT---([\s\S]*?)---CHART---/);
    const chartMatch = text.match(/---CHART---([\s\S]*?)---END---/);
    
    let markdown = text;
    let chartData = null;

    if (contentMatch) {
      markdown = contentMatch[1].trim();
    }
    
    if (chartMatch) {
      try {
        const jsonStr = chartMatch[1].trim();
        if (jsonStr) {
          chartData = JSON.parse(jsonStr);
        }
      } catch (e) {
        console.error("Failed to parse chart JSON", e);
      }
    }

    return { markdown, chartData };
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const userMsg: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    setStreamingText('');

    try {
      await chatWithMentorStream(messages, input, (chunk) => {
        setStreamingText(chunk);
      });
      
      setMessages(prev => [...prev, { role: 'model', text: streamingText || '' }]);
      setStreamingText('');
    } catch {
      setMessages(prev => [...prev, { role: 'model', text: 'Xin lỗi, tôi gặp sự cố kết nối. Vui lòng thử lại sau.' }]);
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
            onClick={() => setMessages([{ role: 'model', text: 'Chào bạn! Tôi là Orie Map Career Mentor. Bạn đang băn khoăn về ngành nghề nào hay cần lộ trình phát triển bản thân? Hãy đặt câu hỏi cho tôi nhé!' }])}
            className="w-full flex items-center justify-center gap-2 bg-indigo-50 text-indigo-600 py-3 rounded-xl font-bold hover:bg-indigo-100 transition-all"
          >
            <Sparkles className="w-4 h-4" /> Đoạn chat mới
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-4">Lịch sử tư vấn</h4>
          {['Ngành CNTT 2024', 'Luyện thi khối A', 'Du học hay nội địa?'].map((h, i) => (
            <button key={i} className="w-full text-left px-4 py-3 rounded-xl text-sm text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-3">
              <History className="w-4 h-4 text-slate-400" /> {h}
            </button>
          ))}
        </div>
      </aside>

      {/* Chat Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-10 space-y-6 md:space-y-8 custom-scrollbar">
          {messages.map((msg, i) => {
            const { markdown, chartData } = parseResponse(msg.text);
            return (
              <div key={i} className={`flex gap-3 md:gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-3 md:gap-4 max-w-[95%] md:max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                    msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600 border border-slate-200'
                  }`}>
                    {msg.role === 'user' ? <User className="w-5 h-5 md:w-6 md:h-6" /> : <Bot className="w-5 h-5 md:w-6 md:h-6" />}
                  </div>
                  <div className={`p-4 md:p-6 rounded-2xl md:rounded-[2rem] shadow-sm text-sm leading-relaxed ${
                    msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-800'
                  }`}>
                    <div className="markdown-body prose prose-slate max-w-none prose-sm md:prose-base prose-headings:font-black prose-headings:tracking-tighter prose-p:font-medium prose-strong:font-black">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
                    </div>
                    {chartData && <ChartRenderer data={chartData} />}
                  </div>
                </div>
              </div>
            );
          })}
          
          {streamingText && (
            <div className="flex gap-3 md:gap-4 justify-start">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5 md:w-6 md:h-6 text-indigo-600" />
              </div>
              <div className="p-4 md:p-6 bg-white border border-slate-200 rounded-2xl md:rounded-[2rem] shadow-sm text-sm leading-relaxed text-slate-800 max-w-[95%] md:max-w-[85%]">
                <div className="markdown-body prose prose-slate max-w-none prose-sm md:prose-base prose-headings:font-black prose-headings:tracking-tighter prose-p:font-medium prose-strong:font-black">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{parseResponse(streamingText).markdown}</ReactMarkdown>
                </div>
                {parseResponse(streamingText).chartData && <ChartRenderer data={parseResponse(streamingText).chartData} />}
              </div>
            </div>
          )}

          {loading && !streamingText && (
            <div className="flex gap-3 md:gap-4 justify-start animate-pulse">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-white border border-slate-200 flex items-center justify-center"><Bot className="w-5 h-5 md:w-6 md:h-6 text-indigo-300" /></div>
              <div className="p-4 bg-white border border-slate-200 rounded-2xl text-slate-400 text-sm font-bold flex items-center gap-3">
                <Loader2 className="w-4 h-4 animate-spin" /> Orie AI đang suy nghĩ...
              </div>
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="p-4 md:p-8 bg-gradient-to-t from-slate-50 via-slate-50 to-transparent">
          <div className="max-w-4xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl md:rounded-[2rem] blur opacity-10 group-focus-within:opacity-25 transition duration-1000"></div>
            <textarea
              rows={1}
              className="relative w-full p-4 md:p-5 pr-14 md:pr-20 rounded-xl md:rounded-[2rem] border border-slate-200 bg-white shadow-2xl focus:ring-4 ring-indigo-50 outline-none resize-none text-slate-800 text-sm md:text-base font-medium placeholder:text-slate-300"
              placeholder="Hỏi Orie Mentor về ngành học, trường học hoặc lộ trình..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
            />
            <button 
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="absolute right-2 md:right-3 top-2 md:top-3 w-10 h-10 md:w-12 md:h-12 bg-indigo-600 text-white rounded-lg md:rounded-[1.5rem] flex items-center justify-center hover:bg-indigo-700 transition-all disabled:opacity-50 shadow-lg shadow-indigo-600/20 active:scale-95"
            >
              <Send className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
          <div className="mt-4 flex justify-center gap-4 md:gap-8">
            {[
              { label: 'So sánh ngành', icon: Activity },
              { label: 'Lộ trình học', icon: TrendingUp },
              { label: 'Xu hướng nghề', icon: Sparkles }
            ].map((tag, i) => (
              <button 
                key={i}
                onClick={() => setInput(tag.label)}
                className="text-[10px] md:text-xs font-black text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-widest flex items-center gap-2"
              >
                <tag.icon className="w-3 h-3" /> {tag.label}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CareerMentor;
