/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Service, Project, Career } from './types';

export const SERVICES: Service[] = [
  {
    id: 'fob-construction',
    title: 'Railway Foot Over Bridge Construction',
    iconName: 'BridgeIcon',
    image: '/assets/images/Vasai Pf 07.jpeg',
    shortDesc: 'End-to-end construction of FOBs with modern design, safety and high durability.',
    longDesc: 'We specialize in the complete planning, engineering, fabrication, and erection of Foot Over Bridges (FOBs) for major junctions of Indian Railways. Following strict RDSO and IRS specifications, we deliver end-to-end infrastructure solutions featuring anti-corrosion treatments, modern roofing, staircases, and integration ready for escalators/lifts.',
    features: [
      'Strict adherence to RDSO Specifications (IRS B1-2001 Welded Bridge Code).',
      'High tensile strength steel grades E250 / E350 BR (IS 2062).',
      'Integration of modern safety treads, anti-skid floor systems, and mesh side screens.',
      'Precision structural analysis using STAAD.Pro or similar software under extreme dead, live, wind, and seismic loadings.'
    ],
    rdsoSpec: 'RDSO/T-8522 & GE-1 Guidelines for Foot Over Bridges',
    steelGrade: 'IS 2062 Grade E350 BR / E250 Quality B0'
  },
  {
    id: 'platform-connectivity',
    title: 'Platform Connectivity Bridges',
    iconName: 'ConnectivityIcon',
    image: '/assets/images/Platfroomconnect.jpeg',
    shortDesc: 'Seamless connectivity between platforms for passenger convenience.',
    longDesc: 'Ensuring seamless flow and safety of thousands of passengers daily. In modern railway planning, wide connectivity corridors (up to 12 meters wide) are erected across multi-track systems to easily bridge Platforms 1 through 10, complete with high-capacity walkways and integrated passenger amenities.',
    features: [
      'Multi-span configurations bridging up to 12 active railway tracks.',
      'Aero-dynamic curved tubular trusses for optimal architectural aesthetic.',
      'Provisions for tactile paving and complete barrier-free movement for differently-abled passengers.',
      'Vibration-damped structural design to sustain high dynamic crowd loading.'
    ],
    rdsoSpec: 'IRS-Bridge Rules & IRS-Steel Bridge Code',
    steelGrade: 'IS 2062 Grade E250 BR (Structural Steel)'
  },
  {
    id: 'steel-girder-fabrication',
    title: 'Steel Girder Fabrication & Erection',
    iconName: 'GirderIcon',
    image: '/assets/images/GadderMake.jpeg',
    shortDesc: 'In-house fabrication and precise erection of steel structures.',
    longDesc: 'Operating high-capacity fabrication yards equipped with CNC drilling, automated submerged arc welding (SAW), and shot blasting machines. We engineer Warren, Pratt, and Bowstring girders, shipping them as bolt-together modular sections built for rapid overnight erection during brief railway track blocks.',
    features: [
      'Automated Submerged Arc Welding (SAW) for premium weld profile and strength.',
      '100% Non-Destructive Testing (NDT) including Radiographic and Ultrasonic testing of welded joints.',
      'Three-coat paint system consisting of Inorganic Zinc Silicate primer, Epoxy intermediate, and Polyurethane finish.',
      'Expert launch management using heavy-duty telescopic & telescopic crawler track-cranes.'
    ],
    rdsoSpec: 'Erection during Track Block: IRS-Steel Bridge Code Cl. 7',
    steelGrade: 'High Tensile IS 2062 E350 C (Lamination Checked Grade)'
  },
  {
    id: 'station-redevelopment',
    title: 'Station Redevelopment Structures',
    iconName: 'RedevelopmentIcon',
    image: '/assets/images/Panvel.jpeg',
    shortDesc: 'Modern structural solutions for station redevelopment projects.',
    longDesc: 'In resonance with the Govt. of India’s Amrit Bharat Station Scheme, we design and execute major structural upgrades, station facade canopies, modern booking building skeletons, concourse roofs, and iconic platform shelter structures.',
    features: [
      'Integration with modern smart station features including solar-ready roof trusses.',
      'Modular space frame structures with high aesthetic value and architectural finish.',
      'Erection of wide-span concourses over operating railway bays without interrupting standard traffic.',
      'Long-life high-grade hot dip galvanized steel members.'
    ],
    rdsoSpec: 'Amrit Bharat Station Structural Design Specifications',
    steelGrade: 'YST 310 (Circular & Square Hollow Structural Sections - IS 1161 / IS 4923)'
  },
  {
    id: 'pedestrian-skywalks',
    title: 'Pedestrian Skywalks',
    iconName: 'SkywalkIcon',
    image: '/assets/images/Neral Sky Walk.jpeg',
    shortDesc: 'Safe and comfortable skywalks for smooth pedestrian movement.',
    longDesc: 'Connecting railway station exits to primary urban transit stops (metro terminals, bus bays, and parking zones). These long-span elevated skywalks are engineered for sustained city loads, featuring polycarbonate roofing, side glazing, and complete CCTV/lighting brackets.',
    features: [
      'Sleek, slim-profile columns with composite steel-concrete slabs.',
      'Thermally insulated roofs and weatherproofing to secure passengers in any season.',
      'Anti-dust and self-cleaning facade structural design.',
      'Engineered to withstand heavy urban wind loads up to Zone V (50m/s).'
    ],
    rdsoSpec: 'IS 800:2007 (General Construction in Steel)',
    steelGrade: 'Structural Steel Fe410W Grade B'
  },
  {
    id: 'maintenance-rehabilitation',
    title: 'Maintenance & Rehabilitation',
    iconName: 'MaintenanceIcon',
    image: '/assets/images/new image virar.jpeg',
    shortDesc: 'Inspection, maintenance and strengthening of existing structures.',
    longDesc: 'Extending the life cycles of vintage British-era and early independent-era railway FOBs. We offer full structural auditing, rust removal, section-strengthening via carbon fiber wrapping or additional steel plates, rivet replacement with high-strength friction grip (HSFG) bolts, and dynamic load testing.',
    features: [
      'Non-destructive testing (NDT) structural integrity reporting.',
      'Rivet retrofitting using modern high-torque HSFG bolt assemblies.',
      'Shot-blasting and corrosion prevention using modern zinc-rich thermally sprayed metal coating.',
      'Emergency strengthening works completed with minimal disruption to train timetables.'
    ],
    rdsoSpec: 'IRS-Bridge Manual & Maintenance Guide (Chapter VI)',
    steelGrade: 'Fe410WA/WB/WC conforming to IS 2062'
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'neral-station-fob',
    title: 'FOB at Neral Stations',
    type: 'Foot Over Bridge',
    span: '385.0 m',
    year: '2025',
    location: 'Neral, Maharashtra',
    image: '/assets/images/neral385meter.jpeg',
    imageGroup: [
    ],
    scope: [
      'Complete designing, standard design drawings approvals from Northern Railway.',
      'Fabrication of main structural bowstring truss girders.',
      'Successful overnight launching within 3.5-hour critical traffic blocks.',
      'Installation of custom-carved aesthetic side screens and safety stairs.'
    ],
    weight: ''
  },
  {
    id: 'Vasai Road-fob',
    title: 'FOB at Vasai Road',
    type: 'Foot Over Bridge',
    span: '220.0 m',
    year: '2026',
    location: 'Vasai Road Station, Maharashtra',
    image: '/assets/images/Vasaistation.webp',
    imageGroup: [
    ],
    scope: [
      'Structural design for heavy mela/festival passenger surge capacities (Kumbh Mela specification safety factors).',
      'Erection of a high-width 6.1-meter passenger path walkway.',
      'Integration of dual escalator structures and elevator-housing columns.',
      'Corrosion protection coating with 15-year guarantee for high-humidity railway flue gases.'
    ],
    weight: '98.2 MT Steel',
    columns: '4 Steel Portal Frames',
    contractValue: '₹3.90 Crores'
  },
  {
    id: 'Nala Sopara-fob',
    title: 'FOB at Nala Sopara',
    type: 'Foot Over Bridge',
    span: '95.0 m',
    year: '2025',
    location: 'Nala Sopara, Maharashtra',
    image: '/assets/images/Nala Sopara fob.avif',
    imageGroup: [
    ],
    scope: [
      'Fabrication of high-integrity Warren-truss design girders conforming to North Eastern Railway standard layouts.',
      'Erection accomplished using 400 MT Telescopic Hydraulic Cranes.',
      'Polycarbonate multiwall safety glass wind screens installation.',
      'Anti-skid floor systems containing quartz epoxy spreads.'
    ],
    weight: '112.8 MT Steel',
    columns: '4 RCC Portal Columns',
    contractValue: '₹4.30 Crores'
  },
  {
    id: 'Panvel-fob',
    title: 'FOB at Panvel',
    type: 'Foot Over Bridge',
    span: '220.0 m',
    year: '2025 To Progress',
    location: 'Panvel, Maharashtra',
    image: '/assets/images/Panvel.jpeg',
    imageGroup: [
    ],
    scope: [
      'Prompt turn-around: design to commissioning in record 110 calendar days.',
      'Heavy hot-rolled channels fabrication at Mumbai facility.',
      'Complete LED lightings and drainage piping layouts installation.',
      'Full load test conducted with sandbags under strict RDSO safety compliance guidelines.'
    ],
    weight: '81.4 MT Steel',
    columns: '4 RCC Piers',
    contractValue: '₹2.95 Crores'
  },
  {
    id: 'Virar-fob',
    title: 'FOB at Virar',
    type: 'Foot Over Bridge',
    span: '220.0 m',
    year: '2025 To Progress',
    location: 'Virar, Maharashtra',
    image: '/assets/images/Virar deck.png',
    imageGroup: [
      '/assets/images/station_redev_hero_1780894251205.png'
    ],
    scope: [
      'Aesthetic historic facade matching design for Northern Railway Charbagh entry lines.',
      'High-span steel support towers.',
      'Double width walkway 4.8m wide with customized handrail and structural reinforcement.',
      'Escalator ready framework with automated power backup provisions.'
    ],
    weight: '136.2 MT Steel',
    columns: '6 Heavy Tubular Steel Portals',
    contractValue: '₹5.60 Crores'
  },
  {
    id: 'Ghatkoapar-fob',
    title: 'FOB at Ghatkopar',
    type: 'Development Skywalk',
    span: '120.0 m',
    year: '2024',
    location: 'Ghatkopar, Maharashtra',
    image: '/assets/images/Ghatkopar fob.webp',
    imageGroup: [
     
    ],
    scope: [
      'Special wide-span Space Frame steel structure to connect primary booking office with newly constructed platform lounges.',
      'Curvaceous high-gloss color finish roof structures.',
      'Laminated glass panel railings and multi-zone fire sprinkler framework.',
      'Heavy-duty expansion joints to accommodate high vibration limits of nearby express transits.'
    ],
    weight: '215.0 MT Steel',
    columns: '8 Massive Quad-Pillar Steel Pylons',
    contractValue: '₹9.40 Crores'
  },
{
  id: 'Dahanu-ROB-Work',
  title: 'Dahanu ROB Work',
  type: 'Railway Over Bridge (ROB)',
  span: '1.0 km',
  year: '2024',
  location: 'Dahanu, Maharashtra',

  image: '/assets/images/Dahanu Fob 1.jpeg',
  imageGroup: [


  ],

  scope: [
    'PSC Gadder launching and erection work for the Railway Over Bridge.',
    'Construction and execution of RCC deck slab.',
    'Execution of bridge works covering an approximate distance of 1 km.'
  ],

  weight: '—',
  columns: '—',
  contractValue: '—'
}
  
];

