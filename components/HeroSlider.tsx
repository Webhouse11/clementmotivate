
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Slide } from '../types';
import { INITIAL_SLIDES } from '../constants';

const HeroSlider: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const slides = INITIAL_SLIDES;

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
      setIsTransitioning(false);
    }, 500);
  }, [isTransitioning, slides.length]);

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
      setIsTransitioning(false);
    }, 500);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative h-[90vh] w-full overflow-hidden bg-primary">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img
              src={slide.imageUrl}
              alt="Wisdom Background"
              className={`w-full h-full object-cover opacity-40 transition-transform duration-[8000ms] ease-linear ${
                index === current ? 'scale-110' : 'scale-100'
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
          </div>

          {/* Content Overlay */}
          <div className="relative h-full flex items-center justify-center px-6">
            <div className="max-w-5xl text-center space-y-8">
              <span className="inline-block text-gold text-[10px] tracking-[0.6em] font-bold uppercase animate-fade-in-up">
                Words of Wisdom
              </span>
              <h2 className="text-white text-3xl md:text-5xl lg:text-6xl serif italic leading-tight animate-fade-in-up delay-100 px-4 md:px-12">
                "{slide.quote}"
              </h2>
              <div className="pt-4 animate-fade-in-up delay-200">
                <p className="text-white/60 text-xs tracking-[0.3em] uppercase font-bold mb-10">— {slide.author}</p>
                <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
                  <Link to="/news" className="bg-gold text-white px-10 py-5 text-xs tracking-widest font-bold uppercase hover:bg-white hover:text-primary transition-all duration-300 shadow-xl">
                    Read Latest Story
                  </Link>
                  <Link to="/about" className="border border-white/20 text-white px-10 py-5 text-xs tracking-widest font-bold uppercase hover:bg-white hover:text-primary transition-all duration-300">
                    Meet the Visionary
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Controls */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-[3px] transition-all duration-700 rounded-full ${
              index === current ? 'w-10 bg-gold' : 'w-4 bg-white/20 hover:bg-white/40'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Side Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-8 top-1/2 -translate-y-1/2 z-20 text-white/20 hover:text-gold transition-all hidden lg:block p-2 rounded-full border border-white/5 hover:border-gold/30 bg-black/5 hover:bg-black/20"
        aria-label="Previous Slide"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-20 text-white/20 hover:text-gold transition-all hidden lg:block p-2 rounded-full border border-white/5 hover:border-gold/30 bg-black/5 hover:bg-black/20"
        aria-label="Next Slide"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .delay-100 { animation-delay: 0.2s; }
        .delay-200 { animation-delay: 0.4s; }
      `}} />
    </section>
  );
};

export default HeroSlider;
