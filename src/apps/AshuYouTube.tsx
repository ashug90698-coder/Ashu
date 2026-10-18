import { useState } from 'react';
import { Video } from '../types';
import { Search, ThumbsUp, MessageSquare, Share2, Bell, ExternalLink, Play, ArrowLeft, Flame, Compass, Library, CheckCircle } from 'lucide-react';

interface AshuYouTubeProps {
  onBack: () => void;
  onEarnReward: (msg: string, coins: number) => void;
}

const INITIAL_VIDEOS: Video[] = [
  {
    id: '1',
    title: 'Ashu Special Mix - Top Hits 2026 (Live Streaming 4K)',
    channel: 'Ashu Music Official',
    views: '1.2M views',
    timestamp: '2 hours ago',
    thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    duration: '3:45:20',
    videoUrl: 'https://www.youtube.com/embed/jfKfPfyJRdk',
    description: 'Welcome to Ashu YouTube! Enjoy non-stop trending music and immersive entertainment.',
    likes: '85K',
    subscribers: '4.5M',
  },
  {
    id: '2',
    title: 'Building a Full Super App with React & AI in 10 Minutes',
    channel: 'Ashu Tech Tutorials',
    views: '450K views',
    timestamp: '1 day ago',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    duration: '14:10',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'Learn how to build stunning web applications with modern AI tools and React.',
    likes: '42K',
    subscribers: '1.2M',
  },
  {
    id: '3',
    title: 'Cinematic Travel Vlog: Exploring Himalayan Paradise with Ashu',
    channel: 'Ashu Vlogs',
    views: '890K views',
    timestamp: '3 days ago',
    thumbnail: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    duration: '22:05',
    videoUrl: 'https://www.youtube.com/embed/L_LUpnjgPso',
    description: 'Join Ashu on an unforgettable journey across breathtaking mountain ranges.',
    likes: '95K',
    subscribers: '2.8M',
  },
  {
    id: '4',
    title: 'Top 10 Coding Interview Tips for Senior Developers 2026',
    channel: 'Ashu Code Lab',
    views: '210K views',
    timestamp: '5 days ago',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    duration: '18:30',
    videoUrl: 'https://www.youtube.com/embed/5qap5aO4i9A',
    description: 'Master technical interviews with these expert tips and strategies.',
    likes: '18K',
    subscribers: '890K',
  },
];

