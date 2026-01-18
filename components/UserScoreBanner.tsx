import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, RefreshCcw } from 'lucide-react';
import YogicScore from './YogicScore';

interface UserScoreBannerProps {
  variant?: 'full' | 'compact';
  className?: string;
}

const UserScoreBanner: React.FC<UserScoreBannerProps> = ({ variant = 'full', className = '' }) => {
  const navigate = useNavigate();
  const [score, setScore] = useState<number | null>(null);

  const checkScore = () => {
    try {
      const stored = localStorage.getItem('userYogicScore');
      if (stored) {
        try {
          const data = JSON.parse(stored);
          if (typeof data.score === 'number') {
            setScore(data.score);
          }
        } catch (e) {
          console.error('Failed to parse user score', e);
        }
      }
    } catch (e) {
      // LocalStorage access denied
    }
  };

  useEffect(() => {
    checkScore();
    
    // Listen for storage changes in case score updates in another tab or component
    window.addEventListener('storage', checkScore);
    return () => window.removeEventListener('storage', checkScore);
  }, []);

  const handleCalculate = () => {
    navigate('/calculate');
  };

  if (score !== null) {
    // Has Score - Elegant Slate/Emerald
    return (
      <div className={`bg-white rounded-2xl shadow-sm border border-emerald-100 p-6 relative overflow-hidden group ${className}`}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl -mr-10 -mt-10 opacity-60 pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-5">
             <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                <YogicScore score={score} size="md" />
             </div>
             <div className="text-center sm:text-left">
                <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-0.5">Your Profile</div>
                <div className="font-serif font-bold text-xl text-slate-900">Spiritual Vibration</div>
             </div>
          </div>
          
          <button 
            onClick={handleCalculate}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-emerald-700 transition-colors bg-white hover:bg-emerald-50 px-5 py-3 rounded-lg border border-slate-200 hover:border-emerald-200"
          >
            <RefreshCcw size={14} /> <span className="hidden sm:inline">Recalculate</span>
          </button>
        </div>
      </div>
    );
  }

  // No Score - Incentive - Clean Slate/Emerald
  return (
    <div 
        className={`bg-white rounded-2xl shadow-sm border border-slate-200 p-6 relative overflow-hidden cursor-pointer transition-all hover:border-emerald-300 hover:shadow-md group ${className}`} 
        onClick={handleCalculate}
    >
        <div className="absolute -right-10 -top-10 w-48 h-48 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
           <div className="flex items-center gap-5">
               <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center border border-emerald-100 text-emerald-600 shrink-0 group-hover:scale-105 transition-transform shadow-sm">
                  <Sparkles size={24} strokeWidth={1.5} />
               </div>
               <div className="text-center sm:text-left">
                  <h3 className="font-serif font-bold text-xl text-slate-900 mb-1 group-hover:text-emerald-800 transition-colors">What is your spiritual signature?</h3>
                  <p className="text-slate-500 text-sm font-light">Discover your unique energetic footprint in the web of life.</p>
               </div>
           </div>
           
           <button className="bg-emerald-600 text-white px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest shadow-lg shadow-emerald-500/20 hover:bg-emerald-700 hover:shadow-emerald-500/30 transition-all flex items-center gap-2 shrink-0">
              Start Assessment <ArrowRight size={14} />
           </button>
        </div>
    </div>
  );
};

export default UserScoreBanner;