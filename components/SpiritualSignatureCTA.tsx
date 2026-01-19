import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

const SpiritualSignatureCTA: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate('/calculate')}
      className="bg-white border border-slate-200 rounded-3xl p-8 mb-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm relative overflow-hidden group cursor-pointer hover:border-emerald-300 transition-all"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50 pointer-events-none"></div>
      <div className="relative z-10 flex items-center gap-5">
        <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 border border-emerald-100 shadow-sm">
          <Sparkles size={24} />
        </div>
        <div>
          <h3 className="text-lg font-serif font-bold text-slate-900 mb-1">What is your spiritual signature?</h3>
          <p className="text-slate-500 text-sm">Calculate your personal yogic score to see where you stand.</p>
        </div>
      </div>
      <button className="relative z-10 bg-emerald-600 text-white px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest shadow-lg shadow-emerald-500/20 hover:bg-emerald-700 transition-all flex items-center gap-2">
        Start Assessment <ArrowRight size={14} />
      </button>
    </div>
  );
};

export default SpiritualSignatureCTA;
