import React from 'react';

interface YogicScoreProps {
  score: number;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'giant';
  className?: string;
  showLabel?: boolean;
  align?: 'left' | 'right' | 'center';
}

export const getScoreColor = (score: number) => {
  if (score >= 50) return 'text-emerald-700';
  if (score >= 35) return 'text-lime-600';
  return 'text-red-500';
};

const YogicScore: React.FC<YogicScoreProps> = ({ 
  score, 
  size = 'md', 
  className = '', 
  showLabel = false,
  align = 'left'
}) => {
  const colorClass = getScoreColor(score);
  
  let sizeClass = '';
  switch (size) {
    case 'sm': sizeClass = 'text-xl'; break;
    case 'md': sizeClass = 'text-2xl sm:text-3xl'; break;
    case 'lg': sizeClass = 'text-4xl'; break;
    case 'xl': sizeClass = 'text-5xl sm:text-6xl'; break;
    case 'giant': sizeClass = 'text-6xl sm:text-8xl'; break;
  }

  const alignClass = align === 'right' ? 'items-end text-right' : align === 'center' ? 'items-center text-center' : 'items-start text-left';

  return (
    <div className={`flex flex-col ${alignClass} ${className}`}>
      {showLabel && (
         <div className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-widest font-bold mb-0.5">Yogic Score</div>
      )}
      <div className={`${sizeClass} font-black font-serif tracking-tighter ${colorClass} leading-none`}>
        {score.toFixed(1)}
      </div>
    </div>
  );
};

export default YogicScore;