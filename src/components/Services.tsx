/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { SERVICES } from '../data';
import { Service } from '../types';
import { 
  Combine, 
  Shuffle, 
  Hammer, 
  Building2, 
  Orbit, 
  Wrench, 
  ArrowRight, 
  CheckCircle2, 
  FileCheck, 
  Cpu, 
  X 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Icon Renderer helper
const ServiceIcon = ({ iconName, className }: { iconName: string; className: string }) => {
  switch (iconName) {
    case 'BridgeIcon':
      return <Combine className={className} />;
    case 'ConnectivityIcon':
      return <Shuffle className={className} />;
    case 'GirderIcon':
      return <Hammer className={className} />;
    case 'RedevelopmentIcon':
      return <Building2 className={className} />;
    case 'SkywalkIcon':
      return <Orbit className={className} />;
    case 'MaintenanceIcon':
      return <Wrench className={className} />;
    default:
      return <Combine className={className} />;
  }
};

interface ServicesProps {
  onOpenContact?: () => void;
}

export default function Services({ onOpenContact }: ServicesProps) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <section id="services" className="py-20 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-black tracking-widest text-[#f15a24] uppercase block mb-3" style={{ fontSize: '16px' }}>
            OUR SERVICES
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#153e7a] uppercase mb-4">
            What We Do
          </h2>
          <div className="w-16 h-1.5 bg-[#f15a24] mx-auto rounded-full" />
          <p className="text-slate-500 font-sans text-sm md:text-base mt-5 leading-relaxed">
            Kahen Infra design, fabricate and construct robust railway passenger walkways, structural trusses, and Amrit Bharat station developments.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="services-grid">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              onClick={() => setSelectedService(service)}
              className="bg-white rounded-lg overflow-hidden border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer group"
              id={`service-card-${service.id}`}
            >
              <div>
                {/* Image Showcase */}
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={service.image}
                    alt={service.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Floating Action Circle Icon */}
                  <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-[#153e7a] group-hover:bg-[#f15a24] group-hover:text-white transition-colors duration-300">
                    <ServiceIcon iconName={service.iconName} className="w-5 h-5 pointer-events-none" />
                  </div>
                </div>

                {/* Info block */}
                <div className="p-6 space-y-3">
                  <h3 className="font-display font-extrabold text-lg text-[#153e7a] group-hover:text-[#f15a24] transition-colors line-clamp-1">
                    {service.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-sans line-clamp-3">
                    {service.shortDesc}
                  </p>
                </div>
              </div>

              {/* Read More Footer */}
              <div className="px-6 pb-6 pt-2 flex items-center justify-between text-xs font-bold text-[#153e7a] group-hover:text-[#f15a24] transition-colors border-t border-slate-50">
        
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true" id="service-modal-backdrop">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedService(null)}
                className="fixed inset-0 bg-black/40 transition-opacity z-40"
              />

              {/* Center dialog elements */}
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

              {/* Modal Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring', damping: 25 }}
                className="relative z-50 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full"
                id={`service-modal-content-${selectedService.id}`}
              >
                {/* Header Image */}
                <div className="relative h-64 md:h-80 bg-slate-950">
                  <img
                    src={selectedService.image}
                    alt={selectedService.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  
                  {/* Floating Close Button */}
                  <button
                    onClick={() => setSelectedService(null)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-[#f15a24] text-white transition-colors duration-300 focus:outline-none"
                    aria-label="Close modal"
                    id="close-service-modal-btn"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Floating badge */}
                  <div className="absolute top-4 left-4 p-3 bg-[#153e7a] text-white rounded-md shadow-md gap-2 flex items-center">
                    <ServiceIcon iconName={selectedService.iconName} className="w-5 h-5" />
                    <span className="text-[10px] font-black tracking-widest uppercase">TECHNICAL MANUAL</span>
                  </div>

                  {/* Title overlay */}
                  <div className="absolute bottom-6 left-6 right-6 text-white text-left">
                    <h3 className="font-display font-black text-2xl md:text-3xl tracking-tight leading-tight uppercase">
                      {selectedService.title}
                    </h3>
                  </div>
                </div>

                {/* Specs and Details */}
                <div className="p-6 md:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
                  
                  {/* Long Description */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">PROJECT STATEMENT & CAPABILITY</h4>
                    <p className="text-slate-600 font-sans text-sm md:text-base leading-relaxed">
                      {selectedService.longDesc}
                    </p>
                  </div>

                  {/* Compliance Stats Info Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-md flex items-start gap-3">
                      <FileCheck className="w-5 h-5 text-[#f15a24] shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">RDSO / IRS STANDARD</div>
                        <div className="text-slate-800 font-mono text-xs font-semibold leading-relaxed">{selectedService.rdsoSpec}</div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-md flex items-start gap-3">
                      <Cpu className="w-5 h-5 text-[#153e7a] shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">RAW MATERIAL GRADE</div>
                        <div className="text-slate-800 font-mono text-xs font-semibold leading-relaxed">{selectedService.steelGrade}</div>
                      </div>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">CORE FABRICATION CHECKLIST</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3" id="service-features-list">
                      {selectedService.features.map((feat, idx) => (
                        <li key={idx} className="flex gap-2.5 text-slate-600 font-sans text-xs md:text-sm">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer and Close Options */}
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3 rounded-b-lg">
                  <button
                    onClick={() => setSelectedService(null)}
                    className="border border-slate-200 hover:border-slate-300 text-slate-600 px-5 py-2.5 rounded-sm font-display text-xs font-bold tracking-wider cursor-pointer transition-colors"
                  >
                    CLOSE
                  </button>
                  <button
                    onClick={() => {
                      setSelectedService(null);
                      if (onOpenContact) {
                        onOpenContact();
                      }
                    }}
                    className="bg-[#153e7a] hover:bg-[#0c2448] text-white px-5 py-2.5 rounded-sm font-display text-xs font-bold tracking-wider cursor-pointer transition-colors"
                  >
                    CONTACT OUR TEAM
                  </button>
                </div>

              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
