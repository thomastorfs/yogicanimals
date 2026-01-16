import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Trophy, Users, ArrowDownAZ, X
} from 'lucide-react';
import { ANIMALS } from '../data';
import { getAnimalEmoji } from '../animalEmoji';
import { parsePopulation } from '../utils';
import { AnimalTypeLabel, AnimalPopulationLabel, AnimalTrendLabel } from './AnimalLabels';
import YogicScore from './YogicScore';

const AnimalList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortMode, setSortMode] = useState<'score' | 'population' | 'name'>('score');

  const processedList = useMemo(() => {
    let data = [...ANIMALS];

    // Filter
    if (searchTerm.trim()) {
      const lowerTerm = searchTerm.toLowerCase().trim();
      data = data.filter(a => 
        a.name.toLowerCase().includes(lowerTerm) || 
        a.type.toLowerCase().includes(lowerTerm)
      );
    }

    // Sort
    data.sort((a, b) => {
      if (sortMode === 'score') {
        return b.total_score - a.total_score;
      } else if (sortMode === 'population') {
        return parsePopulation(b.current_population) - parsePopulation(a.current_population);
      } else if (sortMode === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

    return data;
  }, [searchTerm, sortMode]);

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto pt-10 pb-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-2">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 font-playfair mb-4">Animals</h1>
              <p className="text-slate-500">Explore the yogic quantification of {ANIMALS.length} different species.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Sticky Header with Search and Sort */}
        <div className="sticky top-16 z-40 bg-slate-50/95 backdrop-blur-md pt-6 pb-6 border-b border-slate-200 -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div className="text-sm text-slate-500">
                  Showing <span className="font-bold text-emerald-700">{processedList.length}</span> results sorted by {sortMode}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                {/* Search Bar */}
                <div className="relative flex-grow sm:flex-grow-0 sm:w-80 group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-full leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all shadow-sm"
                    placeholder="Search species name or type..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-slate-400 hover:text-red-500 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {/* Sort Buttons */}
                <div className="flex bg-white rounded-full p-1 border border-slate-200 shadow-sm self-start sm:self-auto">
                  <button
                    onClick={() => setSortMode('score')}
                    className={`flex items-center px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                      sortMode === 'score' 
                        ? 'bg-emerald-600 text-white shadow-md' 
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Trophy className="w-3.5 h-3.5 mr-1.5" /> Score
                  </button>
                  <button
                    onClick={() => setSortMode('population')}
                    className={`flex items-center px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                      sortMode === 'population' 
                        ? 'bg-emerald-600 text-white shadow-md' 
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Users className="w-3.5 h-3.5 mr-1.5" /> Population
                  </button>
                  <button
                    onClick={() => setSortMode('name')}
                    className={`flex items-center px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                      sortMode === 'name' 
                        ? 'bg-emerald-600 text-white shadow-md' 
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <ArrowDownAZ className="w-3.5 h-3.5 mr-1.5" /> Name
                  </button>
                </div>
              </div>
            </div>
        </div>

        {/* List Items */}
        <div className="space-y-3 mt-6">
            {processedList.map((animal) => {
              const rank = animal.rank;
              
              return (
                <Link 
                  key={animal.id} 
                  to={`/species/${animal.id}`}
                  className="block bg-white hover:bg-emerald-50/30 border border-slate-200 hover:border-emerald-200 rounded-xl p-4 transition-all shadow-sm hover:shadow-md group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 sm:space-x-6">
                      {/* Rank (Static based on Score) */}
                      <div className="flex-shrink-0 w-8 sm:w-12 text-center">
                        <span className={`text-xl sm:text-2xl font-black font-serif ${
                          rank <= 3 ? 'text-amber-500' : 'text-slate-300'
                        }`}>
                          #{rank}
                        </span>
                      </div>

                      {/* Emoji Icon */}
                      <div className="flex-shrink-0 w-14 h-14 rounded-full bg-slate-50 group-hover:bg-white border border-slate-100 group-hover:border-emerald-200 flex items-center justify-center transition-all shadow-inner">
                        <span className="text-3xl leading-none select-none filter drop-shadow-sm transform group-hover:scale-110 transition-transform duration-200">
                          {getAnimalEmoji(animal)}
                        </span>
                      </div>

                      {/* Name & Type */}
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition-colors font-serif">
                          {animal.name}
                        </h3>
                        <div className="flex flex-wrap items-center mt-1 gap-2">
                          <AnimalTypeLabel type={animal.type} />
                          <AnimalPopulationLabel population={animal.current_population} />
                          <AnimalTrendLabel trend={animal.population_trend} />
                        </div>
                      </div>
                    </div>

                    {/* Score */}
                    <div className="pl-2">
                      <YogicScore score={animal.total_score} size="md" showLabel align="right" />
                    </div>
                  </div>
                </Link>
              );
            })}
            
            {processedList.length === 0 && (
              <div className="text-center py-20 text-slate-400 bg-white rounded-2xl border border-dashed border-slate-200">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>No species found matching "{searchTerm}"</p>
                <button 
                  onClick={() => setSearchTerm('')}
                  className="mt-4 text-emerald-600 hover:underline font-medium"
                >
                  Clear search
                </button>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default AnimalList;