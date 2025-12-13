import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Language } from '../types';

interface LanguageSelectorProps {
  lang: Language;
  setLang: (lang: Language) => void;
}

// Minimalist SVG Flags
const FlagIcons = {
  pt: () => (
    <svg viewBox="0 0 640 480" className="w-6 h-4 shadow-sm rounded-[2px]">
      <path fill="#009c3b" d="M0 0h640v480H0z"/>
      <path fill="#f1bf00" d="M319.1 63.8l276 211.3-275.9 203.4L44.2 274.6z"/>
      <circle cx="320.3" cy="275.4" r="102" fill="#002776"/>
      <path fill="none" stroke="#fff" strokeWidth="10" d="M210 280c20-50 100-50 220 0" opacity="0.8"/>
    </svg>
  ),
  en: () => (
    <svg viewBox="0 0 640 480" className="w-6 h-4 shadow-sm rounded-[2px]">
       <path fill="#bd3d44" d="M0 0h640v480H0"/>
       <path stroke="#fff" strokeWidth="37" d="M0 55.3h640M0 129h640M0 203h640M0 277h640M0 351h640M0 425h640"/>
       <path fill="#192f5d" d="M0 0h296v222H0z"/>
    </svg>
  ),
  es: () => (
    <svg viewBox="0 0 640 480" className="w-6 h-4 shadow-sm rounded-[2px]">
      <path fill="#aa151b" d="M0 0h640v480H0z"/>
      <path fill="#f1bf00" d="M0 120h640v240H0z"/>
    </svg>
  ),
  fr: () => (
    <svg viewBox="0 0 640 480" className="w-6 h-4 shadow-sm rounded-[2px]">
      <path fill="#fff" d="M0 0h640v480H0z"/>
      <path fill="#002395" d="M0 0h213.3v480H0z"/>
      <path fill="#ed2939" d="M426.7 0H640v480H426.7z"/>
    </svg>
  )
};

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ lang, setLang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languages: { code: Language; label: string }[] = [
    { code: 'pt', label: 'Português' },
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'fr', label: 'Français' },
  ];

  const CurrentFlag = FlagIcons[lang];

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-black/40 hover:bg-black/60 border border-white/10 rounded-lg py-1.5 px-2 transition-all duration-200 focus:outline-none focus:border-white/30"
      >
        <CurrentFlag />
        <ChevronDown size={14} className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-32 bg-[#112240] border border-white/10 rounded-lg shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {languages.map((item) => {
            const Flag = FlagIcons[item.code];
            const isSelected = lang === item.code;
            return (
              <button
                key={item.code}
                onClick={() => {
                  setLang(item.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-mono transition-colors hover:bg-white/5 text-left
                  ${isSelected ? 'bg-white/10 text-white' : 'text-gray-400'}
                `}
              >
                <Flag />
                <span>{item.code.toUpperCase()}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;