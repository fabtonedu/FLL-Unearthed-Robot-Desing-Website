import React from 'react';
import { Cpu, Zap, Move, Box, Layers } from 'lucide-react';
import { RobotSpec } from '../types';

const RobotSpecs: React.FC = () => {
  return (
    <section id="robot" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-semibold text-white mb-6 tracking-tight uppercase">
            A ROBOTUNK
          </h2>
          <p className="text-xl md:text-2xl text-[#86868b] max-w-2xl mx-auto font-medium">
            Újradefiniált teljesítmény.
          </p>
        </div>

        {/* Bento Grid Layout - Adjusted for 4 items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Controller Card - Compact Version */}
          <div className="bg-[#1D1D1F] rounded-2xl p-6 flex flex-col justify-center items-center text-center hover:bg-[#2c2c2e] transition-colors border border-gray-800 min-h-[200px]">
            <Cpu size={32} className="text-white mb-4 opacity-80" />
            <h3 className="text-lg font-semibold text-white mb-2">SPIKE Prime Hub</h3>
            <p className="text-sm text-[#86868b] leading-relaxed">A robot agya. Python alapú precíz vezérlés.</p>
          </div>

          {/* Quick Lock Innovation - Compact Version */}
          <div className="bg-[#1D1D1F] rounded-2xl p-6 flex flex-col justify-center items-center text-center hover:bg-[#2c2c2e] transition-colors border border-gray-800 min-h-[200px]">
             <div className="flex items-center gap-1.5 mb-3">
                <Layers size={16} className="text-[#2997FF]" />
                <span className="text-[10px] font-bold text-[#2997FF] uppercase tracking-wider">Innováció</span>
             </div>
             <h3 className="text-lg font-semibold text-white mb-2">Quick-Lock Rendszer</h3>
             <p className="text-[#86868b] text-sm leading-relaxed">
               Passzív modulcsere <span className="text-white font-bold">2 másodperc</span> alatt.
             </p>
          </div>

          {/* Motors Card - Compact Version */}
          <div className="bg-[#1D1D1F] rounded-2xl p-6 flex flex-col justify-center items-center text-center hover:bg-[#2c2c2e] transition-colors border border-gray-800 min-h-[200px]">
             <Zap size={32} className="text-white mb-4 opacity-80" />
             <div>
               <h3 className="text-lg font-semibold text-white mb-2">Erőátvitel</h3>
               <p className="text-sm text-[#86868b] leading-relaxed">2x Medium Hajtómotor<br/>2x Medium Eszközmotor</p>
             </div>
          </div>

           {/* Sensors Card - Compact Version */}
           <div className="bg-[#1D1D1F] rounded-2xl p-6 flex flex-col justify-center items-center text-center hover:bg-[#2c2c2e] transition-colors border border-gray-800 min-h-[200px]">
             <Move size={32} className="text-white mb-4 opacity-80" />
             <div>
               <h3 className="text-lg font-semibold text-white mb-2">Szenzorok</h3>
               <p className="text-sm text-[#86868b] leading-relaxed">
                 Gyroszkóp forduláshoz<br/>
                 Színszenzor programválasztáshoz<br/>
                 Nyomásérzékelő indításhoz
               </p>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default RobotSpecs;