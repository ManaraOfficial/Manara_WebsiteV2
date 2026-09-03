import { useEffect } from 'react'

/**
 * TEMPORARY diagnostic — delete once the sideways-scroll issue is settled.
 *
 * Walks the DOM for anything extending past the document's right edge and names
 * the culprits on screen. Raw DOM + rAF, never React state, so it cannot
 * perturb what it is measuring.
 */
function OverflowProbe() {
  useEffect(() => {
    const box = document.createElement('div')
    Object.assign(box.style, {
      position: 'fixed',
      left: '4px',
      bottom: '4px',
      zIndex: '99999',
      background: 'rgba(0,0,0,.88)',
      color: '#0f0',
      font: '10px/1.35 monospace',
      padding: '6px 8px',
      borderRadius: '4px',
      pointerEvents: 'none',
      whiteSpace: 'pre',
      maxWidth: '92vw',
      maxHeight: '45vh',
      overflow: 'hidden',
    })
    document.body.appendChild(box)

    const describe = (el) => {
      const cls = (el.className && typeof el.className === 'string' ? el.className : '')
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 3)
        .join('.')
      return `${el.tagName.toLowerCase()}${cls ? '.' + cls : ''}`
    }

    let frame
    let last = 0
    const tick = (now) => {
      // Scanning every element is expensive; four times a second is plenty.
      if (now - last > 250) {
        last = now
        const docWidth = document.documentElement.clientWidth
        const offenders = []
        for (const el of document.querySelectorAll('body *')) {
          const r = el.getBoundingClientRect()
          if (r.width === 0 || r.height === 0) continue
          if (r.right > docWidth + 1 || r.left < -1) {
            offenders.push(
              `${describe(el)}  L${Math.round(r.left)} R${Math.round(r.right)} w${Math.round(r.width)}`
            )
          }
        }
        box.textContent = [
          `clientWidth   ${docWidth}`,
          `scrollWidth   ${document.documentElement.scrollWidth}`,
          `body scrollW  ${document.body.scrollWidth}`,
          `innerWidth    ${window.innerWidth}`,
          `OVERFLOW      ${document.documentElement.scrollWidth - docWidth}px`,
          '--- offenders (outermost first) ---',
          ...(offenders.length ? offenders.slice(0, 12) : ['none']),
        ].join('\n')
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      box.remove()
    }
  }, [])

  return null
}

export default OverflowProbe