export const CAREERS: Career[] = [
  {
    id: 'structural-engineer',
    title: 'Senior Structural Engineer (Bridges)',
    department: 'Engineering & Design',
    experience: '8+ Years',
    location: 'Mumbai Headquarters',
    description: 'We are seeking an experienced Bridge Design Engineer to lead the structural calculation, modeling, and blueprint design of railway Foot Over Bridges (FOBs) and related transit buildings in strict coordination with Indian Railways RDSO standards.',
    requirements: [
      'B.Tech / M.Tech in Structural Engineering from a recognized institution.',
      'Expert knowledge of IS 800:2007, IRS Steel Bridge Code, and Welded Bridge Rules.',
      'Proficiency in designing softwares like STAAD.Pro, Tekla, and AutoCAD.',
      'Prior experience handling RDSO/Railway design approvals (preferred).'
    ]
  },
  {
    id: 'site-fab-engineer',
    title: 'Site Fabrication Engineer',
    department: 'Operations & Execution',
    experience: '4+ Years',
    location: 'Project Sites, Maharashtra',
    description: 'Oversee on-site or yard fabrication of heavy steel girders. Responsibilities include inspecting welding quality, ensuring adherence to design tolerances, managing layout assemblies, and orchestrating flawless structural handovers and erection cycles.',
    requirements: [
      'Degree or Diploma in Mechanical / Civil Engineering.',
      'Hands-on experience in steel welding processes (MIG/SAW) and NDT quality workflows.',
      'Ability to read complex isometric drawings and structural blueprints.',
      'Proven expertise organizing workforce and equipment schedules for overnight rail-blocks.'
    ]
  },
  {
    id: 'hseq-officer',
    title: 'HSEQ Manager (Rail Safety Specialist)',
    department: 'Quality & Safety',
    experience: '5+ Years',
    location: 'Mumbai / Pune Sites',
    description: 'Enforce absolute zero-harm safety standards and ISO certifications parameters on high-altitude railway erection projects. Coordinate track block safety protocols directly with Indian Railway authorities.',
    requirements: [
      'Diploma in Industrial Safety (such as ADIS or NEBOSH).',
      'Strong knowledge of OSHA, OHSAS 18001/ISO 45001 rules.',
      'Familiarity with critical erection safety standards around high-tension overhead equipment (OHE lines).',
      'Excellent leadership skills and proactive mindset to manage regular safety drills.'
    ]
  }
];

export const GENERAL_STATIONS = [
  'Neral Junction', 'Vasai Road', 'Nala Sopara', 
  'Panvel Junction', 'Virar Station', 'Ghatkopar', 
  'Dahanu Road', 'Pune Junction', 'Thane Junction'
];
