import React from 'react';
import { Brain, Zap, Flame, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const StatsGrid: React.FC = () => {
  const navigate = useNavigate();

  const handleAttributeSelect = (attr: string) => {
    navigate(`/analytics?attr=${attr}`);
  };

  return (
    <div className="container mx-auto px-4 -mt-10 relative z-20 mb-32 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Sattva Card */}
            <div className="h-full">
                <div 
                    onClick={() => handleAttributeSelect('sattva')}
                    className="bg-white border border-slate-200 p-8 rounded-2xl shadow-xl flex flex-col items-center text-center hover:border-emerald-500/50 hover:bg-emerald-500/5 cursor-pointer transition-all duration-300 group relative overflow-hidden h-full"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    <div className="relative z-10 flex flex-col items-center h-full">
                        <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-4 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                            <Brain size={24} />
                        </div>
                        <h3 className="text-xl font-serif font-bold mb-2 group-hover:text-emerald-600 transition-colors">Sattva (Clarity)</h3>
                        <p className="text-sm text-slate-500 group-hover:text-slate-600 mb-6 leading-relaxed">
                            Attributes of harmony, balance, and mental clarity found in nature.
                        </p>
                        
                        <div className="mt-auto flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-emerald-600 transition-colors">
                            See top 50 <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/>
                        </div>
                    </div>
                </div>
            </div>

            {/* Rajas Card */}
            <div className="h-full">
                <div 
                    onClick={() => handleAttributeSelect('rajas')}
                    className="bg-white border border-slate-200 p-8 rounded-2xl shadow-xl flex flex-col items-center text-center hover:border-amber-500/50 hover:bg-amber-500/5 cursor-pointer transition-all duration-300 group relative overflow-hidden h-full"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    <div className="relative z-10 flex flex-col items-center h-full">
                        <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 mb-4 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                            <Zap size={24} />
                        </div>
                        <h3 className="text-xl font-serif font-bold mb-2 group-hover:text-amber-600 transition-colors">Rajas (Passion)</h3>
                        <p className="text-sm text-slate-500 group-hover:text-slate-600 mb-6 leading-relaxed">
                            Energy, passion, and the driving force of action and movement.
                        </p>
                        
                        <div className="mt-auto flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-amber-600 transition-colors">
                            See top 50 <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tamas Card */}
            <div className="h-full">
                <div 
                    onClick={() => handleAttributeSelect('tamas')}
                    className="bg-white border border-slate-200 p-8 rounded-2xl shadow-xl flex flex-col items-center text-center hover:border-rose-500/50 hover:bg-rose-500/5 cursor-pointer transition-all duration-300 group relative overflow-hidden h-full"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-rose-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    <div className="relative z-10 flex flex-col items-center h-full">
                        <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center text-rose-600 mb-4 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(244,63,94,0.2)]">
                            <Flame size={24} />
                        </div>
                        <h3 className="text-xl font-serif font-bold mb-2 group-hover:text-rose-600 transition-colors">Tamas (Inertia)</h3>
                        <p className="text-sm text-slate-500 group-hover:text-slate-600 mb-6 leading-relaxed">
                            Inertia, darkness, and resistance to change or transformation.
                        </p>
                        
                        <div className="mt-auto flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-rose-600 transition-colors">
                            See top 50 <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
  );
};