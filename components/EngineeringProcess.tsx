import React from 'react';
import { Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const t = {
  hu: {
    title: 'Mérnöki Folyamat.',
    subtitle: 'Az ötlettől a megvalósításig. Így dolgoztunk csapatként.',
    milestones: [
      {
        title: 'Stratégia Elemzés',
        description: 'A csapat közösen elemezte a szabálykönyvet. Excel táblázatban súlyoztuk a küldetéseket pontszám és távolság alapján.',
        tag: 'Stratégia',
      },
      {
        title: 'Moduláris Alváz Tervezése',
        description: 'Döntés a "Box Robot" koncepció mellett a stabilitás miatt.',
        tag: 'Építés',
      },
      {
        title: 'Pybricks és Saját Modulok',
        description: 'Saját könyvtárakat és függvényeket fejlesztettünk a színérzékelés, a navigáció és minden extra funkció kezelésére a Pybricks környezetben.',
        tag: 'Programozás',
      },
      {
        title: 'Iterációs Ciklusok',
        description: 'Rengeteg apró finomítást végeztünk a precizitás és a pontosság érdekében. Minden futamot legalább 20-szor teszteltünk a maximális megbízhatóságért.',
        tag: 'Tesztelés',
      },
    ],
    teamTitle: 'Csapatmunka & Szerepkörök',
    teamDesc: 'Minden döntést közösen hoztunk meg. A programozók segítettek az építésben, hogy megértsék a mechanikát, az építők pedig tanultak pszeudokódot írni.',
  },
  en: {
    title: 'Engineering Process.',
    subtitle: 'From idea to implementation. How we worked as a team.',
    milestones: [
      {
        title: 'Strategy Analysis',
        description: 'The team jointly analyzed the rulebook. We weighted missions in an Excel spreadsheet based on score and distance.',
        tag: 'Strategy',
      },
      {
        title: 'Modular Chassis Design',
        description: 'Decided on the "Box Robot" concept for stability.',
        tag: 'Build',
      },
      {
        title: 'Pybricks and Custom Modules',
        description: 'We developed custom libraries and functions for color detection, navigation, and all extra features within the Pybricks environment.',
        tag: 'Programming',
      },
      {
        title: 'Iteration Cycles',
        description: 'We made countless small refinements for precision and accuracy. Every run was tested at least 20 times for maximum reliability.',
        tag: 'Testing',
      },
    ],
    teamTitle: 'Teamwork & Roles',
    teamDesc: 'Every decision was made together. Programmers helped with building to understand the mechanics, and builders learned to write pseudocode.',
  },
};

const EngineeringProcess: React.FC = () => {
  const { lang } = useLanguage();
  const c = t[lang];

  return (
    <section id="process" className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-4">
            {c.title}
          </h2>
          <p className="text-xl text-[#86868b] max-w-2xl mx-auto">
            {c.subtitle}
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-800 hidden md:block"></div>

          <div className="space-y-12 relative">
            {c.milestones.map((milestone, index) => (
              <div key={index} className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                <div className="flex-1 w-full md:w-1/2">
                  <div className={`bg-[#1D1D1F] p-8 rounded-[2rem] hover:shadow-lg transition-shadow duration-300 border border-gray-800 ${index % 2 === 0 ? 'text-left' : 'text-left md:text-right'}`}>
                    <span className="inline-block px-3 py-1 bg-[#2997FF]/10 rounded-full text-xs font-bold text-[#2997FF] shadow-sm mb-3 border border-[#2997FF]/20">
                      {milestone.tag}
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-2">{milestone.title}</h3>
                    <p className="text-[#86868b] leading-relaxed">{milestone.description}</p>
                  </div>
                </div>

                <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full bg-[#1D1D1F] border-4 border-[#2997FF] flex items-center justify-center shadow-md">
                  <span className="text-sm font-bold text-white">{index + 1}</span>
                </div>

                <div className="flex-1 hidden md:block w-1/2"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 flex justify-center">
          <div className="bg-[#1D1D1F] border border-gray-800 rounded-2xl p-6 shadow-sm flex items-center gap-6 max-w-2xl">
            <div className="bg-[#2997FF]/10 p-4 rounded-full">
              <Users className="text-[#2997FF]" size={32} />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">{c.teamTitle}</h4>
              <p className="text-sm text-[#86868b]">{c.teamDesc}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EngineeringProcess;
