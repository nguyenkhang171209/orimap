import React from 'react';
import { motion } from 'motion/react';
import { Database, BrainCircuit, UserCheck, ArrowRight, Sparkles, Info, Search, Target } from 'lucide-react';

const GapDiagram: React.FC = () => {
  return (
    <div className="w-full py-12 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-3xl md:text-5xl font-[900] text-[#111E6C] mb-6 tracking-tight">
            Thu hẹp khoảng cách <span className="text-[#FF8C00]">Hướng nghiệp</span>
          </h2>
          <p className="text-slate-500 text-base md:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
            Orie Map giải quyết bài toán từ dữ liệu thô đến quyết định cá nhân thông qua sức mạnh của trí tuệ nhân tạo.
          </p>
        </div>

        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-0">
          {/* Background Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 hidden lg:block z-0"></div>

          {/* Step 1: Information */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative z-10 flex flex-col items-center group w-full lg:w-1/3"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 bg-white border-4 border-slate-100 rounded-[2.5rem] flex items-center justify-center shadow-xl group-hover:border-blue-500 transition-colors duration-500">
              <Database className="w-10 h-10 md:w-14 md:h-14 text-slate-400 group-hover:text-blue-500 transition-colors" />
            </div>
            <div className="mt-8 text-center px-6">
              <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-3">Thông tin</h3>
              <p className="text-slate-500 text-sm md:text-base font-medium">Hàng ngàn ngành học, trường đại học và điểm chuẩn rời rạc.</p>
            </div>
            <div className="mt-6 flex gap-2">
              <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-black rounded-full uppercase tracking-widest">Dữ liệu thô</span>
              <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-black rounded-full uppercase tracking-widest">Phức tạp</span>
            </div>
          </motion.div>

          {/* The Gap / Bridge */}
          <div className="lg:w-1/6 flex justify-center items-center relative z-10">
            <motion.div 
              animate={{ x: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="bg-[#FF8C00] p-3 md:p-4 rounded-full shadow-2xl shadow-orange-500/30"
            >
              <ArrowRight className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </motion.div>
          </div>

          {/* Step 2: Analysis */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative z-10 flex flex-col items-center group w-full lg:w-1/3"
          >
            <div className="w-28 h-28 md:w-40 md:h-40 bg-[#111E6C] rounded-[3rem] flex items-center justify-center shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-transparent"></div>
              <BrainCircuit className="w-12 h-12 md:w-20 md:h-20 text-white relative z-10" />
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                className="absolute inset-0 border-2 border-dashed border-white/20 rounded-full scale-150"
              ></motion.div>
            </div>
            <div className="mt-8 text-center px-6">
              <h3 className="text-xl md:text-2xl font-black text-[#111E6C] mb-3">Phân tích AI</h3>
              <p className="text-slate-500 text-sm md:text-base font-medium">Xử lý ngôn ngữ tự nhiên, khớp khung năng lực và dự báo xu hướng.</p>
            </div>
            <div className="mt-6 flex gap-2">
              <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black rounded-full uppercase tracking-widest">Gemini 3.1</span>
              <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black rounded-full uppercase tracking-widest">Tối ưu</span>
            </div>
          </motion.div>

          {/* The Gap / Bridge */}
          <div className="lg:w-1/6 flex justify-center items-center relative z-10">
            <motion.div 
              animate={{ x: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
              className="bg-[#FF8C00] p-3 md:p-4 rounded-full shadow-2xl shadow-orange-500/30"
            >
              <ArrowRight className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </motion.div>
          </div>

          {/* Step 3: Personalization */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative z-10 flex flex-col items-center group w-full lg:w-1/3"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 bg-[#FF8C00] rounded-[2.5rem] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500">
              <UserCheck className="w-10 h-10 md:w-14 md:h-14 text-white" />
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute -top-2 -right-2 bg-white p-2 rounded-full shadow-lg"
              >
                <Sparkles className="w-4 h-4 text-[#FF8C00]" />
              </motion.div>
            </div>
            <div className="mt-8 text-center px-6">
              <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-3">Cá nhân hóa</h3>
              <p className="text-slate-500 text-sm md:text-base font-medium">Lộ trình riêng biệt, Mentor tư vấn 24/7 và mục tiêu cụ thể.</p>
            </div>
            <div className="mt-6 flex gap-2">
              <span className="px-3 py-1 bg-orange-50 text-[#FF8C00] text-[10px] font-black rounded-full uppercase tracking-widest">Độc bản</span>
              <span className="px-3 py-1 bg-orange-50 text-[#FF8C00] text-[10px] font-black rounded-full uppercase tracking-widest">Chính xác</span>
            </div>
          </motion.div>
        </div>

        {/* The "Gap" Highlight */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-20 md:mt-32 p-8 md:p-12 bg-slate-50 rounded-[3rem] border border-slate-200 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Search className="w-32 h-32 text-[#111E6C]" />
          </div>
          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 text-xs font-black uppercase tracking-widest text-[#111E6C]">
                <Info className="w-4 h-4" /> Tại sao Orie Map ra đời?
              </div>
              <h4 className="text-2xl md:text-4xl font-black text-[#111E6C] leading-tight">
                Lấp đầy khoảng trống trong định hướng nghề nghiệp
              </h4>
              <p className="text-slate-600 text-sm md:text-lg font-medium leading-relaxed">
                Học sinh thường bị "ngợp" bởi lượng thông tin khổng lồ nhưng lại thiếu đi sự phân tích sâu sắc để biết điều gì thực sự phù hợp với bản thân. Orie Map đóng vai trò là cầu nối thông minh, biến dữ liệu thành tri thức và hành động.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <p className="text-3xl font-black text-[#FF8C00] mb-1">60%</p>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider leading-tight">Sinh viên chọn sai ngành học</p>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <p className="text-3xl font-black text-[#111E6C] mb-1">24/7</p>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider leading-tight">AI Mentor hỗ trợ tức thì</p>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <p className="text-3xl font-black text-[#111E6C] mb-1">100%</p>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider leading-tight">Lộ trình cá nhân hóa</p>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <p className="text-3xl font-black text-[#FF8C00] mb-1">98%</p>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider leading-tight">Độ chính xác phân tích</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GapDiagram;
