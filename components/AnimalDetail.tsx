import React, { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ANIMALS } from '../data';
import { Animal } from '../types';
import AnimalHeader from './AnimalHeader';
import AnimalAttributes from './AnimalAttributes';
import AnimalRadarChart from './AnimalRadarChart';
import AnimalLinks from './AnimalLinks';
import SimilarAnimals from './SimilarAnimals';

const AnimalDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const animal = useMemo(() => 
    ANIMALS.find(a => a.id === slug), 
  [slug]);

  const similarSpecies = useMemo(() => {
    if (!animal) return [];
    // Find animals with closest total score within the same type, or just generally close
    return ANIMALS
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
  }, [animal]);

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
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            
            {/* Left Column: Attribute Bar Charts (Clickable) */}
            <div className="lg:col-span-2 space-y-8">
               <AnimalAttributes animal={animal} onAttributeClick={handleAttributeClick} />
            </div>

            {/* Right Column: Radar Chart & Wikipedia */}
            <div className="space-y-6">
                <AnimalRadarChart animal={animal} />
                <AnimalLinks animal={animal} />
            </div>
        </div>

        {/* Similar Species - Full Width Bottom */}
        <SimilarAnimals similarSpecies={similarSpecies} />

      </div>
    </div>
  );
};

export default AnimalDetail;