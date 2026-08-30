import { useState, useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import SubTabs from '../components/SubTabs.jsx'
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

const panels = {
  'project-team': {
    bg: 'bg-sky-700',
    border: 'border-sky-700',
    accent: 'text-sky-700',
    soft: 'bg-sky-50',
    text: (
      <p>
        Our project team coordinates and delivers Manara Foundation's
        programs on the ground, working directly with schools and
        communities in the Manaslu region and beyond.
      </p>
    ),
    members: [
      { name: 'Ridam Gurung', image: ridamImg, role: 'CECS Coordinator', stats: { projects: '22+', experience: '5 Yrs' } },
      { name: 'Anju Devkota', image: anjuImg, role: 'Project 28 Coordinator', stats: { projects: '18+', experience: '4 Yrs' } },
      { name: 'Rajesh Jacko', image: rajeshImg, role: 'Curious Minds Coordinator', stats: { projects: '35+', experience: '6 Yrs' } },
      { name: 'Neha Adhikari', image: nehaImg, role: 'Project 28 Coordinator', stats: { projects: '15+', experience: '3 Yrs' } },
    ],
  },
  administration: {
    bg: 'bg-gray-500',
    border: 'border-gray-500',
    accent: 'text-gray-600',
    soft: 'bg-gray-100',
    text: (
      <p>
        Our administration team keeps the Foundation's daily operations,
        accounting and reporting running smoothly, supporting every
        project behind the scenes.
      </p>
    ),
    members: [
      { name: 'Ridam Gurung', image: ridamImg, role: 'Administration Lead', stats: { projects: '22+', experience: '5 Yrs' } },
    ],
  },
  'board-members': {
    bg: 'bg-gray-800',
    border: 'border-gray-800',
    accent: 'text-gray-800',
    soft: 'bg-gray-100',
    text: (
      <p>
        Our board members guide the strategic direction of Manara
        Foundation, bringing years of experience in humanitarian and
        community development work to oversee our mission.
      </p>
    ),
    members: [
      { name: 'Ralf Ledl', image: ralfImg, role: 'Board Chair', stats: { projects: '45+', experience: '14 Yrs' } },
      { name: 'Jürgen Luck', image: jurgenImg, role: 'Board Treasurer', stats: { projects: '30+', experience: '9 Yrs' } },
      { name: 'Andrea Spieth', image: andreaImg, role: 'Board Member', stats: { projects: '28+', experience: '8 Yrs' } },
    ],
  },
}

function Team() {
  const [active, setActive] = useState('project-team')
  const panel = panels[active]
  const listRef = useRef(null)

  useLayoutEffect(() => {
    if (!listRef.current) return
    gsap.fromTo(
      listRef.current.children,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.1 }
    )
  }, [active])

  return (
    <div className="pb-16 sm:pb-20">
      <SubTabs tabs={tabs} active={active} onChange={setActive} />
      <div className={`px-6 py-6 sm:py-8 text-white ${panel.bg}`}>
        <div className="mx-auto max-w-3xl space-y-1 text-sm sm:text-base leading-relaxed">
          {panel.text}
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 py-10 sm:py-14"> {/* Increased max-w to 7xl to allow more room for bigger cards */}
        <ul ref={listRef} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"> {/* Increased gap to 8 */}
          {panel.members.map((member) => (
            <li
              key={member.name}
              className="flex flex-col items-center rounded-2xl bg-white p-7 text-center shadow-md ring-1 ring-gray-100" // Slightly increased padding and rounding
            >
              <img
                src={member.image}
                alt={member.name}
                loading="lazy"
                decoding="async"
                className="h-72 w-full rounded-xl object-cover object-top shadow-sm ring-1 ring-black/5" 
              />
              <h3 className="mt-5 text-lg font-semibold text-gray-900"> {/* Slightly increased margin and text size */}
                {member.name}
              </h3>
              <span
                className={`mt-1.5 inline-block rounded-full px-3 py-1 text-xs font-semibold ${panel.soft} ${panel.accent}`} // Slightly increased padding
              >
                {member.role}
              </span>
              <div className="mt-5 flex gap-3 text-xs text-gray-500"> {/* Slightly increased margin */}
                <span className="rounded-md bg-gray-50 px-2.5 py-1">{member.stats.experience}</span>
                <span className="rounded-md bg-gray-50 px-2.5 py-1">{member.stats.projects} projects</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Team