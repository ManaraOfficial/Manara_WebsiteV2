import useScrollReveal from '../hooks/useScrollReveal.js'
import { useLang } from '../i18n/useLang.js'

function Story() {
  const ref = useScrollReveal('.reveal')
  const { t } = useLang()

  return (
    <section ref={ref} className="bg-gray-700 px-6 py-10 sm:py-14 text-gray-100">
      <h2 className="reveal text-center text-xl sm:text-2xl font-medium mb-4">
        {t('The Story of Manara')}
      </h2>
      <div className="mx-auto max-w-3xl space-y-4 text-sm sm:text-base leading-relaxed text-gray-200">
        <p className="reveal">
          <strong className="font-bold text-white">{t('The Manara Foundation')}</strong>{' '}
          {t(
            'is a Nepalese non-profit organization dedicated to education, health and community development. Our story began in 2017 with the founding of Manaslu Rural Development Society Nepal (MRDS Nepal), a regional initiative rooted in the Manaslu region. Over the years, our work grew beyond the region — and in 2026, this development led to the establishment of the Manara Foundation.'
          )}
        </p>
        <p className="reveal">
          {t('Our name combines manas (humanity, spirit, people) and ara (path), meaning:')}
        </p>
        <p className="reveal text-center font-semibold text-white">
          {t('"The Way of People."')}
        </p>
        <p className="reveal">
          {t(
            'Our roots remain in the Manaslu region, while our work and partnerships now reach further. Guided by humanity, partnership and empowerment, we support people and communities in shaping their own future.'
          )}{' '}
          🌱
        </p>
      </div>
    </section>
  )
}

export default Story
