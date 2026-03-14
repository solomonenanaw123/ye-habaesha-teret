import React from 'react';
import { Story } from '../types';
import { Calendar, Tag, ChevronRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface StoryCardProps {
  story: Story;
  onClick: (story: Story) => void;
}

export const StoryCard: React.FC<StoryCardProps> = ({ story, onClick }) => {
  return (
    <motion.div
      whileHover={{ 
        y: -12,
        scale: 1.02,
        boxShadow: "0 25px 50px -12px rgba(0, 136, 85, 0.25)"
      }}
      whileTap={{ scale: 0.96 }}
      className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white cursor-pointer group transition-all duration-300 relative"
      onClick={() => onClick(story)}
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={story.image}
          alt={story.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-115"
        />
        
        {/* Floating Badge */}
        <div className="absolute top-4 left-4 z-10">
          <motion.div 
            initial={{ rotate: -5 }}
            whileHover={{ rotate: 5, scale: 1.1 }}
            className="bg-[#EF4444] text-white px-4 py-2 rounded-2xl shadow-lg border-2 border-white flex flex-col items-center justify-center leading-none"
          >
            <span className="text-[10px] font-black uppercase opacity-80 mb-0.5">ቀን</span>
            <span className="text-xl font-black">{story.dayOfYear}</span>
          </motion.div>
        </div>

        {/* Decorative Sparkle */}
        <div className="absolute bottom-4 right-4 z-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="p-2 bg-yellow-400 rounded-full shadow-lg border-2 border-white"
          >
            <Sparkles className="h-4 w-4 text-white fill-current" />
          </motion.div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#008855]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 bg-[#008855]/10 rounded-lg">
            <Tag className="h-3.5 w-3.5 text-[#008855]" />
          </div>
          <span className="text-xs font-black text-[#008855] uppercase tracking-wider">{story.category}</span>
        </div>
        
        <h3 className="text-2xl font-black text-gray-800 mb-3 font-serif group-hover:text-[#008855] transition-colors line-clamp-1 leading-tight">
          {story.title}
        </h3>
        
        <p className="text-gray-500 text-base line-clamp-2 mb-6 font-medium leading-relaxed">
          {story.content}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
          <div className="flex items-center gap-2 text-gray-400">
             <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
                <Calendar className="h-4 w-4" />
             </div>
            <span className="text-[11px] font-bold uppercase tracking-tighter italic">ዕለታዊ ተረት</span>
          </div>
          
          <motion.div 
            whileHover={{ x: 5 }}
            className="bg-[#008855] text-white px-5 py-2.5 rounded-2xl flex items-center gap-2 text-sm font-black shadow-lg shadow-[#008855]/20 group-hover:bg-[#007744]"
          >
            አንብብ <ChevronRight className="h-4 w-4 stroke-[3]" />
          </motion.div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-[#008855]/5 rounded-full blur-3xl group-hover:bg-[#008855]/10 transition-colors" />
    </motion.div>
  );
};