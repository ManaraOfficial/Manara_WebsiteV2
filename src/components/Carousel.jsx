import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { FaChevronLeft, FaChevronRight, FaTimes, FaSearchPlus, FaSearchMinus, FaExpand } from 'react-icons/fa'
import BlurImage from './BlurImage.jsx'

const ZOOM_MIN = 1
const ZOOM_MAX = 3
const ZOOM_STEP = 0.5

const THUMBS_VISIBLE = 6

function Carousel({ images, alt, ringClass = 'ring-gray-800' }) {
  const [active, setActive] = useState(0)
  const [thumbStart, setThumbStart] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [zoom, setZoom] = useState(1)

  const total = images ? images.length : 0
  const maxThumbStart = Math.max(0, total - THUMBS_VISIBLE)

  const goTo = (index) => {
    setActive(index)
    if (index < thumbStart) setThumbStart(index)
    else if (index >= thumbStart + THUMBS_VISIBLE) setThumbStart(index - THUMBS_VISIBLE + 1)
  }

  const prev = () => goTo((active - 1 + total) % total)
  const next = () => goTo((active + 1) % total)

  const thumbPrev = () => setThumbStart((s) => Math.max(0, s - THUMBS_VISIBLE))
  const thumbNext = () => setThumbStart((s) => Math.min(maxThumbStart, s + THUMBS_VISIBLE))

  const openLightbox = () => {
    setZoom(1)
    setLightboxOpen(true)
  }

  const zoomIn = () => setZoom((z) => Math.min(ZOOM_MAX, z + ZOOM_STEP))
  const zoomOut = () => setZoom((z) => Math.max(ZOOM_MIN, z - ZOOM_STEP))

  useEffect(() => {
    if (!lightboxOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') setLightboxOpen(false)
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [lightboxOpen, total, active])

  const onWindowKeyDown = (e) => {
    if (e.key === 'ArrowLeft') prev()
    if (e.key === 'ArrowRight') next()
  }

  if (!images || images.length === 0) return null

  return (
    <div className="mx-auto max-w-4xl px-6 py-6 sm:py-8">
      <div
        className="group relative overflow-hidden rounded-2xl bg-gray-100 shadow-sm ring-1 ring-black/5"
        tabIndex={0}
        role="group"
        aria-label={`${alt} image gallery`}
        onKeyDown={onWindowKeyDown}
      >
        <button
          type="button"
          onClick={openLightbox}
          aria-label={`Expand image ${active + 1} of ${total}`}
          className="block aspect-[16/10] w-full cursor-zoom-in"
        >
          <BlurImage
            key={images[active]}
            src={images[active]}
            alt={`${alt} ${active + 1}`}
            loading="eager"
            className="h-full w-full"
            imgClassName="h-full w-full object-cover"
          />
        </button>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <button
          type="button"
          onClick={openLightbox}
          aria-label="View full size"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 hover:bg-black/70 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white group-hover:opacity-100"
        >
          <FaExpand size={13} />
        </button>

        <span className="absolute bottom-3 right-3 rounded-full bg-black/55 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm" aria-live="polite">
          {active + 1} / {total}
        </span>

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-800 opacity-0 shadow-md transition-all duration-200 hover:bg-white focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800 group-hover:opacity-100"
            >
              <FaChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next image"
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-800 opacity-0 shadow-md transition-all duration-200 hover:bg-white focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800 group-hover:opacity-100"
            >
              <FaChevronRight size={16} />
            </button>
          </>
        )}
      </div>

      {total > 1 && (
        // The row's own content — up to THUMBS_VISIBLE thumbnails plus a prev/next
        // arrow on each end, none of it allowed to shrink — is wider than a phone
        // screen. With nowhere to give, it was pushing the whole page wider,
        // which is what let the site pinch-zoom out with dead space on the right.
        // overflow-x-auto lets the row scroll within itself instead; the negative
        // margin plus matching padding lets it use the full viewport width for
        // that scroll while everything still lines up at rest.
        <div className="-mx-6 flex items-center justify-center gap-2 overflow-x-auto px-6">
          {maxThumbStart > 0 && (
            <button
              type="button"
              onClick={thumbPrev}
              disabled={thumbStart === 0}
              aria-label="Previous thumbnails"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800 disabled:cursor-not-allowed disabled:opacity-0"
            >
              <FaChevronLeft size={13} />
            </button>
          )}

          <div className="flex justify-center gap-2">
            {images.slice(thumbStart, thumbStart + THUMBS_VISIBLE).map((img, i) => {
              const index = thumbStart + i
              const isActive = index === active
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Go to image ${index + 1}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`h-14 w-14 shrink-0 overflow-hidden rounded-lg transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800 ${
                    isActive
                      ? `ring-2 ring-offset-2 ${ringClass}`
                      : 'opacity-60 hover:opacity-100 hover:scale-105'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${alt} thumbnail ${index + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </button>
              )
            })}
          </div>

          {maxThumbStart > 0 && (
            <button
              type="button"
              onClick={thumbNext}
              disabled={thumbStart >= maxThumbStart}
              aria-label="Next thumbnails"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800 disabled:cursor-not-allowed disabled:opacity-0"
            >
              <FaChevronRight size={13} />
            </button>
          )}
        </div>
      )}

      {lightboxOpen && createPortal(
        <div
          className="fixed inset-0 z-[100] flex flex-col bg-black"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="flex justify-end gap-4 px-6 pt-6 text-white">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                zoomIn()
              }}
              disabled={zoom >= ZOOM_MAX}
              aria-label="Zoom in"
              className="rounded transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-30"
            >
              <FaSearchPlus size={20} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                zoomOut()
              }}
              disabled={zoom <= ZOOM_MIN}
              aria-label="Zoom out"
              className="rounded transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-30"
            >
              <FaSearchMinus size={20} />
            </button>
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              aria-label="Close"
              className="rounded transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <FaTimes size={22} />
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4 sm:px-16">
            {total > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  prev()
                }}
                aria-label="Previous image"
                className="absolute left-2 z-10 rounded-full p-2 text-white transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:left-6"
              >
                <FaChevronLeft size={28} />
              </button>
            )}

            <img
              src={images[active]}
              alt={`${alt} ${active + 1}`}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="max-h-[70vh] max-w-full rounded object-contain transition-transform duration-200"
              style={{ transform: `scale(${zoom})` }}
              onClick={(e) => e.stopPropagation()}
            />

            {total > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  next()
                }}
                aria-label="Next image"
                className="absolute right-2 z-10 rounded-full p-2 text-white transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-6"
              >
                <FaChevronRight size={28} />
              </button>
            )}
          </div>

          <div className="flex justify-center pb-3">
            <span className="rounded-full bg-black/60 px-4 py-1.5 text-sm font-medium text-white" aria-live="polite">
              {active + 1} / {total}
            </span>
          </div>

          {total > 1 && (
            <div
              className="flex justify-center gap-3 overflow-x-auto px-6 pb-6"
              onClick={(e) => e.stopPropagation()}
            >
              {images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setZoom(1)
                    setActive(i)
                  }}
                  aria-label={`Go to image ${i + 1}`}
                  aria-current={i === active ? 'true' : undefined}
                  className={`h-16 w-24 shrink-0 overflow-hidden rounded-md border-2 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                    i === active ? 'border-white' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${alt} thumbnail ${i + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>,
        document.body
      )}
    </div>
  )
}

export default Carousel
