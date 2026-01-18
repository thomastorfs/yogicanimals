import React, { useEffect } from 'react';
import { Hero } from './Hero';
import { StatsGrid } from './StatsGrid';
import { TopBottomLists } from './TopBottomLists';
import { Methodology } from './Methodology';
import { Animal } from '../types';
import HomeIncentive from './HomeIncentive';

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
      
      <TopBottomLists animals={animals} />
      <Methodology />
      
      {/* Incentive moved to bottom */}
      <HomeIncentive />
    </div>
  );
};

export default HomePage;