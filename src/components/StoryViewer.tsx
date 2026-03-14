import React, { useEffect, useRef } from 'react';
import { Story } from '../types';
import { X, Play, Volume2, Heart, Share2, Award, Sparkles, Star, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface StoryViewerProps {
  story: Story | null;
  onClose: () => void;
}

export const StoryViewer: React.FC<StoryViewerProps> = ({ story, onClose }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (story) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [story]);

  if (!story) return null;

  const handleConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  };

  const separator = String.fromCharCode(10) + String.fromCharCode(10);
  const paragraphs = story.content.split(separator).filter(p => p.trim() !== '');

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-0 sm:p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-[#1a1a1a]/90 backdrop-blur-md"
          onClick={onClose}
        />
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 50 }}
          className="relative w-full max-w-3xl bg-[#FFFDF5] sm:rounded-[40px] shadow-2xl overflow-hidden h-full sm:h-[95vh] flex flex-col"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-5">
            <Star className="absolute top-10 left-10 h-24 w-24 text-yellow-500" />
            <Sparkles className="absolute top-40 right-20 h-32 w-32 text-blue-500" />
            <Sun className="absolute bottom-20 left-20 h-40 w-40 text-orange-500" />
            <Moon className="absolute bottom-40 right-10 h-28 w-28 text-purple-500" />
          </div>

          {/* Header Controls */}
          <div className="absolute top-6 right-6 z-20 flex gap-2">
             <button className="p-3 bg-white/90 hover:bg-white text-gray-700 rounded-2xl shadow-lg transition-all active:scale-95">
              <Volume2 className="h-6 w-6" />
            </button>
            <button
              onClick={onClose}
              className="p-3 bg-white/90 hover:bg-white text-gray-700 rounded-2xl shadow-lg transition-all active:scale-95"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto scroll-smooth" ref={contentRef}>
            {/* Hero Image */}
            <div className="relative h-[40vh] sm:h-[50vh] w-full">
              <img
                src={story.image}
                alt={story.title}
                className="w-full h-full object-cover shadow-inner"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FFFDF5] via-transparent to-black/30" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="inline-flex items-center gap-2 bg-[#008855] text-white px-4 py-1.5 rounded-full text-sm font-bold mb-4 shadow-lg">
                    <Sparkles className="h-4 w-4 fill-current" />
                    {story.category}
                  </span>
                  <h2 className="text-4xl sm:text-6xl font-black text-gray-900 leading-tight drop-shadow-sm">
                    {story.title}
                  </h2>
                </motion.div>
              </div>
            </div>

            {/* Reading Toolbar */}
            <div className="px-8 sm:px-12 py-6 flex items-center justify-between border-b border-orange-100 bg-orange-50/30 sticky top-0 z-10 backdrop-blur-sm">
               <div className="flex gap-3">
                  <button className="flex items-center gap-2 bg-[#008855] text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:bg-[#007744] active:scale-95 transition-all">
                    <Play className="h-5 w-5 fill-current" /> {"\u12a0\u12f3\u121d\u1325"}
                  </button>
               </div>
               <div className="flex gap-3">
                  <button className="p-3 bg-white text-red-500 rounded-2xl border border-red-100 shadow-sm hover:bg-red-50 transition-colors">
                    <Heart className="h-6 w-6" />
                  </button>
                  <button className="p-3 bg-white text-blue-500 rounded-2xl border border-blue-100 shadow-sm hover:bg-blue-50 transition-colors">
                    <Share2 className="h-6 w-6" />
                  </button>
               </div>
            </div>

            {/* Story Text */}
            <div className="px-8 sm:px-20 py-12 max-w-4xl mx-auto">
              <div className="space-y-8">
                {paragraphs.map((para, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * idx }}
                    className={`text-2xl sm:text-3xl leading-[1.6] text-gray-800 font-medium tracking-wide ${idx === 0 ? 'first-letter:text-7xl first-letter:font-black first-letter:text-[#EF4444] first-letter:mr-4 first-letter:float-left first-letter:leading-[0.8] first-letter:mt-2' : ''}`}
                  >
                    {para}
                  </motion.p>
                ))}
              </div>

              {/* Moral Box */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="mt-16 p-10 bg-gradient-to-br from-yellow-50 to-orange-100 rounded-[40px] border-4 border-white shadow-xl relative overflow-hidden group"
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-3 text-orange-600 font-black mb-6 uppercase tracking-widest text-sm">
                    <div className="p-2 bg-orange-200 rounded-xl">
                      <Award className="h-6 w-6" />
                    </div>
                    <span>{"\u12a8\u1270\u1228\u1271 \u12e8\u121d\u1295\u121b\u1228\u12cd \u121d\u12ad\u122d"}</span>
                  </div>
                  <p className="text-3xl sm:text-4xl font-bold text-gray-900 italic leading-snug">
                    "{story.moral}"
                  </p>
                </div>
                <Sparkles className="absolute top-4 right-4 h-20 w-20 text-orange-200/50 group-hover:rotate-12 transition-transform" />
              </motion.div>

              {/* Celebration Button */}
              <div className="mt-20 mb-16 text-center">
                <button
                  onClick={handleConfetti}
                  className="group relative bg-[#008855] text-white px-12 py-6 rounded-[30px] font-black text-2xl shadow-[0_10px_0_0_#006633] hover:shadow-[0_5px_0_0_#006633] hover:translate-y-[5px] active:translate-y-[10px] active:shadow-none transition-all flex items-center justify-center gap-4 mx-auto"
                >
                  <Award className="h-8 w-8 group-hover:scale-125 transition-transform" />
                  {"\u1270\u1228\u1271\u1295 \u1328\u1228\u1235\u12a9! \ud83c\udf89"}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};