
import React, { useEffect, useState } from 'react';
import { storage } from '../services/storage';
import { PageContent } from '../types';

const About: React.FC = () => {
  const [content, setContent] = useState<PageContent>(storage.getPageContent());

  useEffect(() => {
    setContent(storage.getPageContent());
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-40">
      <section className="px-8 mb-40">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
            <div className="lg:col-span-5 reveal sticky top-32">
              <span className="text-gold text-[11px] tracking-[0.5em] font-bold uppercase mb-8 block">The Visionary</span>
              <h1 className="text-7xl md:text-8xl serif leading-[0.9] mb-12 tracking-tighter headline">
                Lead with <br /> <span className="italic font-light">Conviction.</span>
              </h1>
              <div className="aspect-[3/4] overflow-hidden grayscale hover:grayscale-0 transition-all duration-[2000ms] bg-gray-100 magazine-shadow">
                <img 
                  src={content.authorImageUrl} 
                  alt="Author Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="lg:col-span-7 space-y-16 reveal pt-12 lg:pt-32">
              <div className="max-w-2xl space-y-12">
                <p className="text-3xl italic leading-relaxed text-primary serif">
                  "Excellence is not an act, but a habit born from the convergence of faith and discipline."
                </p>
                <div className="space-y-8 text-lg text-secondary leading-relaxed">
                  <p>{content.aboutBio}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-gray-100 pt-16">
                <div className="space-y-4">
                  <h4 className="text-[11px] font-bold tracking-[0.3em] uppercase text-gold headline">The Base</h4>
                  <p className="text-2xl italic serif">Nigeria & Global Outreach</p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-[11px] font-bold tracking-[0.3em] uppercase text-gold headline">Expertise</h4>
                  <p className="text-2xl italic serif">Leadership & Digital Strategy</p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-[11px] font-bold tracking-[0.3em] uppercase text-gold headline">Digital Legacy</h4>
                  <p className="text-2xl italic serif">Webhouse LAB Solution</p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-[11px] font-bold tracking-[0.3em] uppercase text-gold headline">Direct Access</h4>
                  <p className="text-2xl italic serif truncate">{content.contactEmail}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Grid */}
      <section className="bg-[#111] text-white py-48 px-8">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-32 reveal">
            <span className="text-gold text-[11px] tracking-[0.6em] font-bold uppercase mb-8 block">Foundational Truths</span>
            <h2 className="text-5xl md:text-7xl headline">The Three Pillars.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-24 reveal">
            <div className="space-y-8">
              <span className="text-4xl italic text-gold opacity-50 serif">01.</span>
              <h3 className="text-3xl headline">Radical Resilience</h3>
              <p className="text-gray-400 leading-relaxed">Mental fortitude is not just about survival; it's about thriving in the face of inevitable change through spiritual groundedness.</p>
            </div>
            <div className="space-y-8">
              <span className="text-4xl italic text-gold opacity-50 serif">02.</span>
              <h3 className="text-3xl headline">Absolute Integrity</h3>
              <p className="text-gray-400 leading-relaxed">A leader's public persona must be a direct reflection of their private convictions. There is no leadership without trust.</p>
            </div>
            <div className="space-y-8">
              <span className="text-4xl italic text-gold opacity-50 serif">03.</span>
              <h3 className="text-3xl headline">Strategic Vision</h3>
              <p className="text-gray-400 leading-relaxed">We don't just react to the world; we design our participation in it. Precision in thought leads to excellence in execution.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
