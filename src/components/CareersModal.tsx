/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent, useRef } from 'react';
import { CAREERS } from '../data';
import { Career } from '../types';
import { X, Briefcase, MapPin, GraduationCap, ArrowRight, User, Mail, UploadCloud, CheckCircle2, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Replace this placeholder with your free Web3Forms Access Key from https://web3forms.com/
const WEB3FORMS_ACCESS_KEY = "62688099-0e78-4395-81bd-beee6eef98de";

interface CareersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CareersModal({ isOpen, onClose }: CareersModalProps) {
  const [selectedJob, setSelectedJob] = useState<Career | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [applyForm, setApplyForm] = useState({ name: '', email: '', phone: '', cvName: '' });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formSuccess, setFormSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleApplySubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!applyForm.name || !applyForm.email || !applyForm.phone) {
      alert('Please fill out all mandatory credentials.');
      return;
    }
    if (!selectedFile) {
      alert('Please upload your resume file (PDF/DOC/DOCX).');
      return;
    }

    setIsApplying(true);

    try {
      const formData = new FormData();
      formData.append("access_key", WEB3FORMS_ACCESS_KEY);
      formData.append("name", applyForm.name);
      formData.append("email", applyForm.email);
      formData.append("phone", applyForm.phone);
      formData.append("subject", `Kahen Infra Career Application - ${selectedJob?.title}`);
      formData.append("position", selectedJob?.title || "Not Specified");
      formData.append("attachment", selectedFile);
      formData.append("from_name", "Kahen Infra Careers Portal");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const result = await response.json();
      if (result.success) {
        setFormSuccess(true);
      } else {
        alert(result.message || "Failed to submit candidate application. Please try again.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Failed to submit candidate application. Please check your network connection and try again.");
    } finally {
      setIsApplying(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        alert("File size exceeds 10MB limit.");
        return;
      }
      setSelectedFile(file);
      setResumeUploaded(true);
      setApplyForm({ ...applyForm, cvName: file.name });
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setResumeUploaded(false);
    setApplyForm({ ...applyForm, cvName: '' });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleBackToJobs = () => {
    setSelectedJob(null);
    setFormSuccess(false);
    setResumeUploaded(false);
    setSelectedFile(null);
    setApplyForm({ name: '', email: '', phone: '', cvName: '' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true" id="careers-modal-container">
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
          id="careers-modal-content"
        >
          {/* Header */}
          <div className="bg-[#05142b] p-6 text-white flex justify-between items-center border-b border-slate-800">
            <div className="text-left">
              <span className="text-[10px] font-black text-[#f15a24] tracking-widest uppercase">JOIN OUR TEAM</span>
              <h3 className="font-display font-black text-xl md:text-2xl tracking-tight uppercase leading-none mt-1">
                CAREER VENTURES & VACANCIES
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-slate-800 hover:bg-[#f15a24] hover:text-white text-slate-300 transition-colors focus:outline-none"
              id="close-careers-modal-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 md:p-8 max-h-[70vh] overflow-y-auto">
            
            <AnimatePresence mode="wait">
              {!selectedJob ? (
                /* Jobs List Screen */
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6 text-left"
                >
                  <div className="space-y-2">
                    <h4 className="font-display font-extrabold text-base text-[#153e7a]">Build the Infrastructure of the Future</h4>
                    <p className="text-xs md:text-sm text-slate-500 font-sans leading-relaxed">
                      At Kahen Infra, we build heavy steel bridges that keep millions of passengers connected daily. Explore our active openings below and help us engineer robust structures in and around Maharashtra.
                    </p>
                  </div>

                  <div className="space-y-4" id="careers-job-list">
                    {CAREERS.map((job) => (
                      <div 
                        key={job.id} 
                        onClick={() => setSelectedJob(job)}
                        className="p-5 border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-[#153e7a] hover:shadow-md rounded-md cursor-pointer transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4 group"
                        id={`job-item-${job.id}`}
                      >
                        <div className="space-y-1.5">
                          <span className="text-[9px] font-bold text-[#f15a24] tracking-widest uppercase bg-orange-50 border border-orange-100 px-2 py-0.5 rounded">
                            {job.department}
                          </span>
                          <h5 className="font-display font-bold text-[#153e7a] text-sm md:text-base leading-tight">
                            {job.title}
                          </h5>
                          <div className="flex flex-wrap gap-4 text-xs font-sans text-slate-400">
                            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {job.location}</span>
                            <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" /> Experience: {job.experience}</span>
                          </div>
                        </div>

                        <button
                          type="button"
                          className="text-xs font-bold text-[#153e7a] group-hover:text-[#f15a24] transition-colors flex items-center gap-1 shrink-0"
                        >
                          APPLY NOW <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                /* Selected Job application form page */
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6 text-left"
                >
                  
                  {/* Job Details header */}
                  <div className="pb-5 border-b border-slate-100 flex justify-between items-end gap-4 flex-wrap">
                    <div className="space-y-2">
                      <button
                        onClick={handleBackToJobs}
                        className="text-xs font-black text-slate-400 hover:text-[#153e7a] transition-colors pointer-events-auto cursor-pointer"
                      >
                        &larr; BACK TO ACTIVE VACANCIES
                      </button>
                      <h4 className="font-display font-black text-[#153e7a] text-lg md:text-xl leading-snug">
                        {selectedJob.title}
                      </h4>
                      <p className="text-xs text-slate-400 font-sans">{selectedJob.department} | {selectedJob.location} | {selectedJob.experience} Exp.</p>
                    </div>

                    <span className="bg-emerald-50 border border-emerald-100 text-emerald-600 text-[10px] font-black uppercase px-3 py-1 rounded">
                      ACTIVE OPENING
                    </span>
                  </div>

                  {!formSuccess ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Job Description (Left) */}
                      <div className="space-y-5 text-slate-600 font-sans text-xs md:text-sm">
                        <div className="space-y-1.5">
                          <span className="text-[10px] uppercase font-bold tracking-widest text-[#f15a24]">ROLE SUMMARY:</span>
                          <p className="leading-relaxed">{selectedJob.description}</p>
                        </div>
                        
                        <div className="space-y-1.5">
                          <span className="text-[10px] uppercase font-bold tracking-widest text-[#f15a24] flex items-center gap-1.5">
                            <GraduationCap className="w-4 h-4 text-[#153e7a]" /> KEY PREREQUISITES:
                          </span>
                          <ul className="space-y-2" id="job-requirements-list">
                            {selectedJob.requirements.map((req, i) => (
                              <li key={i} className="flex gap-2 items-start text-xs text-slate-500 leading-relaxed">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Application Form (Right) */}
                      <form onSubmit={handleApplySubmit} className="space-y-4" id="cv-apply-form">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#f15a24] block">APPLICANT DOSSIER file:</span>
                        
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase">Full Name</label>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-slate-300" />
                            <input
                              type="text"
                              required
                              placeholder="e.g. Anand Sharma"
                              value={applyForm.name}
                              onChange={(e) => setApplyForm({ ...applyForm, name: e.target.value })}
                              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded text-xs text-slate-800"
                              id="cv-apply-name"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase">Email</label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-300" />
                            <input
                              type="email"
                              required
                              placeholder="e.g. anand@outlook.com"
                              value={applyForm.email}
                              onChange={(e) => setApplyForm({ ...applyForm, email: e.target.value })}
                              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded text-xs text-slate-800"
                              id="cv-apply-email"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase">Phone Number</label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-300" />
                            <input
                              type="tel"
                              required
                              placeholder="e.g. +91 98321 04561"
                              value={applyForm.phone}
                              onChange={(e) => setApplyForm({ ...applyForm, phone: e.target.value })}
                              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded text-xs text-slate-800"
                              id="cv-apply-phone"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-400 uppercase block">Resume (PDF/DOC) *</label>
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept=".pdf,.doc,.docx"
                            className="hidden"
                          />
                          {!resumeUploaded ? (
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              id="cv-uploader-btn"
                              className="w-full p-4 border-2 border-dashed border-slate-200 hover:border-[#153e7a] hover:bg-slate-50/50 rounded flex flex-col items-center justify-center gap-1 transition-all cursor-pointer text-center text-slate-400"
                            >
                              <UploadCloud className="w-6 h-6 text-[#f15a24]" />
                              <span className="text-xs font-bold text-slate-600 block mt-1">UPLOAD RESUME SHEET</span>
                              <span className="text-[9px]">Select PDF, DOC, or DOCX up to 10MB</span>
                            </button>
                          ) : (
                            <div className="p-3 bg-slate-50 border border-slate-200 rounded flex justify-between items-center text-xs">
                              <span className="truncate font-mono font-bold text-emerald-600">{applyForm.cvName}</span>
                              <button 
                                type="button" 
                                onClick={handleRemoveFile}
                                className="text-[#f15a24] hover:underline font-bold font-sans pointer-events-auto cursor-pointer"
                              >
                                Remove
                              </button>
                            </div>
                          )}
                        </div>

                        <button
                          type="submit"
                          id="submit-cv-form-btn"
                          className="w-full py-3 bg-[#153e7a] hover:bg-[#0c2448] text-white font-display text-xs font-black tracking-widest rounded-sm transition-all shadow cursor-pointer text-center"
                        >
                          {isApplying ? 'SENDING APPLICATION...' : 'SUBMIT'}
                        </button>
                      </form>
                    </div>
                  ) : (
                    /* Apply Success */
                    <div className="p-8 text-center space-y-4" id="cv-success-view">
                      <div className="w-14 h-14 bg-emerald-100 rounded-full text-emerald-600 flex items-center justify-center mx-auto mb-2">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <div className="space-y-1">
                        <h5 className="font-display font-black text-xl text-[#153e7a] uppercase">Dossier Logged Successfully!</h5>
                        <p className="text-slate-400 font-sans text-xs">A notification check has been sent to anand@outlook.com</p>
                      </div>
                      <p className="text-slate-500 font-sans text-xs leading-relaxed max-w-sm mx-auto">
                        Thank you for applying, Anand Sharma. Our HR Talent Acquisition committee at Mumbai Headquarters will audit resumes and contact selected applicants for technical panel rounds closer to 4 working days.
                      </p>
                      <button
                        onClick={handleBackToJobs}
                        className="bg-slate-900 text-white font-display text-xs font-bold px-6 py-2 rounded shadow transition-colors cursor-pointer"
                      >
                        Explore Other Vacancies
                      </button>
                    </div>
                  )}

                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Footer close */}
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
