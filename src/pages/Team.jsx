import { useState, useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { FaPhoneAlt } from 'react-icons/fa'
import SubTabs from '../components/SubTabs.jsx'
import { useLang } from '../i18n/LanguageContext.jsx'
import ralfImg from '../assets/ralf.jpg'
import jurgenImg from '../assets/jurgen.jpeg'
import andreaImg from '../assets/andrea.jpeg'
import ridamImg from '../assets/ridam.jpeg'
import anjuImg from '../assets/anju.png'
import rajeshImg from '../assets/rajesh.jpg'
import nehaImg from '../assets/neha.jpeg'

const tabs = [
  { key: 'project-team', label: 'PROJECT-TEAM', color: 'bg-sky-700' },
  { key: 'administration', label: 'ADMINISTRATION', color: 'bg-gray-500' },
  { key: 'board-members', label: 'BOARD-MEMBERS', color: 'bg-gray-800' },
]

// Accent colour per programme a member handles
const projectColors = {
  'curious-minds': '#1E5AA8',
  'project-28': '#e20066',
  cecs: '#7047A0',
}
const DEFAULT_ACCENT = '#EC8134'

const panels = {
  'project-team': {
    bg: 'bg-sky-700',
    border: 'border-sky-700',
    accent: 'text-sky-700',
    soft: 'bg-sky-50',
    categoryLabel: 'Project Team',
    text: "Our project team coordinates and delivers Manara Foundation's programs on the ground, working directly with schools and communities in the Manaslu region and beyond.",
    members: [
      { name: 'Ridam Gurung', image: ridamImg, role: 'CECS Coordinator', project: 'cecs', stats: { projects: '22+', experience: '5 Yrs' } },
      { name: 'Anju Devkota', image: anjuImg, role: 'Project 28 Coordinator', project: 'project-28', stats: { projects: '18+', experience: '4 Yrs' } },
      { name: 'Rajesh Jacko', image: rajeshImg, role: 'Curious Minds Coordinator', project: 'curious-minds', stats: { projects: '35+', experience: '6 Yrs' } },
      { name: 'Neha Adhikari', image: nehaImg, role: 'Project 28 Coordinator', project: 'project-28', stats: { projects: '15+', experience: '3 Yrs' } },
    ],
  },
  administration: {
    bg: 'bg-gray-500',
    border: 'border-gray-500',
    accent: 'text-gray-600',
    soft: 'bg-gray-100',
    categoryLabel: 'Administration',
    text: "Our administration team keeps the Foundation's daily operations, accounting and reporting running smoothly, supporting every project behind the scenes.",
    members: [
      { name: 'Ridam Gurung', image: ridamImg, role: 'Administration Lead', stats: { projects: '22+', experience: '5 Yrs' } },
    ],
  },
  'board-members': {
    bg: 'bg-gray-800',
    border: 'border-gray-800',
    accent: 'text-gray-800',
    soft: 'bg-gray-100',
    categoryLabel: 'Board',
    text: 'Our board members guide the strategic direction of Manara Foundation, bringing years of experience in humanitarian and community development work to oversee our mission.',
    members: [
      { name: 'Ralf Ledl', image: ralfImg, role: 'Board Chair', project: 'curious-minds', stats: { projects: '45+', experience: '14 Yrs' } },
      { name: 'Jürgen Luck', image: jurgenImg, role: 'Board Treasurer', project: 'cecs', stats: { projects: '30+', experience: '9 Yrs' } },
      { name: 'Andrea Spieth', image: andreaImg, role: 'Board Member', project: 'project-28', stats: { projects: '28+', experience: '8 Yrs' } },
    ],
  },
}

function Team() {
  const { t } = useLang()
  const [active, setActive] = useState('project-team')
  const panel = panels[active]
  const listRef = useRef(null)

  useLayoutEffect(() => {
    if (!listRef.current) return
    gsap.fromTo(
      listRef.current.children,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.1, clearProps: 'transform,opacity' }
    )
  }, [active])

  return (
    <div className="pb-16 sm:pb-20">
      <SubTabs tabs={tabs} active={active} onChange={setActive} />
      <div className={`px-6 py-6 sm:py-8 text-white ${panel.bg}`}>
        <div className="mx-auto max-w-3xl space-y-1 text-sm sm:text-base leading-relaxed">
          <p>{t(panel.text)}</p>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-6 py-10 sm:py-14">
        <ul ref={listRef} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {panel.members.map((member) => {
            const accent = projectColors[member.project] || DEFAULT_ACCENT
            return (
            <li
              key={member.name}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100 [transition:translate_.5s_ease-out,box-shadow_.5s_ease-out] will-change-transform hover:-translate-y-1.5 hover:shadow-lg"
              style={{ borderTop: `3px solid ${accent}` }}
            >
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                  decoding="async"
                  className="h-72 w-full rounded-xl object-cover object-top [transition:scale_.6s_ease-out] group-hover:scale-105"
                />
                <span
                  className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide shadow-sm"
                  style={{ color: accent }}
                >
                  {t(member.category || panel.categoryLabel)}
                </span>
              </div>

              <h3 className="mt-4 text-base font-bold leading-tight text-gray-900">
                {member.name}
              </h3>
              <p className="mt-1 text-sm font-bold" style={{ color: accent }}>
                {t(member.role)}
              </p>
              {member.credential && (
                <p className="mt-0.5 text-xs text-gray-500">{t(member.credential)}</p>
              )}

              <hr className="my-3 border-gray-200" />

              <a
                href={`tel:${(member.phone || '+9779800000000').replace(/[^\d+]/g, '')}`}
                className="mb-3 inline-flex w-fit items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-bold transition-opacity hover:opacity-80"
                style={{ color: accent, backgroundColor: `${accent}1A` }}
              >
                <FaPhoneAlt size={11} />
                {member.phone || '+977 980-000-0000'}
              </a>

              <p className="text-sm leading-relaxed text-gray-500">
                {t(
                  member.bio ||
                    'Part of the Manara Foundation team, working with schools and communities in the Manaslu region and beyond.'
                )}
              </p>
            </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Team