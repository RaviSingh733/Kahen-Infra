/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface PremiumLoaderProps {
  onComplete: () => void;
}

export default function PremiumLoader({ onComplete }: PremiumLoaderProps) {
  const [isWindowLoaded, setIsWindowLoaded] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);

  // Disable body scroll while loader is active to prevent scroll artifacting
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Listen to window load event
  useEffect(() => {
    if (document.readyState === 'complete') {
      setIsWindowLoaded(true);
    } else {
      const handleLoad = () => setIsWindowLoaded(true);
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  // Guarantee minimum visible time (e.g. 1.0 second) for the brand animation to execute beautifully
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Complete loading when both window resources are loaded and minimum duration has elapsed
  useEffect(() => {
    if (isWindowLoaded && minTimeElapsed) {
      onComplete();
    }
  }, [isWindowLoaded, minTimeElapsed, onComplete]);

  // Animation variants for staggered typography
  const titleContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.1
      }
    }
  } as const;

  const letterVariant = {
    hidden: { opacity: 0, y: 12 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", damping: 15, stiffness: 180 }
    }
  } as const;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#020712] text-white overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        y: -40,
        transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } 
      }}
    >
      {/* Ambient background pulsing glow blobs (Luxury theme) */}
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-[#153e7a]/15 rounded-full filter blur-[120px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-[#f15a24]/8 rounded-full filter blur-[120px] animate-pulse pointer-events-none" style={{ animationDelay: '2s' }} />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:45px_45px] pointer-events-none opacity-40" />

      {/* Technical Corner layout markings */}
      <div className="absolute top-8 left-8 border-t border-l border-white/10 w-5 h-5 pointer-events-none" />
      <div className="absolute top-8 right-8 border-t border-r border-white/10 w-5 h-5 pointer-events-none" />
      <div className="absolute bottom-8 left-8 border-b border-l border-white/10 w-5 h-5 pointer-events-none" />
      <div className="absolute bottom-8 right-8 border-b border-r border-white/10 w-5 h-5 pointer-events-none" />

      {/* Central Glassmorphism Card */}
      <motion.div
        className="bg-[#05142b]/40 backdrop-blur-xl border border-white/10 rounded-2xl p-10 flex flex-col items-center shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] z-10 max-w-sm w-[90vw]"
        initial={{ opacity: 0, y: 25, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Company Logo in natural aspect ratio (un-cropped) */}
        <div className="h-16 w-full flex items-center justify-center mb-8 relative">
          <img
            src="/assets/images/newlogo1.png"
            alt="Kahen Infra Logo"
            className="h-full max-w-[80%] object-contain relative z-10 filter drop-shadow-[0_0_12px_rgba(255,255,255,0.2)] select-none"
            draggable={false}
          />
        </div>

        {/* Brand Name Typography */}
        <div className="text-center select-none w-full">
          <motion.h1 
            className="font-display text-2xl md:text-3xl font-black tracking-widest text-white leading-none flex justify-center gap-[1px]"
            variants={titleContainer}
            initial="hidden"
            animate="visible"
          >
            {"KAHEN".split("").map((char, i) => (
              <motion.span key={`k-${i}`} variants={letterVariant} className="drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
                {char}
              </motion.span>
            ))}
            <span className="w-2.5" />
            {"INFRA".split("").map((char, i) => (
              <motion.span key={`i-${i}`} variants={letterVariant} className="text-[#f15a24] drop-shadow-[0_0_12px_rgba(241,90,36,0.4)]">
                {char}
              </motion.span>
            ))}
          </motion.h1>
          
          <motion.p 
            className="text-[9px] md:text-[10px] font-bold tracking-[0.3em] text-slate-400 uppercase mt-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            (OPC) Private Limited
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
}
