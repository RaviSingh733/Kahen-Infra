/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { X, Target, Landmark, ShieldCheck, Factory } from 'lucide-react';
import { motion } from 'motion/react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AboutModal({ isOpen, onClose }: AboutModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true" id="about-modal-container">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/40 transition-opacity z-40"
        />

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        {/* Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25 }}
          className="relative z-50 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-2xl border border-slate-100 transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full"
          id="about-modal-content"
        >
          {/* Header */}
          <div className="bg-[#05142b] p-6 text-white flex justify-between items-center border-b border-slate-800">
            <div className="text-left">
              <span className="text-[10px] font-black text-[#f15a24] tracking-widest uppercase">ABOUT US</span>
              <h3 className="font-display font-black text-xl md:text-2xl tracking-tight uppercase leading-none mt-1">
                Kahen Infra (OPC) Private Limited
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-slate-800 hover:bg-[#f15a24] hover:text-white text-slate-300 transition-colors"
              id="close-about-modal-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 md:p-8 space-y-6 max-h-[70vh] overflow-y-auto text-slate-600 font-sans text-sm md:text-base">
            
            {/* Split Statement section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-3">
                <h4 className="font-display font-extrabold text-lg text-[#153e7a]">Engineering India's Railway Hubs</h4>
                <p className="leading-relaxed">
                  Kahen Infra (OPC) Private Limited is a trusted, premier class heavy-steel fabrication and engineering enterprise headquartered in Dahanu, Mumbai, Maharashtra. We engineer heavy bridge structures, passenger walkways, and modern canopy infrastructures that stand the test of time.
                </p>
                <p className="leading-relaxed">
                  Combining advanced computer-aided design capabilities with robust in-house welding yards, we deliver turn-key structures conforming explicitly to Indian Railways standards.
                </p>
              </div>
              <div className="relative rounded overflow-hidden h-48 md:h-64 bg-slate-100">
                <img
                  src="/assets/images/Aboutimage.jpeg"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Core Values / Assets Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4" id="about-values-grid">
              
              <div className="p-4 border border-slate-100 bg-slate-50 rounded flex gap-3">
                <Factory className="w-5 h-5 text-[#f15a24] shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-display font-black text-[#153e7a] text-xs uppercase tracking-wide">Heavy Fab Yards</h5>
                  <p className="text-[11px] leading-relaxed text-slate-500 mt-1">
                    Operating 12,000 sq. meter dedicated fabrication units in Mumbai and Palghar division channels.
                  </p>
                </div>
              </div>

              <div className="p-4 border border-slate-100 bg-slate-50 rounded flex gap-3">
                <Landmark className="w-5 h-5 text-[#f15a24] shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-display font-black text-[#153e7a] text-xs uppercase tracking-wide">Approved Vendor</h5>
                  <p className="text-[11px] leading-relaxed text-slate-500 mt-1">
                    Registered contractor for Western, Central, and Konkan Railway Divisions.
                  </p>
                </div>
              </div>

              <div className="p-4 border border-slate-100 bg-slate-50 rounded flex gap-3">
                <ShieldCheck className="w-5 h-5 text-[#f15a24] shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-display font-black text-[#153e7a] text-xs uppercase tracking-wide">Quality Audited</h5>
                  <p className="text-[11px] leading-relaxed text-slate-500 mt-1">
                    ISO 9001:2015 certified welding pipelines, satisfying complete RDSO welding specifications.
                  </p>
                </div>
              </div>

            </div>

            {/* Corporate Summary card */}
            <div className="p-4 bg-slate-50 border border-slate-100 rounded text-xs leading-relaxed space-y-1">
              <span className="font-bold text-[#153e7a] uppercase">Registered Corporate Credentials:</span>
              <p>CIN: U45201MH2022OPC390119 | Class-A Steel Structural Engineers | Corporate Head Office: Dahanu, Mumbai, Maharashtra, India.</p>
            </div>

          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
            <button
              onClick={onClose}
              className="bg-[#153e7a] hover:bg-[#0c2448] text-white px-6 py-2 rounded-sm font-display text-xs font-bold tracking-wider cursor-pointer transition-colors"
            >
              OK, GOT IT
            </button>
          </div>

        </motion.div>
      </div>
    </div>
  );
}
