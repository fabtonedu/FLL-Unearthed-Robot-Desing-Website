import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const t = {
  hu: {
    links: [
      { name: 'Kezdőlap', href: '#hero' },
      { name: 'Folyamat', href: '#process' },
      { name: 'Robot', href: '#robot' },
      { name: 'Kód', href: '#code' },
      { name: 'PID', href: '#pid' },
      { name: 'Stratégia', href: '#strategy' },
      { name: 'Evolúció', href: '#evolution' },
      { name: 'Open Source', href: '#opensource' },
    ],
  },
  en: {
    links: [
      { name: 'Home', href: '#hero' },
      { name: 'Process', href: '#process' },
      { name: 'Robot', href: '#robot' },
      { name: 'Code', href: '#code' },
      { name: 'PID', href: '#pid' },
      { name: 'Strategy', href: '#strategy' },
      { name: 'Evolution', href: '#evolution' },
      { name: 'Open Source', href: '#opensource' },
    ],
  },
};

const Navbar: React.FC = () => {
  const { lang, toggleLang } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navLinks = t[lang].links;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-gray-800' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center cursor-pointer opacity-90 hover:opacity-100 transition-opacity" onClick={() => window.scrollTo(0, 0)}>
            <img
              src="https://i.postimg.cc/4yqm5FTm/Rectangle.png"
              alt="Fabton Logo"
              className="h-12 w-auto object-contain"
            />
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-xs font-medium text-gray-300 hover:text-[#2997FF] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Language toggle */}
            <button
              onClick={toggleLang}
              aria-label="Switch language"
              className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-gray-700 hover:border-[#2997FF] transition-colors text-[11px] font-bold tracking-wider"
            >
              <span className={lang === 'hu' ? 'text-white' : 'text-gray-500'}>HU</span>
              <span className="text-gray-700 mx-0.5">|</span>
              <span className={lang === 'en' ? 'text-white' : 'text-gray-500'}>EN</span>
            </button>

            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-300 hover:text-white p-2"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#1c1c1e] border-b border-gray-800 absolute w-full">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-300 hover:text-[#2997FF] block py-2 text-sm font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
