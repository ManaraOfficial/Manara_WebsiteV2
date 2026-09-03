import { useId } from 'react'

// Inline SVG flags rather than emoji: Windows does not render flag emoji at all
// (it falls back to plain letter pairs like "NP"), and a flag-icon package would
// be extra bytes on connections we're trying to keep light. These are a few
// hundred bytes each and render identically everywhere.

const box = 'h-4 w-5 shrink-0'

export function FlagGB({ className = '' }) {
  // The counterchange clip needs an id unique to each rendered instance.
  const clipId = useId()
  return (
    <svg
      viewBox="0 0 50 30"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      className={`${box} ${className}`}
    >
      {/* Official Union Flag geometry (3:5). The red diagonals are
          counterchanged — offset from the centre of the white saltire rather
          than centred on it — which the clip path is what produces. */}
      <clipPath id={clipId}>
        <path d="M25,15h25v15zv15h-25zh-25v-15zv-15h25z" />
      </clipPath>
      <path d="M0,0v30h50v-30z" fill="#012169" />
      <path d="M0,0 50,30M50,0 0,30" stroke="#fff" strokeWidth="6" />
      <path
        d="M0,0 50,30M50,0 0,30"
        clipPath={`url(#${clipId})`}
        stroke="#C8102E"
        strokeWidth="4"
      />
      <path
        d="M-1 11h22v-12h8v12h22v8h-22v12h-8v-12h-22z"
        fill="#C8102E"
        stroke="#fff"
        strokeWidth="2"
      />
    </svg>
  )
}

// Geometry taken from the official construction in the Constitution of Nepal,
// Article 5, Schedule 1 — not eyeballed. Note the upper pennant's lower edge is
// horizontal; the "notch" is where the lower pennant's diagonal crosses it.
const NP_OUTLINE = 'M -15,37.5735931288 h 60 L -15,0 v 80 h 60 L -15,20 z'

export function FlagNP({ className = '', wave = false }) {
  return (
    <svg
      viewBox="-17.582 -4.664 71.571 87.246"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      className={`${box} ${className}`}
    >
      {/* Cloth ripple: animated turbulence drives a displacement map, so waves
          travel across the fabric rather than the whole shape just rocking.
          Only rendered for the flag that waves, keeping the filter id unique. */}
      {wave && (
        <defs>
          <filter id="np-flag-ripple" x="-25%" y="-25%" width="150%" height="150%">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.014 0.05"
              numOctaves="2"
              seed="7"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                dur="6s"
                values="0.014 0.05; 0.022 0.065; 0.014 0.05"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="3"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      )}
      <g filter={wave ? 'url(#np-flag-ripple)' : undefined}>
        {/* Blue border drawn first so the crimson field sits on top of it. */}
        <path d={NP_OUTLINE} fill="none" stroke="#003893" strokeWidth="5.165" />
        <path d={NP_OUTLINE} fill="#DC143C" />
        <g fill="#fff">
          {/* Crescent moon — the official two-arc path. */}
          <path d="M -11.9502769431,23.4834957055 A 12.8400974233,12.8400974233 0 0,0 11.9502769431,23.4834957055 A 11.9502769431 11.9502769431 0 0,1 -11.9502769431,23.4834957055" />
          <polygon points="0.00,21.33 1.44,23.67 3.86,22.36 3.93,25.11 6.69,25.19 5.37,27.61 7.72,29.05 5.37,30.48 6.69,32.91 3.93,32.98 3.86,35.73 1.44,34.42 0.00,36.77 -1.44,34.42 -3.86,35.73 -3.93,32.98 -6.69,32.91 -5.37,30.48 -7.72,29.05 -5.37,27.61 -6.69,25.19 -3.93,25.11 -3.86,22.36 -1.44,23.67" />
          {/* 12-pointed sun */}
          <polygon points="0.00,47.48 2.11,50.92 5.65,48.99 5.76,53.03 9.79,53.13 7.86,56.68 11.31,58.79 7.86,60.89 9.79,64.44 5.76,64.54 5.66,68.58 2.11,66.65 0.00,70.10 -2.11,66.65 -5.65,68.58 -5.76,64.54 -9.79,64.44 -7.86,60.89 -11.31,58.79 -7.86,56.68 -9.79,53.13 -5.76,53.03 -5.66,48.99 -2.11,50.92" />
        </g>
      </g>
    </svg>
  )
}
