import React from 'react';
import { Search } from 'lucide-react';

interface AnimalListEmptyStateProps {
  searchTerm: string;
  onClear: () => void;
}

export const AnimalListEmptyState: React.FC<AnimalListEmptyStateProps> = ({ searchTerm, onClear }) => {
  return (
    <div className="text-center py-20 text-slate-400 bg-white rounded-2xl border border-dashed border-slate-200">
      <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
      <p>No species found matching "{searchTerm}"</p>
      <button
        onClick={onClear}
        className="mt-4 text-emerald-600 hover:underline font-medium"
      >
        Clear search
      </button>
    </div>
  );
};