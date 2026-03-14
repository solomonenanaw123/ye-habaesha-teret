import React from 'react';
import { Story } from '../types';
import { Sparkles, ArrowRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';

interface DailySpecialProps {
  story: Story;
  onClick: (story: Story) => void;
}

export const DailySpecial: React.FC<DailySpecialProps> = ({ story, onClick }) => {
  return (
    <section className="mb-20 relative group">
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-[#008855] to-[#006633] text-white p-8 sm:p-16 shadow-[0_30px_60px_-15px_rgba(0,136,85,0.4)] border-8 border-white"
      >
        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-8 bg-white/20 w-fit px-6 py-2.5 rounded-2xl border border-white/30 backdrop-blur-md">
              <Sparkles className="h-5 w-5 text-yellow-300 fill-yellow-300 animate-pulse" />
              <span className="text-sm font-black uppercase tracking-widest italic">የዛሬው ልዩ ተረት</span>
            </div>
            
            <h2 className="text-5xl sm:text-7xl font-black font-serif mb-8 leading-[1.1] tracking-tight drop-shadow-lg">
              {story.title}
            </h2>
            
            <p className="text-white/90 text-xl mb-10 line-clamp-2 font-medium leading-relaxed italic opacity-90">
              "{story.content.substring(0, 150)}..."
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#fff" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onClick(story)}
                className="bg-yellow-400 text-[#006633] px-10 py-5 rounded-[2rem] font-black text-xl flex items-center justify-center gap-3 shadow-2xl transition-all group/btn"
              >
                አሁኑኑ አንብብ <ArrowRight className="h-6 w-6 group-hover/btn:translate-x-2 transition-transform" />
              </motion.button>
              
              <motion.button
                 whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
                 whileTap={{ scale: 0.95 }}
                 className="bg-white/10 text-white px-8 py-5 rounded-[2rem] font-black text-xl flex items-center justify-center gap-3 border border-white/20 backdrop-blur-sm"
              >
                <Play className="h-6 w-6 fill-current" /> አዳምጥ
              </motion.button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotate: 5 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative group/img"
          >
            <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white/10 group-hover/img:scale-105 transition-transform duration-700">
              <img
                src={story.image}
                alt={story.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#006633]/60 via-transparent to-transparent opacity-60" />
              
              {/* Overlapping small badge */}
              <div className="absolute top-6 right-6">
                 <div className="bg-white/90 backdrop-blur-md p-4 rounded-3xl shadow-xl border-2 border-[#008855]/20 flex flex-col items-center">
                    <span className="text-[10px] font-black text-[#008855]">ቀን</span>
                    <span className="text-3xl font-black text-[#008855]">{story.dayOfYear}</span>
                 </div>
              </div>
            </div>
            
            {/* Background glow for image */}
            <div className="absolute -inset-10 bg-yellow-400/20 rounded-full blur-[100px] -z-10 group-hover/img:bg-yellow-400/40 transition-colors" />
          </motion.div>
        </div>

        {/* Decorative Ornaments */}
        <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-white/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-80 h-80 bg-yellow-400/20 rounded-full blur-[100px] pointer-events-none" />
        
        <Sparkles className="absolute top-10 right-1/2 h-12 w-12 text-white/10 animate-spin-slow" />
      </motion.div>
    </section>
  );
};