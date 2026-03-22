import { useState } from 'react'
import { useInView } from '../hooks/useInView.js'
import { PIZZE } from '../assets/data.js'
import { IconClock, IconLeaf, IconFlame, IconFish } from './Icons.jsx'
import styles from './Pizze.module.css'
import { useLang } from '../i18n/LanguageContext.jsx'

export default function Pizze() {
  const [hovered, setHovered] = useState(null)
  const [ref, inView] = useInView()
  const { lang } = useLang()

  return (
    <section id="pizze" className={`${styles.pizze} section`}>
      {/* Background decoration */}
      <div className={styles.bgDeco}>
        <div className={styles.bigCircle} />
        <div className={styles.smallCircle} />
      </div>

      <div ref={ref} className={`${styles.header} ${inView ? styles.inView : ''}`}>
        <div className={styles.tag}>
          <div className={styles.tagLine} />
          <span>{lang === 'en' ? 'Our Pizzas' : 'Le Nostre Pizze'}</span>
          <div className={styles.tagLine} />
        </div>
        <h2 className={styles.title}>
          {lang === 'en' ? (
            <>
              Wood-Fired <em>Pizza</em>
            </>
          ) : (
            <>
              Pizza <em>al Forno a Legna</em>
            </>
          )}
        </h2>
        <p className={styles.subtitle}>
          {lang === 'en'
            ? 'Long natural fermentation dough · Genuine mozzarella · Wood oven'
            : 'Impasto a lunga lievitazione naturale · Vera mozzarella · Forno a legna'}
        </p>
        <div className={styles.divider}>
          <span className={styles.dividerIcon}>✦</span>
        </div>
      </div>

      {/* Pizza showcase */}
      <div className={styles.showcase}>
        {/* Large feature card */}
        <div className={styles.featureCard}>
          <div className={styles.featureImg}>
            <img
              src={PIZZE[hovered !== null ? hovered : 0].image}
                alt={lang === 'en' ? (PIZZE[hovered !== null ? hovered : 0].nameEn ?? PIZZE[hovered !== null ? hovered : 0].name) : PIZZE[hovered !== null ? hovered : 0].name}
              key={hovered}
            />
            <div className={styles.featureImgOverlay} />
          </div>
          <div className={styles.featureInfo}>
              <div className={styles.featureTag}>
                {lang === 'en' ? (PIZZE[hovered !== null ? hovered : 0].tagEn ?? PIZZE[hovered !== null ? hovered : 0].tag) : PIZZE[hovered !== null ? hovered : 0].tag}
              </div>
              <div className={styles.featureName}>
                {lang === 'en' ? (PIZZE[hovered !== null ? hovered : 0].nameEn ?? PIZZE[hovered !== null ? hovered : 0].name) : PIZZE[hovered !== null ? hovered : 0].name}
              </div>
              <div className={styles.featureDesc}>
                {lang === 'en' ? (PIZZE[hovered !== null ? hovered : 0].descEn ?? PIZZE[hovered !== null ? hovered : 0].desc) : PIZZE[hovered !== null ? hovered : 0].desc}
              </div>
              <div className={styles.featurePrice}>{PIZZE[hovered !== null ? hovered : 0].price}</div>
          </div>
        </div>

        {/* Pizza grid */}
        <div className={styles.grid}>
          {PIZZE.map((pizza, i) => (
            <div
              key={pizza.id}
              className={`${styles.card} ${hovered === i ? styles.cardActive : ''}`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className={styles.cardImg}>
                <img src={pizza.image} alt={pizza.name} />
                <div className={styles.cardImgOverlay} />
              </div>
              <div className={styles.cardContent}>
                <div className={styles.cardNum}>0{i + 1}</div>
                <div className={styles.cardName}>{lang === 'en' ? (pizza.nameEn ?? pizza.name) : pizza.name}</div>
                <div className={styles.cardDesc}>{lang === 'en' ? (pizza.descEn ?? pizza.desc) : pizza.desc}</div>
                <div className={styles.cardFooter}>
                  <span className={styles.cardTag}>{lang === 'en' ? (pizza.tagEn ?? pizza.tag) : pizza.tag}</span>
                  <span className={styles.cardPrice}>{pizza.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Impasto info banner */}
      <div className={styles.banner}>
        <div className={styles.bannerItem}>
          <span className={styles.bannerIcon}><IconClock size={28} /></span>
          <div>
            <div className={styles.bannerTitle}>{lang === 'en' ? '48 hours of fermentation' : '48 ore di lievitazione'}</div>
            <div className={styles.bannerDesc}>{lang === 'en' ? 'Natural dough, light and easy to digest' : 'Impasto naturale, leggero e digeribile'}</div>
          </div>
        </div>
        <div className={styles.bannerDivider} />
        <div className={styles.bannerItem}>
          <span className={styles.bannerIcon}><IconLeaf size={28} /></span>
          <div>
            <div className={styles.bannerTitle}>{lang === 'en' ? 'Stone-ground type 1 flour' : 'Farina tipo 1 macinata a pietra'}</div>
            <div className={styles.bannerDesc}>{lang === 'en' ? 'Selection of the best grains' : 'Selezione del grano migliore'}</div>
          </div>
        </div>
        <div className={styles.bannerDivider} />
        <div className={styles.bannerItem}>
          <span className={styles.bannerIcon}><IconFlame size={28} /></span>
          <div>
            <div className={styles.bannerTitle}>{lang === 'en' ? '450°C wood-fired oven' : 'Forno a legna 450°C'}</div>
            <div className={styles.bannerDesc}>{lang === 'en' ? 'Perfect cooking in 90 seconds' : 'Cottura perfetta in 90 secondi'}</div>
          </div>
        </div>
        <div className={styles.bannerDivider} />
        <div className={styles.bannerItem}>
          <span className={styles.bannerIcon}><IconFish size={28} /></span>
          <div>
            <div className={styles.bannerTitle}>{lang === 'en' ? 'Genuine buffalo mozzarella' : 'Vera mozzarella di bufala'}</div>
            <div className={styles.bannerDesc}>{lang === 'en' ? 'Controlled supply chain from Campania' : 'Filiera controllata dalla Campania'}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
