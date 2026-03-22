import { useState, useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Pizze from './components/Pizze.jsx'
import Menu from './components/Menu.jsx'
import Gallery from './components/Gallery.jsx'
import Events from './components/Events.jsx'
import Reviews from './components/Reviews.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import BookingModal from './components/BookingModal.jsx'
import Cursor from './components/Cursor.jsx'
import { IconChevronUp } from './components/Icons.jsx'
import { LanguageProvider } from './i18n/LanguageContext.jsx'
import { Toaster } from 'react-hot-toast'

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <LanguageProvider>
      <>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 5000,
            style: {
              background: '#141414',
              color: '#f5f0e8',
              border: '1px solid rgba(201,168,76,0.25)',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
            },
          }}
        />
        <Cursor />
        <Navbar onBooking={() => setBookingOpen(true)} />

        <main>
          <Hero onBooking={() => setBookingOpen(true)} />
          <About />
          <Pizze />
          <Menu />
          <Gallery />
          <Events />
          <Reviews />
          <Contact onBooking={() => setBookingOpen(true)} />
        </main>

        <Footer onBooking={() => setBookingOpen(true)} />

        <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />

        {/* Scroll to top */}
        {showScrollTop && (
          <button
            onClick={scrollTop}
            style={{
              position: 'fixed',
              bottom: '32px',
              right: '32px',
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, #c9a84c, #f0d080)',
              border: 'none',
              color: '#0a0a0a',
              cursor: 'none',
              zIndex: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 32px rgba(201,168,76,0.4)',
              transition: 'all 0.3s',
              clipPath: 'polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)',
            }}
            aria-label="Torna in cima"
          >
            <IconChevronUp size={20} />
          </button>
        )}
      </>
    </LanguageProvider>
  )
}
