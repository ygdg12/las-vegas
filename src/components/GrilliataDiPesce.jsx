import { useInView } from '../hooks/useInView.js'
import styles from './GrilliataDiPesce.module.css'
import { useLang } from '../i18n/LanguageContext.jsx'

const VIDEO_SRC = '/videos/grillata-pesce.mp4'

export default function GrilliataDiPesce() {
  const [ref, inView] = useInView()
  const { lang } = useLang()

  return (
    <section id="grillata" className={`${styles.section} section section--alt`}>
      <div ref={ref} className={`${styles.header} ${inView ? styles.inView : ''}`}>
        <div className={styles.tag}>
          <div className={styles.tagLine} />
          <span>{lang === 'en' ? 'From our kitchen' : 'Dalla nostra cucina'}</span>
          <div className={styles.tagLine} />
        </div>
        <h2 className={styles.title}>
          <em>Grilliata</em> di pesce
        </h2>
        <p className={styles.subtitle}>
          {lang === 'en'
            ? 'Fresh Adriatic fish on the grill — a taste of the sea, straight from our kitchen to your table.'
            : 'Pesce fresco dell’Adriatico alla griglia — il sapore del mare, dalla nostra cucina alla tua tavola.'}
        </p>
      </div>

      <div className={`${styles.videoWrap} ${inView ? styles.visible : ''}`}>
        <div className={styles.videoFrame}>
          <span className={`${styles.cornerAccent} ${styles.cornerAccentTL}`} aria-hidden />
          <span className={`${styles.cornerAccent} ${styles.cornerAccentBR}`} aria-hidden />
          <video
            className={styles.video}
            controls
            playsInline
            preload="metadata"
            aria-label={lang === 'en' ? 'Grilliata di pesce video' : 'Video Grilliata di pesce'}
          >
            <source src={VIDEO_SRC} type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  )
}
