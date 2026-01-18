import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Animal } from '../types';
import { getAnimalEmoji } from '../animalEmoji';

interface TopBottomListsProps {
  animals: Animal[];
}

interface ListItemProps {
  animal: Animal;
  index: number;
  type: 'positive' | 'negative';
  totalCount: number;
  onSelect: (animal: Animal) => void;
}

const ListItem: React.FC<ListItemProps> = ({ animal, index, type, totalCount, onSelect }) => {
     const isPositive = type === 'positive';
     const rankColor = isPositive ? 'text-emerald-500' : 'text-rose-500';
     const hoverBg = isPositive ? 'hover:bg-emerald-50/50' : 'hover:bg-rose-50/50';
     const scoreColor = isPositive ? 'text-emerald-700' : 'text-rose-700';

     return (
        <div 
        onClick={() => onSelect(animal)}
        className={`group flex items-center justify-between p-4 rounded-xl ${hoverBg} cursor-pointer transition-all border border-transparent hover:border-slate-100 mb-1`}
      >
         <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-xl shadow-sm border border-slate-100">
                 {getAnimalEmoji(animal)}
             </div>
             <div>
                 <h4 className="font-bold text-slate-700 group-hover:text-slate-900 transition-colors font-serif text-lg">
                    {animal.name}
                 </h4>
                 <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className={`font-medium ${rankColor}`}>Rank #{isPositive ? index + 1 : totalCount - index}</span>
                    <span>•</span>
                    <span className="uppercase tracking-wider">{animal.type}</span>
                 </div>
             </div>
         </div>
         <div className="flex items-center gap-4">
             <span className={`font-serif font-black text-xl ${scoreColor}`}>
                {animal.total_score.toFixed(1)}
             </span>
             <ArrowUpRight size={18} className="text-slate-300 group-hover:text-slate-600 transition-colors opacity-0 group-hover:opacity-100" />
         </div>
      </div>
     );
}

export const TopBottomLists: React.FC<TopBottomListsProps> = ({ animals }) => {
  const navigate = useNavigate();
  
  const { topAnimals, bottomAnimals } = useMemo(() => {
    const sorted = [...animals].sort((a, b) => b.total_score - a.total_score);
    const top = sorted.slice(0, 5);
    const bottom = sorted.slice(-5).reverse(); 
    return { topAnimals: top, bottomAnimals: bottom };
  }, [animals]);

  const handleSelectAnimal = (animal: Animal) => {
    navigate(`/species/${animal.id}`);
  };

  return (
    <div className="container mx-auto px-4 pb-32 relative z-10">
       <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-slate-900 mb-3">The top 5</h2>
            <p className="text-slate-500 font-light text-lg">From the most sattvic to the most tamasic entities</p>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          
          {/* Highest Vibration */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/50">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-50">
                  <div>
                      <h3 className="text-xl font-serif font-bold text-slate-900 mb-1">Highest vibration</h3>
                      <p className="text-sm text-emerald-600 font-medium">Sattvic dominance</p>
                  </div>
              </div>
              <div className="space-y-1">
                  {topAnimals.map((animal, i) => (
                      <ListItem 
                        key={animal.id} 
                        animal={animal} 
                        index={i} 
                        type="positive" 
                        totalCount={animals.length}
                        onSelect={handleSelectAnimal}
                      />
                  ))}
              </div>
          </div>

          {/* Lowest Vibration */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/50">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-50">
                  <div>
                      <h3 className="text-xl font-serif font-bold text-slate-900 mb-1">Lowest vibration</h3>
                      <p className="text-sm text-rose-600 font-medium">Tamasic risks</p>
                  </div>
              </div>
              <div className="space-y-1">
                  {bottomAnimals.map((animal, i) => (
                      <ListItem 
                        key={animal.id} 
                        animal={animal} 
                        index={i} 
                        type="negative" 
                        totalCount={animals.length}
                        onSelect={handleSelectAnimal}
                      />
                  ))}
              </div>
          </div>

       </div>
    </div>
  );
};