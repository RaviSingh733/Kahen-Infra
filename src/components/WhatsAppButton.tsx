// /**
//  * @license
//  * SPDX-License-Identifier: Apache-2.0
//  */

// import { useState, useEffect, FormEvent } from 'react';
// import { MessageCircle, X, Send, CircleAlert, Briefcase, HelpCircle, FileText } from 'lucide-react';
// import { motion, AnimatePresence } from 'motion/react';

// export default function WhatsAppButton() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [name, setName] = useState('');
//   const [message, setMessage] = useState('');
//   const [selectedTopic, setSelectedTopic] = useState('General Infrastructure Inquiry');
//   const [hasPulse, setHasPulse] = useState(true);

//   // Stop button pulse after user first opens the widget
//   useEffect(() => {
//     if (isOpen) {
//       setHasPulse(false);
//     }
//   }, [isOpen]);

//   const topics = [
//     { id: 'tender', label: 'FOB Construction / Tender', icon: FileText },
//     { id: 'jv', label: 'Joint Venture Opportunity', icon: HelpCircle },
//     { id: 'career', label: 'Careers / Vendor Registration', icon: Briefcase },
//   ];

//   const handleSubmit = (e: FormEvent) => {
//     e.preventDefault();
    
//     // Construct real-world WhatsApp API link with prefilled urlencoded parameters
//     const whatsappNumber = '919876543210'; // India country code without '+'
    
//     const intro = `Namaste Kahen Infra, my name is ${name || 'Visitor'}.`;
//     const topicHeading = `*Topic of Inquiry:* ${selectedTopic}`;
//     const desc = message ? `*Message Details:* ${message}` : 'I would like to enquire about your foot over bridge design and fabrication parameters.';
    
//     const fullText = `${intro}\n\n${topicHeading}\n\n${desc}`;
//     const encodedText = encodeURIComponent(fullText);
//     const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

//     // Open WhatsApp in a direct blank window complying with secure protocols
//     window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    
//     // Reset state and close modal
//     setName('');
//     setMessage('');
//     setIsOpen(false);
//   };

//   return (
//     <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end" id="whatsapp-widget">
      
//       {/* Interactive WhatsApp Float Popover Card */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9, y: 15 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.9, y: 15 }}
//             className="w-[340px] bg-[#0c1d33] border border-slate-800 rounded-lg shadow-2xl overflow-hidden mb-4 mr-0 md:mr-1"
//             id="whatsapp-chat-box"
//           >
//             {/* Header: Kahen Branded Green Bar */}
//             <div className="bg-gradient-to-r from-emerald-600 to-teal-500 p-4 text-white flex justify-between items-center">
//               <div className="flex items-center gap-3">
//                 <div className="relative">
//                   <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-display font-black text-sm border border-white/20">
//                     KI
//                   </div>
//                   <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-emerald-600 rounded-full animate-pulse" />
//                 </div>
//                 <div>
//                   <h4 className="font-display font-black text-xs uppercase tracking-wider leading-none">Kahen Helpline</h4>
//                   <p className="text-[10px] text-emerald-100 mt-1">Typically replies instantly</p>
//                 </div>
//               </div>
//               <button 
//                 onClick={() => setIsOpen(false)}
//                 className="p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white cursor-pointer"
//                 id="close-whatsapp-widget"
//               >
//                 <X className="w-4 h-4" />
//               </button>
//             </div>

//             {/* Chat Body & Input forms */}
//             <div className="p-4 bg-slate-950/80">
//               {/* Automated initial welcoming message balloon */}
//               <div className="bg-slate-900 border border-slate-800 p-3 rounded mb-4 text-xs text-slate-300 leading-relaxed font-sans max-w-[90%] text-left">
//                 <span className="font-bold text-[10px] text-emerald-400 block uppercase mb-1">AUTOMATED GREETING</span>
//                 Namaste! Welcome to Kahen Infra (OPC) Private Limited. Select your category below and enter details to begin a rapid WhatsApp inquiry.
//               </div>

//               {/* Input Form Fields */}
//               <form onSubmit={handleSubmit} className="space-y-3.5 text-left" id="whatsapp-inquiry-form">
                
//                 {/* 1. Name Input */}
//                 <div className="space-y-1">
//                   <label className="text-[9px] font-black tracking-widest text-[#f15a24] uppercase block">YOUR NAME / COMPANY</label>
//                   <input
//                     type="text"
//                     required
//                     placeholder="e.g. Adani / IRCON Project Manager"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     className="w-full text-xs p-2.5 bg-slate-900 border border-slate-800 text-slate-100 rounded focus:border-[#f15a24] focus:ring-1 focus:ring-[#f15a24] transition-all"
//                   />
//                 </div>

//                 {/* 2. Topic Preset Selector */}
//                 <div className="space-y-1">
//                   <label className="text-[9px] font-black tracking-widest text-[#f15a24] uppercase block">INQUIRY CATEGORY</label>
//                   <div className="grid grid-cols-1 gap-1.5 pt-1">
//                     {topics.map((t) => {
//                       const IconComponent = t.icon;
//                       const isSelected = selectedTopic === t.label;

//                       return (
//                         <button
//                           key={t.id}
//                           type="button"
//                           onClick={() => setSelectedTopic(t.label)}
//                           className={`flex items-center gap-2 p-2 rounded text-left border text-[10px] uppercase font-bold tracking-wide transition-all cursor-pointer ${
//                             isSelected
//                               ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400'
//                               : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-slate-300'
//                           }`}
//                         >
//                           <IconComponent className={`w-3.5 h-3.5 ${isSelected ? 'text-emerald-400' : 'text-slate-500'}`} />
//                           <span>{t.label}</span>
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>

//                 {/* 3. Short Message details */}
//                 <div className="space-y-1">
//                   <label className="text-[9px] font-black tracking-widest text-[#f15a24] uppercase block">MESSAGE (OPTIONAL)</label>
//                   <textarea
//                     rows={2}
//                     placeholder="Briefly explain your site locations, required spans, or budget details..."
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     className="w-full text-xs p-2.5 bg-slate-900 border border-slate-800 text-slate-100 rounded font-sans focus:border-[#f15a24] focus:ring-1 focus:ring-[#f15a24] transition-all"
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-display text-xs font-black tracking-widest py-3 rounded-sm transition-all uppercase flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-emerald-500/10"
//                   id="whatsapp-submit-btn"
//                 >
//                   START WHATSAPP CHAT <Send className="w-3.5 h-3.5" />
//                 </button>
//               </form>
//             </div>

//             {/* Legal Notice */}
//             <div className="p-2.5 bg-slate-950 border-t border-slate-900 flex items-center gap-1 text-[9px] text-slate-500">
//               <CircleAlert className="w-3 h-3 text-[#f15a24]" />
//               <span>We strictly comply with secure data laws.</span>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Floating Action Trigger Button with green theme style */}
//       <div className="relative">
//         {/* Breathing pulse rings behind the button to draw interest online */}
//         <AnimatePresence>
//           {hasPulse && !isOpen && (
//             <span className="absolute -inset-1.5 bg-emerald-500 rounded-full blur-sm opacity-50 animate-ping pointer-events-none" />
//           )}
//         </AnimatePresence>

//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           aria-label="Open WhatsApp conversation window"
//           className="flex items-center gap-2 px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-display font-bold text-xs uppercase tracking-wider rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer z-50 relative"
//           id="whatsapp-trigger-button"
//         >
//           <MessageCircle className="w-5 h-5 animate-pulse" />
//           <span>Quick Chat</span>
//         </button>
//       </div>

//     </div>
//   );
// }
