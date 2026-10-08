import React from 'react';

interface A3TLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  lightText?: boolean;
}

export const A3TLogo: React.FC<A3TLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  lightText = true,
}) => {
  const sizeMap = {
    sm: { icon: 34, textSize: 'text-sm' },
    md: { icon: 46, textSize: 'text-lg' },
    lg: { icon: 68, textSize: 'text-2xl' },
    xl: { icon: 110, textSize: 'text-4xl' },
  };

  const { icon } = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Precision Geometric SVG Logo matching A3T SOLUTIONS Emblem */}
      <svg
        width={icon}
        height={icon * 0.9}
        viewBox="0 0 200 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105"
        aria-label="A3T Solutions Emblem"
      >
        <defs>
          {/* Metallic Gold Gradients */}
          <linearGradient id="goldBevel1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF3B0" />
            <stop offset="30%" stopColor="#E5B242" />
            <stop offset="65%" stopColor="#BA8621" />
            <stop offset="100%" stopColor="#8A5A0A" />
          </linearGradient>

          <linearGradient id="goldBevel2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFE082" />
            <stop offset="45%" stopColor="#D4A017" />
            <stop offset="85%" stopColor="#996515" />
            <stop offset="100%" stopColor="#5E3802" />
          </linearGradient>

          {/* Deep Navy Metallic Facet Gradients */}
          <linearGradient id="navyFacet1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1E3354" />
            <stop offset="50%" stopColor="#102038" />
            <stop offset="100%" stopColor="#08101E" />
          </linearGradient>

          <linearGradient id="navyFacet2" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#25426C" />
            <stop offset="60%" stopColor="#142642" />
            <stop offset="100%" stopColor="#0B1526" />
          </linearGradient>

          {/* Central T Gradients */}
          <linearGradient id="tGoldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#BA8621" />
            <stop offset="35%" stopColor="#FFE898" />
            <stop offset="70%" stopColor="#E5B242" />
            <stop offset="100%" stopColor="#8A5A0A" />
          </linearGradient>

          <filter id="logoShadow" x="-10%" y="-10%" width="120%" height="120%" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.45" />
          </filter>
        </defs>

        <g filter="url(#logoShadow)">
          {/* Top Triangle - Summit Peak */}
          {/* Outer Gold Border */}
          <polygon
            points="100,10 134,70 66,70"
            fill="url(#goldBevel1)"
            stroke="url(#goldBevel2)"
            strokeWidth="3.5"
            strokeLinejoin="miter"
          />
          {/* Inner Navy Core */}
          <polygon
            points="100,24 125,66 75,66"
            fill="url(#navyFacet1)"
          />
          {/* Inner Floating Gold Triangle */}
          <polygon
            points="100,38 114,60 86,60"
            fill="url(#goldBevel2)"
          />
          <polygon
            points="100,43 110,58 90,58"
            fill="url(#navyFacet2)"
          />

          {/* Left Wing Triangle (Letter A representation) */}
          <polygon
            points="65,48 100,106 14,106"
            fill="url(#goldBevel1)"
            stroke="url(#goldBevel2)"
            strokeWidth="3.5"
            strokeLinejoin="miter"
          />
          <polygon
            points="65,60 90,102 32,102"
            fill="url(#navyFacet1)"
          />

          {/* Right Wing Triangle (Letter A symmetry) */}
          <polygon
            points="135,48 186,106 100,106"
            fill="url(#goldBevel2)"
            stroke="url(#goldBevel1)"
            strokeWidth="3.5"
            strokeLinejoin="miter"
          />
          <polygon
            points="135,60 168,102 110,102"
            fill="url(#navyFacet2)"
          />

          {/* Central Grounding Base - Incorporating the prominent 'T' Structure */}
          {/* Lower Outer Gold Baseline Bar */}
          <polygon
            points="22,96 178,96 172,112 28,112"
            fill="url(#goldBevel1)"
          />
          <polygon
            points="26,98 174,98 170,110 30,110"
            fill="url(#navyFacet1)"
          />

          {/* The Distinctive Center 'T' Crossbar and Vertical Trunk */}
          {/* T Crossbar */}
          <polygon
            points="58,90 142,90 138,104 62,104"
            fill="url(#tGoldGrad)"
            stroke="url(#goldBevel1)"
            strokeWidth="1.5"
          />
          <polygon
            points="63,92 137,92 135,102 65,102"
            fill="url(#navyFacet2)"
          />

          {/* T Vertical Trunk */}
          <polygon
            points="90,102 110,102 110,140 90,140"
            fill="url(#tGoldGrad)"
            stroke="url(#goldBevel2)"
            strokeWidth="1.5"
          />
          <polygon
            points="93,103 107,103 107,138 93,138"
            fill="url(#navyFacet1)"
          />

          {/* Left & Right Base Legs Framing */}
          <polygon
            points="28,112 85,112 85,126 40,126"
            fill="url(#goldBevel2)"
          />
          <polygon
            points="33,114 83,114 83,124 44,124"
            fill="url(#navyFacet1)"
          />

          <polygon
            points="115,112 172,112 160,126 115,126"
            fill="url(#goldBevel1)"
          />
          <polygon
            points="117,114 167,114 156,124 117,124"
            fill="url(#navyFacet2)"
          />

          {/* Subtle Top Highlights on Vertices */}
          <circle cx="100" cy="10" r="2.5" fill="#FFFBE6" />
          <circle cx="65" cy="48" r="2" fill="#FFE27D" />
          <circle cx="135" cy="48" r="2" fill="#FFE27D" />
        </g>
      </svg>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col tracking-tight">
          <span
            className={`font-extrabold tracking-wider uppercase font-sans ${
              size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl' : size === 'xl' ? 'text-4xl' : 'text-xl'
            } ${
              lightText
                ? 'bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 bg-clip-text text-transparent drop-shadow-sm'
                : 'text-slate-900'
            }`}
            style={{ fontFamily: "'Space Grotesk', 'Plus Jakarta Sans', sans-serif" }}
          >
            A3T SOLUTIONS
          </span>
          <span className="text-[10px] uppercase font-semibold tracking-widest text-amber-400/90 -mt-0.5">
            Web · Apps · Academic Tech
          </span>
        </div>
      )}
    </div>
  );
};
