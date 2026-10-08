import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Sparkles, Search, CheckCircle2, Volume2, VolumeX, Maximize2 } from 'lucide-react';
import { A3TLogo } from './A3TLogo';

interface A3TVideoShowcaseProps {
  onGetQuoteClick?: () => void;
}

const SEARCH_PRESETS = [
  "Best tech solutions for Business Growth",
  "Jewellery showroom catalog & billing website",
  "College final year project with complete source code & report",
  "Medical pharmacy inventory & expiry alert app",
  "Salon appointment booking web portal",
];

export const A3TVideoShowcase: React.FC<A3TVideoShowcaseProps> = ({ onGetQuoteClick }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [activeQueryIndex, setActiveQueryIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [phase, setPhase] = useState<'typing' | 'loading' | 'revealed'>('typing');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  const currentQuery = SEARCH_PRESETS[activeQueryIndex];

  // Typing & Reveal Lifecycle
  useEffect(() => {
    if (!isPlaying) return;

    let charIndex = 0;
    setDisplayedText('');
    setPhase('typing');

    const typingInterval = setInterval(() => {
      if (charIndex <= currentQuery.length) {
        setDisplayedText(currentQuery.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        // Switch to loading spinner
        setPhase('loading');

        setTimeout(() => {
          setPhase('revealed');
          if (soundEnabled) {
            playChimeSound();
          }

          // After holding the reveal, transition to next query
          setTimeout(() => {
            setActiveQueryIndex((prev) => (prev + 1) % SEARCH_PRESETS.length);
          }, 3500);
        }, 1200);
      }
    }, 45);

    return () => clearInterval(typingInterval);
  }, [isPlaying, activeQueryIndex, soundEnabled, currentQuery]);

  const playChimeSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.4);
    } catch {
      // AudioContext might be restricted until user gesture
    }
  };

  const handleRestart = () => {
    setDisplayedText('');
    setPhase('typing');
    setIsPlaying(true);
  };

  const toggleFullscreen = () => {
    if (!playerContainerRef.current) return;
    if (!isFullscreen) {
      if (playerContainerRef.current.requestFullscreen) {
        playerContainerRef.current.requestFullscreen().catch(() => {});
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-4xl" ref={playerContainerRef}>
      {/* Decorative ambient gradient backdrop */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-amber-500/20 via-blue-500/10 to-amber-400/20 blur-xl opacity-75" />

      <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
        {/* Top Video Header Bar */}
        <div className="flex flex-wrap items-center justify-between border-b border-slate-800 bg-slate-950/80 px-4 py-3 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full bg-rose-500/80" />
              <div className="h-3 w-3 rounded-full bg-amber-500/80" />
              <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-xs font-semibold text-slate-300">
              A3T Solutions Promo · Business Search Video
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1 text-xs text-slate-300 hover:text-white transition-colors"
              title={soundEnabled ? 'Mute Audio' : 'Enable Audio'}
            >
              {soundEnabled ? <Volume2 className="h-3.5 w-3.5 text-amber-400" /> : <VolumeX className="h-3.5 w-3.5" />}
              <span className="hidden sm:inline">{soundEnabled ? 'Sound ON' : 'Sound OFF'}</span>
            </button>

            <button
              onClick={handleRestart}
              className="flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1 text-xs text-slate-300 hover:text-white transition-colors"
              title="Restart Video Simulation"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Replay</span>
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-1 rounded-lg bg-amber-500 px-3 py-1 text-xs font-semibold text-slate-950 hover:bg-amber-400 transition-colors"
            >
              {isPlaying ? <Pause className="h-3.5 w-3.5 fill-current" /> : <Play className="h-3.5 w-3.5 fill-current" />}
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </button>

            <button
              onClick={toggleFullscreen}
              className="rounded-lg border border-slate-800 bg-slate-900 p-1.5 text-slate-400 hover:text-white transition-colors"
              title="Fullscreen"
            >
              <Maximize2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Video Canvas Stage: Simulating the authentic smartphone Google Search animation */}
        <div className="relative flex flex-col items-center justify-center p-6 sm:p-10 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 min-h-[460px]">
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b10_1px,transparent_1px),linear-gradient(to_bottom,#1e293b10_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />

          {/* Smartphone Mockup matching uploaded video */}
          <div className="relative w-full max-w-[340px] sm:max-w-[380px] rounded-[38px] border-4 border-slate-800 bg-white p-3 shadow-2xl transition-all duration-300">
            {/* Screen Notch / Top Bar */}
            <div className="flex items-center justify-between px-4 pt-1 pb-3 text-slate-900">
              <div className="flex items-center gap-1.5 text-[11px] font-bold">
                <span>12:01</span>
                <span className="inline-block h-2 w-2 rounded-full bg-blue-600" />
              </div>
              <div className="h-4 w-20 rounded-full bg-slate-900/10" />
              <div className="flex items-center gap-1 text-[11px]">
                <div className="h-2.5 w-4 rounded-sm border border-slate-800 flex items-center p-0.5">
                  <div className="h-full w-2.5 bg-slate-800 rounded-2xs" />
                </div>
              </div>
            </div>

            {/* Simulated Google Search View */}
            <div className="flex flex-col items-center pt-2 pb-6 px-3 min-h-[400px]">
              {/* Google Wordmark */}
              <div className="mb-4 text-3xl font-bold tracking-tight">
                <span className="text-blue-500">G</span>
                <span className="text-red-500">o</span>
                <span className="text-amber-500">o</span>
                <span className="text-blue-500">g</span>
                <span className="text-green-500">l</span>
                <span className="text-red-500">e</span>
              </div>

              {/* Search Pill Input Bar */}
              <div className="relative mb-6 flex w-full items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
                <Search className="h-4 w-4 text-slate-400 shrink-0" />
                <div className="flex-1 text-xs text-slate-800 truncate font-medium">
                  {displayedText}
                  {phase === 'typing' && (
                    <span className="inline-block h-3.5 w-0.5 bg-blue-600 align-middle animate-pulse ml-0.5" />
                  )}
                </div>
                {phase === 'revealed' && (
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 animate-scale-in" />
                )}
              </div>

              {/* Main Display Container */}
              <div className="relative flex flex-1 w-full flex-col items-center justify-center rounded-2xl bg-slate-50 border border-slate-200/80 p-5 overflow-hidden transition-all duration-500">
                {phase === 'typing' && (
                  <div className="flex flex-col items-center justify-center text-center text-slate-400 py-10">
                    <p className="text-xs font-medium">Searching for the best solution...</p>
                  </div>
                )}

                {phase === 'loading' && (
                  <div className="flex flex-col items-center justify-center py-10 animate-fade-in">
                    {/* Multi-dot Spinner matching uploaded video */}
                    <div className="h-10 w-10 rounded-full border-3 border-slate-200 border-t-amber-500 border-r-blue-600 animate-spin" />
                    <span className="mt-4 text-xs font-semibold text-slate-600">Matching top providers...</span>
                  </div>
                )}

                {phase === 'revealed' && (
                  <div className="flex flex-col items-center justify-center text-center animate-fade-in w-full py-4">
                    {/* The Reveal of A3T Solutions */}
                    <div className="relative mb-3 flex items-center justify-center">
                      <div className="absolute -inset-4 bg-amber-400/20 rounded-full blur-xl" />
                      <A3TLogo size="lg" lightText={false} />
                    </div>

                    <div className="mt-2 rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-1 text-[11px] font-semibold text-emerald-700">
                      #1 Recommended Tech Partner
                    </div>

                    <p className="mt-3 text-xs text-slate-600 leading-relaxed max-w-[260px]">
                      Websites, Mobile Apps, and Academic Projects tailored by 4 dedicated engineers.
                    </p>

                    <button
                      onClick={onGetQuoteClick}
                      className="mt-4 w-full rounded-xl bg-slate-900 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-slate-800 transition-colors"
                    >
                      Connect with A3T Solutions →
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Phone Home Bar */}
            <div className="flex justify-center pb-2">
              <div className="h-1 w-28 rounded-full bg-slate-300" />
            </div>
          </div>
        </div>

        {/* Bottom Interactive Query Selector Pills */}
        <div className="border-t border-slate-800 bg-slate-950/70 p-4">
          <div className="flex items-center gap-2 mb-2 text-xs font-medium text-slate-400">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>Try searching specific shop or student queries:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {SEARCH_PRESETS.map((query, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveQueryIndex(index);
                  setDisplayedText('');
                  setPhase('typing');
                  setIsPlaying(true);
                }}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-all text-left truncate max-w-full sm:max-w-[260px] ${
                  activeQueryIndex === index
                    ? 'bg-amber-500/10 border-amber-500 text-amber-300 font-semibold shadow-sm'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {query}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
