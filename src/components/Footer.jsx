import { NavLink } from 'react-router-dom'
import { FaLinkedinIn, FaTwitter, FaFacebookF, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa'
import { navItems } from './navItems.js'
import { useLang } from '../i18n/useLang.js'

const CONTACT_EMAIL = 'info@manara.org.np'

const socials = [
  { icon: FaLinkedinIn, href: '#', label: 'LinkedIn' },
  { icon: FaTwitter, href: '#', label: 'Twitter' },
  { icon: FaFacebookF, href: '#', label: 'Facebook' },
]

function Footer() {
  const { t } = useLang()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-200 bg-gray-50 text-gray-600">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.2fr]">
        {/* Brand */}
        <div>
          <img src="/manara-logo-black.png" alt={t('Manara Foundation')} className="h-11 w-auto" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            {t(
              'Empowering people and communities in Nepal through education, health and partnership.'
            )}
          </p>
          <div className="mt-5 flex gap-2.5">
            {socials.map((s) => {
              const Icon = s.icon
              return (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-500 transition-colors hover:bg-[#EC8134] hover:text-white"
                >
                  <Icon size={13} />
                </a>
              )
            })}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-800">
            {t('Quick Links')}
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.end} className="transition-colors hover:text-[#EC8134]">
                  {t(item.label)}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-800">{t('Contact')}</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <FaEnvelope size={13} className="mt-1 shrink-0 text-[#EC8134]" />
              <a href={`mailto:${CONTACT_EMAIL}`} className="transition-colors hover:text-[#EC8134]">
                {CONTACT_EMAIL}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <FaPhoneAlt size={13} className="mt-1 shrink-0 text-[#EC8134]" />
              <span>
                <a href="tel:+9779860465506" className="transition-colors hover:text-[#EC8134]">
                  +977 9860465506
                </a>
                <br />
                <a href="tel:+9779846984160" className="transition-colors hover:text-[#EC8134]">
                  +977 984-6984160
                </a>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FaMapMarkerAlt size={13} className="mt-1 shrink-0 text-[#EC8134]" />
              <span>{t('Kathmandu / Gongabu')}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-5 text-xs text-gray-400 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} {t('Manara Foundation')}. {t('All rights reserved.')}
          </span>
          <span>{t('Manaslu Region, Nepal')}</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
