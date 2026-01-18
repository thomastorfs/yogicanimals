import React, { useState, useMemo, useEffect } from 'react';
import { Animal } from '../types';
import { parsePopulation } from '../utils';
import UserScoreBanner from './UserScoreBanner';
import { AnimalListHeader } from './AnimalListHeader';
import { AnimalControls } from './AnimalControls';
import { AnimalListItem } from './AnimalListItem';
import { AnimalListEmptyState } from './AnimalListEmptyState';

interface AnimalListProps {
  animals: Animal[];
}

const AnimalList: React.FC<AnimalListProps> = ({ animals }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortMode, setSortMode] = useState<'score' | 'population' | 'name'>('score');

  useEffect(() => {
    document.title = "YogicAnimals | Animals | The Kingdom";
  }, []);

  // Scroll to top when sort order or search term changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [sortMode, searchTerm]);

  const processedList = useMemo(() => {
    let data = [...animals];

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
  }, [searchTerm, sortMode, animals]);

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <AnimalListHeader count={animals.length} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <AnimalControls 
          resultCount={processedList.length}
          sortMode={sortMode}
          setSortMode={setSortMode}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        {/* User Score Context */}
        <div className="mt-6">
           <UserScoreBanner variant="compact" />
        </div>

        {/* List Items */}
        <div className="space-y-3 mt-6">
            {processedList.map((animal) => (
              <AnimalListItem key={animal.id} animal={animal} />
            ))}
            
            {processedList.length === 0 && (
              <AnimalListEmptyState searchTerm={searchTerm} onClear={() => setSearchTerm('')} />
            )}
        </div>
      </div>
    </div>
  );
};

export default AnimalList;