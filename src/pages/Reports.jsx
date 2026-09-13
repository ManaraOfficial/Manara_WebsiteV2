import React, { useEffect, useState } from 'react'
import useScrollReveal from '../hooks/useScrollReveal.js'
import { useLang } from '../i18n/useLang.js'
import { client } from '../sanity'

function Reports() {
  const ref = useScrollReveal('.reveal')
  const { t } = useLang()
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [downloadingId, setDownloadingId] = useState(null)

  useEffect(() => {
    let isMounted = true

    const fetchReports = async () => {
      try {
        setLoading(true)
        const query = `*[_type == "report"] | order(publishedDate desc) {
          _id,
          title,
          publishedDate,
          description,
          "fileUrl": file.asset->url
        }`
        const data = await client.fetch(query)
        if (isMounted) setReports(data)
      } catch (err) {
        console.error('Error fetching reports:', err)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchReports()

    return () => {
      isMounted = false
    }
  }, [])

  const handleDownload = async (e, fileUrl, title, id) => {
    e.preventDefault()
    if (!fileUrl) return

    try {
      setDownloadingId(id)
      const response = await fetch(fileUrl)
      const blob = await response.blob()
      const blobUrl = window.URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.href = blobUrl
      const fileName = `${title ? title.replace(/[^a-zA-Z0-9_-]/g, '_') : 'Report'}.pdf`
      link.download = fileName
      
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(blobUrl)
    } catch (err) {
      console.error('Direct download failed, falling back to direct link:', err)
      window.location.href = `${fileUrl}?dl=`
    } finally {
      setDownloadingId(null)
    }
  }

  return (
    <div ref={ref} className="bg-white px-4 py-8 sm:px-6 sm:py-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="reveal text-center mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">
            {t('Reports')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            {t(
              'Annual and project reports from Manara Foundation will be published here, so that our supporters and partners can follow our progress and impact over time.'
            )}
          </p>
        </div>

        {/* Dynamic Minimalist Reports List */}
        {loading ? (
          <div className="flex items-center justify-center py-12 gap-2 text-slate-500 text-xs font-medium">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-[#2E6B3E]" />
            <span>{t('Loading reports...')}</span>
          </div>
        ) : reports.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-xs font-medium">
            {t('No reports available at the moment.')}
          </div>
        ) : (
          <div className="divide-y divide-slate-200 border-t border-b border-slate-200">
            {reports.map((report) => (
              <div
                key={report._id}
                className="reveal py-4 px-2 sm:px-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 rounded-lg transition-colors"
              >
                {/* Information */}
                <div className="space-y-1 flex-1">
                  {report.publishedDate && (
                    <span className="text-[11px] font-semibold text-[#2E6B3E]">
                      {report.publishedDate}
                    </span>
                  )}

                  <h2 className="text-sm sm:text-base font-semibold text-slate-900">
                    {report.title}
                  </h2>

                  {report.description && (
                    <p className="text-xs text-slate-500 leading-relaxed max-w-xl">
                      {report.description}
                    </p>
                  )}
                </div>

                {/* Minimalist Text Links */}
                {report.fileUrl && (
                  <div className="flex items-center gap-4 shrink-0 text-xs font-semibold pt-1 sm:pt-0">
                    <a
                      href={report.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#2E6B3E] hover:underline transition-all"
                    >
                      {t('View PDF')}
                    </a>

                    <button
                      type="button"
                      onClick={(e) => handleDownload(e, report.fileUrl, report.title, report._id)}
                      disabled={downloadingId === report._id}
                      className="text-[#F28526] hover:underline transition-all disabled:opacity-50"
                    >
                      {downloadingId === report._id ? t('Downloading...') : t('Download')}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Reports