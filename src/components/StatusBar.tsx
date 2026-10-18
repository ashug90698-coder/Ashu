import { Wifi, Battery, Signal } from 'lucide-react';
import { useState, useEffect } from 'react';

interface StatusBarProps {
  appName?: string;
  isPhoneFrame: boolean;
}

export function StatusBar({ appName, isPhoneFrame }: StatusBarProps) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`w-full bg-slate-900 text-white px-4 py-1.5 flex items-center justify-between text-xs font-medium select-none ${isPhoneFrame ? 'rounded-t-[36px]' : 'rounded-none'}`}>
      <div className="flex items-center space-x-2">
        <span>{time || '12:00'}</span>
        {appName && <span className="text-slate-400 font-normal truncate max-w-[120px]">• {appName}</span>}
      </div>

      {isPhoneFrame && (
        <div className="absolute left-1/2 -translate-x-1/2 top-1.5 w-24 h-4 bg-black rounded-full flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-950 absolute left-2"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-blue-950 absolute right-4"></div>
        </div>
      )}

      <div className="flex items-center space-x-2.5 text-slate-300">
        <span className="text-[10px] font-bold text-red-400">ASHU 5G</span>
        <Signal size={13} />
        <Wifi size={13} />
        <div className="flex items-center space-x-0.5">
          <span className="text-[10px]">98%</span>
          <Battery size={15} className="text-emerald-400 fill-emerald-400/20" />
        </div>
      </div>
    </div>
  );
}
