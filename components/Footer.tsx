import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface FooterProps {
  lang: Language;
}

const Footer: React.FC<FooterProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  return (
    <footer className="w-full py-6 px-4 mt-auto border-t border-white/5 bg-black/20">
      <div className="max-w-md mx-auto flex gap-3 text-gray-500">
        <AlertTriangle className="w-8 h-8 shrink-0 opacity-50" />
        <p className="text-[10px] leading-relaxed text-justify opacity-60">
          {t.riskWarning}
        </p>
      </div>
      <div className="text-center mt-4 text-[10px] text-gray-600">
        &copy; {new Date().getFullYear()} Pocket AI Trader.
      </div>
    </footer>
  );
};

export default Footer;