import React from 'react';
import { Link } from 'react-router-dom';
import { Animal } from '../types';
import { getAnimalEmoji } from '../animalEmoji';
import { AnimalTypeLabel, AnimalPopulationLabel, AnimalTrendLabel } from './AnimalLabels';
import YogicScore from './YogicScore';

interface AnimalListItemProps {
  animal: Animal;
}

export const AnimalListItem: React.FC<AnimalListItemProps> = ({ animal }) => {
  const rank = animal.rank;

  return (
    <Link
      to={`/animals/${animal.id}`}
      className="block bg-white hover:bg-emerald-50/30 border border-slate-200 hover:border-emerald-200 rounded-xl p-4 transition-all shadow-sm hover:shadow-md group"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 sm:space-x-6">
          {/* Rank (Static based on Score) */}
          <div className="flex-shrink-0 w-8 sm:w-12 text-center">
            <span
              className={`text-xl sm:text-2xl font-black font-serif ${
                rank <= 3 ? 'text-amber-500' : 'text-slate-300'
              }`}
            >
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
};