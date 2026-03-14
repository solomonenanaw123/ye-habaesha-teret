import React from 'react';
import { Story } from '../types';
import { Calendar, Tag, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface StoryCardProps {
  story: Story;
  onClick: (story: Story) => void;
}

export const StoryCard: React.FC<StoryCardProps> = ({ story, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 cursor-pointer group"
      onClick={() => onClick(story)}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={story.image}
          alt={story.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
          ቀን {story.dayOfYear}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Tag className="h-3 w-3 text-[#008855]" />
          <span className="text-xs font-medium text-[#008855]">{story.category}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2 font-serif group-hover:text-[#008855] transition-colors line-clamp-1">
          {story.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {story.content}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-1 text-gray-400">
            <Calendar className="h-3 w-3" />
            <span className="text-[10px]">ዕለታዊ ተረት</span>
          </div>
          <div className="text-[#008855] flex items-center gap-1 text-sm font-bold">
            አንብብ <ChevronRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};