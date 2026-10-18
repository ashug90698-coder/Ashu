import { useState } from 'react';
import { Post } from '../types';
import { ThumbsUp, MessageCircle, Share2, Image, Video, Smile, ExternalLink, ArrowLeft, Send } from 'lucide-react';

interface FacebookAppProps {
  onBack: () => void;
  onEarnReward: (msg: string, coins: number) => void;
}

const INITIAL_POSTS: Post[] = [
  {
    id: 'p1',
    author: 'Deepu Sharma',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    timestamp: '2 hours ago',
    content: 'Just launched Ashu Super App with Deepu WhatsApp and Ashu YouTube! Absolutely loving the seamless speed 🚀✨',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    likes: 142,
    commentsCount: 18,
    shares: 12,
    isLiked: false,
  },
  {
    id: 'p2',
    author: 'Ashu Tech Updates',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    timestamp: '5 hours ago',
    content: 'Cloud deployment is fully live and operational. Check out the web links hub for direct access!',
    likes: 89,
    commentsCount: 7,
    shares: 5,
    isLiked: true,
  },
];

export function FacebookApp({ onBack, onEarnReward }: FacebookAppProps) {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [newPostContent, setNewPostContent] = useState('');

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    const newPost: Post = {
      id: Date.now().toString(),
      author: 'Ashu User',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      timestamp: 'Just now',
      content: newPostContent,
      likes: 1,
      commentsCount: 0,
      shares: 0,
      isLiked: true,
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
    onEarnReward('Post Published! +30 Coins 🪙', 30);
  };

  const toggleLike = (id: string) => {
    setPosts(posts.map(p => {
      if (p.id === id) {
        return {
          ...p,
          isLiked: !p.isLiked,
          likes: p.isLiked ? p.likes - 1 : p.likes + 1,
        };
      }
      return p;
    }));
  };

  return (
    <div className="flex-1 bg-slate-950 text-white flex flex-col overflow-hidden">
      {/* Facebook Header */}
      <div className="bg-[#1877f2] text-white px-4 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-3">
          <button onClick={onBack} className="p-1.5 hover:bg-black/10 rounded-full transition">
            <ArrowLeft size={18} />
          </button>
          <div className="flex items-center space-x-2">
            <span className="font-bold text-lg tracking-tight">facebook</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 px-3 py-1.5 bg-blue-700 hover:bg-blue-600 text-white rounded-lg text-xs font-semibold shadow transition"
          >
            <span>Open Facebook</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950">
        {/* Create Post Box */}
        <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-3">
          <div className="flex items-center space-x-3">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"
              alt="Ashu"
              className="w-10 h-10 rounded-full object-cover"
            />
            <input
              type="text"
              placeholder="What's on your mind, Ashu?"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              className="flex-1 bg-slate-800 text-white placeholder-slate-400 text-xs rounded-full px-4 py-2.5 focus:outline-none border border-slate-700"
            />
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-slate-300">
            <button className="flex items-center space-x-1.5 text-xs font-semibold hover:text-blue-400 transition">
              <Video size={16} className="text-rose-500" />
              <span>Live Video</span>
            </button>
            <button className="flex items-center space-x-1.5 text-xs font-semibold hover:text-blue-400 transition">
              <Image size={16} className="text-emerald-500" />
              <span>Photo/Video</span>
            </button>
            <button
              onClick={handleCreatePost}
              className="px-4 py-1.5 bg-[#1877f2] hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition shadow"
            >
              Post
            </button>
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-lg">
              <div className="p-4 flex items-center space-x-3">
                <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h3 className="text-sm font-semibold text-white">{post.author}</h3>
                  <p className="text-[10px] text-slate-400">{post.timestamp}</p>
                </div>
              </div>

              <div className="px-4 pb-3">
                <p className="text-xs text-slate-200 leading-relaxed">{post.content}</p>
              </div>

              {post.image && (
                <div className="w-full aspect-video bg-slate-800">
                  <img src={post.image} alt="Post media" className="w-full h-full object-cover" />
                </div>
              )}

              <div className="px-4 py-2.5 flex items-center justify-between text-xs text-slate-400 border-b border-slate-800">
                <span>{post.likes} likes</span>
                <div className="space-x-3">
                  <span>{post.commentsCount} comments</span>
                  <span>{post.shares} shares</span>
                </div>
              </div>

              <div className="grid grid-cols-3 py-1 text-slate-300">
                <button
                  onClick={() => toggleLike(post.id)}
                  className={`flex items-center justify-center space-x-1.5 py-2 hover:bg-slate-800 transition text-xs font-semibold ${post.isLiked ? 'text-blue-400' : ''}`}
                >
                  <ThumbsUp size={16} />
                  <span>Like</span>
                </button>
                <button className="flex items-center justify-center space-x-1.5 py-2 hover:bg-slate-800 transition text-xs font-semibold">
                  <MessageCircle size={16} />
                  <span>Comment</span>
                </button>
                <button className="flex items-center justify-center space-x-1.5 py-2 hover:bg-slate-800 transition text-xs font-semibold">
                  <Share2 size={16} />
                  <span>Share</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
