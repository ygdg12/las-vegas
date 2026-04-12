import { useInView } from '../hooks/useInView.js'
import styles from './GrilliataDiPesce.module.css'
import { useLang } from '../i18n/LanguageContext.jsx'

const VIDEO_SRC = '/videos/grillata-pesce.mp4'

const COPY = {
  it: {
    tag: 'Dalla nostra cucina',
    lead:
      'La nostra grilliata di pesce mette al centro il prodotto dell’Adriatico: selezione quotidiana, cottura sulla brace e sapori essenziali.',
    bullets: [
      'Pesce fresco scelto ogni mattina dai nostri fornitori di fiducia',
      'Griglia e brace per esaltare crosta e succosità senza coprire il mare',
      'Contorni di stagione e olio extravergine delle Marche',
    ],
    closing: 'Un’esperienza conviviale, ideale da condividere in tavola dopo antipasti e primi di mare.',
  },
  en: {
    tag: 'From our kitchen',
    lead:
      'Our seafood grill celebrates the Adriatic: a daily selection, open-flame cooking, and honest flavors that let the fish speak for itself.',
    bullets: [
      'Fresh fish chosen each morning from trusted local suppliers',
      'Grill and embers for the right crust and juiciness—never masking the sea',
      'Seasonal sides and Marche extra virgin olive oil',
    ],
    closing: 'A convivial experience, perfect to share at the table after seafood starters and first courses.',
  },
}

export default function GrilliataDiPesce() {
  const [ref, inView] = useInView()
  const { lang } = useLang()
  const t = COPY[lang] ?? COPY.it

  return (
    <section id="grillata" className={`${styles.section} section section--alt`}>
      <div ref={ref} className={styles.shell}>
        <div className={`${styles.grid} ${inView ? styles.gridInView : ''}`}>
          <div className={styles.colText}>
            <div className={styles.tag}>
              <div className={styles.tagLine} aria-hidden />
              <span>{t.tag}</span>
            </div>
            <h2 className={styles.title}>
              <em>Grilliata</em> di pesce
            </h2>
            <p className={styles.lead}>{t.lead}</p>
            <ul className={styles.bullets}>
              {t.bullets.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <p className={styles.closing}>{t.closing}</p>
          </div>

          <div className={styles.colVideo}>
            <div className={styles.videoShell}>
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
        </div>
      </div>
    </section>
  )
}
