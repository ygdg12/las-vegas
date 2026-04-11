import { useState, useEffect, useLayoutEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './IntroSplash.module.css'

const STORAGE_KEY = 'lv_intro_seen'

function introAlreadySeen() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

export default function IntroSplash() {
  const [finished, setFinished] = useState(introAlreadySeen)
  const [visible, setVisible] = useState(() => !introAlreadySeen())
  const [reduceMotion, setReduceMotion] = useState(false)

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
    const hold = reduceMotion ? 900 : 2600
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
  const enterDuration = reduceMotion ? 0.35 : 0.85
  const stagger = reduceMotion ? 0 : 0.12

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
            <div className={styles.logoRow}>
              <motion.span
                className={styles.wordLas}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -72 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: enterDuration, ease, delay: reduceMotion ? 0 : 0.05 }}
              >
                Las
              </motion.span>
              <motion.span
                className={styles.wordVegas}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 72 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: enterDuration, ease, delay: reduceMotion ? 0.08 : 0.05 + stagger }}
              >
                Vegas
              </motion.span>
            </div>
            <motion.p
              className={styles.slogan}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduceMotion ? 0.3 : 0.75,
                ease,
                delay: reduceMotion ? 0.12 : 0.38 + stagger,
              }}
            >
              wood-fired pizza
            </motion.p>
          </div>
          <motion.div
            className={styles.line}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease, delay: reduceMotion ? 0 : 0.2 }}
            style={{ transformOrigin: 'center bottom' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
