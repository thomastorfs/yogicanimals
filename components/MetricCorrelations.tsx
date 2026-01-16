import React, { useMemo, useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ATTRIBUTE_LABELS, YogicAttributes, Animal } from '../types';
import { parsePopulation, formatPopulation } from '../utils';
import { getScoreColor } from './YogicScore';
import { TooltipCard } from './Tooltip';

interface MetricCorrelationsProps {
  animals: Animal[];
}

const MetricCorrelations: React.FC<MetricCorrelationsProps> = ({ animals }) => {
  // Chart State - Defaulting to Population vs Total Score
  const [xAxis, setXAxis] = useState<string>('current_population');
  const [yAxis, setYAxis] = useState<string>('total_score');

  const getLabel = (key: string) => {
    if (key === 'total_score') return '✨ Total Yogic Score';
    if (key === 'current_population') return '👥 Population Size';
    return ATTRIBUTE_LABELS[key as keyof YogicAttributes] || key;
  };

  const getValue = (animal: Animal, key: string) => {
    if (key === 'total_score') return animal.total_score;
    if (key === 'current_population') return parsePopulation(animal.current_population);
    return animal[key as keyof YogicAttributes] as number || 0;
  };

  // --- Chart Data Preparation ---
  const scatterData = useMemo(() => {
    return animals.map(animal => ({
      x: getValue(animal, xAxis),
      y: getValue(animal, yAxis),
      z: animal.total_score,
      name: animal.name,
      type: animal.type
    }));
  }, [animals, xAxis, yAxis]);

  // --- Regression Line Calculation ---
  const trendData = useMemo(() => {
    // Filter out invalid points for log scales
    const data = scatterData.filter(d => 
      (xAxis !== 'current_population' || d.x > 0) &&
      (yAxis !== 'current_population' || d.y > 0)
    );
    
    if (data.length < 2) return [];

    const isLogX = xAxis === 'current_population';
    const isLogY = yAxis === 'current_population';

    // Transform data for linear regression
    const points = data.map(d => ({
        x: isLogX ? Math.log(d.x) : d.x,
        y: isLogY ? Math.log(d.y) : d.y
    }));

    const n = points.length;
    const sumX = points.reduce((acc, p) => acc + p.x, 0);
    const sumY = points.reduce((acc, p) => acc + p.y, 0);
    const sumXY = points.reduce((acc, p) => acc + p.x * p.y, 0);
    const sumXX = points.reduce((acc, p) => acc + p.x * p.x, 0);

    // Calculate slope and intercept
    const denominator = (n * sumXX - sumX * sumX);
    if (denominator === 0) return []; // Vertical line, avoid division by zero

    const slope = (n * sumXY - sumX * sumY) / denominator;
    const intercept = (sumY - slope * sumX) / n;

    // Generate start and end points for the line
    const xValues = data.map(d => d.x);
    const minX = Math.min(...xValues);
    const maxX = Math.max(...xValues);

    const predict = (val: number) => {
        const transVal = isLogX ? Math.log(val) : val;
        const transY = slope * transVal + intercept;
        return isLogY ? Math.exp(transY) : transY;
    };

    return [
        { x: minX, y: predict(minX) },
        { x: maxX, y: predict(maxX) }
    ];
  }, [scatterData, xAxis, yAxis]);

  const getAxisProps = (key: string) => {
    const isPop = key === 'current_population';
    const isScore = key === 'total_score';
    
    return {
       domain: isPop ? ['dataMin', 'dataMax'] : isScore ? ['auto', 'auto'] : [0, 6],
       scale: isPop ? 'log' : 'auto',
       tickFormatter: isPop ? (val: number) => formatPopulation(val.toString()) : undefined,
    };
  };

  const AttributeSelector = ({ label, value, onChange }: { label: string, value: string, onChange: (val: any) => void }) => (
    <div className="flex flex-col min-w-[200px]">
      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{label}</label>
      <div className="relative">
        <select 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          className="block w-full pl-4 pr-10 py-2.5 text-sm border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 rounded-lg shadow-sm appearance-none cursor-pointer hover:border-emerald-300 transition-colors"
        >
          <optgroup label="General Metrics">
            <option value="total_score">✨ Total Yogic Score</option>
            <option value="current_population">👥 Population Size</option>
          </optgroup>
          <optgroup label="Yogic Attributes">
            {Object.entries(ATTRIBUTE_LABELS).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </optgroup>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-100 p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6 border-b border-slate-100 pb-6">
         <div>
           <h2 className="text-2xl font-bold text-slate-900 font-serif">Metric Correlations</h2>
           <p className="text-slate-500 text-sm mt-1">Compare attributes, population sizes, and total scores to find patterns</p>
         </div>
         <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <AttributeSelector label="X Axis" value={xAxis} onChange={setXAxis} />
            <AttributeSelector label="Y Axis" value={yAxis} onChange={setYAxis} />
         </div>
      </div>
      
      <div className="h-[500px] w-full bg-slate-50/50 rounded-2xl border border-slate-100 p-4">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              type="number" 
              dataKey="x" 
              name={getLabel(xAxis)} 
              tickCount={7}
              label={{ value: getLabel(xAxis), position: 'insideBottom', offset: -10, fill: '#64748b' }} 
              tick={{ fill: '#64748b' }}
              {...getAxisProps(xAxis) as any}
            />
            <YAxis 
              type="number" 
              dataKey="y" 
              name={getLabel(yAxis)} 
              tickCount={7}
              label={{ value: getLabel(yAxis), angle: -90, position: 'insideLeft', fill: '#64748b' }}
              tick={{ fill: '#64748b' }}
              width={60}
              {...getAxisProps(yAxis) as any}
            />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                // Skip tooltip for the trend line which has no name
                if (!data.name) return null;
                
                return (
                  <TooltipCard>
                    <p className="font-bold text-slate-900 text-lg font-serif">{data.name}</p>
                    <p className="text-xs text-slate-500 mb-3 uppercase tracking-wider font-bold">{data.type}</p>
                    <div className="space-y-1">
                      <p className="text-sm text-slate-600">
                         <span className="font-medium text-emerald-700">{getLabel(xAxis)}:</span>{' '}
                         {xAxis === 'current_population' ? formatPopulation(data.x.toString()) : data.x}
                      </p>
                      <p className="text-sm text-slate-600">
                         <span className="font-medium text-emerald-700">{getLabel(yAxis)}:</span>{' '}
                         {yAxis === 'current_population' ? formatPopulation(data.y.toString()) : data.y}
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-100">
                      <p className={`text-sm font-black font-serif tracking-tighter ${getScoreColor(data.z)}`}>
                        Total Score: {data.z.toFixed(1)}
                      </p>
                    </div>
                  </TooltipCard>
                );
              }
              return null;
            }} />
            <Scatter name="Animals" data={scatterData} fill="#059669" fillOpacity={0.6} />
            {trendData.length > 0 && (
              <Scatter 
                name="Trend" 
                data={trendData} 
                line={{ stroke: '#f59e0b', strokeWidth: 2, strokeDasharray: '5 5' }} 
                shape={() => null} 
                legendType="none" 
              />
            )}
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MetricCorrelations;