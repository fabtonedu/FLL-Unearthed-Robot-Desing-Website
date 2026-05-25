import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const t = {
  hu: {
    title: 'Stratégiánk.',
    teamSubtitle: 'Robotfejlesztés – Team Fabton',
    intro: 'Ebben a szezonban a célunk nem csupán egy robot megépítése volt, hanem egy megbízható, hatékony és jól dokumentált rendszer létrehozása valódi csapatmunkával. A munka már azelőtt elkezdődött, hogy a játékmező megérkezett volna: minden csapattag kidolgozott egy egyéni stratégiát, amelyeket egy közös, logikus tervvé egyesítettünk. Emellett támogató anyagokat is készítettünk, például pályarajzokat, táblázatokat és egy projektidővonalat.',
    sections: [
      {
        title: 'Robot tervezése',
        content: 'A robot alacsony, stabil és könnyű alvázzal rendelkezik, amelyet közösen terveztünk a könnyű bővíthetőség érdekében. A hatékonyság növelésére egy második, „dummy" robotot is építettünk – a fő robottal teljesen megegyező másolatot –, így a programozás és a mechanikai fejlesztés párhuzamosan haladhatott.',
      },
      {
        title: 'Programozás',
        content: 'Python nyelven programoztunk Pybricks használatával Spike Prime-on. A kód moduláris és jól kommentált, ami lehetővé teszi a gyors frissítéseket. A giroszkóppal segített fordulások és az önbeálló passzív kiegészítők megbízható futásokat biztosítottak.',
      },
      {
        title: 'Kiegészítők',
        content: 'Minden eszközt kifejezetten az adott feladatra terveztünk. Aktív és passzív mechanizmusokat is alkalmaztunk, és mindegyiket több iteráción keresztül finomítottuk. A végleges terveket Studio 2.0-ban modelleztük, részletes építési útmutatókkal, hogy bármely csapattag újra tudja építeni őket.',
      },
      {
        title: 'Tesztelés és dokumentáció',
        content: 'Minden futást legalább 20 alkalommal teszteltünk. Ha egy program háromnál többször hibázott, újraírtuk. Az eredményeket Excelben rögzítettük – nyomon követtük a pontszámokat, a futási időket, a hibákat és a kiegészítők cseréjéhez szükséges időket. Az adatokat grafikonok segítségével elemeztük, és mindent megosztottunk a weboldalunkon.',
      },
      {
        title: 'Újratervezés és fejlesztés',
        content: 'A regionális forduló után az egész projektet elölről kezdtük – a stratégiától a dokumentációig. Ez a harmadik generációs robot mindazt tükrözi, amit tanultunk, és a valaha épített leginkább felkészült változatunk.',
      },
      {
        title: 'Csapatmunka és megosztás',
        content: 'A teljes projektet – a robotot, a kódot, a kiegészítőket és az útmutatókat – nyílt forráskódúként tettük közzé GitHubon és a weboldalunkon. A feladatok kezelésére Trellót használtunk, hogy biztosítsuk a gördülékeny együttműködést. A szezon során minden csapattag új készségeket sajátított el, és ami a legfontosabb: megtanultunk egymástól tanulni.',
      },
    ],
  },
  en: {
    title: 'Our Strategy.',
    teamSubtitle: 'Robot Development – Team Fabton',
    intro: 'This season our goal was not just to build a robot, but to create a reliable, efficient, and well-documented system through genuine teamwork. Work began before the game field even arrived: every team member developed an individual strategy, which we then merged into a shared, logical plan. We also created supporting materials such as field maps, spreadsheets, and a project timeline.',
    sections: [
      {
        title: 'Robot Design',
        content: 'The robot has a low, stable, and lightweight chassis that we designed together for easy expandability. To increase efficiency, we also built a second "dummy" robot — an exact copy of the main robot — so programming and mechanical development could progress in parallel.',
      },
      {
        title: 'Programming',
        content: 'We programmed in Python using Pybricks on Spike Prime. The code is modular and well-commented, allowing for fast updates. Gyroscope-assisted turns and self-aligning passive attachments ensured reliable runs.',
      },
      {
        title: 'Attachments',
        content: 'Every tool was designed specifically for its task. We used both active and passive mechanisms, and refined each through multiple iterations. The final designs were modeled in Studio 2.0 with detailed building instructions so any team member could rebuild them.',
      },
      {
        title: 'Testing and Documentation',
        content: 'Every run was tested at least 20 times. If a program failed more than three times, we rewrote it. Results were recorded in Excel — we tracked scores, run times, errors, and attachment swap times. Data was analyzed using charts, and everything was shared on our website.',
      },
      {
        title: 'Redesign and Improvement',
        content: 'After the regional qualifier, we restarted the entire project from scratch — from strategy to documentation. This third-generation robot reflects everything we learned and is the most prepared version we have ever built.',
      },
      {
        title: 'Teamwork and Sharing',
        content: 'The entire project — the robot, code, attachments, and instructions — was published as open source on GitHub and our website. We used Trello for task management to ensure smooth collaboration. Throughout the season every team member acquired new skills, and most importantly: we learned from each other.',
      },
    ],
  },
};

const DevelopmentApproach: React.FC = () => {
  const { lang } = useLanguage();
  const c = t[lang];

  return (
    <section className="py-32 bg-[#000000] border-t border-gray-900">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">

        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-8 leading-tight">
            {c.title}
          </h2>

          <div className="text-xl text-[#F5F5F7] leading-relaxed mb-12 font-medium">
            <p className="mb-6">{c.teamSubtitle}</p>
            <p>{c.intro}</p>
          </div>
        </div>

        <div className="space-y-12">
          {c.sections.map((section, index) => (
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
