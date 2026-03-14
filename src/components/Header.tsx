import React from 'react';
import { BookOpen, Sparkles, Star, Trophy, Map } from 'lucide-react';
import { motion } from 'framer-motion';

export const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-[60] px-4 py-4 pointer-events-none">
      <div className="container mx-auto max-w-7xl flex items-center justify-between pointer-events-auto">
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center gap-3 bg-white/90 backdrop-blur-xl px-6 py-3 rounded-[2rem] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] border-4 border-white"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-[#008855] to-[#006633] rounded-2xl flex items-center justify-center shadow-lg shadow-[#008855]/30">
            <BookOpen className="text-white h-7 w-7" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900 leading-none">ተረት ተረት</h1>
            <p className="text-[10px] font-black text-[#008855] uppercase tracking-[0.2em] mt-1 italic">የኢትዮጵያ ህፃናት</p>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="hidden sm:flex items-center gap-2 bg-white/90 backdrop-blur-xl px-2 py-2 rounded-full shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] border-4 border-white"
        >
          <HeaderTab icon={<Star className="h-4 w-4" />} label="ተወዳጅ" active />
          <HeaderTab icon={<Trophy className="h-4 w-4" />} label="365 ቀናት" />
          <HeaderTab icon={<Map className="h-4 w-4" />} label="የተረቶች ካርታ" />
        </motion.div>

        <motion.button 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 bg-[#008855] text-white rounded-[1.5rem] flex items-center justify-center shadow-xl shadow-[#008855]/30 border-4 border-white pointer-events-auto"
        >
          <Sparkles className="h-7 w-7 fill-current" />
        </motion.button>
      </div>
    </header>
  );
};

interface HeaderTabProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const HeaderTab: React.FC<HeaderTabProps> = ({ icon, label, active }) => (
  <button className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-black transition-all ${active ? 'bg-[#008855] text-white shadow-lg' : 'text-gray-500 hover:bg-gray-100'}`}>
    {icon}
    <span>{label}</span>
  </button>
);