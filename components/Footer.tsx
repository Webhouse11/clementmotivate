
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#111] text-white pt-24 pb-12 px-4 md:px-8 mt-20">
      <div className="max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 items-start border-b border-white/5 pb-20">
          
          <div className="lg:col-span-4 space-y-8">
            <Link to="/" className="text-3xl font-extrabold headline tracking-tighter">
              CLEMENT<span className="text-gold italic">MOTIVATES</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm font-medium">
              A premium digital publication exploring the nexus of leadership, engineering discipline, and spiritual growth. Redefining success for the modern architect of change.
            </p>
            <div className="flex space-x-4">
               {['FB', 'TW', 'IG', 'LI'].map(s => (
                 <a key={s} href="#" className="w-10 h-10 rounded bg-white/5 flex items-center justify-center text-[10px] font-black hover:bg-gold transition-colors">{s}</a>
               ))}
            </div>
          </div>
          
          <div className="lg:col-span-2 space-y-6">
            <h4 className="headline text-[13px] font-black text-gold">Essentials</h4>
            <nav className="flex flex-col space-y-3">
              {['Home', 'About Me', 'The Archive', 'Portal'].map(l => (
                <Link key={l} to={l === 'Home' ? '/' : l === 'About Me' ? '/about' : l === 'The Archive' ? '/news' : '/dashboard'} className="text-[12px] font-bold text-gray-400 hover:text-white transition-colors">{l}</Link>
              ))}
            </nav>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <h4 className="headline text-[13px] font-black text-gold">Categories</h4>
            <nav className="flex flex-col space-y-3">
              {['Leadership', 'Personal Growth', 'Faith', 'Nigeria Reality'].map(l => (
                <Link key={l} to="/news" className="text-[12px] font-bold text-gray-400 hover:text-white transition-colors">{l}</Link>
              ))}
            </nav>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <h4 className="headline text-[13px] font-black text-gold">Direct Line</h4>
            <p className="text-sm text-gray-400">Collaborations, inquiries, and speaking invitations.</p>
            <a href="mailto:hello@clement.com" className="text-2xl headline italic text-white block hover:text-gold transition-colors underline decoration-gold underline-offset-8">hello@clement.com</a>
          </div>
        </div>
        
        <div className="mt-12 flex flex-col md:flex-row justify-between items-center text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">
          <p>&copy; {new Date().getFullYear()} CLEMENTMOTIVATES. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-8 mt-6 md:mt-0">
            <Link to="/dashboard" className="hover:text-gold">Admin</Link>
            <a href="#" className="hover:text-gold">Terms</a>
            <a href="#" className="hover:text-gold">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