export function AshuYouTube({ onBack, onEarnReward }: AshuYouTubeProps) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'home' | 'trending' | 'subscriptions'>('home');
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([
    { id: '1', user: 'Deepu', text: 'Amazing video Ashu! Loved it ❤️', time: '1h ago' },
    { id: '2', user: 'Rahul Verma', text: 'Best channel on YouTube right now!', time: '3h ago' },
  ]);
  const [newComment, setNewComment] = useState('');

  const filteredVideos = INITIAL_VIDEOS.filter(v =>
    v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.channel.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectVideo = (video: Video) => {
    setSelectedVideo(video);
    onEarnReward('Watched Ashu Video! +50 Coins 🪙', 50);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([{ id: Date.now().toString(), user: 'You', text: newComment, time: 'Just now' }, ...comments]);
    setNewComment('');
    onEarnReward('Comment Posted! +30 Coins 🪙', 30);
  };

  return (
    <div className="flex-1 bg-slate-950 text-white flex flex-col overflow-hidden">
      {/* YouTube Top Bar */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button onClick={onBack} className="p-1.5 hover:bg-slate-800 rounded-full text-slate-300 transition">
            <ArrowLeft size={18} />
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white shadow-md">
              <Play size={16} className="fill-white" />
            </div>
            <span className="font-bold text-lg tracking-tight text-white">Ashu <span className="text-red-500 font-normal text-xs uppercase tracking-widest ml-1">YouTube</span></span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-semibold shadow transition"
          >
            <span>Open YouTube</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>

      {/* Search & Categories */}
      <div className="bg-slate-900/60 px-4 py-2.5 border-b border-slate-800 space-y-2">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search Ashu videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800 text-white placeholder-slate-400 text-sm rounded-xl pl-9 pr-4 py-2 border border-slate-700 focus:outline-none focus:border-red-500"
          />
        </div>

        <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition ${activeTab === 'home' ? 'bg-white text-slate-900' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
          >
            All Videos
          </button>
          <button
            onClick={() => setActiveTab('trending')}
            className={`flex items-center space-x-1 px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition ${activeTab === 'trending' ? 'bg-white text-slate-900' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
          >
            <Flame size={13} className="text-red-500" />
            <span>Trending</span>
          </button>
          <button
            onClick={() => setActiveTab('subscriptions')}
            className={`flex items-center space-x-1 px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition ${activeTab === 'subscriptions' ? 'bg-white text-slate-900' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
          >
            <Library size={13} />
            <span>Subscriptions</span>
          </button>
        </div>
      </div>

      {/* Main Content / Video Player Modal */}
      {selectedVideo ? (
        <div className="flex-1 overflow-y-auto flex flex-col bg-slate-950">
          <div className="relative w-full aspect-video bg-black">
            <iframe
              src={`${selectedVideo.videoUrl}?autoplay=1`}
              title={selectedVideo.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <div className="p-4 space-y-4">
            <div>
              <h2 className="text-base font-bold text-white leading-snug">{selectedVideo.title}</h2>
              <p className="text-xs text-slate-400 mt-1">{selectedVideo.views} • {selectedVideo.timestamp}</p>
            </div>

            <div className="flex items-center justify-between py-2 border-y border-slate-800">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-red-600 to-amber-500 flex items-center justify-center font-bold text-white">
                  A
                </div>
                <div>
                  <div className="flex items-center space-x-1">
                    <span className="font-semibold text-sm text-white">{selectedVideo.channel}</span>
                    <CheckCircle size={13} className="text-blue-400 fill-blue-400/20" />
                  </div>
                  <p className="text-xs text-slate-400">{selectedVideo.subscribers} subscribers</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setLiked(!liked)}
                  className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-semibold transition ${liked ? 'bg-red-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'}`}
                >
                  <ThumbsUp size={14} />
                  <span>{liked ? 'Liked' : selectedVideo.likes}</span>
                </button>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full text-xs font-semibold"
                >
                  Close Player
                </button>
              </div>
            </div>

            <div className="bg-slate-900 rounded-xl p-3 text-xs text-slate-300">
              <p>{selectedVideo.description}</p>
            </div>

            {/* Comments Section */}
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-semibold text-white flex items-center space-x-2">
                <MessageSquare size={16} />
                <span>Comments ({comments.length})</span>
              </h3>

              <form onSubmit={handleAddComment} className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Add a comment as Ashu..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1 bg-slate-900 text-white placeholder-slate-500 text-xs rounded-xl px-3 py-2 border border-slate-800 focus:outline-none focus:border-red-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold transition"
                >
                  Post
                </button>
              </form>

              <div className="space-y-2 pt-1">
                {comments.map((c) => (
                  <div key={c.id} className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-red-400">{c.user}</span>
                      <span className="text-[10px] text-slate-500">{c.time}</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1">{c.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                onClick={() => handleSelectVideo(video)}
                className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-red-500/50 transition cursor-pointer group shadow-lg"
              >
                <div className="relative aspect-video bg-slate-800 overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 rounded text-[10px] font-semibold text-white">
                    {video.duration}
                  </div>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition transform scale-75 group-hover:scale-100 shadow-xl">
                      <Play size={20} className="fill-white ml-0.5" />
                    </div>
                  </div>
                </div>

                <div className="p-3 flex space-x-3">
                  <div className="w-9 h-9 rounded-full bg-red-600 flex-shrink-0 flex items-center justify-center font-bold text-white text-sm">
                    {video.channel.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-white truncate group-hover:text-red-400 transition">
                      {video.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">{video.channel}</p>
                    <p className="text-[11px] text-slate-500">{video.views} • {video.timestamp}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
