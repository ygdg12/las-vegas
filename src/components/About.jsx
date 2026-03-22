import { useInView } from '../hooks/useInView.js'
import { IMAGES } from '../assets/images.js'
import { IconFlame, IconFish, IconUtensils, IconWine } from './Icons.jsx'
import styles from './About.module.css'
import { useLang } from '../i18n/LanguageContext.jsx'

const FEATURES = {
  it: [
    { icon: <IconFlame size={22} />, title: 'Pizza al Forno a Legna', desc: 'Impasto a lunga lievitazione naturale, 48 ore di maturazione, cottura in forno a legna' },
    { icon: <IconFish size={22} />, title: 'Pesce dell\'Adriatico', desc: 'Selezione giornaliera del pescato fresco dall\'Adriatico dai migliori fornitori locali' },
    { icon: <IconUtensils size={22} />, title: 'Carne di Qualità', desc: 'Tagli pregiati selezionati, griglia a legna, ricette della tradizione marchigiana' },
    { icon: <IconWine size={22} />, title: 'Cantina Curata', desc: 'Oltre 20 etichette di vini locali e nazionali, Verdicchio, Rosso Conero e molto altro' },
  ],
  en: [
    { icon: <IconFlame size={22} />, title: 'Wood-Fired Pizza', desc: 'Long natural fermentation dough, 48 hours of maturation, baked in a wood-fired oven' },
    { icon: <IconFish size={22} />, title: 'Adriatic Sea Fish', desc: 'Daily selection of fresh Adriatic catch from the best local suppliers' },
    { icon: <IconUtensils size={22} />, title: 'Quality Meat', desc: 'Selected premium cuts, wood-grilled, with recipes from the Marche tradition' },
    { icon: <IconWine size={22} />, title: 'Curated Wine Cellar', desc: 'More than 20 labels of local and national wines, including Verdicchio and Rosso Conero, and more' },
  ],
}

export default function About() {
  const { lang } = useLang()
  const [ref1, inView1] = useInView()
  const [ref2, inView2] = useInView()
  const featureList = FEATURES[lang === 'en' ? 'en' : 'it']

  return (
    <section id="azienda" className={`${styles.about} section section--alt`}>
      <div className={styles.grid}>
        {/* Visual side */}
        <div ref={ref1} className={`${styles.visual} ${inView1 ? styles.inView : ''}`}>
          <div className={styles.imgMain}>
            <img src={IMAGES.history} alt="La nostra storia" />
            <div className={styles.imgMainOverlay} />
          </div>
          <div className={styles.imgSecond}>
            <img src={IMAGES.chefPizza} alt="Il nostro pizzaiolo" />
          </div>
          <div className={styles.badge}>
            <span className={styles.badgeYear}>2015</span>
            <span className={styles.badgeLine}>{lang === 'en' ? 'Founded in' : 'Fondato a'}</span>
            <span className={styles.badgeSub}>Falconara M.</span>
          </div>
          <div className={styles.floatCard}>
            <div className={styles.floatCardNum}>100%</div>
            <div className={styles.floatCardLabel}>{lang === 'en' ? 'Fresh Ingredients' : 'Ingredienti Freschi'}</div>
          </div>
        </div>

        {/* Text side */}
        <div ref={ref2} className={`${styles.text} ${inView2 ? styles.inView : ''}`}>
          <div className={styles.sectionTag}>
            <div className={styles.tagLine} />
            <span>{lang === 'en' ? 'Our Story' : 'La Nostra Storia'}</span>
          </div>

          <h2 className={styles.title}>
            {lang === 'en' ? (
              <>
                A place where every<br />
                meal becomes<br />
                <em>an experience</em>
              </>
            ) : (
              <>
                Un luogo dove ogni<br />
                pasto diventa<br />
                <em>un'esperienza</em>
              </>
            )}
          </h2>

          <p className={styles.desc}>
            {lang === 'en'
              ? 'Las Vegas was born in 2015, the result of years of experience gained by Clirim in the hospitality of the Conero Riviera. A journey through authentic flavors that celebrates freshness and quality.'
              : "Las Vegas nasce nel 2015, frutto di anni di esperienza maturati da Clirim nella ristorazione della Riviera del Conero. Un viaggio attraverso sapori autentici che celebra la freschezza e la qualità delle materie prime."}
          </p>

          <p className={styles.desc}>
            {lang === 'en'
              ? "Specialized in fish-based dishes, we’re proud to offer a menu that goes from sea delights to meat dishes, without forgetting our long-natural-fermentation pizza—our house pride."
              : 'Specializzati in piatti a base di pesce, siamo orgogliosi di offrire un menù che spazia dalle delizie di mare ai piatti di carne, senza dimenticare la nostra pizza a lunga lievitazione naturale, fiore all\'occhiello della casa.'}
          </p>

          <div className={styles.features}>
            {featureList.map((f, i) => (
              <div key={f.title} className={styles.feature} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className={styles.featureIcon}>{f.icon}</div>
                <div>
                  <div className={styles.featureTitle}>{f.title}</div>
                  <div className={styles.featureDesc}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.stats}>
            {[
              { n: '10+', l: lang === 'en' ? 'Years of pizza maker experience' : 'Anni di esperienza del pizzaiolo' },
              { n: '100+', l: lang === 'en' ? 'Items on the menu' : 'Voci nel menù' },
              { n: '★ 4.8', l: lang === 'en' ? 'Average customer rating' : 'Rating medio clienti' },
            ].map((s, i) => (
              <div key={s.l} className={styles.stat}>
                <div className={styles.statNum}>{s.n}</div>
                <div className={styles.statLabel}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
