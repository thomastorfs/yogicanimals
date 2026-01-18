import React from 'react';
import { Brain, ShieldAlert, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ATTRIBUTE_LABELS, ATTRIBUTE_DESCRIPTIONS, ATTRIBUTE_WEIGHTS, POSITIVE_ATTRIBUTES, NEGATIVE_ATTRIBUTES } from '../types';

export const Methodology: React.FC = () => {
  const navigate = useNavigate();
  
  const handleAttributeSelect = (attr: string) => {
    navigate(`/analytics?attr=${attr}`);
  };

  return (
    <div className="container mx-auto px-4 pb-32 relative z-10 max-w-6xl">
        
        <div className="text-center mb-20 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-slate-900 mb-4">How is it calculated?</h2>
            <p className="text-lg text-slate-500 font-light leading-relaxed">
                We quantify the spiritual nutritional value of the animal kingdom. 
                Every species is analyzed against 18 discrete psychological drivers.
            </p>
        </div>

        {/* The Equation Visual */}
        <div className="mb-24">
            <div className="bg-white p-12 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50">
                <div className="flex flex-col md:flex-row items-center justify-center gap-12 text-center">
                    
                    {/* Positives */}
                    <div className="group cursor-default">
                        <div className="w-16 h-16 mx-auto bg-emerald-50 rounded-2xl flex items-center justify-center mb-4 text-emerald-600 transition-transform group-hover:scale-105">
                            <Brain size={28} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-lg font-serif font-bold text-slate-900">Positive attributes</h3>
                        <p className="text-sm text-slate-400 font-medium">Accumulated merits</p>
                    </div>

                    <div className="text-2xl font-light text-slate-300 font-serif italic">minus</div>

                    {/* Negatives */}
                    <div className="group cursor-default">
                        <div className="w-16 h-16 mx-auto bg-rose-50 rounded-2xl flex items-center justify-center mb-4 text-rose-600 transition-transform group-hover:scale-105">
                            <ShieldAlert size={28} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-lg font-serif font-bold text-slate-900">Negative attributes</h3>
                        <p className="text-sm text-slate-400 font-medium">Karmic weight</p>
                    </div>

                    <div className="text-2xl font-light text-slate-300 font-serif italic">equals</div>

                    {/* Result */}
                    <div className="group cursor-default">
                        <div className="w-16 h-16 mx-auto bg-amber-50 border border-amber-100 rounded-2xl flex items-center justify-center mb-4 text-amber-600 shadow-sm transition-transform group-hover:scale-105">
                            <Sparkles size={28} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-lg font-serif font-bold text-slate-900">Yogic score</h3>
                        <p className="text-sm text-emerald-600 font-medium">Net consciousness</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Detailed Vectors */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Positive Section */}
            <div>
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-emerald-50">
                    <div className="p-2 bg-emerald-50 rounded-lg">
                        <Brain className="text-emerald-600" size={20} strokeWidth={1.5} />
                    </div>
                    <div>
                        <h3 className="text-xl font-serif font-bold text-slate-900">Positive attributes</h3>
                        <p className="text-xs font-semibold text-emerald-600 tracking-wide uppercase">Buffs</p>
                    </div>
                </div>

                <div className="space-y-3">
                    {POSITIVE_ATTRIBUTES.map(attr => (
                        <div 
                            key={attr} 
                            onClick={() => handleAttributeSelect(attr)}
                            className="group p-5 rounded-xl bg-white border border-slate-100 hover:border-emerald-200 hover:shadow-md hover:shadow-emerald-50/50 transition-all duration-300 cursor-pointer"
                        >
                            <div className="flex justify-between items-start gap-4">
                                <div>
                                    <h4 className="font-bold text-slate-800 group-hover:text-emerald-700 transition-colors mb-1 font-serif">
                                        {ATTRIBUTE_LABELS[attr]}
                                    </h4>
                                    <p className="text-sm text-slate-500 leading-relaxed font-light">
                                        {ATTRIBUTE_DESCRIPTIONS[attr]}
                                    </p>
                                </div>
                                <span className="shrink-0 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
                                    x{ATTRIBUTE_WEIGHTS[attr].toFixed(1)}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Negative Section */}
            <div>
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-rose-50">
                     <div className="p-2 bg-rose-50 rounded-lg">
                        <ShieldAlert className="text-rose-600" size={20} strokeWidth={1.5} />
                    </div>
                    <div>
                        <h3 className="text-xl font-serif font-bold text-slate-900">Negative attributes</h3>
                         <p className="text-xs font-semibold text-rose-600 tracking-wide uppercase">Debuffs</p>
                    </div>
                </div>

                <div className="space-y-3">
                    {NEGATIVE_ATTRIBUTES.map(attr => (
                        <div 
                            key={attr} 
                            onClick={() => handleAttributeSelect(attr)}
                            className="group p-5 rounded-xl bg-white border border-slate-100 hover:border-rose-200 hover:shadow-md hover:shadow-rose-50/50 transition-all duration-300 cursor-pointer"
                        >
                            <div className="flex justify-between items-start gap-4">
                                <div>
                                    <h4 className="font-bold text-slate-800 group-hover:text-rose-700 transition-colors mb-1 font-serif">
                                        {ATTRIBUTE_LABELS[attr]}
                                    </h4>
                                    <p className="text-sm text-slate-500 leading-relaxed font-light">
                                        {ATTRIBUTE_DESCRIPTIONS[attr]}
                                    </p>
                                </div>
                                <span className="shrink-0 text-xs font-semibold text-rose-600 bg-rose-50 px-2 py-1 rounded-md border border-rose-100">
                                    x{ATTRIBUTE_WEIGHTS[attr].toFixed(1)}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    </div>
  );
};