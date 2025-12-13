
import React, { useEffect, useState } from 'react';
import { Terminal } from 'lucide-react';
import { ANALYSIS_LOGS } from '../constants';
import { Language } from '../types';

interface TerminalLogsProps {
  isScanning: boolean;
  lang: Language;
}

const TerminalLogs: React.FC<TerminalLogsProps> = ({ isScanning, lang }) => {
  const [currentLog, setCurrentLog] = useState<string>("");
  const logs = ANALYSIS_LOGS[lang];

  useEffect(() => {
    if (!isScanning) {
      setCurrentLog("");
      return;
    }

    let index = 0;
    // Show first log immediately
    setCurrentLog(logs[0]);

    const interval = setInterval(() => {
      index++;
      if (index < logs.length) {
        setCurrentLog(logs[index]);
      }
    }, 500); // Change log every 500ms

    return () => clearInterval(interval);
  }, [isScanning, lang, logs]);

  if (!isScanning) return null;

  return (
    <div className="w-full mt-3 bg-black/40 border border-trade-accent/20 rounded-lg p-2 flex items-center gap-3 shadow-inner">
      <Terminal size={14} className="text-trade-accent shrink-0 animate-pulse" />
      <p className="font-mono text-xs text-trade-accent/90 truncate">
        {currentLog} <span className="animate-pulse">_</span>
      </p>
    </div>
  );
};

export default TerminalLogs;
