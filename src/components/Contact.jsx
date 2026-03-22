import { useInView } from '../hooks/useInView.js'
import { RESTAURANT_INFO } from '../assets/data.js'
import { IMAGES } from '../assets/images.js'
import { IconMapPin, IconPhone, IconMail, IconClock, IconClosed, IconNavigation, IconFacebook, IconCompass, IconUtensils } from './Icons.jsx'
import styles from './Contact.module.css'
import { useLang } from '../i18n/LanguageContext.jsx'

export default function Contact({ onBooking }) {
  const [ref, inView] = useInView()
  const { lang } = useLang()
  const hours = lang === 'en'
    ? {
        weekdays: 'Mon–Sat: 19:00 – 24:00',
        sunday: 'Sunday: 12:00 – 24:00',
        closed: 'Tuesday: Closed',
      }
    : RESTAURANT_INFO.hours

  return (
    <section id="contatti" className={`${styles.contact} section section--dark3`}>
      <div ref={ref} className={`${styles.inner} ${inView ? styles.inView : ''}`}>
        {/* Left: info */}
        <div className={styles.info}>
          <div className={styles.tag}>
            <div className={styles.tagLine} />
            <span>{lang === 'en' ? 'Contact' : 'Contatti'}</span>
          </div>
          <h2 className={styles.title}>
            {lang === 'en' ? (
              <>
                Come and <em>visit us</em>
              </>
            ) : (
              <>
                Vieni a <em>Trovarci</em>
              </>
            )}
          </h2>
          <p className={styles.subtitle}>
            {lang === 'en'
              ? "We’re in Falconara Marittima, just a few minutes from the Ancona-Falconara airport.<br />Recommended reservation, especially on weekends.<br />fresh fish and fresh meat, prepared daily."
              : "Siamo a Falconara Marittima, a pochi minuti dall'aeroporto Ancona-Falconara.<br />Prenotazione consigliata, specialmente nel weekend."}
          </p>

          <div className={styles.details}>
            {[
              {
                icon: <IconMapPin size={20} />,
                label: lang === 'en' ? 'Address' : 'Indirizzo',
                content: <>{RESTAURANT_INFO.address}<br />{RESTAURANT_INFO.city}</>,
              },
              {
                icon: <IconPhone size={20} />,
                label: lang === 'en' ? 'Phone' : 'Telefono',
                content: (
                  <>
                    <a href={`tel:${RESTAURANT_INFO.phone.replace(/\s/g, '')}`}>{RESTAURANT_INFO.phone}</a><br />
                    <a href={`tel:+39${RESTAURANT_INFO.cell1.replace(/\s/g, '')}`}>Cell. {RESTAURANT_INFO.cell1}</a><br />
                    <a href={`tel:+39${RESTAURANT_INFO.cell2.replace(/\s/g, '')}`}>Cell. {RESTAURANT_INFO.cell2}</a>
                  </>
                ),
              },
              {
                icon: <IconMail size={20} />,
                label: 'Email',
                content: <a href={`mailto:${RESTAURANT_INFO.email}`}>{RESTAURANT_INFO.email}</a>,
              },
              {
                icon: <IconClock size={20} />,
                label: lang === 'en' ? 'Hours' : 'Orari',
                content: (
                  <>
                    {hours.weekdays}<br />
                    {hours.sunday}<br />
                    <span className={styles.closed}>{hours.closed}</span>
                  </>
                ),
              },
            ].map((item) => (
              <div key={item.label} className={styles.detailItem}>
                <div className={styles.detailIcon}>{item.icon}</div>
                <div>
                  <div className={styles.detailLabel}>{item.label}</div>
                  <div className={styles.detailValue}>{item.content}</div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.actions}>
            <button className={styles.primaryBtn} onClick={onBooking}>
              <IconUtensils size={16} /> {lang === 'en' ? 'Book a Table' : 'Prenota un Tavolo'}
            </button>
            <a href={`https://www.google.com/maps/search/?api=1&query=Via+Nino+Bixio+112+Falconara+Marittima`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mapBtn}>
              <IconNavigation size={16} /> {lang === 'en' ? 'Directions' : 'Indicazioni stradali'}
            </a>
          </div>

          <div className={styles.social}>
            <a href={RESTAURANT_INFO.social.facebook} target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>
              <IconFacebook size={16} /> Facebook
            </a>
            <a
              href="https://www.tripadvisor.com/Restaurant_Review-g946271-d12282276-Reviews-Las_Vegas_Ristorante-Falconara_Marittima_Province_of_Ancona_Marche.html"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialBtn}
            >
              <IconCompass size={16} /> TripAdvisor
            </a>
            <a
              href="https://www.thefork.com/restaurant/las-vegas-r816798"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialBtn}
            >
              <IconUtensils size={16} /> TheFork
            </a>
          </div>
        </div>

        {/* Right: map + photo */}
        <div className={styles.mapSide}>
          <div className={styles.mapImg}>
            <img src="/gallery/photo_3.png" alt="Las Vegas dining" />
            <div className={styles.mapOverlay} />
            <div className={styles.mapBadge}>
              <div className={styles.mapPin}>📍</div>
              <div className={styles.mapBadgeText}>
                <div className={styles.mapBadgeName}>Las Vegas</div>
                <div className={styles.mapBadgeAddr}>Via Nino Bixio 112</div>
              </div>
            </div>
          </div>

          <div className={styles.mapFrame}>
            <div className={styles.mapFrameInner}>
              <div className={styles.mapGrid} />
              <div className={styles.mapDot} />
              <div className={styles.mapRipple} />
              <div className={styles.mapLabel}>
                <div className={styles.mapLabelName}>Falconara Marittima</div>
                <div className={styles.mapLabelAddr}>Via Nino Bixio, 112 · Ancona</div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Via+Nino+Bixio+112+Falconara+Marittima"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mapLink}
                >
                  {lang === 'en' ? 'Open in Google Maps →' : 'Apri in Google Maps →'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
