/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Projects from './components/Projects';
import Clients from './components/Clients';
import IndiaMapVisualization from './components/IndiaMapVisualization';
import WhyChooseUs from './components/WhyChooseUs';
import QuoteCalculator from './components/QuoteCalculator';
import AboutModal from './components/AboutModal';
import SafetyModal from './components/SafetyModal';
import CareersModal from './components/CareersModal';
import ContactModal from './components/ContactModal';
import Footer from './components/Footer';
import PremiumLoader from './components/PremiumLoader';


export default function App() {
  // Loading preloader state
  const [isLoading, setIsLoading] = useState(true);

  // Modal states
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isSafetyOpen, setIsSafetyOpen] = useState(false);
  const [isCareersOpen, setIsCareersOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Active navigation section state
  const [activeSection, setActiveSection] = useState('home');

  // Track intersection of scroll sections to update sticky navigation styles
  useEffect(() => {
    const sectionIds = ['home', 'services', 'projects'];
    const observers = sectionIds.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { 
          threshold: 0.25, 
          rootMargin: '-10% 0px -40% 0px' 
        }
      );

      observer.observe(el);
      return { el, observer };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <PremiumLoader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-[#f15a24] selection:text-white" id="main-layout">
        
        {/* Header Navigation Menu bar */}
        <Header 
          activeSection={activeSection} 
          onOpenQuote={() => setIsQuoteOpen(true)}
          onOpenAbout={() => setIsAboutOpen(true)}
          onOpenSafety={() => setIsSafetyOpen(true)}
          onOpenCareers={() => setIsCareersOpen(true)}
          onOpenContact={() => setIsContactOpen(true)}
        />

        <main className="flex-grow">
          
          {/* 1. Hero Cover */}
          <Hero onOpenQuote={() => setIsQuoteOpen(true)} />

          {/* 2. Operations and Core Services */}
          <Services onOpenContact={() => setIsContactOpen(true)} />

          {/* 3. Recent Project Cases showcase */}
          <Projects onOpenContact={() => setIsContactOpen(true)} />

          {/* Our Trusted Clients */}
          <Clients />

          {/* 4. India Railway Network Coverage map */}
          <IndiaMapVisualization />

          {/* 5. Core values accordion and operational metrics */}
          <WhyChooseUs />

        </main>

        {/* Footer */}
        <Footer
          onOpenQuote={() => setIsQuoteOpen(true)}
          onOpenAbout={() => setIsAboutOpen(true)}
          onOpenSafety={() => setIsSafetyOpen(true)}
          onOpenCareers={() => setIsCareersOpen(true)}
          onOpenContact={() => setIsContactOpen(true)}
        />

      </div>

      {/* Supplementary Interactive Modal engines */}
      <QuoteCalculator 
        isOpen={isQuoteOpen} 
        onClose={() => setIsQuoteOpen(false)} 
      />

      <AboutModal 
        isOpen={isAboutOpen} 
        onClose={() => setIsAboutOpen(false)} 
      />

      <SafetyModal 
        isOpen={isSafetyOpen} 
        onClose={() => setIsSafetyOpen(false)} 
      />

      <CareersModal 
        isOpen={isCareersOpen} 
        onClose={() => setIsCareersOpen(false)} 
      />

      <ContactModal 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
      />
    </>
  );
}
