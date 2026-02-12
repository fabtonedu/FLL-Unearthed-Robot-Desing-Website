import React from 'react';
import { Timer, Trophy, Wrench, MapPin } from 'lucide-react';
import { Mission } from '../types';

const missions: Mission[] = [
  { id: 'M01', name: '3D Mozi', description: 'A 3D szemüveg eljuttatása a nézőtérre.', points: 20 },
  { id: 'M04', name: 'Mestermű', description: 'A műalkotás szállítása.', points: 30 },
  { id: 'M08', name: 'Kamera', description: 'Sínrendszer beállítása.', points: 25 },
  { id: 'M14', name: 'Közönség', description: 'Nézők szállítása.', points: 50 },
];

const FieldOverview: React.FC = () => {
  return (
    <section id="field" className="py-32 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-20 text-center md:text-left">
          <h2 className="text-4xl md:text-6xl font-semibold text-white mb-4">
            A Verseny Arénája.
          </h2>
          <p className="text-2xl text-[#86868b] font-medium">150 másodperc a győzelemért.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Map Area */}
          <div className="lg:col-span-2 space-y-6">
            <div className="relative group overflow-hidden rounded-3xl bg-[#1D1D1F] shadow-sm hover:shadow-md transition-all duration-500 border border-gray-800">
              <div className="absolute top-6 left-6 bg-black/80 backdrop-blur px-4 py-2 rounded-full z-10 shadow-sm border border-gray-700">
                <span className="flex items-center gap-2 text-white font-semibold text-sm">
                  <MapPin size={16} /> Pálya
                </span>
              </div>
              <img 
                src="https://picsum.photos/seed/fllmat/1200/800" 
                alt="FLL Masterpiece Field" 
                className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700 opacity-90 hover:opacity-100"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-[#1D1D1F] p-8 rounded-3xl shadow-sm border border-gray-800 flex flex-col items-center text-center">
                <Timer className="text-white mb-4 opacity-80" size={32} />
                <h3 className="text-3xl font-bold text-white mb-2">150 mp</h3>
                <p className="text-sm text-[#86868b] font-medium">Futamidő</p>
              </div>
              <div className="bg-[#1D1D1F] p-8 rounded-3xl shadow-sm border border-gray-800 flex flex-col items-center text-center">
                <Wrench className="text-white mb-4 opacity-80" size={32} />
                <h3 className="text-3xl font-bold text-white mb-2">Gyors</h3>
                <p className="text-sm text-[#86868b] font-medium">Átszerelés</p>
              </div>
              <div className="bg-[#1D1D1F] p-8 rounded-3xl shadow-sm border border-gray-800 flex flex-col items-center text-center">
                <Trophy className="text-white mb-4 opacity-80" size={32} />
                <h3 className="text-3xl font-bold text-white mb-2">500+</h3>
                <p className="text-sm text-[#86868b] font-medium">Célpont</p>
              </div>
            </div>
          </div>

          {/* Key Missions Sidebar */}
          <div className="bg-[#1D1D1F] rounded-3xl p-8 shadow-sm h-fit border border-gray-800">
            <h3 className="text-2xl font-semibold text-white mb-8">
              Kiemelt Küldetések
            </h3>
            
            <div className="space-y-6">
              {missions.map((mission) => (
                <div key={mission.id} className="pb-6 border-b border-gray-800 last:border-0 last:pb-0">
                  <div className="flex justify-between items-baseline mb-2">
                    <h4 className="font-semibold text-white text-lg">{mission.name}</h4>
                    <span className="text-sm font-bold text-[#2997FF]">{mission.points}p</span>
                  </div>
                  <p className="text-sm text-[#86868b] leading-relaxed">
                    {mission.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FieldOverview;