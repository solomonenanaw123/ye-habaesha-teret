import React, { useEffect, useRef } from 'react';
import { Story } from '../types';
import { X, Play, Volume2, Heart, Share2, Award, Sparkles, Star, Sun, Moon, ArrowRight, BookOpen } from 'lucide-react';
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
      <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-hidden">
        {/* Immersive Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-[#002211]/95 backdrop-blur-2xl"
          onClick={onClose}
        />
        
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="relative w-full h-full sm:h-[98vh] sm:max-w-5xl bg-[#FFFDF5] sm:rounded-[60px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col border-t-8 border-[#008855]"
        >
          {/* Header Controls - More accessible for small fingers */}
          <div className="absolute top-6 right-6 z-50 flex gap-4">
             <motion.button 
               whileTap={{ scale: 0.9 }}
               className="w-14 h-14 bg-white/90 hover:bg-white text-gray-700 rounded-2xl shadow-2xl flex items-center justify-center transition-all border-2 border-gray-100"
             >
              <Volume2 className="h-7 w-7 text-[#008855]" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="w-14 h-14 bg-[#EF4444] text-white rounded-2xl shadow-2xl flex items-center justify-center transition-all border-2 border-[#EF4444]/20"
            >
              <X className="h-7 w-7" />
            </motion.button>
          </div>

          <div className="flex-1 overflow-y-auto scroll-smooth hide-scrollbar" ref={contentRef}>
            {/* Immersive Hero Section */}
            <div className="relative h-[60vh] sm:h-[70vh] w-full overflow-hidden">
              <motion.img
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5 }}
                src={story.image}
                alt={story.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FFFDF5] via-transparent to-black/20" />
              
              {/* Floating elements for depth */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-20 left-10 p-4 bg-white/20 backdrop-blur-md rounded-full"
              >
                <Sparkles className="h-8 w-8 text-yellow-300 fill-yellow-300" />
              </motion.div>

              <div className="absolute bottom-0 left-0 right-0 p-10 sm:p-20">
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center gap-3 bg-[#008855] text-white px-6 py-2 rounded-2xl text-lg font-black mb-6 shadow-xl w-fit">
                    <BookOpen className="h-5 w-5" />
                    {story.category}
                  </div>
                  <h2 className="text-5xl sm:text-8xl font-black text-gray-900 leading-[1.1] tracking-tight drop-shadow-md font-serif">
                    {story.title}
                  </h2>
                </motion.div>
              </div>
            </div>

            {/* Reading Toolbar - Child friendly large buttons */}
            <div className="px-10 sm:px-20 py-8 flex flex-col sm:flex-row items-center justify-between gap-6 border-b-2 border-orange-100 bg-orange-50/50 sticky top-0 z-40 backdrop-blur-md">
               <div className="flex gap-4 w-full sm:w-auto">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-3 bg-[#008855] text-white px-10 py-5 rounded-[2rem] font-black text-xl shadow-[0_10px_30px_-5px_rgba(0,136,85,0.4)] transition-all"
                  >
                    <Play className="h-6 w-6 fill-current" /> {"ተረቱን አዳምጥ"}
                  </motion.button>
               </div>
               <div className="flex gap-4">
                  <motion.button 
                    whileTap={{ scale: 0.9 }}
                    className="w-16 h-16 bg-white text-red-500 rounded-3xl border-4 border-red-50 shadow-xl flex items-center justify-center hover:bg-red-50 transition-colors"
                  >
                    <Heart className="h-8 w-8 fill-current" />
                  </motion.button>
                  <motion.button 
                    whileTap={{ scale: 0.9 }}
                    className="w-16 h-16 bg-white text-blue-500 rounded-3xl border-4 border-blue-50 shadow-xl flex items-center justify-center hover:bg-blue-50 transition-colors"
                  >
                    <Share2 className="h-8 w-8" />
                  </motion.button>
               </div>
            </div>

            {/* Story Text - Optimized for children's reading */}
            <div className="px-8 sm:px-24 py-16 max-w-5xl mx-auto">
              <div className="space-y-12">
                {paragraphs.map((para, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: 0.1 }}
                    className={`text-3xl sm:text-5xl leading-[1.5] text-gray-800 font-bold tracking-wide relative ${idx === 0 ? 'first-letter:text-9xl first-letter:font-black first-letter:text-[#008855] first-letter:mr-6 first-letter:float-left first-letter:leading-[0.8] first-letter:mt-4 first-letter:drop-shadow-lg' : ''}`}
                  >
                    {para}
                  </motion.p>
                ))}
              </div>

              {/* Moral Box - Gamified/Fun look */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="mt-24 p-12 sm:p-20 bg-gradient-to-br from-yellow-100 via-orange-50 to-white rounded-[60px] border-[12px] border-white shadow-[0_40px_80px_-20px_rgba(255,165,0,0.3)] relative overflow-hidden group"
              >
                <div className="relative z-10 text-center">
                  <div className="inline-flex items-center gap-4 bg-orange-200 text-orange-700 px-8 py-3 rounded-full font-black mb-10 uppercase tracking-[0.2em] text-sm shadow-inner">
                    <Award className="h-6 w-6" />
                    <span>ከተረቱ የምንማረው ምክር</span>
                  </div>
                  <p className="text-4xl sm:text-7xl font-black text-gray-900 italic leading-tight drop-shadow-sm">
                    "{story.moral}"
                  </p>
                </div>
                
                {/* Decorative background elements for moral box */}
                <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-orange-200/30 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-40 h-40 bg-yellow-200/30 rounded-full blur-3xl" />
                <Star className="absolute top-10 right-10 h-16 w-16 text-yellow-400 opacity-20 group-hover:rotate-45 transition-transform duration-1000" />
                <Star className="absolute bottom-10 left-10 h-12 w-12 text-orange-400 opacity-20 group-hover:-rotate-45 transition-transform duration-1000" />
              </motion.div>

              {/* Completion Section */}
              <div className="mt-32 mb-20 text-center">
                <motion.button
                  whileHover={{ scale: 1.05, rotate: [0, -1, 1, 0] }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleConfetti}
                  className="group relative bg-[#008855] text-white px-16 py-8 rounded-[40px] font-black text-3xl shadow-[0_15px_0_0_#006633] hover:shadow-[0_8px_0_0_#006633] hover:translate-y-[7px] active:translate-y-[15px] active:shadow-none transition-all flex items-center justify-center gap-6 mx-auto"
                >
                  <Award className="h-10 w-10 group-hover:animate-bounce" />
                  {"ተረቱን ጨረስኩ! 🎉"}
                </motion.button>
                <p className="mt-8 text-gray-400 font-bold uppercase tracking-widest text-sm">
                  ቀጣዩን ተረት ለመስማት ዝግጁ ነህ?
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};