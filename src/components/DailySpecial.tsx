import React from 'react';
import { Story } from '../types';
import { Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface DailySpecialProps {
  story: Story;
  onRead: (story: Story) => void;
}

export const DailySpecial: React.FC<DailySpecialProps> = ({ story, onRead }) => {
  return (
    <section className="mb-10 relative overflow-hidden rounded-[2rem] bg-[#008855] text-white p-8 sm:p-12 shadow-2xl">
      <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-4 bg-white/20 w-fit px-4 py-1.5 rounded-full border border-white/30">
            <Sparkles className="h-4 w-4 text-yellow-400" />
            <span className="text-xs font-bold uppercase tracking-widest">የዛሬው ልዩ ተረት</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold font-serif mb-6 leading-tight">
            {story.title}
          </h2>
          <p className="text-white/80 text-lg mb-8 line-clamp-3 font-serif">
            {story.content}
          </p>
          <button
            onClick={() => onRead(story)}
            className="bg-yellow-400 text-red-700 px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-yellow-300 transition-all shadow-lg active:scale-95 group"
          >
            አሁኑኑ አንብብ <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative aspect-square sm:aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20"
        >
          <img
            src={story.image}
            alt={story.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </motion.div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-yellow-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-[-20%] left-[-5%] w-80 h-80 bg-red-600/20 rounded-full blur-3xl" />
    </section>
  );
};