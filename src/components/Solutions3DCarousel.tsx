import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, ChevronRight, Gem, GraduationCap, Laptop, Pill, 
  Scissors, ShoppingCart, ArrowRight, Sparkles, CheckCircle2, 
  MessageSquare, Play, Eye, RotateCw
} from 'lucide-react';
import { useContact } from '../context/ContactContext';

interface CarouselItem {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  badge: string;
  icon: React.ElementType;
  accentColor: string;
  glowColor: string;
  metrics: { label: string; value: string };
  highlights: string[];
  specs: string[];
  turnaround: string;
}

const CAROUSEL_SOLUTIONS: CarouselItem[] = [
  {
    id: 'retail-jewellery',
    category: 'Retail & Luxury Commerce',
    title: 'Jewellery Showroom & Live Rate Engine',
    subtitle: 'Daily 22k/24k gold ticker with instant WhatsApp catalog ordering and digital hallmarking verification.',
    badge: 'Flagship Retail Solution',
    icon: Gem,
    accentColor: 'from-amber-400 to-amber-600',
    glowColor: 'rgba(245, 158, 11, 0.28)',
    metrics: { label: 'Inbound Conversion', value: '+240%' },
    highlights: [
      'Automated daily 22K/24K Gold & Silver rates ticker',
      'One-tap "Inquire on WhatsApp" directly attached to each ornament',
      'Instant Making Charges + Weight + GST calculator',
      'Mobile store-manager app to publish photos in 10 seconds',
    ],
    specs: ['Next.js / React', 'Tailwind Engine', 'WhatsApp Business API', 'Cloudflare CDN'],
    turnaround: '3–5 Days Delivery',
  },
  {
    id: 'academic-capstones',
    category: 'Academic Engineering Hub',
    title: 'AI, ML & Academic Engineering Capstones',
    subtitle: 'End-to-end verified source code, university-standard project reports, presentation decks, and 1-on-1 viva defense coaching.',
    badge: '100% University Verified',
    icon: GraduationCap,
    accentColor: 'from-cyan-400 to-blue-600',
    glowColor: 'rgba(6, 182, 212, 0.35)',
    metrics: { label: 'First-Attempt Viva Score', value: '98%' },
    highlights: [
      '100% working source code in Python, TensorFlow, MERN, or Flutter',
      '60–100+ page university-standard project report with UML diagrams',
      'Faculty-ready presentation slide deck (PPT)',
      '1-on-1 private screen-share viva defense preparation sessions',
    ],
    specs: ['Python / PyTorch', 'React & Node', 'OpenCV / CNN', 'UML & System Specs'],
    turnaround: '3–4 Days Delivery',
  },
  {
    id: 'high-velocity-web',
    category: 'Enterprise & Agency Web',
    title: 'High-Velocity Corporate & Brand Platforms',
    subtitle: 'Bespoke web applications engineered with 99+ Core Web Vitals, rich 3D perspective animations, and zero framework bloat.',
    badge: 'Peak Performance',
    icon: Laptop,
    accentColor: 'from-blue-500 to-indigo-600',
    glowColor: 'rgba(59, 130, 246, 0.3)',
    metrics: { label: 'Lighthouse Performance', value: '100/100' },
    highlights: [
      'Interactive 3D canvas and dynamic perspective transforms',
      'Sub-second page load times across mobile 4G and 5G networks',
      'Lead capture funnels connected to central client databases',
      'Custom admin consoles for effortless content management',
    ],
    specs: ['Vite / TypeScript', 'Hardware Acceleration', 'SEO Structured Data', 'Edge Middleware'],
    turnaround: '3–7 Days Delivery',
  },
  {
    id: 'medical-pharmacy',
    category: 'Healthcare & Chemist POS',
    title: 'Pharmacy Inventory & Expiry Automation',
    subtitle: 'Barcode billing POS with 60-day automated medicine expiry notifications and customer digital prescription upload.',
    badge: 'Zero Medicine Loss',
    icon: Pill,
    accentColor: 'from-emerald-400 to-teal-600',
    glowColor: 'rgba(16, 185, 129, 0.3)',
    metrics: { label: 'Inventory Waste Saved', value: '₹45,000/mo' },
    highlights: [
      'Batch-wise 60-day expiry warning alerts before distributor return cutoffs',
      'Local patient mobile prescription upload and verification flow',
      '1-second barcode scan billing with thermal receipt printer integration',
      'Instant WhatsApp digital invoices sent directly to customer phones',
    ],
    specs: ['Web POS Engine', 'Thermal SDK', 'Prescription OCR', 'Automated SMS'],
    turnaround: '4–6 Days Delivery',
  },
  {
    id: 'salon-spa',
    category: 'Appointment & Service Booking',
    title: 'Salon & Spa 24/7 Seat Booking Portal',
    subtitle: 'Self-service client appointment scheduling with stylist allocation, package menus, and automated WhatsApp reminder alerts.',
    badge: 'Zero Missed Bookings',
    icon: Scissors,
    accentColor: 'from-rose-400 to-purple-600',
    glowColor: 'rgba(244, 63, 94, 0.3)',
    metrics: { label: 'No-Show Reduction', value: '-85%' },
    highlights: [
      '24/7 self-service slot and package booking without manual telephone calls',
      'Automated WhatsApp appointment confirmations and 2-hour reminder ping',
      'Stylist chair schedule organizer preventing double-booking overlaps',
      'High-resolution bridal and before/after transformation portfolio gallery',
    ],
    specs: ['Calendar Sync Engine', 'Twilio / WhatsApp API', 'PWA Mobile Ready', 'Role Dashboard'],
    turnaround: '3–5 Days Delivery',
  },
  {
    id: 'general-kirana',
    category: 'Neighbourhood Retail POS',
    title: 'Kirana Digital Billing & Khata Ledger',
    subtitle: 'Cloud-backed customer credit (Khata) accounts, rapid item barcode scanning, and neighbourhood 30-minute delivery ordering.',
    badge: 'Modern Local Commerce',
    icon: ShoppingCart,
    accentColor: 'from-sky-400 to-blue-600',
    glowColor: 'rgba(14, 165, 233, 0.3)',
    metrics: { label: 'Billing Speed', value: '1.2s / Item' },
    highlights: [
      'Lightning-fast barcode cashier terminal compatible with any laptop or phone',
      'Digital credit khata ledger with 1-click WhatsApp payment reminders',
      'Neighbourhood grocery catalog for local customer mobile orders',
      'Daily profit, loss, and cash collection ledger summary reports',
    ],
    specs: ['Offline-First PWA', 'Barcode Scanner API', 'Cloud Sync', 'Multi-Lingual'],
    turnaround: '3–5 Days Delivery',
  },
];

