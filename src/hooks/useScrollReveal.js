import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function useScrollReveal(selector = '.reveal', options = {}) {
  const scopeRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(selector, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: scopeRef.current,
          start: 'top 85%',
        },
        ...options,
      })
    }, scopeRef)

    return () => ctx.revert()
  }, [])

  return scopeRef
}

export default useScrollReveal
