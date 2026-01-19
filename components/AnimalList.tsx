import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { Animal } from '../types';
import { parsePopulation } from '../utils';
import { LazyBoundary } from './LazyBoundary';
import LoadingThrobber from './LoadingThrobber';

// Lazy load heavy components
const UserScoreBanner = React.lazy(() => import('./UserScoreBanner'));
const AnimalListHeader = React.lazy(() => import('./AnimalListHeader').then(m => ({ default: m.AnimalListHeader })));
const AnimalControls = React.lazy(() => import('./AnimalControls').then(m => ({ default: m.AnimalControls })));
const AnimalListItem = React.lazy(() => import('./AnimalListItem').then(m => ({ default: m.AnimalListItem })));
const AnimalListEmptyState = React.lazy(() => import('./AnimalListEmptyState').then(m => ({ default: m.AnimalListEmptyState })));

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
      <LazyBoundary message="Loading header..." size="sm">
        <AnimalListHeader count={animals.length} />
      </LazyBoundary>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <LazyBoundary message="Loading controls..." size="sm">
          <AnimalControls 
            resultCount={processedList.length}
            sortMode={sortMode}
            setSortMode={setSortMode}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </LazyBoundary>

        {/* User Score Context */}
        <div className="mt-6">
          <LazyBoundary message="Loading user score..." size="sm">
            <UserScoreBanner variant="compact" />
          </LazyBoundary>
        </div>

        {/* List Items */}
        <div className="space-y-3 mt-6">
          <LazyBoundary message="Loading animals..." size="md">
            {processedList.map((animal) => (
              <Suspense key={animal.id} fallback={<LoadingThrobber size="sm" />}>
                <AnimalListItem animal={animal} />
              </Suspense>
            ))}
            
            {processedList.length === 0 && (
              <AnimalListEmptyState searchTerm={searchTerm} onClear={() => setSearchTerm('')} />
            )}
          </LazyBoundary>
        </div>
      </div>
    </div>
  );
};

export default AnimalList;