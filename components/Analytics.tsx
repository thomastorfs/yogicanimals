import React from 'react';
import { useEffect } from 'react';
import MetricCorrelations from './MetricCorrelations';
import { AttributeExplorer } from './AttributeExplorer';
import { Animal } from '../types';

interface AnalyticsProps {
  animals: Animal[];
}

const Analytics: React.FC<AnalyticsProps> = ({ animals }) => {
  
  useEffect(() => {
    document.title = "YogicAnimals | Analytics | Data & Trends";
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 font-playfair mb-4">Analytics Dashboard</h1>
            <p className="mt-3 text-lg text-slate-500 font-light">Correlations and aggregated spiritual metrics across the animal kingdom.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-12">
        
        {/* Scatter Plot Card */}
            <MetricCorrelations animals={animals} />

        {/* Attribute Explorer Card */}
            <AttributeExplorer animals={animals} />

      </div>
    </div>
  );
};

export default Analytics;