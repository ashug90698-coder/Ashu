import { useState } from 'react';
import { ChatContact } from '../types';
import { Search, Phone, Video, Send, ArrowLeft, CheckCheck, Smile, Paperclip, MoreVertical, ExternalLink } from 'lucide-react';

interface DeepuWhatsAppProps {
  onBack: () => void;
  onEarnReward: (msg: string, coins: number) => void;
}

const INITIAL_CONTACTS: ChatContact[] = [
  {
    id: '1',
    name: 'Deepu (Bestie ❤️)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    lastMessage: 'Call me when you are free! Let us code the new super app.',
    time: '12:15 PM',
    unreadCount: 2,
    online: true,
    about: 'Busy building dreams 🚀',
    messages: [
      { id: 'm1', senderId: '1', text: 'Hey Ashu! Did you test the YouTube app?', timestamp: '12:00 PM', isMe: false },
      { id: 'm2', senderId: 'me', text: 'Yes Deepu, it has gorgeous video player and trending feed!', timestamp: '12:05 PM', isMe: true, status: 'read' },
      { id: 'm3', senderId: '1', text: 'Call me when you are free! Let us code the new super app.', timestamp: '12:15 PM', isMe: false },
    ],
  },
  {
    id: '2',
    name: 'Ashu Developer Hub',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    lastMessage: 'Deployment successful on Cloud Run!',
    time: '11:30 AM',
    unreadCount: 0,
    online: true,
    about: 'Official notifications channel',
    messages: [
      { id: 'm1', senderId: '2', text: 'Deployment successful on Cloud Run!', timestamp: '11:30 AM', isMe: false },
    ],
  },
  {
    id: '3',
    name: 'PhonePe Rewards Club',
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
    lastMessage: 'You received ₹500 cashback from cashback offer.',
    time: 'Yesterday',
    unreadCount: 0,
    online: false,
    about: 'UPI Instant Transfers',
    messages: [
      { id: 'm1', senderId: '3', text: 'You received ₹500 cashback from cashback offer.', timestamp: 'Yesterday', isMe: false },
    ],
  },
  {
    id: '4',
    name: 'Facebook Social Feed',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    lastMessage: 'Rahul tagged you in a new post.',
    time: 'Yesterday',
    unreadCount: 1,
    online: true,
    about: 'Connect with friends',
    messages: [
      { id: 'm1', senderId: '4', text: 'Rahul tagged you in a new post.', timestamp: 'Yesterday', isMe: false },
    ],
  },
];

