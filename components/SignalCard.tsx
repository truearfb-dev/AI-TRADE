import React, { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Clock, Target, BarChart2, Hourglass, RotateCcw, Zap } from 'lucide-react';
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

  const isExpired = timeLeft === 0;
  const isUrgent = timeLeft <= 10 && !isExpired;

  // Function to determine accuracy color independent of signal direction
  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 90) return 'text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]'; // High - Green
    if (accuracy >= 80) return 'text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]';  // Medium - Yellow
    return 'text-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]';     // Low - Red
  };
  
  return (
    <div className="animate-in fade-in zoom-in duration-500 w-full">
      {/* Main Card */}
      <div className={`
        relative overflow-hidden rounded-2xl border-2 shadow-[0_0_40px_rgba(0,0,0,0.3)] transition-all duration-500
        ${isCall ? 'border-emerald-500 bg-emerald-500/10' : 'border-rose-500 bg-rose-500/10'}
        ${isExpired ? 'grayscale-[0.5] opacity-90' : ''}
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
          <div className={`
            w-full rounded-lg p-2 mb-6 flex items-center justify-between px-4 border transition-all duration-300
            ${isExpired ? 'bg-red-500/10 border-red-500/30' : 'bg-black/40 border-white/5'}
            ${isUrgent ? 'border-red-500/50 bg-red-500/10 shadow-[0_0_20px_rgba(239,68,68,0.3)]' : ''}
          `}>
             <span className="text-[10px] text-gray-400 uppercase tracking-wider flex items-center gap-2">
               <Hourglass size={12} className={!isExpired ? "animate-spin [animation-duration:3s]" : ""} />
               {t.timerLabel}
             </span>
             <span className={`
               font-mono font-bold transition-all duration-300
               ${isUrgent 
                 ? 'text-red-500 text-2xl scale-110 animate-[pulse_0.5s_ease-in-out_infinite] drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]' 
                 : 'text-lg text-white'}
             `}>
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
              <span className={`text-2xl font-bold font-mono ${getAccuracyColor(signal.accuracy)}`}>
                {signal.accuracy}%
              </span>
            </div>
          </div>

          {/* Action Button - Dynamic based on Timer */}
          {isExpired ? (
            <button 
              onClick={onReset}
              className="w-full relative group overflow-hidden bg-trade-accent hover:bg-[#4cdbb9] text-trade-bg font-black text-lg py-4 rounded-xl shadow-[0_0_20px_rgba(100,255,218,0.5)] hover:shadow-[0_0_40px_rgba(100,255,218,0.7)] transition-all transform hover:scale-[1.02] active:scale-95 animate-[pulse_2s_infinite]"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-[-20deg]"></div>
              <div className="relative flex items-center justify-center gap-3">
                <Zap className="w-6 h-6 fill-current" />
                <span>{t.btnNewScan.toUpperCase()}</span>
              </div>
            </button>
          ) : (
            <button 
              onClick={onReset}
              className="text-sm text-gray-400 hover:text-white underline decoration-dotted underline-offset-4 transition-colors flex items-center gap-2"
            >
              <RotateCcw size={12} />
              {t.btnNewScan}
            </button>
          )}

        </div>
      </div>
    </div>
  );
};

export default SignalCard;