import { useState, useRef, useEffect, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaUserCircle, FaStar, FaCheckCircle, FaQuoteLeft, FaChevronLeft, FaChevronRight, FaPause, FaPlay } from 'react-icons/fa'
import SubTabs from '../components/SubTabs.jsx'
import Carousel from '../components/Carousel.jsx'
import useScrollReveal from '../hooks/useScrollReveal.js'
import { useLang } from '../i18n/useLang.js'

import cm1 from '../assets/curious-minds/CuriousMinds.jpg'
import cm2 from '../assets/curious-minds/CuriousMinds2.jpg'
import cm3 from '../assets/curious-minds/CuriousMinds3.jpg'
import cm4 from '../assets/curious-minds/CuriousMinds6.jpg'

import p28_1 from '../assets/project-28/55417142cbcf287b2301b024cca442a20ec58c4f-1440x1920.jpg'
import p28_2 from '../assets/project-28/94550dd29dcc54f66b11d6873dae7a78bb1a564e-1440x1080.jpg'
import p28_3 from '../assets/project-28/c3c5454c616552f7da2baf3b93a863877e59561b-1440x1080.jpg'
import p28_4 from '../assets/project-28/abf68b75c8299daecf72a3fefb484c7bc9d80fe8-1440x1079.jpg'
import p28_5 from '../assets/project-28/99928c65609bfb475053f6b6ae515b8c33963d48-1440x1085.jpg'
import p28_6 from '../assets/project-28/ce118beb948aa593a0e1c6af92831f2533d02d3c-3120x2341.jpg'
import p28_7 from '../assets/project-28/fd494c168ba8f1e3f1b5b90263ff4a3eaab27516-1200x1598.jpg'

import cecs1 from '../assets/CECS/c71a5263ba010d9b0de42650f22e16a809d18cf0-1620x1080.jpg'
import cecs2 from '../assets/CECS/3efe7347a34307866fcf414e3795dfd0e3da04a2-1920x1080.jpg'
import cecs3 from '../assets/CECS/c8cf21abe68c8b964bd40655950400fdfd2dba82-1280x720.jpg'
import cecs4 from '../assets/CECS/908e3fe7491656cef7380b51c631a8ab12563cd6-1620x1080.jpg'

// Not eager: the ~40 "other activities" photos are only fetched when that
// gallery actually renders (Projects with no tab selected), not on every visit.
const otherImageLoaders = import.meta.glob('../assets/others/IMG_*.JPG', {
  import: 'default',
})

function useOtherImages(enabled) {
  const [images, setImages] = useState([])
  useEffect(() => {
    if (!enabled) return
    let cancelled = false
    Promise.all(
      Object.keys(otherImageLoaders)
        .sort()
        .map((key) => otherImageLoaders[key]())
    ).then((urls) => {
      if (!cancelled) setImages(urls)
    })
    return () => {
      cancelled = true
    }
  }, [enabled])
  return images
}

gsap.registerPlugin(ScrollTrigger)

const tabs = [
  { key: 'curious-minds', label: 'CURIOUS MINDS', color: 'bg-[#1E5AA8]' },
  { key: 'project-28', label: 'Project 28', color: 'bg-[#e20066]' },
  { key: 'cecs', label: 'CECS', color: 'bg-[#7047A0]' },
]

