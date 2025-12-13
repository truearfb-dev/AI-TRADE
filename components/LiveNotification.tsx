
import React, { useEffect, useState } from 'react';
import { CheckCircle2, TrendingUp } from 'lucide-react';
import { GEO_CONFIG, TRADING_PAIRS, TRANSLATIONS } from '../constants';
import { Language, NotificationItem } from '../types';

interface LiveNotificationProps {
  lang: Language;
}

const LiveNotification: React.FC<LiveNotificationProps> = ({ lang }) => {
  const [notification, setNotification] = useState<NotificationItem | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const t = TRANSLATIONS[lang];
  const geo = GEO_CONFIG[lang];

  useEffect(() => {
    // Reset notification when lang changes to avoid showing wrong name/currency immediately
    setIsVisible(false);
    
    const triggerNotification = () => {
      // Use names from current geo config
      const randomName = geo.names[Math.floor(Math.random() * geo.names.length)];
      
      const randomAmount = Math.floor(Math.random() * (500 - 50 + 1)) + 50;
      const randomPair = TRADING_PAIRS[Math.floor(Math.random() * TRADING_PAIRS.length)].name;

      setNotification({
        id: Date.now(),
        userName: randomName,
        amount: randomAmount,
        pair: randomPair
      });
      setIsVisible(true);

      // Hide after 4 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 4000);
    };

    // Initial delay
    const initialTimeout = setTimeout(triggerNotification, 3000);

    // Loop interval (every 8-12 seconds)
    const interval = setInterval(triggerNotification, 10000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [lang, geo.names]); // Re-run effect if language changes

  if (!notification) return null;

  return (
    <div 
      className={`
        fixed top-24 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-40 transition-all duration-500 ease-in-out pointer-events-none
        ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'}
      `}
    >
      <div className="bg-slate-900/90 backdrop-blur-md border border-emerald-500/30 rounded-full py-2 px-4 shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex items-center gap-3">
        <div className="bg-emerald-500/20 p-1.5 rounded-full">
            <TrendingUp size={14} className="text-emerald-400" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-400 leading-none mb-0.5">
            {notification.userName} • {notification.pair}
          </span>
          <span className="text-xs font-bold text-white leading-none">
            {t.profitLabel} <span className="text-emerald-400">{geo.currency} {notification.amount}</span>
          </span>
        </div>
        <CheckCircle2 size={16} className="text-emerald-500 ml-auto" />
      </div>
    </div>
  );
};

export default LiveNotification;