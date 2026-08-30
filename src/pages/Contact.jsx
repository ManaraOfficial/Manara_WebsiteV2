import { useState } from 'react'
import { FaCheck } from 'react-icons/fa'
import useScrollReveal from '../hooks/useScrollReveal.js'
import { useLang } from '../i18n/LanguageContext.jsx'

const CONTACT_EMAIL = 'manaraofficial32@gmail.com'

// Web3Forms access key — get a free one at https://web3forms.com (safe to expose
// in client code). Until it is set, the form runs in demo mode.
const WEB3FORMS_KEY = 'REPLACE_WITH_WEB3FORMS_ACCESS_KEY'

const details = [
  { label: 'Email', value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  { label: 'Phone', value: '+977 9860465506', href: 'tel:+9779860465506' },
  { label: 'Phone', value: '+977 984-6984160', href: 'tel:+9779846984160' },
  { label: 'Office', value: 'Kathmandu / Gongabu' },
  { label: 'Working Hours', value: 'Monday – Friday: 10:00 AM – 5:00 PM' },
]

const socials = [
  { label: 'LinkedIn', href: '#' },
  { label: 'Twitter', href: '#' },
  { label: 'Facebook', href: '#' },
]

const inquiryTopics = [
  'General Information Request',
  'Curious Minds',
  'Project 28',
  'Sponsorships',
  'Other Activities',
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

  const demoMode = WEB3FORMS_KEY === 'REPLACE_WITH_WEB3FORMS_ACCESS_KEY'

  const clearError = (name) =>
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev))

  const inputClass = (name) =>
    `${fieldBase} ${errors[name] ? 'border-red-400' : 'border-gray-300 focus:border-[#EC8134]'}`

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData(e.target)

    const nextErrors = {}
    for (const [name, message] of Object.entries(REQUIRED_FIELDS)) {
      if (!String(data.get(name) || '').trim()) nextErrors[name] = t(message)
    }
    const phone = String(data.get('phone') || '').replace(/[\s\-()+]/g, '')
    if (!nextErrors.phone && !/^(977)?9\d{9}$/.test(phone)) {
      nextErrors.phone = t('Enter a valid Nepali phone number (10 digits starting with 9).')
    }
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      return
    }
    setErrors({})

    if (demoMode) {
      setStatus('success')
      e.target.reset()
      return
    }
    setStatus('sending')
    data.append('access_key', WEB3FORMS_KEY)
    data.append('subject', 'New message from the Manara Foundation website')
    data.append('from_name', 'Manara Foundation website')
    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data })
      const json = await res.json()
      setStatus(json.success ? 'success' : 'error')
      if (json.success) e.target.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <div ref={ref} className="px-6 py-14 sm:py-20">
      <h1 className="reveal text-center text-2xl sm:text-3xl font-medium text-gray-800">
        {t('Contact')}
      </h1>
      <p className="reveal mx-auto mt-4 max-w-2xl text-center text-sm sm:text-base leading-relaxed text-gray-600">
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
                  placeholder={t('Jane Doe')}
                  className={inputClass('name')}
                  onInput={() => clearError('name')}
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
                    onInput={() => clearError('phone')}
                  />
                  {errors.phone && <p className="mt-1.5 text-xs text-red-500">{errors.phone}</p>}
                </div>
                <div>
                  <label className={labelClass}>{t('Your Address')} *</label>
                  <input
                    name="address"
                    placeholder={t('Street, City, District')}
                    className={inputClass('address')}
                    onInput={() => clearError('address')}
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
                  onInput={() => clearError('message')}
                />
                {errors.message && <p className="mt-1.5 text-xs text-red-500">{errors.message}</p>}
              </div>

              {status === 'error' && (
                <p className="text-sm text-red-600">
                  {t('Something went wrong. Please try again or email us directly.')}
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
