import { useState, useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { FaPhoneAlt, FaWhatsapp } from 'react-icons/fa'
import SubTabs from '../components/SubTabs.jsx'
import BlurImage from '../components/BlurImage.jsx'
import { useLang } from '../i18n/useLang.js'
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
      {
        name: 'Ridam Gurung',
        image: ridamImg,
        category: 'CECS',
        role: 'CECS Coordinator',
        project: 'cecs',
        phone: '+977 984-6984160',
        bio: 'Coordinates the CECS child-sponsorship programme, connecting sponsors with children in the Manaslu region and following their schooling and wellbeing.',
        stats: { projects: '22+', experience: '5 Yrs' },
      },
      {
        name: 'Anju Devkota',
        image: anjuImg,
        category: 'Project 28',
        role: 'Project 28 Coordinator',
        project: 'project-28',
        phone: '+977 984-9302660',
        bio: 'Coordinates Project 28, bringing menstrual health education and hygiene support to girls and women across partner schools and communities.',
        stats: { projects: '18+', experience: '4 Yrs' },
      },
      {
        name: 'Rajesh Jacko',
        image: rajeshImg,
        category: 'Curious Minds',
        role: 'Curious Minds Coordinator',
        project: 'curious-minds',
        phone: '+977 9860465506',
        bio: 'Coordinates Curious Minds, setting up digital classrooms and training teachers in remote schools of the Manaslu region.',
        stats: { projects: '35+', experience: '6 Yrs' },
      },
      {
        name: 'Neha Adhikari',
        image: nehaImg,
        category: 'Project 28',
        role: 'Project 28 Coordinator',
        project: 'project-28',
        phone: '+977 986-0102468',
        bio: 'Works with schools and communities on Project 28, running menstrual health workshops and helping girls stay in school throughout their cycle.',
        stats: { projects: '15+', experience: '3 Yrs' },
      },
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
      {
        name: 'Ridam Gurung',
        image: ridamImg,
        role: 'Administration Lead',
        phone: '+977 984-6984160',
        bio: "Oversees the Foundation's day-to-day operations, accounting and reporting, keeping every programme running smoothly behind the scenes.",
        stats: { projects: '22+', experience: '5 Yrs' },
      },
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
      {
        name: 'Ralf Ledl',
        image: ralfImg,
        category: 'Curious Minds',
        role: 'Head of Curious Minds',
        credential: 'Board Chair',
        project: 'curious-minds',
        phone: '+49 162 5925249',
        bio: "Chairs the board and leads Curious Minds, guiding the growth of digital learning and children's rights work across Nepal.",
        stats: { projects: '45+', experience: '14 Yrs' },
      },
      {
        name: 'Jürgen Luck',
        image: jurgenImg,
        category: 'CECS',
        role: 'Head of CECS',
        credential: 'Board Treasurer',
        project: 'cecs',
        phone: '+43 676 4779369',
        bio: 'Board treasurer and lead of CECS, overseeing child sponsorships and the long-term financial stewardship of the Foundation.',
        stats: { projects: '30+', experience: '9 Yrs' },
      },
      {
        name: 'Andrea Spieth',
        image: andreaImg,
        category: 'Project 28',
        role: 'Head of Project 28',
        credential: 'Board Member',
        project: 'project-28',
        phone: '+43 699 17118965',
        bio: 'Initiator and lead of Project 28, bringing organisational development expertise to advance menstrual dignity and health in Nepal.',
        stats: { projects: '28+', experience: '8 Yrs' },
      },
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
              <BlurImage
                src={member.image}
                alt={member.name}
                width="600"
                height="720"
                className="h-72 w-full rounded-xl"
                imgClassName="h-72 w-full rounded-xl object-cover object-top [transition:scale_.6s_ease-out] group-hover:scale-105"
              >
                <span
                  className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide shadow-sm"
                  style={{ color: accent }}
                >
                  {t(member.category || panel.categoryLabel)}
                </span>
              </BlurImage>

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

              <div className="mb-3 flex flex-wrap items-center gap-2">
                <a
                  href={`tel:${(member.phone || '+9779800000000').replace(/[^\d+]/g, '')}`}
                  className="inline-flex w-fit items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-bold transition-opacity hover:opacity-80"
                  style={{ color: accent, backgroundColor: `${accent}1A` }}
                >
                  <FaPhoneAlt size={11} />
                  {member.phone || '+977 980-000-0000'}
                </a>
                {member.phone && (
                  <a
                    href={`https://wa.me/${member.phone.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`WhatsApp ${member.name}`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#25D366]/15 text-[#128C7E] transition-opacity hover:opacity-80"
                  >
                    <FaWhatsapp size={15} />
                  </a>
                )}
              </div>

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