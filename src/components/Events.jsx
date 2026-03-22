import { useInView } from '../hooks/useInView.js'
import { EVENTS } from '../assets/data.js'
import styles from './Events.module.css'
import { useLang } from '../i18n/LanguageContext.jsx'

export default function Events() {
  const [ref, inView] = useInView()
  const { lang } = useLang()

  return (
    <section id="eventi" className={`${styles.events} section`}>
      <div ref={ref} className={`${styles.header} ${inView ? styles.inView : ''}`}>
        <div className={styles.tag}>
          <div className={styles.tagLine} />
          <span>{lang === 'en' ? 'Events & News' : 'Eventi & News'}</span>
        </div>
        <h2 className={styles.title}>
          {lang === 'en' ? (
            <>
              Upcoming <em>Appointments</em>
            </>
          ) : (
            <>
              Prossimi <em>Appuntamenti</em>
            </>
          )}
        </h2>
        <p className={styles.subtitle}>
          {lang === 'en'
            ? 'Don’t miss our special evenings, live cooking shows, and themed dinners'
            : 'Non perdere le nostre serate speciali, show cooking e cene a tema'}
        </p>
      </div>

      <div className={styles.grid}>
        {/* Featured large event */}
        <div className={`${styles.featured} ${inView ? styles.inView : ''}`}>
          <div className={styles.featuredImg}>
            <img src={EVENTS[0].image} alt={EVENTS[0].title} />
            <div className={styles.featuredOverlay} />
          </div>
          <div className={styles.featuredContent}>
            <div className={styles.featuredDate}>
              <span className={styles.featuredDay}>{EVENTS[0].day}</span>
              <span className={styles.featuredMonth}>{EVENTS[0].month}</span>
              <span className={styles.featuredYear}>{EVENTS[0].year}</span>
            </div>
            <div className={styles.featuredTag}>{lang === 'en' ? (EVENTS[0].tagEn ?? EVENTS[0].tag) : EVENTS[0].tag}</div>
            <div className={styles.featuredTitle}>{lang === 'en' ? (EVENTS[0].titleEn ?? EVENTS[0].title) : EVENTS[0].title}</div>
            <div className={styles.featuredDesc}>{lang === 'en' ? (EVENTS[0].descEn ?? EVENTS[0].desc) : EVENTS[0].desc}</div>
            <button className={styles.featuredBtn}>{lang === 'en' ? 'Book for the event' : "Prenota per l'evento"}</button>
          </div>
        </div>

        {/* Other events */}
        <div className={styles.list}>
          {EVENTS.slice(1).map((ev, i) => (
            <div
              key={ev.title}
              className={`${styles.eventCard} ${inView ? styles.inView : ''}`}
              style={{ transitionDelay: `${(i + 1) * 0.1}s` }}
            >
              <div className={styles.eventImgWrap}>
                <img src={ev.image} alt={ev.title} />
              </div>
              <div className={styles.eventBody}>
                <div className={styles.eventDate}>
                  <span className={styles.eventDay}>{ev.day}</span>
                  <span className={styles.eventMonth}>{ev.month}</span>
                </div>
                <div className={styles.eventInfo}>
                  <div className={styles.eventTag}>{lang === 'en' ? (ev.tagEn ?? ev.tag) : ev.tag}</div>
                  <div className={styles.eventTitle}>{lang === 'en' ? (ev.titleEn ?? ev.title) : ev.title}</div>
                  <div className={styles.eventDesc}>{lang === 'en' ? (ev.descEn ?? ev.desc) : ev.desc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
