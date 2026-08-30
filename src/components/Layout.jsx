import Header, { Nav } from './Header.jsx'

function Layout({ children }) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <Header />
      <Nav />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-gray-200 py-6 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Manara Foundation — The Way of People
      </footer>
    </div>
  )
}

export default Layout
