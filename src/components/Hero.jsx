import { useEffect, useState } from 'react'
import { IMAGES } from '../assets/images.js'
import { IconClock, IconMapPin, IconPhone, IconClosed, IconArrowRight } from './Icons.jsx'
import styles from './Hero.module.css'
import { useLang } from '../i18n/LanguageContext.jsx'

const SLIDES = {
  it: [
    {
      image: IMAGES.hero,
      headline: ['LAS', 'VEGAS'],
      sub: 'Cucina Italiana · Carne e Pesce',
      tag: 'Dal 2015 · Falconara Marittima',
    },
    {
      image: IMAGES.pizzaOven,
      headline: ['PIZZA', 'FORNO A LEGNA'],
      sub: 'Impasto a lunga lievitazione · Vera mozzarella',
      tag: 'Il nostro orgoglio',
    },
    {
      image: IMAGES.seafoodPlate,
      headline: ['FRUTTI', 'DI MARE'],
      sub: 'Pesce fresco dall\'Adriatico ogni giorno',
      tag: 'La nostra specialità',
    },
  ],
  en: [
    {
      image: IMAGES.hero,
      headline: ['LAS', 'VEGAS'],
      sub: 'Italian Cuisine · Meat and Fish',
      tag: 'Since 2015 · Falconara Marittima',
    },
    {
      image: IMAGES.pizzaOven,
      headline: ['WOOD-FIRED', 'PIZZA'],
      sub: 'Long fermentation · Genuine mozzarella',
      tag: 'Our pride',
    },
    {
      image: IMAGES.seafoodPlate,
      headline: ['FRUTTI', 'DI MARE'],
      sub: 'Fresh seafood from the Adriatic every day',
      tag: 'Our specialty',
    },
  ],
}

export default function Hero({ onBooking }) {
  const { lang } = useLang()
  const [current, setCurrent] = useState(0)
  const [transitioning, setTransitioning] = useState(false)
  const slides = SLIDES[lang] || SLIDES.it
  const slideCount = SLIDES.it.length

  useEffect(() => {
    const timer = setInterval(() => {
      setTransitioning(true)
      setTimeout(() => {
        setCurrent((c) => (c + 1) % slideCount)
        setTransitioning(false)
      }, 600)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const slide = slides[current]

  return (
    <section id="home" className={styles.hero}>
      {/* Background slides */}
      <div className={`${styles.bgWrap} ${transitioning ? styles.bgFade : ''}`}>
        <img
          src={slide.image}
          alt="Las Vegas Ristorante"
          className={styles.bgImg}
        />
        <div className={styles.bgOverlay} />
        <div className={styles.bgGradient} />
      </div>

      {/* Noise texture */}
      <div className={styles.noise} />

      {/* Grid lines */}
      <div className={styles.grid} />

      {/* Corner decorations */}
      <div className={styles.cornerTL} />
      <div className={styles.cornerBR} />

      {/* Content */}
      <div className={styles.content}>
        <div className={`${styles.eyebrow} ${transitioning ? styles.fadeOut : styles.fadeIn}`}>
          <div className={styles.eyebrowLine} />
          <span>{slide.tag}</span>
          <div className={styles.eyebrowLine} />
        </div>

        <h1 className={`${styles.title} ${transitioning ? styles.fadeOut : styles.fadeIn}`}>
          {slide.headline.map((line, i) => (
            <span key={i} className={styles.titleLine} style={{ animationDelay: `${i * 0.08}s` }}>
              {line}
            </span>
          ))}
        </h1>

        <p className={`${styles.subtitle} ${transitioning ? styles.fadeOut : styles.fadeIn}`}>
          {slide.sub}
        </p>

        <div className={`${styles.actions} ${transitioning ? styles.fadeOut : styles.fadeIn}`}>
          <button className={styles.primaryBtn} onClick={onBooking}>
            <span>{lang === 'en' ? 'Book a Table' : 'Prenota un Tavolo'}</span>
            <IconArrowRight size={16} />
          </button>
          <button className={styles.secondaryBtn} onClick={() => document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' })}>
            {lang === 'en' ? 'Discover the Menu' : 'Scopri il Menù'}
          </button>
        </div>

        {/* Ratings strip */}
        <div className={styles.ratingsStrip}>
          <div className={styles.rating}>
            <div className={styles.stars}>★★★★★</div>
            <div className={styles.ratingSource}>{lang === 'en' ? 'Google Reviews' : 'Recensioni Google'}</div>
          </div>
          <div className={styles.ratingDiv} />
          <div className={styles.rating}>
            <div className={styles.stars}>★★★★★</div>
            <div className={styles.ratingSource}>{lang === 'en' ? 'TripAdvisor #13' : 'TripAdvisor #13'}</div>
          </div>
          <div className={styles.ratingDiv} />
          <div className={styles.rating}>
            <div className={styles.stars}>9.2 / 10</div>
            <div className={styles.ratingSource}>TheFork</div>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className={styles.indicators}>
        {slides.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>

      {/* Scroll hint */}
      <div className={styles.scrollHint}>
        <div className={styles.scrollLine} />
        <span>{lang === 'en' ? 'Scroll' : 'Scorri'}</span>
      </div>

      {/* Info bar */}
      <div className={styles.infoBar}>
        {[
          {
            icon: <IconClock size={20} />,
            label: lang === 'en' ? 'Hours' : 'Orari',
            val: lang === 'en' ? 'Mon–Sat 19–24 · Sun 12–24' : 'Lun–Sab 19–24 · Dom 12–24',
          },
          {
            icon: <IconMapPin size={20} />,
            label: lang === 'en' ? 'Address' : 'Indirizzo',
            val: 'Via Nino Bixio 112, Falconara M.',
          },
          { icon: <IconPhone size={20} />, label: lang === 'en' ? 'Phone' : 'Telefono', val: '+39 071 912980' },
          { icon: <IconClosed size={20} />, label: lang === 'en' ? 'Closed' : 'Chiuso', val: lang === 'en' ? 'Tuesday' : 'Martedì' },
        ].map((item) => (
          <div key={item.label} className={styles.infoItem}>
            <span className={styles.infoIcon}>{item.icon}</span>
            <div>
              <div className={styles.infoLabel}>{item.label}</div>
              <div className={styles.infoVal}>{item.val}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
