import React from 'react';

interface A3TLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  showTagline?: boolean;
}

export const A3TLogo: React.FC<A3TLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  showTagline = true,
}) => {
  const sizeMap = {
    sm: { height: 36, emblemWidth: 44, textSize: 'text-lg', subSize: 'text-[9px]', tagSize: 'text-[7.5px]' },
    md: { height: 48, emblemWidth: 58, textSize: 'text-2xl', subSize: 'text-[11px]', tagSize: 'text-[9px]' },
    lg: { height: 64, emblemWidth: 78, textSize: 'text-3xl', subSize: 'text-xs', tagSize: 'text-[10px]' },
    xl: { height: 96, emblemWidth: 118, textSize: 'text-5xl', subSize: 'text-base', tagSize: 'text-xs' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Precision Vector Emblem: Cyber Neon Cyan Folded "A" with Speed Pixel Particles */}
      <svg
        width={currentSize.emblemWidth}
        height={currentSize.height}
        viewBox="0 0 160 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105"
        aria-label="A3T Solutions Electric Emblem"
      >
        <defs>
          {/* Electric Cyan Neon Gradients */}
          <linearGradient id="cyanRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#70F3FF" />
            <stop offset="35%" stopColor="#00D2FF" />
            <stop offset="70%" stopColor="#0072FF" />
            <stop offset="100%" stopColor="#0048DB" />
          </linearGradient>

          <linearGradient id="cyanRibbonBack" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00E5FF" />
            <stop offset="50%" stopColor="#0080FF" />
            <stop offset="100%" stopColor="#0035A8" />
          </linearGradient>

          <linearGradient id="pixelGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00F7FF" />
            <stop offset="100%" stopColor="#0088FF" />
          </linearGradient>

          <linearGradient id="highlightGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#00F0FF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0066FF" stopOpacity="0" />
          </linearGradient>

          {/* Glow Filters */}
          <filter id="neonBlur" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="subtleGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient Neon Backlight */}
        <ellipse cx="90" cy="65" rx="50" ry="40" fill="#00C2FF" opacity="0.18" filter="url(#neonBlur)" />

        {/* --- Speed Pixel Particle Trail (Left side of "A") --- */}
        <g fill="url(#pixelGlow)" opacity="0.95">
          {/* Top pixel row */}
          <rect x="5" y="52" width="14" height="14" rx="2" opacity="0.6" />
          <rect x="25" y="50" width="16" height="16" rx="2.5" opacity="0.85" />
          <rect x="47" y="47" width="18" height="18" rx="3" opacity="0.95" />

          {/* Middle pixel row */}
          <rect x="18" y="72" width="13" height="13" rx="2" opacity="0.7" />
          <rect x="36" y="70" width="16" height="16" rx="2.5" opacity="0.9" />
          <rect x="58" y="68" width="17" height="17" rx="3" fill="#FFFFFF" opacity="0.9" />

          {/* Bottom pixel row */}
          <rect x="28" y="92" width="14" height="14" rx="2" opacity="0.75" />
          <rect x="47" y="90" width="16" height="16" rx="2.5" opacity="0.9" />

          {/* Speed blur streaks */}
          <line x1="2" y1="59" x2="20" y2="59" stroke="#00D2FF" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
          <line x1="12" y1="78" x2="32" y2="78" stroke="#00F0FF" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
          <line x1="20" y1="99" x2="44" y2="99" stroke="#00A3FF" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
        </g>

        {/* --- The Folded 3D Neon "A" Ribbon --- */}
        <g filter="url(#subtleGlow)">
          {/* Left Main Pillar of "A" (Connecting to pixel trail) */}
          <path
            d="M 68 115 L 94 22 C 96 16 102 12 108 12 C 114 12 120 16 123 22 L 148 95 C 152 106 144 116 132 116 C 124 116 118 111 115 104 L 108 82 L 86 82 L 80 106 C 78 112 73 116 68 115 Z"
            fill="url(#cyanRibbon)"
          />

          {/* Right Slope Ribbon Overlap (Giving the smooth 3D Folded Loop) */}
          <path
            d="M 104 12 C 114 12 122 17 126 26 L 152 98 C 155 106 149 116 138 116 C 130 116 124 111 121 103 L 102 46 C 99 37 92 31 83 31 L 70 31 L 88 16 C 93 13 98 12 104 12 Z"
            fill="url(#cyanRibbonBack)"
          />

          {/* Crisp Specular Light Flare on the Apex Arch */}
          <path
            d="M 98 15 C 104 13 112 15 116 20 C 120 25 120 32 118 36 L 110 54 C 109 46 106 38 100 32 C 94 26 86 21 78 19 L 98 15 Z"
            fill="url(#highlightGlow)"
          />

          {/* Bright Lens Light Core at the fold */}
          <circle cx="106" cy="18" r="3.5" fill="#FFFFFF" />
          <line x1="75" y1="18" x2="137" y2="18" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.6" strokeLinecap="round" />
        </g>
      </svg>

      {/* Brand Typography & Tagline matching new logo */}
      {showText && (
        <div className="flex flex-col text-left justify-center">
          {/* Top Line: A3T in metallic cyber silver-cyan */}
          <div className="flex items-baseline gap-1 leading-none">
            <span
              className={`font-black tracking-tight uppercase ${currentSize.textSize} bg-gradient-to-r from-white via-slate-100 to-cyan-200 bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(0,210,255,0.35)]`}
              style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", letterSpacing: '0.02em' }}
            >
              A3T
            </span>
          </div>

          {/* Middle Line: SOLUTIONS in spaced modern sans */}
          <span
            className={`font-bold tracking-[0.28em] uppercase text-slate-100 ${currentSize.subSize} -mt-0.5`}
            style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
          >
            SOLUTIONS
          </span>

          {/* Tagline: YOU WANT WE BUILD */}
          {showTagline && (
            <span
              className={`font-bold uppercase tracking-[0.24em] text-cyan-400 ${currentSize.tagSize} mt-0.5 drop-shadow-[0_0_8px_rgba(0,210,255,0.7)]`}
              style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
            >
              YOU WANT WE BUILD
            </span>
          )}
        </div>
      )}
    </div>
  );
};
