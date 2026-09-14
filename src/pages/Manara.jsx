import { useState, useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import SubTabs from '../components/SubTabs.jsx'
import Tagline from '../components/Tagline.jsx'
import Story from '../components/Story.jsx'
import { useLang } from '../i18n/useLang.js'

const tabs = [
  { key: 'education', label: 'EDUCATION', color: 'bg-[#366A35]' },
  { key: 'health', label: 'HEALTH', color: 'bg-[#EC8134]' },
  { key: 'partnership', label: 'PARTNERSHIP', color: 'bg-[#D34A32]' },
]

const panels = {
  education: {
    bg: 'bg-[#366A35]',
    text: `Education is one of the most powerful tools for creating lasting change. At Manara Foundation, we see learning not only as something that happens in schools, but as a lifelong process that helps people build confidence, develop skills and create opportunities for themselves, their families and their communities.`,
    quote: 'We believe that empowered people create empowered communities.',
  },
  health: {
    bg: 'bg-[#EC8134]',
    text: `At Manara Foundation, we see health as more than the absence of illness. Good health enables people to learn, work, participate and shape their own future with dignity and confidence. Through health education, prevention and practical support, we help people and communities build healthier lives.`,
    quote: 'We believe that healthy people build strong communities.',
  },
  partnership: {
    bg: 'bg-[#D34A32]',
    text: `Lasting progress is rarely achieved alone. At Manara Foundation, we work together with schools, communities, local governments, volunteers, businesses and partner organizations to create practical solutions and sustainable opportunities. Partnership means listening, sharing responsibility, learning from one another and building on local strengths. Through cooperation and mutual support, small ideas can grow into meaningful and lasting change.`,
    quote: 'We believe that together, we can achieve more than any of us could alone.',
  },
}

function Manara() {
  const { t } = useLang()
  const [active, setActive] = useState('education')
  const panel = panels[active]
  const panelRef = useRef(null)

  useLayoutEffect(() => {
    // Match the Projects tab treatment: background colour eases between panels
    // via CSS (transition-colors); the text glides in from the right so
    // switching tabs feels directional.
    gsap.fromTo(
      panelRef.current,
      { x: 44, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
    )
  }, [active])

  return (
    <div>
      <Tagline />
      <SubTabs tabs={tabs} active={active} onChange={setActive} />
      <div
        className={`overflow-x-hidden px-6 py-10 sm:py-14 text-white transition-colors duration-500 ease-out ${panel.bg}`}
      >
        <div ref={panelRef} className="mx-auto max-w-3xl space-y-4 text-sm sm:text-base leading-relaxed">
          <p>{t(panel.text)}</p>
          <p className="font-semibold">{t(panel.quote)}</p>
        </div>
      </div>
      <Story />
    </div>
  )
}

export default Manara
