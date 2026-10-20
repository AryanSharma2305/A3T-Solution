import React from 'react';
import { Phone, MessageSquare, Instagram, Youtube, ArrowRight, Store, GraduationCap, Play, ShieldCheck, Zap, Users, Sparkles, Layers } from 'lucide-react';
import { useContact } from '../context/ContactContext';

interface HeroProps {
  onScrollToCarousel: () => void;
  onScrollToShops: () => void;
  onScrollToStudents: () => void;
  onScrollToVideo: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onScrollToCarousel,
  onScrollToShops,
  onScrollToStudents,
  onScrollToVideo,
}) => {
  const { contactInfo, getPhoneUrl, getWhatsAppUrl, getInstagramUrl, getYoutubeUrl } = useContact();

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background radial atmosphere in cyan/blue */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] bg-[radial-gradient(ellipse_at_top,rgba(0,210,255,0.12),rgba(15,23,42,0)_70%)] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Proposition and Actions */}
          <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
            {/* Domain-authentic unboxed editorial kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>A3T SOLUTIONS · DIGITAL SOFTWARE ENGINEERING</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-400 font-normal">Fast 3–7 Day Delivery</span>
            </div>

            {/* Main Headline */}
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-[1.12]"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              High-Velocity Software for{' '}
              <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
                Retail Businesses
              </span>{' '}
              &amp;{' '}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                Student Innovators
              </span>
              .
            </h1>

            {/* Value Proposition Prose */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Engineered by passionate technical founders and a dedicated development team. We deliver hands-on digital transformation: customized websites, high-conversion catalogs, and barcode billing apps for retail shops, along with full-stack academic capstone systems with complete source code, verified project reports, and viva guidance.
            </p>

            {/* Quick Contact Bar */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-3 sm:p-4 backdrop-blur-md">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center justify-between">
                <span>Direct Contact Channels</span>
                <span className="text-emerald-400 font-mono text-[11px] flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Available Now
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {/* Phone Call */}
                <a
                  href={getPhoneUrl()}
                  className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs font-semibold text-slate-200 hover:border-cyan-500/50 hover:text-cyan-400 transition-all group"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                    <Phone className="h-3.5 w-3.5" />
                  </div>
                  <div className="truncate text-left">
                    <div className="text-[10px] text-slate-500">Call Us</div>
                    <div className="font-mono truncate">{contactInfo.phone}</div>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href={getWhatsAppUrl("Hi A3T Solutions! I would like to consult on a web/app software build.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs font-semibold text-slate-200 hover:border-emerald-500/50 hover:text-emerald-400 transition-all group"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                    <MessageSquare className="h-3.5 w-3.5" />
                  </div>
                  <div className="truncate text-left">
                    <div className="text-[10px] text-slate-500">WhatsApp</div>
                    <div className="truncate font-semibold text-emerald-400">Chat Now</div>
                  </div>
                </a>

                {/* Instagram */}
                <a
                  href={getInstagramUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs font-semibold text-slate-200 hover:border-pink-500/50 hover:text-pink-400 transition-all group"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-pink-500/10 text-pink-400 group-hover:bg-pink-500 group-hover:text-slate-950 transition-colors">
                    <Instagram className="h-3.5 w-3.5" />
                  </div>
                  <div className="truncate text-left">
                    <div className="text-[10px] text-slate-500">Instagram</div>
                    <div className="truncate">@{contactInfo.instagram.replace(/^@/, '')}</div>
                  </div>
                </a>

                {/* YouTube */}
                <a
                  href={getYoutubeUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs font-semibold text-slate-200 hover:border-red-500/50 hover:text-red-400 transition-all group"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-500/10 text-red-500 group-hover:bg-red-500 group-hover:text-white transition-colors">
                    <Youtube className="h-3.5 w-3.5" />
                  </div>
                  <div className="truncate text-left">
                    <div className="text-[10px] text-slate-500">YouTube</div>
                    <div className="truncate">Channel</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onScrollToCarousel}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 px-5 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/20 hover:from-cyan-300 hover:to-blue-500 transition-all"
              >
                <Layers className="h-4 w-4" />
                <span>Explore Solutions Carousel</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={onScrollToShops}
                className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 hover:border-cyan-400/50 transition-all"
              >
                <Store className="h-4 w-4 text-cyan-400" />
                <span>Shop Solutions</span>
              </button>

              <button
                onClick={onScrollToVideo}
                className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm font-semibold text-slate-300 hover:text-cyan-400 hover:border-slate-700 transition-all"
              >
                <Play className="h-4 w-4 text-cyan-400 fill-current" />
                <span>Watch Brand Videos</span>
              </button>
            </div>

            {/* Trust Markers */}
            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-400 border-t border-slate-900">
              <div className="flex items-center gap-1.5">
                <Users className="h-4 w-4 text-cyan-400" />
                <span>Technical Leadership &amp; Core Engineers</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-cyan-400" />
                <span>Fast 3–7 Day Delivery</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-cyan-400" />
                <span>Direct Founder Consultation</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative glow */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-cyan-500/20 via-blue-500/20 to-sky-400/10 rounded-3xl blur-xl" />

              <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
                {/* Hero Team Photography */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                  <img
                    src="/images/hero_tech_team.jpg"
                    alt="A3T Solutions core development team collaborating on modern software"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/hero_tech_team_1791390846178.jpg';
                    }}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                  {/* Floating Tag */}
                  <div className="absolute top-3 right-3 rounded-lg bg-slate-950/80 border border-slate-800 px-2.5 py-1 text-[11px] font-semibold text-cyan-300 backdrop-blur-md">
                    Technical Founders &amp; Engineering Team
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-left">
                    <span className="text-[11px] font-medium text-cyan-400 uppercase tracking-wider">
                      Direct engineering from passionate technologists
                    </span>
                    <h3 className="text-sm font-bold text-white mt-0.5">
                      High-velocity digital engineering led by dedicated technical founders, delivering custom software with zero bloat and uncompromising speed.
                    </h3>
                  </div>
                </div>

                {/* Quick Interactive Highlights */}
                <div className="p-4 grid grid-cols-2 gap-3 border-t border-slate-800 bg-slate-950">
                  <div className="rounded-xl border border-slate-800/80 bg-slate-900/50 p-2.5 text-left">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                      <Store className="h-3.5 w-3.5 text-cyan-400" />
                      <span>For Shops</span>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-400 leading-snug">
                      Jewellery, Medical, Salons, Kirana catalogs &amp; billing apps.
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-800/80 bg-slate-900/50 p-2.5 text-left">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                      <GraduationCap className="h-3.5 w-3.5 text-blue-400" />
                      <span>For Students</span>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-400 leading-snug">
                      B.Tech, BCA, MCA projects with source code, report &amp; PPT.
                    </p>
                  </div>
                </div>

                {/* Bottom Teaser */}
                <div className="border-t border-slate-800 bg-slate-900/80 px-4 py-2.5 flex items-center justify-between">
                  <span className="text-xs text-slate-300 flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                    Watch our official 3D showcase video
                  </span>
                  <button
                    onClick={onScrollToVideo}
                    className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
                  >
                    <span>Play Video</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
