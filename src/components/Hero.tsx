/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ArrowRight, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeroProps {
  onOpenQuote: () => void;
}

const HERO_SLIDES = [
  {
    image: '/assets/images/platform_connectivity_bridge_1780894507052.jpeg',
    title: 'RAILWAY FOOT OVER BRIDGES',
    subtitle: '& STATION INFRASTRUCTURE'
  },
  {
    image: '/assets/images/launchingblock.jpeg',
    title: 'OVERNIGHT BLOCK LAUNCHING',
    subtitle: '& STEEL GIRDER FABRICATION'
  },
  // {
  //   image: '/assets/images/station_redev_hero_1780894251205.png',
  //   title: 'AMRIT BHARAT CONCOURSES',
  //   subtitle: '& PEDESTRIAN SKYWALKS'
  // }
];

export default function Hero({ onOpenQuote }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="relative w-full h-[85vh] lg:h-[90vh] bg-slate-900 overflow-hidden flex items-center">
      {/* Background Image Slideshow with Ken Burns effect */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.8, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${HERO_SLIDES[currentSlide].image})` }}
          />
        </AnimatePresence>
        {/* Dark overlay gradients matching image */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05142b]/40 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full text-white">
        <div className="max-w-3xl space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-xs tracking-widest font-bold text-slate-300 uppercase"
          >
            <span className="w-2 h-2 rounded-full bg-[#f15a24] animate-pulse" />
            Specialists in
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, type: 'spring', damping: 15 }}
              className="space-y-1.5"
            >
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight leading-none uppercase">
                {HERO_SLIDES[currentSlide].title}
              </h1>
              <h2 className="text-2xl md:text-3xl lg:text-5xl font-extrabold tracking-tight text-[#f15a24] uppercase">
                {HERO_SLIDES[currentSlide].subtitle}
              </h2>
            </motion.div>
          </AnimatePresence>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-slate-300 text-sm md:text-base lg:text-lg leading-relaxed font-light font-sans max-w-2xl mt-4"
          >
            We design, fabricate and construct safe, durable and modern Foot Over Bridges (FOB) and platform infrastructure across India. Standard compliant steel grade fabrication certified by Indian Railways.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap items-center gap-4 pt-6"
            id="hero-actions"
          >
            <button
              onClick={scrollToProjects}
              id="hero-view-projects-btn"
              className="bg-[#f15a24] hover:bg-[#d94817] text-white px-7 py-3.5 rounded-sm font-display text-xs font-black tracking-widest flex items-center gap-2 transition-all shadow-lg hover:shadow-orange-500/20 active:scale-95 cursor-pointer"
            >
              VIEW PROJECTS
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenQuote}
              id="hero-get-quote-btn"
              className="border border-white/50 hover:border-white bg-white/5 hover:bg-white/15 text-white px-7 py-3.5 rounded-sm font-display text-xs font-bold tracking-widest flex items-center gap-2 transition-all backdrop-blur-sm active:scale-95 cursor-pointer"
            >
              GET A QUOTE
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Slider Indicators */}
      <div className="absolute bottom-8 right-8 z-20 hidden md:flex items-center gap-2">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${currentSlide === idx ? 'w-8 bg-[#f15a24]' : 'w-2 bg-white/45 hover:bg-white/70'}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Manual Slide Navigation Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 hidden sm:flex items-center justify-center w-10 h-10 rounded-full border border-white/20 hover:border-white bg-black/10 hover:bg-black/35 text-white/70 hover:text-white transition-all focus:outline-none cursor-pointer"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 hidden sm:flex items-center justify-center w-10 h-10 rounded-full border border-white/20 hover:border-white bg-black/10 hover:bg-black/35 text-white/70 hover:text-white transition-all focus:outline-none cursor-pointer"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </section>
  );
}
