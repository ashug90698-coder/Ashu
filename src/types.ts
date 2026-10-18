export type AppId = 'home' | 'ashu' | 'deepu' | 'phonepe' | 'facebook' | 'google' | 'links' | 'rewards' | 'settings';

export interface WalletState {
  coins: number;
  cashBalance: number;
  scratchCards: { id: string; amount: number; isScrratched: boolean }[];
}

export interface Video {
  id: string;
  title: string;
  channel: string;
  views: string;
  timestamp: string;
  thumbnail: string;
  duration: string;
  videoUrl: string; // YouTube watch or embed URL
  description: string;
  likes: string;
  subscribers: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isMe: boolean;
  status?: 'sent' | 'delivered' | 'read';
}

export interface ChatContact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  online: boolean;
  about: string;
  messages: ChatMessage[];
}

export interface Transaction {
  id: string;
  title: string;
  recipient: string;
  amount: number;
  type: 'sent' | 'received';
  timestamp: string;
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
  upiId: string;
}

export interface Post {
  id: string;
  author: string;
  avatar: string;
  timestamp: string;
  content: string;
  image?: string;
  likes: number;
  commentsCount: number;
  shares: number;
  isLiked: boolean;
}
