import React, { useState } from 'react';
import { Story } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, MapPin, Sparkles, BookOpen, ArrowRight } from 'lucide-react';

interface StoryMapProps {
  stories: Story[];
  onSelectStory: (story: Story) => void;
}

export const StoryMap: React.FC<StoryMapProps> = ({ stories, onSelectStory }) => {
  const [selectedPin, setSelectedPin] = useState<number | null>(null);

  // We'll pick a few "special" locations on the map
  const landmarks = [
    { id: 1, name: 'የአንበሳው ጫካ', x: '20%', y: '30%', color: '#FF9800', category: 'እንስሳት', storyId: 1 },
    { id: 2, name: 'የጥበብ ተራራ', x: '70%', y: '20%', color: '#9C27B0', category: 'ጥበብ', storyId: 3 },
    { id: 3, name: 'የጀግኖች መንደር', x: '40%', y: '60%', color: '#F44336', category: 'ጀግኖች', storyId: 6 },
    { id: 4, name: 'የተፈጥሮ ሸለቆ', x: '80%', y: '70%', color: '#4CAF50', category: 'ተፈጥሮ', storyId: 10 },
    { id: 5, name: 'የጥንቸሏ ወንዝ', x: '15%', y: '75%', color: '#03A9F4', category: 'እንስሳት', storyId: 4 },
  ];

  const mapBg = "https://storage.googleapis.com/dala-prod-public-storage/generated-images/d014d5ac-f5b7-4ada-980f-d89b8b31bd04/ethiopian-story-map-background-f936e619-1773541678783.webp";

  return (
    <div className="relative min-h-[80vh] flex flex-col items-center">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 bg-blue-100 text-blue-700 px-6 py-2 rounded-full font-black text-sm mb-4">
          <Map className="h-4 w-4" />
          <span>የተረቶች ካርታ</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-gray-900">የተረቶችን ዓለም ያስሱ</h2>
        <p className="mt-4 text-gray-500 font-medium max-w-2xl mx-auto">
          በካርታው ላይ ያሉትን ቦታዎች በመንካት የተለያዩ ተረቶችን ያግኙ።
        </p>
      </div>

      <div className="relative w-full max-w-5xl aspect-[4/3] bg-white rounded-[4rem] shadow-2xl overflow-hidden border-8 border-white">
        {/* Map Background */}
        <img 
          src={mapBg} 
          alt="Ethiopia Story Map" 
          className="w-full h-full object-cover opacity-90"
        />
        
        {/* Overlay Grid/Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

        {/* Animated Landmarks */}
        {landmarks.map((loc) => (
          <div 
            key={loc.id}
            className="absolute group"
            style={{ left: loc.x, top: loc.y, transform: 'translate(-50%, -50%)' }}
          >
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedPin(loc.id === selectedPin ? null : loc.id)}
              className="relative"
            >
              <div className="absolute -inset-4 bg-white/30 rounded-full blur-xl group-hover:bg-white/50 transition-all animate-pulse" />
              <div 
                className="relative w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg border-4 border-white transition-transform group-hover:rotate-12"
                style={{ backgroundColor: loc.color }}
              >
                <MapPin className="text-white h-6 w-6" />
              </div>
            </motion.button>

            {/* Tooltip/Popup */}
            <AnimatePresence>
              {selectedPin === loc.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: -80, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.8 }}
                  className="absolute left-1/2 -translate-x-1/2 bottom-full z-20 w-48 sm:w-64"
                >
                  <div className="bg-white rounded-3xl p-5 shadow-2xl border-2 border-gray-100 flex flex-col gap-3 relative">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: loc.color }}
                      />
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{loc.category}</span>
                    </div>
                    <h4 className="text-lg font-black text-gray-900 leading-tight">{loc.name}</h4>
                    <button 
                      onClick={() => {
                        const story = stories.find(s => s.id === loc.storyId);
                        if (story) onSelectStory(story);
                      }}
                      className="flex items-center justify-between w-full bg-gray-50 hover:bg-gray-100 p-3 rounded-xl transition-colors group/btn"
                    >
                      <span className="text-sm font-bold text-gray-700 italic">ተረቱን አንብብ</span>
                      <ArrowRight className="h-4 w-4 text-[#008855] group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                    {/* Triangle pointer */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}

        {/* Floating Icons */}
        <motion.div 
          animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-[10%] left-[15%] pointer-events-none opacity-40"
        >
          <Sparkles className="h-12 w-12 text-yellow-400 fill-current" />
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 7, repeat: Infinity }}
          className="absolute bottom-[20%] right-[10%] pointer-events-none opacity-40"
        >
          <BookOpen className="h-16 w-16 text-[#008855]" />
        </motion.div>
      </div>

      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl">
         {landmarks.map(loc => (
           <div 
            key={loc.id} 
            className="bg-white p-4 rounded-2xl shadow-md border-2 border-transparent hover:border-gray-100 cursor-pointer transition-all"
            onClick={() => {
              const story = stories.find(s => s.id === loc.storyId);
              if (story) onSelectStory(story);
            }}
           >
             <div className="w-10 h-10 rounded-xl mb-3 flex items-center justify-center text-white font-black" style={{ backgroundColor: loc.color }}>
                {loc.id}
             </div>
             <p className="text-sm font-black text-gray-800">{loc.name}</p>
             <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">{loc.category}</p>
           </div>
         ))}
      </div>
    </div>
  );
};