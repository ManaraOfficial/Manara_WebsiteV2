import useScrollReveal from '../hooks/useScrollReveal.js'

function Reports() {
  const ref = useScrollReveal('.reveal')

  return (
    <div ref={ref} className="px-6 py-12 sm:py-16">
      <h1 className="reveal text-center text-2xl sm:text-3xl font-medium text-gray-800 mb-6">
        Reports
      </h1>
      <p className="reveal mx-auto max-w-2xl text-center text-sm sm:text-base leading-relaxed text-gray-600">
        Annual and project reports from Manara Foundation will be published
        here, so that our supporters and partners can follow our progress
        and impact over time.
      </p>
      <div className="reveal mx-auto mt-10 flex h-48 max-w-2xl items-center justify-center bg-gray-200 text-gray-500 font-medium">
        REPORTS ARCHIVE — COMING SOON
      </div>
    </div>
  )
}

export default Reports
