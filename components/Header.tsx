import React from 'react';
import { Activity } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';
import LanguageSelector from './LanguageSelector';

interface HeaderProps {
  lang: Language;
  setLang: (lang: Language) => void;
}

const Header: React.FC<HeaderProps> = ({ lang, setLang }) => {
  const t = TRANSLATIONS[lang];

  return (
    <header className="w-full p-4 border-b border-white/10 bg-trade-card/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-md mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Activity className="w-6 h-6 text-trade-accent" />
            <div className="absolute inset-0 bg-trade-accent/20 blur-lg animate-pulse"></div>
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-wider text-white leading-none">
              {t.appTitle}<span className="text-trade-accent">AI</span>
            </h1>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest leading-none mt-1">
              {t.appSubtitle}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
           <LanguageSelector lang={lang} setLang={setLang} />
        </div>
      </div>
    </header>
  );
};

export default Header;