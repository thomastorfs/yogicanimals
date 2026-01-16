import React from 'react';
import { Activity, Search, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <div className="relative w-full py-32 lg:py-48 flex flex-col items-center justify-center overflow-hidden">
      
      {/* --- Living Background Layer --- */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-slate-50">
          {/* Base Color Wash - Visible Green Tint - REMOVED per request */}
          {/* <div className="absolute inset-0 bg-gradient-to-b from-emerald-100/80 via-emerald-50 to-slate-50 z-0" /> */}

          {/* Noise Texture for 'Paper' feel - Increased opacity for texture */}
          <div className="absolute inset-0 opacity-[0.5] mix-blend-overlay pointer-events-none z-10" 
               style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")` }} 
          />
          
          {/* One Large Unified Gradient - REMOVED per request */}
          {/* <div className="absolute top-[-50%] left-[-20%] w-[140%] h-[140%] bg-gradient-to-br from-teal-200/40 via-emerald-200/40 to-transparent rounded-[100%] blur-[100px] animate-blob mix-blend-multiply" 
               style={{ animationDuration: '25s' }}
          /> */}
      </div>

      {/* --- Content Layer --- */}
      <div className="relative z-20 container mx-auto px-4 flex flex-col items-center text-center">
        
        {/* Decorative Top Line - REMOVED per request */}
        
        {/* Main Brand Typography */}
        <h1 className="flex flex-wrap justify-center items-baseline font-playfair leading-none mb-8 relative drop-shadow-sm">
            <span className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-600 font-semibold tracking-tight pb-4">
                Yogic
            </span>
            <span className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] text-emerald-950 font-bold tracking-tighter pb-4">
                Animals
            </span>
        </h1>

        {/* Subtitle / Tagline */}
        <p className="text-xl sm:text-2xl text-emerald-900/70 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
           Discover the <span className="font-serif italic text-emerald-500 font-bold">spiritual personality</span> of nature. 
           We quantify the spiritual virtues and energies of animals using ancient Eastern frameworks.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto">
           <button 
             onClick={() => navigate('/animals')} 
             className="w-full sm:w-auto h-16 px-12 bg-emerald-500 text-white rounded-full font-sans text-sm font-bold tracking-widest uppercase transition-all hover:bg-emerald-600 hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-500/20 shadow-xl shadow-emerald-500/10 flex items-center justify-center gap-3 group"
           >
              <Search size={20} className="group-hover:stroke-2 transition-all" />
              <span>See Animals</span>
           </button>
           
           <button 
             onClick={() => navigate('/analytics')} 
             className="w-full sm:w-auto h-16 px-12 bg-white/40 backdrop-blur-md border border-white/60 text-emerald-950 rounded-full font-sans text-sm font-bold tracking-widest uppercase hover:bg-white/80 hover:scale-[1.02] transition-all shadow-lg shadow-emerald-900/5 flex items-center justify-center gap-3 group"
           >
              <Activity size={20} className="text-emerald-700 group-hover:scale-110 transition-transform" />
              <span>See Metrics</span>
           </button>
        </div>

      </div>
    </div>
  );
};