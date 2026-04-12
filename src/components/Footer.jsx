import { RESTAURANT_INFO, NAV_ITEMS } from '../assets/data.js'
import { IconFacebook, IconCompass, IconUtensils, IconPhone, IconMobile, IconMail, IconMapPin, IconClock } from './Icons.jsx'
import styles from './Footer.module.css'
import { useLang } from '../i18n/LanguageContext.jsx'

export default function Footer({ onBooking }) {
  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }
  const { lang } = useLang()

  const navLabelByHref = {
    it: {
      '#home': 'Home',
      '#azienda': 'Azienda',
      '#pizze': 'Pizze',
      '#grillata': 'Grilliata di pesce',
      '#galleria': 'Galleria',
      '#contatti': 'Contatti',
    },
    en: {
      '#home': 'Home',
      '#azienda': 'About Us',
      '#pizze': 'Pizzas',
      '#grillata': 'Grilliata di pesce',
      '#galleria': 'Gallery',
      '#contatti': 'Contact',
    },
  }

  return (
    <footer className={styles.footer}>
      {/* CTA Banner */}
      <div className={styles.ctaBanner}>
        <div className={styles.ctaContent}>
          <div className={styles.ctaText}>
            <h3 className={styles.ctaTitle}>
              {lang === 'en' ? 'Ready to welcome you tonight?' : 'Pronti ad accogliervi questa sera?'}
            </h3>
            <p className={styles.ctaSub}>
              {lang === 'en'
                ? 'Book your table and enjoy a unique experience of authentic Italian cuisine'
                : "Prenotate il vostro tavolo e vivete un'esperienza unica di cucina italiana autentica"}
            </p>
          </div>
          <div className={styles.ctaActions}>
            <button className={styles.ctaBtn} onClick={onBooking}>
              {lang === 'en' ? 'Book Now' : 'Prenota Ora'}
            </button>
            <a href="tel:+390071912980" className={styles.ctaPhone}>
              {lang === 'en' ? 'or call +39 071 912980' : 'o chiama +39 071 912980'}
            </a>
          </div>
        </div>
      </div>

      <div className={styles.main}>
        <div className={styles.top}>
          {/* Brand */}
          <div className={styles.brand}>
            <div className={styles.logo}>Las Vegas</div>
            <div className={styles.logoSub}>{lang === 'en' ? 'Restaurant Pizzeria' : 'Ristorante Pizzeria'}</div>
            <p className={styles.brandDesc}>
              {lang === 'en'
                ? "Authentic Italian cuisine, fresh fish and fresh meat from the Adriatic. Wood-fired pizza with long fermentation."
                : "Cucina italiana autentica, pesce e carne fresca dall'Adriatico. Pizza al forno a legna a lunga lievitazione."}
            </p>
            <div className={styles.socials}>
              <a href={RESTAURANT_INFO.social.facebook} target="_blank" rel="noopener noreferrer" className={styles.social} aria-label="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a
                href="https://www.tripadvisor.com/Restaurant_Review-g946271-d12282276-Reviews-Las_Vegas_Ristorante-Falconara_Marittima_Province_of_Ancona_Marche.html"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.social}
                aria-label="TripAdvisor"
              >
                <IconCompass size={16} />
              </a>
              <a
                href="https://www.thefork.com/restaurant/las-vegas-r816798"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.social}
                aria-label="TheFork"
              >
                <IconUtensils size={16} />
              </a>
            </div>
          </div>

          {/* Nav */}
          <div className={styles.col}>
            <div className={styles.colTitle}>{lang === 'en' ? 'Navigation' : 'Navigazione'}</div>
            <ul className={styles.colLinks}>
              {NAV_ITEMS.map(item => (
                <li key={item.label}>
                  <button onClick={() => scrollTo(item.href)} className={styles.colLink}>
                    {navLabelByHref[lang][item.href] ?? item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div className={styles.col}>
            <div className={styles.colTitle}>{lang === 'en' ? 'Hours' : 'Orari'}</div>
            <div className={styles.hours}>
              <div className={styles.hourRow}>
                <span>{lang === 'en' ? 'Monday – Saturday' : 'Lunedì – Sabato'}</span>
                <span>19:00 – 24:00</span>
              </div>
              <div className={styles.hourRow}>
                <span>{lang === 'en' ? 'Sunday' : 'Domenica'}</span>
                <span>12:00 – 24:00</span>
              </div>
              <div className={`${styles.hourRow} ${styles.hourClosed}`}>
                <span>{lang === 'en' ? 'Tuesday' : 'Martedì'}</span>
                <span>{lang === 'en' ? 'Closed' : 'Chiuso'}</span>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className={styles.col}>
            <div className={styles.colTitle}>{lang === 'en' ? 'Contact' : 'Contatti'}</div>
            <div className={styles.contacts}>
              <a href="tel:+390071912980" className={styles.contactItem}><IconPhone size={14} /> +39 071 912980</a>
              <a href="tel:+393470141184" className={styles.contactItem}><IconMobile size={14} /> 347 0141184</a>
              <a href="tel:+393450430461" className={styles.contactItem}><IconMobile size={14} /> 345 0430461</a>
              <a href="mailto:info@lasvegasfalconara.it" className={styles.contactItem}><IconMail size={14} /> info@lasvegasfalconara.it</a>
              <div className={styles.contactItem}><IconMapPin size={14} /> Via Nino Bixio 112<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Falconara Marittima (AN)</div>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.bottomLeft}>
            © {new Date().getFullYear()} Las Vegas di Clirim Hepaj & C. s.n.c. · P.IVA {RESTAURANT_INFO.vat}
          </div>
          <div className={styles.bottomRight}>
            <button className={styles.legalLink}>{lang === 'en' ? 'Cookie & Policy' : 'Cookie & Policy'}</button>
            <span className={styles.legalDot}>·</span>
            <button className={styles.legalLink}>{lang === 'en' ? 'Privacy Policy' : 'Informativa Privacy'}</button>
            <span className={styles.legalDot}>·</span>
            <span style={{ color: 'var(--muted)', fontSize: '12px' }}>
              {lang === 'en' ? 'Made with ❤️ in Falconara' : 'Fatto con ❤️ a Falconara'}
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