const details = {
  'curious-minds': {
    bg: 'bg-[#1E5AA8]',
    short: 'CM',
    ring: 'ring-[#1E5AA8]',
    text: 'text-[#1E5AA8]',
    badge: 'bg-[#1E5AA8]/10 text-[#1E5AA8]',
    borderColors: ['#1E5AA8', '#9dc0e8', '#14417a'],
    images: [cm1, cm2, cm3, cm4],
    tagline: 'Curiosity fuels education – education opens worlds',
    intro: `Curiosity is the driving force behind sustainable knowledge acquisition. This is precisely where the CURIOUS-MINDS educational initiative comes in: We open up inspiring learning environments for children in remote regions of Nepal and strengthen their future prospects through improved educational opportunities. Playful learning increases motivation and fosters long-term understanding. In many Nepalese schools, however, knowledge is primarily imparted through rote memorization – a practice that often fails to produce lasting learning outcomes. Within the framework of CURIOUS-MINDS, teachers gain practical experience in how knowledge can be conveyed effectively, both with and without modern media. With this project, we are committed not only to better education but also to children's rights. In collaboration with teachers, parents, children, and other stakeholders, we assess the challenges that impact their educational opportunities and develop targeted safeguarding measures.`,
    phasesTitle: '3 – 2 – 1 – CURIOUS MINDS',
    phasesSubtitle: 'Three project phases to project success',
    phases: [
      {
        title: 'Analysis & Awareness Raising',
        description: `As a first step, we conduct an inventory: Interested schools are evaluated, risk assessments are carried out, and challenges are identified. Together with teachers, parents, and local officials, we communicate the importance of education and children's rights to create the foundation for targeted measures. Additionally, the students' knowledge level is determined through an assessment. This allows us not only to provide targeted support but also to better measure learning progress. The results are later compared with those of schools not yet part of Curious Minds to demonstrate the project's added value and to evaluate the long-term impact of the measures.`,
      },
      {
        title: 'Implementation & Training',
        description: `In project phase II, we begin setting up the digital infrastructure: networks and computers are implemented, basic IT skills are taught, and teachers are trained in the use of e-learning. At the same time, we train selected, technically skilled teachers in system maintenance. Based on the risk assessment from project phase I, we encourage teachers to develop appropriate measures to strengthen children's rights. The schools commit to implementing and adhering to these measures at a community meeting. This commitment is reinforced and made legally binding through the public signing of a Memorandum of Understanding (MOU). This project phase ensures that education is not only accessible but also safe and sustainable.`,
      },
      {
        title: 'Independence & Sustainability',
        description: `In the third and final project phase, we ensure that the supported schools become self-sufficient in the long term. To this end, we conduct a refresher training session three to six months after the official handover, in which we address any remaining questions with teachers and selected students and meaningfully supplement or deepen their acquired knowledge. This ensures the sustainable integration of digital teaching and learning methods. Since complete independence is not always achieved immediately, Curious Minds continues to support the schools to overcome any remaining obstacles and dependencies. Teachers receive follow-up support for technical problems, repairs, or methodological challenges. With this phase, Curious Minds empowers the schools to maintain and further develop their educational structures in the long term.`,
      },
    ],
    testimonials: [
      {
        tag: 'DIGITAL LEARNING',
        quote: 'Since our school joined CURIOUS-MINDS, our students learn with computers for the first time — they are so much more engaged than before.',
        name: 'Placeholder Name',
        role: 'Teacher',
        detail: 'Partner School, Manaslu Region',
      },
      {
        tag: 'MODERN TEACHING',
        quote: 'The training gave me the confidence to use modern media in my classroom, not just rote memorization.',
        name: 'Placeholder Name',
        role: 'Teacher',
        detail: 'Partner School, Manaslu Region',
      },
    ],
  },
  'project-28': {
    bg: 'bg-[#e20066]',
    short: 'P28',
    ring: 'ring-[#e20066]',
    text: 'text-[#e20066]',
    badge: 'bg-[#e20066]/10 text-[#e20066]',
    borderColors: ['#e20066', '#f7a8ce', '#a8004c'],
    images: [p28_1, p28_2, p28_3, p28_4, p28_5, p28_6, p28_7],
    tagline: 'Menstrual dignity and health for women in Nepal',
    intro: `In large parts of Nepal, basic knowledge about menstruation is lacking. Women and girls have limited access to appropriate hygiene products. Monthly bleeding leads to restrictions in daily life, as menstruation is associated with taboos and prejudices. Project 28 promotes menstrual dignity and health in Nepal and helps ensure that menstruating people can participate in life with dignity and without limitations throughout all 28 days of their cycle.`,
    sections: [
      {
        title: 'Team',
        type: 'text',
        paragraphs: [
          `Besides her passion and commitment, initiator Andrea Spieth from Vorarlberg brings extensive knowledge and experience as an organizational development consultant and advisor. In cooperation with the teams and partner networks of MRDS Nepal and Menschen im Dialog, Project 28 was successfully launched. Together, we possess the necessary expertise in the areas of education, health, and development cooperation.`,
        ],
      },
      {
        title: 'Goals',
        type: 'goals',
        groups: [
          {
            heading: 'Short-term goals',
            items: [
              'Increase menstrual education',
              'Provide an economical and ecological solution for menstrual hygiene',
              'Supporting girls and women for full participation in everyday life, including during menstruation',
            ],
          },
          {
            heading: 'Long-term goals',
            items: [
              'Combat menstruation stigma',
              'Create an understanding of menstruation as a biological process',
              'Improve living conditions sustainably',
            ],
          },
        ],
      },
    ],
    testimonials: [
      {
        tag: 'MENSTRUAL DIGNITY',
        quote: 'For the first time, we could talk openly about menstruation at school without feeling ashamed.',
        name: 'Placeholder Name',
        role: 'Student',
        detail: 'Project 28 Participant',
      },
      {
        tag: 'GIRLS IN SCHOOL',
        quote: 'Project 28 gave our girls dignity and confidence — they no longer miss school during their period.',
        name: 'Placeholder Name',
        role: 'Teacher',
        detail: 'Partner School',
      },
    ],
  },
  cecs: {
    bg: 'bg-[#7047A0]',
    short: 'CECS',
    ring: 'ring-[#7047A0]',
    text: 'text-[#7047A0]',
    badge: 'bg-[#7047A0]/10 text-[#7047A0]',
    borderColors: ['#7047A0', '#c9b3e3', '#4f3175'],
    images: [cecs1, cecs2, cecs3, cecs4],
    tagline: "Fulfilling a child's wish for a future",
    intro: `Sponsorship can have a lasting positive impact on the lives of a child and the people around them. It's a very personal form of support that can foster a deep, felt connection between the sponsor and the country of Nepal, its people, the sponsored child, and their family. Therefore, taking on a sponsorship should be a well-considered, long-term decision. To help you decide whether or not to become a sponsor, we've compiled some important questions below. If you still have any questions, please don't hesitate to contact us. Just give us a call or send us an email!`,
    sections: [
      {
        title: 'Sponsorships',
        type: 'text',
        paragraphs: [
          `We have been active in the Manaslu region of Nepal since 2017. Children and young people living there are particularly affected by poverty; in some cases, they have lost one or more parents and are therefore at risk of child labor or early marriage. Long-term sponsorships can sustainably improve the situation of these children and young people.`,
        ],
      },
      {
        title: 'Goals',
        type: 'goals',
        groups: [
          {
            heading: 'Short-term goals',
            items: [
              'Avoid child labor',
              'Preventing early marriage',
              'Continuous access to education',
            ],
          },
          {
            heading: 'Long-term goals',
            items: [
              'Creating opportunities through education',
              'Improve living conditions sustainably',
              'Involve and promote the surrounding community',
              'Promote village communities',
            ],
          },
        ],
      },
    ],
    testimonials: [
      {
        tag: 'ACCESS TO EDUCATION',
        quote: 'Thanks to my sponsor, I can go to school every day instead of working to support my family.',
        name: 'Placeholder Name',
        role: 'Sponsored Child',
        detail: 'Manaslu Region',
      },
      {
        tag: 'ENDING EARLY MARRIAGE',
        quote: 'Sponsorship changed our village — more children are staying in school instead of being married early.',
        name: 'Placeholder Name',
        role: 'Community Member',
        detail: 'Manaslu Region',
      },
    ],
  },
}

