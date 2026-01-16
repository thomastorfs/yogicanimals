import React from 'react';

interface TooltipCardProps {
  children: React.ReactNode;
  className?: string;
}

export const TooltipCard: React.FC<TooltipCardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-xl p-4 text-left ${className}`}>
      {children}
    </div>
  );
};

export const TooltipArrow: React.FC<{ className?: string }> = ({ className = '' }) => {
   // A constructed arrow using borders to match the card style
   return (
     <div className={`relative w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-slate-200 ${className}`}>
        {/* Inner white arrow to cover the gray border top */}
        <div className="absolute -top-[9px] -left-[8px] w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-white"></div>
     </div>
   );
};
