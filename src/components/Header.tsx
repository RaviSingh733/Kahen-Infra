/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { MapPin, Mail, Phone, Facebook, Instagram, Linkedin, Youtube, Menu, X, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  onOpenQuote: () => void;
  onOpenAbout: () => void;
  onOpenSafety: () => void;
  onOpenCareers: () => void;
  onOpenContact: () => void;
  activeSection: string;
}

export default function Header({
  onOpenQuote,
  onOpenAbout,
  onOpenSafety,
  onOpenCareers,
  onOpenContact,
  activeSection
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Track window scroll to make header sticky and compact
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of sticky header
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'home', label: 'HOME', type: 'scroll' },
    { id: 'about', label: 'ABOUT US', type: 'modal', action: onOpenAbout },
    { id: 'services', label: 'SERVICES', type: 'scroll' },
    { id: 'projects', label: 'PROJECTS', type: 'scroll' },
    { id: 'safety', label: 'SAFETY & QUALITY', type: 'modal', action: onOpenSafety },
    { id: 'careers', label: 'CAREERS', type: 'modal', action: onOpenCareers },
    { id: 'contact', label: 'CONTACT US', type: 'modal', action: onOpenContact }
  ];

  return (
    <>
      {/* Top Bar - Hidden when scrolled to look cleaner */}
      <div className={`bg-[#05142b] text-white text-xs py-2.5 px-4 transition-all duration-300 ${isScrolled ? 'h-0 py-0 overflow-hidden opacity-0' : 'h-auto opacity-100'}`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-2 text-slate-300">
            <span className="flex items-center gap-2 hover:text-white transition-colors">
              <MapPin />
              <a href="https://maps.app.goo.gl/KnUm6QA5SuDfMUaE8" target="_blank" rel="noopener noreferrer" className="hover:text-[#f15a24] transition-colors">
                Dahnu, Mumbai, Maharashtra, India
              </a>
            </span>
            <span className="h-3 w-[1px] bg-slate-700 hidden sm:inline" />
            <a href="mailto:md@kaheninfra.com" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail className="w-3.5 h-3.5 text-[#f15a24]" />
              md@kaheninfra.com
            </a>
            <span className="h-3 w-[1px] bg-slate-700 hidden sm:inline" />
            <a href="tel:+99351879414" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 text-[#f15a24]" />
              +91 9036213517
            </a>
          </div>
          
          <div className="flex items-center gap-4 text-slate-300">
            <span className="text-slate-400">Follow Us :</span>
            <div className="flex items-center gap-4.5">
              <a href="#" className="hover:text-[#f15a24] transition-colors"><Facebook className="w-4 h-4" /></a>
              <a href="#" className="hover:text-[#f15a24] transition-colors"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="hover:text-[#f15a24] transition-colors"><Linkedin className="w-4 h-4" /></a>
              <a href="#" className="hover:text-[#f15a24] transition-colors"><Youtube className="w-4 h-4" /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg py-2.5' : 'bg-white/95 py-4 border-b border-slate-100'}`}>
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          
          {/* Logo */}
          <div className="cursor-pointer flex items-center gap-2.5" onClick={() => scrollToSection('home')} id="logo-header">
            <svg viewBox="0 0 120 70" className="w-[70px] h-[40px]">
  <image
    href="/assets/images/logo2.png"
    width="110"
    height="70"
    preserveAspectRatio="xMidYMid meet"
  />
</svg>
           
            <div className="flex flex-col">
              <span className="font-display text font-black text-[25px] tracking-tight leading-none text-[#153e7a] flex items-center">
                KAHEN <span className="text-[#f15a24] ml-1">INFRA</span>
              </span>
              <span className="text-[12px] tracking-[0.25em] font-medium text-slate-500 uppercase leading-none mt-[1px]">
               (OPC) Private Limited
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => {
              const isScrollActive = item.type === 'scroll' && activeSection === item.id;
              return (
                <button
                  key={item.label}
                  id={`nav-${item.id}`}
                  onClick={() => item.type === 'scroll' ? scrollToSection(item.id) : item.action?.()}
                  className={`font-display text-xs font-bold tracking-wider relative py-1.5 transition-colors cursor-pointer ${
                    isScrollActive 
                      ? 'text-[#f15a24]' 
                      : 'text-slate-700 hover:text-[#153e7a]'
                  }`}
                >
                  {item.label}
                  {isScrollActive && (
                    <motion.div 
                      layoutId="navIndicator" 
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#f15a24]" 
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Get Quote Action */}
          <div className="hidden lg:block">
            <button
              onClick={onOpenQuote}
              id="header-quote-btn"
              className="bg-[#f15a24] hover:bg-[#d94817] text-white font-display text-xs font-black tracking-widest py-3 px-6 rounded-sm shadow-md shadow-orange-500/10 hover:shadow-orange-500/25 active:scale-95 transition-all cursor-pointer"
            >
              GET A QUOTE
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-1 text-slate-800 hover:text-[#153e7a] focus:outline-none transition-colors"
            aria-label="Toggle Menu"
            id="mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
            id="mobile-drawer-overlay"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white p-6 shadow-2xl flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <div> 
                <div className="flex justify-between items-center pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="font-display font-black text-lg tracking-tight text-[#153e7a]">
                      Kahen <span className="text-[#f15a24]">Infra</span> OPC Private Limited
                    </span>   
                  </div>
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-50 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex flex-col gap-4 py-8">
                  {navItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => {
                        if (item.type === 'scroll') {
                          scrollToSection(item.id);
                        } else {
                          setIsMobileMenuOpen(false);
                          item.action?.();
                        }
                      }}
                      className="text-left font-display text-sm font-bold text-slate-800 hover:text-[#f15a24] py-2 transition-colors border-b border-slate-50/50"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenQuote();
                  }}
                  className="w-full bg-[#f15a24] text-white py-3 font-display font-extrabold text-xs tracking-wider rounded-md hover:bg-orange-600 transition-colors"
                >
                  GET A QUOTE
                </button>
                <div className="text-center text-[10px] text-slate-400">
                  © 2026 Kahen Infra Private Limited
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