const otherActivities = [
  'School Partnership in Hulchuk with German POS Service Group',
  'Healthy Schools sensibilization, awareness and sustainable structure building',
  'Organization of ECD specific teacher education and provisioning of ECD materials',
]

function FlagshipPrograms() {
  const { t } = useLang()
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.flagship-animate', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="bg-white px-6 py-8 sm:py-10 text-gray-700">
      <div className="mx-auto max-w-3xl space-y-3">
        <h2 className="flagship-animate text-xl sm:text-2xl font-medium text-gray-800">
          {t('Flagship Programs')}
        </h2>
        <p className="flagship-animate text-sm sm:text-base leading-relaxed">
          {t(
            'Our flagship programs represent our main long-term investments in education, health and community development. They address some of the most important challenges facing children, youth, women and communities in Nepal and are designed to create sustainable, measurable and scalable impact over many years. Together, they form the core of our work and receive continuous attention, development and long-term support. While each program has its own focus, they often contribute to education, health and community development at the same time.'
          )}
        </p>
      </div>
    </div>
  )
}

function ProjectPhases({ detail }) {
  const ref = useScrollReveal('.reveal')
  const { t } = useLang()

  return (
    <div ref={ref} className="bg-white px-6 py-10 sm:py-14 text-gray-700">
      <div className="mx-auto max-w-4xl">
        <div className="reveal text-center">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
            {t(detail.phasesTitle)}
          </h2>
          <p className="mt-1 text-sm sm:text-base text-gray-500">{t(detail.phasesSubtitle)}</p>
        </div>

        <div className="mt-10 space-y-8">
          {detail.phases.map((phase, i) => (
            <div key={phase.title} className="reveal flex gap-5 sm:gap-6">
              <div
                className={`flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full text-lg sm:text-xl font-semibold text-white ${detail.bg}`}
              >
                {i + 1}
              </div>
              <div className="pt-1">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                  {t(phase.title)}
                </h3>
                <p className="mt-2 text-sm sm:text-base leading-relaxed">
                  {t(phase.description)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ProjectSections({ detail }) {
  const ref = useScrollReveal('.reveal')
  const { t } = useLang()

  return (
    <div ref={ref} className={`px-6 py-10 sm:py-14 text-white ${detail.bg}`}>
      <div className="mx-auto max-w-4xl space-y-12">
        {detail.sections.map((section) => (
          <div key={section.title} className="reveal">
            <h2 className="text-xl sm:text-2xl font-semibold">
              {t(section.title)}
            </h2>

            {section.type === 'text' && (
              <div className="mt-4 space-y-4">
                {section.paragraphs.map((p, i) => (
                  <p key={i} className="text-sm sm:text-base leading-relaxed text-white/90">
                    {t(p)}
                  </p>
                ))}
              </div>
            )}

            {section.type === 'goals' && (
              <div className="mt-4 grid gap-8 sm:grid-cols-2">
                {section.groups.map((group) => (
                  <div key={group.heading}>
                    <h3 className="text-sm sm:text-base font-semibold">
                      {t(group.heading)}
                    </h3>
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm sm:text-base leading-relaxed text-white/90">
                      {group.items.map((item) => (
                        <li key={item}>{t(item)}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function TestimonialCard({ t: item, detail }) {
  const { t } = useLang()
  return (
    <div className="group relative h-full rounded-2xl [transition:translate_1s_ease-out] [will-change:translate] hover:-translate-y-2">
      {/* gradient border in the project's accent colour — flows around the card on hover */}
      <span
        className="glacier-border"
        aria-hidden="true"
        style={
          detail.borderColors
            ? {
                '--bd-a': detail.borderColors[0],
                '--bd-b': detail.borderColors[1],
                '--bd-c': detail.borderColors[2],
              }
            : undefined
        }
      />
      <div
        className="relative flex h-full flex-col rounded-2xl bg-white p-8 sm:p-9 shadow-sm ring-1 ring-gray-200 [transition:box-shadow_1s_ease] group-hover:shadow-lg group-hover:shadow-gray-200/70"
      >
      <div className="flex items-start justify-between gap-3">
        <div className={`flex gap-1 ${detail.text || 'text-amber-500'}`} aria-hidden="true">
          {Array.from({ length: 5 }).map((_, s) => (
            <FaStar key={s} size={17} />
          ))}
        </div>
        {item.tag && (
          <span
            className={`rounded-full px-3 py-1 text-[11px] font-bold tracking-wide ${detail.badge || 'bg-gray-100 text-gray-600'}`}
          >
            {t(item.tag)}
          </span>
        )}
      </div>

      <FaQuoteLeft
        className={`mt-5 opacity-30 transition-opacity duration-300 group-hover:opacity-60 ${detail.text || 'text-amber-500'}`}
        size={20}
        aria-hidden="true"
      />
      <blockquote className="mt-3 flex-1 text-base sm:text-lg italic leading-relaxed text-gray-600">
        {t(item.quote)}
      </blockquote>

      <hr className="my-6 border-gray-200" />

      <footer className="flex items-center gap-4">
        <span className="relative shrink-0">
          <FaUserCircle className={`${detail.text || 'text-gray-300'}`} size={48} aria-hidden="true" />
          <FaCheckCircle
            className={`absolute -bottom-0.5 -right-0.5 rounded-full bg-white ${detail.text || 'text-gray-400'}`}
            size={16}
            aria-hidden="true"
          />
        </span>
        <div>
          <div className="text-base font-bold text-gray-800">{item.name}</div>
          <div className={`text-sm font-semibold ${detail.text || 'text-gray-500'}`}>{t(item.role)}</div>
          {item.detail && <div className="text-xs text-gray-500">{t(item.detail)}</div>}
        </div>
      </footer>
      </div>
    </div>
  )
}

const AUTOPLAY_MS = 5000

function useItemsPerView() {
  const [n, setN] = useState(1)
  useEffect(() => {
    const read = () => {
      const w = window.innerWidth
      setN(w >= 768 ? 2 : 1)
    }
    read()
    window.addEventListener('resize', read)
    return () => window.removeEventListener('resize', read)
  }, [])
  return n
}

function Testimonials({ detail }) {
  const ref = useScrollReveal('.reveal')
  const { t } = useLang()
  const items = detail.testimonials
  const perView = useItemsPerView()
  const pages = Math.max(1, items.length - perView + 1)
  const [rawPage, setRawPage] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [hovering, setHovering] = useState(false)

  const page = Math.min(rawPage, pages - 1)
  const setPage = setRawPage

  useEffect(() => {
    if (!playing || hovering || pages <= 1) return
    const id = setInterval(() => setRawPage((p) => (p + 1) % pages), AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [playing, hovering, pages])

  const goPrev = () => setPage((p) => (p - 1 + pages) % pages)
  const goNext = () => setPage((p) => (p + 1) % pages)

  return (
    <div ref={ref} className="bg-gray-50 px-6 py-10 sm:py-14 text-gray-700">
      <div className="mx-auto max-w-6xl">
        <h2 className="reveal text-center text-xl sm:text-2xl font-semibold text-gray-800">
          {t('What People Say')}
        </h2>

        <div
          className="reveal mt-6 -my-4 overflow-hidden py-12"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${page * (100 / perView)}%)` }}
          >
            {items.map((t, i) => (
              <div
                key={i}
                className="shrink-0 px-3 first:pl-0 last:pr-0"
                style={{ width: `${100 / perView}%` }}
              >
                <TestimonialCard t={t} detail={detail} />
              </div>
            ))}
          </div>
        </div>

        {pages > 1 && (
          <div className="reveal mt-6 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setPlaying((v) => !v)}
              className="flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-600 transition-colors hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800"
              aria-label={playing ? 'Pause autoplay' : 'Resume autoplay'}
            >
              {playing ? <FaPause size={10} /> : <FaPlay size={10} />}
              {playing ? t('Pause Autoplay') : t('Resume Autoplay')}
            </button>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                {Array.from({ length: pages }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setPage(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    aria-current={i === page ? 'true' : undefined}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === page ? `w-6 ${detail.bg || 'bg-amber-500'}` : 'w-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous testimonial"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition-colors hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800"
              >
                <FaChevronLeft size={13} />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next testimonial"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition-colors hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800"
              >
                <FaChevronRight size={13} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function OtherActivities({ withList }) {
  const ref = useScrollReveal('.reveal')
  const { t } = useLang()

  return (
    <div ref={ref} className="bg-white px-6 py-8 sm:py-10 text-gray-700">
      <div className="mx-auto max-w-3xl space-y-3">
        <h2 className="reveal text-xl sm:text-2xl font-medium text-gray-800">
          {t('Other Activities')}
        </h2>
        <p className="reveal text-sm sm:text-base leading-relaxed">
          {t(
            "Not every important challenge requires a large program. Alongside our flagship programs, we support a variety of other initiatives, trainings, emergency responses and community-driven activities. These activities allow us to respond to local needs, pilot new ideas, strengthen partnerships and address practical challenges identified by schools, communities and local stakeholders. All of today's flagship programs originally started as small activities responding to a specific local need."
          )}
        </p>
        {withList && (
          <ul className="reveal list-disc space-y-1 pl-5 text-sm sm:text-base">
            {otherActivities.map((item) => (
              <li key={item}>{t(item)}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

function Projects() {
  const { t } = useLang()
  const [active, setActive] = useState(null)
  const detailRef = useRef(null)
  const picRowRef = useRef(null)
  const otherImages = useOtherImages(!active)

  useLayoutEffect(() => {
    if (!detailRef.current || !active) return
    // Background colour eases between projects via CSS (transition-colors); the
    // text glides in from the right so switching tabs feels directional.
    const ctx = gsap.context(() => {
      gsap.fromTo(
        detailRef.current.querySelector('.detail-body'),
        { x: 44, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
      )
    }, detailRef)
    return () => ctx.revert()
  }, [active])

  useEffect(() => {
    if (!active && picRowRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(picRowRef.current.children, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: picRowRef.current,
            start: 'top 90%',
          },
        })
      })
      return () => ctx.revert()
    }
  }, [active])

  return (
    <div className="pb-16 sm:pb-20">
      <FlagshipPrograms />
      <SubTabs tabs={tabs} active={active} onChange={setActive} />

      {active ? (
        <>
          <div
            ref={detailRef}
            className={`overflow-x-hidden px-6 py-8 sm:py-10 text-center text-white transition-colors duration-500 ease-out ${details[active].bg}`}
          >
            {details[active].tagline ? (
              <div className="detail-body mx-auto max-w-3xl space-y-4">
                <p className="text-lg sm:text-xl font-semibold">{t(details[active].tagline)}</p>
                <p className="text-sm sm:text-base leading-relaxed text-white/90">
                  {t(details[active].intro)}
                </p>
              </div>
            ) : (
              <>
                <p className="text-sm sm:text-base">
                  Details {details[active].short} – if required add a link to
                  sub-page (more details)
                </p>
                <p className="text-sm sm:text-base">
                  Quotes (what people say) can be part of the sub-page
                </p>
              </>
            )}
          </div>
          {details[active].phases && <ProjectPhases detail={details[active]} />}
          {details[active].sections && <ProjectSections detail={details[active]} />}
          <Carousel
            images={details[active].images}
            alt={details[active].short}
            ringClass={details[active].ring}
          />
          {details[active].testimonials && <Testimonials detail={details[active]} />}
          <OtherActivities withList={false} />
        </>
      ) : (
        <>
          <OtherActivities withList />
          <div ref={picRowRef}>
            <Carousel images={otherImages} alt={t('Other activities')} ringClass="ring-gray-800" />
          </div>
        </>
      )}
    </div>
  )
}

export default Projects
