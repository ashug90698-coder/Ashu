import { useState } from 'react';
import { WalletState } from '../types';
import { Gift, Sparkles, Award, ArrowLeft, CheckCircle, Coins, Wallet } from 'lucide-react';

interface RewardsHubProps {
  wallet: WalletState;
  onUpdateWallet: (updater: (prev: WalletState) => WalletState) => void;
  onBack: () => void;
}

export function RewardsHub({ wallet, onUpdateWallet, onBack }: RewardsHubProps) {
  const [scratchMessage, setScratchMessage] = useState<string | null>(null);

  const handleScratchCard = (cardId: string, amount: number) => {
    onUpdateWallet((prev) => {
      const updatedCards = prev.scratchCards.map((card) =>
        card.id === cardId ? { ...card, isScrratched: true } : card
      );
      return {
        ...prev,
        cashBalance: prev.cashBalance + amount,
        scratchCards: updatedCards,
      };
    });
    setScratchMessage(`You won ₹${amount} cashback! Added to your wallet.`);
    setTimeout(() => setScratchMessage(null), 4000);
  };

  const handleDailyCheckIn = () => {
    onUpdateWallet((prev) => ({
      ...prev,
      coins: prev.coins + 100,
    }));
    setScratchMessage('Daily bonus claimed! +100 Ashu Coins added.');
    setTimeout(() => setScratchMessage(null), 4000);
  };

  return (
    <div className="flex-1 bg-slate-950 text-white flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-yellow-600 text-white px-4 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-3">
          <button onClick={onBack} className="p-1.5 hover:bg-black/10 rounded-full transition">
            <ArrowLeft size={18} />
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-black/20 flex items-center justify-center text-white">
              <Gift size={18} />
            </div>
            <span className="font-bold text-lg tracking-tight">Ashu Rewards Club</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950">
        {/* Toast Notification */}
        {scratchMessage && (
          <div className="bg-emerald-500/20 border border-emerald-500 text-emerald-300 p-3 rounded-2xl flex items-center space-x-3 text-xs animate-in fade-in">
            <CheckCircle size={18} className="flex-shrink-0 text-emerald-400" />
            <span className="font-semibold">{scratchMessage}</span>
          </div>
        )}

        {/* Wallet Overview */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-amber-500/20 to-yellow-600/20 border border-amber-500/40 rounded-2xl p-4 flex flex-col justify-between shadow-lg">
            <div className="flex items-center justify-between text-amber-400">
              <Coins size={22} />
              <span className="text-[10px] bg-amber-500/20 px-2 py-0.5 rounded font-bold">Ashu Coins</span>
            </div>
            <div className="mt-3">
              <p className="text-2xl font-black text-white">{wallet.coins.toLocaleString()}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Earned from all apps</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-500/20 to-green-600/20 border border-emerald-500/40 rounded-2xl p-4 flex flex-col justify-between shadow-lg">
            <div className="flex items-center justify-between text-emerald-400">
              <Wallet size={22} />
              <span className="text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded font-bold">Cash Wallet</span>
            </div>
            <div className="mt-3">
              <p className="text-2xl font-black text-white">₹{wallet.cashBalance.toLocaleString()}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">From scratch cards & UPI</p>
            </div>
          </div>
        </div>

        {/* Daily Bonus Card */}
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-950 rounded-2xl p-4 border border-purple-500/40 flex items-center justify-between shadow-xl">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center text-white shadow">
              <Sparkles size={24} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Daily Check-In Bonus</h3>
              <p className="text-xs text-purple-300">Claim +100 Ashu Coins instantly today</p>
            </div>
          </div>
          <button
            onClick={handleDailyCheckIn}
            className="px-4 py-2 bg-white text-slate-900 hover:bg-slate-100 font-bold rounded-xl text-xs shadow transition"
          >
            Claim
          </button>
        </div>

        {/* Scratch Cards Section */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <Award size={16} className="text-amber-400" />
            <span>Your Scratch Cards ({wallet.scratchCards.filter(c => !c.isScrratched).length} Unlocked)</span>
          </h3>

          <div className="grid grid-cols-2 gap-3">
            {wallet.scratchCards.map((card) => (
              <div
                key={card.id}
                className={`p-4 rounded-2xl border transition flex flex-col justify-between items-center text-center shadow-lg ${
                  card.isScrratched
                    ? 'bg-slate-900 border-slate-800 opacity-80'
                    : 'bg-gradient-to-tr from-amber-950/60 to-yellow-950/60 border-amber-500/50 hover:border-amber-400 cursor-pointer animate-pulse'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mb-2">
                  <Gift size={20} />
                </div>
                {card.isScrratched ? (
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase">ScrATCHED</p>
                    <p className="text-xl font-black text-emerald-400 mt-0.5">₹{card.amount}</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-amber-200">Scratch & Win!</p>
                    <button
                      onClick={() => handleScratchCard(card.id, card.amount)}
                      className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs shadow transition"
                    >
                      Scratch Now
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
