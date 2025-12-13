
import React from 'react';
import { Search, Wifi, Crosshair } from 'lucide-react';
import { TRANSLATIONS } from '../constants';
import { Language } from '../types';

interface ScannerDisplayProps {
  isScanning: boolean;
  selectedPair: string;
  lang: Language;
}

const ScannerDisplay: React.FC<ScannerDisplayProps> = ({ isScanning, selectedPair, lang }) => {
  const t = TRANSLATIONS[lang];

  return (
    <div className="relative w-full aspect-video bg-black rounded-lg border-2 border-trade-card overflow-hidden mb-6 shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]">
      
      {/* Background Grid */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none"></div>

      {/* Static Crosshair Overlay */}
      <div className="absolute inset-0 z-10 opacity-20 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white"></div>
        <div className="absolute left-1/2 top-0 h-full w-[1px] bg-white"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-white w-2/3 h-2/3 rounded-full"></div>
      </div>

      {/* Radar Scan Effect */}
      {isScanning && (
         <div className="absolute inset-0 z-0 animate-spin [animation-duration:3s]">
            <div className="h-full w-full bg-[conic-gradient(from_0deg,transparent_0deg,transparent_270deg,rgba(100,255,218,0.2)_360deg)]"></div>
         </div>
      )}

      {/* Idle Pulse Effect */}
      {!isScanning && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
           <div className="w-32 h-32 rounded-full border border-white/5 animate-ping opacity-20"></div>
           <div className="w-48 h-48 rounded-full border border-white/5 animate-ping opacity-10 [animation-delay:0.5s] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        </div>
      )}

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-4">
        
        {isScanning ? (
           <div className="flex flex-col items-center gap-4">
              <div className="relative">
                 <div className="w-24 h-24 rounded-full border-2 border-trade-accent/50 flex items-center justify-center animate-pulse shadow-[0_0_15px_rgba(100,255,218,0.3)] bg-trade-accent/10">
                    <Crosshair className="w-10 h-10 text-trade-accent animate-[spin_4s_linear_infinite]" />
                 </div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-mono font-bold text-white tracking-widest mb-1 shadow-black drop-shadow-md">
                  {selectedPair}
                </div>
                <div className="text-xs font-mono text-trade-accent animate-pulse bg-black/50 px-2 rounded">
                  {t.scannerActive}
                </div>
              </div>
           </div>
        ) : (
           <div className="flex flex-col items-center opacity-80">
              <div className="relative mb-4">
                  <div className="absolute inset-0 bg-trade-accent/20 blur-xl rounded-full"></div>
                  <Search className="w-12 h-12 text-trade-accent/80 relative z-10" />
              </div>
              <p className="font-mono text-xs text-center tracking-widest text-gray-400 uppercase">
                {t.scannerWait}
              </p>
              <p className="font-bold text-xl text-white mt-1 tracking-wider">{selectedPair}</p>
           </div>
        )}

      </div>

      {/* Corner Status */}
      <div className="absolute top-3 right-3 z-30 flex items-center gap-2 bg-black/40 px-2 py-1 rounded backdrop-blur-sm">
         <Wifi size={12} className={isScanning ? "text-trade-accent animate-pulse" : "text-gray-500"} />
         <span className="text-[10px] font-mono text-gray-400">
            {isScanning ? 'DATA_STREAM: LIVE' : 'DATA_STREAM: READY'}
         </span>
      </div>

    </div>
  );
};

export default ScannerDisplay;