export function DeepuWhatsApp({ onBack, onEarnReward }: DeepuWhatsAppProps) {
  const [contacts, setContacts] = useState<ChatContact[]>(INITIAL_CONTACTS);
  const [activeContactId, setActiveContactId] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const activeContact = contacts.find((c) => c.id === activeContactId);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeContactId) return;

    const newMessage = {
      id: Date.now().toString(),
      senderId: 'me',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
      status: 'delivered' as const,
    };

    setContacts(
      contacts.map((c) => {
        if (c.id === activeContactId) {
          return {
            ...c,
            lastMessage: inputText,
            time: 'Just now',
            messages: [...c.messages, newMessage],
          };
        }
        return c;
      })
    );
    setInputText('');
    onEarnReward('Message Sent! +20 Coins 🪙', 20);

    // Simulate reply after 2 seconds
    setTimeout(() => {
      const replyMessage = {
        id: (Date.now() + 1).toString(),
        senderId: activeContactId,
        text: 'Got it! This super app is fantastic ✨',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: false,
      };
      setContacts((prevContacts) =>
        prevContacts.map((c) => {
          if (c.id === activeContactId) {
            return {
              ...c,
              lastMessage: replyMessage.text,
              time: 'Just now',
              messages: [...c.messages, replyMessage],
            };
          }
          return c;
        })
      );
    }, 2000);
  };

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 bg-slate-950 text-white flex flex-col overflow-hidden">
      {/* WhatsApp Header */}
      <div className="bg-[#075e54] text-white px-4 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-3">
          <button onClick={onBack} className="p-1.5 hover:bg-black/10 rounded-full transition">
            <ArrowLeft size={18} />
          </button>
          <div className="flex items-center space-x-2">
            <span className="font-bold text-lg tracking-tight">Deepu <span className="text-emerald-300 font-normal text-xs uppercase tracking-widest ml-1">WhatsApp</span></span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <a
            href="https://web.whatsapp.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow transition"
          >
            <span>WhatsApp Web</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>

      {activeContact ? (
        /* Chat Room */
        <div className="flex-1 flex flex-col bg-[#111b21] overflow-hidden">
          {/* Chat Header */}
          <div className="bg-[#202c33] px-4 py-2.5 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveContactId(null)}>
              <button className="p-1 hover:bg-white/10 rounded-full sm:hidden">
                <ArrowLeft size={16} />
              </button>
              <img src={activeContact.avatar} alt={activeContact.name} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <h3 className="text-sm font-semibold text-white">{activeContact.name}</h3>
                <p className="text-[11px] text-emerald-400">{activeContact.online ? 'Online' : 'Offline'}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-slate-300">
              <button className="p-2 hover:bg-white/10 rounded-full transition"><Video size={18} /></button>
              <button className="p-2 hover:bg-white/10 rounded-full transition"><Phone size={17} /></button>
              <button className="p-2 hover:bg-white/10 rounded-full transition"><MoreVertical size={17} /></button>
            </div>
          </div>

          {/* Messages List */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[radial-gradient(#1f2c34_1px,transparent_1px)] bg-[size:16px_16px]">
            <div className="flex justify-center">
              <span className="bg-[#202c33] text-slate-400 text-[10px] px-3 py-1 rounded-lg uppercase tracking-wider shadow-sm">
                Messages are end-to-end encrypted
              </span>
            </div>

            {activeContact.messages.map((m) => (
              <div key={m.id} className={`flex ${m.isMe ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[75%] rounded-2xl px-3.5 py-2 shadow-md relative text-xs ${
                    m.isMe ? 'bg-[#005c4b] text-white rounded-tr-none' : 'bg-[#202c33] text-slate-100 rounded-tl-none'
                  }`}
                >
                  <p className="leading-relaxed">{m.text}</p>
                  <div className="flex items-center justify-end space-x-1 mt-1 text-[10px] text-slate-300">
                    <span>{m.timestamp}</span>
                    {m.isMe && <CheckCheck size={13} className="text-blue-400" />}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <form onSubmit={handleSendMessage} className="bg-[#202c33] px-3 py-2.5 flex items-center space-x-2 border-t border-slate-800">
            <button type="button" className="p-2 text-slate-400 hover:text-white transition"><Smile size={20} /></button>
            <button type="button" className="p-2 text-slate-400 hover:text-white transition"><Paperclip size={18} /></button>
            <input
              type="text"
              placeholder="Type a message..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-[#2a3942] text-white placeholder-slate-400 text-xs rounded-xl px-4 py-2.5 focus:outline-none"
            />
            <button
              type="submit"
              className="p-2.5 bg-[#00a884] hover:bg-[#008f72] text-white rounded-full transition shadow-md"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      ) : (
        /* Contact List */
        <div className="flex-1 flex flex-col bg-[#111b21] overflow-hidden">
          <div className="p-3 bg-[#111b21] border-b border-slate-800">
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search Deepu chats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#202c33] text-white placeholder-slate-400 text-xs rounded-xl pl-9 pr-4 py-2 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => setActiveContactId(contact.id)}
                className="flex items-center space-x-3 px-4 py-3 hover:bg-[#202c33]/60 cursor-pointer transition"
              >
                <div className="relative">
                  <img src={contact.avatar} alt={contact.name} className="w-12 h-12 rounded-full object-cover" />
                  {contact.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#111b21]"></span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-white truncate">{contact.name}</h3>
                    <span className="text-[11px] text-slate-400">{contact.time}</span>
                  </div>
                  <p className="text-xs text-slate-400 truncate mt-0.5">{contact.lastMessage}</p>
                </div>

                {contact.unreadCount > 0 && (
                  <span className="bg-[#00a884] text-slate-950 font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                    {contact.unreadCount}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
