import { useState, useEffect, useLayoutEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IMAGES } from '../assets/images.js'
import { useLang } from '../i18n/LanguageContext.jsx'
import styles from './IntroSplash.module.css'

const STORAGE_KEY = 'lv_intro_seen'

/** Visible hold before curtain exit — at least 3s (longer when more copy). */
const HOLD_MS = { full: 4200, reduced: 3000 }

const COPY = {
  it: {
    sub: 'Ristorante Pizzeria',
    slogan: 'Pizza al forno a legna',
    desc: "Cucina italiana autentica, pesce e carne fresca dall'Adriatico. Impasto a lunga lievitazione e mozzarella vera — Falconara Marittima dal 2015.",
  },
  en: {
    sub: 'Restaurant Pizzeria',
    slogan: 'Wood-fired pizza',
    desc: 'Authentic Italian cuisine, fresh Adriatic fish and meat. Long-fermented dough, genuine mozzarella — Falconara Marittima since 2015.',
  },
}

function introAlreadySeen() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

export default function IntroSplash() {
  const { lang } = useLang()
  const [finished, setFinished] = useState(introAlreadySeen)
  const [visible, setVisible] = useState(() => !introAlreadySeen())
  const [reduceMotion, setReduceMotion] = useState(false)

  const text = COPY[lang] ?? COPY.it

  useLayoutEffect(() => {
    try {
      setReduceMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    } catch {
      setReduceMotion(false)
    }
  }, [])

  useEffect(() => {
    if (finished) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [finished])

  useEffect(() => {
    if (finished || !visible) return
    const hold = reduceMotion ? HOLD_MS.reduced : HOLD_MS.full
    const id = window.setTimeout(() => setVisible(false), hold)
    return () => window.clearTimeout(id)
  }, [finished, visible, reduceMotion])

  const onExitComplete = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, '1')
    } catch {
      /* ignore */
    }
    setFinished(true)
  }

  if (finished) return null

  const ease = [0.16, 1, 0.3, 1]
  const enterDuration = reduceMotion ? 0.35 : 0.88
  const baseDelay = reduceMotion ? 0 : 0.06
  const step = reduceMotion ? 0.05 : 0.11

  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {visible && (
        <motion.div
          key="intro-curtain"
          className={styles.overlay}
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: reduceMotion ? 0.45 : 0.95, ease }}
          aria-hidden
        >
          <div className={styles.grid} />
          <div className={styles.inner}>
            <motion.img
              className={styles.logoImg}
              src={IMAGES.logoNeon}
              alt=""
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 52 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: enterDuration, ease, delay: baseDelay }}
            />
            <motion.p
              className={styles.logoSub}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: enterDuration * 0.85, ease, delay: baseDelay + step }}
            >
              {text.sub}
            </motion.p>
            <motion.p
              className={styles.slogan}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: enterDuration * 0.9, ease, delay: baseDelay + step * 2 }}
            >
              {text.slogan}
            </motion.p>
            <motion.p
              className={styles.desc}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: enterDuration * 0.9, ease, delay: baseDelay + step * 3 }}
            >
              {text.desc}
            </motion.p>
          </div>
          <motion.div
            className={styles.line}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease, delay: reduceMotion ? 0 : 0.15 }}
            style={{ transformOrigin: 'center bottom' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
