import React from 'react';
import { ArrowRight, RefreshCw, AlertCircle, Check, FileX, GitBranch, Database, GitCommit } from 'lucide-react';
import { EvolutionItem } from '../types';

const evolutionItems: EvolutionItem[] = [
  {
    id: 1,
    component: "Programozás és Mentés",
    problem: "Korábban komoly problémát okozott, amikor egy hibás módosítással véletlenül felülírtunk egy már jól működő programot. Egyszer emiatt az egész munkát elölről kellett kezdenünk, mert nem volt hova visszalépnünk, ami kritikus időveszteséget jelentett.",
    solution: "Most már minden sikeres verziót a felhőben tárolunk (GitHub). Ez garantálja, hogy a jól működő kódunk mindig biztonságban van és bármikor visszaállítható. Így biztosak lehetünk benne, hogy soha többé nem kell nulláról újrakezdenünk a fejlesztést egy hiba miatt.",
    imageBefore: "https://i.postimg.cc/Y9C8Fj3f/86c3e030-e55f-45e6-8a2b-13c84bfbd673.png",
    imageAfter: "https://i.postimg.cc/ZYgj9byq/robot-studio-1.png"
  },
  {
    id: 2,
    component: "Automatikus Programválasztás",
    problem: "Az egyik legtipikusabb hibánk a versenyek alatt a rosszul felhelyezett kiegészítő vagy a téves programindítás volt. A stresszes helyzetben könnyű összekeverni a programokat, ami értékes időbe és pontokba került, mivel a robot nem azt csinálta, amit szerettünk volna.",
    solution: "Ennek elkerülésére minden kiegészítő aljára színes elemeket tettünk. A robotra szerelt színérzékelő beolvassa ezt a színkódot felhelyezéskor, és a szoftver automatikusan a hozzá tartozó programra vált. Így a robot mindig 'tudja', melyik feladat következik, teljesen kizárva az emberi tévesztést.",
    imageBefore: "https://i.postimg.cc/Y9C8Fj3f/86c3e030-e55f-45e6-8a2b-13c84bfbd673.png",
    imageAfter: "https://i.postimg.cc/ZYgj9byq/robot-studio-1.png"
  }
];

