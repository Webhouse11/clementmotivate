
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { storage } from '../services/storage';
import { BlogPost, PageContent } from '../types';
import BlogCard from '../components/BlogCard';

const Home: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [content, setContent] = useState<PageContent>(storage.getPageContent());

  useEffect(() => {
    setPosts(storage.getPosts());
    setContent(storage.getPageContent());
    window.scrollTo(0, 0);
  }, []);

  const featured = posts[0];
  const gridItems = posts.slice(1, 4);
  const mainFeed = posts.slice(4);

  return (
    <div className="bg-[#f7f7f7] min-h-screen">
      <main className="max-w-screen-2xl mx-auto px-4 md:px-8 py-10">
        
        {/* MagOne Bento Grid (Hero) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          <div className="lg:col-span-8">
            {featured && <BlogCard post={featured} variant="hero" />}
          </div>
          <div className="lg:col-span-4 flex flex-col space-y-6">
            {gridItems.map(post => (
              <BlogCard key={post.id} post={post} variant="list" />
            ))}
            {gridItems.length === 0 && (
              <div className="flex-grow flex items-center justify-center border-2 border-dashed border-gray-200 bg-white p-8">
                 <p className="text-gray-300 font-bold headline text-center">Add more posts to fill the magazine grid.</p>
              </div>
            )}
          </div>
        </section>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Feed (2/3 Column) */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Leadership Category Block */}
            <div className="bg-white p-2 border-t-4 border-gold magazine-shadow">
               <div className="flex justify-between items-center px-4 py-3 border-b border-gray-50 mb-6">
                  <h2 className="headline text-lg font-black">Latest Insights</h2>
                  <Link to="/news" className="text-[10px] font-black uppercase text-gold hover:underline">View All</Link>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
                  {mainFeed.map(post => (
                    <BlogCard key={post.id} post={post} variant="grid" />
                  ))}
                  {mainFeed.length === 0 && (
                    <p className="col-span-2 py-20 text-center text-gray-300 font-bold uppercase italic">Deep content arriving soon...</p>
                  )}
               </div>
            </div>

            {/* Nigeria Reality / Secondary Block */}
            <div className="bg-white p-2 border-t-4 border-[#0A192F] magazine-shadow">
               <div className="px-4 py-3 border-b border-gray-50 mb-6">
                  <h2 className="headline text-lg font-black">Growth & Purpose</h2>
               </div>
               <div className="space-y-6 p-4">
                  {posts.slice(0, 3).map(post => (
                    <BlogCard key={post.id} post={post} variant="list" />
                  ))}
               </div>
            </div>
          </div>

          {/* Sidebar (1/3 Column) */}
          <aside className="lg:col-span-4 space-y-10">
            
            {/* Author Widget */}
            <div className="bg-white p-8 magazine-shadow text-center">
               <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-6 border-4 border-gray-50">
                  <img src={content.authorImageUrl} alt={content.authorName} className="w-full h-full object-cover grayscale" />
               </div>
               <h4 className="headline text-xl mb-4">{content.authorName}</h4>
               <p className="text-[12px] text-gray-500 leading-relaxed mb-6 italic">
                  "{content.missionStatement}"
               </p>
               <Link to="/about" className="inline-block bg-gold text-white px-6 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all">My Story</Link>
            </div>

            {/* Popular Posts */}
            <div className="bg-white p-6 magazine-shadow">
               <h4 className="headline text-[13px] border-b-2 border-gold pb-3 mb-6 font-black">Popular Reflections</h4>
               <div className="space-y-6">
                  {posts.slice(0, 5).map(post => (
                    <BlogCard key={post.id} post={post} variant="sidebar" />
                  ))}
               </div>
            </div>

            {/* Categories Cloud */}
            <div className="bg-white p-6 magazine-shadow">
               <h4 className="headline text-[13px] border-b-2 border-gold pb-3 mb-6 font-black">Topics</h4>
               <div className="flex flex-wrap gap-2">
                  {['Leadership', 'Faith', 'Purpose', 'Nigeria Reality', 'Success'].map(cat => (
                    <Link key={cat} to="/news" className="bg-gray-50 px-3 py-1.5 text-[10px] font-black uppercase text-gray-400 hover:bg-gold hover:text-white transition-all">
                      {cat}
                    </Link>
                  ))}
               </div>
            </div>

            {/* Newsletter (Mock) */}
            <div className="bg-black p-8 text-white magazine-shadow">
               <h4 className="headline text-xl mb-4">The Monday Brief</h4>
               <p className="text-[12px] text-gray-400 mb-6 font-bold uppercase tracking-tighter">Get exclusive leadership insights delivered to your inbox.</p>
               <input type="text" placeholder="Email Address..." className="w-full bg-white/10 border border-white/20 py-3 px-4 text-xs focus:outline-none focus:border-gold mb-4" />
               <button className="w-full bg-gold py-3 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">Subscribe Now</button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Home;
