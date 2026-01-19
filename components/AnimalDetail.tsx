import React, { useMemo, useEffect, useState, Suspense } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Animal } from '../types';
import { LazyBoundary } from './LazyBoundary';
import LoadingThrobber from './LoadingThrobber';

// Lazy load heavy components
const AnimalHeader = React.lazy(() => import('./AnimalHeader'));
const AnimalAttributes = React.lazy(() => import('./AnimalAttributes'));
const AnimalRadarChart = React.lazy(() => import('./AnimalRadarChart'));
const AnimalLinks = React.lazy(() => import('./AnimalLinks'));
const SimilarAnimals = React.lazy(() => import('./SimilarAnimals'));
const YogicScore = React.lazy(() => import('./YogicScore'));
const SpiritualSignatureCTA = React.lazy(() => import('./SpiritualSignatureCTA'));

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
      <LazyBoundary message="Loading header..." size="sm">
        <AnimalHeader animal={animal} />
      </LazyBoundary>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        
        {/* User Comparison Section */}
        {userScore !== null && (
            <LazyBoundary message="Loading comparison..." size="sm">
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
                          <Suspense fallback={<LoadingThrobber size="sm" />}>
                            <YogicScore score={userScore} size="lg" />
                          </Suspense>
                        </div>
                        <div className="h-12 w-px bg-slate-200"></div>
                        <div className="text-center">
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{animal.name}</div>
                          <Suspense fallback={<LoadingThrobber size="sm" />}>
                            <YogicScore score={animal.total_score} size="lg" />
                          </Suspense>
                        </div>
                    </div>
                </div>
              </div>
            </LazyBoundary>
        )}
        
        {!userScore && (
          <LazyBoundary message="Loading assessment prompt..." size="sm">
            <SpiritualSignatureCTA />
          </LazyBoundary>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <LazyBoundary message="Loading attributes..." size="md">
                <AnimalAttributes animal={animal} onAttributeClick={handleAttributeClick} />
              </LazyBoundary>
            </div>
            <div className="space-y-8">
                  <LazyBoundary message="Loading chart..." size="md">
                    <AnimalRadarChart animal={animal} />
                  </LazyBoundary>
                  <LazyBoundary message="Loading links..." size="sm">
                    <AnimalLinks animal={animal} />
                  </LazyBoundary>
            </div>
        </div>

        <LazyBoundary message="Loading similar animals..." size="md">
          <SimilarAnimals similarSpecies={similarSpecies} />
        </LazyBoundary>

      </div>
    </div>
  );
};

export default AnimalDetail;