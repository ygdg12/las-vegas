import { useEffect, useRef, useState } from 'react'
import styles from './Cursor.module.css'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let ringX = 0, ringY = 0
    let dotX = 0, dotY = 0
    let raf

    const onMove = (e) => {
      dotX = e.clientX
      dotY = e.clientY
      setHidden(false)
    }

    const onLeave = () => setHidden(true)
    const onEnter = () => setHidden(false)

    const onDown = () => setClicked(true)
    const onUp = () => setClicked(false)

    const lerp = (a, b, t) => a + (b - a) * t

    const animate = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px)`
      }
      ringX = lerp(ringX, dotX, 0.12)
      ringY = lerp(ringY, dotY, 0.12)
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`
      }
      raf = requestAnimationFrame(animate)
    }

    raf = requestAnimationFrame(animate)

    // Detect hoverable elements
    const addHover = () => {
      document.querySelectorAll('a, button, [role="button"], input, select, textarea, label').forEach(el => {
        el.addEventListener('mouseenter', () => setHovered(true))
        el.addEventListener('mouseleave', () => setHovered(false))
      })
    }

    addHover()

    // Re-attach on DOM changes
    const observer = new MutationObserver(addHover)
    observer.observe(document.body, { childList: true, subtree: true })

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup', onUp)

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup', onUp)
    }
  }, [])

  // Only show on non-touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        className={`${styles.dot} ${hovered ? styles.dotHover : ''} ${clicked ? styles.dotClick : ''} ${hidden ? styles.hidden : ''}`}
      />
      {/* Outer ring */}
      <div
        ref={ringRef}
        className={`${styles.ring} ${hovered ? styles.ringHover : ''} ${clicked ? styles.ringClick : ''} ${hidden ? styles.hidden : ''}`}
      />
    </>
  )
}
