/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { Award, Briefcase, Network, ShieldCheck, Users, HelpCircle, HardHat, FileSignature, Calendar, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

// Live count-up helper with intersection observer support
const CountUp = ({ target, suffix = '', duration = 1500 }: { target: number; suffix?: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let startTimestamp: number | null = null;
    let frameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) {
        frameId = window.requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        frameId = window.requestAnimationFrame(step);
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameId);
    };
  }, [target, duration]);

  return <span ref={elementRef}>{count}{suffix}</span>;
};

const STATS = [
  { icon: Calendar, target: 2022, suffix: '', label: 'Year Founded' },
  { icon: Briefcase, target: 30, suffix: '+', label: 'FOB Projects Completed' },
  { icon: TrendingUp, target: 5, suffix: '+', label: 'Ongoing Projects' },
  { icon: Network, target: 35, suffix: '+', label: 'Stations Connected' },
  { icon: ShieldCheck, target: 100, suffix: '%', label: 'Safety Compliance' },
  { icon: Users, target: 200, suffix: '+', label: 'Skilled Professionals' },
];

const PANORAMA_GALLERY = [
  {
    station: 'Neral Junction',
    span: '385.0M SKYWALK',
    img: '/assets/images/neral385meter.jpeg'
  },
  {
    station: 'Vasai Road',
    span: '220.0M PLATFORM CONNECT',
    img: '/assets/images/Vasaistation.webp'
  },
  {
    station: 'Nala Sopara',
    span: '95.0M WARREN TRUSS',
    img: '/assets/images/Nala Sopara fob.avif'
  },
  {
    station: 'Panvel Junction',
    span: '220.0M ERECTION SPAN',
    img: '/assets/images/Panvel.jpeg'
  },
  {
    station: 'Virar Station',
    span: '220.0M CONCOURSE DECK',
    img: '/assets/images/Virar deck.png'
  }
];

export default function WhyChooseUs() {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);

  const AccordionData = [
    {
      title: "RDSO Standard Compliance Guarantee",
      desc: "All design approvals and blueprints follow absolute IRS Welded Bridge Codes (IRS-B1-2001) parameters. Every batch is certified with an official QAP report.",
      icon: HardHat
    },
    {
      title: "Overnight Block Lunching Mastery",
      desc: "We perform heavy girder launchings in standard critical railway traffic blocks (usually 3 to 4 hours) without disrupting core freight or high-speed express corridors.",
      icon: Network
    },
    {
      title: "State-of-the-Art Welding & Testing Yards",
      desc: "Our automated Submerged Arc Welding (SAW) and robust shot-blasting machines ensure precise, zero-porosity, high-tensile joint lines tested using Radiant & Ultrasonics.",
      icon: FileSignature
    }
  ];

  return (
    <section className="bg-white pt-20 pb-0 overflow-hidden" id="why-choose-us">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Intro Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          
          {/* Text and Accordion */}
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-black tracking-widest text-[#f15a24] uppercase block mb-3">
                WHY CHOOSE US
              </span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#153e7a] uppercase leading-tight">
                Building Safe Connections That Last Forever
              </h2>
              <div className="w-16 h-1.5 bg-[#f15a24] rounded-full mt-4" />
            </div>
            
            <p className="text-slate-500 font-sans text-sm md:text-base leading-relaxed">
              We combine engineering excellence with quality workmanship to deliver FOBs and station infrastructure that stands the test of time. Here is the operational core that distinguishes our steel work.
            </p>

            {/* In-Line Accordion detailing Kahen core work */}
            <div className="space-y-3" id="why-choose-us-accordion">
              {AccordionData.map((item, index) => {
                const Icon = item.icon;
                const isOpen = activeAccordion === index;
                return (
                  <div 
                    key={index} 
                    className={`border rounded-md transition-all duration-300 ${
                      isOpen ? 'border-[#153e7a] bg-slate-50/50' : 'border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    <button 
                      onClick={() => setActiveAccordion(isOpen ? null : index)}
                      className="w-full px-5 py-4 flex items-center justify-between text-left font-display font-bold text-[#153e7a] text-sm md:text-base focus:outline-none cursor-pointer"
                    >
                      <span className="flex items-center gap-3">
                        <Icon className={`w-5 h-5 ${isOpen ? 'text-[#f15a24]' : 'text-[#153e7a]'}`} />
                        {item.title}
                      </span>
                      <span className="text-[#f15a24] font-mono text-lg font-black">{isOpen ? '−' : '+'}</span>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-slate-500 text-xs md:text-sm leading-relaxed font-sans border-t border-slate-50">
                        {item.desc}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stats Column Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4" id="stats-grid">
            {STATS.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={idx} 
                  className="bg-slate-50/80 p-5 rounded-md border border-slate-100 flex flex-col justify-between items-center text-center shadow-sm hover:shadow-md transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[#f15a24] mb-4">
                    <Icon className="w-5 h-5 pointer-events-none" />
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-display font-black text-[#153e7a] tracking-tight mb-1">
                      <CountUp target={stat.target} suffix={stat.suffix} />
                    </div>
                    <div className="text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-wider leading-tight">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
        </div>

        {/* Global Track Panorama Portfolio Gallery at the bottom of the section */}
        <div className="mt-16 -mx-4 overflow-x-hidden">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-1 select-none">
            {PANORAMA_GALLERY.map((p, idx) => (
              <div 
                key={idx} 
                className={`relative h-32 md:h-44 bg-slate-900 overflow-hidden group border-r border-[#05142b]/5 ${
                  idx === 4 ? 'col-span-2 md:col-span-1' : ''
                }`}
              >
                <img 
                  src={p.img} 
                  alt={p.station} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                
                {/* Details layout */}
                <div className="absolute bottom-3 left-3 text-white text-left font-sans">
                  <div className="text-[9px] font-black tracking-wider uppercase text-[#f15a24] mb-0.5">{p.span}</div>
                  <div className="text-xs font-bold leading-tight truncate max-w-[150px]">{p.station}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
