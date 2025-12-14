import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ScannerDisplay from './components/ScannerDisplay';
import SignalCard from './components/SignalCard';
import LoginScreen from './components/LoginScreen';
import LanguageSelector from './components/LanguageSelector';
import TerminalLogs from './components/TerminalLogs';
import LiveNotification from './components/LiveNotification';
import { SignalData, TradeDirection, Language } from './types';
import { TRADING_PAIRS, TRANSLATIONS } from './constants';
import { Radar, ChevronDown } from 'lucide-react';

const SESSION_DURATION_MS = 1 * 60 * 60 * 1000; // 1 Hour

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('pt');
  
  // Initialize authentication state from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedTimestamp = localStorage.getItem('pocket_ai_login_time');
    if (savedTimestamp) {
      const loginTime = parseInt(savedTimestamp, 10);
      const currentTime = Date.now();
      // Check if session is still valid (not expired)
      if (currentTime - loginTime < SESSION_DURATION_MS) {
        return true;
      }
    }
    return false;
  });

  const [isScanning, setIsScanning] = useState(false);
  const [signal, setSignal] = useState<SignalData | null>(null);
  const [selectedPair, setSelectedPair] = useState(TRADING_PAIRS[0].name);

  const t = TRANSLATIONS[language];

  // Helper to get color indicator based on volatility
  const getVolatilityIndicator = (volStr: string) => {
    const vol = parseInt(volStr.replace('%', ''), 10);
    if (vol >= 90) return '🟢'; // Green for high
    if (vol >= 80) return '🟡'; // Yellow for medium
    return '🔴'; // Red for low
  };

  // Register Service Worker for PWA capabilities
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }, []);

  // --- LOGIC FOR NOTIFICATIONS ---
  const sendNotification = (title: string, body: string) => {
    if (Notification.permission === 'granted') {
      // Check if service worker is ready to use "showNotification" (better for mobile)
      if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.ready.then((registration) => {
          registration.showNotification(title, {
            body: body,
            icon: "https://cdn-icons-png.flaticon.com/512/3429/3429149.png",
            vibrate: [200, 100, 200], // Vibration pattern
            tag: 'trading-signal' // Replaces old notification with new one if stacked
          } as any);
        });
      } else {
        // Fallback for desktop/simple testing
        new Notification(title, {
          body: body,
          icon: "https://cdn-icons-png.flaticon.com/512/3429/3429149.png"
        });
      }
    }
  };

  const generateSignal = useCallback((pairName: string) => {
    const direction: TradeDirection = Math.random() > 0.5 ? 'CALL' : 'PUT';
    const accuracy = Math.floor(Math.random() * (98 - 88 + 1)) + 88;

    return {
      pair: pairName,
      direction,
      timeframe: 'M1',
      accuracy,
      timestamp: Date.now(),
    };
  }, []);

  const handleScan = () => {
    if (isScanning || signal) return;

    setIsScanning(true);

    // Finalize scan
    setTimeout(() => {
      const newSignal = generateSignal(selectedPair);
      setSignal(newSignal);
      setIsScanning(false);
      
      // CUSTOMIZE YOUR NOTIFICATION TEXT HERE
      const emoji = newSignal.direction === 'CALL' ? '🟢 ⬆️' : '🔴 ⬇️';
      const title = `SIGNAL: ${newSignal.pair} ${emoji}`;
      const body = `Direction: ${newSignal.direction}\nAccuracy: ${newSignal.accuracy}%\nTimeframe: M1`;
      
      sendNotification(title, body);

    }, 4000); 
  };

  // --- AUTOMATIC BACKGROUND SIGNALS (SIMULATION) ---
  useEffect(() => {
    if (!isAuthenticated) return;

    // Simulate an incoming signal every 5 minutes (300000ms) purely for notification
    const interval = setInterval(() => {
      // Only notify if user is NOT currently looking at a signal card
      if (!signal) {
        const randomPair = TRADING_PAIRS[Math.floor(Math.random() * TRADING_PAIRS.length)].name;
        const autoSignal = generateSignal(randomPair);
        
        const emoji = autoSignal.direction === 'CALL' ? '🟢' : '🔴';
        const title = `New Opportunity: ${randomPair}`;
        const body = `${emoji} ${autoSignal.direction} Confirmed (${autoSignal.accuracy}%)`;
        
        sendNotification(title, body);
      }
    }, 120000); // Trigger every 2 minutes for testing (change to higher value later)

    return () => clearInterval(interval);
  }, [isAuthenticated, signal, generateSignal]);

  const handleReset = () => {
    setSignal(null);
  };

  const handleLogin = () => {
    // Save current timestamp to localStorage on successful login
    localStorage.setItem('pocket_ai_login_time', Date.now().toString());
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return (
      <div className="relative">
         <div className="absolute top-4 right-4 z-50">
             <LanguageSelector lang={language} setLang={setLanguage} />
         </div>
         <LoginScreen onLogin={handleLogin} lang={language} />
      </div>
    );
  }

  return (
    <div className="h-[100dvh] w-full overflow-hidden flex flex-col bg-trade-bg text-white font-sans selection:bg-trade-accent selection:text-trade-bg grid-bg animate-in fade-in duration-700 fixed inset-0 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
      <Header lang={language} setLang={setLanguage} />
      
      {/* Live Social Proof - Floating at bottom */}
      <LiveNotification lang={language} />

      <main className="flex-grow p-4 flex flex-col items-center justify-center w-full max-w-md mx-auto relative z-0">
        
        {/* Conditional Rendering: Scanner View or Result View */}
        {!signal ? (
          <div className="w-full flex flex-col items-center animate-in fade-in duration-500">
            
            <ScannerDisplay isScanning={isScanning} selectedPair={selectedPair} lang={language} />

            {/* Controls Container */}
            <div className="w-full space-y-4">
              
              {/* Asset Selector */}
              <div className="w-full">
                <label className="text-[10px] text-gray-400 font-mono tracking-widest uppercase mb-1.5 block ml-1">
                  {t.selectAsset}
                </label>
                <div className="relative">
                  <select 
                    value={selectedPair}
                    onChange={(e) => setSelectedPair(e.target.value)}
                    disabled={isScanning}
                    className="w-full appearance-none bg-trade-card border border-white/10 rounded-xl px-4 py-3 font-mono font-bold text-white shadow-sm focus:outline-none focus:border-trade-accent/50 focus:shadow-[0_0_15px_rgba(100,255,218,0.1)] transition-all disabled:opacity-50"
                  >
                    {TRADING_PAIRS.map((pair) => (
                      <option key={pair.name} value={pair.name}>
                        {pair.name} &nbsp;&nbsp;&nbsp; {getVolatilityIndicator(pair.volatility)}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                </div>
              </div>

              {/* Main Action Button */}
              <button
                onClick={handleScan}
                disabled={isScanning}
                className={`
                  group relative w-full h-16 rounded-xl overflow-hidden font-bold tracking-widest text-lg shadow-[0_0_20px_rgba(100,255,218,0.1)] transition-all duration-300
                  ${isScanning ? 'cursor-not-allowed opacity-90' : 'hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(100,255,218,0.3)]'}
                `}
              >
                {/* Button Gradient Background */}
                <div className={`absolute inset-0 transition-opacity duration-300 ${isScanning ? 'bg-slate-800' : 'bg-gradient-to-r from-blue-600 to-cyan-500'}`}></div>
                
                {/* Loading Bar Background */}
                {isScanning && (
                   <div className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-[4000ms] ease-linear w-full animate-[width_4s_linear]"></div>
                )}

                {/* Button Content */}
                <div className="relative z-10 flex items-center justify-center gap-3 w-full h-full">
                  {isScanning ? (
                    <>
                      <span className="animate-pulse">{t.ctaScanning}</span>
                    </>
                  ) : (
                    <>
                      <Radar className="w-6 h-6 animate-pulse" />
                      <span>{t.ctaStart}</span>
                    </>
                  )}
                </div>
              </button>
            </div>

            {/* Terminal Logs (Only when scanning) */}
            <div className="w-full h-12 mt-2">
               <TerminalLogs isScanning={isScanning} lang={language} />
            </div>
            
            {!isScanning && (
               <p className="mt-4 text-xs text-gray-500 text-center font-mono">
                 V2.4 | {t.statusOnline}
               </p>
            )}
          </div>
        ) : (
          <SignalCard signal={signal} onReset={handleReset} lang={language} />
        )}
      </main>

      <Footer lang={language} />
    </div>
  );
};

export default App;