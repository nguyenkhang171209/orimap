import React from 'react';
import { motion } from 'motion/react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-center gap-1 px-2 py-1 bg-slate-100 rounded-full w-fit">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0.4, y: 0 }}
          animate={{ opacity: 1, y: -2 }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
            delay: i * 0.15,
          }}
          className="w-1.5 h-1.5 bg-indigo-400 rounded-full"
        />
      ))}
    </div>
  );
};

export default TypingIndicator;
