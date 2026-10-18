import { AppId } from '../types';
import { Youtube, MessageCircle, CreditCard, Facebook, Search, Globe, Settings, Play, ShieldCheck, Sparkles, Gift } from 'lucide-react';

interface HomeScreenProps {
  onOpenApp: (appId: AppId) => void;
}

interface AppIconItem {
  id: AppId;
  name: string;
  icon: React.ReactNode;
  bgGradient: string;
  badge?: number;
}

export function HomeScreen({ onOpenApp }: HomeScreenProps) {
  const apps: AppIconItem[] = [
    {
      id: 'ashu',
      name: 'Ashu (YT)',
      icon: <Youtube size={32} className="text-white" />,
      bgGradient: 'from-red-600 to-rose-600',
      badge: 3,
    },
    {
      id: 'deepu',
      name: 'Deepu (WA)',
      icon: <MessageCircle size={32} className="text-white" />,
      bgGradient: 'from-emerald-500 to-green-600',
      badge: 5,
    },
    {
      id: 'phonepe',
      name: 'Deepu Gupta',
      icon: <CreditCard size={32} className="text-white" />,
      bgGradient: 'from-purple-600 to-indigo-700',
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: <Facebook size={32} className="text-white" />,
      bgGradient: 'from-blue-600 to-blue-800',
      badge: 2,
    },
    {
      id: 'google',
      name: 'Ashu Gupta',
      icon: <Search size={32} className="text-white" />,
      bgGradient: 'from-amber-500 via-red-500 to-blue-600',
    },
    {
      id: 'rewards',
      name: 'Rewards Hub',
      icon: <Gift size={32} className="text-white" />,
      bgGradient: 'from-amber-500 to-yellow-600',
      badge: 2,
    },
    {
      id: 'links',
      name: 'Web Links',
      icon: <Globe size={32} className="text-white" />,
      bgGradient: 'from-cyan-500 to-blue-600',
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: <Settings size={32} className="text-white" />,
      bgGradient: 'from-slate-600 to-slate-800',
    },
  ];

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="flex-1 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white p-6 flex flex-col justify-between overflow-y-auto">
      {/* Top Widget / Clock */}
      <div className="pt-4 pb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-indigo-300 font-medium tracking-wide uppercase">{currentDate}</p>
            <h1 className="text-3xl font-bold tracking-tight mt-0.5">Ashu OS</h1>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center space-x-1.5 text-xs text-emerald-400">
            <ShieldCheck size={14} />
            <span>Secure & Live</span>
          </div>
        </div>

        {/* Quick Search Widget */}
        <div
          onClick={() => onOpenApp('google')}
          className="mt-5 bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 flex items-center space-x-3 cursor-pointer transition shadow-lg group"
        >
          <Search size={20} className="text-slate-300 group-hover:text-white transition" />
          <span className="text-sm text-slate-300 group-hover:text-white flex-1">Search Google or type web link...</span>
          <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-md text-slate-200">AI Enabled</span>
        </div>
      </div>

      {/* App Grid */}
      <div className="grid grid-cols-4 gap-y-6 gap-x-4 my-auto py-2">
        {apps.map((app) => (
          <button
            key={app.id}
            onClick={() => onOpenApp(app.id)}
            className="flex flex-col items-center group focus:outline-none"
          >
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${app.bgGradient} shadow-xl shadow-black/40 flex items-center justify-center relative transform group-hover:scale-105 group-active:scale-95 transition duration-200 border border-white/20`}>
              {app.icon}
              {app.badge && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md border-2 border-slate-900">
                  {app.badge}
                </span>
              )}
            </div>
            <span className="text-xs font-medium text-slate-200 mt-2 text-center drop-shadow truncate w-full">
              {app.name}
            </span>
          </button>
        ))}
      </div>

      {/* Dock / Featured Shortcut */}
      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="bg-gradient-to-r from-blue-600/30 to-purple-600/30 backdrop-blur-md border border-white/15 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg">
              <Sparkles size={20} />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">Direct App Links Hub</h2>
              <p className="text-xs text-slate-300">Access YouTube, WhatsApp & PhonePe links instantly</p>
            </div>
          </div>
          <button
            onClick={() => onOpenApp('links')}
            className="px-4 py-2 bg-white text-slate-900 hover:bg-slate-100 rounded-xl text-xs font-bold shadow-md transition"
          >
            Open Links
          </button>
        </div>
      </div>
    </div>
  );
}
