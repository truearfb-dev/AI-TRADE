import React, { useState, useEffect } from 'react';
import { Activity, Bell, BellOff } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';
import LanguageSelector from './LanguageSelector';

interface HeaderProps {
  lang: Language;
  setLang: (lang: Language) => void;
}

const Header: React.FC<HeaderProps> = ({ lang, setLang }) => {
  const t = TRANSLATIONS[lang];
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    // Check initial permission state
    if ('Notification' in window && Notification.permission === 'granted') {
      setNotificationsEnabled(true);
    }
  }, []);

  const handleNotificationToggle = async () => {
    if (!('Notification' in window)) {
      alert("This browser does not support notifications.");
      return;
    }

    if (Notification.permission === 'granted') {
      // Just toggle visual state locally, usually you'd call api to unsubscribe
      // For this demo, we just show a test notification
      new Notification("Pocket AI Trader", {
        body: "Test notification: System is Active 🟢",
        icon: "https://cdn-icons-png.flaticon.com/512/3429/3429149.png"
      });
      return;
    }

    // Request permission
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setNotificationsEnabled(true);
        // Send a test notification immediately to confirm
        navigator.serviceWorker.ready.then((registration) => {
          registration.showNotification("Pocket AI Connected", {
            body: "You will now receive trading signals.",
            icon: "https://cdn-icons-png.flaticon.com/512/3429/3429149.png"
          });
        });
      }
    } catch (error) {
      console.error("Error requesting notification permission:", error);
    }
  };

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
        
        <div className="flex items-center gap-3">
           <button 
             onClick={handleNotificationToggle}
             className={`p-2 rounded-full transition-all duration-300 ${notificationsEnabled ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-gray-400 hover:text-white'}`}
           >
             {notificationsEnabled ? <Bell size={18} /> : <BellOff size={18} />}
           </button>
           
           <LanguageSelector lang={lang} setLang={setLang} />
        </div>
      </div>
    </header>
  );
};

export default Header;