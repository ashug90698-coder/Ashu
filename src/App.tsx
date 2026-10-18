import { useState } from 'react';
import { AppId, WalletState } from './types';
import { StatusBar } from './components/StatusBar';
import { NavigationDock } from './components/NavigationDock';
import { HomeScreen } from './components/HomeScreen';
import { AshuYouTube } from './apps/AshuYouTube';
import { DeepuWhatsApp } from './apps/DeepuWhatsApp';
import { PhonePeApp } from './apps/PhonePeApp';
import { FacebookApp } from './apps/FacebookApp';
import { GoogleApp } from './apps/GoogleApp';
import { LinkHub } from './apps/LinkHub';
import { RewardsHub } from './apps/RewardsHub';
import { Coins, Sparkles } from 'lucide-react';

export default function App() {
  const [currentApp, setCurrentApp] = useState<AppId>('home');
  const [historyStack, setHistoryStack] = useState<AppId[]>([]);
  const [isPhoneFrame, setIsPhoneFrame] = useState<boolean>(true);

  // Global Wallet State
  const [wallet, setWallet] = useState<WalletState>({
    coins: 2450,
    cashBalance: 1250,
    scratchCards: [
      { id: 'sc1', amount: 150, isScrratched: false },
      { id: 'sc2', amount: 500, isScrratched: false },
    ],
  });

  const [rewardToast, setRewardToast] = useState<string | null>(null);

  const triggerReward = (text: string, coinsEarned = 0) => {
    setWallet((prev) => ({
      ...prev,
      coins: prev.coins + coinsEarned,
    }));
    setRewardToast(text);
    setTimeout(() => setRewardToast(null), 3500);
  };

  const handleOpenApp = (appId: AppId) => {
    if (appId === currentApp) return;
    setHistoryStack((prev) => [...prev, currentApp]);
    setCurrentApp(appId);
  };

  const handleBack = () => {
    if (historyStack.length > 0) {
      const prev = historyStack[historyStack.length - 1];
      setHistoryStack((prevStack) => prevStack.slice(0, -1));
      setCurrentApp(prev);
    } else {
      setCurrentApp('home');
    }
  };

  const getAppName = () => {
    switch (currentApp) {
      case 'ashu': return 'Ashu YouTube';
      case 'deepu': return 'Deepu WhatsApp';
      case 'phonepe': return 'Deepu Gupta (UPI)';
      case 'facebook': return 'Facebook';
      case 'google': return 'Ashu Gupta';
      case 'links': return 'Web Links Hub';
      case 'rewards': return 'Rewards Club';
      case 'settings': return 'Settings';
      default: return undefined;
    }
  };

  const renderCurrentApp = () => {
    switch (currentApp) {
      case 'ashu':
        return <AshuYouTube onBack={() => setCurrentApp('home')} onEarnReward={(msg, coins) => triggerReward(msg, coins)} />;
      case 'deepu':
        return <DeepuWhatsApp onBack={() => setCurrentApp('home')} onEarnReward={(msg, coins) => triggerReward(msg, coins)} />;
      case 'phonepe':
        return <PhonePeApp onBack={() => setCurrentApp('home')} onEarnReward={(msg, cashback) => {
          setWallet(prev => ({
            ...prev,
            cashBalance: prev.cashBalance + cashback,
            scratchCards: [...prev.scratchCards, { id: Date.now().toString(), amount: cashback, isScrratched: true }]
          }));
          triggerReward(msg);
        }} />;
      case 'facebook':
        return <FacebookApp onBack={() => setCurrentApp('home')} onEarnReward={(msg, coins) => triggerReward(msg, coins)} />;
      case 'google':
        return <GoogleApp onBack={() => setCurrentApp('home')} onOpenApp={handleOpenApp} onEarnReward={(msg, coins) => triggerReward(msg, coins)} />;
      case 'links':
        return <LinkHub onBack={() => setCurrentApp('home')} />;
      case 'rewards':
        return <RewardsHub wallet={wallet} onUpdateWallet={setWallet} onBack={() => setCurrentApp('home')} />;
      case 'settings':
        return (
          <div className="flex-1 bg-slate-950 text-white p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold">Ashu OS Settings</h2>
              <p className="text-xs text-slate-400 mt-1">Version 2.4.0 • Built for Ashu</p>
              <div className="mt-4 space-y-3">
                <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 flex justify-between items-center">
                  <span className="text-xs">Reward System</span>
                  <span className="text-xs text-emerald-400 font-semibold">Active (+Coins & Cash)</span>
                </div>
                <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 flex justify-between items-center">
                  <span className="text-xs">Network Connection</span>
                  <span className="text-xs text-blue-400 font-semibold">Ashu 5G (Ultra)</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setCurrentApp('home')}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-bold transition"
            >
              Back to Home
            </button>
          </div>
        );
      case 'home':
      default:
        return <HomeScreen onOpenApp={handleOpenApp} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 flex items-center justify-center p-0 sm:p-4 select-none">
      {/* Outer Wrapper: Phone Frame vs Full View */}
      <div
        className={`${
          isPhoneFrame
            ? 'w-full sm:w-[410px] h-screen sm:h-[840px] sm:rounded-[44px] sm:shadow-2xl sm:border-[8px] sm:border-slate-800'
            : 'w-full h-screen sm:rounded-2xl sm:shadow-2xl'
        } bg-slate-950 flex flex-col overflow-hidden relative transition-all duration-300`}
      >
        <StatusBar appName={getAppName()} isPhoneFrame={isPhoneFrame} />

        {/* Global Floating Reward Toast */}
        {rewardToast && (
          <div className="absolute top-12 left-1/2 -translate-x-1/2 z-50 bg-amber-500 text-slate-950 px-4 py-2 rounded-2xl font-bold text-xs shadow-2xl flex items-center space-x-2 animate-bounce">
            <Sparkles size={15} />
            <span>{rewardToast}</span>
          </div>
        )}

        {/* Quick Wallet Bar in Header if on Home */}
        {currentApp === 'home' && (
          <div
            onClick={() => handleOpenApp('rewards')}
            className="bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-600/20 border-b border-amber-500/30 px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-amber-500/30 transition"
          >
            <div className="flex items-center space-x-2">
              <Coins size={16} className="text-amber-400" />
              <span className="text-xs font-bold text-amber-300">{wallet.coins.toLocaleString()} Coins</span>
            </div>
            <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 bg-emerald-500/20 px-2.5 py-0.5 rounded-full">
              <span>₹{wallet.cashBalance} Cash</span>
              <span className="text-[10px] bg-emerald-500 text-slate-950 px-1 rounded">Rewards 🎁</span>
            </div>
          </div>
        )}

        {renderCurrentApp()}
        <NavigationDock
          currentApp={currentApp}
          onNavigate={handleOpenApp}
          onBack={handleBack}
          isPhoneFrame={isPhoneFrame}
          onToggleFrame={() => setIsPhoneFrame(!isPhoneFrame)}
        />
      </div>
    </div>
  );
}
