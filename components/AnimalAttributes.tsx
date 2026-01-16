import React from 'react';
import { Animal, POSITIVE_ATTRIBUTES, NEGATIVE_ATTRIBUTES, ATTRIBUTE_LABELS, ATTRIBUTE_DESCRIPTIONS } from '../types';
import { TooltipCard, TooltipArrow } from './Tooltip';

interface AnimalAttributesProps {
  animal: Animal;
  onAttributeClick: (attrKey: string) => void;
}

interface AttributeRowProps {
  attrKey: string;
  value: number;
  type: 'positive' | 'negative';
  onClick: () => void;
}

const AttributeRow: React.FC<AttributeRowProps> = ({ 
  attrKey, 
  value, 
  type, 
  onClick 
}) => {
  const percentage = (value / 5) * 100;
  const colorClass = type === 'positive' ? 'bg-emerald-500' : 'bg-red-500';
  const label = ATTRIBUTE_LABELS[attrKey as keyof typeof ATTRIBUTE_LABELS].split(' ')[1];
  const fullLabel = ATTRIBUTE_LABELS[attrKey as keyof typeof ATTRIBUTE_LABELS];
  const description = ATTRIBUTE_DESCRIPTIONS[attrKey as keyof typeof ATTRIBUTE_DESCRIPTIONS];
  const hoverRing = type === 'positive' ? 'group-hover:ring-emerald-200' : 'group-hover:ring-red-200';

  return (
    <div 
      onClick={onClick}
      className={`group relative flex items-center gap-4 py-2.5 px-4 rounded-xl hover:bg-slate-50 hover:ring-1 ${hoverRing} cursor-pointer transition-all duration-200`}
    >
      {/* Label */}
      <div className="w-24 font-medium text-sm text-slate-600 group-hover:text-slate-900 transition-colors shrink-0">
        {label}
      </div>
      
      {/* Progress Bar Track */}
      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden relative">
        {/* Fill */}
        <div 
          className={`h-full rounded-full ${colorClass} opacity-80 group-hover:opacity-100 transition-all duration-300 ease-out`} 
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      {/* Score */}
      <div className="w-6 text-right font-bold text-sm text-slate-700 shrink-0 tabular-nums">
        {value}
      </div>

      {/* Custom Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none transform group-hover:translate-y-0 translate-y-2">
         <TooltipCard>
            <div className="flex items-center justify-between mb-2 border-b border-slate-100 pb-2">
                <span className={`font-bold ${type === 'positive' ? 'text-emerald-700' : 'text-red-700'}`}>
                    {fullLabel}
                </span>
                <span className="font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded text-xs border border-slate-200">
                    {value} / 5
                </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-600 font-medium">
            {description}
            </p>
         </TooltipCard>
         {/* Tooltip Arrow */}
         <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px]">
            <TooltipArrow />
         </div>
      </div>
    </div>
  );
};

const AnimalAttributes: React.FC<AnimalAttributesProps> = ({ animal, onAttributeClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Positive Drivers */}
      <div className="bg-white rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-100 p-6 sm:p-8">
        <div className="flex justify-between items-center mb-6 border-b border-emerald-100 pb-4">
          <h3 className="text-xl font-bold text-emerald-800 font-serif">Positive Drivers</h3>
        </div>
        <div className="space-y-1">
          {POSITIVE_ATTRIBUTES.map(attr => (
            <AttributeRow 
              key={attr}
              attrKey={attr}
              value={animal[attr] as number}
              type="positive"
              onClick={() => onAttributeClick(attr)}
            />
          ))}
        </div>
      </div>

      {/* Negative Drivers */}
      <div className="bg-white rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-100 p-6 sm:p-8">
        <div className="flex justify-between items-center mb-6 border-b border-red-100 pb-4">
          <h3 className="text-xl font-bold text-red-800 font-serif">Negative Drivers</h3>
        </div>
        <div className="space-y-1">
            {NEGATIVE_ATTRIBUTES.map(attr => (
                <AttributeRow 
                  key={attr}
                  attrKey={attr}
                  value={animal[attr] as number}
                  type="negative"
                  onClick={() => onAttributeClick(attr)}
                />
            ))}
        </div>
      </div>
    </div>
  );
};

export default AnimalAttributes;