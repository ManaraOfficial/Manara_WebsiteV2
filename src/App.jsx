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

function PageFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-[#1E5AA8]" />
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