import { useState } from 'react'
import { useInView } from '../hooks/useInView.js'
import { GALLERY } from '../assets/data.js'
import styles from './Gallery.module.css'
import { useLang } from '../i18n/LanguageContext.jsx'

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null)
  const [ref, inView] = useInView()
  const { lang } = useLang()

  const getLabel = (item) => (lang === 'en' ? (item.labelEn ?? item.label) : item.label)

  return (
    <section id="galleria" className={`${styles.gallery} section section--dark3`}>
      <div ref={ref} className={`${styles.header} ${inView ? styles.inView : ''}`}>
        <div className={styles.tag}>
          <div className={styles.tagLine} />
          <span>{lang === 'en' ? 'Photo Gallery' : 'Fotogallery'}</span>
          <div className={styles.tagLine} />
        </div>
        <h2 className={styles.title}>
          {lang === 'en' ? (
            <>
              A look <em>around the venue</em>
            </>
          ) : (
            <>
              Sguardo <em>sul locale</em>
            </>
          )}
        </h2>
        <p className={styles.subtitle}>
          {lang === 'en'
            ? 'Welcoming spaces, carefully prepared dishes, and a unique atmosphere overlooking the Adriatic'
            : "Ambienti accoglienti, piatti curati e un'atmosfera unica affacciata sull'Adriatico"}
        </p>
      </div>

      {/* Masonry-style grid */}
      <div className={`${styles.grid} ${inView ? styles.gridVisible : ''}`}>
        {GALLERY.map((item, i) => (
          <div
            key={item.id}
            className={`${styles.cell} ${item.span === 'wide' ? styles.wide : ''}`}
            style={{ transitionDelay: `${i * 0.07}s` }}
            onClick={() => setLightbox(item)}
          >
            <div className={styles.cellInner}>
              <img src={item.image} alt={getLabel(item)} loading="lazy" />
              <div className={styles.cellOverlay} />
              <div className={styles.cellContent}>
                <div className={styles.cellZoom}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35M11 8v6M8 11h6" />
                  </svg>
                </div>
                <div className={styles.cellLabel}>{getLabel(item)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className={styles.lightbox} onClick={() => setLightbox(null)}>
          <button className={styles.lightboxClose} onClick={() => setLightbox(null)}>✕</button>
          <div className={styles.lightboxInner} onClick={e => e.stopPropagation()}>
            <img src={lightbox.image} alt={getLabel(lightbox)} />
            <div className={styles.lightboxLabel}>{getLabel(lightbox)}</div>
          </div>
        </div>
      )}
    </section>
  )
}
