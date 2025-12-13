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
        fixed bottom-24 left-0 w-full z-40 flex justify-center px-4 pointer-events-none
        transition-all duration-500 ease-out
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
      `}
    >
      <div className="bg-[#112240]/90 backdrop-blur-md border border-emerald-500/30 rounded-full py-2.5 px-5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] flex items-center w-auto max-w-full">
        
        {/* Icon Container - Prevent shrinking */}
        <div className="bg-emerald-500/10 p-1.5 rounded-full shrink-0 mr-3">
            <TrendingUp size={16} className="text-emerald-400" />
        </div>

        {/* Text Container - Allow growth but handle overflow */}
        <div className="flex flex-col flex-1 min-w-0 mr-4">
          <span className="text-[11px] text-gray-400 font-medium leading-tight truncate max-w-[150px]">
            {notification.userName} <span className="opacity-50 mx-0.5">|</span> {notification.pair}
          </span>
          <span className="text-sm font-bold text-white leading-tight whitespace-nowrap">
            {t.profitLabel} <span className="text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]">{geo.currency} {notification.amount}</span>
          </span>
        </div>

        {/* Check Icon - Prevent shrinking */}
        <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
      </div>
    </div>
  );
};

export default LiveNotification;