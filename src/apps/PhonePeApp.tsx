import { useState } from 'react';
import { Transaction } from '../types';
import { Send, QrCode, Smartphone, Landmark, ShieldCheck, History, ArrowUpRight, ArrowDownLeft, CheckCircle, ExternalLink, ArrowLeft } from 'lucide-react';

interface PhonePeAppProps {
  onBack: () => void;
  onEarnReward: (msg: string, cashback: number) => void;
}

const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 't1',
    title: 'Paid to Deepu UPI',
    recipient: 'deepu@ybl',
    amount: 1500,
    type: 'sent',
    timestamp: 'Today, 10:45 AM',
    status: 'SUCCESS',
    upiId: '9876543210@ybl',
  },
  {
    id: 't2',
    title: 'Received from Ashu YT',
    recipient: 'ashu@oksbi',
    amount: 5000,
    type: 'received',
    timestamp: 'Yesterday, 4:20 PM',
    status: 'SUCCESS',
    upiId: 'ashu@oksbi',
  },
  {
    id: 't3',
    title: 'Mobile Recharge (Jio 5G)',
    recipient: 'Jio Prepaid',
    amount: 349,
    type: 'sent',
    timestamp: 'Oct 4, 2:10 PM',
    status: 'SUCCESS',
    upiId: 'jio@paytm',
  },
];

