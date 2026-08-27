/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { X, MapPin, Mail, Phone, Clock, Landmark, Send, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Replace this placeholder with your free Web3Forms Access Key from https://web3forms.com/
const WEB3FORMS_ACCESS_KEY = "eff046d4-f426-4968-b225-d365e7997198";

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submissionRef, setSubmissionRef] = useState('');
  const [submissionTime, setSubmissionTime] = useState('');

  if (!isOpen) return null;

  const handleContactSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      alert('Please compile required text parameters (Name, Email, Message)');
      return;
    }
    setIsSending(true);

    try {
      const refId = `KINFRA-CONN-${Math.floor(100 + Math.random() * 900)}`;
      const timeStr = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " (IST)";

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `[Website Lead] - ${form.subject || "General Inquiry"} (from ${form.name})`,
          from_name: `Kahen Infra Portal - ${form.name}`,
          Reference_ID: refId,
          Submission_Time: timeStr,
          name: form.name,
          email: form.email,
          Inquiry_Subject: form.subject || "General Inquiry",
          message: form.message
        })
      });

      const result = await response.json();
      if (result.success) {
        setSubmissionRef(refId);
        setSubmissionTime(timeStr);
        setIsSuccess(true);
      } else {
        alert(result.message || "Form submission failed. Please check your Web3Forms configurations.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Failed to submit form. Please check your network connection and try again.");
    } finally {
      setIsSending(false);
    }
  };

  const handleReset = () => {
    setForm({ name: '', email: '', subject: '', message: '' });
    setIsSuccess(false);
    setSubmissionRef('');
    setSubmissionTime('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true" id="contact-modal-container">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            const isFormDirty = form.name || form.email || form.subject || form.message;
            if (isFormDirty) {
              if (window.confirm('You have unsaved changes. Are you sure you want to close?')) {
                onClose();
              }
            } else {
              onClose();
            }
          }}
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
          id="contact-modal-content"
        >
          {/* Header */}
          <div className="bg-[#05142b] p-6 text-white flex justify-between items-center border-b border-slate-800">
            <div className="text-left">
              <span className="text-[15px] font-black text-[#f15a24] tracking-widest uppercase">CONNECT NOW</span>
              <h3 className="font-display font-black text-xl md:text-xl tracking-tight uppercase leading-none mt-1">
              Kahen Infra OPC Private Limited
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-slate-800 hover:bg-[#f15a24] hover:text-white text-slate-300 transition-colors focus:outline-none"
              id="close-contact-modal-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 md:p-8 max-h-[70vh] overflow-y-auto">
            
            {!isSuccess ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                
                {/* Physical Contact parameters (Left) */}
                <div className="space-y-6">
                  <div className="space-y-1.5">
                    <h4 className="font-display font-extrabold text-base text-[#153e7a] uppercase">OFFICIAL HELPLINE NETWORKS</h4>
                    <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-sans">
                      Our commercial and bid appraisal division is located in Mumbai. Drop by or connect via email for joint-venture proposals.
                    </p>
                  </div>

                  <div className="space-y-4 font-sans text-xs md:text-sm text-slate-500" id="contact-info-list">
                    
                    <div className="flex gap-3">
                      <MapPin className="w-5 h-5 text-[#f15a24] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-800 block mb-0.5 font-display text-xs"> Mumbai Maharashtra</strong>
                        <p>Kahen Infra (OPC) Private Limited</p>
                        <p>Dahnu, Mumbai, Maharashtra, India </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Mail className="w-5 h-5 text-[#f15a24] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-800 block mb-0.5 font-display text-xs font-bold">Mail</strong>
                        <a href="mailto:md@kaheninfra.com" className="hover:underline text-[#153e7a]">md@kaheninfra.com</a>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Phone className="w-5 h-5 text-[#f15a24] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-800 block mb-0.5 font-display text-xs font-bold">Inquiries Phone</strong>
                        <a href="tel:+919096213517" className="hover:underline text-[#153e7a] font-mono">+919096213517</a>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Clock className="w-5 h-5 text-[#f15a24] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-800 block mb-0.5 font-display text-xs font-bold">Operational Hours</strong>
                        <p>Monday - Sat: 09:00 AM - 06:00 PM (IST)</p>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Submitting Message Card (Right) */}
                <form onSubmit={handleContactSubmit} className="space-y-4" id="contact-us-modal-form">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">INSTANT SECURE MESSAGE</span>
                  
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded text-xs text-slate-800"
                      id="contact-name-input"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Email ID</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. ramesh@outlook.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded text-xs text-slate-800"
                      id="contact-email-input"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Subject</label>
                    <input
                      type="text"
                      placeholder="Bid / Project tender question"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded text-xs text-slate-800"
                      id="contact-subject-input"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Message</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Enter details of standard requirements or joint ventures, and related station info..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded text-xs text-slate-800 font-sans"
                      id="contact-message-input"
                    />
                  </div>

                  <button
                    type="submit"
                    id="submit-contact-form-btn"
                    className="w-full py-3 bg-[#f15a24] hover:bg-orange-600 text-white font-display text-xs font-black tracking-widest rounded-sm transition-all flex items-center justify-center gap-1 cursor-pointer"
                  >
                    {isSending ? 'SENDING...' : 'SEND MESSAGE'} <Send className="w-4 h-4" />
                  </button>
                </form>

              </div>
            ) : (
               /* Success screen */
              <div className="p-6 md:p-8 text-center space-y-6 animate-fadeIn" id="contact-success-view">
                <div className="w-14 h-14 bg-emerald-100 rounded-full text-emerald-600 flex items-center justify-center mx-auto mb-2 animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                
                <div className="space-y-1">
                  <h4 className="font-display font-black text-xl text-[#153e7a] uppercase tracking-wide">
                    Inquiry Lodged Successfully
                  </h4>
                  <p className="text-slate-400 font-mono text-xs">
                    Reference ID: <span className="text-[#f15a24] bg-slate-100 px-2 py-0.5 rounded font-bold font-mono">{submissionRef}</span>
                  </p>
                </div>

                {/* Premium Submitted Data Sheet */}
                <div className="max-w-md mx-auto bg-slate-50 border border-slate-200/60 rounded-xl overflow-hidden shadow-sm text-left">
                  <div className="bg-[#153e7a] px-4 py-2.5 flex justify-between items-center text-white">
                    <span className="text-[10px] font-black uppercase tracking-widest font-mono">Receipt of Transmission</span>
                    <span className="flex items-center gap-1.5 text-[9px] bg-amber-500/20 text-amber-200 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping shrink-0" /> Pending Review
                    </span>
                  </div>
                  
                  <div className="p-5 space-y-3.5 text-xs font-sans text-slate-600">
                    <div className="grid grid-cols-3 border-b border-slate-200/50 pb-2">
                      <span className="font-bold text-slate-400 uppercase text-[9px] tracking-wider mt-0.5">Reference ID</span>
                      <span className="col-span-2 font-mono font-bold text-[#f15a24]">{submissionRef}</span>
                    </div>

                    <div className="grid grid-cols-3 border-b border-slate-200/50 pb-2">
                      <span className="font-bold text-slate-400 uppercase text-[9px] tracking-wider mt-0.5">Submission Time</span>
                      <span className="col-span-2 font-mono text-slate-800 font-semibold">{submissionTime}</span>
                    </div>

                    <div className="grid grid-cols-3 border-b border-slate-200/50 pb-2">
                      <span className="font-bold text-slate-400 uppercase text-[9px] tracking-wider mt-0.5">Sender Name</span>
                      <span className="col-span-2 font-display font-black text-slate-800 text-sm leading-tight">{form.name}</span>
                    </div>

                    <div className="grid grid-cols-3 border-b border-slate-200/50 pb-2">
                      <span className="font-bold text-slate-400 uppercase text-[9px] tracking-wider mt-0.5">Email Address</span>
                      <span className="col-span-2 font-mono text-slate-800 font-semibold break-all">{form.email}</span>
                    </div>

                    {form.subject && (
                      <div className="grid grid-cols-3 border-b border-slate-200/50 pb-2">
                        <span className="font-bold text-slate-400 uppercase text-[9px] tracking-wider mt-0.5">Subject Topic</span>
                        <span className="col-span-2 text-slate-800 font-semibold">{form.subject}</span>
                      </div>
                    )}

                    <div className="space-y-1.5 pt-1">
                      <span className="font-bold text-slate-400 uppercase text-[9px] tracking-wider block">Submitted Message</span>
                      <div className="p-3 bg-white border border-slate-100 rounded text-slate-700 leading-relaxed max-h-32 overflow-y-auto italic font-serif">
                        "{form.message}"
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-100/80 px-5 py-3 border-t border-slate-200/50 text-[10px] text-slate-400 leading-relaxed text-center font-sans">
                    A copy of this inquiry has been routed to our Mumbai Headquarters. A representative will revert within 24 business hours.
                  </div>
                </div>

                <div className="flex justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="bg-[#153e7a] hover:bg-[#0c2448] text-white font-display text-xs font-bold px-6 py-2.5 rounded shadow cursor-pointer transition-colors"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Footer close option */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
            <button
              onClick={onClose}
              className="border border-slate-200 hover:border-slate-300 text-slate-600 px-5 py-2 rounded-sm font-display text-xs font-bold tracking-wider cursor-pointer transition-colors"
            >
              CLOSE
            </button>
          </div>

        </motion.div>
      </div>
    </div>
  );
}
