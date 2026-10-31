/** Default mascot artwork for <Volt>. Waving is driven by the parent's `data-waving` attribute. */
export function VoltRobot() {
  return (
    <svg viewBox="0 0 120 140" className="volt-hop h-22 w-19 sm:h-28 sm:w-24 drop-shadow-[0_6px_14px_rgba(255,63,180,0.45)]" aria-hidden>
      <defs>
        <linearGradient id="volt-chrome" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset=".35" stopColor="#c3c9da" />
          <stop offset=".5" stopColor="#6b7290" />
          <stop offset=".55" stopColor="#eef0f7" />
          <stop offset="1" stopColor="#9aa1b8" />
        </linearGradient>
        <linearGradient id="volt-visor" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2a0f4f" />
          <stop offset="1" stopColor="#0b0420" />
        </linearGradient>
        <linearGradient id="volt-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff3fb4" />
          <stop offset=".5" stopColor="#7a4dff" />
          <stop offset="1" stopColor="#2fd8ff" />
        </linearGradient>
        <filter id="volt-neon" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Antenna */}
      <line x1="60" y1="22" x2="60" y2="8" stroke="#160f2b" strokeWidth="3" />
      <circle cx="60" cy="7" r="6" fill="#ff3fb4" filter="url(#volt-neon)" className="volt-glow" />

      {/* Arms (right one waves while talking) */}
      <path d="M22 92 Q 8 100 12 114" fill="none" stroke="#160f2b" strokeWidth="9" strokeLinecap="round" />
      <path d="M22 92 Q 8 100 12 114" fill="none" stroke="url(#volt-chrome)" strokeWidth="5" strokeLinecap="round" />
      <g className="volt-wave" style={{ transformOrigin: "98px 92px" }}>
        <path d="M98 92 Q 114 82 110 66" fill="none" stroke="#160f2b" strokeWidth="9" strokeLinecap="round" />
        <path d="M98 92 Q 114 82 110 66" fill="none" stroke="url(#volt-chrome)" strokeWidth="5" strokeLinecap="round" />
        <circle cx="110" cy="64" r="6" fill="#c8ff3d" stroke="#160f2b" strokeWidth="2.5" />
      </g>

      {/* Body */}
      <rect x="28" y="80" width="64" height="46" rx="18" fill="url(#volt-body)" stroke="#160f2b" strokeWidth="3" />
      <path d="M58 92 l-6 12 h8 l-4 12 12-16 h-8 l4-8z" fill="#c8ff3d" stroke="#160f2b" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M36 88 Q 40 84 48 84" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" opacity=".7" />

      {/* Feet */}
      <rect x="36" y="124" width="18" height="10" rx="5" fill="url(#volt-chrome)" stroke="#160f2b" strokeWidth="2.5" />
      <rect x="66" y="124" width="18" height="10" rx="5" fill="url(#volt-chrome)" stroke="#160f2b" strokeWidth="2.5" />

      {/* Head */}
      <rect x="14" y="20" width="92" height="64" rx="24" fill="url(#volt-chrome)" stroke="#160f2b" strokeWidth="3" />
      <rect x="6" y="40" width="10" height="22" rx="5" fill="#ff3fb4" stroke="#160f2b" strokeWidth="2.5" />
      <rect x="104" y="40" width="10" height="22" rx="5" fill="#ff3fb4" stroke="#160f2b" strokeWidth="2.5" />
      <rect x="24" y="32" width="72" height="40" rx="16" fill="url(#volt-visor)" stroke="#160f2b" strokeWidth="2.5" />

      {/* Neon face: resting */}
      <g className="volt-face-rest">
        <g filter="url(#volt-neon)" className="volt-blink" style={{ transformOrigin: "60px 48px" }}>
          <rect x="38" y="41" width="10" height="14" rx="5" fill="#2fd8ff" />
          <rect x="72" y="41" width="10" height="14" rx="5" fill="#2fd8ff" />
        </g>
        <path d="M50 62 Q 60 69 70 62" fill="none" stroke="#c8ff3d" strokeWidth="3" strokeLinecap="round" filter="url(#volt-neon)" />
      </g>

      {/* Neon face: happy (shown on hover / keyboard focus) */}
      <g className="volt-face-happy">
        <g fill="none" stroke="#2fd8ff" strokeWidth="4" strokeLinecap="round" filter="url(#volt-neon)">
          <path d="M37 52 Q 43 40 49 52" />
          <path d="M71 52 Q 77 40 83 52" />
        </g>
        <path d="M47 59 Q 60 74 73 59 Z" fill="#c8ff3d" stroke="#c8ff3d" strokeWidth="2" strokeLinejoin="round" filter="url(#volt-neon)" />
        <path d="M54 65 Q 60 69 66 65" fill="#ff3fb4" />
        <ellipse cx="33" cy="60" rx="5" ry="3" fill="#ff3fb4" opacity=".8" />
        <ellipse cx="87" cy="60" rx="5" ry="3" fill="#ff3fb4" opacity=".8" />
      </g>

      <path d="M26 36 Q 34 30 46 31" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" opacity=".35" />

      {/* Happy sparkles */}
      <g className="volt-face-happy" fill="#c8ff3d" stroke="#160f2b" strokeWidth="1.2" strokeLinejoin="round">
        <path d="M8 18 l2.5 6 6 2.5 -6 2.5 -2.5 6 -2.5 -6 -6 -2.5 6 -2.5z" />
        <path d="M104 10 l2 4.5 4.5 2 -4.5 2 -2 4.5 -2 -4.5 -4.5 -2 4.5 -2z" fill="#ff3fb4" />
      </g>
    </svg>
  );
}
