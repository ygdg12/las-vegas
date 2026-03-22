import { useState } from 'react'
import { useInView } from '../hooks/useInView.js'
import { MENU_SECTIONS } from '../assets/data.js'
import { IconFish, IconLeaf, IconUtensils, IconWine, IconFlame } from './Icons.jsx'
import styles from './Menu.module.css'
import { useLang } from '../i18n/LanguageContext.jsx'

const CATEGORY_ICONS = {
  'Mare': <IconFish size={20} />,
  'Terra': <IconLeaf size={20} />,
  'Primi di Mare': <IconFish size={20} />,
  'Primi di Terra': <IconLeaf size={20} />,
  'Secondi di Pesce': <IconFish size={20} />,
  'Secondi di Carne': <IconUtensils size={20} />,
  'Dolci': <IconWine size={20} />,
}

export default function Menu() {
  const [activeTab, setActiveTab] = useState(MENU_SECTIONS[0].id)
  const [ref, inView] = useInView()
  const { lang } = useLang()

  const active = MENU_SECTIONS.find(s => s.id === activeTab)

  return (
    <section id="menu" className={`${styles.menu} section section--alt`}>
      <div ref={ref} className={`${styles.header} ${inView ? styles.inView : ''}`}>
        <div className={styles.tag}>
          <div className={styles.tagLine} />
          <span>{lang === 'en' ? 'The Menu' : 'Il Menù'}</span>
        </div>
        <h2 className={styles.title}>
          {lang === 'en' ? (
            <>
              Italian <em>Cuisine</em>
            </>
          ) : (
            <>
              Cucina <em>Italiana</em>
            </>
          )}
        </h2>
        <p className={styles.subtitle}>
          {lang === 'en'
            ? 'Fresh meat and fish, selected every day by the best suppliers from the Adriatic and the Marche region'
            : "Carne e Pesce freschi, scelti ogni giorno dai migliori fornitori dell'Adriatico e del territorio marchigiano"}
        </p>
      </div>

      <div className={styles.layout}>
        {/* Sidebar tabs */}
        <div className={styles.sidebar}>
          {MENU_SECTIONS.map((section) => (
            <button
              key={section.id}
              className={`${styles.tab} ${activeTab === section.id ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(section.id)}
            >
              <span className={styles.tabIcon}>{CATEGORY_ICONS[section.category] || <IconUtensils size={20} />}</span>
              <span className={styles.tabLabel}>{lang === 'en' ? (section.categoryEn ?? section.category) : section.category}</span>
              {activeTab === section.id && <span className={styles.tabArrow}>›</span>}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className={styles.content}>
          {active && (
            <>
              {/* Section header with image */}
              <div className={styles.sectionHead}>
                <div className={styles.sectionImg}>
                  <img src={active.image} alt={active.title} />
                  <div className={styles.sectionImgOverlay} />
                  <div className={styles.sectionImgText}>
                    <div className={styles.sectionIcon}>{active.icon}</div>
                    <div className={styles.sectionTitle}>{lang === 'en' ? (active.titleEn ?? active.title) : active.title}</div>
                  </div>
                </div>
              </div>

              {/* Items */}
              <div className={styles.items}>
                {active.items.map((item, i) => (
                  <div
                    key={item.name}
                    className={styles.item}
                    style={{ animationDelay: `${i * 0.06}s` }}
                  >
                    <div className={styles.itemLeft}>
                      <div className={styles.itemName}>{lang === 'en' ? (item.nameEn ?? item.name) : item.name}</div>
                      {item.desc && (
                        <div className={styles.itemDesc}>
                          {lang === 'en' ? (item.descEn ?? item.desc) : item.desc}
                        </div>
                      )}
                    </div>
                    <div className={styles.itemDots} />
                    <div className={styles.itemPrice}>{item.price}</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Full menu CTA */}
      <div className={styles.cta}>
        <div className={styles.ctaInner}>
          <div className={styles.ctaText}>
            <div className={styles.ctaTitle}>
              {lang === 'en' ? 'Full menu available in the restaurant' : 'Menù completo disponibile in ristorante'}
            </div>
            <div className={styles.ctaSub}>
              {lang === 'en'
                ? 'Ask our staff for today’s specials and house desserts'
                : 'Chiedete al cameriere per le specialità del giorno e i dessert della casa'}
            </div>
          </div>
          <a href="tel:+390071912980" className={styles.ctaBtn}>
            {lang === 'en' ? '📞 Call for info · +39 071 912980' : '📞 Chiama per info · +39 071 912980'}
          </a>
        </div>
      </div>
    </section>
  )
}
