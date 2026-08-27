/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { PROJECTS } from '../data';
import { Project } from '../types';
import { MapPin, Ruler, Calendar, DollarSign, Layers, ChevronRight, Train, Filter, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Coordinates calibrated for 580x580 SVG viewBox

// Projects mapped to geographic & regional layout positions
interface MapProject extends Project {
  // India view coordinates
  indiaX: number;
  indiaY: number;
  // UP detailed view coordinates (calibrated zoom window)
  upX: number;
  upY: number;
  railwayZone: string;
  division: string;
}

const MAP_PROJECTS: MapProject[] = [
  {
    ...PROJECTS[0], // Ayodhya Cantt
    indiaX: 298,
    indiaY: 215,
    upX: 310,
    upY: 205,
    railwayZone: 'Northern Railway (NR)',
    division: 'Lucknow Division'
  },
  {
    ...PROJECTS[1], // Prayagraj Jnc
    indiaX: 290,
    indiaY: 236,
    upX: 290,
    upY: 345,
    railwayZone: 'North Central Railway (NCR)',
    division: 'Prayagraj Division'
  },
  {
    ...PROJECTS[2], // Varanasi Jnc
    indiaX: 318,
    indiaY: 230,
    upX: 430,
    upY: 335,
    railwayZone: 'North Eastern Railway (NER)',
    division: 'Varanasi Division'
  },
  {
    ...PROJECTS[3], // Gonda Jnc
    indiaX: 294,
    indiaY: 204,
    upX: 295,
    upY: 125,
    railwayZone: 'North Eastern Railway (NER)',
    division: 'Lucknow NER Division'
  },
  {
    ...PROJECTS[4], // Lucknow Charbagh
    indiaX: 278,
    indiaY: 218,
    upX: 195,
    upY: 220,
    railwayZone: 'Northern Railway / NER',
    division: 'Lucknow NR Division'
  },
  {
    ...PROJECTS[5], // Kanpur Central
    indiaX: 268,
    indiaY: 224,
    upX: 130,
    upY: 255,
    railwayZone: 'North Central Railway (NCR)',
    division: 'Prayagraj Division'
  }
];

export default function IndiaMapVisualization() {
  const [viewMode, setViewMode] = useState<'india' | 'up'>('india');
  const [hoveredProject, setHoveredProject] = useState<MapProject | null>(null);
  const [selectedProject, setSelectedProject] = useState<MapProject>(MAP_PROJECTS[0]);
  const [filterZone, setFilterZone] = useState<string>('All');

  // Filter project markers with robust abbreviation mapping (e.g. 'North Eastern' matches 'NER')
  const filteredProjects = filterZone === 'All'
    ? MAP_PROJECTS
    : MAP_PROJECTS.filter(p => {
        if (filterZone === 'Northern') {
          return p.railwayZone.includes('Northern') || p.railwayZone.includes('NR');
        }
        if (filterZone === 'North Central') {
          return p.railwayZone.includes('North Central') || p.railwayZone.includes('NCR');
        }
        if (filterZone === 'North Eastern') {
          return p.railwayZone.includes('North Eastern') || p.railwayZone.includes('NER');
        }
        return p.railwayZone.includes(filterZone);
      });

  // Keep selected project in sync with the filtered list
  useEffect(() => {
    if (filterZone !== 'All') {
      const isStillFiltered = filteredProjects.some(p => p.id === selectedProject.id);
      if (!isStillFiltered && filteredProjects.length > 0) {
        setSelectedProject(filteredProjects[0]);
      }
    }
  }, [filterZone, filteredProjects, selectedProject.id]);

  // Handle clicking a node to display details
  const handlePinClick = (project: MapProject) => {
    setSelectedProject(project);
  };

  return (
    <section id="map-footprint" className="py-24 bg-[#030d1d] text-white overflow-hidden relative border-t border-slate-900">
      {/* Blueprint Grid Lines accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f2440_1px,transparent_1px),linear-gradient(to_bottom,#0f2440_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] opacity-30" />
      
      {/* Ambient gradient glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-orange-600/10 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Header Grid */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-8 mb-16">
          <div>
            <span className="text-xs font-black tracking-widest text-[#f15a24] uppercase block mb-3">
              GEOGRAPHIC FOOTPRINT
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight uppercase leading-tight">
              Erection Footprint Map
            </h2>
            <p className="text-slate-400 text-sm md:text-base mt-2 max-w-2xl">
              Interactively inspect our major high-span foot over bridge construction sites successfully commissioned across primary Northern India Railway Divisions.
            </p>
            <div className="w-16 h-1.5 bg-[#f15a24] mt-5 rounded-full" />
          </div>

          {/* View Toggle Controller */}
          <div className="flex items-center gap-3 self-start lg:self-end bg-slate-900/80 backdrop-blur-sm p-1.5 border border-slate-800 rounded-sm">
            <button
              onClick={() => {
                setViewMode('india');
                setFilterZone('All');
              }}
              className={`px-4 py-2 font-display text-xs font-bold tracking-wider rounded-sm transition-all uppercase cursor-pointer ${
                viewMode === 'india'
                  ? 'bg-[#f15a24] text-white shadow-md shadow-orange-600/10'
                  : 'hover:text-white text-slate-400'
              }`}
            >
              India National View
            </button>
            <button
              onClick={() => setViewMode('up')}
              className={`px-4 py-2 font-display text-xs font-bold tracking-wider rounded-sm transition-all uppercase cursor-pointer ${
                viewMode === 'up'
                  ? 'bg-[#f15a24] text-white shadow-md shadow-orange-600/10'
                  : 'hover:text-white text-slate-400'
              }`}
            >
              UP Divisional Zoom
            </button>
          </div>
        </div>

        {/* Dashboard Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Filter and Map Canvas Display */}
          <div className="lg:col-span-7 bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-lg p-6 flex flex-col items-center justify-center relative">
            
            {/* Map Filter Overlay */}
            <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2 items-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1 bg-slate-950/80 px-2.5 py-1.5 rounded-sm border border-slate-800">
                <Filter className="w-3.5 h-3.5 text-[#f15a24]" /> ZONE FILTER:
              </span>
              {['All', 'Northern', 'North Central', 'North Eastern'].map((zone) => (
                <button
                  key={zone}
                  onClick={() => setFilterZone(zone)}
                  className={`px-2.5 py-1 text-[10px] uppercase font-bold tracking-wide rounded-sm transition-colors border cursor-pointer ${
                    (zone === 'All' && filterZone === 'All') || (zone !== 'All' && filterZone === zone)
                      ? 'bg-[#f15a24]/10 border-[#f15a24] text-[#f15a24]'
                      : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {zone === 'All' ? 'ALL ZONES' : zone}
                </button>
              ))}
            </div>

            {/* Map Title Indicator */}
            <div className="absolute bottom-4 right-4 z-20 bg-slate-950/85 border border-slate-800 p-2.5 rounded-sm text-right font-mono text-[9px] text-slate-400 uppercase tracking-widest hidden md:block">
              {viewMode === 'india' ? (
                <>
                  <div className="text-slate-200 font-extrabold flex items-center gap-1.5 justify-end">
                    <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
                    INDIA GEOGRAPHIC MATRIX
                  </div>
                  <div className="mt-1">SCALE 1:8,500,000 | 580PX VIEWBOX</div>
                </>
              ) : (
                <>
                  <div className="text-slate-200 font-extrabold flex items-center gap-1.5 justify-end">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    UTTAR PRADESH INTENSE CLUSTER
                  </div>
                  <div className="mt-1">SCALE 1:2,100,000 | CORE TRANSIT GRID</div>
                </>
              )}
            </div>

            {/* Interactive SVG Map Container */}
            <div className="w-full max-w-[530px] aspect-square relative flex items-center justify-center p-2 mb-2">
              <svg
                viewBox="0 0 580 580"
                className="w-full h-full select-none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* SVG definitions for beautiful glow effects */}
                <defs>
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                  <filter id="pin-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComponentTransfer>
                      <feFuncA type="linear" slope="0.6"/>
                    </feComponentTransfer>
                    <feMerge>
                      <feMergeNode/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Grid guidelines to give a structural/architectural blueprint look */}
                <g stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.04" strokeDasharray="3,3">
                  <line x1="100" y1="0" x2="100" y2="580" />
                  <line x1="200" y1="0" x2="200" y2="580" />
                  <line x1="300" y1="0" x2="300" y2="580" />
                  <line x1="400" y1="0" x2="400" y2="580" />
                  <line x1="500" y1="0" x2="500" y2="580" />
                  <line x1="0" y1="100" x2="580" y2="100" />
                  <line x1="0" y1="200" x2="580" y2="200" />
                  <line x1="0" y1="300" x2="580" y2="300" />
                  <line x1="0" y1="400" x2="580" y2="400" />
                  <line x1="0" y1="500" x2="580" y2="500" />
                </g>

                {/* 1. INDIA VIEWMODE DRAWINGS */}
                <AnimatePresence mode="wait">
                  {viewMode === 'india' ? (
                    <motion.g
                      key="india-map-paths"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                    >
                      {/* Stylized high-art abstract path of India border */}
                      <path
                        d="M 235 40 
                           L 255 35 L 265 52 L 285 58 L 295 90 L 290 105 L 280 115 
                           L 300 135 L 325 150 L 335 158 
                           L 360 168 L 380 180 L 398 221 L 436 215 
                           L 448 190 L 485 195 L 532 185 L 542 205 L 522 225 L 498 222 
                           L 490 248 L 472 244 L 468 266 L 435 264 L 422 284 
                           L 402 285 L 400 310 L 372 322 L 358 355 L 348 395 
                           L 345 425 L 330 465 L 322 498 L 310 540 L 302 546 
                           L 292 515 L 290 488 L 285 450 L 275 420 L 260 395 
                           L 245 380 L 230 350 L 202 342 L 188 322 L 175 304 
                           L 142 308 L 115 312 L 98 300 L 95 272 L 112 258 
                           L 132 260 L 150 242 L 148 222 L 175 210 L 195 195 
                           L 182 170 L 192 142 L 205 130 L 210 110 L 225 120 
                           L 230 85 Z"
                        fill="#0c1d33"
                        stroke="#1e3a61"
                        strokeWidth="2"
                        className="transition-colors"
                      />

                      {/* State boundary of Uttar Pradesh highlighted on India Map */}
                      <path
                        d="M 248 190 
                           L 275 180 L 298 195 L 318 198 L 332 195 
                           L 358 205 L 390 220 L 368 250 L 350 258 
                           L 325 248 L 305 252 L 295 258 L 285 240 
                           L 278 225 L 255 220 Z"
                        fill="#f15a24"
                        fillOpacity="0.14"
                        stroke="#f15a24"
                        strokeWidth="1.5"
                        strokeDasharray="1,1"
                      />

                      {/* Major Trans-Indian rail route grids matching our hub corridors */}
                      <g stroke="#2c5282" strokeWidth="1" strokeOpacity="0.4" fill="none">
                        {/* Northern Railway Route (Varanasi/Kanpur to Delhi axis) */}
                        <path d="M 195 195 Q 240 210 268 224 T 318 230" />
                        {/* East-West Rail Connection */}
                        <path d="M 115 312 Q 200 270 268 224 T 400 285" strokeDasharray="3,2" />
                        {/* South Connecting Track Grid */}
                        <path d="M 310 540 Q 280 380 268 224" />
                      </g>
                    </motion.g>
                  ) : (
                    /* 2. UP ZOOMED VIEWMODE DRAWINGS */
                    <motion.g
                      key="up-zoomed-paths"
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    >
                      {/* Zoomed State Boundary of Uttar Pradesh */}
                      <path
                        d="M 60 170
                           C 110 120, 160 110, 240 70
                           C 300 110, 310 115, 340 100
                           C 390 125, 450 140, 520 180
                           C 540 250, 480 320, 470 340
                           C 450 370, 430 380, 400 450
                           C 330 450, 310 420, 275 410
                           C 250 430, 210 450, 180 370
                           C 140 370, 120 310, 100 290
                           C 70 290, 60 210, 60 170 Z"
                        fill="#0a1a2f"
                        stroke="#f15a24"
                        strokeWidth="1.5"
                        strokeOpacity="0.5"
                        fillOpacity="0.6"
                      />

                      {/* Schematic Railway Tracks linking the 6 focus stations */}
                      <g strokeWidth="2.5" strokeLinecap="round" fill="none">
                        {/* Line 1: Kanpur - Lucknow - Gonda NER Corridor (Red Line) */}
                        <path
                          d="M 130 255 L 195 220 L 295 125"
                          stroke="#1e3a8a"
                          strokeOpacity="0.75"
                          strokeDasharray="6,4"
                        />
                        {/* Line 2: Lucknow - Ayodhya - Varanasi Core Highway (Orange Line) */}
                        <path
                          d="M 195 220 L 310 205 L 430 335"
                          stroke="#ea580c"
                          strokeOpacity="0.8"
                          strokeDasharray="6,4"
                        />
                        {/* Line 3: Kanpur - Prayagraj - Varanasi Multi-Lane Grid (Emerald Line) */}
                        <path
                          d="M 130 255 L 290 345 L 430 335"
                          stroke="#10b981"
                          strokeOpacity="0.75"
                          strokeDasharray="6,4"
                        />
                      </g>

                      {/* Track node labels to enrich design */}
                      <g fill="#94a3b8" fontSize="9" fontFamily="monospace" opacity="0.65">
                        <text x="140" y="270">NCR Core Line</text>
                        <text x="330" y="220">NER Route</text>
                        <text x="250" y="365">Prayagraj Line</text>
                      </g>
                    </motion.g>
                  )}
                </AnimatePresence>

                {/* 3. INTERACTIVE PINS */}
                <g>
                  {filteredProjects.map((proj) => {
                    // Check if current pin is selected
                    const isSelected = selectedProject.id === proj.id;
                    const isHovered = hoveredProject?.id === proj.id;
                    const posX = viewMode === 'india' ? proj.indiaX : proj.upX;
                    const posY = viewMode === 'india' ? proj.indiaY : proj.upY;

                    return (
                      <g
                        key={proj.id}
                        transform={`translate(${posX}, ${posY})`}
                        className="cursor-pointer group"
                        onClick={() => handlePinClick(proj)}
                        onMouseEnter={() => setHoveredProject(proj)}
                        onMouseLeave={() => setHoveredProject(null)}
                        id={`map-pin-${proj.id}`}
                      >
                        {/* Glowing radial pulse behind selected/hovered pins */}
                        <AnimatePresence>
                          {(isSelected || isHovered) && (
                            <motion.circle
                              initial={{ scale: 0.6, opacity: 0.8 }}
                              animate={{ scale: 2.2, opacity: 0 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                              r="12"
                              fill={viewMode === 'up' ? '#10b981' : '#f15a24'}
                            />
                          )}
                        </AnimatePresence>

                        {/* Solid colored pointer anchor dots */}
                        <circle
                          r={isSelected ? "9" : "6.5"}
                          fill={isSelected ? (viewMode === 'up' ? '#10b981' : '#f15a24') : '#1e293b'}
                          stroke={isSelected ? '#ffffff' : (viewMode === 'up' ? '#10b981' : '#f15a24')}
                          strokeWidth={isSelected ? "2" : "1.5"}
                          filter="url(#pin-glow)"
                          className="transition-all duration-300"
                        />

                        {/* Mini indicator dot in center */}
                        {isSelected && (
                          <circle r="3" fill="#ffffff" />
                        )}
                      </g>
                    );
                  })}
                </g>
              </svg>

              {/* Hover Floating Tooltip Modal Layer */}
              <AnimatePresence>
                {hoveredProject && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute bg-slate-900/95 border border-slate-700/80 p-3 rounded shadow-2xl z-30 max-w-[200px] pointer-events-none text-left"
                    style={{
                      left: `${viewMode === 'india' ? hoveredProject.indiaX : hoveredProject.upX}px`,
                      top: `${(viewMode === 'india' ? hoveredProject.indiaY : hoveredProject.upY) - 100}px`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    <h5 className="font-display font-bold text-[11px] uppercase tracking-wide text-white line-clamp-1">{hoveredProject.title}</h5>
                    <p className="text-[10px] text-slate-300 mt-1 flex items-center gap-1">
                      <MapPin className="w-2.5 h-2.5 text-[#f15a24] shrink-0" />
                      {hoveredProject.location.split(',')[0]}
                    </p>
                    <div className="flex justify-between mt-2 pt-1.5 border-t border-slate-800 text-[9px] font-mono">
                      <span className="text-slate-400">SPAN: {hoveredProject.span}</span>
                      <span className="text-[#f15a24] font-bold">{hoveredProject.year}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Helper Map Guides */}
            <div className="flex items-center gap-5 pt-3 border-t border-slate-800/80 w-full justify-center text-[10px] font-sans text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f15a24]" /> Active Completed Pins
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-700 border border-[#f15a24]" /> Custom Selected Hub
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[9px]">
                *Tip: Click pins to load site report
              </span>
            </div>
          </div>

          {/* Right Column: Selected Case-Study Details Panel */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800/80 rounded-lg p-6 md:p-8 min-h-[500px]">
            <div>
              {/* Header section with railway division and photo */}
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="bg-[#f15a24]/10 text-[#f15a24] border border-[#f15a24]/20 font-mono text-[10px] font-black uppercase px-3 py-1.5 rounded-sm tracking-widest flex items-center gap-1.5">
                  <Train className="w-3.5 h-3.5" /> {selectedProject.railwayZone}
                </span>
                <span className="text-slate-400 text-xs font-mono">{selectedProject.division}</span>
              </div>

              {/* Selected Title and Subheading */}
              <h3 className="font-display font-black text-xl md:text-2xl tracking-normal text-white uppercase block mb-1">
                {selectedProject.title}
              </h3>
              <p className="flex items-center gap-2 text-xs text-slate-400 font-sans mb-5">
                <MapPin className="w-3.5 h-3.5 text-[#f15a24]" />
                {selectedProject.location}
              </p>

              {/* Real high-quality picture preview */}
              <div className="relative rounded overflow-hidden aspect-[16/9] mb-5 bg-slate-950 border border-slate-800/50 shadow-inner group">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                <span className="absolute bottom-3 left-3 bg-[#f15a24]/90 text-white font-mono text-[9px] font-bold py-1 px-2.5 rounded-sm uppercase tracking-wider">
                  CASE PHOTOGRAPH
                </span>
              </div>

              {/* Structural Specification Badges Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6" id="map-project-specs">
                <div className="p-2.5 bg-slate-950/55 rounded border border-slate-800/60 flex flex-col justify-center">
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1 mb-1">
                    <Ruler className="w-3 h-3 text-[#f15a24]" /> NET SPAN
                  </span>
                  <span className="font-mono text-xs md:text-sm font-black text-slate-100">{selectedProject.span}</span>
                </div>
                <div className="p-2.5 bg-slate-950/55 rounded border border-slate-800/60 flex flex-col justify-center">
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1 mb-1">
                    <Layers className="w-3 h-3 text-[#f15a24]" /> STEEL WEIGHT
                  </span>
                  <span className="font-mono text-xs md:text-sm font-black text-slate-100">{selectedProject.weight}</span>
                </div>
                <div className="p-2.5 bg-slate-950/55 rounded border border-slate-800/60 flex flex-col justify-center col-span-2 md:col-span-1">
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1 mb-1">
                    <Calendar className="w-3 h-3 text-[#f15a24]" /> COMMISSIONED
                  </span>
                  <span className="font-mono text-xs md:text-sm font-black text-slate-100">{selectedProject.year}</span>
                </div>
              </div>

              {/* Detailed Scope Bullets summary */}
              <div className="space-y-2 mb-6">
                <span className="text-[10px] font-black uppercase text-[#f15a24] tracking-wider block mb-2">ENGINEERING OVERVIEW:</span>
                <div className="space-y-1.5 max-h-[140px] overflow-y-auto pr-1">
                  {selectedProject.scope.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex gap-2.5 text-xs text-slate-300 items-start leading-relaxed">
                      <ChevronRight className="w-3.5 h-3.5 text-[#f15a24] mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Action footer linking to contact or standard grid view */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap gap-3 items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">PROJECT VALUE</span>
                <span className="font-mono text-sm md:text-base font-black text-[#f15a24]">{selectedProject.contractValue || '₹4.50 Crores'}</span>
              </div>
              <a
                href="#projects"
                className="bg-[#f15a24] hover:bg-orange-600 active:bg-orange-700 text-white font-display text-xs font-bold tracking-wider py-2.5 px-5 rounded-sm transition-all uppercase flex items-center gap-2"
              >
                OPEN FULL CASE STUDY &rarr;
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