export function PhonePeApp({ onBack, onEarnReward }: PhonePeAppProps) {
  const [balance, setBalance] = useState<number | null>(48250);
  const [showBalance, setShowBalance] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [activeTab, setActiveTab] = useState<'home' | 'send' | 'history'>('home');

  // Send Money State
  const [recipientUpi, setRecipientUpi] = useState('');
  const [sendAmount, setSendAmount] = useState('');
  const [successModal, setSuccessModal] = useState<Transaction | null>(null);

  const handleSendMoney = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(sendAmount);
    if (!recipientUpi || isNaN(amt) || amt <= 0) return;

    const newTx: Transaction = {
      id: Date.now().toString(),
      title: `Paid to ${recipientUpi}`,
      recipient: recipientUpi,
      amount: amt,
      type: 'sent',
      timestamp: 'Just now',
      status: 'SUCCESS',
      upiId: recipientUpi,
    };

    setTransactions([newTx, ...transactions]);
    if (balance !== null) setBalance(balance - amt);
    setSuccessModal(newTx);
    setRecipientUpi('');
    setSendAmount('');
    onEarnReward('UPI Payment Successful! Scratch Card Unlocked 🎁 +₹100 Cashback!', 100);
  };

  return (
    <div className="flex-1 bg-slate-950 text-white flex flex-col overflow-hidden">
      {/* PhonePe Header */}
      <div className="bg-[#5f259f] text-white px-4 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-3">
          <button onClick={onBack} className="p-1.5 hover:bg-black/10 rounded-full transition">
            <ArrowLeft size={18} />
          </button>
          <div className="flex items-center space-x-2">
            <span className="font-bold text-lg tracking-tight">Deepu Gupta <span className="text-purple-300 font-normal text-xs uppercase tracking-widest ml-1">UPI</span></span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <a
            href="https://www.phonepe.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 px-3 py-1.5 bg-purple-700 hover:bg-purple-600 text-white rounded-lg text-xs font-semibold shadow transition"
          >
            <span>PhonePe Web</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>

      {/* Success Modal */}
      {successModal && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-slate-900 border border-purple-500/50 rounded-3xl p-6 text-center max-w-xs w-full shadow-2xl space-y-4 animate-in fade-in zoom-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle size={36} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Payment Successful!</h2>
              <p className="text-2xl font-black text-emerald-400 mt-1">₹{successModal.amount}</p>
              <p className="text-xs text-slate-400 mt-1">Sent to {successModal.recipient}</p>
            </div>
            <button
              onClick={() => setSuccessModal(null)}
              className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl text-xs transition"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950">
        {/* Balance Card */}
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-950 rounded-2xl p-4 border border-purple-500/30 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-purple-300 font-medium">Ashu Savings Account</p>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-2xl font-black text-white">
                  {showBalance ? `₹${balance?.toLocaleString()}` : '••••••••'}
                </span>
                <button
                  onClick={() => setShowBalance(!showBalance)}
                  className="text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded-lg text-purple-200 transition"
                >
                  {showBalance ? 'Hide' : 'Check Balance'}
                </button>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-purple-300">
              <ShieldCheck size={22} />
            </div>
          </div>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-4 gap-3">
          <button
            onClick={() => setActiveTab('send')}
            className="bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-2xl p-3 flex flex-col items-center justify-center space-y-2 transition shadow-md"
          >
            <div className="w-11 h-11 rounded-2xl bg-purple-600/20 text-purple-400 flex items-center justify-center">
              <Send size={22} />
            </div>
            <span className="text-xs font-semibold text-slate-200">To UPI ID</span>
          </button>
          <button
            onClick={() => setActiveTab('send')}
            className="bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-2xl p-3 flex flex-col items-center justify-center space-y-2 transition shadow-md"
          >
            <div className="w-11 h-11 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
              <Smartphone size={22} />
            </div>
            <span className="text-xs font-semibold text-slate-200">To Mobile</span>
          </button>
          <button
            onClick={() => setActiveTab('send')}
            className="bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-2xl p-3 flex flex-col items-center justify-center space-y-2 transition shadow-md"
          >
            <div className="w-11 h-11 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
              <QrCode size={22} />
            </div>
            <span className="text-xs font-semibold text-slate-200">Scan QR</span>
          </button>
          <button
            onClick={() => setActiveTab('home')}
            className="bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-2xl p-3 flex flex-col items-center justify-center space-y-2 transition shadow-md"
          >
            <div className="w-11 h-11 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
              <Landmark size={22} />
            </div>
            <span className="text-xs font-semibold text-slate-200">Bank Bal</span>
          </button>
        </div>

        {/* Send Money Form or History */}
        {activeTab === 'send' ? (
          <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Send size={16} className="text-purple-400" />
              <span>Send Money via UPI</span>
            </h3>
            <form onSubmit={handleSendMoney} className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Recipient UPI ID or Phone</label>
                <input
                  type="text"
                  placeholder="e.g. deepu@ybl or 9876543210"
                  value={recipientUpi}
                  onChange={(e) => setRecipientUpi(e.target.value)}
                  className="w-full bg-slate-800 text-white placeholder-slate-500 text-xs rounded-xl px-3 py-2.5 border border-slate-700 focus:outline-none focus:border-purple-500"
                  required
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Amount (₹)</label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={sendAmount}
                  onChange={(e) => setSendAmount(e.target.value)}
                  className="w-full bg-slate-800 text-white placeholder-slate-500 text-xs rounded-xl px-3 py-2.5 border border-slate-700 focus:outline-none focus:border-purple-500"
                  required
                />
              </div>
              <div className="flex space-x-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-purple-600/30 transition"
                >
                  Pay Securely
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('home')}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-xs transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <History size={16} className="text-purple-400" />
                <span>Recent Transactions</span>
              </h3>
            </div>

            <div className="space-y-2.5">
              {transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-3 bg-slate-800/60 rounded-xl border border-slate-700/50">
                  <div className="flex items-center space-x-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center ${tx.type === 'sent' ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                      {tx.type === 'sent' ? <ArrowUpRight size={18} /> : <ArrowDownLeft size={18} />}
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-white">{tx.title}</h4>
                      <p className="text-[10px] text-slate-400">{tx.timestamp}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-bold ${tx.type === 'sent' ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {tx.type === 'sent' ? '-' : '+'}₹{tx.amount}
                    </span>
                    <p className="text-[10px] text-emerald-400 font-medium">{tx.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
