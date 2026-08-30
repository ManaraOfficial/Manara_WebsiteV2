import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollToTop() {
  const location = useLocation()
  const initialKey = useRef(location.key)

  useEffect(() => {
    if (location.key === initialKey.current) return

    const nav = document.querySelector('nav')
    const target = nav ? nav.offsetTop : 0
    window.scrollTo({ top: target, behavior: 'smooth' })
  }, [location])

  return null
}

export default ScrollToTop
