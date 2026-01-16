import React, { useMemo } from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip } from 'recharts';
import { Activity } from 'lucide-react';
import { Animal } from '../types';
import { TooltipCard } from './Tooltip';

interface AnimalRadarChartProps {
  animal: Animal;
}

const AnimalRadarChart: React.FC<AnimalRadarChartProps> = ({ animal }) => {
  const radarData = useMemo(() => [
    { subject: 'Sattva', A: animal.sattva, fullMark: 5 },
    { subject: 'Rajas', A: animal.rajas, fullMark: 5 },
    { subject: 'Tamas', A: animal.tamas, fullMark: 5 },
    { subject: 'Vairagya', A: animal.vairagya, fullMark: 5 },
    { subject: 'Viveka', A: animal.viveka, fullMark: 5 },
    { subject: 'Himsa (-)', A: animal.himsa, fullMark: 5 },
  ], [animal]);

  return (
    <div className="bg-white rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-100 p-6">
      <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center font-serif">
        <Activity className="w-5 h-5 mr-2 text-emerald-600" />
        Core Energy Profile
      </h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
            <PolarGrid stroke="#e2e8f0" strokeDasharray="3 3" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }} />
            <Radar
              name={animal.name}
              dataKey="A"
              stroke="#059669"
              strokeWidth={2}
              fill="#10b981"
              fillOpacity={0.2}
            />
            <Tooltip 
              cursor={false}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <TooltipCard className="!p-3">
                      <p className="font-bold text-slate-800 text-sm mb-1">{data.subject}</p>
                      <div className="text-xs text-slate-600">
                        Value: <span className="font-bold text-emerald-700">{data.A}</span> / 5
                      </div>
                    </TooltipCard>
                  );
                }
                return null;
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnimalRadarChart;