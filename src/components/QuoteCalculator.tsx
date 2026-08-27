/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Hammer, 
  Ruler, 
  Layers, 
  TrendingUp, 
  Printer, 
  Send, 
  FileCheck, 
  CheckCircle2,
  BadgeAlert
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { QuoteEstimate } from '../types';

interface QuoteCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

const INITIAL_ESTIMATE: QuoteEstimate = {
  span: 36,
  tracks: 2,
  width: 3.0,
  girderType: 'truss',
  staircases: 2,
  ramps: 0,
  escalators: 0,
  roofType: 'tin',
  safetyWindZone: 'III',
  elevationOption: false
};

export default function QuoteCalculator({ isOpen, onClose }: QuoteCalculatorProps) {
  const [step, setStep] = useState(1);
  const [estimate, setEstimate] = useState<QuoteEstimate>(INITIAL_ESTIMATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [quoteRef, setQuoteRef] = useState('');
  
  // Contact details
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    authority: 'Railways Division Officer', // Divisional authority
    division: '',
    notes: ''
  });

  if (!isOpen) return null;

  // Real-time structural estimation logics
  const calculateSteelTonnage = () => {
    // Base weight per meter multiplier depending on width
    let baseWeightPerMeter = 1.3; // 1.3 Metric tons per meter for 3m width
    if (estimate.width === 4.8) baseWeightPerMeter = 2.0;
    if (estimate.width === 6.0) baseWeightPerMeter = 2.8;
    if (estimate.width === 9.0) baseWeightPerMeter = 4.2;

    // Truss multiplier
    let girderFactor = 1.0;
    if (estimate.girderType === 'bowstring') girderFactor = 1.25; // Bowstring needs bigger structural profile
    if (estimate.girderType === 'plate') girderFactor = 1.15;

    // Tracks scaling factor (long-spans need deeper girders to withstand deflection)
    const spanFactor = estimate.span * (1 + (estimate.tracks * 0.05));

    let mainGirderTonnage = spanFactor * baseWeightPerMeter * girderFactor;

    // Add staircase weight (approx 8 MT per staircase structure)
    const stairTonnage = estimate.staircases * 8.5;

    // Add ramp weight (approx 18 MT per ramp because of length-slope limits)
    const rampTonnage = estimate.ramps * 18.0;

    // Add escalators attachment steel support trusses (approx 12 MT per escalator)
    const escalatorTonnage = estimate.escalators * 12.0;

    // Wind zone coefficients
    let windZoneCoeff = 1.0;
    if (estimate.safetyWindZone === 'IV') windZoneCoeff = 1.08;
    if (estimate.safetyWindZone === 'V') windZoneCoeff = 1.18;

    const totalTonnage = (mainGirderTonnage + stairTonnage + rampTonnage + escalatorTonnage) * windZoneCoeff;
    return Math.round(totalTonnage * 10) / 10;
  };

  const calculateCostEstimate = () => {
    const tonnage = calculateSteelTonnage();
    // Heavy structural fabrication + galvanization + overnight erection block average ₹1,35,000 per MT
    const fabricationCost = tonnage * 135000;
    
    // Support piers (pylon foundations): approx ₹15,00,000 per pier. Estimate 1 pier per 15m span.
    const approximatePiers = Math.max(2, Math.ceil(estimate.span / 15) + 1);
    const civilFoundationCost = approximatePiers * 1500000;

    // Roof & sheeting
    let roofingCost = estimate.span * estimate.width * 2200; // Tin/PPGI
    if (estimate.roofType === 'polycarbonate') roofingCost = estimate.span * estimate.width * 4500;
    if (estimate.roofType === 'standing_seam') roofingCost = estimate.span * estimate.width * 3200;

    const subTotal = fabricationCost + civilFoundationCost + roofingCost;
    
    // GST 18% for Railway contracts
    const gstValue = subTotal * 0.18;
    const finalTotal = subTotal + gstValue;

    return {
      fabCost: Math.round(fabricationCost),
      civilCost: Math.round(civilFoundationCost),
      roofCost: Math.round(roofingCost),
      gst: Math.round(gstValue),
      subtotal: Math.round(subTotal),
      total: Math.round(finalTotal)
    };
  };

  const calculateTimeline = () => {
    // Math of timeframe in days
    let days = 60; // minimum approval + fab
    days += Math.ceil(estimate.span * 1.5);
    days += estimate.staircases * 10;
    days += estimate.ramps * 20;
    days += estimate.escalators * 15;
    return days;
  };

  const cost = calculateCostEstimate();
  const tonnage = calculateSteelTonnage();
  const timeline = calculateTimeline();

  const handleStepNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleStepPrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmitQuote = (e: FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.phone) {
      alert('Please fill out all required contact fields.');
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      const generatedRef = `KINFRA-FOB-${Math.floor(10000 + Math.random() * 90000)}`;
      setQuoteRef(generatedRef);
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 1500);
  };

  // Triggers modern local print system
  const handlePrintQuote = () => {
  window.print();
};

  // Reset form
  const handleReset = () => {
    setStep(1);
    setEstimate(INITIAL_ESTIMATE);
    setSubmitSuccess(false);
    setContactForm({
      name: '',
      email: '',
      phone: '',
      authority: 'Railways Division Officer',
      division: 'Northern Railway',
      notes: ''
    });
  };

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true" id="quote-modal-container">
      <div className="flex items-center justify-center min-h-screen print:min-h-0 px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        
        {/* Overlay */}
        <motion.div
          id="quote-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/40 transition-opacity z-40"
        />

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        {/* Modal Sheet container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25 }}
          className="relative z-50 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-2xl border border-slate-100 transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full print:shadow-none print:border-none print:my-0"
          id="quote-modal-content"
        >
          {/* Header Banner */}
          <div className="bg-[#05142b] p-6 text-white flex justify-between items-center border-b border-slate-800 print:bg-white print:text-slate-900 print:p-4">
            <div className="text-left">
              <span className="text-[10px] font-black text-[#f15a24] tracking-widest uppercase">KAHEN INFRA ESTIMATOR</span>
              <h3 className="font-display font-black text-xl md:text-2xl tracking-tight uppercase leading-none mt-1">
                FOB Steel Weight & Cost Calculator
              </h3>
            </div>
            
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-slate-800/80 hover:bg-[#f15a24] hover:text-white text-slate-300 transition-colors print:hidden focus:outline-none"
              id="close-estimator-modal-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {!submitSuccess ? (
            /* Multi-step Quote Flow */
            <div className="grid grid-cols-1 lg:grid-cols-12 print:block">
              
              {/* Left Column: Metrics Input Parameters */}
              <div className="lg:col-span-7 p-6 border-r border-slate-100 max-h-[70vh] overflow-y-auto print:max-h-none print:overflow-visible print:hidden">
            
                {/* Step Indicators */}
                <div className="flex items-center gap-1.5 mb-8">
                  {[1, 2, 3].map((s) => (
                    <div key={s} className="flex items-center gap-1.5">
                      <div 
                        className={`w-7 h-7 rounded-full font-mono text-xs font-bold flex items-center justify-center transition-all ${
                          step === s 
                            ? 'bg-[#153e7a] text-white shadow-md' 
                            : step > s 
                              ? 'bg-emerald-100 text-emerald-700' 
                              : 'bg-slate-100 text-slate-400'
                        }`}
                      >
                        {s}
                      </div>
                      <span className={`text-[10px] font-black tracking-widest uppercase hidden sm:inline ${
                        step === s ? 'text-[#153e7a]' : 'text-slate-400'
                      }`}>
                        {s === 1 ? 'Structural Size' : s === 2 ? 'Truss Accessories' : 'Contact File'}
                      </span>
                      {s < 3 && <ChevronRight className="w-4 h-4 text-slate-300 hidden sm:inline" />}
                    </div>
                  ))}
                </div>

                {/* Step 1 Content: Size Metric */}
                {step === 1 && (
                  <div className="space-y-6 text-left">
                    <h4 className="font-display font-black text-md text-[#153e7a] border-b pb-2 uppercase tracking-wide">
                      1. Size & Span Metrics
                    </h4>

                    {/* Span slider (meters) */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center font-display">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-wider flex items-center gap-1">
                          <Ruler className="w-4 h-4 text-[#f15a24]" /> BRIDGE CLEAR SPAN (METERS)
                        </label>
                        <span className="font-mono text-sm font-black text-[#153e7a] bg-slate-100 px-2.5 py-0.5 rounded-sm">
                          {estimate.span} Meters
                        </span>
                      </div>
                      <input
                        type="range"
                        min="15"
                        max="120"
                        step="3"
                        value={estimate.span}
                        onChange={(e) => setEstimate({ ...estimate, span: parseInt(e.target.value) })}
                        className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#153e7a]"
                        id="span-slider"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        <span>15m (Short Span)</span>
                        <span>60m (Medium Span)</span>
                        <span>120m (Ultra Wide)</span>
                      </div>
                    </div>

                    {/* Walkway Width options */}
                    <div className="space-y-3">
                      <label className="text-xs font-black text-slate-500 uppercase tracking-wider block">
                        CLEAR PLATFORM WALKWAY WIDTH
                      </label>
                      <div className="grid grid-cols-2 gap-3" id="walkway-width-options">
                        {[
                          { val: 3.0, label: '3.0 Meters', desc: 'Standard single corridor' },
                          { val: 4.8, label: '4.8 Meters', desc: 'Amrit Bharat Medium' },
                          { val: 6.0, label: '6.0 Meters', desc: 'High-density Hub / Festival' },
                          { val: 9.0, label: '9.0 Meters', desc: 'Erected Concourse Area' }
                        ].map((opt) => (
                          <button
                            key={opt.val}
                            type="button"
                            onClick={() => setEstimate({ ...estimate, width: opt.val })}
                            id={`width-opt-${opt.val.toString().replace('.', '-')}`}
                            className={`p-3 text-left rounded border transition-all cursor-pointer ${
                              estimate.width === opt.val
                                ? 'border-[#153e7a] bg-slate-50'
                                : 'border-slate-200 hover:border-slate-300 bg-white'
                            }`}
                          >
                            <span className="font-display font-black text-xs block text-[#153e7a]">
                              {opt.label}
                            </span>
                            <span className="text-[10px] text-slate-400 leading-none">{opt.desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Core standard Track parameters */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-wider block">
                          TRACKS TO BRIDGE
                        </label>
                        <select
                          value={estimate.tracks}
                          onChange={(e) => setEstimate({ ...estimate, tracks: parseInt(e.target.value) })}
                          id="tracks-select"
                          className="w-full p-2.5 bg-white border border-slate-200 rounded text-xs font-semibold text-slate-700"
                        >
                          <option value="2">2 Parallel Tracks</option>
                          <option value="4">4 Parallel Tracks</option>
                          <option value="6">6 Parallel Tracks</option>
                          <option value="8">8 Parallel Tracks</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-wider block">
                          WIND SPEED ZONE
                        </label>
                        <select
                          value={estimate.safetyWindZone}
                          onChange={(e) => setEstimate({ ...estimate, safetyWindZone: e.target.value as any })}
                          id="wind-zone-select"
                          className="w-full p-2.5 bg-white border border-slate-200 rounded text-xs font-semibold text-slate-700"
                        >
                          <option value="II">Zone II (33 m/s - Normal)</option>
                          <option value="III">Zone III (39 m/s - High)</option>
                          <option value="IV">Zone IV (44 m/s - Coastal)</option>
                          <option value="V">Zone V (50 m/s - Severe)</option>
                        </select>
                      </div>
                    </div>

                  </div>
                )}

                {/* Step 2 Content: Accessories Truss */}
                {step === 2 && (
                  <div className="space-y-6 text-left">
                    <h4 className="font-display font-black text-md text-[#153e7a] border-b pb-2 uppercase tracking-wide">
                      2. Truss Design & Accessories
                    </h4>

                    {/* Girder Layout options */}
                    <div className="space-y-3">
                      <label className="text-xs font-black text-slate-500 uppercase tracking-wider block">
                        STRUCTURAL DESIGN GIRDER TYPE
                      </label>
                      <div className="grid grid-cols-3 gap-3" id="girder-type-options">
                        {[
                          { code: 'truss', label: 'Warren Truss', desc: 'Standard & economical' },
                          { code: 'bowstring', label: 'Bowstring Arch', desc: 'Premium strength / High Span' },
                          { code: 'plate', label: 'Plate Girder', desc: 'Compact / Direct Slab' }
                        ].map((opt) => (
                          <button
                            key={opt.code}
                            type="button"
                            onClick={() => setEstimate({ ...estimate, girderType: opt.code as any })}
                            id={`girder-opt-${opt.code}`}
                            className={`p-3 text-left rounded border transition-all cursor-pointer flex flex-col justify-between ${
                              estimate.girderType === opt.code
                                ? 'border-[#153e7a] bg-slate-50'
                                : 'border-slate-200 hover:border-slate-300 bg-white'
                            }`}
                          >
                            <span className="font-display font-black text-xs block text-[#153e7a]">
                              {opt.label}
                            </span>
                            <span className="text-[9px] text-slate-400 leading-tight mt-1">{opt.desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Counters for stairs, ramps, escalators */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="accessories-counters-grid">
                      
                      {/* Staircases */}
                      <div className="p-3 border border-slate-100 rounded-md space-y-1 bg-slate-50/50">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                          STAIRCASES (QTY)
                        </label>
                        <div className="flex items-center justify-between">
                          <button 
                            type="button"
                            onClick={() => setEstimate({ ...estimate, staircases: Math.max(0, estimate.staircases - 1) })}
                            className="w-8 h-8 rounded bg-white border border-slate-200 hover:bg-slate-50 font-bold cursor-pointer font-sans"
                          >
                            −
                          </button>
                          <span className="font-mono font-bold text-slate-700">{estimate.staircases}</span>
                          <button 
                            type="button"
                            onClick={() => setEstimate({ ...estimate, staircases: Math.min(6, estimate.staircases + 1) })}
                            className="w-8 h-8 rounded bg-white border border-slate-200 hover:bg-slate-50 font-bold cursor-pointer font-sans"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Access Ramps */}
                      <div className="p-3 border border-slate-100 rounded-md space-y-1 bg-slate-50/50">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                          ACCESS RAMPS (QTY)
                        </label>
                        <div className="flex items-center justify-between">
                          <button 
                            type="button"
                            onClick={() => setEstimate({ ...estimate, ramps: Math.max(0, estimate.ramps - 1) })}
                            className="w-8 h-8 rounded bg-white border border-slate-200 hover:bg-slate-50 font-bold cursor-pointer font-sans"
                          >
                            −
                          </button>
                          <span className="font-mono font-bold text-slate-700">{estimate.ramps}</span>
                          <button 
                            type="button"
                            onClick={() => setEstimate({ ...estimate, ramps: Math.min(4, estimate.ramps + 1) })}
                            className="w-8 h-8 rounded bg-white border border-slate-200 hover:bg-slate-50 font-bold cursor-pointer font-sans"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Escalators */}
                      <div className="p-3 border border-slate-100 rounded-md space-y-1 bg-slate-50/50">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                          ESCALATORS (QTY)
                        </label>
                        <div className="flex items-center justify-between">
                          <button 
                            type="button"
                            onClick={() => setEstimate({ ...estimate, escalators: Math.max(0, estimate.escalators - 1) })}
                            className="w-8 h-8 rounded bg-white border border-slate-200 hover:bg-slate-50 font-bold cursor-pointer font-sans"
                          >
                            −
                          </button>
                          <span className="font-mono font-bold text-slate-700">{estimate.escalators}</span>
                          <button 
                            type="button"
                            onClick={() => setEstimate({ ...estimate, escalators: Math.min(4, estimate.escalators + 1) })}
                            className="w-8 h-8 rounded bg-white border border-slate-200 hover:bg-slate-50 font-bold cursor-pointer font-sans"
                          >
                            +
                          </button>
                        </div>
                      </div>

                    </div>

                    {/* Roofing choices */}
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-500 uppercase tracking-wider block">
                        ROOFING SHEETING MATERIAL
                      </label>
                      <select
                        value={estimate.roofType}
                        onChange={(e) => setEstimate({ ...estimate, roofType: e.target.value as any })}
                        id="roof-type-select"
                        className="w-full p-2.5 bg-white border border-slate-200 rounded text-xs font-semibold text-slate-700"
                      >
                        <option value="tin">Pre-painted Galvalume Metal (Economical)</option>
                        <option value="polycarbonate">Multiwall Polycarbonate Sheet (Natural Light Transmitting)</option>
                        <option value="standing_seam">Standing Seam Aluminum (Industrial Long Life)</option>
                      </select>
                    </div>

                  </div>
                )}

                {/* Step 3 Content: Contact and submit */}
                {step === 3 && (
                  <form onSubmit={handleSubmitQuote} className="space-y-6 text-left" id="estimate-submit-form">
                    <h4 className="font-display font-black text-md text-[#153e7a] border-b pb-2 uppercase tracking-wide">
                      3. Authorizing Entity Details
                    </h4>

                    {/* Inputs */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                          Authority Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Ramesh Kumar"
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          className="w-full p-2.5 border border-slate-200 rounded text-xs text-slate-800"
                          id="form-name-input"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                          Official Email *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="e.g. name@railnet.gov.in"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          className="w-full p-2.5 border border-slate-200 rounded text-xs text-slate-800"
                          id="form-email-input"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                          Phone Contacts *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. +91 91234 56789"
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                          className="w-full p-2.5 border border-slate-200 rounded text-xs text-slate-800"
                          id="form-phone-input"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                          Railway Division / Company
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. NER/Northern Railway"
                          value={contactForm.division}
                          onChange={(e) => setContactForm({ ...contactForm, division: e.target.value })}
                          className="w-full p-2.5 border border-slate-200 rounded text-xs text-slate-800"
                          id="form-division-input"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                        Brief Project Location & Special Site Notes
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Specify track block limitations, unique soil features or architectural limitations..."
                        value={contactForm.notes}
                        onChange={(e) => setContactForm({ ...contactForm, notes: e.target.value })}
                        className="w-full p-2.5 border border-slate-200 rounded text-xs text-slate-800 font-sans"
                        id="form-notes-input"
                      />
                    </div>

                    <p className="text-[10px] text-slate-400 font-sans leading-relaxed">
                      By submitting, you are requesting a tailored engineering technical drawing and site inspection schedule. Estimated variables are completely virtual projections conforming to IS 2062 and RDSO structural criteria.
                    </p>
                  </form>
                )}

                {/* Footer Navigation Buttons */}
                <div className="flex justify-between items-center bg-slate-50 -mx-6 -mb-6 p-4 mt-8 border-t border-slate-100" id="estimator-footer-nav">
                  <button
                    type="button"
                    disabled={step === 1}
                    onClick={handleStepPrev}
                    id="prev-step-btn"
                    className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 hover:border-slate-300 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed rounded-md font-display text-xs font-bold transition-all cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" /> BACK
                  </button>

                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={handleStepNext}
                      id="next-step-btn"
                      className="flex items-center gap-1.5 px-5 py-2.5 bg-[#153e7a] hover:bg-[#0c2448] text-white rounded-md font-display text-xs font-bold transition-all shadow-md cursor-pointer"
                    >
                      CONTINUE <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      form="estimate-submit-form"
                      onClick={handleSubmitQuote}
                      id="submit-proposal-btn"
                      className="flex items-center gap-1.5 px-6 py-2.5 bg-[#f15a24] hover:bg-orange-600 text-white rounded-md font-display text-xs font-black tracking-wider transition-all shadow-md animate-pulse hover:animate-none cursor-pointer"
                    >
                      {isSubmitting ? 'PROCESSING...' : 'SUBMIT PROPOSAL'} <Send className="w-4 h-4" />
                    </button>
                  )}
                </div>

              </div>

              {/* Right Column: Dynamic Live output Summary */}
              <div className="lg:col-span-5 p-6 bg-slate-50/50 flex flex-col justify-between print:block print:bg-white">
                
                <div className="space-y-6">
                  <h4 className="font-display font-black text-xs text-slate-400 uppercase tracking-widest border-b border-slate-200/60 pb-2 print:border-slate-300">
                    ESTIMATED DETAILED BILL OF MATERIALS
                  </h4>

                  {/* Steel Weight Tonnage */}
                  <div className="p-5 bg-[#153e7a] text-white rounded-md flex justify-between items-center shadow-lg shadow-blue-900/10 print:bg-white print:text-slate-900 print:shadow-none print:border print:border-slate-300">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold tracking-widest flex items-center gap-1.5 text-slate-300 print:text-slate-500">
                        <Hammer className="w-4 h-4 text-[#f15a24]" /> STRUCTURAL FE350 STEEL Weight
                      </span>
                      <p className="text-[10px] text-slate-300 leading-none print:text-slate-500">Conforming FE ASTM standards</p>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-xl md:text-3xl font-black text-[#f15a24] print:text-slate-900">
                        {tonnage} MT
                      </span>
                    </div>
                  </div>

                  {/* Summary Metric points */}
                  <div className="space-y-3" id="quote-summary-list">
                    <div className="flex justify-between items-center py-2 border-b border-dashed border-slate-200">
                      <span className="text-xs text-slate-500 font-sans">Clear Track Span</span>
                      <span className="font-mono text-xs font-bold text-slate-700">{estimate.span} Meters ({estimate.tracks} Tracks)</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-dashed border-slate-200">
                      <span className="text-xs text-slate-500 font-sans">Clear Walkway Area</span>
                      <span className="font-mono text-xs font-bold text-slate-700">{estimate.width}m width feasible</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-dashed border-slate-200">
                      <span className="text-xs text-slate-500 font-sans">Truss Layout Style</span>
                      <span className="font-mono text-xs font-bold text-[#153e7a] uppercase">{estimate.girderType} Configuration</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-dashed border-slate-200">
                      <span className="text-xs text-slate-500 font-sans">Substructure Stairs + Ramps</span>
                      <span className="font-mono text-xs font-bold text-slate-700">{estimate.staircases} Chairs / {estimate.ramps} Slopes</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-dashed border-slate-200">
                      <span className="text-xs text-slate-500 font-sans">Escalators support ready</span>
                      <span className="font-mono text-xs font-bold text-slate-700">{estimate.escalators > 0 ? `${estimate.escalators} Sets Enabled` : 'None Pre-Designed'}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-dashed border-slate-200">
                      <span className="text-xs text-slate-500 font-sans">Fabrication Turnaround</span>
                      <span className="font-mono text-xs font-bold text-emerald-600 capitalize">~{timeline} Days approx.</span>
                    </div>
                  </div>

                  {/* Costs detail sheet */}
                  <div className="p-4 bg-slate-100 rounded space-y-2.5 print:bg-white print:border print:border-slate-300">
                    <div className="flex justify-between text-xs text-slate-500 font-sans">
                      <span>Steel Fabrication cost</span>
                      <span className="font-mono font-medium">₹{(cost.fabCost / 100000).toFixed(2)} Lakhs</span>
                    </div>
                    <div className="flex justify-between text-xs text-slate-500 font-sans">
                      <span>RCC Piers Civil works</span>
                      <span className="font-mono font-medium">₹{(cost.civilCost / 100000).toFixed(2)} Lakhs</span>
                    </div>
                    <div className="flex justify-between text-xs text-slate-500 font-sans">
                      <span>Roofing Sheet assemblies</span>
                      <span className="font-mono font-medium">₹{(cost.roofCost / 100000).toFixed(2)} Lakhs</span>
                    </div>
                    <div className="h-[1px] bg-slate-200" />
                    <div className="flex justify-between text-xs font-bold text-slate-600 font-sans">
                      <span>Subtotal Budget (Est.)</span>
                      <span className="font-mono">₹{(cost.subtotal / 10000000).toFixed(2)} Crores</span>
                    </div>
                    <div className="flex justify-between text-xs font-bold text-slate-400 font-sans">
                      <span>GST (18% for Railways)</span>
                      <span className="font-mono">₹{(cost.gst / 100000).toFixed(2)} Lakhs</span>
                    </div>
                    <div className="h-[1px] bg-slate-300" />
                    <div className="flex justify-between text-sm font-black text-[#153e7a] font-sans">
                      <span className="uppercase">Grand Erection Total (Est.)</span>
                      <span className="font-mono text-base text-[#f15a24]">₹{(cost.total / 10000000).toFixed(2)} Cr</span>
                    </div>
                  </div>

                </div>

                {/* Print button on summary panel */}
                <div className="pt-6 print:hidden">
                  <button
                    onClick={handlePrintQuote}
                    id="print-quote-btn"
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 border border-slate-700/50 rounded-md font-display text-xs font-bold tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Printer className="w-4 h-4 text-[#f15a24]" /> PRINT STANDARD COST SHEET
                  </button>
                </div>

              </div>

            </div>
          ) : (
            /* Success screen */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-12 text-center text-slate-700 space-y-6"
              id="quote-success-view"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mx-auto">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>
              <div className="space-y-2">
                <h4 className="font-display font-black text-2xl text-[#153e7a] uppercase tracking-wide">
                  Quotation Filed Successfully!
                </h4>
                <p className="text-slate-400 font-mono text-xs font-bold">
                  Quotation Reference ID: <span className="text-[#f15a24] bg-slate-100 px-2 py-0.5 rounded">{quoteRef}</span>
                </p>
              </div>
              
              <div className="max-w-md mx-auto p-5 bg-slate-50 border rounded text-xs text-left gap-3 flex items-start text-slate-600 font-sans">
                <FileCheck className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-800 mb-1">Erection block files logged:</p>
                  <p>Our Bridge Engineering division at Mumbai head office has been notified of your <strong>{estimate.span}m Clear-Span</strong> proposal. A technical representative will contact Ramesh Kumar closer to 24 hours at Ramesh's logged email and phone parameters to evaluate site soil blocks.</p>
                </div>
              </div>

              <div className="flex justify-center gap-3 pt-4">
                <button
                  onClick={handlePrintQuote}
                  className="bg-slate-900 text-white font-display text-xs font-bold px-6 py-3 rounded hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Download Formal PDF Details
                </button>
                <button
                  onClick={handleReset}
                  className="border text-slate-600 px-6 py-3 font-display text-xs font-bold rounded hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Calculate Another FOB
                </button>
              </div>
            </motion.div>
          )}

        </motion.div>
      </div>
    </div>

    {/* Print-Only Formal Cost Sheet */}
    <div id="formal-print-sheet" className="hidden print:block p-8 bg-white text-slate-900 font-sans text-left">
          {/* Letterhead Header */}
          <div className="flex justify-between items-start border-b-2 border-[#153e7a] pb-6 mb-8">
            <div className="flex items-center gap-4">
              <img src="/assets/images/logoquote.png" alt="Kahen Infra Logo" className="h-16 w-auto shrink-0" />
              <div className="text-left font-sans text-xs text-slate-600 space-y-0.5">
                <h4 className="font-display font-black text-base text-[#153e7a] leading-none uppercase">
                  Kahen Infra (OPC) Private Limited
                </h4>
                <p className="text-[11px] text-slate-500 leading-tight">
                  Dahnu, Mumbai, Maharashtra, India
                </p>
                <p className="text-[11px] text-slate-500 leading-tight">
                  <span className="font-semibold text-slate-700">Phone:</span> +91 90962 13517 &nbsp;|&nbsp; <span className="font-semibold text-slate-700">Email:</span> md@kaheninfra.com
                </p>
              </div>
            </div>
            <div className="text-right text-xs text-slate-500 space-y-1">
              <p className="font-bold text-slate-800 text-sm">OFFICIAL ESTIMATION SHEET</p>
              <p>Ref: <span className="font-mono font-bold text-[#f15a24]">{quoteRef || 'KINFRA-DRAFT'}</span></p>
              <p>Date: {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          {/* Client & Authority info */}
          <div className="grid grid-cols-2 gap-6 mb-8 text-xs border border-slate-100 p-4 bg-slate-50 rounded">
            <div>
              <h5 className="font-bold text-[#153e7a] uppercase mb-1">Client Authority Parameters</h5>
              <p><strong>Name:</strong> {contactForm.name || 'N/A'}</p>
              <p><strong>Email ID:</strong> {contactForm.email || 'N/A'}</p>
              <p><strong>Phone Contacts:</strong> {contactForm.phone || 'N/A'}</p>
            </div>
            <div>
              <h5 className="font-bold text-[#153e7a] uppercase mb-1">Division Details</h5>
              <p><strong>Authority Title:</strong> {contactForm.authority}</p>
              <p><strong>Division/Enterprise:</strong> {contactForm.division || 'N/A'}</p>
              {contactForm.notes && <p className="truncate"><strong>Site Notes:</strong> {contactForm.notes}</p>}
            </div>
          </div>

          {/* Structural Metrics */}
          <div className="mb-8">
            <h4 className="font-display font-black text-sm text-[#153e7a] border-b pb-2 uppercase tracking-wide mb-4">
              1. Technical Specifications
            </h4>
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold">
                  <th className="p-2 border">Parameters</th>
                  <th className="p-2 border">Value / Design Criteria</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border font-semibold">Clear Track Span</td>
                  <td className="p-2 border font-mono">{estimate.span} Meters ({estimate.tracks} Tracks)</td>
                </tr>
                <tr>
                  <td className="p-2 border font-semibold">Clear Walkway Width</td>
                  <td className="p-2 border font-mono">{estimate.width} Meters</td>
                </tr>
                <tr>
                  <td className="p-2 border font-semibold">Truss Configuration</td>
                  <td className="p-2 border uppercase font-mono">{estimate.girderType} Layout</td>
                </tr>
                <tr>
                  <td className="p-2 border font-semibold">Wind Resistance Zone</td>
                  <td className="p-2 border font-mono">Zone {estimate.safetyWindZone}</td>
                </tr>
                <tr>
                  <td className="p-2 border font-semibold">Roofing Material</td>
                  <td className="p-2 border capitalize">{estimate.roofType.replace('_', ' ')} Sheeting</td>
                </tr>
                <tr>
                  <td className="p-2 border font-semibold">Steel weight Tonnage</td>
                  <td className="p-2 border font-mono font-bold text-[#f15a24]">{tonnage} MT</td>
                </tr>
                <tr>
                  <td className="p-2 border font-semibold">Commissioning Timeline</td>
                  <td className="p-2 border">~{timeline} calendar days</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Cost Summary Table */}
          <div className="mb-8">
            <h4 className="font-display font-black text-sm text-[#153e7a] border-b pb-2 uppercase tracking-wide mb-4">
              2. Cost Estimation Sheet
            </h4>
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-[#153e7a] text-white font-bold">
                  <th className="p-2.5">Description</th>
                  <th className="p-2.5 text-right">Cost (INR)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2.5 border">Structural Steel Fabrication & Erection (FE350 Grade)</td>
                  <td className="p-2.5 border text-right font-mono">₹{cost.fabCost.toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="p-2.5 border">Civil Foundation Piers (Pylons & Foundations)</td>
                  <td className="p-2.5 border text-right font-mono">₹{cost.civilCost.toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="p-2.5 border">Roof Canopy & Walkway Cover installation</td>
                  <td className="p-2.5 border text-right font-mono">₹{cost.roofCost.toLocaleString()}</td>
                </tr>
                <tr className="bg-slate-50 font-bold">
                  <td className="p-2.5 border">Subtotal Cost</td>
                  <td className="p-2.5 border text-right font-mono">₹{cost.subtotal.toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="p-2.5 border text-slate-500">GST for Infrastructure Projects (18%)</td>
                  <td className="p-2.5 border text-right font-mono text-slate-500">₹{cost.gst.toLocaleString()}</td>
                </tr>
                <tr className="bg-[#f15a24]/10 font-bold text-lg text-slate-900">
                  <td className="p-3 border text-[#153e7a] uppercase">Grand Total (Inclusive of GST)</td>
                  <td className="p-3 border text-right font-mono text-[#f15a24]">₹{cost.total.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Corporate signatures footer */}
          <div className="mt-16 flex justify-between items-end border-t border-slate-200 pt-8 text-xs text-slate-400">
            <div>
              <p>Kahen Infra (OPC) Private Limited</p>
              <p>Corporate Office: Dahnu, Mumbai, Maharashtra, India</p>
              <p className="mt-2 text-[10px]">Verify status: md@kaheninfra.com</p>
            </div>
            <div className="text-center w-[150px]">
              <div className="h-10 border-b border-slate-300 mb-2" />
              <p className="font-bold text-slate-700">Authorized Signature</p>
              <p className="text-[9px]">Engineering Board of Director</p>
            </div>
          </div>
        </div>
      </>
    );
  }
