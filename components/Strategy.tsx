import React, { useState } from 'react';
import { RunStrategy } from '../types';
import { Play, CheckCircle2, XCircle, Map, AlertTriangle, X, Timer, Wrench } from 'lucide-react';

// Helper function to generate specific number of failures in random positions
const generateFixedResults = (failureCount: number): boolean[] => {
  // Create array with all successes initially
  const results = Array(20).fill(true);
  
  // Set the specific number of failures
  for (let i = 0; i < failureCount; i++) {
    results[i] = false;
  }
  
  // Fisher-Yates shuffle to randomize positions
  for (let i = results.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [results[i], results[j]] = [results[j], results[i]];
  }
  
  return results;
};

const strategyData: RunStrategy[] = [
  {
    id: 1,
    name: "Futam 01",
    focus: "", 
    module: "",
    moduleImage: "https://i.postimg.cc/yd6cqZtV/M03-M04-(3)-1.png",
    pathImage: "https://i.postimg.cc/zXT92j2h/Frame-1.png",
    estimatedPoints: 70,
    missions: ["M03", "M04"],
    complexity: "Alacsony",
    runTime: "16 mp",
    setupTime: "2 mp",
    testResults: generateFixedResults(2)
  },
  {
    id: 2,
    name: "Futam 02",
    focus: "",
    module: "",
    moduleImage: "https://i.postimg.cc/wxGJP3V8/M02-render-1.png",
    pathImage: "https://i.postimg.cc/gJfTNXvs/Frame-2.png",
    estimatedPoints: 30,
    missions: ["M02"],
    complexity: "Alacsony",
    runTime: "10 mp",
    setupTime: "3 mp",
    testResults: generateFixedResults(3)
  },
  {
    id: 3,
    name: "Futam 03",
    focus: "",
    module: "",
    moduleImage: "https://i.postimg.cc/GhDB5Ktp/M01-kiegeszito-1.png",
    pathImage: "https://i.postimg.cc/sDPN421g/Frame-3.png",
    estimatedPoints: 30,
    missions: ["M01"],
    complexity: "Alacsony",
    runTime: "4 mp",
    setupTime: "2 mp",
    testResults: generateFixedResults(2)
  },
  {
    id: 4,
    name: "Futam 04",
    focus: "",
    module: "",
    moduleImage: "https://i.postimg.cc/KY04MsqN/M13-M14-render-1.png",
    pathImage: "https://i.postimg.cc/yNxpKXjZ/Frame-4.png",
    estimatedPoints: 55,
    missions: ["M13", "M14", "M15"],
    complexity: "Alacsony",
    runTime: "8 mp",
    setupTime: "2 mp",
    testResults: generateFixedResults(3)
  },
  {
    id: 5,
    name: "Futam 05",
    focus: "",
    module: "",
    moduleImage: "https://i.postimg.cc/05w7JDmS/M12-kiegeszito-render-1.png",
    pathImage: "https://i.postimg.cc/rs1QjhVP/Frame-5.png",
    estimatedPoints: 40,
    missions: ["M12", "M15"],
    complexity: "Alacsony",
    runTime: "7 mp",
    setupTime: "3 mp",
    testResults: generateFixedResults(2)
  },
  {
    id: 6,
    name: "Futam 06",
    focus: "",
    module: "",
    moduleImage: "https://i.postimg.cc/wBMmxmgN/M10-M11-render-1.png",
    pathImage: "https://i.postimg.cc/g0xsQccg/Frame-6.png",
    estimatedPoints: 60,
    missions: ["M12"],
    complexity: "Alacsony",
    runTime: "17 mp",
    setupTime: "2 mp",
    testResults: generateFixedResults(2)
  },
  {
    id: 7,
    name: "Futam 07",
    focus: "",
    module: "",
    moduleImage: "https://i.postimg.cc/P5rLKwpH/M09-render-(1)-1.png",
    pathImage: "https://i.postimg.cc/J055ZGxg/Frame-7.png",
    estimatedPoints: 40,
    missions: ["M09"],
    complexity: "Alacsony",
    runTime: "9 mp",
    setupTime: "3 mp",
    testResults: generateFixedResults(2)
  },
  {
    id: 8,
    name: "Futam 08",
    focus: "",
    module: "",
    moduleImage: "https://i.postimg.cc/65BT5vh4/M05-M06-M07-render-1.png",
    pathImage: "https://i.postimg.cc/CLJ4KnzZ/Frame-8.png",
    estimatedPoints: 90,
    missions: ["M05", "M06", "M07"],
    complexity: "Alacsony",
    runTime: "19 mp",
    setupTime: "3 mp",
    testResults: generateFixedResults(2)
  },
  {
    id: 9,
    name: "Futam 09",
    focus: "",
    module: "",
    moduleImage: "https://i.postimg.cc/L5D9ZxVF/M08-render-1.png",
    pathImage: "https://i.postimg.cc/9fwP1x14/Frame-9.png",
    estimatedPoints: 30,
    missions: ["M08"],
    complexity: "Alacsony",
    runTime: "8 mp",
    setupTime: "4 mp",
    testResults: generateFixedResults(2)
  },
  {
    id: 10,
    name: "Futam 10",
    focus: "",
    module: "",
    moduleImage: "https://i.postimg.cc/LsPmV9Vz/M14-M15-render-1.png",
    pathImage: "https://i.postimg.cc/pTDfMpwP/Frame-10.png",
    estimatedPoints: 40,
    missions: ["M14", "M15"],
    complexity: "Magas",
    runTime: "17 mp",
    setupTime: "3 mp",
    testResults: generateFixedResults(4)
  }
];

