/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface PremiumLoaderProps {
  onComplete: () => void;
}

export default function PremiumLoader({ onComplete }: PremiumLoaderProps) {
  const [progress, setProgress] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  // Prevent background scrolling while the preloader is active
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Precise frame-by-frame loading progress animation (1.0 second duration)
  useEffect(() => {
    let animFrameId: number;
    const duration = 1000; // 1 second progress load
    const startTime = performance.now();

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const currentProgress = Math.min(100, (elapsed / duration) * 100);
      setProgress(currentProgress);

      if (currentProgress < 100) {
        animFrameId = requestAnimationFrame(animate);
      } else {
        // Subtle hold of 150ms at 100% before triggering completion
        const timeout = setTimeout(() => {
          onComplete();
        }, 150);
        return () => clearTimeout(timeout);
      }
    };

    animFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameId);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white text-slate-800 overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        y: shouldReduceMotion ? 0 : -20,
        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } // Smooth easeOutExpo
      }}
    >
      {/* Brand Centerpiece */}
      <motion.div
        className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-8 text-center sm:text-left select-none px-4"
        initial={{ 
          opacity: 0, 
          y: shouldReduceMotion ? 0 : 15,
          scale: shouldReduceMotion ? 1 : 0.97
        }}
        animate={{ 
          opacity: 1, 
          y: 0,
          scale: 1 
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Company Logo Image Symbol */}
        <div className="w-[90px] h-[55px] sm:w-[110px] sm:h-[65px] flex items-center justify-center">
          <img
            src="/assets/images/logoquote.png"
            alt="Kahen Infra Logo"
            className="w-full h-full object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.02)]"
            draggable={false}
          />
        </div>

        {/* Corporate Divider Line (Hidden on mobile stack) */}
        <div className="hidden sm:block w-[1.5px] h-12 bg-slate-200" />

        {/* Corporate Brand Typography */}
        <div className="flex flex-col">
          <span className="font-display text-[26px] sm:text-[32px] font-black tracking-tight leading-none text-[#153e7a] flex items-center justify-center sm:justify-start">
            KAHEN <span className="text-[#f15a24] ml-1.5 font-black">INFRA</span>
          </span>
          <span className="text-[11px] sm:text-[12px] tracking-[0.25em] font-medium text-slate-500 uppercase leading-none mt-1.5">
            (OPC) Private Limited
          </span>
        </div>
      </motion.div>

      {/* Minimal Elegant Progress Line */}
      <div className="w-56 max-w-[70vw] h-[2px] bg-slate-100 rounded-full overflow-hidden relative">
        <motion.div
          className="h-full bg-gradient-to-r from-[#153e7a] to-[#f15a24] rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </motion.div>
  );
}
