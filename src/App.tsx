import React, { useState, useMemo } from 'react';
import './styles.css';
import { Header } from './components/Header';
import { StoryCard } from './components/StoryCard';
import { StoryViewer } from './components/StoryViewer';
import { DailySpecial } from './components/DailySpecial';
import { stories } from './data/stories';
import { Story } from './types';
import { motion } from 'framer-motion';
import { Filter, CalendarDays, Heart } from 'lucide-react';
import { Toaster, toast } from 'sonner';

const App: React.FC = () => {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Calculate day of the year (1-365)
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 0);
  const diff = (today.getTime() - startOfYear.getTime()) + ((startOfYear.getTimezoneOffset() - today.getTimezoneOffset()) * 60 * 1000);
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  
  // Story of the day
  const dailyStory = useMemo(() => {
    return stories.find(s => s.dayOfYear === dayOfYear) || stories[0];
  }, [dayOfYear]);

  // Filtered stories
  const filteredStories = useMemo(() => {
    return stories.filter(story => 
      story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.category.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 50); // Show top 50 matches for performance
  }, [searchTerm]);

  const handleStorySelect = (story: Story) => {
    setSelectedStory(story);
    if (story.dayOfYear === dayOfYear) {
      toast.success('የዛሬው ተረት!', {
        description: 'አስደሳች የንባብ ጊዜ ይሁንልህ!',
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <Toaster position="top-center" richColors />
      
      <Header onSearch={setSearchTerm} />

      <main className="container mx-auto px-4 py-8">
        {!searchTerm && (
          <DailySpecial story={dailyStory} onRead={handleStorySelect} />
        )}

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 font-serif">
              {searchTerm ? `ፍለጋ፡ "${searchTerm}"` : 'ሁሉንም ተረቶች'}
            </h2>
            <p className="text-gray-500 mt-1">
              {searchTerm ? `${filteredStories.length} ተረቶች ተገኝተዋል` : '365 ቀናት - 365 ተረቶች'}
            </p>
          </div>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none p-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center">
              <Filter className="h-5 w-5 text-gray-600 mr-2 sm:mr-0" />
              <span className="sm:hidden">አጣራ</span>
            </button>
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-[#008855] text-white rounded-xl font-bold shadow-md">
              <CalendarDays className="h-5 w-5" /> የቀን መቁጠሪያ
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredStories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <StoryCard 
                story={story} 
                onClick={handleStorySelect} 
              />
            </motion.div>
          ))}
        </div>

        {filteredStories.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
            <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">ምንም ተረት አልተገኘም</h3>
            <p className="text-gray-500 max-w-xs mx-auto">ሌላ ቃል ሞክር ወይም ሁሉንም ተረቶች ለመመልከት ፍለጋውን ባዶ አድርግ።</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-16 mt-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
             <div className="bg-[#008855] p-2.5 rounded-xl">
                <Heart className="h-6 w-6 text-white fill-current" />
             </div>
             <span className="text-2xl font-bold font-serif text-gray-800 tracking-tight">እትዬ</span>
          </div>
          <p className="text-gray-500 max-w-lg mx-auto mb-8 text-lg">
            ለኢትዮጵያ ህፃናት በየቀኑ አዳዲስና አስተማሪ ተረቶችን እናቀርባለን። ባሕላችንን ለቀጣዩ ትውልድ እናስተላልፍ።
          </p>
          <div className="flex justify-center gap-6 mb-10">
            <button className="text-gray-400 hover:text-[#008855] font-medium">ስለ እኛ</button>
            <button className="text-gray-400 hover:text-[#008855] font-medium">የግላዊነት ፖሊሲ</button>
            <button className="text-gray-400 hover:text-[#008855] font-medium">አግኙን</button>
          </div>
          <div className="text-sm text-gray-400 border-t border-gray-50 pt-8">
            © {new Date().getFullYear()} ተረት ተረት - የኢትዮጵያ ህፃናት ተረቶች | በአማርኛ የተዘጋጀ
          </div>
        </div>
      </footer>

      <StoryViewer 
        story={selectedStory} 
        onClose={() => setSelectedStory(null)} 
      />
    </div>
  );
};

export default App;