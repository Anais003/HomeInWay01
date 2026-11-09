import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  customTitle?: string;
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  customTitle,
  showSubtitle = true,
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-20 h-20',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  return (
    <div className={`flex items-center gap-2.5 font-sans ${className}`}>
      {/* Exact Logo based on "Icono HomeInWay_ crecimiento y hogar.png" */}
      <div className={`relative flex items-center justify-center shrink-0 ${iconSizes[size]}`}>
        <svg
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-xs"
        >
          {/* Blue House Outline & Chimney */}
          <path
            d="M60 16L22 48H32V88H88V48H98L60 16Z"
            fill="none"
            stroke="#2C70B8"
            strokeWidth="8"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          {/* Chimney */}
          <path
            d="M74 34V20H84V42"
            stroke="#2C70B8"
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* 4 Window panes */}
          <rect x="52" y="38" width="6.5" height="6.5" rx="1.5" fill="#5B9BD5" />
          <rect x="61.5" y="38" width="6.5" height="6.5" rx="1.5" fill="#5B9BD5" />
          <rect x="52" y="47.5" width="6.5" height="6.5" rx="1.5" fill="#5B9BD5" />
          <rect x="61.5" y="47.5" width="6.5" height="6.5" rx="1.5" fill="#5B9BD5" />

          {/* Growing financial chart bars inside house: Red, Yellow, Green */}
          {/* Bar 1: Red */}
          <rect x="42" y="65" width="10" height="23" rx="3" fill="#EF3942" />
          {/* Bar 2: Yellow */}
          <rect x="55" y="55" width="10" height="33" rx="3" fill="#FDD700" />
          {/* Bar 3: Green */}
          <rect x="68" y="44" width="10" height="44" rx="3" fill="#0C9647" />

          {/* Red curved arrow wrapping around the base and pointing up */}
          <path
            d="M34 76C34 94 62 98 84 80C94 72 98 62 102 52"
            stroke="#EF3942"
            strokeWidth="9"
            strokeLinecap="round"
          />
          {/* Arrow Head */}
          <path
            d="M88 44L105 48L106 66Z"
            fill="#EF3942"
          />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          {customTitle ? (
            <div className="flex items-center tracking-tight font-extrabold leading-none">
              <span className={`text-[#2C70B8] ${textSizes[size]}`}>{customTitle}</span>
            </div>
          ) : (
            <div className="flex items-center tracking-tight font-extrabold leading-none">
              <span className={`text-[#2C70B8] ${textSizes[size]}`}>Home</span>
              <span className={`text-[#0C9647] ${textSizes[size]}`}>In</span>
              <span className={`text-[#EF3942] ${textSizes[size]}`}>Way</span>
            </div>
          )}
          {showSubtitle && (
            <span className="text-[10px] font-semibold text-slate-500 tracking-tight mt-0.5">
              Tu camino a un hogar, juntos.
            </span>
          )}
        </div>
      )}
    </div>
  );
};