const Evolution: React.FC = () => {
  return (
    <section id="evolution" className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-900/30 text-orange-400 text-xs font-bold mb-6 border border-orange-900/50">
                <RefreshCw size={12} />
                <span>ITERÁCIÓ</span>
            </div>
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6">
            Hibákból Tanultunk.
          </h2>
          <p className="text-xl text-[#86868b] max-w-2xl">
            A tökéletes robot nem elsőre születik meg. Minden hiba egy újabb lépés volt a megoldás felé.
          </p>
        </div>

        <div className="grid gap-24">
           {evolutionItems.map((item) => (
               <div key={item.id} className="relative border-b border-gray-800 pb-16 last:border-0 last:pb-0">
                   <h3 className="text-3xl font-bold text-white mb-10">{item.component} Evolúció</h3>
                   
                   <div className="grid md:grid-cols-2 gap-10 lg:gap-20 items-start">
                       
                       {/* Problem State */}
                       <div className="group flex flex-col">
                           {/* Label */}
                           <div className="flex items-center gap-2 text-red-400 mb-4">
                               <AlertCircle size={22} /> 
                               <span className="text-lg font-bold uppercase tracking-wide">Probléma (V1)</span>
                           </div>
                           
                           {/* Visual Area */}
                           {item.id === 1 ? (
                               /* Restored Custom Visualization */
                               <div className="bg-[#1D1D1F] rounded-3xl overflow-hidden h-64 w-full mb-5 shadow-inner border border-gray-800 relative group-hover:border-red-500/30 transition-colors duration-500">
                                   <div className="w-full h-full flex flex-col items-center justify-center bg-[#111] p-6 relative">
                                       <div className="absolute top-0 left-0 w-full h-1 bg-red-500/50"></div>
                                       <div className="relative z-10 flex flex-col items-center text-center">
                                            <div className="relative mb-4">
                                                <FileX size={64} className="text-red-500 opacity-90" />
                                                <AlertCircle size={24} className="text-white absolute -bottom-1 -right-1 bg-red-600 rounded-full" />
                                            </div>
                                            <div className="font-mono text-red-400/90 text-sm">
                                                <span className="block opacity-60 text-xs mb-1">C:\Users\FLL\Robot\</span>
                                                <span className="font-bold text-xl tracking-wider">FELÜLÍRVA</span>
                                                <span className="block text-xs mt-2 opacity-70 bg-red-900/30 px-2 py-1 rounded">Hiba: Biztonsági mentés hiányzik</span>
                                            </div>
                                       </div>
                                       <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-5"></div>
                                   </div>
                               </div>
                           ) : (
                               /* Standard Image Rendering for other items - Removed padding to make larger */
                               <div className="bg-[#1D1D1F] rounded-3xl overflow-hidden h-64 w-full mb-5 shadow-inner border border-gray-800 relative group-hover:border-red-500/30 transition-colors duration-500">
                                   <img 
                                    src={item.imageBefore} 
                                    alt="Before" 
                                    referrerPolicy="no-referrer"
                                    className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity" 
                                   />
                               </div>
                           )}
                           
                           <p className="text-[#86868b] leading-relaxed bg-red-900/10 p-5 rounded-2xl border border-red-900/20">
                               {item.problem}
                           </p>
                       </div>

                       {/* Arrow for Desktop */}
                       <div className="hidden md:flex absolute left-1/2 top-[45%] -translate-x-1/2 items-center justify-center w-12 h-12 bg-[#1D1D1F] rounded-full shadow-lg z-10 border border-gray-700">
                           <ArrowRight className="text-gray-400" size={24} />
                       </div>

                       {/* Solution State */}
                       <div className="group flex flex-col">
                           {/* Label */}
                           <div className="flex items-center gap-2 text-green-400 mb-4">
                               <Check size={22} /> 
                               <span className="text-lg font-bold uppercase tracking-wide">Megoldás (V2)</span>
                           </div>
                           
                           {/* Visual Area */}
                           {item.id === 1 ? (
                               /* Restored Custom Visualization */
                               <div className="bg-[#1D1D1F] rounded-3xl overflow-hidden h-64 w-full mb-5 shadow-lg border border-gray-700 group-hover:scale-[1.01] transition-transform duration-500 group-hover:border-green-500/30">
                                   <div className="w-full h-full flex flex-col items-center justify-center bg-[#111] p-6 relative">
                                        <div className="absolute top-0 left-0 w-full h-1 bg-green-500/50"></div>
                                        
                                        <div className="grid grid-cols-2 gap-8 items-center z-10 w-full max-w-[80%] mx-auto">
                                            {/* Git Tree Visualization */}
                                            <div className="flex flex-col gap-3 relative">
                                                <div className="absolute left-[9px] top-2 bottom-2 w-0.5 bg-gray-700"></div>
                                                <div className="flex items-center gap-3 relative z-10">
                                                    <div className="w-5 h-5 rounded-full border-2 border-green-500 bg-[#111] flex items-center justify-center">
                                                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                                    </div>
                                                    <span className="text-[10px] font-mono text-green-400 bg-green-900/20 px-1.5 py-0.5 rounded">v2.1 (Stable)</span>
                                                </div>
                                                <div className="flex items-center gap-3 relative z-10 opacity-60">
                                                    <div className="w-5 h-5 rounded-full border-2 border-gray-600 bg-[#111]"></div>
                                                    <span className="text-[10px] font-mono text-gray-500">v2.0</span>
                                                </div>
                                                <div className="flex items-center gap-3 relative z-10 opacity-40">
                                                    <div className="w-5 h-5 rounded-full border-2 border-gray-700 bg-[#111]"></div>
                                                    <span className="text-[10px] font-mono text-gray-600">v1.9</span>
                                                </div>
                                            </div>
                                            
                                            {/* Icon */}
                                            <div className="flex flex-col items-center justify-center text-green-500">
                                                <Database size={48} className="mb-2 opacity-80" />
                                                <span className="text-xs font-bold uppercase tracking-widest text-green-400">Mentve</span>
                                                <div className="mt-2 flex gap-1">
                                                    <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></span>
                                                    <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse delay-75"></span>
                                                    <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse delay-150"></span>
                                                </div>
                                            </div>
                                        </div>
                                   </div>
                               </div>
                           ) : (
                               /* Standard Image Rendering for other items - Kept padding p-4 */
                               <div className="bg-[#1D1D1F] rounded-3xl overflow-hidden h-64 w-full mb-5 shadow-lg border border-gray-700 group-hover:scale-[1.01] transition-transform duration-500 group-hover:border-green-500/30 p-4">
                                   <img 
                                    src={item.imageAfter} 
                                    alt="After" 
                                    referrerPolicy="no-referrer"
                                    className="w-full h-full object-contain" 
                                   />
                               </div>
                           )}
                           
                           <p className="text-white font-medium leading-relaxed bg-green-900/10 p-5 rounded-2xl border border-green-900/20">
                               {item.solution}
                           </p>
                       </div>

                   </div>
               </div>
           ))}
        </div>
      </div>
    </section>
  );
};

export default Evolution;