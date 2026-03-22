import { useState } from 'react'
import { useScrollY } from '../hooks/useInView.js'
import { NAV_ITEMS } from '../assets/data.js'
import { IconClock, IconMapPin, IconPhone } from './Icons.jsx'
import { IMAGES } from '../assets/images.js'
import styles from './Navbar.module.css'
import { useLang } from '../i18n/LanguageContext.jsx'

const LANG_LABELS = {
  it: {
    booking: 'Prenota Tavolo',
    bookingMobile: '🍽️ Prenota un Tavolo',
    topLang: 'Lingua',
    langIt: 'Italian',
    langEn: 'English',
  },
  en: {
    booking: 'Book a Table',
    bookingMobile: '🍽️ Book a Table',
    topLang: 'Language',
    langIt: 'Italian',
    langEn: 'English',
  },
}

const NAV_LABELS = {
  it: {
    '#home': 'Home',
    '#menu': 'Menù',
    '#pizze': 'Pizze',
    '#galleria': 'Galleria',
    '#eventi': 'Eventi',
    '#contatti': 'Contatti',
  },
  en: {
    '#home': 'Home',
    '#menu': 'Menu',
    '#pizze': 'Pizzas',
    '#galleria': 'Gallery',
    '#eventi': 'Events',
    '#contatti': 'Contact',
  },
}

const NAV_ITEMS_VISIBLE = NAV_ITEMS.filter(item => item.href !== '#azienda')

export default function Navbar({ onBooking }) {
  const scrollY = useScrollY()
  const [menuOpen, setMenuOpen] = useState(false)
  const { lang, setLang } = useLang()
  const scrolled = scrollY > 60

  const handleNav = (href) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <nav className={styles.nav}>
        {/* Top bar */}
        <div className={styles.topBar}>
          <div className={styles.topBarInner}>
            <span className={styles.topBarItem}>
              <IconClock size={13} />&nbsp;
              {lang === 'en' ? 'Mon–Sat 19–24 · Sun 12–24 · Tue Closed' : 'Lun–Sab 19–24 · Dom 12–24 · Mar Chiuso'}
            </span>
            <span className={styles.topBarSep}>|</span>
            <a href="tel:+390071912980" className={styles.topBarItem}><IconPhone size={13} />&nbsp;+39 071 912980</a>
            <span className={styles.topBarSep}>|</span>
            <span className={styles.topBarItem}><IconMapPin size={13} />&nbsp;Via Nino Bixio 112, Falconara M.</span>
          </div>
        </div>

        {/* Main nav */}
        <div className={styles.mainNav}>
          <button className={styles.logo} onClick={() => handleNav('#home')} aria-label="Home">
            <img className={styles.logoImg} src={IMAGES.logoNeon} alt="Las Vegas" />
            <span className={styles.logoSub}>{lang === 'en' ? 'Restaurant Pizzeria' : 'Ristorante Pizzeria'}</span>
          </button>

          <ul className={styles.links}>
            {NAV_ITEMS_VISIBLE.map((item) => (
              <li key={item.label}>
                <button onClick={() => handleNav(item.href)} className={styles.link}>
                  {NAV_LABELS[lang]?.[item.href] ?? item.label}
                </button>
              </li>
            ))}
          </ul>

          <div className={styles.navActions}>
            <div className={styles.langPicker} aria-label={LANG_LABELS[lang].topLang}>
              <button
                type="button"
                className={`${styles.langBtn} ${lang === 'it' ? styles.langBtnActive : ''}`}
                onClick={() => setLang('it')}
              >
                {LANG_LABELS[lang].langIt}
              </button>
              <button
                type="button"
                className={`${styles.langBtn} ${lang === 'en' ? styles.langBtnActive : ''}`}
                onClick={() => setLang('en')}
              >
                {LANG_LABELS[lang].langEn}
              </button>
            </div>
            <button className={styles.bookBtn} onClick={onBooking}>
              {LANG_LABELS[lang].booking}
            </button>
            <button
              className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}>
        {NAV_ITEMS_VISIBLE.map((item) => (
          <button key={item.label} onClick={() => handleNav(item.href)} className={styles.mobileLink}>
            {NAV_LABELS[lang]?.[item.href] ?? item.label}
          </button>
        ))}
        <button
          className={styles.mobileBookBtn}
          onClick={() => {
            setMenuOpen(false)
            onBooking()
          }}
        >
          {LANG_LABELS[lang].bookingMobile}
        </button>
      </div>
    </header>
  )
}
