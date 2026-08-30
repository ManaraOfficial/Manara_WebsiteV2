import useScrollReveal from '../hooks/useScrollReveal.js'

function Tagline() {
  const ref = useScrollReveal('.reveal', { duration: 1, y: 24 })

  return (
    <section ref={ref} className="px-6 py-10 sm:py-12">
      <p className="reveal mx-auto max-w-3xl text-center text-lg sm:text-2xl text-gray-600 leading-relaxed">
        We empower people and communities through education, health and
        partnership, enabling them to shape their own future with dignity,
        confidence and opportunity
      </p>
    </section>
  )
}

export default Tagline
