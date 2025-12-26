
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_ITEMS } from '../constants';
import { storage } from '../services/storage';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [latestTitle, setLatestTitle] = useState('');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 150);
    window.addEventListener('scroll', handleScroll);
    
    const posts = storage.getPosts();
    if (posts.length > 0) setLatestTitle(posts[0].title);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
  });

  return (
    <header className="w-full bg-white z-50">
      {/* Top Bar */}
      <div className="bg-[#111] text-white py-2 text-[10px] font-bold uppercase tracking-widest px-4 md:px-8 flex justify-between items-center">
        <div className="flex items-center space-x-6 overflow-hidden max-w-xl">
          <span className="bg-gold text-white px-2 py-1 flex-shrink-0">Trending Now</span>
          <div className="ticker-scroll whitespace-nowrap">
            {latestTitle || "Welcome to Clement Motivates - Your Daily Leadership Insight"} &nbsp; • &nbsp; 
            Excellence is a habit &nbsp; • &nbsp; Lead with Conviction &nbsp; • &nbsp; Faith over Fear
          </div>
        </div>
        <div className="hidden md:block">
          {today}
        </div>
      </div>

      {/* Main Branding Bar */}
      <div className="py-8 px-4 md:px-8 border-b border-gray-100 flex flex-col md:flex-row items-center justify-between">
        <div className="flex space-x-4 mb-4 md:mb-0">
          <button className="p-2 border border-gray-100 rounded hover:bg-gold hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 4.4 2.85 8.13 6.81 9.45.5.09.68-.21.68-.48 0-.24-.01-.86-.01-1.69-2.77.6-3.36-1.34-3.36-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.55-1.11-4.55-4.93 0-1.09.39-1.98 1.03-2.67-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.33.85 0 1.7.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.69 1.03 1.58 1.03 2.67 0 3.83-2.33 4.68-4.56 4.92.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48 3.96-1.32 6.81-5.05 6.81-9.45 0-5.5-4.46-9.96-9.96-9.96z"/></svg>
          </button>
          <button className="p-2 border border-gray-100 rounded hover:bg-gold hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
          </button>
        </div>

        <Link to="/" className="text-4xl md:text-5xl font-extrabold tracking-tighter headline flex items-center">
          CLEMENT<span className="text-gold italic">MOTIVATES</span>
          <span className="ml-2 text-[10px] bg-black text-white px-2 py-0.5 self-start mt-1">PRO</span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
           <Link to="/news" className="bg-[#f0f0f0] p-4 rounded-full hover:bg-gold transition-colors group">
              <svg className="w-5 h-5 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
           </Link>
        </div>
      </div>

      {/* Sticky Secondary Nav */}
      <nav className={`w-full bg-white border-b border-gray-100 transition-all ${scrolled ? 'fixed top-0 shadow-lg py-2' : 'relative py-4'}`}>
        <div className="max-w-screen-2xl mx-auto px-4 md:px-8 flex items-center justify-between">
          <ul className="flex items-center space-x-8 overflow-x-auto whitespace-nowrap scrollbar-hide">
            {NAV_ITEMS.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`text-[12px] font-extrabold headline transition-colors hover:text-gold ${
                    location.pathname === item.path ? 'text-gold' : 'text-primary'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="hidden lg:flex items-center space-x-4">
             <Link to="/dashboard" className="text-[10px] font-bold text-gray-400 hover:text-gold uppercase tracking-widest">Portal Access</Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
