import React from 'react';
import { Github, Download, Star, GitFork } from 'lucide-react';

const OpenSource: React.FC = () => {
  return (
    <section id="opensource" className="py-24 bg-[#050505] border-t border-gray-800">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="mb-8 inline-flex items-center justify-center w-16 h-16 rounded-full bg-white text-black shadow-lg transform hover:scale-110 transition-transform duration-300">
          <Github size={32} />
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Nyílt Forráskód.
        </h2>
        
        <p className="text-xl text-[#86868b] mb-10 leading-relaxed max-w-2xl mx-auto">
          Mert a tudás mindenkié. A teljes robotprogramunk, a MyBlock könyvtárunk és a dokumentációnk elérhető a GitHubon. Töltsd le, tanulj belőle, építsd tovább.
        </p>

        <div className="bg-[#1D1D1F] rounded-3xl p-8 shadow-sm border border-gray-800 hover:shadow-xl hover:shadow-blue-900/10 transition-all duration-300 max-w-2xl mx-auto text-left group">
           <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                 <div className="p-3 bg-[#2c2c2e] rounded-2xl group-hover:bg-[#333] transition-colors">
                    <Github className="text-white" size={28} />
                 </div>
                 <div>
                    <h3 className="font-bold text-white text-lg group-hover:text-[#2997FF] transition-colors">fabtonedu/BARCA---FLL-Unearthed</h3>
                    <p className="text-sm text-[#86868b]">Public Repository</p>
                 </div>
              </div>
              <a 
                href="https://github.com/fabtonedu/BARCA---FLL-Unearthed" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-full text-sm font-medium hover:bg-[#2997FF] hover:text-white transition-colors shadow-md hover:shadow-lg"
              >
                <Download size={16} />
                Megtekintés
              </a>
           </div>
           
           <p className="text-[#f5f5f7] mb-6 text-sm leading-relaxed font-medium">
             A teljes Python forráskód, beleértve a menü- és programválasztó modult, a színszenzor-kalibráló rutint, az akkumulátor-ellenőrző kódokat és a küldetés-specifikus szekvenciákat.
           </p>

           <div className="flex items-center gap-6 text-sm text-[#86868b] pt-4 border-t border-gray-700">
              <div className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded-full bg-[#3572A5]"></div>
                 <span className="font-medium">Python</span>
              </div>
              <div className="flex items-center gap-1.5 hover:text-white transition-colors cursor-default">
                 <Star size={16} />
                 <span className="font-medium">128</span>
              </div>
              <div className="flex items-center gap-1.5 hover:text-white transition-colors cursor-default">
                 <GitFork size={16} />
                 <span className="font-medium">42</span>
              </div>
              <div className="flex-1 text-right text-xs font-mono opacity-60">
                Latest commit: 2 days ago
              </div>
           </div>

           <a 
             href="https://github.com/fabtonedu/BARCA---FLL-Unearthed" 
             target="_blank" 
             rel="noopener noreferrer"
             className="mt-6 w-full flex sm:hidden items-center justify-center gap-2 px-4 py-3 bg-white text-black rounded-xl text-sm font-medium hover:bg-gray-200"
           >
             Megtekintés GitHub-on
           </a>
        </div>
      </div>
    </section>
  );
};

export default OpenSource;
