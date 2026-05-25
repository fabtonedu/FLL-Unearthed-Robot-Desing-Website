import React, { useMemo, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

type ModeKey = 'ovatos' | 'normal' | 'gyors';
type SideKey = 'bal' | 'jobb';

const t = {
  hu: {
    title: 'PID Kontroll, Érthetően.',
    subtitle: 'Ugyanaz az elv, amit az autó tempomatja is használ: méri az eltérést, korrigál, majd finomít. Versenypályán ez tartja egyenesen a robotot.',
    explainBadge: 'Mi Ez Laikusként?',
    explainTitle: 'Mit csinál a P, I és D?',
    explainDesc: 'Képzeld el, hogy a robot egy vonalon szeretne maradni. Ha letér, visszaterel magát. A PID három kis "segítő" együttműködése, ami ettől okosabbá teszi a kormányzást.',
    p: { label: 'P - Gyors Segítség', desc: 'Ha nagy az eltérés, azonnal erősebben visszafordít.' },
    i: { label: 'I - Emlékező Segítség', desc: '"Emlékszik" a régi hibára, és lassan pluszban segít.' },
    d: { label: 'D - Fék Segítség', desc: 'Lassítja a túl gyors mozdulatokat, hogy ne cikázzon.' },
    calRangeLabel: 'Kalibrációs tartomány példa',
    usageLabel: 'Használat',
    usageDesc: 'Itt csak 3 csúszka van: mennyire tért le a robot, milyen gyorsan reagáljon, és mennyire legyen óvatos. Minden más számítást a háttérben automatikusan elvégzünk.',
    simTitle: 'Mini szimuláció',
    deviationLabel: 'Eltérés',
    correctionLabel: 'Javítás ereje',
    nextDeviationLabel: 'Következő körben marad ennyi eltérés',
    deviationSliderLabel: 'Mennyire tért le a robot?',
    sideLabel: 'Melyik oldalra tért le?',
    leftBtn: 'Balra',
    rightBtn: 'Jobbra',
    speedLabel: 'Milyen gyorsan javítson?',
    resultLabel: 'Mit látunk most?',
    directionLabel: 'Irány',
    correctionResultLabel: 'Javítás',
    modes: {
      ovatos: { label: 'Óvatos', text: 'Lassan, finoman javít.' },
      normal: { label: 'Normál', text: 'Egyensúlyban tartja a robotot.' },
      gyors: { label: 'Gyors', text: 'Gyorsan reagál, erős javítással.' },
    },
    directionText: (side: SideKey) => side === 'jobb' ? 'Jobbra tért le -> balra kormányoz.' : 'Balra tért le -> jobbra kormányoz.',
    deviationLevels: ['Kicsi eltérés', 'Közepes eltérés', 'Nagy eltérés'],
    correctionLevels: ['Finom javítás', 'Közepes javítás', 'Erős javítás'],
    interactiveTitle: 'Interaktív HSV keverő',
    hueLabel: 'Hue (árnyalat)',
    satLabel: 'Saturation (telítettség)',
    valLabel: 'Value (fényesség)',
  },
  en: {
    title: 'PID Control, Explained.',
    subtitle: 'The same principle used by a car\'s cruise control: measure the deviation, correct, then fine-tune. On the competition field this keeps the robot driving straight.',
    explainBadge: 'Plain English Explanation',
    explainTitle: 'What do P, I, and D do?',
    explainDesc: 'Imagine the robot wants to stay on a line. If it drifts off, it steers itself back. PID is the cooperation of three small "helpers" that makes steering smarter.',
    p: { label: 'P - Quick Helper', desc: 'If the deviation is large, it turns back more strongly right away.' },
    i: { label: 'I - Memory Helper', desc: '"Remembers" past errors and slowly adds extra correction.' },
    d: { label: 'D - Brake Helper', desc: 'Slows down overly fast movements so the robot doesn\'t zigzag.' },
    calRangeLabel: 'Calibration range example',
    usageLabel: 'Usage',
    usageDesc: 'There are only 3 sliders: how far the robot drifted, how fast it should respond, and how cautious it should be. All other calculations are done automatically in the background.',
    simTitle: 'Mini simulation',
    deviationLabel: 'Deviation',
    correctionLabel: 'Correction power',
    nextDeviationLabel: 'Remaining deviation next cycle',
    deviationSliderLabel: 'How far did the robot drift?',
    sideLabel: 'Which side did it drift to?',
    leftBtn: 'Left',
    rightBtn: 'Right',
    speedLabel: 'How fast should it correct?',
    resultLabel: 'What are we seeing?',
    directionLabel: 'Direction',
    correctionResultLabel: 'Correction',
    modes: {
      ovatos: { label: 'Careful', text: 'Corrects slowly and gently.' },
      normal: { label: 'Normal', text: 'Keeps the robot balanced.' },
      gyors: { label: 'Fast', text: 'Reacts quickly with strong correction.' },
    },
    directionText: (side: SideKey) => side === 'jobb' ? 'Drifted right -> steering left.' : 'Drifted left -> steering right.',
    deviationLevels: ['Small deviation', 'Medium deviation', 'Large deviation'],
    correctionLevels: ['Gentle correction', 'Medium correction', 'Strong correction'],
    interactiveTitle: 'Interactive HSV mixer',
    hueLabel: 'Hue',
    satLabel: 'Saturation',
    valLabel: 'Value (brightness)',
  },
};

const PIDControlSection: React.FC = () => {
  const { lang } = useLanguage();
  const c = t[lang];

  const [deviation, setDeviation] = useState(55);
  const [side, setSide] = useState<SideKey>('jobb');
  const [mode, setMode] = useState<ModeKey>('normal');

  const { correction, nextDeviation, directionText, deviationText, correctionText } = useMemo(() => {
    const modeFactors: Record<ModeKey, number> = { ovatos: 0.65, normal: 1, gyors: 1.35 };
    const factor = modeFactors[mode];
    const correctionPower = clamp(Math.round(deviation * factor), 0, 100);
    const predictedDeviation = clamp(Math.round(deviation - correctionPower * 0.45), 0, 100);
    const direction = c.directionText(side);

    let deviationLevel = c.deviationLevels[0];
    if (deviation > 32) deviationLevel = c.deviationLevels[1];
    if (deviation > 66) deviationLevel = c.deviationLevels[2];

    let correctionLevel = c.correctionLevels[0];
    if (correctionPower > 40) correctionLevel = c.correctionLevels[1];
    if (correctionPower > 75) correctionLevel = c.correctionLevels[2];

    return {
      correction: correctionPower,
      nextDeviation: predictedDeviation,
      directionText: direction,
      deviationText: deviationLevel,
      correctionText: correctionLevel,
    };
  }, [deviation, mode, side, c]);

  return (
    <section id="pid" className="py-28 bg-[#050505] text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-semibold mb-5">{c.title}</h2>
          <p className="text-xl text-gray-400 max-w-3xl">{c.subtitle}</p>
        </div>

        <article className="rounded-3xl border border-[#2997FF]/30 bg-gradient-to-br from-[#10131a] via-[#101012] to-[#141414] overflow-hidden shadow-[0_18px_70px_rgba(41,151,255,0.12)]">
          <div className="grid grid-cols-1 xl:grid-cols-2">
            <div className="p-7 md:p-9 border-b xl:border-b-0 xl:border-r border-gray-800">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#2997FF]/15 text-[#7cc0ff] text-xs font-semibold tracking-[0.12em] uppercase mb-4">
                {c.explainBadge}
              </span>
              <h3 className="text-2xl md:text-3xl font-semibold mb-4">{c.explainTitle}</h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">{c.explainDesc}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                <div className="rounded-xl border border-gray-700/80 bg-black/35 p-4">
                  <p className="text-xs font-semibold text-[#79b8ff] mb-1">{c.p.label}</p>
                  <p className="text-sm text-gray-300">{c.p.desc}</p>
                </div>
                <div className="rounded-xl border border-gray-700/80 bg-black/35 p-4">
                  <p className="text-xs font-semibold text-[#9de59d] mb-1">{c.i.label}</p>
                  <p className="text-sm text-gray-300">{c.i.desc}</p>
                </div>
                <div className="rounded-xl border border-gray-700/80 bg-black/35 p-4">
                  <p className="text-xs font-semibold text-[#ffc56b] mb-1">{c.d.label}</p>
                  <p className="text-sm text-gray-300">{c.d.desc}</p>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-700/80 bg-black/40 p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-gray-400 mb-2">{c.usageLabel}</p>
                <p className="text-xs text-gray-400 mb-2">{c.usageDesc}</p>
                <p className="text-sm text-white mb-1">{directionText}</p>
                <p className="text-sm text-gray-300">{c.modes[mode].text}</p>
              </div>
            </div>

            <div className="p-7 md:p-9 bg-[#0d0e10]">
              <div className="mb-5">
                <p className="text-sm font-medium text-gray-300 mb-3">{c.simTitle}</p>
                <div className="rounded-2xl border border-gray-700/80 bg-black/45 p-4">
                  <p className="text-xs text-gray-400 mb-2">{c.deviationLabel}</p>
                  <div className="h-3 rounded-full bg-[#1b1d22] overflow-hidden mb-4">
                    <div className="h-full bg-gradient-to-r from-[#2997FF] to-[#5ac8fa]" style={{ width: `${deviation}%` }} />
                  </div>
                  <p className="text-xs text-gray-400 mb-2">{c.correctionLabel}</p>
                  <div className="h-3 rounded-full bg-[#1b1d22] overflow-hidden mb-4">
                    <div className="h-full bg-gradient-to-r from-[#34c759] to-[#86f1a7]" style={{ width: `${correction}%` }} />
                  </div>
                  <p className="text-xs text-gray-400 mb-2">{c.nextDeviationLabel}</p>
                  <div className="h-3 rounded-full bg-[#1b1d22] overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#ff9f0a] to-[#ffd60a]" style={{ width: `${nextDeviation}%` }} />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-gray-300">{c.deviationSliderLabel}</span>
                    <span className="text-[#7cc0ff] font-semibold">{deviationText}</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={deviation}
                    onChange={(event) => setDeviation(Number(event.target.value))}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-[#2a2a2e]"
                  />
                </div>

                <div>
                  <p className="text-xs text-gray-300 mb-2">{c.sideLabel}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {(['bal', 'jobb'] as SideKey[]).map((s) => (
                      <button
                        key={s}
                        type="button"
                        className={`rounded-lg border px-3 py-2 text-sm transition-colors ${
                          side === s
                            ? 'border-[#2997FF] bg-[#2997FF]/20 text-white'
                            : 'border-gray-700 bg-[#15161a] text-gray-300 hover:border-[#2997FF]/60'
                        }`}
                        onClick={() => setSide(s)}
                      >
                        {s === 'bal' ? c.leftBtn : c.rightBtn}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs text-gray-300 mb-2">{c.speedLabel}</p>
                  <div className="grid grid-cols-3 gap-2">
                    {(['ovatos', 'normal', 'gyors'] as ModeKey[]).map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setMode(item)}
                        className={`rounded-lg border px-3 py-2 text-xs transition-colors ${
                          mode === item
                            ? 'border-[#2997FF] bg-[#2997FF]/20 text-white'
                            : 'border-gray-700 bg-[#15161a] text-gray-300 hover:border-[#2997FF]/60'
                        }`}
                      >
                        {c.modes[item].label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-gray-700/80 bg-black/50 p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-gray-400 mb-3">{c.resultLabel}</p>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-lg border border-gray-800 bg-[#15161a] px-3 py-2">
                    <p className="text-gray-400 mb-1">{c.directionLabel}</p>
                    <p className="text-white font-semibold">{directionText}</p>
                  </div>
                  <div className="rounded-lg border border-gray-800 bg-[#15161a] px-3 py-2">
                    <p className="text-gray-400 mb-1">{c.correctionResultLabel}</p>
                    <p className="text-white font-semibold">{correctionText}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default PIDControlSection;
