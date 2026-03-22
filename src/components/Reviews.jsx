import { useState, useEffect } from 'react'
import { useInView } from '../hooks/useInView.js'
import { REVIEWS } from '../assets/data.js'
import styles from './Reviews.module.css'
import { useLang } from '../i18n/LanguageContext.jsx'

export default function Reviews() {
  const [current, setCurrent] = useState(0)
  const [ref, inView] = useInView()
  const { lang } = useLang()

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % REVIEWS.length), 5000)
    return () => clearInterval(t)
  }, [])

  return (
    <section className={`${styles.reviews} section section--alt`}>
      <div ref={ref} className={`${styles.inner} ${inView ? styles.inView : ''}`}>
        {/* Left: rating summary */}
        <div className={styles.summary}>
          <div className={styles.bigRating}>4.8</div>
          <div className={styles.stars}>★★★★★</div>
          <div className={styles.ratingLabel}>{lang === 'en' ? 'Review summary' : 'Media recensioni'}</div>

          <div className={styles.platforms}>
            {[
              { name: 'Google', stars: 5, count: '47' },
              { name: 'TheFork', stars: 5, count: '9.2/10' },
              { name: 'TripAdvisor', stars: 5, count: '#13' },
            ].map(p => (
              <div key={p.name} className={styles.platform}>
                <div className={styles.platformName}>{p.name}</div>
                <div className={styles.platformStars}>{'★'.repeat(p.stars)}</div>
                <div className={styles.platformCount}>{p.count}</div>
              </div>
            ))}
          </div>

          <div className={styles.tag}>
            <div className={styles.tagLine} />
            <span>{lang === 'en' ? 'Customer Reviews' : 'Recensioni Clienti'}</span>
          </div>
          <h2 className={styles.title}>
            {lang === 'en' ? (
              <>
                What they say<br /><em>about us</em>
              </>
            ) : (
              <>
                Cosa dicono<br /><em>di noi</em>
              </>
            )}
          </h2>
        </div>

        {/* Right: review carousel */}
        <div className={styles.carousel}>
          <div className={styles.quoteIcon}>"</div>
          <div className={styles.reviewText} key={current}>
            {lang === 'en' ? (REVIEWS[current].textEn ?? REVIEWS[current].text) : REVIEWS[current].text}
          </div>
          <div className={styles.reviewer}>
            <div className={styles.reviewerAvatar}>
              {REVIEWS[current].name.charAt(0)}
            </div>
            <div>
              <div className={styles.reviewerName}>{REVIEWS[current].name}</div>
              <div className={styles.reviewerMeta}>
                {(lang === 'en' ? (REVIEWS[current].dateEn ?? REVIEWS[current].date) : REVIEWS[current].date)} · {REVIEWS[current].platform}
              </div>
            </div>
            <div className={styles.reviewStars}>{'★'.repeat(REVIEWS[current].rating)}</div>
          </div>

          <div className={styles.dots}>
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
                onClick={() => setCurrent(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
