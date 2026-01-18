import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell 
} from 'recharts';
import { useNavigate, useLocation } from 'react-router-dom';
import { Animal, YogicAttributes } from '../types';
import { ATTRIBUTE_LABELS, ATTRIBUTE_DESCRIPTIONS, POSITIVE_ATTRIBUTES, NEGATIVE_ATTRIBUTES } from '../types';
import { getScoreColor } from './YogicScore';
import { TooltipCard } from './Tooltip';

interface AttributeExplorerProps {
  animals: Animal[];
}

export const AttributeExplorer: React.FC<AttributeExplorerProps> = ({ animals }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const targetAttribute = searchParams.get('attr') as keyof YogicAttributes | null;
  const [activeAttr, setActiveAttr] = useState<keyof YogicAttributes>(targetAttribute || 'sattva');
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);

  // Compute active attribute data
  const activeAttrData = useMemo(() => {
    // Sort by the active attribute descending, then by total score
    const sorted = [...animals]
      .sort((a, b) => {
        const valDiff = (b[activeAttr] as number) - (a[activeAttr] as number);
        if (valDiff !== 0) return valDiff;
        return b.total_score - a.total_score;
      })
      .slice(0, 50);

    return sorted.map(a => ({
      name: a.name,
      value: a[activeAttr],
      score: a.total_score,
      originalAnimal: a
    }));
  }, [animals, activeAttr]);

  // Handle URL updates (when navigating from home page or detail page)
  useEffect(() => {
    if (targetAttribute && targetAttribute !== activeAttr) {
      setActiveAttr(targetAttribute);
    }
  }, [targetAttribute]);

  // Scroll to chart after data is rendered
  useEffect(() => {
    if (targetAttribute && activeAttrData.length > 0) {
      setTimeout(() => {
        chartRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [activeAttrData, targetAttribute]);

  const handleAttrClick = (attr: keyof YogicAttributes) => {
    setActiveAttr(attr);
    navigate(`?attr=${attr}`); // Update URL
    
    // Scroll to the chart view to show results
    setTimeout(() => {
      chartRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const isPositiveAttr = POSITIVE_ATTRIBUTES.includes(activeAttr);
  // Theme colors: Emerald for positive, Rose for negative
  const activeColor = isPositiveAttr ? "#059669" : "#e11d48"; 
  const activeTitle = ATTRIBUTE_LABELS[activeAttr];
  const activeDesc = ATTRIBUTE_DESCRIPTIONS[activeAttr];

  // Custom Y-Axis Tick to make titles clickable
  const CustomYAxisTick = ({ x, y, payload }: any) => {
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={4}
          textAnchor="end"
          fill="#64748b"
          className="font-sans text-xs font-bold cursor-pointer hover:fill-emerald-600 transition-colors"
          onClick={() => {
            const animal = activeAttrData.find(d => d.name === payload.value)?.originalAnimal;
            if (animal) navigate(`/species/${animal.id}`);
          }}
        >
          {payload.value.length > 20 ? `${payload.value.substring(0, 20)}...` : payload.value}
        </text>
      </g>
    );
  };

  // Calculate dynamic height based on number of items (compact 25px per item)
  const chartHeight = Math.max(500, activeAttrData.length * 25);

  return (
      <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-100 p-8 scroll-mt-32">
           <div className="lg:col-span-3 space-y-6">
              <div>
                 <h4 className="text-xs font-bold text-emerald-700 uppercase tracking-widest mb-3 border-b border-emerald-100 pb-2">Positive Drivers</h4>
                 <div className="space-y-1">
                   {POSITIVE_ATTRIBUTES.map(attr => (
                     <button 
                       key={attr}
                       onClick={() => handleAttrClick(attr)}
                       className={`w-full text-left text-xs font-bold py-2.5 px-3 rounded-lg transition-all flex justify-between items-center border ${
                           activeAttr === attr 
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-800 shadow-sm' 
                            : 'border-transparent text-slate-500 hover:text-emerald-700 hover:bg-slate-50'
                        }`}
                     >
                       {ATTRIBUTE_LABELS[attr].split(' ')[1]}
                     </button>
                   ))}
                 </div>
              </div>
              <div>
                 <h4 className="text-xs font-bold text-rose-700 uppercase tracking-widest mb-3 border-b border-rose-100 pb-2">Negative Drivers</h4>
                 <div className="space-y-1">
                   {NEGATIVE_ATTRIBUTES.map(attr => (
                     <button 
                       key={attr}
                       onClick={() => handleAttrClick(attr)}
                       className={`w-full text-left text-xs font-bold py-2.5 px-3 rounded-lg transition-all flex justify-between items-center border ${
                           activeAttr === attr 
                            ? 'bg-rose-50 border-rose-200 text-rose-800 shadow-sm' 
                            : 'border-transparent text-slate-500 hover:text-rose-700 hover:bg-slate-50'
                        }`}
                     >
                       {ATTRIBUTE_LABELS[attr].split(' ')[1]}
                     </button>
                   ))}
                 </div>
              </div>
           </div>

           <div ref={chartRef} className="lg:col-span-9 flex flex-col scroll-mt-28">
              <div className="mb-6 pb-6 border-b border-slate-100">
                  <h3 className="text-3xl font-playfair font-bold text-slate-900 mb-2">Top 50 for <span className={isPositiveAttr ? 'text-emerald-600' : 'text-rose-600'}>{activeTitle}</span></h3>
                  <p className="text-slate-600 font-medium text-lg leading-relaxed">{activeDesc}</p>
              </div>
              <div style={{ height: chartHeight, width: '100%' }}>
                  <ResponsiveContainer width="100%" height="100%">
                     <BarChart data={activeAttrData} layout="vertical" margin={{ left: 0, right: 30, top: 0, bottom: 0 }}>
                       <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                       <XAxis type="number" domain={[0, 5]} hide />
                       <YAxis 
                         dataKey="name" 
                         type="category" 
                         width={140} 
                         tick={<CustomYAxisTick />}
                         interval={0}
                         axisLine={false}
                         tickLine={false}
                       />
                       <RechartsTooltip 
                         cursor={{fill: isPositiveAttr ? '#ecfdf5' : '#fff1f2', opacity: 0.7}}
                         content={({ active, payload }) => {
                             if (active && payload && payload.length) {
                               const data = payload[0].payload;
                               return (
                                 <TooltipCard>
                                    <p className="font-bold text-slate-800 mb-1">{data.name}</p>
                                    <p className="text-xs text-slate-500 flex justify-between gap-4">
                                        <span>{activeTitle}: <strong>{data.value}</strong></span>
                                        <span className={`font-bold ${getScoreColor(data.score)}`}>Total Score: {data.score.toFixed(1)}</span>
                                    </p>
                                 </TooltipCard>
                               );
                             }
                             return null;
                         }}
                       />
                       <Bar 
                          dataKey="value" 
                          fill={activeColor} 
                          radius={[0, 4, 4, 0]} 
                          barSize={12} 
                          label={{ position: 'right', fill: activeColor, fontSize: 11, fontWeight: 'bold', formatter: (val: number) => val }}
                          className="cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={(data: any) => {
                            const animal = data?.originalAnimal || data?.payload?.originalAnimal;
                            if (animal) {
                              navigate(`/species/${animal.id}`);
                            }
                          }}
                       />
                     </BarChart>
                   </ResponsiveContainer>
              </div>
           </div>
      </div>
  );
};