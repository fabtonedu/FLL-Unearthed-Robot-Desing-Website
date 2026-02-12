import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050505] py-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
           <img 
             src="https://i.postimg.cc/4yqm5FTm/Rectangle.png" 
             alt="Fabton" 
             className="h-10 w-auto mb-4 object-contain"
           />
           <p className="text-[#86868b] text-sm mt-2">FIRST LEGO League Challenge Team #1234</p>
        </div>
        
        <div className="flex flex-wrap gap-8">
           <a href="#" className="text-white hover:text-[#2997FF] text-sm font-medium transition-colors">Kapcsolat</a>
           <a href="#" className="text-white hover:text-[#2997FF] text-sm font-medium transition-colors">Csapatunk</a>
           <a href="#" className="text-white hover:text-[#2997FF] text-sm font-medium transition-colors">GitHub</a>
        </div>
        
        <div className="text-[#86868b] text-xs">
          Copyright © 2024 Fabton.
        </div>
      </div>
    </footer>
  );
};

export default Footer;