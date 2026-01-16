import React, { useEffect } from 'react';
import { Hero } from './Hero';
import { StatsGrid } from './StatsGrid';
import { TopBottomLists } from './TopBottomLists';
import { Methodology } from './Methodology';
import { Animal } from '../types';

interface HomePageProps {
  animals: Animal[];
}

const HomePage: React.FC<HomePageProps> = ({ animals }) => {
  
  useEffect(() => {
    document.title = "YogicAnimals - Spiritual Quantification of Species";
  }, []);

  return (
    <div className="flex flex-col bg-slate-50 relative min-h-screen">
      
      {/* Content Layer */}
      <div className="relative z-10 flex flex-col">
        <Hero />
        
        {/* StatsGrid sits immediately below Hero */}
        <StatsGrid />
      </div>
      
      <TopBottomLists animals={animals} />
      <Methodology />
    </div>
  );
};

export default HomePage;