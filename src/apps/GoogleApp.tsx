import { useState } from 'react';
import { Search, Mic, Camera, Globe, ExternalLink, ArrowLeft, Sparkles, BookOpen } from 'lucide-react';

interface GoogleAppProps {
  onBack: () => void;
  onOpenApp: (appId: any) => void;
  onEarnReward: (msg: string, coins: number) => void;
}

export function GoogleApp({ onBack, onOpenApp, onEarnReward }: GoogleAppProps) {
  const [query, setQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [searchResults, setSearchResults] = useState([
    {
      title: 'Ashu Super App - Official Portal',
      url: 'https://ashu-super-app.run.app',
      snippet: 'Welcome to Ashu Super App! Experience Ashu YouTube, Deepu WhatsApp, Deepu Gupta PhonePe UPI, Facebook, and Ashu Gupta all in one place.',
    },
    {
      title: 'Deepu WhatsApp - Secure Messaging',
      url: 'https://web.whatsapp.com',
      snippet: 'Connect with your friends and family with fast, simple, secure messaging and voice calls.',
    },
    {
      title: 'Deepu Gupta PhonePe - UPI Payments & Recharge',
      url: 'https://www.phonepe.com',
      snippet: 'India’s leading digital payments platform. Transfer money instantly via UPI ID, pay bills, and win rewards.',
    },
    {
      title: 'Ashu YouTube - Music & Video Streaming',
      url: 'https://www.youtube.com',
      snippet: 'Enjoy millions of trending videos, music tracks, and live streams created by Ashu.',
    },
  ]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setHasSearched(true);
    onEarnReward('Search Completed! +10 Coins 🪙', 10);
  };

  return (
    <div className="flex-1 bg-slate-950 text-white flex flex-col overflow-hidden">
      {/* Google Header */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button onClick={onBack} className="p-1.5 hover:bg-slate-800 rounded-full text-slate-300 transition">
            <ArrowLeft size={18} />
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 via-red-500 to-blue-600 flex items-center justify-center text-white font-bold">
              AG
            </div>
            <span className="font-bold text-lg tracking-tight text-white">Ashu Gupta</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <a
            href="https://www.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold shadow transition"
          >
            <span>Google.com</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950">
        {!hasSearched ? (
          <div className="flex flex-col items-center justify-center h-full max-w-md mx-auto text-center space-y-6 pb-20">
            <div className="text-5xl font-black tracking-tighter">
              <span className="text-blue-500">G</span>
              <span className="text-red-500">o</span>
              <span className="text-amber-500">o</span>
              <span className="text-blue-500">g</span>
              <span className="text-emerald-500">l</span>
              <span className="text-red-500">e</span>
            </div>

            <form onSubmit={handleSearch} className="w-full">
              <div className="relative flex items-center bg-slate-900 border border-slate-700 hover:border-slate-500 rounded-full px-4 py-3 shadow-xl transition">
                <Search size={18} className="text-slate-400 mr-3" />
                <input
                  type="text"
                  placeholder="Search Google or type a URL"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent text-white placeholder-slate-400 text-sm focus:outline-none"
                />
                <div className="flex items-center space-x-2 text-slate-400">
                  <Mic size={18} className="hover:text-blue-400 cursor-pointer" />
                  <Camera size={18} className="hover:text-blue-400 cursor-pointer" />
                </div>
              </div>
            </form>

            {/* Quick App Shortcuts */}
            <div className="grid grid-cols-4 gap-3 w-full pt-4">
              <button
                onClick={() => onOpenApp('ashu')}
                className="bg-slate-900 hover:bg-slate-800 p-3 rounded-2xl flex flex-col items-center space-y-1.5 border border-slate-800 transition"
              >
                <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white">YT</div>
                <span className="text-[11px] text-slate-300">Ashu</span>
              </button>
              <button
                onClick={() => onOpenApp('deepu')}
                className="bg-slate-900 hover:bg-slate-800 p-3 rounded-2xl flex flex-col items-center space-y-1.5 border border-slate-800 transition"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white">WA</div>
                <span className="text-[11px] text-slate-300">Deepu</span>
              </button>
              <button
                onClick={() => onOpenApp('phonepe')}
                className="bg-slate-900 hover:bg-slate-800 p-3 rounded-2xl flex flex-col items-center space-y-1.5 border border-slate-800 transition"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-white">Pe</div>
                <span className="text-[11px] text-slate-300">PhonePe</span>
              </button>
              <button
                onClick={() => onOpenApp('facebook')}
                className="bg-slate-900 hover:bg-slate-800 p-3 rounded-2xl flex flex-col items-center space-y-1.5 border border-slate-800 transition"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">FB</div>
                <span className="text-[11px] text-slate-300">Facebook</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 max-w-2xl mx-auto">
            <form onSubmit={handleSearch} className="flex items-center bg-slate-900 border border-slate-700 rounded-full px-4 py-2.5 shadow-md">
              <Search size={16} className="text-slate-400 mr-3" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-white text-xs focus:outline-none"
              />
              <button type="submit" className="text-xs text-blue-400 font-bold px-2">Search</button>
            </form>

            <div className="space-y-4 pt-2">
              <p className="text-xs text-slate-400">About 1,450,000 search results (0.28 seconds)</p>

              {searchResults.map((res, i) => (
                <div key={i} className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-1 hover:border-slate-700 transition">
                  <p className="text-[11px] text-slate-400 truncate">{res.url}</p>
                  <h3 className="text-sm font-semibold text-blue-400 hover:underline cursor-pointer">{res.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{res.snippet}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
