import React from 'react';
import { Box, FileText, ArrowRight, Download } from 'lucide-react';

const Instructions: React.FC = () => {
  return (
    <section className="py-32 bg-[#000000] border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header Content - Centered */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6">
            Építési Útmutatók
          </h2>
          <p className="text-xl text-[#86868b] leading-relaxed font-medium">
            Az összes robotmodellünk, kiegészítőnk és a részletes építési útmutatók elérhetők a GitHub-tárhelyünkön. Akár a terveinket szeretnéd lemásolni, akár a megközelítésünkből tanulnál, vagy továbbfejlesztenéd a munkánkat, minden szükséges dokumentáció szabadon hozzáférhető.
          </p>
        </div>

        {/* Two Text Columns - No Card Background */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 max-w-5xl mx-auto mb-16">
            
            {/* Block 1: 3D Models */}
            <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-[#D4509F] mb-4">3D modellek és útmutatók</h3>
                <p className="text-[#86868b] text-lg leading-relaxed">
                    A robot alvázához és az összes kiegészítőhöz tartozó teljes LEGO Studio 2.0 fájlok, lépésről lépésre felépített építési útmutatókkal, amelyek egyszerűvé teszik az újbóli megépítést.
                </p>
            </div>

            {/* Block 2: Documentation */}
            <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-[#D4509F] mb-4">Dokumentáció és kód</h3>
                <p className="text-[#86868b] text-lg leading-relaxed">
                    Python programok, konfigurációs fájlok, valamint átfogó dokumentáció, amely lefedi a fejlesztési folyamatunkat, a tesztelési módszertant és a levont tanulságokat.
                </p>
            </div>

        </div>

        {/* Central Feature Card */}
        <div className="max-w-2xl mx-auto bg-[#1D1D1F] rounded-[2rem] p-8 md:p-12 shadow-2xl border border-gray-800 relative overflow-hidden group text-center">
            
            {/* Image Area */}
            <div className="mb-8 mt-4 flex justify-center relative z-10">
                {/* Using a technic-like image placeholder that looks like a mechanism */}
                <img 
                    src="https://i.postimg.cc/RZLm0n8g/Whats-App-Image-2026-02-12-at-9-25-09-PM.jpg" 
                    alt="Robot Mechanism" 
                    className="w-full max-w-sm object-contain h-64 opacity-90 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"
                />
            </div>

            {/* Bottom Content */}
            <div className="space-y-8 relative z-10">
                <button className="inline-flex items-center gap-3 bg-[#0F3D5E] hover:bg-[#2997FF] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-[#2997FF]/25 hover:scale-[1.02] border border-[#2997FF]/30">
                    <Download size={20} />
                    <span>Építési Útmutatók Elérése</span>
                </button>
            </div>
            
            {/* Background Glow Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-900/10 blur-[100px] rounded-full pointer-events-none"></div>

        </div>

      </div>
    </section>
  );
};

export default Instructions;