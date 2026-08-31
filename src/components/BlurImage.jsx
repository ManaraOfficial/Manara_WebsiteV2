import { useState } from 'react'
import { blurFor } from '../lib/blur.js'

/**
 * Image with a low-res blurred preview of itself (LQIP) + an animated shimmer
 * sweep, that cross-fades and sharpens as the full file arrives. Layout is
 * reserved immediately so nothing "pops" in on slow connections.
 *
 * `className`    → the wrapper (set the box size / rounding here)
 * `imgClassName` → the <img> itself (object-fit, hover scale, etc.)
 */
function BlurImage({
  src,
  alt = '',
  width,
  height,
  loading = 'lazy',
  fetchPriority,
  className = '',
  imgClassName = '',
  children,
}) {
  const [loaded, setLoaded] = useState(false)
  const placeholder = blurFor(src)

  return (
    <div className={`relative overflow-hidden bg-gray-100 ${className}`}>
      {/* Low-res blurred preview of the real photo */}
      {placeholder && (
        <img
          src={placeholder}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-cover blur-2xl transition-[opacity,transform] duration-[1100ms] ease-out ${
            loaded ? 'scale-100 opacity-0' : 'scale-125 opacity-100'
          }`}
        />
      )}

      {/* Animated shimmer sweep */}
      <span
        aria-hidden="true"
        className={`skeleton-shimmer pointer-events-none absolute inset-0 transition-opacity duration-700 ease-out ${
          loaded ? 'opacity-0' : placeholder ? 'opacity-70' : 'opacity-100'
        }`}
      />

      {/* Full image — cross-fades in and sharpens */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className={`${imgClassName} transition-[opacity,filter,transform] duration-[1100ms] ease-out ${
          loaded ? 'scale-100 opacity-100 blur-0' : 'scale-105 opacity-0 blur-xl'
        }`}
      />
      {children}
    </div>
  )
}

export default BlurImage
