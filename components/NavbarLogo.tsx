import React from 'react';
import { Link } from 'react-router-dom';
import { PawPrint } from 'lucide-react';

interface NavbarLogoProps {
  variant?: 'default' | 'light';
}

export const NavbarLogo: React.FC<NavbarLogoProps> = ({ variant = 'default' }) => {
  const textColor = variant === 'light' ? 'text-white' : 'text-slate-900';
  const hoverColor = variant === 'light' ? 'group-hover:text-emerald-200' : 'group-hover:text-emerald-900';

  return (
    <div className="flex items-center">
      <Link 
        to="/" 
        className="flex items-center gap-2.5 group select-none"
        onClick={() => window.scrollTo(0, 0)}
      >
        {/* Icon Container - Vibrant Emerald Gradient */}
        <div className="relative bg-gradient-to-br from-emerald-500 to-emerald-700 p-2.5 rounded-xl shadow-lg shadow-emerald-500/30 group-hover:shadow-emerald-500/50 group-hover:scale-105 transition-all duration-300 ring-1 ring-emerald-400/20">
           <PawPrint className="w-6 h-6 text-white" strokeWidth={2} />
        </div>
        
        {/* Typography - Unified Single Line */}
        <div className="flex items-baseline">
          <span className="font-playfair text-2xl font-semibold leading-none tracking-tight bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent pb-1">
              Yogic
          </span>
          <span className={`font-playfair text-2xl font-bold tracking-tighter ${textColor} leading-none ${hoverColor} transition-colors`}>
              Animals
          </span>
        </div>
      </Link>
    </div>
  );
};