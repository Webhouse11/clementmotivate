
import React, { useState, useEffect } from 'react';
import { storage } from '../services/storage';
import { BlogPost } from '../types';
import BlogCard from '../components/BlogCard';

const News: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setPosts(storage.getPosts());
    window.scrollTo(0, 0);
  }, []);

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-40 pb-40">
      <div className="max-w-screen-2xl mx-auto px-8">
        <header className="mb-32 reveal text-center">
          <span className="text-gold text-[11px] tracking-[0.6em] font-bold uppercase mb-8 block">The Archive</span>
          <h1 className="text-7xl md:text-9xl serif mb-16 tracking-tighter">Insights.</h1>
          
          <div className="max-w-2xl mx-auto relative group">
             <input 
               type="text" 
               placeholder="Search the archive..."
               className="w-full bg-transparent border-b border-gray-100 py-6 text-2xl serif focus:outline-none focus:border-gold transition-colors text-center italic"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
             />
             <div className="absolute left-1/2 -bottom-[1px] -translate-x-1/2 w-0 h-[1px] bg-gold group-focus-within:w-full transition-all duration-700" />
          </div>
        </header>

        {filteredPosts.length === 0 ? (
          <div className="py-40 text-center reveal">
            <h3 className="text-3xl serif text-gray-300 italic">No publications match your inquiry.</h3>
            <button 
              onClick={() => setSearchTerm('')}
              className="mt-12 text-[11px] tracking-[0.3em] font-bold uppercase text-gold hover:opacity-50 transition-opacity"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-32">
            {filteredPosts.map((post, index) => (
              <div key={post.id} className={index === 0 && searchTerm === '' ? 'md:col-span-2 lg:col-span-3 mb-20' : ''}>
                <BlogCard post={post} featured={index === 0 && searchTerm === ''} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
