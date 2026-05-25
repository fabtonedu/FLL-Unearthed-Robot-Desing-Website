import React from 'react';
import { Download } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const t = {
  hu: {
    title: 'Építési Útmutatók',
    subtitle: 'Az összes robotmodellünk, kiegészítőnk és a részletes építési útmutatók elérhetők a GitHub-tárhelyünkön. Akár a terveinket szeretnéd lemásolni, akár a megközelítésünkből tanulnál, vagy továbbfejlesztenéd a munkánkat, minden szükséges dokumentáció szabadon hozzáférhető.',
    block1Title: '3D modellek és útmutatók',
    block1Desc: 'A robot alvázához és az összes kiegészítőhöz tartozó teljes LEGO Studio 2.0 fájlok, lépésről lépésre felépített építési útmutatókkal, amelyek egyszerűvé teszik az újbóli megépítést.',
    block2Title: 'Dokumentáció és kód',
    block2Desc: 'Python programok, konfigurációs fájlok, valamint átfogó dokumentáció, amely lefedi a fejlesztési folyamatunkat, a tesztelési módszertant és a levont tanulságokat.',
    btnLabel: 'Építési Útmutatók Elérése',
  },
  en: {
    title: 'Building Instructions',
    subtitle: 'All our robot models, attachments, and detailed building instructions are available on our GitHub repository. Whether you want to replicate our designs, learn from our approach, or build on our work, all the necessary documentation is freely accessible.',
    block1Title: '3D Models and Instructions',
    block1Desc: 'Complete LEGO Studio 2.0 files for the robot chassis and all attachments, with step-by-step building instructions that make reconstruction straightforward.',
    block2Title: 'Documentation and Code',
    block2Desc: 'Python programs, configuration files, and comprehensive documentation covering our development process, testing methodology, and lessons learned.',
    btnLabel: 'Access Building Instructions',
  },
};

const Instructions: React.FC = () => {
  const { lang } = useLanguage();
  const c = t[lang];

  return (
    <section className="py-32 bg-[#000000] border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6">
            {c.title}
          </h2>
          <p className="text-xl text-[#86868b] leading-relaxed font-medium">
            {c.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 max-w-5xl mx-auto mb-16">

          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-[#D4509F] mb-4">{c.block1Title}</h3>
            <p className="text-[#86868b] text-lg leading-relaxed">{c.block1Desc}</p>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-[#D4509F] mb-4">{c.block2Title}</h3>
            <p className="text-[#86868b] text-lg leading-relaxed">{c.block2Desc}</p>
          </div>

        </div>

        <div className="max-w-2xl mx-auto bg-[#1D1D1F] rounded-[2rem] p-8 md:p-12 shadow-2xl border border-gray-800 relative overflow-hidden group text-center">

          <div className="mb-8 mt-4 flex justify-center relative z-10">
            <img
              src="https://i.postimg.cc/RZLm0n8g/Whats-App-Image-2026-02-12-at-9-25-09-PM.jpg"
              alt="Robot Mechanism"
              className="w-full max-w-sm object-contain h-64 opacity-90 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"
            />
          </div>

          <div className="space-y-8 relative z-10">
            <button className="inline-flex items-center gap-3 bg-[#0F3D5E] hover:bg-[#2997FF] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-[#2997FF]/25 hover:scale-[1.02] border border-[#2997FF]/30">
              <Download size={20} />
              <span>{c.btnLabel}</span>
            </button>
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-900/10 blur-[100px] rounded-full pointer-events-none"></div>

        </div>

      </div>
    </section>
  );
};

export default Instructions;
