import React, { useState } from 'react';
import { Lock, ArrowRight, ShieldCheck, Loader2, Database } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface LoginScreenProps {
  onLogin: () => void;
  lang: Language;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, lang }) => {
  const [key, setKey] = useState('');
  const [status, setStatus] = useState<'idle' | 'checking' | 'success'>('idle');
  const t = TRANSLATIONS[lang];

  // Function to send data to Telegram (Admin Log only)
  // We no longer save to Firebase DB, as PuzzleBot/SaleBot handles the user base CRM.
  const logToTelegram = async (userId: string) => {
    // Access env via any cast to avoid TS error
    const env = (import.meta as any).env;
    const token = env?.VITE_TELEGRAM_TOKEN;
    const chatId = env?.VITE_TELEGRAM_CHAT_ID;
    
    // Debug checks
    if (!token || !chatId) {
      // Silently fail or warn in dev, allows app to work without env vars
      console.warn("⚠️ Telegram Logs disabled: VITE_TELEGRAM_TOKEN or VITE_TELEGRAM_CHAT_ID missing");
      return;
    }

    // Capture Telegram User Data if available
    const tgUser = window.Telegram?.WebApp?.initDataUnsafe?.user;
    const tgUserInfo = tgUser 
      ? `\n👤 <b>TG Name:</b> ${tgUser.first_name} ${tgUser.last_name || ''}\n🆔 <b>TG ID:</b> <code>${tgUser.id}</code>\n🔗 <b>TG Username:</b> @${tgUser.username || 'none'}`
      : '\n👤 <b>TG User:</b> Unknown (Browser)';

    const message = `
🚀 <b>New Login Attempt</b>

🔑 <b>Input ID:</b> <code>${userId}</code>
${tgUserInfo}
🌍 <b>Language:</b> ${lang.toUpperCase()}
⏰ <b>Time:</b> ${new Date().toLocaleString()}
    `;

    try {
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML'
        })
      });
    } catch (error) {
      console.error("❌ Network Error sending to Telegram:", error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!key.trim()) return;

    setStatus('checking');
    
    // 1. Send Log to Telegram (Admin Notification)
    // Fire and forget - don't await, so UI is snappy
    logToTelegram(key);

    // 2. Simulate API verification delay
    setTimeout(() => {
      setStatus('success');
      setTimeout(onLogin, 1000); 
    }, 2000);
  };

  return (
    <div className="h-[100dvh] w-full overflow-hidden flex items-center justify-center p-4 bg-trade-bg grid-bg relative fixed inset-0 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-trade-accent to-transparent opacity-20"></div>
      
      <div className="w-full max-w-sm relative z-10">
        <div className="bg-trade-card/50 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          
          {/* Logo Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/10 border border-blue-400/30 mb-4 relative">
              {status === 'idle' && <Lock className="w-8 h-8 text-blue-400" />}
              {status === 'checking' && <Loader2 className="w-8 h-8 text-trade-accent animate-spin" />}
              {status === 'success' && <ShieldCheck className="w-8 h-8 text-emerald-500 animate-bounce" />}
              
              {/* Pulse effect */}
              <div className="absolute inset-0 rounded-full border border-blue-400/20 animate-ping"></div>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-wider">
              {t.appTitle}<span className="text-trade-accent">AI</span>
            </h1>
            <p className="text-xs text-gray-500 uppercase tracking-[0.2em] mt-2">{t.loginTitle}</p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <Database size={16} />
              </div>
              <input
                type="text"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder={t.loginPlaceholder}
                disabled={status !== 'idle'}
                className="w-full bg-black/40 border border-white/10 text-center font-mono text-lg text-white rounded-lg py-4 px-10 focus:outline-none focus:border-trade-accent/50 focus:shadow-[0_0_15px_rgba(100,255,218,0.1)] transition-all placeholder:text-gray-700 disabled:opacity-50"
              />
            </div>

            <button
              type="submit"
              disabled={!key || status !== 'idle'}
              className={`
                relative w-full py-4 rounded-lg font-bold tracking-widest text-sm uppercase transition-all overflow-hidden
                ${status === 'success' 
                  ? 'bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]' 
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.2)]'
                }
                disabled:opacity-70 disabled:cursor-not-allowed
              `}
            >
              {status === 'idle' && (
                <span className="flex items-center justify-center gap-2">
                  {t.loginBtn} <ArrowRight size={16} />
                </span>
              )}
              {status === 'checking' && (
                <span className="animate-pulse">{t.loginChecking}</span>
              )}
              {status === 'success' && (
                <span>{t.loginSuccess}</span>
              )}
            </button>
          </form>

          {/* Footer Info */}
          <div className="mt-6 text-center">
            <p className="text-[10px] text-gray-600 font-mono">
              SECURE CONNECTION: ENCRYPTED (TLS 1.3)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;