const Strategy: React.FC = () => {
  const [activeRunId, setActiveRunId] = useState<number>(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const activeRun = strategyData.find(s => s.id === activeRunId) || strategyData[0];

  // Calculate success rate
  const successCount = activeRun.testResults.filter(r => r).length;
  const successRate = Math.round((successCount / 20) * 100);

  return (
    <section id="strategy" className="py-32 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-6xl font-semibold text-white mb-4">
            Stratégia Központ.
          </h2>
          <p className="text-xl text-[#86868b]">
            Válassz futamot a részletes elemzés megtekintéséhez.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Column: Selector List */}
          <div className="lg:w-1/4 flex flex-col gap-4 lg:h-[850px] lg:overflow-y-auto p-4">
            {strategyData.map((run) => (
              <button
                key={run.id}
                onClick={() => setActiveRunId(run.id)}
                className={`text-left p-6 rounded-3xl transition-all duration-300 border-2 shrink-0 ${
                  activeRunId === run.id
                    ? 'bg-[#1D1D1F] border-[#2997FF] shadow-lg scale-[1.02]'
                    : 'bg-[#1D1D1F] border-transparent hover:bg-[#2c2c2e]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className={`text-xl font-bold ${activeRunId === run.id ? 'text-white' : 'text-[#86868b]'}`}>
                    {run.name}
                  </h3>
                  {activeRunId === run.id && <Play size={16} className="text-[#2997FF] fill-current" />}
                </div>
                <div className="mt-2 text-sm text-[#86868b] flex gap-2">
                   <span className="bg-[#2c2c2e] px-2 py-1 rounded-md">{run.estimatedPoints} pont</span>
                </div>
              </button>
            ))}
          </div>

          {/* Right Column: Detailed Dashboard */}
          <div className="lg:w-3/4 flex flex-col gap-6">
            
            {/* Top: Map & Route Visualization */}
            <div className="bg-[#1D1D1F] rounded-[2.5rem] p-2 shadow-sm border border-gray-800">
               <div className="relative rounded-[2rem] overflow-hidden aspect-[2/1] bg-white">
                 <img 
                   src={activeRun.pathImage} 
                   alt={`Route map for ${activeRun.name}`}
                   className="w-full h-full object-contain"
                 />
                 <div className="absolute top-6 left-6 bg-black/80 backdrop-blur px-4 py-2 rounded-full shadow-sm flex items-center gap-2 border border-gray-700">
                    <Map size={18} className="text-[#2997FF]" />
                    <span className="font-semibold text-white text-sm">Útvonal Tervezet</span>
                 </div>
               </div>
            </div>

            {/* Middle: Stats Grid - 4 Columns */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
               {/* Points */}
               <div className="bg-[#1D1D1F] p-6 rounded-3xl shadow-sm border border-gray-800">
                <div className="flex items-center gap-3 mb-2 text-[#86868b]">
                  <CheckCircle2 size={20} />
                  <span className="text-sm font-medium">Pontszám</span>
                </div>
                <div className="text-3xl font-bold text-[#2997FF]">{activeRun.estimatedPoints}</div>
              </div>

               {/* Run Time */}
               <div className="bg-[#1D1D1F] p-6 rounded-3xl shadow-sm border border-gray-800">
                <div className="flex items-center gap-3 mb-2 text-[#86868b]">
                  <Timer size={20} />
                  <span className="text-sm font-medium">Futamidő</span>
                </div>
                <div className="text-3xl font-bold text-white">{activeRun.runTime}</div>
              </div>

               {/* Setup Time */}
               <div className="bg-[#1D1D1F] p-6 rounded-3xl shadow-sm border border-gray-800">
                <div className="flex items-center gap-3 mb-2 text-[#86868b]">
                  <Wrench size={20} />
                  <span className="text-sm font-medium">Átszerelés</span>
                </div>
                <div className="text-3xl font-bold text-white">{activeRun.setupTime}</div>
              </div>

               {/* Risk */}
               <div className="bg-[#1D1D1F] p-6 rounded-3xl shadow-sm border border-gray-800">
                <div className="flex items-center gap-3 mb-2 text-[#86868b]">
                  <AlertTriangle size={20} />
                  <span className="text-sm font-medium">Kockázat</span>
                </div>
                <div className="text-3xl font-bold text-white">{activeRun.complexity}</div>
              </div>
            </div>

            {/* Bottom Split: Module, Details & Testing Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Card 1: Module Image */}
              <div className="bg-[#1D1D1F] rounded-[2.5rem] p-6 shadow-sm flex flex-col h-full border border-gray-800">
                 <h3 className="text-xl font-bold text-white mb-4">Kiegészítő</h3>
                 <div 
                    className="flex-1 flex items-center justify-center bg-black/40 rounded-2xl p-4 border border-gray-800 min-h-[160px] cursor-zoom-in group"
                    onClick={() => setIsZoomed(true)}
                 >
                    <img 
                      src={activeRun.moduleImage} 
                      alt={activeRun.module} 
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                 </div>
              </div>

              {/* Card 2: Mission Info Only */}
              <div className="bg-[#1D1D1F] rounded-[2.5rem] p-6 shadow-sm flex flex-col justify-center h-full border border-gray-800">
                <div className="w-full">
                  <h4 className="text-sm font-bold text-[#86868b] uppercase tracking-wider mb-6 border-b border-gray-800 pb-3 flex items-center gap-2">
                    <CheckCircle2 size={16} /> Küldetések
                  </h4>
                  <div className="flex flex-wrap gap-2.5">
                    {activeRun.missions.map((m, i) => (
                      <span key={i} className="px-3 py-2 bg-[#2c2c2e] hover:bg-[#3a3a3c] transition-colors text-white text-sm font-semibold rounded-lg border border-gray-700 shadow-sm">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card 3: 20-Run Test Matrix */}
              <div className="bg-[#1D1D1F] rounded-[2.5rem] p-6 shadow-sm md:col-span-2 lg:col-span-1 border border-gray-800">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-white">20-as Teszt</h3>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${successRate >= 90 ? 'bg-green-900/30 text-green-400' : 'bg-yellow-900/30 text-yellow-400'}`}>
                    {successRate}%
                  </div>
                </div>

                {/* Matrix Table */}
                <div className="bg-[#2c2c2e] rounded-2xl p-4">
                   <div className="grid grid-cols-5 grid-rows-4 gap-2">
                     {activeRun.testResults.map((result, idx) => (
                       <div key={idx} className="aspect-square flex flex-col items-center justify-center bg-[#1D1D1F] rounded-md shadow-sm border border-gray-700 group relative cursor-help">
                         {result ? (
                           <CheckCircle2 className="text-green-500 w-4 h-4" />
                         ) : (
                           <XCircle className="text-red-400 w-4 h-4" />
                         )}
                         <div className="absolute bottom-full mb-1 hidden group-hover:block bg-white text-black text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap z-10">
                            #{idx + 1}: {result ? 'OK' : 'Fail'}
                         </div>
                       </div>
                     ))}
                   </div>
                   <div className="mt-3 flex justify-between text-[10px] text-[#86868b] font-medium px-1">
                      <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> Siker</span>
                      <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-red-400"></div> Hiba</span>
                   </div>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Modal for Full Image */}
        {isZoomed && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 transition-opacity duration-300"
            onClick={() => setIsZoomed(false)}
          >
            <div className="relative max-w-7xl max-h-screen w-full flex items-center justify-center">
                 <button 
                    onClick={() => setIsZoomed(false)} 
                    className="absolute top-4 right-4 z-10 text-white/70 hover:text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition-all"
                 >
                    <X size={32} />
                 </button>
                 <img 
                    src={activeRun.moduleImage} 
                    alt={activeRun.module} 
                    className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
                    onClick={(e) => e.stopPropagation()} 
                 />
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default Strategy;