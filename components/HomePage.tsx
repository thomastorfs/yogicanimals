import React from 'react';
import { Hero } from './Hero';
import { StatsGrid } from './StatsGrid';
import { TopBottomLists } from './TopBottomLists';
import { Methodology } from './Methodology';
import { ANIMALS } from '../data';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col bg-slate-50 relative min-h-screen">
      
      {/* Content Layer */}
      <div className="relative z-10 flex flex-col">
        <Hero />
        
        {/* StatsGrid sits immediately below Hero */}
        <StatsGrid />
      </div>
      
      <TopBottomLists animals={ANIMALS} />
      <Methodology />
    </div>
  );
};

export default HomePage;