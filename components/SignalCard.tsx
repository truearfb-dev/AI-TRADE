
import React, { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Clock, Target, BarChart2, Hourglass } from 'lucide-react';
import { SignalData, Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface SignalCardProps {
  signal: SignalData;
  onReset: () => void;
  lang: Language;
}

const SignalCard: React.FC<SignalCardProps> = ({ signal, onReset, lang }) => {
  const isCall = signal.direction === 'CALL';
  const t = TRANSLATIONS[lang];
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);
  
  return (
    <div className="animate-in fade-in zoom-in duration-500 w-full">
      {/* Main Card */}
      <div className={`
        relative overflow-hidden rounded-2xl border-2 shadow-[0_0_40px_rgba(0,0,0,0.3)]
        ${isCall ? 'border-emerald-500 bg-emerald-500/10' : 'border-rose-500 bg-rose-500/10'}
      `}>
        
        {/* Glowing Background Effect */}
        <div className={`absolute top-0 left-0 w-full h-1/2 opacity-20 blur-[60px] ${isCall ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>

        <div className="p-6 relative z-10 flex flex-col items-center">
          
          {/* Header Badge */}
          <div className={`
            px-4 py-1 rounded-full text-xs font-bold tracking-widest mb-6 border uppercase shadow-lg
            ${isCall ? 'bg-emerald-500 text-white border-emerald-400 shadow-emerald-500/20' : 'bg-rose-500 text-white border-rose-400 shadow-rose-500/20'}
          `}>
            {isCall ? 'CALL CONFIRMED' : 'PUT CONFIRMED'}
          </div>

          {/* Direction Icon & Text */}
          <div className="flex flex-col items-center mb-6">
            {isCall ? (
              <TrendingUp className="w-20 h-20 text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)] mb-2" />
            ) : (
              <TrendingDown className="w-20 h-20 text-rose-400 drop-shadow-[0_0_15px_rgba(244,63,94,0.5)] mb-2" />
            )}
            <h2 className={`text-4xl font-black tracking-tighter ${isCall ? 'text-emerald-400' : 'text-rose-400'}`}>
              {isCall ? t.signalBuy : t.signalSell}
            </h2>
            <span className="text-sm font-mono opacity-70 tracking-widest uppercase mt-1">
              {isCall ? `(${t.signalCall})` : `(${t.signalPut})`}
            </span>
          </div>

          {/* Countdown Timer */}
          <div className="w-full bg-black/40 rounded-lg p-2 mb-6 flex items-center justify-between px-4 border border-white/5">
             <span className="text-[10px] text-gray-400 uppercase tracking-wider flex items-center gap-2">
               <Hourglass size={12} className="animate-spin [animation-duration:3s]" />
               {t.timerLabel}
             </span>
             <span className={`font-mono font-bold text-lg ${timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
               00:{timeLeft.toString().padStart(2, '0')}
             </span>
          </div>

          {/* Data Grid */}
          <div className="w-full grid grid-cols-2 gap-3 mb-6">
            <div className="bg-trade-bg/80 backdrop-blur border border-white/5 rounded-xl p-3 flex flex-col items-center justify-center">
              <div className="flex items-center gap-1 text-gray-400 text-xs mb-1">
                <BarChart2 size={12} /> {t.labelAsset}
              </div>
              <span className="text-xl font-bold text-white font-mono">{signal.pair}</span>
            </div>

            <div className="bg-trade-bg/80 backdrop-blur border border-white/5 rounded-xl p-3 flex flex-col items-center justify-center">
              <div className="flex items-center gap-1 text-gray-400 text-xs mb-1">
                <Clock size={12} /> {t.labelExpiration}
              </div>
              <span className="text-xl font-bold text-white font-mono">{signal.timeframe}</span>
            </div>

            <div className="col-span-2 bg-trade-bg/80 backdrop-blur border border-white/5 rounded-xl p-3 flex items-center justify-between px-6">
               <div className="flex items-center gap-2 text-gray-400 text-xs">
                <Target size={14} /> {t.labelAccuracy}
              </div>
              <span className={`text-2xl font-bold font-mono ${isCall ? 'text-emerald-400' : 'text-rose-400'}`}>
                {signal.accuracy}%
              </span>
            </div>
          </div>

          <button 
            onClick={onReset}
            className="text-sm text-gray-400 hover:text-white underline decoration-dotted underline-offset-4 transition-colors"
          >
            {t.btnNewScan}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignalCard;
