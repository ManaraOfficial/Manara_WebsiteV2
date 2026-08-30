import useScrollReveal from '../hooks/useScrollReveal.js'

function Contact() {
  const ref = useScrollReveal('.reveal')

  return (
    <div ref={ref} className="px-6 py-12 sm:py-16">
      <h1 className="reveal text-center text-2xl sm:text-3xl font-medium text-gray-800 mb-6">
        Contact
      </h1>
      <p className="reveal mx-auto max-w-2xl text-center text-sm sm:text-base leading-relaxed text-gray-600 mb-10">
        Get in touch with the Manara Foundation — we welcome questions,
        partnership ideas and support from anyone who shares our vision.
      </p>
      <div className="mx-auto grid max-w-2xl gap-4 text-sm sm:text-base text-gray-700">
        <div className="reveal flex justify-between border-b border-gray-200 py-3">
          <span className="font-semibold">Email</span>
          <span>info@manarafoundation.org</span>
        </div>
        <div className="reveal flex justify-between border-b border-gray-200 py-3">
          <span className="font-semibold">Region</span>
          <span>Manaslu Region, Gorkha, Nepal</span>
        </div>
        <div className="reveal flex justify-between border-b border-gray-200 py-3">
          <span className="font-semibold">Founded</span>
          <span>2017 (as MRDS Nepal), 2026 (as Manara Foundation)</span>
        </div>
      </div>
    </div>
  )
}

export default Contact
