/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin, Youtube, ChevronRight, CheckCircle } from 'lucide-react';

interface FooterProps {
  onOpenQuote: () => void;
  onOpenAbout: () => void;
  onOpenSafety: () => void;
  onOpenCareers: () => void;
  onOpenContact: () => void;
}

export default function Footer({
  onOpenQuote,
  onOpenAbout,
  onOpenSafety,
  onOpenCareers,
  onOpenContact
}: FooterProps) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleScrollToTop = (id: string = 'home') => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const pos = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: pos - offset,
        behavior: 'smooth'
      });
    }
  };

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Direct corporate email format validation to keep leads high quality
    if (!email.includes('@') || email.length < 5) {
      setErrorMsg('Please enter a valid business email address.');
      return;
    }

    setErrorMsg('');
    setIsSubscribed(true);
    setEmail('');
    // Clear success banner dynamically after some seconds
    setTimeout(() => {
      setIsSubscribed(false);
    }, 6000);
  };

  return (
    <footer className="bg-[#05142b] text-white pt-16 pb-8 border-t border-slate-800/60 relative z-10 print:hidden" id="footer-main">
      
      {/* 2. Standard Footer Grid Links */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Column 1: Logo & Statement */}
        <div className="space-y-5 text-left">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => handleScrollToTop('home')}>
            <svg viewBox="0 0 120 70" className="w-[120px] h-[75px]">
              <image
                href="public/assets/images/newlogo1.png"
                width="120"
                height="90"
                preserveAspectRatio="xMidYMid meet"
              />
            </svg>
            <div className="flex flex-col">
              <span className="font-display text font-black text-[20px] tracking-tight leading-none text-white flex items-center">
                KAHEN <span className="text-[#f15a24] ml-1">INFRA</span>
              </span>
              <span className="text-[12px] tracking-[0.25em] font-medium text-slate-400 uppercase leading-none mt-[1px]">
               (OPC) Private Limited
              </span>
            </div>
          </div>
          
          <p className="text-slate-400 font-sans text-xs md:text-sm leading-relaxed">
            <strong className="font-bold text-white">Kahen Infra (OPC) Private Limited</strong> is a trusted name in railway station infrastructure, specializing in Foot Over Bridge construction and related steel structures across major divisions.
          </p>

          <div className="flex items-center gap-3 text-slate-400">
            <a href="#" className="hover:text-[#f15a24] transition-colors"><Facebook className="w-4 h-4" /></a>
            <a href="#" className="hover:text-[#f15a24] transition-colors"><Instagram className="w-4 h-4" /></a>
            <a href="#" className="hover:text-[#f15a24] transition-colors"><Linkedin className="w-4 h-4" /></a>
            <a href="#" className="hover:text-[#f15a24] transition-colors"><Youtube className="w-4 h-4" /></a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="space-y-4 text-left">
          <h4 className="font-display font-bold text-sm tracking-wider uppercase border-b border-slate-800 pb-2.5 text-[#f15a24]">
            QUICK LINKS
          </h4>
          <ul className="space-y-2 text-xs md:text-sm text-slate-400 font-sans" id="footer-quick-links">
            <li>
              <button 
                onClick={() => handleScrollToTop('home')} 
                className="hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
              >
                <ChevronRight className="w-3.5 h-3.5" /> Home
              </button>
            </li>
            <li>
              <button 
                onClick={onOpenAbout} 
                className="hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
              >
                <ChevronRight className="w-3.5 h-3.5" /> About Us
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleScrollToTop('services')} 
                className="hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
              >
                <ChevronRight className="w-3.5 h-3.5" /> Services
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleScrollToTop('projects')} 
                className="hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
              >
                <ChevronRight className="w-3.5 h-3.5" /> Projects
              </button>
            </li>
            <li>
              <button 
                onClick={onOpenSafety} 
                className="hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
              >
                <ChevronRight className="w-3.5 h-3.5" /> Safety & Quality
              </button>
            </li>
            <li>
              <button 
                onClick={onOpenCareers} 
                className="hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
              >
                <ChevronRight className="w-3.5 h-3.5" /> Careers
              </button>
            </li>
            <li>
              <button 
                onClick={onOpenContact} 
                className="hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
              >
                <ChevronRight className="w-3.5 h-3.5" /> Contact Us
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Services map */}
        <div className="space-y-4 text-left">
          <h4 className="font-display font-bold text-sm tracking-wider uppercase border-b border-slate-800 pb-2.5 text-[#f15a24]">
            OUR SERVICES
          </h4>
          <ul className="space-y-2 text-xs md:text-sm text-slate-400 font-sans" id="footer-services-list">
            <li className="hover:text-white cursor-pointer transition-colors flex items-center gap-1" onClick={() => handleScrollToTop('services')}>
              <ChevronRight className="w-3.5 h-3.5" /> Foot Over Bridge Construction
            </li>
            <li className="hover:text-white cursor-pointer transition-colors flex items-center gap-1" onClick={() => handleScrollToTop('services')}>
              <ChevronRight className="w-3.5 h-3.5" /> Platform Connectivity Bridges
            </li>
            <li className="hover:text-white cursor-pointer transition-colors flex items-center gap-1" onClick={() => handleScrollToTop('services')}>
              <ChevronRight className="w-3.5 h-3.5" /> Steel Girder Fabrication
            </li>
            <li className="hover:text-white cursor-pointer transition-colors flex items-center gap-1" onClick={() => handleScrollToTop('services')}>
              <ChevronRight className="w-3.5 h-3.5" /> Station Redevelopment
            </li>
            <li className="hover:text-white cursor-pointer transition-colors flex items-center gap-1" onClick={() => handleScrollToTop('services')}>
              <ChevronRight className="w-3.5 h-3.5" /> Pedestrian Skywalks
            </li>
            <li className="hover:text-white cursor-pointer transition-colors flex items-center gap-1" onClick={() => handleScrollToTop('services')}>
              <ChevronRight className="w-3.5 h-3.5" /> Maintenance & Rehabilitation
            </li>
          </ul>
        </div>

        {/* Column 4: Contact helpline sitemap */}
        <div className="space-y-4 text-left">
          <h4 className="font-display font-bold text-sm tracking-wider uppercase border-b border-slate-800 pb-2.5 text-[#f15a24]">
            CONTACT US
          </h4>
          
          <div className="space-y-3 font-sans text-xs md:text-sm text-slate-400" id="footer-contacts">
            <div className="flex gap-2 items-start">
              <MapPin className="w-4 h-4 text-[#f15a24] shrink-0 mt-0.5" />
              <span>Kahen Infra (OPC) Private Limited, Dahnu, Mumbai, Maharashtra, India</span>
            </div>
            
            <div className="flex gap-2 items-center">
              <Phone className="w-4 h-4 text-[#f15a24] shrink-0" />
              <a href="tel:+919096213517" className="hover:text-white font-mono">+91 9096213517</a>
            </div>

            <div className="flex gap-2 items-center">
              <Mail className="w-4 h-4 text-[#f15a24] shrink-0" />
              <a href="mailto:md@kaheninfra.com" className="hover:text-white">md@kaheninfra.com</a>
            </div>
          </div>

          <button
            onClick={onOpenQuote}
            id="footer-quote-btn"
            className="w-full bg-[#f15a24] hover:bg-[#d94817] text-white py-3 rounded-sm font-display text-xs font-black tracking-widest flex items-center justify-center gap-1 transition-all shadow-md active:scale-95 cursor-pointer mt-5"
          >
            GET A QUOTE &rarr;
          </button>
        </div>

      </div>

      {/* Copyright border */}
      <div className="max-w-7xl mx-auto px-4 mt-12 pt-6 border-t border-slate-800/60 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-sans">
        <div>
  © 2026 Kahen Infra (OPC) Private Limited. All Rights Reserved. | Developed by{" "}
  <a
    href="https://www.digitalrootsolution.com"
    target="_blank"
    rel="noopener noreferrer"
    className="text-slate-400 font-bold hover:text-slate-300"
  >
    Digital Root Solutions
  </a>
  {" | "}
  <a
    href="https://ravisingh07.com/"
    target="_blank"
    rel="noopener noreferrer"
    className="text-slate-400 font-bold hover:text-slate-300"
  >
    Ravi Singh
  </a>
</div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-slate-300">Privacy Clauses</a>
          <span>·</span>
          <a href="#" className="hover:text-slate-300">RDSO Quality Policy</a>
        </div>
      </div>
    </footer>
  );
}
