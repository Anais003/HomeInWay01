import React from 'react';

// 1. House Hero with floating pin (Colors aligned with Bci & Logo)
export const IllustrationHouse: React.FC<{
  amount?: string;
  subtitle?: string;
  className?: string;
}> = ({ amount = '$ 600.000', subtitle = '30% de tus gastos', className = '' }) => {
  return (
    <div className={`relative w-full h-48 bg-[#F0F6FC] rounded-3xl overflow-hidden flex items-center justify-center p-3 select-none border border-[#D0E2F3] shadow-xs ${className}`}>
      {/* Background sun aura in Bci Yellow */}
      <div className="absolute top-3 right-6 w-24 h-24 rounded-full bg-[#FDD700]/30 blur-xl pointer-events-none" />
      <div className="absolute top-6 left-8 w-16 h-8 rounded-full bg-white/70 blur-xs" />

      {/* SVG Scenery: House, trees, garden, path */}
      <svg viewBox="0 0 340 180" className="w-full h-full max-h-44" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Soft ground hill */}
        <ellipse cx="170" cy="180" rx="200" ry="50" fill="#E1ECF7" />

        {/* Trees Left (Verde Bci #0C9647) */}
        <ellipse cx="60" cy="120" rx="28" ry="36" fill="#0C9647" />
        <ellipse cx="78" cy="130" rx="22" ry="28" fill="#14B157" />
        <rect x="58" y="140" width="6" height="24" rx="3" fill="#086A32" />

        {/* Trees Right (Verde Bci #0C9647) */}
        <ellipse cx="270" cy="120" rx="30" ry="38" fill="#0C9647" />
        <ellipse cx="250" cy="132" rx="24" ry="30" fill="#14B157" />
        <rect x="268" y="140" width="6" height="24" rx="3" fill="#086A32" />

        {/* House Shadow */}
        <ellipse cx="165" cy="158" rx="70" ry="12" fill="#000000" fillOpacity="0.06" />

        {/* Walls */}
        <rect x="110" y="85" width="110" height="70" rx="4" fill="#FFFFFF" stroke="#D0E2F3" strokeWidth="2" />
        <polygon points="110,85 165,40 220,85" fill="#FFFFFF" />

        {/* Roof (Azul Bci #2C70B8) */}
        <polygon points="98,87 165,34 232,87 222,91 165,45 108,91" fill="#2C70B8" />

        {/* Chimney (Azul Bci #2C70B8) */}
        <rect x="195" y="44" width="16" height="26" rx="2" fill="#20558D" />

        {/* Windows (Soft blue panes like logo) */}
        <rect x="124" y="96" width="22" height="26" rx="3" fill="#EAF3FA" stroke="#2C70B8" strokeWidth="2" />
        <line x1="135" y1="96" x2="135" y2="122" stroke="#2C70B8" strokeWidth="1.5" />
        <line x1="124" y1="109" x2="146" y2="109" stroke="#2C70B8" strokeWidth="1.5" />

        <rect x="184" y="96" width="22" height="26" rx="3" fill="#EAF3FA" stroke="#2C70B8" strokeWidth="2" />
        <line x1="195" y1="96" x2="195" y2="122" stroke="#2C70B8" strokeWidth="1.5" />
        <line x1="184" y1="109" x2="206" y2="109" stroke="#2C70B8" strokeWidth="1.5" />

        {/* Door (Rojo Bci #EF3942) */}
        <rect x="153" y="112" width="24" height="43" rx="3" fill="#EF3942" />
        <circle cx="171" cy="134" r="2.5" fill="#FDD700" />

        {/* Garden shrubs (Verde Bci) */}
        <circle cx="102" cy="154" r="14" fill="#0C9647" />
        <circle cx="228" cy="154" r="14" fill="#0C9647" />
        <circle cx="118" cy="157" r="10" fill="#38C072" />
        <circle cx="212" cy="157" r="10" fill="#38C072" />

        {/* Pointer Line to Pin */}
        <path d="M190 70 L 230 46" stroke="#EF3942" strokeWidth="2" strokeDasharray="3 3" />
      </svg>

      {/* Floating Info Pin (High contrast dark slate badge for crisp legibility) */}
      <div className="absolute top-3.5 right-3.5 bg-slate-900/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-slate-700/80 flex items-center gap-2 z-10">
        <span className="w-2.5 h-2.5 rounded-full bg-[#EF3942] animate-pulse shrink-0" />
        <div className="text-left">
          <p className="text-xs sm:text-sm font-black font-mono text-white leading-tight">
            {amount}
          </p>
          <p className="text-[10px] text-slate-300 font-medium leading-none mt-0.5">
            total vivienda <span className="text-slate-400">· {subtitle}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

// 2. Piggy Bank Hero with floating pin (Verde Bci & Amarillo Bci)
export const IllustrationPiggyBank: React.FC<{
  amount?: string;
  subtitle?: string;
  className?: string;
}> = ({ amount = '$ 150.000', subtitle = '15% de tus ingresos', className = '' }) => {
  return (
    <div className={`relative w-full h-48 bg-[#EBF6EE] rounded-3xl overflow-hidden flex items-center justify-center p-3 select-none border border-[#C5E8CE] shadow-xs ${className}`}>
      {/* Aura en Amarillo Bci */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-[#FDD700]/30 blur-xl pointer-events-none" />

      <svg viewBox="0 0 340 180" className="w-full h-full max-h-44" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Soft shadow */}
        <ellipse cx="170" cy="156" rx="60" ry="10" fill="#000000" fillOpacity="0.06" />

        {/* Legs (Verde Bci #0C9647) */}
        <rect x="135" y="132" width="16" height="24" rx="7" fill="#086A32" />
        <rect x="180" y="132" width="16" height="24" rx="7" fill="#086A32" />
        <rect x="145" y="136" width="16" height="20" rx="7" fill="#0C9647" />
        <rect x="190" y="136" width="16" height="20" rx="7" fill="#0C9647" />

        {/* Main Body (Verde Bci #0C9647) */}
        <ellipse cx="170" cy="112" rx="55" ry="44" fill="#0C9647" />
        <path d="M125 120 C135 150 205 150 215 120 Z" fill="#086A32" fillOpacity="0.3" />

        {/* Snout */}
        <ellipse cx="120" cy="112" rx="14" ry="18" fill="#14B157" />
        <ellipse cx="118" cy="108" rx="2.5" ry="4" fill="#054520" />
        <ellipse cx="118" cy="116" rx="2.5" ry="4" fill="#054520" />

        {/* Eye */}
        <circle cx="140" cy="98" r="4" fill="#FFFFFF" />
        <circle cx="139.5" cy="98" r="2" fill="#054520" />

        {/* Ear */}
        <polygon points="152,78 162,94 144,92" fill="#14B157" />

        {/* Curly Tail */}
        <path d="M224 108 C232 104 234 116 228 116 C236 118 238 126 230 128" stroke="#14B157" strokeWidth="4" strokeLinecap="round" fill="none" />

        {/* Coin Slot */}
        <rect x="166" y="70" width="16" height="4" rx="2" fill="#054520" />

        {/* Hovering Gold Coin in Amarillo Bci (#FDD700) */}
        <circle cx="174" cy="52" r="16" fill="#FDD700" stroke="#E5C200" strokeWidth="2.5" />
        <circle cx="174" cy="52" r="12" fill="#FFF38A" />
        <text x="174" y="57" textAnchor="middle" fill="#8B7500" fontWeight="bold" fontSize="14" fontFamily="sans-serif">$</text>

        {/* Pointer Line */}
        <path d="M190 52 L 230 38" stroke="#0C9647" strokeWidth="2" strokeDasharray="3 3" />
      </svg>

      {/* Floating Info Pin (High contrast dark slate badge for crisp legibility) */}
      <div className="absolute top-3.5 right-3.5 bg-slate-900/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-slate-700/80 flex items-center gap-2 z-10">
        <span className="w-2.5 h-2.5 rounded-full bg-[#0C9647] animate-pulse shrink-0" />
        <div className="text-left">
          <p className="text-xs sm:text-sm font-black font-mono text-white leading-tight">
            {amount}
          </p>
          <p className="text-[10px] text-slate-300 font-medium leading-none mt-0.5">
            ahorrado este mes <span className="text-slate-400">· {subtitle}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

// 3. Baby Bottle Hero (Colors aligned with Bci & Logo)
export const IllustrationBabyBottle: React.FC<{
  className?: string;
  items?: { label: string; amount: string; color: string }[];
}> = ({
  className = '',
  items = [
    { label: 'Otros', amount: '$ 20.000', color: '#64748B' },
    { label: 'Salud', amount: '$ 50.000', color: '#EF3942' },
    { label: 'Alimentación', amount: '$ 80.000', color: '#FDD700' },
    { label: 'Pañales y aseo', amount: '$ 120.000', color: '#2C70B8' },
  ],
}) => {
  return (
    <div className={`relative w-full h-52 bg-[#FAF7F2] rounded-3xl overflow-hidden flex items-center justify-between px-6 py-3 select-none border border-[#EDE5D8] shadow-xs ${className}`}>
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-20 -translate-y-1/2 w-28 h-28 rounded-full bg-[#2C70B8]/15 blur-xl pointer-events-none" />

      {/* Left Bottle Drawing */}
      <div className="w-32 h-full flex items-center justify-center shrink-0">
        <svg viewBox="0 0 120 180" className="w-full h-full max-h-44" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Nipple (Teat) in warm tone */}
          <path d="M48 20 C48 10 72 10 72 20 C72 26 80 32 80 36 L40 36 C40 32 48 26 48 20 Z" fill="#F6A896" />

          {/* Ring Cap in Azul Bci */}
          <rect x="36" y="36" width="48" height="12" rx="4" fill="#2C70B8" stroke="#20558D" strokeWidth="2" />

          {/* Bottle Body Container */}
          <path
            d="M38 48 L82 48 C88 48 92 56 92 64 L92 144 C92 154 84 162 74 162 L46 162 C36 162 28 154 28 144 L28 64 C28 56 32 48 38 48 Z"
            fill="#FFFFFF"
            stroke="#94A3B8"
            strokeWidth="3"
          />

          {/* Layer 4: Pañales y aseo (Azul Bci #2C70B8) */}
          <path d="M30 126 L90 126 L90 144 C90 153 83 160 74 160 L46 160 C37 160 30 153 30 144 Z" fill="#2C70B8" fillOpacity="0.75" />

          {/* Layer 3: Alimentación (Amarillo Bci #FDD700) */}
          <rect x="30" y="98" width="60" height="28" fill="#FDD700" fillOpacity="0.8" />

          {/* Layer 2: Salud (Rojo Bci #EF3942) */}
          <rect x="30" y="74" width="60" height="24" fill="#EF3942" fillOpacity="0.75" />

          {/* Layer 1: Otros (Gris neutro) */}
          <rect x="30" y="54" width="60" height="20" fill="#E2E8F0" fillOpacity="0.8" />

          {/* Graduation lines */}
          <line x1="36" y1="64" x2="48" y2="64" stroke="#94A3B8" strokeWidth="2" />
          <line x1="36" y1="86" x2="52" y2="86" stroke="#94A3B8" strokeWidth="2" />
          <line x1="36" y1="112" x2="48" y2="112" stroke="#94A3B8" strokeWidth="2" />
          <line x1="36" y1="138" x2="52" y2="138" stroke="#94A3B8" strokeWidth="2" />

          {/* Glass reflection shine */}
          <path d="M34 60 L34 146" stroke="white" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.8" />
        </svg>
      </div>

      {/* Right Itemized Callout Pins */}
      <div className="flex-1 flex flex-col justify-around h-full py-2 pl-4">
        {items.map((it, idx) => (
          <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-slate-100 last:border-none">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: it.color }} />
              <span className="text-slate-700 font-semibold text-xs">{it.label}</span>
            </div>
            <span className="font-mono font-bold text-slate-900 text-xs">{it.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// 4. Robot Assistant Mascot SVG (Azul Bci, Verde Bci, Amarillo Bci)
export const IllustrationRobotMascot: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string }> = ({
  size = 'md',
  className = '',
}) => {
  const dims = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  };

  return (
    <div className={`relative flex items-center justify-center shrink-0 ${dims[size]} ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Antennas */}
        <rect x="47" y="10" width="6" height="12" rx="3" fill="#64748B" />
        <circle cx="50" cy="10" r="6" fill="#0C9647" />

        {/* Head */}
        <rect x="22" y="20" width="56" height="46" rx="20" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="3" />
        {/* Earphones in Azul Bci */}
        <rect x="15" y="34" width="8" height="18" rx="4" fill="#2C70B8" />
        <rect x="77" y="34" width="8" height="18" rx="4" fill="#2C70B8" />

        {/* Screen Face */}
        <rect x="29" y="27" width="42" height="32" rx="12" fill="#1E293B" />

        {/* Smiling Eyes (Glowing Verde Bci) */}
        <path d="M37 42 C37 37 43 37 43 42" stroke="#0C9647" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M57 42 C57 37 63 37 63 42" stroke="#0C9647" strokeWidth="3.5" strokeLinecap="round" />

        {/* Smile mouth */}
        <path d="M46 50 C48 53 52 53 54 50" stroke="#0C9647" strokeWidth="2.5" strokeLinecap="round" />

        {/* Cheek blushes (Rojo Bci) */}
        <circle cx="34" cy="48" r="2.5" fill="#EF3942" fillOpacity="0.4" />
        <circle cx="66" cy="48" r="2.5" fill="#EF3942" fillOpacity="0.4" />

        {/* Body & Waving Hand */}
        <rect x="34" y="68" width="32" height="24" rx="10" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="3" />
        {/* Blue Belly badge (Azul Bci) */}
        <rect x="42" y="74" width="16" height="10" rx="4" fill="#2C70B8" />

        {/* Waving Right Hand */}
        <path d="M68 70 C76 64 82 58 84 52" stroke="#64748B" strokeWidth="4" strokeLinecap="round" />
        <circle cx="84" cy="52" r="5" fill="#FFFFFF" stroke="#64748B" strokeWidth="2" />
      </svg>
    </div>
  );
};

// 5. Apartment Building Drawing (Azul Bci y Verde Bci)
export const IllustrationApartment: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`w-full h-32 bg-[#F0F6FC] rounded-2xl flex items-center justify-center p-2 relative overflow-hidden border border-[#D0E2F3] ${className}`}>
      <svg viewBox="0 0 200 120" className="w-full h-full max-h-28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="100" cy="115" rx="80" ry="8" fill="#000000" fillOpacity="0.06" />

        {/* Trees in Verde Bci */}
        <circle cx="45" cy="85" r="16" fill="#0C9647" />
        <rect x="43" y="95" width="4" height="20" fill="#086A32" />
        <circle cx="155" cy="85" r="16" fill="#0C9647" />
        <rect x="153" y="95" width="4" height="20" fill="#086A32" />

        {/* Building in Azul Bci */}
        <rect x="70" y="20" width="60" height="95" rx="4" fill="#FFFFFF" stroke="#2C70B8" strokeWidth="2.5" />
        {/* Balconies & Windows */}
        {[30, 50, 70, 90].map((y) => (
          <g key={y}>
            <rect x="76" y={y} width="18" height="12" rx="2" fill="#EAF3FA" stroke="#2C70B8" strokeWidth="1" />
            <rect x="106" y={y} width="18" height="12" rx="2" fill="#EAF3FA" stroke="#2C70B8" strokeWidth="1" />
            <line x1="74" y1={y + 13} x2="96" y2={y + 13} stroke="#2C70B8" strokeWidth="2" />
            <line x1="104" y1={y + 13} x2="126" y2={y + 13} stroke="#2C70B8" strokeWidth="2" />
          </g>
        ))}
      </svg>
    </div>
  );
};
