import logoWhite from '../assets/manara-logo-white.png'

function Logo({ className = '' }) {
  return (
    <img
      src={logoWhite}
      alt="Manara Foundation"
      className={`h-9 w-auto sm:h-20 drop-shadow-sm ${className}`}
    />
  )
}

export default Logo
