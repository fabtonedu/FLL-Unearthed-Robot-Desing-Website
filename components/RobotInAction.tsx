import React from 'react';
import { ExternalLink } from 'lucide-react';

const RobotInAction: React.FC = () => {
  return (
    <section className="py-32 bg-black border-t border-gray-900">
      <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-semibold text-white mb-12">
          A robotunk működés közben
        </h2>
        
        <div className="max-w-3xl mx-auto relative aspect-video rounded-3xl overflow-hidden border border-gray-800 shadow-2xl bg-[#1D1D1F] group">
          <iframe 
            className="w-full h-full rounded-3xl relative z-10"
            src="https://www.youtube-nocookie.com/embed/p12mWN56wKw?rel=0&modestbranding=1" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            loading="lazy"
            allowFullScreen
          ></iframe>
          
          {/* Subtle glow effect behind the video for better aesthetics */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#2997FF] to-purple-600 rounded-3xl opacity-20 group-hover:opacity-40 blur-lg transition duration-1000 -z-10"></div>
        </div>

        {/* Fallback link added for robustness */}
        <div className="mt-8 flex justify-center">
          <a 
            href="https://www.youtube.com/watch?v=p12mWN56wKw" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#1D1D1F] hover:bg-[#2c2c2e] border border-gray-800 text-sm text-[#86868b] hover:text-white transition-all group"
          >
            <ExternalLink size={16} className="group-hover:text-[#2997FF] transition-colors" />
            <span>Megtekintés YouTube-on</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default RobotInAction;
