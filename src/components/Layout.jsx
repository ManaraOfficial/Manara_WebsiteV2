import Header, { Nav } from './Header.jsx'
import Footer from './Footer.jsx'
import OverflowProbe from './OverflowProbe.jsx' // TEMPORARY — remove with the component

function Layout({ children }) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <Header />
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
      <OverflowProbe />
    </div>
  )
}

export default Layout
