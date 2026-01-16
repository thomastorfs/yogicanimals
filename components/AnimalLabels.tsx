import React from 'react';
import { Users, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { formatPopulation } from '../utils';

export const AnimalTypeLabel: React.FC<{ type: string; className?: string }> = ({ type, className = '' }) => (
  <span className={`inline-flex items-center justify-center text-xs font-semibold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200 ${className}`}>
    {type}
  </span>
);

export const AnimalPopulationLabel: React.FC<{ population: string; className?: string }> = ({ population, className = '' }) => (
  <span className={`inline-flex items-center justify-center text-xs font-semibold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200 ${className}`}>
    <Users className="w-3 h-3 mr-1.5" />
    {formatPopulation(population)}
  </span>
);

export const AnimalTrendLabel: React.FC<{ trend: string; className?: string }> = ({ trend, className = '' }) => {
  const getTrendIcon = (t: string) => {
    if (t === 'Increasing') return <TrendingUp className="w-3 h-3 mr-1" />;
    if (t === 'Decreasing' || t.includes('Declining')) return <TrendingDown className="w-3 h-3 mr-1" />;
    return <Minus className="w-3 h-3 mr-1" />;
  };

  const getTrendStyle = (t: string) => {
    if (t === 'Increasing') return 'bg-emerald-50 text-emerald-700 border-emerald-100';
    if (t === 'Decreasing' || t.includes('Declining')) return 'bg-rose-50 text-rose-700 border-rose-100';
    return 'bg-blue-50 text-blue-700 border-blue-100';
  };

  return (
    <span className={`inline-flex items-center text-[10px] px-1.5 py-0.5 rounded-md uppercase tracking-wider font-bold border ${getTrendStyle(trend)} ${className}`}>
      {getTrendIcon(trend)}
      {trend}
    </span>
  );
};