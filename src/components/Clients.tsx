/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ArrowUpRight, Handshake } from 'lucide-react';

const CLIENTS = [
  { 
    name: 'Sai Dutt Real Infra Pvt. Ltd.', 
    initials: 'SD', 
    desc: 'Infrastructure & Real Estate Development' 
  },
  { 
    name: 'Koneru Constructions Pvt. Ltd.', 
    initials: 'KC', 
    desc: 'Construction & Infrastructure Projects' 
  },
  { 
    name: 'Miral Infrastructure', 
    initials: 'MI', 
    desc: 'Infrastructure Development & Project Execution' 
  },
  { 
    name: 'Mahadev Infrastructure', 
    initials: 'MA', 
    desc: 'Infrastructure & Civil Construction Services' 
  },
  { 
    name: 'Vitrag Infra Projects LLP', 
    initials: 'VI', 
    desc: 'Infrastructure Projects & Development' 
  }
];

export default function Clients() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50/50 border-y border-slate-100 overflow-hidden relative" id="clients">
      {/* Premium background decorative shapes */}
      <div className="absolute top-0 right-10 w-72 h-72 bg-[#153e7a]/3 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-[#f15a24]/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-20 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-[#153e7a]/5 px-3 py-1.5 rounded-full mb-2"
          >
            <Handshake className="w-4 h-4 text-[#f15a24]" />
            <span className="text-[13px] font-black tracking-widest text-[#153e7a] uppercase font-mono">
              Partnerships Built on Trust
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-5xl font-display font-black tracking-tight text-[#153e7a] uppercase leading-tight"
          >
            Our Trusted Clients
          </motion.h2>
          
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '5rem' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1.5 bg-[#f15a24] mx-auto rounded-full"
          />
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-slate-500 font-sans text-sm md:text-base leading-relaxed pt-2"
          >
            We are proud to work with leading infrastructure and construction companies who trust us for quality workmanship, timely execution, and reliable project support.
          </motion.p>
        </div>

        {/* Premium Clients Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6" id="clients-grid">
          {CLIENTS.map((client, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.08, type: 'spring', damping: 20 }}
              whileHover={{ y: -6 }}
              className="bg-white p-5 rounded-xl border border-slate-100/80 shadow-sm hover:shadow-lg hover:border-[#153e7a]/20 transition-all duration-300 flex flex-col justify-between items-center text-center group relative overflow-hidden cursor-pointer h-full"
            >
              {/* Premium Corner Accent */}
              <div className="absolute top-0 right-0 w-0 h-0 border-t-[8px] border-r-[8px] border-t-transparent border-r-transparent group-hover:border-t-[#f15a24] group-hover:border-r-[#f15a24] transition-all duration-300" />
              
              {/* Top Section with Initials Badge */}
              <div className="flex flex-col items-center w-full">
                <div className="w-12 h-12 rounded-full bg-slate-50 text-[#153e7a] group-hover:bg-gradient-to-br group-hover:from-[#153e7a] group-hover:to-[#0a2540] group-hover:text-white flex items-center justify-center font-display font-black text-base transition-all duration-500 mb-3.5 shadow-inner border border-slate-100 group-hover:border-transparent group-hover:scale-105">
                  {client.initials}
                </div>

                <h4 className="font-display font-extrabold text-slate-800 text-sm group-hover:text-[#153e7a] transition-colors duration-300 leading-snug">
                  {client.name}
                </h4>
              </div>

              {/* Bottom section with Description */}
              <div className="w-full mt-4 space-y-3">
                <div className="w-6 h-[1.5px] bg-slate-200 group-hover:bg-[#f15a24] mx-auto transition-colors duration-300" />
                <p className="text-[11px] text-slate-500 leading-relaxed font-sans group-hover:text-slate-600 transition-colors duration-300">
                  {client.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
