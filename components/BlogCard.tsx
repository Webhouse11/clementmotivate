
import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../types';

interface BlogCardProps {
  post: BlogPost;
  variant?: 'hero' | 'grid' | 'list' | 'sidebar';
}

const BlogCard: React.FC<BlogCardProps> = ({ post, variant = 'grid' }) => {
  const isVideo = post.imageUrl?.includes('video/') || post.imageUrl?.startsWith('data:video/');
  
  const getCategoryColor = (cat: string) => {
    const c = cat.toLowerCase();
    if (c.includes('lead')) return 'bg-gold';
    if (c.includes('faith')) return 'bg-[#0A192F]';
    if (c.includes('growth')) return 'bg-[#2A9D8F]';
    return 'bg-red-600';
  };

  if (variant === 'hero') {
    return (
      <Link to={`/post/${post.id}`} className="group relative block h-[450px] overflow-hidden magazine-shadow">
        {isVideo ? (
          <video src={post.imageUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" muted playsInline />
        ) : (
          <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 space-y-4">
          <span className={`${getCategoryColor(post.category)} text-white px-3 py-1 text-[10px] font-black uppercase`}>
            {post.category}
          </span>
          <h2 className="text-3xl md:text-4xl text-white headline leading-tight">
            {post.title}
          </h2>
          <div className="flex items-center space-x-3 text-[10px] text-gray-300 font-bold uppercase">
             <span>By {post.author}</span>
             <span>•</span>
             <span>{post.date}</span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'list') {
    return (
      <Link to={`/post/${post.id}`} className="group flex space-x-6 items-center border-b border-gray-100 pb-6 transition-all hover:translate-x-1">
        <div className="w-32 h-24 flex-shrink-0 overflow-hidden bg-gray-100">
          {isVideo ? (
            <video src={post.imageUrl} className="w-full h-full object-cover" muted />
          ) : (
            <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
          )}
        </div>
        <div className="flex-grow space-y-2">
          <span className="text-[9px] font-black uppercase text-gold">{post.category}</span>
          <h3 className="text-sm headline leading-tight group-hover:text-gold transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-[11px] text-gray-400 font-bold">{post.date}</p>
        </div>
      </Link>
    );
  }

  if (variant === 'sidebar') {
    return (
      <Link to={`/post/${post.id}`} className="group block space-y-2 pb-4 border-b border-gray-100 last:border-0">
        <h3 className="text-[13px] font-bold headline leading-snug group-hover:text-gold transition-colors">
          {post.title}
        </h3>
        <p className="text-[10px] text-gray-400 uppercase font-black">{post.date}</p>
      </Link>
    );
  }

  return (
    <Link to={`/post/${post.id}`} className="group block bg-white magazine-shadow overflow-hidden">
      <div className="aspect-[16/10] overflow-hidden bg-gray-100 relative">
        {isVideo ? (
          <video src={post.imageUrl} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" muted playsInline />
        ) : (
          <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        )}
        <span className={`absolute top-0 left-0 ${getCategoryColor(post.category)} text-white px-2 py-1 text-[9px] font-black uppercase`}>
          {post.category}
        </span>
      </div>
      <div className="p-6 space-y-4">
        <h3 className="text-xl headline leading-tight group-hover:text-gold transition-colors">
          {post.title}
        </h3>
        <p className="text-gray-500 text-[13px] leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>
        <div className="pt-4 border-t border-gray-50 flex justify-between items-center text-[10px] font-black text-gray-400 uppercase">
           <span>{post.date}</span>
           <span className="group-hover:text-gold transition-colors">Read Post →</span>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
