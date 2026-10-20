import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, Search, CheckCircle2, 
  Volume2, VolumeX, Maximize2, Video, Film, Smartphone,
  Star, ExternalLink, Phone, MessageSquare, ArrowRight,
  Layers, Store, GraduationCap, Sparkles
} from 'lucide-react';
import { useContact } from '../context/ContactContext';

interface A3TVideoShowcaseProps {
  onConsultClick?: () => void;
}

const SEARCH_PRESETS = [
  "A3T Solutions",
  "Best digital tech solutions for businesses",
  "Jewellery showroom catalog & billing website",
  "College final year project with complete source code & report",
];

export const A3TVideoShowcase: React.FC<A3TVideoShowcaseProps> = () => {
  const { contactInfo, getPhoneUrl, getWhatsAppUrl } = useContact();
  const [activeVideoTab, setActiveVideoTab] = useState<'google_search' | '3d_brand' | 'concept_build'>('google_search');
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Google Search Typing Simulator States
  const [presetIndex, setPresetIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isTypingActive, setIsTypingActive] = useState(true);
  const [userHasTyped, setUserHasTyped] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Typewriter animation cycle when user is not manually typing
  useEffect(() => {
    if (activeVideoTab !== 'google_search' || userHasTyped) return;

    let timeoutId: NodeJS.Timeout;
    const targetQuery = SEARCH_PRESETS[presetIndex];
    let charIndex = 0;
    setIsTypingActive(true);
    setSearchQuery('');

    const typeNextChar = () => {
      if (charIndex <= targetQuery.length) {
        setSearchQuery(targetQuery.slice(0, charIndex));
        charIndex++;
        timeoutId = setTimeout(typeNextChar, 50 + Math.random() * 30);
      } else {
        setIsTypingActive(false);
        // Hold on results, then rotate to next preset
        timeoutId = setTimeout(() => {
          setPresetIndex((prev) => (prev + 1) % SEARCH_PRESETS.length);
        }, 5500);
      }
    };

    timeoutId = setTimeout(typeNextChar, 600);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [activeVideoTab, presetIndex, userHasTyped]);

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!containerRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      containerRef.current.requestFullscreen().catch(() => {});
    }
  };

  const handleManualSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserHasTyped(true);
    setIsTypingActive(false);
    setSearchQuery(e.target.value);
  };

  const handleSelectPresetChip = (preset: string) => {
    setUserHasTyped(true);
    setIsTypingActive(false);
    setSearchQuery(preset);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-4xl" ref={containerRef}>
      {/* Decorative ambient gradient backdrop */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-sky-400/20 blur-xl opacity-75" />

      <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
        {/* Top Video Header Bar & Tab Switcher (no bulky controls, no pause/loop tags) */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-b border-slate-800 bg-slate-950/90 px-4 py-3 backdrop-blur-md gap-3">
          {/* Tab Selection */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 w-full sm:w-auto overflow-x-auto justify-center">
            {/* Google Search Experience Tab */}
            <button
              onClick={() => {
                setActiveVideoTab('google_search');
                setUserHasTyped(false);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeVideoTab === 'google_search'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="h-3.5 w-3.5" />
              <span>Google Search Video</span>
            </button>

            {/* 3D Brand Film Tab */}
            <button
              onClick={() => {
                setActiveVideoTab('3d_brand');
                setIsPlaying(true);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeVideoTab === '3d_brand'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Film className="h-3.5 w-3.5" />
              <span>3D Brand Film</span>
            </button>

            {/* Concept to Reality Tab */}
            <button
              onClick={() => {
                setActiveVideoTab('concept_build');
                setIsPlaying(true);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeVideoTab === 'concept_build'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Video className="h-3.5 w-3.5" />
              <span>Concept to Reality</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Interactive Media Showcase</span>
          </div>
        </div>

        {/* Video Player & Google Simulation Stage */}
        <div className="relative flex items-center justify-center bg-black min-h-[460px] sm:min-h-[520px]">
          {/* TAB 1: GOOGLE SEARCH VIDEO & SIMULATION */}
          {activeVideoTab === 'google_search' && (
            <div className="relative w-full p-4 sm:p-7 bg-slate-950 flex flex-col items-center">
              {/* Smartphone Frame with Authentic Google Search */}
              <div className="w-full max-w-xl rounded-[32px] sm:rounded-[36px] border-4 border-slate-800 bg-white shadow-2xl overflow-hidden text-left transition-all">
                {/* Phone Status Bar */}
                <div className="flex items-center justify-between px-5 pt-2.5 pb-1 bg-white text-slate-900 border-b border-slate-100">
                  <div className="flex items-center gap-1.5 text-xs font-bold">
                    <span>12:01</span>
                    <span className="inline-block h-2 w-2 rounded-full bg-cyan-600" />
                  </div>
                  {/* Notch */}
                  <div className="h-3.5 w-24 rounded-full bg-slate-200" />
                  <div className="flex items-center gap-1 text-[11px] font-mono text-slate-600 font-semibold">
                    <span>5G</span>
                    <span className="text-[10px]">100%</span>
                  </div>
                </div>

                {/* Google Search Bar Header */}
                <div className="p-3 sm:p-4 bg-white border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    {/* Google Multicolor Logo */}
                    <div className="flex items-center font-bold text-base sm:text-lg tracking-tight select-none">
                      <span className="text-[#4285F4]">G</span>
                      <span className="text-[#EA4335]">o</span>
                      <span className="text-[#FBBC05]">o</span>
                      <span className="text-[#4285F4]">g</span>
                      <span className="text-[#34A853]">l</span>
                      <span className="text-[#EA4335]">e</span>
                    </div>

                    {/* Interactive Google Search Bar */}
                    <div className="relative flex-1 flex items-center rounded-full border border-slate-300 bg-slate-50 px-3.5 py-1.5 sm:py-2 shadow-inner focus-within:border-cyan-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-cyan-500/20 transition-all">
                      <Search className="h-4 w-4 text-slate-400 mr-2 flex-shrink-0" />
                      <input
                        ref={inputRef}
                        type="text"
                        value={searchQuery}
                        onChange={handleManualSearchInput}
                        placeholder="Type to search..."
                        className="w-full bg-transparent text-xs sm:text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400"
                      />
                      {isTypingActive && (
                        <span className="inline-block w-1.5 h-4 bg-cyan-500 animate-pulse ml-0.5" />
                      )}
                      {searchQuery && (
                        <button
                          onClick={() => {
                            setSearchQuery('');
                            setUserHasTyped(true);
                            inputRef.current?.focus();
                          }}
                          className="text-xs text-slate-400 hover:text-slate-600 px-1 font-bold"
                          title="Clear search"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Google Filter Tabs */}
                  <div className="flex items-center gap-4 mt-3 text-xs text-slate-600 font-medium border-b border-slate-100 pb-1">
                    <span className="text-[#1a73e8] font-bold border-b-2 border-[#1a73e8] pb-1 cursor-pointer">
                      All
                    </span>
                    <span className="hover:text-slate-900 cursor-pointer">Images</span>
                    <span className="hover:text-slate-900 cursor-pointer">Videos</span>
                    <span className="hover:text-slate-900 cursor-pointer">Maps</span>
                    <span className="hover:text-slate-900 cursor-pointer">News</span>
                  </div>
                </div>

                {/* Google Search Hits / Results Section */}
                <div className="p-3 sm:p-5 bg-slate-50 max-h-[380px] overflow-y-auto space-y-3.5">
                  <div className="text-[11px] text-slate-500">
                    About 2,450,000 results (0.28 seconds)
                  </div>

                  {/* Primary Google Result: A3T SOLUTIONS with Logo & All Sitelinks */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
                    {/* Top Result Domain & Verified Logo */}
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <div className="h-7 w-7 rounded-full bg-slate-950 p-1 flex items-center justify-center border border-slate-300 flex-shrink-0 shadow-sm">
                        <img
                          src="/logo.png"
                          alt="A3T Solutions Official Logo"
                          className="h-full w-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/logo.svg';
                          }}
                        />
                      </div>
                      <div className="truncate">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                            A3T SOLUTIONS
                          </span>
                          <CheckCircle2 className="h-3.5 w-3.5 text-blue-500 fill-blue-500/20" />
                          <span className="text-[10px] bg-blue-50 text-blue-600 font-semibold px-1.5 py-0.2 rounded">
                            Official
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono truncate">
                          https://a3tsolutions.com
                        </div>
                      </div>
                    </div>

                    {/* Main Title */}
                    <h3 className="text-base sm:text-lg font-bold text-[#1a0dab] hover:underline cursor-pointer leading-tight">
                      A3T Solutions: Best Digital Tech Solutions for Businesses &amp; Students
                    </h3>

                    {/* Meta Description */}
                    <p className="mt-1 text-xs text-slate-700 leading-relaxed">
                      Turnkey Engineering with rapid 3–7 day delivery. Custom web &amp; mobile architectures for retail stores (jewellery, medical, salons) and university collegiate capstone engineering projects with verified code.
                    </p>

                    {/* All Sitelinks ("All Links / Hits") */}
                    <div className="mt-3.5 pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {/* Link 1: Shop & Retail */}
                      <button
                        onClick={() => scrollToSection('services-shop')}
                        className="text-left rounded-xl p-2 bg-slate-50 hover:bg-cyan-50 border border-slate-100 hover:border-cyan-200 transition-colors group"
                      >
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#1a0dab] group-hover:text-cyan-700">
                          <Store className="h-3.5 w-3.5 text-cyan-600" />
                          <span>Shop Solutions &amp; Billing</span>
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                          Jewellery catalogs, pharmacy &amp; salon billing systems.
                        </p>
                      </button>

                      {/* Link 2: Student Projects */}
                      <button
                        onClick={() => scrollToSection('services-student')}
                        className="text-left rounded-xl p-2 bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-200 transition-colors group"
                      >
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#1a0dab] group-hover:text-blue-700">
                          <GraduationCap className="h-3.5 w-3.5 text-blue-600" />
                          <span>Student Capstone Hub</span>
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                          Source code, full project report &amp; viva presentation.
                        </p>
                      </button>

                      {/* Link 3: 3D Showcase */}
                      <button
                        onClick={() => scrollToSection('solutions-carousel')}
                        className="text-left rounded-xl p-2 bg-slate-50 hover:bg-sky-50 border border-slate-100 hover:border-sky-200 transition-colors group"
                      >
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#1a0dab] group-hover:text-sky-700">
                          <Layers className="h-3.5 w-3.5 text-sky-600" />
                          <span>3D Architecture Carousel</span>
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                          Sliced 3D perspective of live client architectures.
                        </p>
                      </button>

                      {/* Link 4: Direct WhatsApp Consultation */}
                      <a
                        href={getWhatsAppUrl("Hi A3T Solutions! I searched your services on Google and want to consult on a project.")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-left rounded-xl p-2 bg-slate-50 hover:bg-emerald-50 border border-slate-100 hover:border-emerald-200 transition-colors group block"
                      >
                        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 group-hover:text-emerald-800">
                          <MessageSquare className="h-3.5 w-3.5 text-emerald-600" />
                          <span>Direct WhatsApp Consult</span>
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                          Instant chat with core founding engineers.
                        </p>
                      </a>
                    </div>
                  </div>

                  {/* Google Knowledge Panel / Business Snapshot */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src="/logo.png"
                          alt="A3T Logo"
                          className="h-6 w-6 object-contain"
                        />
                        <div>
                          <div className="text-xs font-bold text-slate-900">A3T Solutions</div>
                          <div className="flex items-center gap-1 text-[11px] text-amber-500 font-bold">
                            <span>5.0</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />
                              ))}
                            </div>
                            <span className="text-slate-500 font-normal">(148+ Google reviews)</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <a
                          href={getPhoneUrl()}
                          className="flex items-center gap-1 rounded-lg bg-cyan-50 px-2.5 py-1 text-[11px] font-bold text-cyan-700 hover:bg-cyan-100 border border-cyan-200 transition-colors"
                        >
                          <Phone className="h-3 w-3" />
                          <span>Call</span>
                        </a>
                        <a
                          href={getWhatsAppUrl()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors"
                        >
                          <MessageSquare className="h-3 w-3" />
                          <span>Chat</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Preset Search Chips (at bottom of phone) */}
                <div className="p-2.5 bg-slate-100 border-t border-slate-200 flex items-center gap-1.5 overflow-x-auto text-[11px]">
                  <span className="text-slate-500 font-medium whitespace-nowrap pl-1">
                    Try queries:
                  </span>
                  {SEARCH_PRESETS.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectPresetChip(p)}
                      className={`whitespace-nowrap px-2.5 py-1 rounded-full font-medium transition-all ${
                        searchQuery === p
                          ? 'bg-cyan-600 text-white font-bold shadow-sm'
                          : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: 3D BRAND VIDEO */}
          {activeVideoTab === '3d_brand' && (
            <div 
              onClick={handlePlayPause}
              className="relative w-full h-full flex items-center justify-center cursor-pointer group"
            >
              <video
                ref={videoRef}
                key="video_brand"
                src="/assets/aistudio/WhatsApp_Video_2026-10-19_at_17.04.05_1353c049.mp4"
                autoPlay
                loop
                playsInline
                muted={isMuted}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                className="w-full h-full max-h-[520px] object-contain"
              />

              {/* OVERLAY: Clean Branded Watermark with the new 3D Logo */}
              <div className="absolute top-4 right-4 pointer-events-none z-20 flex items-center gap-2 rounded-2xl border border-cyan-500/30 bg-slate-950/80 px-3.5 py-1.5 backdrop-blur-md shadow-xl animate-fade-in">
                <img
                  src="/logo.png"
                  alt="A3T Logo Watermark"
                  className="h-6 w-6 object-contain drop-shadow-[0_0_8px_rgba(0,210,255,0.6)]"
                />
                <span className="text-[11px] font-bold tracking-wider text-white uppercase font-sans">
                  A3T SOLUTIONS
                </span>
              </div>

              {/* Floating Minimal In-Video Control Pills (Bottom Right) */}
              <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 opacity-90 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={handleToggleMute}
                  className="flex items-center gap-1 rounded-xl border border-slate-700/80 bg-slate-950/80 px-2.5 py-1.5 text-xs text-slate-200 hover:text-cyan-400 backdrop-blur-md transition-all shadow-lg"
                  title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
                >
                  {isMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5 text-cyan-400" />}
                  <span className="text-[11px] font-medium">{isMuted ? 'Muted' : 'Sound ON'}</span>
                </button>

                <button
                  onClick={handleFullscreen}
                  className="rounded-xl border border-slate-700/80 bg-slate-950/80 p-2 text-slate-300 hover:text-white backdrop-blur-md transition-all shadow-lg"
                  title="Fullscreen"
                >
                  <Maximize2 className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Center Play/Pause Indicator on hover/pause */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none z-10">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/90 text-slate-950 shadow-2xl backdrop-blur-md">
                    <Play className="h-8 w-8 ml-1 fill-current" />
                  </div>
                </div>
              )}

              {/* Bottom Scrim & Tagline */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent p-5 text-left pointer-events-none pr-32">
                <div className="inline-flex items-center gap-2 rounded-lg bg-cyan-500/20 border border-cyan-500/40 px-2.5 py-0.5 text-[10px] font-bold text-cyan-300 uppercase tracking-widest mb-1.5">
                  Official 3D Production Motion
                </div>
                <h4 className="text-base sm:text-lg font-bold text-white">
                  A3T Solutions: You Want. We Build.
                </h4>
                <p className="text-xs text-slate-300">
                  Your Business. Your Website. Built Around Your Needs.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: CONCEPT TO REALITY VIDEO */}
          {activeVideoTab === 'concept_build' && (
            <div 
              onClick={handlePlayPause}
              className="relative w-full h-full flex items-center justify-center cursor-pointer group"
            >
              <video
                ref={videoRef}
                key="video_concept"
                src="/assets/aistudio/WhatsApp_Video_2026-10-19_at_16.57.35_d9e6be15.mp4"
                autoPlay
                loop
                playsInline
                muted={isMuted}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                className="w-full h-full max-h-[520px] object-contain"
              />

              {/* OVERLAY: Clean Branded Watermark with the new 3D Logo */}
              <div className="absolute top-4 right-4 pointer-events-none z-20 flex items-center gap-2 rounded-2xl border border-cyan-500/30 bg-slate-950/80 px-3.5 py-1.5 backdrop-blur-md shadow-xl animate-fade-in">
                <img
                  src="/logo.png"
                  alt="A3T Logo Watermark"
                  className="h-6 w-6 object-contain drop-shadow-[0_0_8px_rgba(0,210,255,0.6)]"
                />
                <span className="text-[11px] font-bold tracking-wider text-white uppercase font-sans">
                  A3T SOLUTIONS
                </span>
              </div>

              {/* Floating Minimal In-Video Control Pills (Bottom Right) */}
              <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 opacity-90 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={handleToggleMute}
                  className="flex items-center gap-1 rounded-xl border border-slate-700/80 bg-slate-950/80 px-2.5 py-1.5 text-xs text-slate-200 hover:text-cyan-400 backdrop-blur-md transition-all shadow-lg"
                  title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
                >
                  {isMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5 text-cyan-400" />}
                  <span className="text-[11px] font-medium">{isMuted ? 'Muted' : 'Sound ON'}</span>
                </button>

                <button
                  onClick={handleFullscreen}
                  className="rounded-xl border border-slate-700/80 bg-slate-950/80 p-2 text-slate-300 hover:text-white backdrop-blur-md transition-all shadow-lg"
                  title="Fullscreen"
                >
                  <Maximize2 className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Center Play/Pause Indicator on hover/pause */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none z-10">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/90 text-slate-950 shadow-2xl backdrop-blur-md">
                    <Play className="h-8 w-8 ml-1 fill-current" />
                  </div>
                </div>
              )}

              {/* Bottom Scrim & Tagline */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent p-5 text-left pointer-events-none pr-32">
                <div className="inline-flex items-center gap-2 rounded-lg bg-blue-500/20 border border-blue-500/40 px-2.5 py-0.5 text-[10px] font-bold text-blue-300 uppercase tracking-widest mb-1.5">
                  Concept Transformation
                </div>
                <h4 className="text-base sm:text-lg font-bold text-white">
                  Have an Idea? Let&apos;s Build It.
                </h4>
                <p className="text-xs text-slate-300">
                  From rough concept straight to live website and mobile experience.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
