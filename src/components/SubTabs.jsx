import { useLang } from '../i18n/LanguageContext.jsx'

function SubTabs({ tabs, active, onChange }) {
  const { t } = useLang()
  return (
    <div className="sticky top-[34px] sm:top-[49px] z-40 flex">
      {tabs.map((tab) => {
        const isActive = tab.key === active
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            className={`flex-1 px-1 py-2 sm:px-4 sm:py-4 text-center text-[11px] sm:text-base tracking-wide text-white truncate ${tab.color} ${
              isActive ? 'font-extrabold' : 'font-medium'
            }`}
          >
            {t(tab.label)}
          </button>
        )
      })}
    </div>
  )
}

export default SubTabs
