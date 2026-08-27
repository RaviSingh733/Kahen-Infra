/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { X, ShieldCheck, Ruler, CheckCircle2, Award, ClipboardCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface SafetyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SafetyModal({ isOpen, onClose }: SafetyModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true" id="safety-modal-container">
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
          id="safety-modal-content"
        >
          {/* Header */}
          <div className="bg-[#05142b] p-6 text-white flex justify-between items-center border-b border-slate-800">
            <div className="text-left">
              <span className="text-[10px] font-black text-[#f15a24] tracking-widest uppercase">QUALITY MANAGEMENT</span>
              <h3 className="font-display font-black text-xl md:text-2xl tracking-tight uppercase leading-none mt-1">
                SAFETY & QUALITY STANDARDS
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-slate-800 hover:bg-[#f15a24] hover:text-white text-slate-300 transition-colors"
              id="close-safety-modal-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 md:p-8 space-y-6 max-h-[70vh] overflow-y-auto text-slate-600 font-sans text-sm md:text-base">
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-[#153e7a]">
                <ShieldCheck className="w-6 h-6 text-[#f15a24]" />
                <h4 className="font-display font-extrabold text-lg">Zero Compromise on Operating Tracks</h4>
              </div>
              <p className="leading-relaxed">
                Railway Foot Over Bridges (FOBs) carry intense daily dynamic crowd loads. Therefore, Kahen Infra maintains standard strict quality assurance plans (QAP) at every phase of design, steel raw material sourcing, heavy-cutting, fabrication, and blocking block erection.
              </p>
            </div>

            {/* Code Checklist Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              
              {/* Technical Codes Column */}
              <div className="space-y-3 bg-slate-50 p-5 rounded border border-slate-100">
                <h5 className="font-display font-black text-xs text-[#153e7a] uppercase tracking-wider flex items-center gap-2">
                  <ClipboardCheck className="w-4 h-4 text-[#f15a24]" /> STIPULATED INDIAN ROAD CODES
                </h5>
                <ul className="space-y-2.5 text-xs text-slate-500">
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span><strong>IRS Steel Bridge Code:</strong> Controls general design parameters under load combinations.</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span><strong>IS 800:2007:</strong> Structural steel code governing stress, deflection, and wind safety boundaries.</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span><strong>IRS Welded Bridge Code:</strong> Specifies criteria for manual and submerged arc welding.</span>
                  </li>
                </ul>
              </div>

              {/* NDT Inspections Column */}
              <div className="space-y-3 bg-slate-50 p-5 rounded border border-slate-100">
                <h5 className="font-display font-black text-xs text-[#153e7a] uppercase tracking-wider flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#f15a24]" /> NON-DESTRUCTIVE joint TESTING (NDT)
                </h5>
                <ul className="space-y-2.5 text-xs text-slate-500">
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span><strong>Ultrasonic Inspections (UT):</strong> Concurring complete zero-porosity weld profiles.</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span><strong>Shot Blasting Sa 2.5:</strong> Sourced surfaces completely descaled before treatment.</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span><strong>Dry Film Thickness (DFT) Test:</strong> Audit paint thickness up to 250 microns.</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* Environmental Safety paragraph */}
            <div className="p-4 border border-slate-100 bg-slate-50/50 rounded flex gap-3 text-xs leading-relaxed text-slate-500 items-start">
              <Ruler className="w-5 h-5 text-[#f15a24] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#153e7a] block mb-0.5">High-Velocity OHE Line Safety</span>
                During Overnight Block Erection, overhead high-tension electric lines (25 kV traction cables) are safely isolated in coordination with railway traction power controllers. All launching teams wear double-harness fall equipment and coordinate using strict hand-signals.
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
            <button
              onClick={onClose}
              className="bg-[#153e7a] hover:bg-[#0c2448] text-white px-6 py-2 rounded-sm font-display text-xs font-bold tracking-wider cursor-pointer transition-colors"
            >
              OK, I UNDERSTAND
            </button>
          </div>

        </motion.div>
      </div>
    </div>
  );
}
