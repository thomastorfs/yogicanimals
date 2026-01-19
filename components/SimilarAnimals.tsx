import React from 'react';
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';
import { Animal } from '../types';
import { getAnimalEmoji } from '../animalEmoji';
import YogicScore from './YogicScore';

interface SimilarAnimalsProps {
  similarSpecies: Animal[];
}

const SimilarAnimals: React.FC<SimilarAnimalsProps> = ({ similarSpecies }) => {
  if (similarSpecies.length === 0) return null;

  return (
    <div className="mb-16">
      <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center font-serif">
         <Zap className="w-6 h-6 mr-3 text-amber-500 fill-amber-500" /> Similar Spiritual Profiles
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {similarSpecies.map(sim => (
            <Link to={`/animals/${sim.id}`} key={sim.id} className="block bg-white hover:bg-emerald-50/30 rounded-2xl border border-slate-200 hover:border-emerald-300 p-6 transition-all shadow-sm hover:shadow-lg group">
               <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl filter drop-shadow-sm group-hover:scale-110 transition-transform">{getAnimalEmoji(sim)}</span>
                  <YogicScore score={sim.total_score} size="md" />
               </div>
               <h4 className="font-bold text-lg text-slate-800 group-hover:text-emerald-800 mb-1 font-serif">{sim.name}</h4>
               <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{sim.type}</span>
               </div>
               <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {sim.score_explanation}
               </p>
            </Link>
         ))}
      </div>
    </div>
  );
};

export default SimilarAnimals;