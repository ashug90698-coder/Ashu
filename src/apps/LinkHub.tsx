import { Globe, ExternalLink, ArrowLeft, Youtube, MessageCircle, CreditCard, Facebook, Search, Sparkles } from 'lucide-react';

interface LinkHubProps {
  onBack: () => void;
}

export function LinkHub({ onBack }: LinkHubProps) {
  const links = [
    {
      name: 'Ashu Super App (Live Running Link)',
      url: 'https://ais-dev-kgoiunfo3kbugen7canogn-776956823632.asia-southeast1.run.app',
      description: 'Open this super app directly in any browser or device.',
      icon: <Sparkles size={24} className="text-blue-400" />,
      color: 'border-blue-500/50 hover:border-blue-500 bg-blue-950/40',
    },
    {
      name: 'Ashu YouTube',
      url: 'https://www.youtube.com',
      description: 'Open official YouTube streaming platform in a new tab.',
      icon: <Youtube size={24} className="text-red-500" />,
      color: 'border-red-500/30 hover:border-red-500 bg-red-950/20',
    },
    {
      name: 'Deepu WhatsApp Web',
      url: 'https://web.whatsapp.com',
      description: 'Open WhatsApp Web to chat with contacts instantly.',
      icon: <MessageCircle size={24} className="text-emerald-400" />,
      color: 'border-emerald-500/30 hover:border-emerald-500 bg-emerald-950/20',
    },
    {
      name: 'PhonePe Official Portal',
      url: 'https://www.phonepe.com',
      description: 'Access PhonePe payments, UPI transfers, and merchant services.',
      icon: <CreditCard size={24} className="text-purple-400" />,
      color: 'border-purple-500/30 hover:border-purple-500 bg-purple-950/20',
    },
    {
      name: 'Facebook Social Network',
      url: 'https://www.facebook.com',
      description: 'Connect with friends, share stories, and explore the social feed.',
      icon: <Facebook size={24} className="text-blue-500" />,
      color: 'border-blue-500/30 hover:border-blue-500 bg-blue-950/20',
    },
    {
      name: 'Google Search Engine',
      url: 'https://www.google.com',
      description: 'Explore the world’s most powerful search engine.',
      icon: <Search size={24} className="text-amber-400" />,
      color: 'border-amber-500/30 hover:border-amber-500 bg-amber-950/20',
    },
  ];

  return (
    <div className="flex-1 bg-slate-950 text-white flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button onClick={onBack} className="p-1.5 hover:bg-slate-800 rounded-full text-slate-300 transition">
            <ArrowLeft size={18} />
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Globe size={18} />
            </div>
            <span className="font-bold text-lg tracking-tight">App Links & Web Hub</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950">
        <div className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-blue-500/30 rounded-2xl p-4 flex items-center space-x-3">
          <Sparkles size={24} className="text-blue-400 flex-shrink-0" />
          <p className="text-xs text-slate-300 leading-relaxed">
            Click any card below to open the application's official live web link in a new browser window.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {links.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-4 rounded-2xl border transition flex items-center justify-between group ${link.color}`}
            >
              <div className="flex items-center space-x-3.5">
                <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center shadow-md">
                  {link.icon}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition">{link.name}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{link.description}</p>
                </div>
              </div>
              <div className="w-9 h-9 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-blue-600 transition shadow">
                <ExternalLink size={16} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
