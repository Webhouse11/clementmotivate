
import React, { useState, useEffect, useRef } from 'react';
import { storage } from '../services/storage';
import { BlogPost, PageContent, MediaItem } from '../types';

const Dashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'posts' | 'pages' | 'media'>('posts');
  
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [pageContent, setPageContent] = useState<PageContent>(storage.getPageContent());
  const [mediaGallery, setMediaGallery] = useState<MediaItem[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryUploadRef = useRef<HTMLInputElement>(null);
  const authorImgRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPosts(storage.getPosts());
    setMediaGallery(storage.getMedia());
    setPageContent(storage.getPageContent());
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin') {
      setIsAuthenticated(true);
    } else {
      alert('Security Breach Detected: Invalid Authorization Key.');
    }
  };

  // Dedicated Save Function for Blog Posts
  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPost) {
      if (!editingPost.title.trim()) {
        alert("Headline is required.");
        return;
      }
      
      const now = new Date();
      const formattedDateTime = now.toLocaleDateString('en-US', { 
        month: 'short', day: '2-digit', year: 'numeric'
      });
      
      const postToSave = { ...editingPost, date: formattedDateTime };
      storage.upsertPost(postToSave);
      
      // Sync local state
      setPosts(storage.getPosts());
      setEditingPost(null);
      
      alert('SUCCESS: Publication Saved. The portal has been updated.');
    }
  };

  const handleNewPost = () => {
    setEditingPost({
      id: Date.now().toString(),
      title: '', excerpt: '', content: '',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      imageUrl: '', category: 'Leadership', author: pageContent.authorName || 'Engr Oluranti'
    });
  };

  const handleDeletePost = (id: string) => {
    if (window.confirm('CRITICAL: Permanent deletion? This cannot be undone.')) {
      storage.deletePost(id);
      setPosts(storage.getPosts());
    }
  };

  // Dedicated Save Function for Brand Identity (About, Mission, etc.)
  const handleSavePages = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    storage.savePageContent(pageContent);
    alert('SUCCESS: Site Identity Saved. Author details and brand narrative updated globally.');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingPost) {
      const isVideo = file.type.startsWith('video/');
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setEditingPost({ ...editingPost, imageUrl: dataUrl });
        const newItem: MediaItem = {
          id: Date.now().toString(), url: dataUrl, name: file.name,
          date: new Date().toLocaleDateString(), type: isVideo ? 'video' : 'image'
        };
        storage.addMedia(newItem);
        setMediaGallery(storage.getMedia());
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAuthorImgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setPageContent({ ...pageContent, authorImageUrl: dataUrl });
        const newItem: MediaItem = {
          id: Date.now().toString(), url: dataUrl, name: `Author Profile - ${file.name}`,
          date: new Date().toLocaleDateString(), type: 'image'
        };
        storage.addMedia(newItem);
        setMediaGallery(storage.getMedia());
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      fileArray.forEach((file: File, index: number) => {
        const isVideo = file.type.startsWith('video/');
        const reader = new FileReader();
        reader.onloadend = () => {
          const newItem: MediaItem = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            url: reader.result as string, name: file.name,
            date: new Date().toLocaleDateString(), type: isVideo ? 'video' : 'image'
          };
          storage.addMedia(newItem);
          if (index === fileArray.length - 1) {
             setMediaGallery(storage.getMedia());
             alert('Assets synced to Media Vault.');
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white p-12 shadow-2xl border-t-8 border-gold">
          <h2 className="text-4xl font-black headline mb-8 text-center tracking-tighter text-black uppercase">CLEMENT <span className="text-gold italic">PORTAL</span></h2>
          <form onSubmit={handleLogin} className="space-y-8">
            <div>
              <label className="text-[10px] tracking-[0.5em] font-black uppercase text-gray-400 block mb-3">Encryption Key</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border-b-2 border-gray-100 py-4 focus:outline-none focus:border-gold transition-colors font-mono text-xl" placeholder="••••••••" />
            </div>
            <button type="submit" className="w-full bg-black text-white py-5 text-[11px] font-black uppercase tracking-[0.4em] hover:bg-gold transition-all">Unlock Dashboard</button>
          </form>
          <p className="mt-12 text-[9px] text-gray-300 text-center uppercase tracking-[0.5em] font-bold">Encrypted Connection Active</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfcfc] flex font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-72 bg-[#111] text-white flex flex-col p-10 fixed h-full z-30 shadow-2xl">
        <div className="text-2xl font-black headline mb-16 border-b border-white/5 pb-8 tracking-[0.1em]">
          MAGONE <span className="text-gold italic font-light">CORE</span>
        </div>
        <nav className="flex-grow space-y-4">
          {[
            { id: 'posts', label: 'News Archive', icon: '📝' },
            { id: 'media', label: 'Media Vault', icon: '🖼️' },
            { id: 'pages', label: 'Identity & Author', icon: '👤' }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => { setActiveTab(tab.id as any); setEditingPost(null); }}
              className={`w-full text-left text-[11px] font-black uppercase py-5 px-6 transition-all tracking-[0.3em] flex items-center justify-between rounded-sm ${activeTab === tab.id ? 'bg-gold text-white shadow-xl translate-x-2' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
            >
              <span>{tab.label}</span>
              <span className="opacity-50">{tab.icon}</span>
            </button>
          ))}
        </nav>
        <div className="pt-10 border-t border-white/5">
           <div className="flex items-center space-x-3 text-[9px] text-gold uppercase font-bold tracking-[0.4em]">
              <span className="w-2 h-2 bg-gold rounded-full animate-ping"></span>
              <span>Secure Cloud Ready</span>
           </div>
        </div>
      </aside>

      {/* Main Control Panel */}
      <main className="flex-grow ml-72 p-16">
        <div className="flex justify-between items-end mb-16 border-b border-gray-100 pb-10">
           <div>
              <div className="text-[10px] font-black uppercase text-gold tracking-[0.6em] mb-4">Command Center</div>
              <h1 className="text-6xl font-black headline tracking-tighter uppercase leading-none">
                {activeTab === 'posts' ? (editingPost ? 'Editing Document' : 'Publications') : activeTab === 'media' ? 'Media Assets' : 'Site Configuration'}
              </h1>
           </div>
           
           <div className="flex space-x-6">
              {activeTab === 'posts' && !editingPost && (
                 <button onClick={handleNewPost} className="bg-gold text-white px-10 py-5 text-[11px] font-black uppercase tracking-[0.4em] hover:bg-black transition-all shadow-xl rounded-sm">Create Document</button>
              )}
              {activeTab === 'media' && (
                 <button onClick={() => galleryUploadRef.current?.click()} className="bg-black text-white px-10 py-5 text-[11px] font-black uppercase tracking-[0.4em] hover:bg-gold transition-all shadow-xl rounded-sm">Upload Assets</button>
              )}
           </div>
        </div>

        {/* Dynamic Content Sections */}
        {activeTab === 'posts' ? (
           editingPost ? (
             <div className="bg-white p-16 magazine-shadow border-t-8 border-gold rounded-sm max-w-6xl relative">
                <form onSubmit={handleSavePost} className="space-y-12">
                   {/* Top Save Control */}
                   <div className="flex justify-between items-center bg-gray-50 -mx-16 -mt-16 p-8 border-b border-gray-100 mb-12">
                      <div className="text-[10px] font-black uppercase text-gray-400 tracking-[0.4em]">Drafting Publication...</div>
                      <div className="flex space-x-4">
                        <button type="button" onClick={() => setEditingPost(null)} className="text-[10px] font-black uppercase text-gray-400 hover:text-red-500 px-6 py-3 tracking-widest">Discard</button>
                        <button type="submit" className="bg-gold text-white px-12 py-3 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-black transition-all shadow-lg rounded-sm">Save Document</button>
                      </div>
                   </div>

                   <header className="flex justify-between items-start">
                      <div className="flex-grow max-w-2xl">
                         <label className="text-[10px] font-black uppercase text-gray-400 block mb-4 tracking-[0.4em]">Document Headline</label>
                         <input type="text" className="w-full text-5xl headline border-b-4 border-gray-50 focus:outline-none focus:border-gold py-4 transition-colors bg-transparent" value={editingPost.title} onChange={e => setEditingPost({...editingPost, title: e.target.value})} required placeholder="Enter compelling title..." />
                      </div>
                      <div className="ml-12 w-64 bg-gray-50 p-6 border-l-4 border-gold">
                         <label className="text-[9px] font-black uppercase text-gray-400 block mb-4">Topic Badge</label>
                         <select className="w-full bg-transparent border-b border-gray-200 py-2 focus:outline-none font-black headline text-xs uppercase" value={editingPost.category} onChange={e => setEditingPost({...editingPost, category: e.target.value})}>
                            {['Leadership', 'Faith', 'Purpose', 'Personal Growth', 'Nigeria Reality'].map(c => <option key={c}>{c}</option>)}
                         </select>
                      </div>
                   </header>

                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                      <div className="space-y-10">
                         <div>
                            <label className="text-[10px] font-black uppercase text-gray-400 block mb-4 tracking-[0.4em]">Featured Media Source</label>
                            <div className="flex space-x-2">
                               <input type="text" className="flex-grow border-b-2 border-gray-100 py-4 text-xs focus:outline-none font-mono" value={editingPost.imageUrl} onChange={e => setEditingPost({...editingPost, imageUrl: e.target.value})} placeholder="URL or Data URI..." />
                               <button type="button" onClick={() => fileInputRef.current?.click()} className="text-[10px] font-black uppercase bg-gray-100 px-8 hover:bg-gray-200 transition-colors">Select File</button>
                            </div>
                         </div>
                         <div>
                            <label className="text-[10px] font-black uppercase text-gray-400 block mb-4 tracking-[0.4em]">SEO Abstract / Excerpt</label>
                            <textarea className="w-full border-2 border-gray-100 p-8 focus:outline-none focus:border-gold h-32 text-sm font-medium leading-relaxed bg-gray-50/50" value={editingPost.excerpt} onChange={e => setEditingPost({...editingPost, excerpt: e.target.value})} required placeholder="Write a brief summary for search engines..." />
                         </div>
                      </div>
                      <div className="bg-black/5 p-2 rounded-sm relative group overflow-hidden border border-gray-100">
                         {editingPost.imageUrl ? (
                            <img src={editingPost.imageUrl} className="w-full h-full object-cover grayscale opacity-80" alt="Preview" />
                         ) : (
                            <div className="w-full h-full min-h-[250px] flex items-center justify-center text-[10px] font-black text-gray-300 uppercase tracking-widest italic">Live Preview Canvas</div>
                         )}
                         <div className="absolute top-4 left-4 bg-gold text-white text-[9px] font-black px-3 py-1 uppercase">Visual Reference</div>
                      </div>
                   </div>

                   <div>
                      <label className="text-[10px] font-black uppercase text-gray-400 block mb-6 tracking-[0.4em]">Main Editorial Content</label>
                      <textarea className="w-full border-2 border-gray-100 p-12 focus:outline-none focus:border-gold h-[700px] text-xl leading-relaxed font-serif text-gray-800 bg-[#fffdfa]" value={editingPost.content} onChange={e => setEditingPost({...editingPost, content: e.target.value})} required placeholder="Unfold your vision here..." />
                   </div>

                   <div className="flex items-center justify-end space-x-8 pt-12 border-t border-gray-100">
                      <button type="button" onClick={() => setEditingPost(null)} className="text-[11px] font-black uppercase text-gray-400 hover:text-red-600 transition-colors tracking-[0.3em]">Discard Draft</button>
                      <button type="submit" className="bg-black text-white px-20 py-6 text-[11px] font-black uppercase tracking-[0.5em] hover:bg-gold transition-all shadow-2xl rounded-sm">Save Document</button>
                   </div>
                </form>
                <input type="file" ref={fileInputRef} className="hidden" onChange={handleImageUpload} accept="image/*,video/*" />
             </div>
           ) : (
             <div className="bg-white magazine-shadow border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                   <thead className="bg-[#111] text-white">
                      <tr>
                         <th className="p-10 text-[11px] font-black uppercase tracking-[0.4em]">Document Archive</th>
                         <th className="p-10 text-[11px] font-black uppercase tracking-[0.4em]">Topic</th>
                         <th className="p-10 text-[11px] font-black uppercase tracking-[0.4em]">Actions</th>
                      </tr>
                   </thead>
                   <tbody>
                      {posts.length === 0 ? (
                        <tr><td colSpan={3} className="p-40 text-center text-gray-300 headline text-2xl font-black italic uppercase">The Library is currently vacant.</td></tr>
                      ) : (
                        posts.map(post => (
                          <tr key={post.id} className="border-b border-gray-50 hover:bg-gray-50 transition-all group">
                             <td className="p-10">
                                <div className="text-[10px] text-gray-400 font-mono mb-2">{post.date}</div>
                                <div className="text-2xl font-black headline tracking-tight group-hover:text-gold transition-colors">{post.title}</div>
                             </td>
                             <td className="p-10"><span className="text-[10px] font-black uppercase bg-gray-100 px-5 py-2 rounded-full border border-gray-200">{post.category}</span></td>
                             <td className="p-10">
                                <div className="flex space-x-8">
                                   <button onClick={() => setEditingPost(post)} className="text-[11px] font-black uppercase text-gold hover:underline tracking-[0.2em]">Open</button>
                                   <button onClick={() => handleDeletePost(post.id)} className="text-[11px] font-black uppercase text-red-300 hover:text-red-600 tracking-[0.2em] transition-colors">Erase</button>
                                </div>
                             </td>
                          </tr>
                        ))
                      )}
                   </tbody>
                </table>
             </div>
           )
        ) : activeTab === 'media' ? (
           <div className="bg-white p-16 magazine-shadow border border-gray-100 rounded-sm">
              <input type="file" ref={galleryUploadRef} className="hidden" multiple onChange={handleGalleryUpload} accept="image/*,video/*" />
              <div className="flex justify-between items-center mb-12">
                 <h3 className="text-xl headline font-black uppercase tracking-[0.2em]">Asset Inventory</h3>
                 <p className="text-xs text-gray-400 italic">Global cloud sync active</p>
              </div>
              {mediaGallery.length === 0 ? (
                <div className="py-48 text-center border-4 border-dashed border-gray-50 rounded-xl">
                   <div className="text-6xl mb-8 opacity-20">📁</div>
                   <p className="text-gray-300 headline text-2xl font-black mb-10 tracking-[0.1em] uppercase">No Assets in Vault</p>
                   <button onClick={() => galleryUploadRef.current?.click()} className="text-[11px] font-black uppercase text-gold border-b-2 border-gold pb-2 hover:opacity-50 transition-all tracking-[0.4em]">Initiate First Upload</button>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
                   {mediaGallery.map(m => (
                      <div key={m.id} className="aspect-square bg-[#050505] relative group rounded-sm overflow-hidden magazine-shadow border border-gray-100">
                         {m.type === 'video' ? <video src={m.url} className="w-full h-full object-cover opacity-60" muted /> : <img src={m.url} className="w-full h-full object-cover" />}
                         <div className="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center p-8 space-y-4">
                            <p className="text-[9px] text-white font-black uppercase truncate w-full text-center mb-2 tracking-widest">{m.name}</p>
                            <button onClick={() => {navigator.clipboard.writeText(m.url); alert('Asset URL Copied Successfully')}} className="bg-white text-black w-full py-3 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-gold hover:text-white transition-colors">Copy Link</button>
                            <button onClick={() => { storage.deleteMedia(m.id); setMediaGallery(storage.getMedia()) }} className="bg-red-600 text-white w-full py-3 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-red-800 transition-colors">Erase Asset</button>
                         </div>
                      </div>
                   ))}
                </div>
              )}
           </div>
        ) : (
           <form onSubmit={handleSavePages} className="max-w-5xl bg-white p-20 magazine-shadow border-t-8 border-gold rounded-sm">
              <div className="space-y-16">
                 <header className="border-b border-gray-50 pb-10 flex justify-between items-center">
                    <div>
                      <h3 className="text-3xl headline font-black mb-4 uppercase tracking-[0.1em]">Identity & Author Profile</h3>
                      <p className="text-sm text-gray-400 font-medium max-w-2xl leading-relaxed italic">Core brand narrative. Click Save Document below to persist changes.</p>
                    </div>
                    <button type="submit" className="bg-gold text-white px-10 py-5 text-[11px] font-black uppercase tracking-[0.4em] hover:bg-black transition-all shadow-xl rounded-sm">Save Document</button>
                 </header>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div className="md:col-span-2">
                       <label className="text-[11px] font-black uppercase text-gray-400 block mb-6 tracking-[0.5em]">Global Mission Statement (Manifesto)</label>
                       <input type="text" className="w-full border-b-4 border-gray-50 py-6 text-4xl headline focus:outline-none focus:border-gold transition-colors font-black bg-transparent" value={pageContent.missionStatement} onChange={e => setPageContent({...pageContent, missionStatement: e.target.value})} placeholder="Define your why..." />
                    </div>

                    <div className="md:col-span-2">
                       <label className="text-[11px] font-black uppercase text-gray-400 block mb-6 tracking-[0.5em]">Author Display Name</label>
                       <input type="text" className="w-full border-b-4 border-gray-50 py-4 text-3xl font-black focus:outline-none focus:border-gold transition-colors bg-transparent" value={pageContent.authorName} onChange={e => setPageContent({...pageContent, authorName: e.target.value})} placeholder="e.g. Engr Oluranti" />
                    </div>
                    
                    <div className="space-y-10">
                       <div>
                          <label className="text-[11px] font-black uppercase text-gray-400 block mb-6 tracking-[0.5em]">Primary Inquiry Gateway (Email)</label>
                          <input type="email" className="w-full border-b-2 border-gray-50 py-4 text-xl font-bold focus:outline-none focus:border-gold tracking-tight" value={pageContent.contactEmail} onChange={e => setPageContent({...pageContent, contactEmail: e.target.value})} placeholder="office@brand.com" />
                       </div>
                       
                       <div>
                          <label className="text-[11px] font-black uppercase text-gray-400 block mb-6 tracking-[0.5em]">Author Profile Image URL</label>
                          <div className="flex space-x-2">
                             <input type="text" className="flex-grow border-b-2 border-gray-50 py-4 text-xs font-mono focus:outline-none" value={pageContent.authorImageUrl} onChange={e => setPageContent({...pageContent, authorImageUrl: e.target.value})} />
                             <button type="button" onClick={() => authorImgRef.current?.click()} className="text-[10px] font-black uppercase bg-gray-100 px-8 hover:bg-gray-200 transition-colors">Upload</button>
                          </div>
                          <input type="file" ref={authorImgRef} className="hidden" onChange={handleAuthorImgUpload} accept="image/*" />
                       </div>
                    </div>

                    <div className="bg-gray-50 p-6 flex flex-col items-center justify-center border border-gray-100">
                       <h5 className="text-[9px] font-black uppercase mb-4 tracking-widest text-gray-400">Profile Preview</h5>
                       <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white magazine-shadow">
                          <img src={pageContent.authorImageUrl} className="w-full h-full object-cover grayscale" alt="Author Preview" />
                       </div>
                       <p className="mt-4 text-xs font-black headline uppercase">{pageContent.authorName}</p>
                    </div>

                    <div className="md:col-span-2">
                       <label className="text-[11px] font-black uppercase text-gray-400 block mb-6 tracking-[0.5em]">Professional Memoir (Biography)</label>
                       <textarea className="w-full border-2 border-gray-100 p-12 h-[450px] text-lg font-medium leading-[2] focus:outline-none focus:border-gold bg-[#fcfcfc]" value={pageContent.aboutBio} onChange={e => setPageContent({...pageContent, aboutBio: e.target.value})} placeholder="Tell your journey with depth and authority..." />
                    </div>
                 </div>

                 <div className="pt-12 flex items-center justify-end">
                    <button type="submit" className="bg-black text-white px-20 py-6 text-[11px] font-black uppercase tracking-[0.6em] hover:bg-gold transition-all shadow-2xl rounded-sm">Save Document</button>
                 </div>
              </div>
           </form>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
