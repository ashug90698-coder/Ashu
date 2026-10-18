import { Home, ArrowLeft, Square, Smartphone, Monitor, Globe } from 'lucide-react';
import { AppId } from '../types';

interface NavigationDockProps {
  currentApp: AppId;
  onNavigate: (app: AppId) => void;
  onBack: () => void;
  isPhoneFrame: boolean;
  onToggleFrame: () => void;
}

export function NavigationDock({
  currentApp,
  onNavigate,
  onBack,
  isPhoneFrame,
  onToggleFrame,
}: NavigationDockProps) {
  return (
    <div className="bg-slate-900/90 backdrop-blur-md text-white px-6 py-2.5 flex items-center justify-between border-t border-slate-800 text-xs">
      {/* Left: Device Frame Toggle */}
      <div className="flex items-center space-x-2">
        <button
          onClick={onToggleFrame}
          className="flex items-center space-x-1.5 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition"
          title={isPhoneFrame ? "Switch to Full Screen" : "Switch to Phone View"}
        >
          {isPhoneFrame ? <Monitor size={15} /> : <Smartphone size={15} />}
          <span className="hidden sm:inline">{isPhoneFrame ? "Full View" : "Phone View"}</span>
        </button>
        <button
          onClick={() => onNavigate('links')}
          className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg transition ${currentApp === 'links' ? 'bg-blue-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'}`}
          title="Direct Web Links Hub"
        >
          <Globe size={15} />
          <span className="hidden sm:inline">Web Links</span>
        </button>
      </div>

      {/* Center: Android/iOS Navigation Buttons */}
      <div className="flex items-center space-x-6">
        <button
          onClick={onBack}
          className="p-2 hover:bg-slate-800 rounded-full text-slate-300 transition"
          title="Back"
        >
          <ArrowLeft size={18} />
        </button>
        <button
          onClick={() => onNavigate('home')}
          className="p-2.5 bg-blue-600 hover:bg-blue-500 rounded-full text-white shadow-lg shadow-blue-600/30 transition transform active:scale-95"
          title="Home"
        >
          <Home size={18} />
        </button>
        <button
          onClick={() => onNavigate('home')}
          className="p-2 hover:bg-slate-800 rounded-full text-slate-300 transition"
          title="Recent Apps"
        >
          <Square size={16} />
        </button>
      </div>

      {/* Right: Quick App Indicators */}
      <div className="hidden sm:flex items-center space-x-2 text-[11px] text-slate-400">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>Ashu OS v2.4</span>
      </div>
    </div>
  );
}
