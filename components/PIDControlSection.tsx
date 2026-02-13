import React, { useMemo, useState } from 'react';

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

type Mode = 'ovatos' | 'normal' | 'gyors';

const modeConfig: Record<Mode, { label: string; factor: number; text: string }> = {
  ovatos: {
    label: 'Óvatos',
    factor: 0.65,
    text: 'Lassan, finoman javít.',
  },
  normal: {
    label: 'Normál',
    factor: 1,
    text: 'Egyensúlyban tartja a robotot.',
  },
  gyors: {
    label: 'Gyors',
    factor: 1.35,
    text: 'Gyorsan reagál, erős javítással.',
  },
};

const PIDControlSection: React.FC = () => {
  const [deviation, setDeviation] = useState(55);
  const [side, setSide] = useState<'bal' | 'jobb'>('jobb');
  const [mode, setMode] = useState<Mode>('normal');

  const { correction, nextDeviation, directionText, deviationText, correctionText } = useMemo(() => {
    const factor = modeConfig[mode].factor;
    const correctionPower = clamp(Math.round(deviation * factor), 0, 100);
    const predictedDeviation = clamp(Math.round(deviation - correctionPower * 0.45), 0, 100);
    const direction = side === 'jobb' ? 'Jobbra tért le -> balra kormányoz.' : 'Balra tért le -> jobbra kormányoz.';

    let deviationLevel = 'Kicsi eltérés';
    if (deviation > 32) deviationLevel = 'Közepes eltérés';
    if (deviation > 66) deviationLevel = 'Nagy eltérés';

    let correctionLevel = 'Finom javítás';
    if (correctionPower > 40) correctionLevel = 'Közepes javítás';
    if (correctionPower > 75) correctionLevel = 'Erős javítás';

    return {
      correction: correctionPower,
      nextDeviation: predictedDeviation,
      directionText: direction,
      deviationText: deviationLevel,
      correctionText: correctionLevel,
    };
  }, [deviation, mode, side]);

  return (
    <section id="pid" className="py-28 bg-[#050505] text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-semibold mb-5">PID Kontroll, Érthetően.</h2>
          <p className="text-xl text-gray-400 max-w-3xl">
            Ugyanaz az elv, amit az autó tempomatja is használ: méri az eltérést, korrigál, majd finomít.
            Versenypályán ez tartja egyenesen a robotot.
          </p>
        </div>

        <article className="rounded-3xl border border-[#2997FF]/30 bg-gradient-to-br from-[#10131a] via-[#101012] to-[#141414] overflow-hidden shadow-[0_18px_70px_rgba(41,151,255,0.12)]">
          <div className="grid grid-cols-1 xl:grid-cols-2">
            <div className="p-7 md:p-9 border-b xl:border-b-0 xl:border-r border-gray-800">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#2997FF]/15 text-[#7cc0ff] text-xs font-semibold tracking-[0.12em] uppercase mb-4">
                Mi Ez Laikusként?
              </span>
              <h3 className="text-2xl md:text-3xl font-semibold mb-4">Mit csinál a P, I és D?</h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">
                Képzeld el, hogy a robot egy vonalon szeretne maradni. Ha letér, visszaterel magát. A PID három
                kis "segítő" együttműködése, ami ettől okosabbá teszi a kormányzást.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                <div className="rounded-xl border border-gray-700/80 bg-black/35 p-4">
                  <p className="text-xs font-semibold text-[#79b8ff] mb-1">P - Gyors Segítség</p>
                  <p className="text-sm text-gray-300">Ha nagy az eltérés, azonnal erősebben visszafordít.</p>
                </div>
                <div className="rounded-xl border border-gray-700/80 bg-black/35 p-4">
                  <p className="text-xs font-semibold text-[#9de59d] mb-1">I - Emlékező Segítség</p>
                  <p className="text-sm text-gray-300">"Emlékszik" a régi hibára, és lassan pluszban segít.</p>
                </div>
                <div className="rounded-xl border border-gray-700/80 bg-black/35 p-4">
                  <p className="text-xs font-semibold text-[#ffc56b] mb-1">D - Fék Segítség</p>
                  <p className="text-sm text-gray-300">Lassítja a túl gyors mozdulatokat, hogy ne cikázzon.</p>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-700/80 bg-black/40 p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-gray-400 mb-2">Használat</p>
                <p className="text-xs text-gray-400 mb-2">
                  Itt csak 3 csúszka van: mennyire tért le a robot, milyen gyorsan reagáljon, és mennyire legyen
                  óvatos. Minden más számítást a háttérben automatikusan elvégzünk.
                </p>
                <p className="text-sm text-white mb-1">{directionText}</p>
                <p className="text-sm text-gray-300">{modeConfig[mode].text}</p>
              </div>
            </div>

            <div className="p-7 md:p-9 bg-[#0d0e10]">
              <div className="mb-5">
                <p className="text-sm font-medium text-gray-300 mb-3">Mini szimuláció</p>
                <div className="rounded-2xl border border-gray-700/80 bg-black/45 p-4">
                  <p className="text-xs text-gray-400 mb-2">Eltérés</p>
                  <div className="h-3 rounded-full bg-[#1b1d22] overflow-hidden mb-4">
                    <div
                      className="h-full bg-gradient-to-r from-[#2997FF] to-[#5ac8fa]"
                      style={{ width: `${deviation}%` }}
                    />
                  </div>

                  <p className="text-xs text-gray-400 mb-2">Javítás ereje</p>
                  <div className="h-3 rounded-full bg-[#1b1d22] overflow-hidden mb-4">
                    <div
                      className="h-full bg-gradient-to-r from-[#34c759] to-[#86f1a7]"
                      style={{ width: `${correction}%` }}
                    />
                  </div>

                  <p className="text-xs text-gray-400 mb-2">Következő körben marad ennyi eltérés</p>
                  <div className="h-3 rounded-full bg-[#1b1d22] overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#ff9f0a] to-[#ffd60a]"
                      style={{ width: `${nextDeviation}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-gray-300">Mennyire tért le a robot?</span>
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
                  <p className="text-xs text-gray-300 mb-2">Melyik oldalra tért le?</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      className={`rounded-lg border px-3 py-2 text-sm transition-colors ${
                        side === 'bal'
                          ? 'border-[#2997FF] bg-[#2997FF]/20 text-white'
                          : 'border-gray-700 bg-[#15161a] text-gray-300 hover:border-[#2997FF]/60'
                      }`}
                      onClick={() => setSide('bal')}
                    >
                      Balra
                    </button>
                    <button
                      type="button"
                      className={`rounded-lg border px-3 py-2 text-sm transition-colors ${
                        side === 'jobb'
                          ? 'border-[#2997FF] bg-[#2997FF]/20 text-white'
                          : 'border-gray-700 bg-[#15161a] text-gray-300 hover:border-[#2997FF]/60'
                      }`}
                      onClick={() => setSide('jobb')}
                    >
                      Jobbra
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-gray-300 mb-2">Milyen gyorsan javítson?</p>
                  <div className="grid grid-cols-3 gap-2">
                    {(['ovatos', 'normal', 'gyors'] as Mode[]).map((item) => (
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
                        {modeConfig[item].label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-gray-700/80 bg-black/50 p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-gray-400 mb-3">Mit látunk most?</p>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-lg border border-gray-800 bg-[#15161a] px-3 py-2">
                    <p className="text-gray-400 mb-1">Irány</p>
                    <p className="text-white font-semibold">{directionText}</p>
                  </div>
                  <div className="rounded-lg border border-gray-800 bg-[#15161a] px-3 py-2">
                    <p className="text-gray-400 mb-1">Javítás</p>
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
