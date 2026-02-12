import React from 'react';

const CodeDeepDive: React.FC = () => {
  return (
    <section id="code" className="py-32 bg-[#000000] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold mb-6">
            Kód a Gép Mögött.
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl">
            Nem csak "megy". Gondolkodik, érzékel és korrigál. A szoftverünk struktúrája és logikája.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-[#1D1D1F] rounded-3xl p-1 border border-gray-800 hover:border-[#2997FF] transition-colors duration-300">
           {/* Window Header */}
           <div className="bg-[#111111] px-6 py-4 rounded-t-[1.3rem] flex items-center justify-between">
              <div className="flex gap-2">
                 <div className="w-3 h-3 rounded-full bg-red-500"></div>
                 <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                 <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-xs font-mono text-gray-400">main.py</span>
           </div>
           
           {/* Content */}
           <div className="p-8">
              <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-[#2997FF]/20 text-[#2997FF] text-xs font-bold rounded-md">
                    Színérzékelés
                  </span>
                  <span className="px-3 py-1 bg-[#2997FF]/20 text-[#2997FF] text-xs font-bold rounded-md">
                    Hub Kijelző
                  </span>
                  <span className="px-3 py-1 bg-[#2997FF]/20 text-[#2997FF] text-xs font-bold rounded-md">
                    Konfiguráció
                  </span>
              </div>
              
              <p className="text-gray-300 mb-8 text-sm md:text-base leading-relaxed">
                Ez a szoftver egy eseményvezérelt robotirányító keretrendszer, amely színkód-alapú szelekciót alkalmaz a küldetések indítására. A rendszer valós időben monitorozza a színérzékelő adatait: sikeres azonosítás esetén a Hub vizuális és akusztikus visszajelzést generál, majd automatikusan inicializálja a releváns szubrutint. A hardverkomponensek (motorok, szenzorok) kezelése elkülönített konfigurációs modulokban történik, biztosítva a kód modularitását és skálázhatóságát. A rendszert kifejezetten versenykörnyezetre optimalizáltuk, garantálva a robusztus működést és a feladatok precíz végrehajtását.
              </p>

              <div className="bg-black rounded-xl overflow-hidden shadow-inner border border-gray-800">
                <img 
                  src="https://i.postimg.cc/Fsw2b79q/1000009550.jpg" 
                  alt="Robot Vezérlő Kód" 
                  className="w-full h-auto object-contain"
                />
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default CodeDeepDive;