import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Sparkles, RefreshCcw } from 'lucide-react';
import { 
  YogicAttributes, 
  ATTRIBUTE_LABELS, 
  ATTRIBUTE_DESCRIPTIONS, 
  POSITIVE_ATTRIBUTES, 
  NEGATIVE_ATTRIBUTES 
} from '../types';
import { calculateYogicScore } from '../utils';
import YogicScore from './YogicScore';

const ALL_ATTRIBUTES = [...POSITIVE_ATTRIBUTES, ...NEGATIVE_ATTRIBUTES];

const PersonalScoreCalculator: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(-1); // -1 is Intro, 0-17 are attributes, 18 is result
  const [ratings, setRatings] = useState<Partial<YogicAttributes>>({});
  const [result, setResult] = useState<{ total: number; positive: number; negative: number } | null>(null);

  useEffect(() => {
    document.title = "YogicAnimals | Calculator | Your Spiritual Score";
  }, []);

  // Load existing score from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('userYogicScore');
      if (stored) {
        try {
          const data = JSON.parse(stored);
          if (typeof data.score === 'number' && typeof data.positive === 'number' && typeof data.negative === 'number') {
            setResult({
              total: data.score,
              positive: data.positive,
              negative: data.negative
            });
            setStep(ALL_ATTRIBUTES.length);
          }
        } catch (e) {
          console.error('Failed to parse user score', e);
        }
      }
    } catch (e) {
      // LocalStorage access denied
    }
  }, []);

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const handleStart = () => setStep(0);

  const handleRate = (value: number) => {
    const currentAttr = ALL_ATTRIBUTES[step];
    setRatings(prev => ({ ...prev, [currentAttr]: value }));
    
    // Slight delay for UX
    setTimeout(() => {
      if (step < ALL_ATTRIBUTES.length - 1) {
        setStep(step + 1);
      } else {
        finishCalculation({ ...ratings, [currentAttr]: value } as YogicAttributes);
      }
    }, 200);
  };

  const finishCalculation = (finalRatings: YogicAttributes) => {
    const scores = calculateYogicScore(finalRatings);
    setResult({
      total: scores.total_score,
      positive: scores.positive_score,
      negative: scores.negative_score
    });
    
    // Save to local storage safely
    try {
      const storageData = {
        score: scores.total_score,
        positive: scores.positive_score,
        negative: scores.negative_score,
        attributes: finalRatings,
        date: new Date().toISOString()
      };
      localStorage.setItem('userYogicScore', JSON.stringify(storageData));
      
      // Dispatch event to update listeners (like banners)
      window.dispatchEvent(new Event('storage'));
    } catch (e) {
      console.warn('Could not save score to local storage:', e);
    }
    
    setStep(ALL_ATTRIBUTES.length);
  };

  const currentAttr = step >= 0 && step < ALL_ATTRIBUTES.length ? ALL_ATTRIBUTES[step] : null;
  const isPositive = currentAttr ? POSITIVE_ATTRIBUTES.includes(currentAttr) : true;
  const progress = ((step + 1) / ALL_ATTRIBUTES.length) * 100;

  // Intro Screen
  if (step === -1) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-20">
        <div className="max-w-xl w-full">
            <div className="bg-white rounded-3xl shadow-sm p-8 md:p-12 text-center border border-slate-200">
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-8 text-emerald-600 border border-slate-100">
                <Sparkles size={32} strokeWidth={1.5} />
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-6">Calculate Your Score</h1>
            <p className="text-base text-slate-500 mb-10 leading-relaxed font-light">
                Answer 18 questions based on ancient Eastern philosophy to quantify your spiritual vibration. 
                Be honest—this is for your eyes only.
            </p>
            <button 
                onClick={handleStart}
                className="bg-emerald-600 text-white px-10 py-3.5 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-500/10 transition-all"
            >
                Begin Assessment
            </button>
            <button 
                onClick={() => navigate('/')}
                className="block mt-8 text-slate-400 hover:text-slate-600 text-xs font-bold uppercase tracking-widest mx-auto"
            >
                Cancel
            </button>
            </div>
        </div>
      </div>
    );
  }

  // Result Screen
  if (step === ALL_ATTRIBUTES.length && result) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-20">
         <div className="max-w-xl w-full">
            <div className="bg-white rounded-3xl shadow-sm p-8 md:p-12 text-center border border-slate-200">
                <h2 className="text-xs font-bold text-slate-400 mb-4 uppercase tracking-widest">Assessment Complete</h2>
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-8">Your Vibration</h1>
                
                <div className="flex justify-center mb-10">
                <YogicScore score={result.total} size="giant" />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-10">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="text-[10px] font-bold uppercase text-emerald-600 tracking-wider mb-1">Positive Merits</div>
                    <div className="text-xl font-bold text-slate-700">+{result.positive.toFixed(1)}</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="text-[10px] font-bold uppercase text-rose-600 tracking-wider mb-1">Negative Weight</div>
                    <div className="text-xl font-bold text-slate-700">-{result.negative.toFixed(1)}</div>
                </div>
                </div>

                <div className="flex flex-col gap-3 justify-center">
                <button 
                    onClick={() => navigate('/animals')}
                    className="bg-emerald-600 text-white px-8 py-3.5 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-500/10"
                >
                    Compare to Animals
                </button>
                <button 
                    onClick={() => setStep(-1)}
                    className="text-slate-400 hover:text-slate-600 px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                >
                    <RefreshCcw size={14} /> Recalculate
                </button>
                </div>
            </div>
         </div>
      </div>
    );
  }

  // Question Step
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center px-4 pt-10 pb-20">
      
      {/* Header / Nav */}
      <div className="w-full max-w-2xl mb-8 flex justify-between items-center">
        <button onClick={() => step > 0 ? setStep(step - 1) : setStep(-1)} className="text-slate-400 hover:text-slate-600 transition-colors">
           <ArrowLeft size={20} />
        </button>
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
           {step + 1} / {ALL_ATTRIBUTES.length}
        </div>
        <div className="w-5"></div>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-2xl bg-slate-200 h-1 rounded-full mb-12 overflow-hidden">
         <div 
           className="bg-emerald-500 h-full transition-all duration-300 ease-out"
           style={{ width: `${progress}%` }}
         ></div>
      </div>

      {/* Card */}
      {currentAttr && (
        <div key={step} className="w-full max-w-2xl">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-12 transition-all">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 ${
                    isPositive ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'
                }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${isPositive ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                    {isPositive ? 'Positive Attribute' : 'Negative Attribute'}
                </div>

                <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">
                    {ATTRIBUTE_LABELS[currentAttr].split(' ')[1]}
                </h2>
                
                <p className="text-lg text-slate-500 leading-relaxed mb-12 font-light">
                    {ATTRIBUTE_DESCRIPTIONS[currentAttr]}
                </p>

                <div className="space-y-3">
                    <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">
                        <span>Not at all</span>
                        <span>Completely</span>
                    </div>
                    
                    <div className="grid grid-cols-6 gap-2">
                        {[0, 1, 2, 3, 4, 5].map((val) => (
                            <button
                            key={val}
                            onClick={() => handleRate(val)}
                            className={`
                                py-4 rounded-xl text-lg font-bold border transition-all duration-200
                                ${ratings[currentAttr] === val 
                                ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-inner' 
                                : 'border-slate-100 bg-white text-slate-400 hover:border-emerald-200 hover:text-emerald-600'
                                }
                            `}
                            >
                            {val}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default PersonalScoreCalculator;