import React, { useState, useMemo } from 'react';
import { Story } from '../types';
import { StoryCard } from './StoryCard';
import { Search, Trophy, Calendar, Sparkles, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface StoryList365Props {
  stories: Story[];
  onSelectStory: (story: Story) => void;
}

export const StoryList365: React.FC<StoryList365Props> = ({ stories, onSelectStory }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState<string>('ሁሉም');
  
  const categories = ['ሁሉም', 'እንስሳት', 'ጥበብ', 'ጀግኖች', 'ተፈጥሮ'];

  const filtered = useMemo(() => {
    return stories.filter(s => {
      const matchesSearch = s.title.includes(searchTerm) || s.content.includes(searchTerm);
      const matchesCat = category === 'ሁሉም' || s.category === category;
      return matchesSearch && matchesCat;
    });
  }, [searchTerm, category, stories]);

  // Group stories by "Months" (approx 30 days)
  const months = [
    { name: 'መስከረም', start: 1, end: 30 },
    { name: 'ጥቅምት', start: 31, end: 60 },
    { name: 'ህዳር', start: 61, end: 90 },
    { name: 'ታህሳስ', start: 91, end: 120 },
    { name: 'ጥር', start: 121, end: 150 },
    { name: 'የካቲት', start: 151, end: 180 },
    { name: 'መጋቢት', start: 181, end: 210 },
    { name: 'ሚያዝያ', start: 211, end: 240 },
    { name: 'ግንቦት', start: 241, end: 270 },
    { name: 'ሰኔ', start: 271, end: 300 },
    { name: 'ሐምሌ', start: 301, end: 330 },
    { name: 'ነሐሴ', start: 331, end: 365 },
  ];

  return (
    <div className="space-y-12">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-3 bg-yellow-100 text-yellow-700 px-6 py-2 rounded-full font-black text-sm mb-4">
          <Trophy className="h-4 w-4" />
          <span>365 ቀናት - ሙሉ የተረቶች ስብስብ</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-gray-900">ለእያንዳንዱ ቀን አንድ ተረት</h2>
        <p className="mt-4 text-gray-500 font-medium max-w-2xl mx-auto">
          በኢትዮጵያ ዘመን አቆጣጠር ለእያንዳንዱ ቀን የሚሆን ምርጥ ተረቶችን እዚህ ያገኛሉ።
        </p>
      </div>

      <div className="bg-white p-6 sm:p-10 rounded-[3rem] shadow-xl border-4 border-white mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 h-6 w-6 group-focus-within:text-[#008855] transition-colors" />
            <input
              type="text"
              placeholder="ተረቱን እዚህ ይፈልጉ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-5 bg-gray-50 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-[#008855]/10 border-2 border-transparent focus:border-[#008855]/20 transition-all text-lg font-medium"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-8 py-4 rounded-[1.5rem] font-black text-sm transition-all whitespace-nowrap ${
                  category === cat
                    ? 'bg-[#008855] text-white shadow-lg'
                    : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-20">
        {months.map(month => {
          const monthStories = filtered.filter(s => s.dayOfYear >= month.start && s.dayOfYear <= month.end);
          if (monthStories.length === 0) return null;

          return (
            <div key={month.name} className="relative">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-16 h-16 bg-[#008855] text-white rounded-2xl flex items-center justify-center shadow-lg font-black text-2xl">
                  {month.name[0]}
                </div>
                <div>
                  <h3 className="text-3xl font-black text-gray-900">{month.name}</h3>
                  <p className="text-[#008855] font-bold uppercase tracking-widest text-xs">ቀን {month.start} - {month.end}</p>
                </div>
                <div className="flex-1 h-1 bg-gray-100 rounded-full" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {monthStories.map(story => (
                  <StoryCard key={story.id} story={story} onClick={onSelectStory} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-40">
           <div className="inline-block p-10 bg-white rounded-full shadow-lg mb-8">
              <Search className="h-16 w-16 text-gray-200" />
           </div>
           <h3 className="text-3xl font-black text-gray-400">የፈለጉት ተረት አልተገኘም</h3>
        </div>
      )}
    </div>
  );
};