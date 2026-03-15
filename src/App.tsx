import React, { useState, useMemo } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { stories } from './data/stories';
import { Story } from './types';
import { Header } from './components/Header';
import { DailySpecial } from './components/DailySpecial';
import { StoryCard } from './components/StoryCard';
import { StoryViewer } from './components/StoryViewer';
import { StoryList365 } from './components/StoryList365';
import { StoryMap } from './components/StoryMap';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, Trophy } from 'lucide-react';
import { Toaster } from 'sonner';

function App() {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('ሁሉም');
  const navigate = useNavigate();

  const categories = ['ሁሉም', 'እንስሳት', 'ጥበብ', 'ጀግኖች', 'ተፈጥሮ'];

  const filteredStories = useMemo(() => {
    return stories.filter(story => {
      const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          story.content.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'ሁሉም' || story.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  const todayStory = useMemo(() => {
    const today = new Date();
    const start = new Date(today.getFullYear(), 0, 0);
    const diff = today.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    return stories.find(s => s.dayOfYear === (dayOfYear % 365) + 1) || stories[0];
  }, []);

  const HomeView = () => (
    <>
      <DailySpecial story={todayStory} onClick={setSelectedStory} />

      <div className="mt-16 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 text-[#008855] font-black uppercase tracking-widest text-sm mb-2">
              <Sparkles className="h-5 w-5 fill-current" />
              <span>የተረቶች ማከማቻ</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
              ተወዳጅ ተረቶችህን <br /> ፈልግና አንብብ
            </h2>
          </div>
          
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-[#008855] transition-colors" />
            <input
              type="text"
              placeholder="ተረት ፈልግ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border-4 border-white shadow-lg rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-[#008855]/10 focus:border-[#008855]/20 transition-all text-lg font-medium"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-2xl font-black text-sm transition-all shadow-md active:scale-95 ${
                activeCategory === cat
                  ? 'bg-[#008855] text-white shadow-[#008855]/20 scale-105'
                  : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10"
      >
        <AnimatePresence mode="popLayout">
          {filteredStories.slice(0, 12).map((story) => (
            <StoryCard key={story.id} story={story} onClick={setSelectedStory} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredStories.length === 0 && (
        <div className="text-center py-32 bg-white rounded-[3rem] border-4 border-dashed border-gray-100">
          <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
             <Search className="h-10 w-10 text-gray-300" />
          </div>
          <p className="text-2xl font-black text-gray-400 italic">ምንም ተረት አልተገኘም... ሌላ ቃል ይሞክሩ!</p>
        </div>
      )}

      <div className="mt-16 text-center">
        <button 
          onClick={() => navigate('/365-days')}
          className="group inline-flex items-center gap-3 bg-white px-10 py-5 rounded-[2rem] font-black text-gray-800 shadow-xl border-4 border-white hover:bg-gray-50 transition-all active:scale-95"
        >
          <span>ሁሉንም 365 ተረቶች ተመልከት</span>
          <Trophy className="h-6 w-6 text-yellow-500 group-hover:rotate-12 transition-transform" />
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#FFFDF5] text-gray-900 font-sans pb-12 selection:bg-[#008855] selection:text-white">
      <Toaster position="top-center" richColors />
      
      <Header />

      <main className="container mx-auto px-4 pt-28 max-w-7xl">
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/365-days" element={<StoryList365 stories={stories} onSelectStory={setSelectedStory} />} />
          <Route path="/map" element={<StoryMap stories={stories} onSelectStory={setSelectedStory} />} />
        </Routes>
      </main>

      <footer className="mt-24 py-12 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-6 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 bg-[#008855] rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-black text-gray-900">ተረት ተረት</span>
          </div>
          <p className="text-gray-400 font-medium">© 2026 ተረት ተረት - የኢትዮጵያ ህፃናት ተረቶች | በአማርኛ የተዘጋጀ</p>
        </div>
      </footer>

      <StoryViewer
        story={selectedStory}
        onClose={() => setSelectedStory(null)}
      />
    </div>
  );
}

export default App;