import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const t = {
  hu: { subtitle: 'Mérnöki precizitás. Kreatív innováció.' },
  en: { subtitle: 'Engineering precision. Creative innovation.' },
};

const Hero: React.FC = () => {
  const { lang } = useLanguage();
  const c = t[lang];

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-start pt-40 pb-20 bg-black overflow-hidden">
      <div className="relative z-10 w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">

        {/* Text Section */}
        <div className="w-full max-w-5xl text-center animate-fade-in-up mb-4 relative z-20">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-6 leading-none bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
            FABTON ROBOT DESIGN
          </h1>

          <p className="text-xl md:text-2xl text-[#86868b] font-medium leading-relaxed max-w-2xl mx-auto">
            {c.subtitle}
          </p>
        </div>

        {/* Image Section */}
        <div className="relative w-full max-w-7xl flex justify-center items-center mt-[-20px] sm:mt-[-40px]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] bg-[#2997FF]/15 blur-[100px] rounded-full -z-10 pointer-events-none"></div>

          <img
            src="https://i.postimg.cc/YqPs6NGy/Robot.png"
            alt="Robot Close Up"
            className="w-full h-auto object-contain max-h-[70vh] drop-shadow-2xl relative z-10 transform hover:scale-[1.01] transition-transform duration-1000 ease-out"
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;