export const Solutions3DCarousel: React.FC = () => {
  const { getWhatsAppUrl } = useContact();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isViewingItem, setIsViewingItem] = useState(false);
  const [selectedModalItem, setSelectedModalItem] = useState<CarouselItem | null>(null);
  const [progress, setProgress] = useState(0);

  // Mouse tilt tracking states for the 3D slicing perspective
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const total = CAROUSEL_SOLUTIONS.length;
  const isStoppedForViewing = Boolean(selectedModalItem || isViewingItem || isHovered || isDragging);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % total);
    setProgress(0);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
    setProgress(0);
  };

  // 2.5 second auto-change timer with real-time progress animation
  // If someone clicks on something to see (modal open or active card inspected or hovered),
  // then for that time it stops, and resumes when they are done!
  useEffect(() => {
    if (isStoppedForViewing) {
      return;
    }

    const intervalMs = 2500; // 2.5 seconds exactly
    const tickMs = 50;
    const increment = (tickMs / intervalMs) * 100;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveIndex((current) => (current + 1) % total);
          return 0;
        }
        return prev + increment;
      });
    }, tickMs);

    return () => clearInterval(interval);
  }, [isStoppedForViewing, total]);

  // When active index changes, reset progress
  useEffect(() => {
    setProgress(0);
  }, [activeIndex]);

  // If user clicked on a card to see, pause auto-rotation for that time,
  // then automatically resume after 8 seconds of inactivity if they don't interact
  useEffect(() => {
    if (!isViewingItem) return;
    const viewTimer = setTimeout(() => {
      setIsViewingItem(false);
    }, 8000);
    return () => clearTimeout(viewTimer);
  }, [isViewingItem, activeIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Mouse movement on active card for interactive 3D slicing tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseTilt({ x: x * 14, y: -y * 14 });
  };

  const handleMouseLeave = () => {
    setMouseTilt({ x: 0, y: 0 });
  };

  // Drag / Swipe handling
  const handleMouseDown = (e: React.MouseEvent) => {
    setDragStartX(e.clientX);
    setIsDragging(true);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (dragStartX !== null) {
      const deltaX = e.clientX - dragStartX;
      if (deltaX > 40) {
        prevSlide();
      } else if (deltaX < -40) {
        nextSlide();
      }
    }
    setDragStartX(null);
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setDragStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (dragStartX !== null) {
      const deltaX = e.changedTouches[0].clientX - dragStartX;
      if (deltaX > 35) {
        prevSlide();
      } else if (deltaX < -35) {
        nextSlide();
      }
    }
    setDragStartX(null);
    setIsDragging(false);
  };

  const handleSelectCardToInspect = (index: number) => {
    setActiveIndex(index);
    setIsViewingItem(true);
  };

  const handleResumeAutoSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsViewingItem(false);
    setProgress(0);
  };

  return (
    <section id="solutions-carousel" className="relative py-16 sm:py-24 border-t border-slate-900 bg-slate-950 overflow-hidden select-none">
      {/* Background ambient lighting and diagonal cyber slicing grid */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-[650px] bg-[radial-gradient(ellipse_at_center,rgba(0,210,255,0.09),rgba(15,23,42,0)_70%)] pointer-events-none" />
      
      {/* Subtle diagonal background slicing light beams */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent rotate-45 transform" />
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-gradient-to-tl from-blue-600/10 via-transparent to-transparent rotate-45 transform" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header: Cleaned of the cluttered control button row per user request */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="max-w-2xl text-left">
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 mb-2">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              <span>DYNAMIC 3D PERSPECTIVE SHOWCASE</span>
            </div>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Precision Engineering.{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
                Sliced into Reality.
              </span>
            </h2>
            <p className="mt-3 text-base text-slate-300">
              Interactive 3D architecture carousel automatically rotating through production systems built by our team.
            </p>
          </div>
        </div>

        {/* ============================================================== */}
        {/* CAROUSEL STAGE: HIGH-FIDELITY 3D SLICED CARD DECK */}
        {/* ============================================================== */}
        <div
          className="relative w-full py-8 sm:py-14 min-h-[490px] sm:min-h-[550px] flex items-center justify-center cursor-grab active:cursor-grabbing"
          style={{ perspective: '1300px' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            handleMouseLeave();
          }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {CAROUSEL_SOLUTIONS.map((item, index) => {
            const Icon = item.icon;
            let offset = index - activeIndex;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            const isCenter = offset === 0;
            const isVisible = Math.abs(offset) <= 2;

            if (!isVisible) return null;

            // Compute smooth 3D slicing kinematics
            const translateX = offset * 290;
            const translateZ = isCenter ? 0 : -180 * Math.abs(offset);
            const rotateY = isCenter ? mouseTilt.x : offset * -26;
            const rotateX = isCenter ? mouseTilt.y : 0;
            const scale = isCenter ? 1 : Math.max(0.78, 1 - Math.abs(offset) * 0.13);
            const opacity = isCenter ? 1 : Math.max(0.35, 1 - Math.abs(offset) * 0.45);
            const zIndex = 30 - Math.abs(offset) * 10;

            return (
              <div
                key={item.id}
                onClick={() => handleSelectCardToInspect(index)}
                onMouseMove={isCenter ? handleMouseMove : undefined}
                className={`absolute w-full max-w-[340px] sm:max-w-[420px] rounded-3xl p-6 sm:p-7 text-left transition-all duration-700 ease-out overflow-hidden group ${
                  isCenter
                    ? 'border-2 border-cyan-500/70 bg-slate-900/95 shadow-2xl ring-1 ring-cyan-400/30'
                    : 'border border-slate-800 bg-slate-950/85 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
                style={{
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(${scale})`,
                  opacity,
                  zIndex,
                  transformStyle: 'preserve-3d',
                  backdropFilter: 'blur(20px)',
                  boxShadow: isCenter
                    ? `0 25px 60px -15px ${item.glowColor}, inset 0 1px 0 rgba(255,255,255,0.15)`
                    : undefined,
                }}
              >
                {/* 2.5s Progression Line on Center Card */}
                {isCenter && !isStoppedForViewing && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-slate-800 overflow-hidden z-30">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 transition-all duration-75"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}

                {/* Slicing light sheen */}
                {isCenter && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
                    <div className="absolute -inset-full bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent rotate-45 transform animate-slice-sheen" />
                    
                    {/* Diagonal Sliced Corner Notch in Top Right */}
                    <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden pointer-events-none">
                      <div className="absolute top-0 right-0 w-16 h-1 bg-gradient-to-r from-transparent to-cyan-400 transform -rotate-45 origin-top-right shadow-[0_0_8px_rgba(0,210,255,0.8)]" />
                    </div>

                    {/* Horizontal Slice Seam in middle */}
                    <div className="absolute top-[48%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent pointer-events-none" />
                  </div>
                )}

                {/* Card Content with 3D Pop */}
                <div style={{ transform: isCenter ? 'translateZ(20px)' : undefined }}>
                  {/* Top Row: Icon Badge & Metric */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${item.accentColor} text-slate-950 shadow-md font-bold group-hover:scale-105 transition-transform`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 block font-semibold">
                          {item.category}
                        </span>
                        <span className="text-xs font-semibold text-slate-400">{item.turnaround}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block">{item.metrics.label}</span>
                      <span className="text-sm sm:text-base font-extrabold font-mono text-cyan-300">
                        {item.metrics.value}
                      </span>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {item.subtitle}
                  </p>

                  {/* Sliced Highlight Bullets */}
                  <div className="space-y-1.5 border-t border-slate-800/80 pt-3 mb-4">
                    {item.highlights.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {item.specs.map((spec, sIdx) => (
                      <span
                        key={sIdx}
                        className="rounded-md bg-slate-950 border border-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-400"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  {/* Action CTAs: Clicking any button pauses rotation for inspection */}
                  {isCenter ? (
                    <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                      <a
                        href={getWhatsAppUrl(`Hi A3T Solutions! I am interested in your ${item.title} system.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsViewingItem(true)}
                        className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 py-2.5 text-xs font-bold text-slate-950 transition-all shadow-md shadow-cyan-500/20"
                      >
                        <MessageSquare className="h-3.5 w-3.5" />
                        <span>Discuss Project</span>
                      </a>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedModalItem(item);
                          setIsViewingItem(true);
                        }}
                        className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-xs font-semibold text-slate-200 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors flex items-center gap-1"
                        title="View Detailed System Specifications"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        <span>Specs</span>
                      </button>
                    </div>
                  ) : (
                    <div className="text-center pt-2 border-t border-slate-800/50 text-[11px] font-medium text-slate-500 flex items-center justify-center gap-1">
                      <span>Click to Focus &amp; Inspect</span>
                      <ArrowRight className="h-3 w-3" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Sliced Architecture Selector Pills (allows direct click to view any system) */}
        <div className="mt-4 pt-4 border-t border-slate-900/80">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {CAROUSEL_SOLUTIONS.map((item, dotIdx) => {
              const Icon = item.icon;
              const isSelected = activeIndex === dotIdx;

              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectCardToInspect(dotIdx)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all text-xs ${
                    isSelected
                      ? 'border-cyan-500 bg-cyan-500/15 text-cyan-300 font-bold shadow-sm ring-1 ring-cyan-500/40'
                      : 'border-slate-800/80 bg-slate-950 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                  aria-label={`Jump to ${item.title}`}
                >
                  <Icon className={`h-3.5 w-3.5 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
                  <span className="truncate max-w-[120px] sm:max-w-none">{item.title.split(' ')[0]} {item.title.split(' ')[1]}</span>
                  {isSelected && (
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse ml-0.5" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Feature Deep Dive Specifications Modal: When open, auto-rotate stops completely */}
      {selectedModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-xl rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-2xl text-left overflow-hidden">
            {/* Top Slicing Accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-600" />

            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
                  {selectedModalItem.category}
                </span>
                <span className="text-slate-600">·</span>
                <span className="text-xs text-slate-400">{selectedModalItem.turnaround}</span>
              </div>
              <button
                onClick={() => {
                  setSelectedModalItem(null);
                  setIsViewingItem(false);
                }}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
              >
                ✕
              </button>
            </div>

            <h3 className="text-xl font-bold text-white mb-2">{selectedModalItem.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-5">{selectedModalItem.subtitle}</p>

            <div className="space-y-4 mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                <span>Architecture &amp; Features Deliverables:</span>
                <span className="text-cyan-400 font-mono text-[11px]">{selectedModalItem.metrics.value} {selectedModalItem.metrics.label}</span>
              </h4>
              <div className="space-y-2">
                {selectedModalItem.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-200">
                    <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6 p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
              <span className="text-slate-500 text-[11px] block w-full mb-1">Production Technology Stack:</span>
              {selectedModalItem.specs.map((sp, idx) => (
                <span key={idx} className="rounded-lg bg-slate-900 border border-slate-700 px-2 py-0.5 text-[11px] font-mono text-cyan-300">
                  {sp}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800 pt-4">
              <div className="text-xs text-slate-400">
                Engineered directly by <strong className="text-white">A3T Solutions Core Technical Team</strong>
              </div>
              <a
                href={getWhatsAppUrl(`Hi A3T Solutions! I want to start a build based on ${selectedModalItem.title}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 px-5 py-2.5 text-xs font-bold text-slate-950 transition-colors shadow text-center"
              >
                Start This Project on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
