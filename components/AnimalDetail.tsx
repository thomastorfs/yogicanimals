import React, { useMemo, useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Animal } from '../types';
import AnimalHeader from './AnimalHeader';
import AnimalAttributes from './AnimalAttributes';
import AnimalRadarChart from './AnimalRadarChart';
import AnimalLinks from './AnimalLinks';
import SimilarAnimals from './SimilarAnimals';
import YogicScore from './YogicScore';
import { Sparkles, ArrowRight } from 'lucide-react';

interface AnimalDetailProps {
  animals: Animal[];
}

const AnimalDetail: React.FC<AnimalDetailProps> = ({ animals }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [userScore, setUserScore] = useState<number | null>(null);
  
  const animal = useMemo(() => 
    animals.find(a => a.id === slug), 
  [slug, animals]);

  useEffect(() => {
    if (animal) {
      document.title = `YogicAnimals | ${animal.name} | Spiritual Profile`;
    } else {
      document.title = "YogicAnimals | 404 | Species Not Found";
    }
  }, [animal]);

  // Load user score safely
  useEffect(() => {
    try {
      const stored = localStorage.getItem('userYogicScore');
      if (stored) {
         try {
           const data = JSON.parse(stored);
           if (typeof data.score === 'number') setUserScore(data.score);
         } catch (e) {}
      }
    } catch (e) {
      // LocalStorage access denied or restricted
    }
  }, []);

  const similarSpecies = useMemo(() => {
    if (!animal) return [];
    // Find animals with closest total score within the same type, or just generally close
    return animals
      .filter(a => a.id !== animal.id)
      .map(a => ({
        ...a,
        scoreDiff: Math.abs(a.total_score - animal.total_score),
        sameType: a.type === animal.type
      }))
      .sort((a, b) => {
        if (a.sameType && !b.sameType) return -1;
        if (!a.sameType && b.sameType) return 1;
        return a.scoreDiff - b.scoreDiff;
      })
      .slice(0, 3); // Limit to 3
  }, [animal, animals]);

  if (!animal) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800">Species Not Found</h2>
          <Link to="/animals" className="text-emerald-600 hover:underline mt-4 block">Return to Animals</Link>
        </div>
      </div>
    );
  }

  const handleAttributeClick = (attrKey: string) => {
    navigate(`/analytics?attr=${attrKey}`);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-12">
      {/* Header */}
      <AnimalHeader animal={animal} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        
        {/* User Comparison Section */}
        {userScore !== null && (
            <div className="bg-white border border-emerald-100 rounded-3xl p-8 mb-10 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-400"></div>
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-slate-900 mb-2">You vs {animal.name}</h3>
                    <p className="text-slate-600 text-sm max-w-xl">
                        {Math.abs(userScore - animal.total_score) < 5 
                          ? `You are spiritually very similar to a ${animal.name}.` 
                          : userScore > animal.total_score 
                            ? `You have a higher yogic vibration than a ${animal.name}.` 
                            : `The ${animal.name} exhibits more sattvic qualities than your current score.`}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-8 bg-slate-50 p-6 rounded-2xl border border-slate-100 w-full md:w-auto justify-center">
                      <div className="text-center">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">You</div>
                        <YogicScore score={userScore} size="lg" />
                      </div>
                      <div className="h-12 w-px bg-slate-200"></div>
                      <div className="text-center">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{animal.name}</div>
                        <YogicScore score={animal.total_score} size="lg" />
                      </div>
                  </div>
              </div>
            </div>
        )}
        
        {!userScore && (
             <div 
               onClick={() => navigate('/calculate')}
               className="bg-white border border-slate-200 rounded-3xl p-8 mb-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm relative overflow-hidden group cursor-pointer hover:border-emerald-300 transition-all"
             >
                 <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50 pointer-events-none"></div>
                 <div className="relative z-10 flex items-center gap-5">
                     <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 border border-emerald-100 shadow-sm">
                         <Sparkles size={24} />
                     </div>
                     <div>
                         <h3 className="text-lg font-serif font-bold text-slate-900 mb-1">How do you compare?</h3>
                         <p className="text-slate-500 text-sm">Calculate your personal yogic score to see where you stand.</p>
                     </div>
                 </div>
                 <button className="relative z-10 bg-emerald-600 text-white px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest shadow-lg shadow-emerald-500/20 hover:bg-emerald-700 transition-all flex items-center gap-2">
                     Start Assessment <ArrowRight size={14} />
                 </button>
             </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
                 <AnimalAttributes animal={animal} onAttributeClick={handleAttributeClick} />
            </div>
            <div className="space-y-8">
                  <AnimalRadarChart animal={animal} />
                  <AnimalLinks animal={animal} />
            </div>
        </div>

           <SimilarAnimals similarSpecies={similarSpecies} />

      </div>
    </div>
  );
};

export default AnimalDetail;