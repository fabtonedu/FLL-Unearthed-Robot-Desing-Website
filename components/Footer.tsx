import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const t = {
  hu: {
    teamLabel: 'FIRST LEGO League Challenge Team #1234',
    contact: 'Kapcsolat',
    team: 'Csapatunk',
    copyright: 'Copyright © 2024 Fabton.',
  },
  en: {
    teamLabel: 'FIRST LEGO League Challenge Team #1234',
    contact: 'Contact',
    team: 'Our Team',
    copyright: 'Copyright © 2024 Fabton.',
  },
};

const Footer: React.FC = () => {
  const { lang } = useLanguage();
  const c = t[lang];

  return (
    <footer className="bg-[#050505] py-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <img
            src="https://i.postimg.cc/4yqm5FTm/Rectangle.png"
            alt="Fabton"
            className="h-10 w-auto mb-4 object-contain"
          />
          <p className="text-[#86868b] text-sm mt-2">{c.teamLabel}</p>
        </div>

        <div className="flex flex-wrap gap-8">
          <a href="#" className="text-white hover:text-[#2997FF] text-sm font-medium transition-colors">{c.contact}</a>
          <a href="#" className="text-white hover:text-[#2997FF] text-sm font-medium transition-colors">{c.team}</a>
          <a href="#" className="text-white hover:text-[#2997FF] text-sm font-medium transition-colors">GitHub</a>
        </div>

        <div className="text-[#86868b] text-xs">
          {c.copyright}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
