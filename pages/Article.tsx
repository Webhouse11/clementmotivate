
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { storage } from '../services/storage';
import { getArticleSummary } from '../services/gemini';
import { BlogPost } from '../types';
import BlogCard from '../components/BlogCard';

const Article: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const foundPost = storage.getPostById(id || '');
    if (!foundPost) {
      navigate('/news');
      return;
    }
    setPost(foundPost);
    setLatestPosts(storage.getPosts().slice(0, 4));

    const fetchSummary = async () => {
      const res = await getArticleSummary(foundPost.content);
      setSummary(res);
    };
    fetchSummary();
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id, navigate]);

  if (!post) return null;

  const isVideo = post.imageUrl.includes('video/') || post.imageUrl.startsWith('data:video/');

  return (
    <div className="bg-[#f7f7f7] min-h-screen pt-10">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Article Main (2/3) */}
          <div className="lg:col-span-8 space-y-8 bg-white p-6 md:p-12 magazine-shadow">
            <header className="space-y-6">
              <nav className="text-[10px] font-black uppercase text-gray-400 flex items-center space-x-2">
                <Link to="/" className="hover:text-gold">Home</Link>
                <span>/</span>
                <Link to="/news" className="hover:text-gold">{post.category}</Link>
              </nav>
              <h1 className="text-4xl md:text-5xl headline leading-tight">{post.title}</h1>
              <div className="flex items-center justify-between border-y border-gray-100 py-4">
                 <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden">
                       <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1974" className="w-full h-full object-cover grayscale" />
                    </div>
                    <div className="text-[10px] font-black uppercase">
                       <p className="text-gold">By {post.author}</p>
                       <p className="text-gray-400">{post.date}</p>
                    </div>
                 </div>
                 <div className="flex space-x-2">
                    <button className="p-2 border border-gray-100 rounded hover:bg-blue-600 hover:text-white transition-all"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></button>
                 </div>
              </div>
            </header>

            <div className="aspect-video bg-black rounded-lg overflow-hidden border border-gray-200">
              {isVideo ? (
                <video src={post.imageUrl} className="w-full h-full object-contain" controls autoPlay />
              ) : (
                <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
              )}
            </div>

            {summary && (
              <div className="bg-gold/5 p-8 border-l-4 border-gold relative italic text-gray-600 serif">
                 <span className="text-gold font-black headline text-[10px] uppercase mb-2 block">The Core Insight</span>
                 {summary}
              </div>
            )}

            <article className="prose prose-lg prose-gray max-w-none text-[#333] leading-relaxed text-lg space-y-6">
               {post.content.split('\n').map((para, idx) => (
                 para.trim() && <p key={idx} className="mb-6">{para.trim()}</p>
               ))}
            </article>

            <div className="mt-20 pt-10 border-t border-gray-100">
               <h4 className="headline text-lg mb-8">Related Conversations</h4>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {latestPosts.slice(0, 2).map(lp => (
                    <BlogCard key={lp.id} post={lp} variant="grid" />
                  ))}
               </div>
            </div>
          </div>

          {/* Sidebar (1/3) */}
          <aside className="lg:col-span-4 space-y-10">
             <div className="bg-white p-6 magazine-shadow">
               <h4 className="headline text-[13px] border-b-2 border-gold pb-3 mb-6 font-black">Featured Today</h4>
               <div className="space-y-6">
                  {latestPosts.map(lp => (
                    <BlogCard key={lp.id} post={lp} variant="sidebar" />
                  ))}
               </div>
            </div>
            
            <div className="bg-gold p-8 text-white text-center magazine-shadow">
               <h3 className="headline text-xl mb-4">Lead Differently</h3>
               <p className="text-[12px] font-bold uppercase mb-6">Master your discipline. Refine your faith. Build your legacy.</p>
               <button className="w-full bg-white text-black py-4 text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all">Download Guide</button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Article;
