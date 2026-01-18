import React from 'react';

interface AnimalListHeaderProps {
  count: number;
}

export const AnimalListHeader: React.FC<AnimalListHeaderProps> = ({ count }) => {
  return (
    <div className="bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto pt-10 pb-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-2">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 font-playfair mb-4">Animals</h1>
            <p className="text-slate-500">Explore the yogic quantification of {count} different species.</p>
          </div>
        </div>
      </div>
    </div>
  );
};