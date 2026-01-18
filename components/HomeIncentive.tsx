import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, RefreshCcw } from 'lucide-react';
import YogicScore from './YogicScore';

const HomeIncentive: React.FC = () => {
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
    window.addEventListener('storage', checkScore);
    return () => window.removeEventListener('storage', checkScore);
  }, []);

  const handleCalculate = () => {
    navigate('/calculate');
  };

  return (
    <div className="container mx-auto px-4 pb-32 relative z-10 max-w-6xl">
       
        <div>
            <div className="bg-white p-12 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden relative">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-50 to-slate-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-70 pointer-events-none"></div>

                <div className="relative z-10 flex flex-col items-center text-center">
                    
                    {score === null ? (
                        <>
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 text-emerald-600 shadow-sm border border-slate-100">
                                <Sparkles size={28} strokeWidth={1.5} />
                            </div>
                            
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">
                                What is your spiritual signature?
                            </h2>
                            
                            <p className="text-lg text-slate-500 font-light leading-relaxed max-w-2xl mb-10">
                                Take the assessment to quantify your own yogic vibration. Compare your spiritual profile against the diverse consciousness of the animal kingdom.
                            </p>

                            <button 
                                onClick={handleCalculate}
                                className="bg-emerald-600 text-white px-10 py-4 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-500/10 transition-all flex items-center gap-3"
                            >
                                Calculate My Score <ArrowRight size={16} />
                            </button>
                        </>
                    ) : (
                        <>
                            <div className="mb-6">
                                <YogicScore score={score} size="giant" align="center" />
                            </div>

                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">
                                Your Vibration
                            </h2>
                            
                            <p className="text-lg text-slate-500 font-light leading-relaxed max-w-2xl mb-10">
                                You have quantified your spiritual footprint. Explore the animal kingdom to see which species share your energetic resonance.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <button 
                                    onClick={() => navigate('/animals')}
                                    className="bg-emerald-600 text-white px-10 py-4 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-500/10 transition-all"
                                >
                                    Compare to Animals
                                </button>
                                <button 
                                    onClick={handleCalculate}
                                    className="px-8 py-4 rounded-full font-bold text-sm tracking-widest uppercase text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                                >
                                    <RefreshCcw size={16} /> Recalculate
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
};

export default HomeIncentive;