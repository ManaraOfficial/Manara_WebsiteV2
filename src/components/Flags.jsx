// Inline SVG flags rather than emoji: Windows does not render flag emoji at all
// (it falls back to plain letter pairs like "NP"), and a flag-icon package would
// be extra bytes on connections we're trying to keep light. These are a few
// hundred bytes each and render identically everywhere.

const box = 'h-3.5 w-5 shrink-0'

export function FlagGB({ className = '' }) {
  return (
    <svg
      viewBox="0 0 60 30"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      className={`${box} ${className}`}
    >
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="3" />
      <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  )
}

export function FlagNP({ className = '' }) {
  return (
    <svg
      viewBox="0 0 50 54"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      className={`${box} ${className}`}
    >
      {/* Nepal's flag is the only non-rectangular national flag — two stacked
          pennants, crimson with a blue border. */}
      <path
        d="M3 3 L41 23 L22 23 L43 42 L3 42 Z"
        fill="#DC143C"
        stroke="#003893"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <circle cx="13" cy="14" r="3.4" fill="#fff" />
      <circle cx="14" cy="33" r="3.4" fill="#fff" />
    </svg>
  )
}
