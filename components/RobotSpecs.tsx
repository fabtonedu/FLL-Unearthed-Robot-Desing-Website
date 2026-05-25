import React from 'react';
import { Cpu, Zap, Move, Layers } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const t = {
  hu: {
    title: 'A ROBOTUNK',
    subtitle: 'Újradefiniált teljesítmény.',
    controller: { title: 'SPIKE Prime Hub', desc: 'A robot agya. Python alapú precíz vezérlés.' },
    quicklock: { badge: 'Innováció', title: 'Quick-Lock Rendszer', desc: 'Passzív modulcsere', time: '2 másodperc', suffix: ' alatt.' },
    motors: { title: 'Erőátvitel', desc: '2x Medium Hajtómotor\n2x Medium Eszközmotor' },
    sensors: { title: 'Szenzorok', desc: 'Giroszkóp forduláshoz\nSzínszenzor programválasztáshoz\nNyomásérzékelő indításhoz' },
  },
  en: {
    title: 'OUR ROBOT',
    subtitle: 'Redefined performance.',
    controller: { title: 'SPIKE Prime Hub', desc: 'The robot\'s brain. Precise Python-based control.' },
    quicklock: { badge: 'Innovation', title: 'Quick-Lock System', desc: 'Passive module swap in', time: '2 seconds', suffix: '.' },
    motors: { title: 'Drive Train', desc: '2x Medium Drive Motor\n2x Medium Tool Motor' },
    sensors: { title: 'Sensors', desc: 'Gyroscope for turning\nColor sensor for program selection\nForce sensor for start trigger' },
  },
};

const RobotSpecs: React.FC = () => {
  const { lang } = useLanguage();
  const c = t[lang];

  return (
    <section id="robot" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-semibold text-white mb-6 tracking-tight uppercase">
            {c.title}
          </h2>
          <p className="text-xl md:text-2xl text-[#86868b] max-w-2xl mx-auto font-medium">
            {c.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

          <div className="bg-[#1D1D1F] rounded-2xl p-6 flex flex-col justify-center items-center text-center hover:bg-[#2c2c2e] transition-colors border border-gray-800 min-h-[200px]">
            <Cpu size={32} className="text-white mb-4 opacity-80" />
            <h3 className="text-lg font-semibold text-white mb-2">{c.controller.title}</h3>
            <p className="text-sm text-[#86868b] leading-relaxed">{c.controller.desc}</p>
          </div>

          <div className="bg-[#1D1D1F] rounded-2xl p-6 flex flex-col justify-center items-center text-center hover:bg-[#2c2c2e] transition-colors border border-gray-800 min-h-[200px]">
            <div className="flex items-center gap-1.5 mb-3">
              <Layers size={16} className="text-[#2997FF]" />
              <span className="text-[10px] font-bold text-[#2997FF] uppercase tracking-wider">{c.quicklock.badge}</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{c.quicklock.title}</h3>
            <p className="text-[#86868b] text-sm leading-relaxed">
              {c.quicklock.desc} <span className="text-white font-bold">{c.quicklock.time}</span>{c.quicklock.suffix}
            </p>
          </div>

          <div className="bg-[#1D1D1F] rounded-2xl p-6 flex flex-col justify-center items-center text-center hover:bg-[#2c2c2e] transition-colors border border-gray-800 min-h-[200px]">
            <Zap size={32} className="text-white mb-4 opacity-80" />
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">{c.motors.title}</h3>
              <p className="text-sm text-[#86868b] leading-relaxed">
                {c.motors.desc.split('\n').map((line, i) => (
                  <React.Fragment key={i}>{line}{i === 0 && <br />}</React.Fragment>
                ))}
              </p>
            </div>
          </div>

          <div className="bg-[#1D1D1F] rounded-2xl p-6 flex flex-col justify-center items-center text-center hover:bg-[#2c2c2e] transition-colors border border-gray-800 min-h-[200px]">
            <Move size={32} className="text-white mb-4 opacity-80" />
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">{c.sensors.title}</h3>
              <p className="text-sm text-[#86868b] leading-relaxed">
                {c.sensors.desc.split('\n').map((line, i, arr) => (
                  <React.Fragment key={i}>{line}{i < arr.length - 1 && <br />}</React.Fragment>
                ))}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default RobotSpecs;
