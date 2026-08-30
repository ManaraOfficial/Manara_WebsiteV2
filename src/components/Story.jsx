import useScrollReveal from '../hooks/useScrollReveal.js'

function Story() {
  const ref = useScrollReveal('.reveal')

  return (
    <section ref={ref} className="bg-gray-700 px-6 py-10 sm:py-12 text-gray-100">
      <h2 className="reveal text-center text-xl sm:text-2xl font-medium mb-6">
        The Story of Manara
      </h2>
      <div className="mx-auto max-w-3xl space-y-4 text-sm sm:text-base leading-relaxed text-gray-200">
        <p className="reveal">
          The Manara Foundation is a Nepalese non-profit organization
          dedicated to education, health and community development. Our
          story began in 2017 with the founding of Manaslu Rural
          Development Society Nepal (MRDS Nepal), a regional initiative
          rooted in the Manaslu region. Over the years, our work grew beyond
          the region – and in 2026, this development led to the
          establishment of the Manara Foundation. Our name combines manas
          (humanity, spirit, people) and ara (path), meaning:
        </p>
        <p className="reveal text-center font-semibold text-white">
          "The Way of People."
        </p>
        <p className="reveal">
          Our roots remain in the Manaslu region, while our work and
          partnerships now reach further. Guided by humanity, partnership
          and empowerment, we support people and communities in shaping
          their own future. 🌱
        </p>
      </div>
    </section>
  )
}

export default Story
