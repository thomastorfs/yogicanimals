import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Animal } from '../types';

interface AnimalLinksProps {
  animal: Animal;
}

const AnimalLinks: React.FC<AnimalLinksProps> = ({ animal }) => {
  return (
    <a 
      href={animal.wikipedia_link} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block bg-slate-100 hover:bg-emerald-50 rounded-2xl p-6 border border-slate-200 hover:border-emerald-200 transition-all group"
    >
      <div className="flex items-center justify-between">
          <span className="font-bold text-slate-700 group-hover:text-emerald-800">Wikipedia Entry</span>
          <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
      </div>
      <p className="text-xs text-slate-500 mt-2">Read scientific classification and more details.</p>
    </a>
  );
};

export default AnimalLinks;