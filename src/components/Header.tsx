import React from 'react';
import { BookOpen, Calendar, Star, Search } from 'lucide-react';

interface HeaderProps {
  onSearch: (term: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  return (
    <header className="sticky top-0 z-50 bg-[#008855] text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-yellow-400 p-2 rounded-full">
              <BookOpen className="text-red-600 h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-serif leading-tight">እትዬ</h1>
              <p className="text-xs text-yellow-100 opacity-90 hidden sm:block">የኢትዮጵያ ህፃናት ተረቶች</p>
            </div>
          </div>
          
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60 h-4 w-4" />
            <input
              type="text"
              placeholder="ተረት ፈልግ..."
              onChange={(e) => onSearch(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-full py-2 pl-10 pr-4 text-white placeholder:text-white/60 focus:outline-none focus:bg-white/20 transition-all"
            />
          </div>
        </div>
      </div>
      
      <div className="bg-[#007744] overflow-x-auto">
        <div className="container mx-auto px-4 flex space-x-6 py-2 whitespace-nowrap scrollbar-hide">
          <button className="flex items-center gap-1.5 text-sm font-medium border-b-2 border-yellow-400 pb-1">
            <Calendar className="h-4 w-4" /> ዛሬ
          </button>
          <button className="flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white pb-1">
            <Star className="h-4 w-4" /> ተወዳጅ
          </button>
          <button className="flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white pb-1">
             365 ቀናት
          </button>
        </div>
      </div>
    </header>
  );
};