import { useState } from 'react';
import { PROJECTS } from '../data';
import { Project } from '../types';
import { MapPin, Calendar, Compass, Layers, Ruler, DollarSign, X, CheckSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';



interface ProjectsProps {
  onOpenContact?: () => void;
}

export default function Projects({ onOpenContact }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filterLocation, setFilterLocation] = useState('All');
  const [showAll, setShowAll] = useState(false);

  const locations = ['All', 'Western Railway', 'Central Railway', 'Eastern Railway', 'Private Sector', 'Other Divisions'];

  const filteredProjects = filterLocation === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => {
        const loc = p.location.toLowerCase();
        if (filterLocation === 'Western Railway') {
          return loc.includes('vasai') || loc.includes('nala sopara') || loc.includes('virar') || loc.includes('dahanu');
        }
        if (filterLocation === 'Central Railway') {
          return loc.includes('neral') || loc.includes('panvel') || loc.includes('ghatkopar');
        }
        if (filterLocation === 'Eastern Railway') {
          return loc.includes('eastern');
        }
        if (filterLocation === 'Private Sector') {
          return p.type.toLowerCase().includes('private') || p.title.toLowerCase().includes('private');
        }
        return p.location.includes(filterLocation);
      });

  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 4);

  return (
    <section id="projects" className="py-24 bg-[#05142b] text-white overflow-hidden relative">
      {/* Background architectural grid pattern accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <span className="text-xl font-black tracking-widest text-[#f15a24] uppercase block mb-3">
              OUR PROJECTS
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase leading-tight">
              Recent FOB Projects
            </h2>
            <div className="w-22 h-1.5 bg-[#f15a24] mt-4 rounded-full" />
          </div>

          <button
            onClick={() => setShowAll(!showAll)}
            id="view-all-projects-btn"
            className="self-start md:self-end border border-slate-700 hover:border-[#f15a24] hover:bg-white/5 text-slate-300 hover:text-white px-6 py-3 rounded-sm font-display text-xs font-bold tracking-widest transition-all uppercase cursor-pointer"
          >
            {showAll ? 'SHOW LESS \u2190' : 'VIEW ALL PROJECTS \u2192'}
          </button>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center gap-2 pb-8 border-b border-slate-800/60 mb-12">
          <span className="text-xs font-black tracking-widest text-slate-400 uppercase mr-3">Filter by Division:</span>
          {locations.map((loc) => (
            <button
              key={loc}
              onClick={() => setFilterLocation(loc)}
              id={`filter-btn-${loc.toLowerCase()}`}
              className={`px-4 py-2 font-display text-xs font-bold tracking-wider rounded-sm transition-all uppercase cursor-pointer ${
                filterLocation === loc
                  ? 'bg-[#f15a24] text-white shadow-md shadow-orange-600/10'
                  : 'bg-slate-900/40 hover:bg-slate-800/60 text-slate-400 hover:text-white border border-slate-800/80'
              }`}
            >
              {loc}
            </button>
          ))}
        </div>

        {/* Projects Grid Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="projects-grid">
          <AnimatePresence mode="popLayout">
            {displayedProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => setSelectedProject(project)}
                className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-sm overflow-hidden shadow-lg hover:shadow-2xl hover:border-slate-700 transition-all duration-300 flex flex-col justify-between cursor-pointer group"
                id={`project-card-${project.id}`}
              >
                <div>
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden bg-slate-950">
                    <img
                      src={project.image}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                    <span className="absolute bottom-3 left-3 bg-[#f15a24] text-white text-[9px] font-black tracking-widest py-1 px-2.5 rounded-sm uppercase">
                      {project.type}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-4">
                    <h3 className="font-display font-extrabold text-base tracking-tight leading-snug group-hover:text-[#f15a24] transition-colors line-clamp-1">
                      {project.title}
                    </h3>

                    {/* Metadata Parameters List */}
                    <div className="space-y-2 text-xs font-sans text-slate-400">
                      <div className="flex justify-between items-center py-1 border-b border-slate-800/80">
                        <span className="flex items-center gap-1.5"><Ruler className="w-3.5 h-3.5 text-[#f15a24]" /> Span</span>
                        <span className="font-mono text-slate-200 font-bold">{project.span}</span>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-slate-800/80">
                        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-[#f15a24]" /> Erection Year</span>
                        <span className="font-mono text-slate-200 font-bold">{project.year}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Location Footer */}
                <div className="px-5 py-3.5 bg-slate-900/90 border-t border-slate-800/80 flex items-center gap-2 text-xs text-slate-400 font-sans group-hover:text-slate-200 transition-colors">
                  <MapPin className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#f15a24] shrink-0" />
                  <span className="truncate">{project.location}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Project Expand Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true" id="project-modal-backdrop">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="fixed inset-0 bg-black/40 transition-opacity z-40"
              />

              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

              {/* Modal Box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring', damping: 25 }}
                className="relative z-50 inline-block align-bottom bg-slate-900 text-white rounded-lg text-left overflow-hidden shadow-2xl border border-slate-800 transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full"
                id={`project-modal-content-${selectedProject.id}`}
              >
                {/* Images Showcase Slider */}
                <div className="relative h-64 md:h-80 bg-slate-950">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                  
                  {/* Close button */}
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-[#f15a24] text-white transition-colors focus:outline-none"
                    aria-label="Close modal"
                    id="close-project-modal-btn"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="absolute top-4 left-4 p-2 bg-[#f15a24] text-white text-[9px] font-black tracking-widest uppercase rounded">
                    CONSTRUCTED CASE STUDY
                  </div>

                  {/* Title overlay */}
                  <div className="absolute bottom-6 left-6 right-6 text-left">
                    <h3 className="font-display font-black text-xl md:text-3xl tracking-tight leading-tight">
                      {selectedProject.title}
                    </h3>
                    <p className="flex items-center gap-1.5 text-xs text-slate-300 font-sans mt-2">
                      <MapPin className="w-3.5 h-3.5 text-[#f15a24] shrink-0" />
                      {selectedProject.location}
                    </p>
                  </div>
                </div>

                {/* Case Study Parameters Grid */}
                <div className="p-5 md:p-8 space-y-0.1 max-h-[60vh] overflow-y-auto">
                  
                  {/* Spec Highlights Table */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4" id="project-specs-grid">
                    

                    <div>
                    </div>
                    <div>
                    </div>
                    <div>
                    </div>
                  </div>

                  {/* Scope of Work */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-black uppercase text-[#f15a24] tracking-wider">PROJECT SCOPE & ENGINEERING HIGHLIGHTS:</h4>
                    <ul className="space-y-3 font-sans" id="project-scope-list">
                      {selectedProject.scope.map((scopeItem, idx) => (
                        <li key={idx} className="flex gap-3 text-slate-300 text-xs md:text-sm leading-relaxed items-start">
                          <CheckSquare className="w-4 h-4 text-[#f15a24] shrink-0 mt-0.5" />
                          <span>{scopeItem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Certification tag */}
                  <div className="p-4 bg-slate-950/50 border border-slate-800/80 rounded flex items-center justify-between text-xs font-sans text-slate-400">
                    <span>Quality standards certified: <strong>IS 1024 welding codes</strong> & <strong>RDSO QAP inspection rules</strong>.</span>
                    <span className="font-mono border border-emerald-500/30 text-emerald-500 text-[10px] uppercase font-black px-2 py-0.5 rounded">APPROVED</span>
                  </div>
                </div>

                {/* Footer buttons */}
                <div className="px-6 py-4 bg-slate-950/80 border-t border-slate-800/80 flex justify-end gap-3 rounded-b-lg">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="border border-slate-700 hover:border-slate-500 text-slate-400 hover:text-white px-5 py-2 rounded-sm font-display text-xs font-bold tracking-wider cursor-pointer transition-colors"
                  >
                    CLOSE
                  </button>
                  <a
                    href="#contact"
                    onClick={() => {
                      setSelectedProject(null);
                      const element = document.getElementById('contact');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    // className="bg-[#f15a24] hover:bg-orange-600 text-white px-5 py-2 rounded-sm font-display text-xs font-bold tracking-wider cursor-pointer transition-colors"
                  >
                    {/* INQUIRE SIMILAR BUILD */}
                  </a>
                </div>

              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
