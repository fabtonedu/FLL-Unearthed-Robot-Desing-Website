import React from 'react';

const approachSections = [
  {
    title: "Robot tervezése",
    content: "A robot alacsony, stabil és könnyű alvázzal rendelkezik, amelyet közösen terveztünk a könnyű bővíthetőség érdekében. A hatékonyság növelésére egy második, „dummy” robotot is építettünk – a fő robottal teljesen megegyező másolatot –, így a programozás és a mechanikai fejlesztés párhuzamosan haladhatott."
  },
  {
    title: "Programozás",
    content: "Python nyelven programoztunk Pybricks használatával Spike Prime-on. A kód moduláris és jól kommentált, ami lehetővé teszi a gyors frissítéseket. A giroszkóppal segített fordulások és az önbeálló passzív kiegészítők megbízható futásokat biztosítottak."
  },
  {
    title: "Kiegészítők",
    content: "Minden eszközt kifejezetten az adott feladatra terveztünk. Aktív és passzív mechanizmusokat is alkalmaztunk, és mindegyiket több iteráción keresztül finomítottuk. A végleges terveket Studio 2.0-ban modelleztük, részletes építési útmutatókkal, hogy bármely csapattag újra tudja építeni őket."
  },
  {
    title: "Tesztelés és dokumentáció",
    content: "Minden futást legalább 20 alkalommal teszteltünk. Ha egy program háromnál többször hibázott, újraírtuk. Az eredményeket Excelben rögzítettük – nyomon követtük a pontszámokat, a futási időket, a hibákat és a kiegészítők cseréjéhez szükséges időket. Az adatokat grafikonok segítségével elemeztük, és mindent megosztottunk a weboldalunkon."
  },
  {
    title: "Újratervezés és fejlesztés",
    content: "A regionális forduló után az egész projektet elölről kezdtük – a stratégiától a dokumentációig. Ez a harmadik generációs robot mindazt tükrözi, amit tanultunk, és a valaha épített leginkább felkészült változatunk."
  },
  {
    title: "Csapatmunka és megosztás",
    content: "A teljes projektet – a robotot, a kódot, a kiegészítőket és az útmutatókat – nyílt forráskódúként tettük közzé GitHubon és a weboldalunkon. A feladatok kezelésére Trellót használtunk, hogy biztosítsuk a gördülékeny együttműködést. A szezon során minden csapattag új készségeket sajátított el, és ami a legfontosabb: megtanultunk egymástól tanulni."
  }
];

const DevelopmentApproach: React.FC = () => {
  return (
    <section className="py-32 bg-[#000000] border-t border-gray-900">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        
        {/* Header Content */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-8 leading-tight">
            Stratégiánk.
          </h2>
          
          <div className="text-xl text-[#F5F5F7] leading-relaxed mb-12 font-medium">
            <p className="mb-6">Robotfejlesztés – Team Fabton</p>
            <p>
              Ebben a szezonban a célunk nem csupán egy robot megépítése volt, hanem egy megbízható, hatékony és jól dokumentált rendszer létrehozása valódi csapatmunkával. A munka már azelőtt elkezdődött, hogy a játékmező megérkezett volna: minden csapattag kidolgozott egy egyéni stratégiát, amelyeket egy közös, logikus tervvé egyesítettünk. Emellett támogató anyagokat is készítettünk, például pályarajzokat, táblázatokat és egy projektidővonalat.
            </p>
          </div>
        </div>

        {/* Continuous Text Sections */}
        <div className="space-y-12">
            {approachSections.map((section, index) => (
                <div key={index} className="group">
                    <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3 group-hover:text-[#2997FF] transition-colors">
                        {section.title}
                    </h3>
                    <p className="text-[#86868b] text-lg leading-relaxed">
                        {section.content}
                    </p>
                </div>
            ))}
        </div>

      </div>
    </section>
  );
};

export default DevelopmentApproach;