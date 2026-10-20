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
    sm: { imgClass: 'h-9 w-9', titleClass: 'text-base', subClass: 'text-[9px]' },
    md: { imgClass: 'h-11 w-11', titleClass: 'text-lg', subClass: 'text-[10px]' },
    lg: { imgClass: 'h-16 w-16', titleClass: 'text-2xl', subClass: 'text-xs' },
    xl: { imgClass: 'h-24 w-24', titleClass: 'text-3xl sm:text-4xl', subClass: 'text-xs' },
  };

  const { imgClass, titleClass, subClass } = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Official 3D Glowing Monogram Icon */}
      <div className="relative shrink-0 transition-transform duration-300 hover:scale-105 group">
        <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-cyan-500/30 to-blue-600/30 blur-md opacity-75 group-hover:opacity-100 transition-opacity" />
        <img
          src="/logo.png"
          alt="A3T Solutions Official Logo"
          className={`relative ${imgClass} object-contain rounded-xl drop-shadow-[0_4px_12px_rgba(0,180,255,0.35)]`}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/assets/aistudio/image_eeedbc0a.png';
          }}
        />
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col tracking-tight text-left">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-black tracking-wider uppercase font-sans ${titleClass} ${
                lightText
                  ? 'bg-gradient-to-r from-white via-cyan-100 to-sky-300 bg-clip-text text-transparent drop-shadow-sm'
                  : 'text-slate-900'
              }`}
              style={{ fontFamily: "'Space Grotesk', 'Plus Jakarta Sans', sans-serif" }}
            >
              A3T SOLUTIONS
            </span>
          </div>
          <span
            className={`${subClass} uppercase font-semibold tracking-widest ${
              lightText ? 'text-cyan-400' : 'text-sky-600'
            } -mt-0.5`}
          >
            You Want. We Build.
          </span>
        </div>
      )}
    </div>
  );
};
