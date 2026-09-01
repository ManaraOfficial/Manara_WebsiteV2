import useScrollReveal from '../hooks/useScrollReveal.js'
import { useLang } from '../i18n/useLang.js'

function Reports() {
  const ref = useScrollReveal('.reveal')
  const { t } = useLang()

  return (
    <div ref={ref} className="px-6 py-12 sm:py-16">
      <h1 className="reveal text-center text-2xl sm:text-3xl font-medium text-gray-800 mb-4">
        {t('Reports')}
      </h1>
      <p className="reveal mx-auto max-w-3xl text-center text-sm sm:text-base leading-relaxed text-gray-600">
        {t(
          'Annual and project reports from Manara Foundation will be published here, so that our supporters and partners can follow our progress and impact over time.'
        )}
      </p>
      <div className="reveal mx-auto mt-10 flex h-48 max-w-3xl items-center justify-center bg-gray-200 text-gray-500 font-medium">
        {t('REPORTS ARCHIVE — COMING SOON')}
      </div>
    </div>
  )
}

export default Reports
