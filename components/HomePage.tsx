import React, { useEffect, Suspense } from 'react';
import { Hero } from './Hero';
import { StatsGrid } from './StatsGrid';
import LoadingThrobber from './LoadingThrobber';
import { LazyBoundary } from './LazyBoundary';
import { Animal } from '../types';

// Lazy load heavy components
const TopBottomLists = React.lazy(() => import('./TopBottomLists').then(m => ({ default: m.TopBottomLists })));
const Methodology = React.lazy(() => import('./Methodology').then(m => ({ default: m.Methodology })));
const HomeIncentive = React.lazy(() => import('./HomeIncentive'));

interface HomePageProps {
  animals: Animal[];
}

const HomePage: React.FC<HomePageProps> = ({ animals }) => {
  
  useEffect(() => {
    document.title = "YogicAnimals | Home | Spiritual Quantification";
  }, []);

  return (
    <div className="flex flex-col bg-slate-50 relative min-h-screen">
      
      {/* Content Layer */}
      <div className="relative z-10 flex flex-col">
        <Hero />
        
        {/* StatsGrid sits immediately below Hero */}
        <StatsGrid />
      </div>
      
      <LazyBoundary message="Loading rankings..." size="md">
        <TopBottomLists animals={animals} />
      </LazyBoundary>
      
      <LazyBoundary message="Loading methodology..." size="md">
        <Methodology />
      </LazyBoundary>
      
      {/* Incentive moved to bottom */}
      <LazyBoundary message="Loading section..." size="sm">
        <HomeIncentive />
      </LazyBoundary>
    </div>
  );
};

export default HomePage;