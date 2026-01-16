import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trophy, Sparkles, MapPin } from 'lucide-react';
import { Animal } from '../types';
import { getAnimalEmoji } from '../animalEmoji';
import { AnimalTypeLabel, AnimalPopulationLabel, AnimalTrendLabel } from './AnimalLabels';
import YogicScore from './YogicScore';

interface AnimalHeaderProps {
  animal: Animal;
}

const AnimalHeader: React.FC<AnimalHeaderProps> = ({ animal }) => {
  return (
    <div className="bg-white border-b border-slate-200 shadow-sm relative overflow-hidden pb-8 lg:pb-12 transition-all">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8 sm:px-6 lg:px-8 relative z-10">
        <Link to="/animals" className="inline-flex items-center text-slate-500 hover:text-emerald-700 mb-6 lg:mb-8 transition-colors text-sm font-medium group">
          <ArrowLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" /> Back to Animals
        </Link>
        
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-12">
          <div className="flex-1">
             <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-8">
                 {/* Icon Box */}
                 <div className="text-6xl sm:text-7xl filter drop-shadow-sm bg-white rounded-2xl p-4 shadow-sm border border-slate-100 block shrink-0 relative self-start md:mt-2">
                    {getAnimalEmoji(animal)}
                    {animal.rank <= 3 && (
                        <div className="absolute -top-3 -right-3 bg-amber-500 text-white rounded-full p-2 border-4 border-white shadow-md">
                           <Trophy className="w-4 h-4" fill="currentColor" />
                        </div>
                    )}
                 </div>
                 
                 <div className="max-w-2xl w-full">
                    {/* Title - Increased size for better visual balance */}
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 font-playfair tracking-tight leading-[0.9] mb-6 lg:mb-4">{animal.name}</h1>
                    
                    {/* Meta Tags - Rank, Type, Population, Trend, Location */}
                    <div className="flex flex-wrap items-center gap-2 mb-8">
                       <span className={`inline-flex items-center text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded-md border ${animal.rank <= 3 ? 'bg-amber-100 text-amber-800 border-amber-200' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                          Rank #{animal.rank}
                       </span>
                       <AnimalTypeLabel type={animal.type} />
                       <AnimalPopulationLabel population={animal.current_population} />
                       <AnimalTrendLabel trend={animal.population_trend} />
                       <span className="inline-flex items-center justify-center text-xs font-semibold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                         <MapPin className="w-3 h-3 mr-1.5" />
                         {animal.habitat}
                       </span>
                    </div>

                    {/* Mobile Score Display - Inserted here between Meta and Description */}
                    <div className="lg:hidden mb-8 border-l-4 border-emerald-500 pl-5 py-1">
                       <div className="flex items-center gap-4">
                          <YogicScore 
                              score={animal.total_score} 
                              size="lg" 
                              showLabel={false} 
                          />
                          <div className="flex flex-col justify-center">
                             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Total Yogic Score</span>
                             <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-medium">
                                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                                <span>Analysis of 18 Drivers</span>
                             </div>
                          </div>
                       </div>
                    </div>

                    {/* Analysis Text */}
                    <div className="space-y-6">
                      <p className="text-xl sm:text-2xl text-slate-700 font-serif leading-relaxed italic">
                        {animal.score_explanation}
                      </p>
                      
                      <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 text-sm text-slate-600">
                        <span className="font-bold text-emerald-800 uppercase text-xs tracking-widest shrink-0">Ecological Role</span>
                        <span className="hidden sm:inline text-slate-500">•</span>
                        <span>{animal.ecological_relations}</span>
                      </div>
                    </div>
                 </div>
             </div>
          </div>

          {/* Score Section - Desktop Only */}
          <div className="hidden lg:block mt-6 lg:mt-0 w-full lg:w-auto shrink-0">
             <YogicScore 
                 score={animal.total_score} 
                 size="giant" 
                 showLabel 
                 align="right" 
             />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalHeader;