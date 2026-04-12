import { useInView } from '../hooks/useInView.js'
import scampiFresh from '../assets/adriatic/scampi-fresh.png'
import grilledScampi from '../assets/adriatic/grilled-scampi.png'
import styles from './AdriaticFish.module.css'
import { useLang } from '../i18n/LanguageContext.jsx'

/** Your photos from `src/assets/adriatic/` (add more PNGs here to extend the mosaic). */
const TILES = [
  {
    id: 'fresh',
    src: scampiFresh,
    altIt: 'Scampi freschi dell\u2019Adriatico',
    altEn: 'Fresh Adriatic langoustines',
  },
  {
    id: 'grill',
    src: grilledScampi,
    altIt: 'Scampi alla griglia',
    altEn: 'Grilled langoustines',
  },
]

const COPY = {
  it: {
    phrase: 'Pesce fresco dal mare Adriatico',
    phraseSub: 'La nostra idea di mare',
    body: [
      'Selezioniamo il pesce ogni giorno: relazione diretta con i pescatori e massima attenzione alla filiera corta.',
      'In sala portiamo il sapore dell’Adriatico — dalla crudità alla griglia — con rispetto per il prodotto e per chi lo cucina.',
    ],
  },
  en: {
    phrase: 'Fresh fish from the Adriatic Sea',
    phraseSub: 'Our vision of the sea',
    body: [
      'We choose our fish daily: close ties with suppliers and a short chain from the water to your plate.',
      'In the dining room we bring the Adriatic to you—from raw preparations to the grill—with respect for the product and for the craft.',
    ],
  },
}

export default function AdriaticFish() {
  const [ref, inView] = useInView()
  const { lang } = useLang()
  const t = COPY[lang] ?? COPY.it

  return (
    <section id="adriatic" className={`${styles.section} section`}>
      <div ref={ref} className={styles.shell}>
        <header className={`${styles.head} ${inView ? styles.headInView : ''}`}>
          <p className={styles.eyebrow}>{t.phraseSub}</p>
          <h2 className={styles.title}>{t.phrase}</h2>
        </header>

        <div className={`${styles.mosaic} ${inView ? styles.mosaicInView : ''}`}>
          {TILES.map((tile, i) => (
            <figure
              key={tile.id}
              className={styles.tile}
              style={{ transitionDelay: `${0.06 + i * 0.08}s` }}
            >
              <img
                src={tile.src}
                alt={lang === 'en' ? tile.altEn : tile.altIt}
                loading="lazy"
                decoding="async"
                className={styles.tileImg}
              />
              <figcaption className={styles.tileCap}>{lang === 'en' ? tile.altEn : tile.altIt}</figcaption>
            </figure>
          ))}
        </div>

        <div className={`${styles.prose} ${inView ? styles.proseInView : ''}`}>
          {t.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  )
}
