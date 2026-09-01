import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { FaCheck } from 'react-icons/fa'
import useScrollReveal from '../hooks/useScrollReveal.js'
import { useLang } from '../i18n/useLang.js'

const CONTACT_EMAIL = 'info@manara.org.np'

// EmailJS credentials — see .env.example. The public key is meant to be visible
// in client code; lock the form down by allow-listing your domain in the
// EmailJS dashboard rather than by hiding this.
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const isConfigured = Boolean(EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY)

const details = [
  { label: 'Email', value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  { label: 'Phone', value: '+977 9860465506', href: 'tel:+9779860465506' },
  { label: 'Phone', value: '+977 984-6984160', href: 'tel:+9779846984160' },
  { label: 'Office', value: 'Kathmandu / Gongabu' },
  { label: 'Working Hours', value: 'Monday – Friday: 10:00 AM – 5:00 PM' },
]

const socials = [
  { label: 'Facebook', href: '#' },
  { label: 'Instagram', href: '#' },
  { label: 'TikTok', href: '#' },
]

const inquiryTopics = [
  'General Information Request',
  'Curious Minds',
  'Project 28',
  'Partnership',
]

const REQUIRED_FIELDS = {
  name: 'Full Name is required.',
  phone: 'Phone number is required.',
  address: 'Address is required.',
  message: 'Message is required.',
}

const fieldBase =
  'w-full border-0 border-b bg-transparent px-0 py-2 text-sm text-gray-800 outline-none transition-colors placeholder:text-gray-400'
const labelClass = 'block text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-1'

function Contact() {
  const ref = useScrollReveal('.reveal')
  const { t } = useLang()
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [errors, setErrors] = useState({})

  const validateField = (name, rawValue) => {
    const value = String(rawValue || '').trim()
    if (REQUIRED_FIELDS[name] && !value) return t(REQUIRED_FIELDS[name])
    if (!value) return ''

    if (name === 'name') {
      // Letters (any script, incl. Devanagari), spaces, . ' - only; at least two
      // parts of 2+ letters each — i.e. a first and last name.
      const parts = value.split(/\s+/).filter(Boolean)
      const looksLikeName = parts.every((p) => /^[\p{L}\p{M}][\p{L}\p{M}.'-]*$/u.test(p))
      const enoughParts =
        parts.length >= 2 && parts.filter((p) => p.replace(/[.'-]/g, '').length >= 2).length >= 2
      if (!looksLikeName || !enoughParts) {
        return t('Please enter your full name (first and last).')
      }
    }

    if (name === 'phone' && !/^(977)?9\d{9}$/.test(value.replace(/[\s\-()+]/g, ''))) {
      return t('Enter a valid Nepali phone number (10 digits starting with 9).')
    }

    if (name === 'address') {
      const validChars = /^[\p{L}\p{M}\p{N}\s,.\-/#()]+$/u
      const alnum = value.replace(/[^\p{L}\p{N}]/gu, '').length
      if (alnum < 3 || !/\p{L}/u.test(value) || !validChars.test(value)) {
        return t('Please enter a valid address.')
      }
    }

    if (name === 'message' && (value.length < 10 || !/\p{L}/u.test(value))) {
      return t('Please write a little more (at least 10 characters).')
    }

    return ''
  }

  // Live validation: check the field on every keystroke and on blur.
  const handleFieldChange = (e) => {
    const { name, value } = e.target
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) || undefined }))
  }

  const inputClass = (name) =>
    `${fieldBase} ${errors[name] ? 'border-red-400' : 'border-gray-300 focus:border-[#EC8134]'}`

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData(e.target)

    const nextErrors = {}
    for (const name of Object.keys(REQUIRED_FIELDS)) {
      const err = validateField(name, data.get(name))
      if (err) nextErrors[name] = err
    }
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      return
    }
    setErrors({})

    // Never report success we can't back up: with no credentials the form fails
    // loudly and points at the email address, rather than silently binning a
    // real enquiry behind a green tick.
    if (!isConfigured) {
      setStatus('error')
      return
    }

    setStatus('sending')
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: data.get('name'),
          phone: data.get('phone'),
          address: data.get('address'),
          topic: data.get('topic'),
          message: data.get('message'),
          to_email: CONTACT_EMAIL,
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      )
      setStatus('success')
      e.target.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <div ref={ref} className="px-6 py-12 sm:py-16">
      <h1 className="reveal text-center text-2xl sm:text-3xl font-medium text-gray-800">
        {t('Contact')}
      </h1>
      <p className="reveal mx-auto mt-4 max-w-3xl text-center text-sm sm:text-base leading-relaxed text-gray-600">
        {t(
          'Get in touch with the Manara Foundation — we welcome questions, partnership ideas and support from anyone who shares our vision.'
        )}
      </p>

      <div className="mx-auto mt-14 grid max-w-4xl gap-12 md:grid-cols-[1fr_1.3fr] md:gap-16">
        {/* Details */}
        <div className="reveal space-y-7">
          {details.map((row, i) => (
            <div key={i}>
              <div className={labelClass}>{t(row.label)}</div>
              {row.href ? (
                <a
                  href={row.href}
                  className="text-sm text-gray-800 transition-colors hover:text-[#EC8134]"
                >
                  {row.value}
                </a>
              ) : (
                <div className="text-sm text-gray-800">{t(row.value)}</div>
              )}
            </div>
          ))}

          <div>
            <div className={labelClass}>{t('Follow Us:')}</div>
            <div className="flex gap-4 text-sm text-gray-800">
              {socials.map((s) => (
                <a key={s.label} href={s.href} className="transition-colors hover:text-[#EC8134]">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="reveal">
          {status === 'success' ? (
            <div className="py-2 text-center sm:text-left">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 mx-auto sm:mx-0">
                <FaCheck size={18} />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                {t('Message Sent Successfully!')}
              </h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-gray-500 mx-auto sm:mx-0">
                {t('Thank you for reaching out. Your message has been routed to')}{' '}
                <span className="font-semibold text-gray-700">{CONTACT_EMAIL}</span>.{' '}
                {t('We will get back to you shortly!')}
              </p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="mt-5 text-sm font-semibold text-[#EC8134] transition-opacity hover:opacity-75"
              >
                {t('Send Another Message')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-7">
              <div>
                <label className={labelClass}>{t('Full Name')} *</label>
                <input
                  name="name"
                  placeholder={t('Ridam Gurung')}
                  className={inputClass('name')}
                  onChange={handleFieldChange}
                  onBlur={handleFieldChange}
                />
                {errors.name && <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>}
              </div>

              <div className="grid gap-7 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>{t('Phone Number')} *</label>
                  <input
                    name="phone"
                    placeholder={t('9841234567 or +977 9841234567')}
                    className={inputClass('phone')}
                    onChange={handleFieldChange}
                    onBlur={handleFieldChange}
                  />
                  {errors.phone && <p className="mt-1.5 text-xs text-red-500">{errors.phone}</p>}
                </div>
                <div>
                  <label className={labelClass}>{t('Your Address')} *</label>
                  <input
                    name="address"
                    placeholder={t('Street, City, District')}
                    className={inputClass('address')}
                    onChange={handleFieldChange}
                    onBlur={handleFieldChange}
                  />
                  {errors.address && <p className="mt-1.5 text-xs text-red-500">{errors.address}</p>}
                </div>
              </div>

              <div>
                <label className={labelClass}>{t('Inquiry Topic')}</label>
                <select name="topic" className={inputClass('topic')}>
                  {inquiryTopics.map((topic) => (
                    <option key={topic} value={topic}>
                      {t(topic)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>{t('Your Message')} *</label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder={t('How can we help you today?')}
                  className={`${inputClass('message')} resize-none`}
                  onChange={handleFieldChange}
                  onBlur={handleFieldChange}
                />
                {errors.message && <p className="mt-1.5 text-xs text-red-500">{errors.message}</p>}
              </div>

              {status === 'error' && (
                <p className="text-sm text-red-600">
                  {t('Something went wrong. Please try again or email us directly.')}{' '}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold underline">
                    {CONTACT_EMAIL}
                  </a>
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="rounded-full bg-[#404040] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-black disabled:opacity-50"
              >
                {status === 'sending' ? t('Sending…') : t('Send Message')}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default Contact
