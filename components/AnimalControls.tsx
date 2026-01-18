import React from 'react';
import { Search, Trophy, Users, ArrowDownAZ, X } from 'lucide-react';

interface AnimalControlsProps {
  resultCount: number;
  sortMode: 'score' | 'population' | 'name';
  setSortMode: (mode: 'score' | 'population' | 'name') => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const AnimalControls: React.FC<AnimalControlsProps> = ({
  resultCount,
  sortMode,
  setSortMode,
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <div className="sticky top-16 z-40 bg-slate-50/95 backdrop-blur-md pt-6 pb-6 border-b border-slate-200 -mx-4 px-4 sm:mx-0 sm:px-0">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="text-sm text-slate-500">
          Showing <span className="font-bold text-emerald-700">{resultCount}</span> results sorted by {sortMode}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          {/* Search Bar */}
          <div className="relative flex-grow sm:flex-grow-0 sm:w-80 group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-full leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all shadow-sm"
              placeholder="Search species name or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-slate-400 hover:text-red-500 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Sort Buttons */}
          <div className="flex bg-white rounded-full p-1 border border-slate-200 shadow-sm self-start sm:self-auto">
            <button
              onClick={() => setSortMode('score')}
              className={`flex items-center px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                sortMode === 'score'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Trophy className="w-3.5 h-3.5 mr-1.5" /> Score
            </button>
            <button
              onClick={() => setSortMode('population')}
              className={`flex items-center px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                sortMode === 'population'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Users className="w-3.5 h-3.5 mr-1.5" /> Population
            </button>
            <button
              onClick={() => setSortMode('name')}
              className={`flex items-center px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                sortMode === 'name'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <ArrowDownAZ className="w-3.5 h-3.5 mr-1.5" /> Name
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};