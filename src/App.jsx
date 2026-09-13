import { lazy, Suspense } from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'

const Manara = lazy(() => import('./pages/Manara.jsx'))
const Team = lazy(() => import('./pages/Team.jsx'))
const Projects = lazy(() => import('./pages/Projects.jsx'))
const Reports = lazy(() => import('./pages/Reports.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

// Fullscreen, perfectly centered loader using the Green, Orange, and Red theme
function PageFallback() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-50">
      <div className="relative flex items-center justify-center">
        {/* Pulsing background aura */}
        <div className="absolute h-16 w-16 animate-ping rounded-full bg-[#2E6B3E]/10" />

        {/* Multi-color spinning loader ring */}
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-[#2E6B3E] border-r-[#F28526] border-b-[#D9381E]" />
      </div>
    </div>
  )
}

function App() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        {/* Main pages wrapped inside Layout (Navbar/Footer) */}
        <Route
          element={
            <Layout>
              <ScrollToTop />
              <Outlet />
            </Layout>
          }
        >
          <Route path="/" element={<Manara />} />
          <Route path="/team" element={<Team />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* Full-screen Standalone 404 (Outside Layout) */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}

export default App