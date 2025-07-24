'use client'

import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [noPulse, setNoPulse] = useState(false)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    const isSmallScreen = window.innerWidth <= 768
    if (isTouchDevice || isSmallScreen) {
      setIsTouch(true)
      return
    }

    const move = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null
      setNoPulse(!!el?.closest('.cursor-link'))
    }

    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  if (isTouch) return null

  return (
    <>
      <style>{`
        @keyframes pulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            transform: translate(-50%, -50%) scale(2);
          }
        }
        .custom-cursor.pulsing {
          animation: pulse 1.5s ease-in-out infinite;
        }
        .custom-cursor.fixed {
          transform: translate(-50%, -50%) scale(1);
        }
        @media (max-width: 768px) {
          .custom-cursor {
            display: none !important;
          }
        }
      `}</style>
      <div
        className={`custom-cursor ${noPulse ? 'fixed' : 'pulsing'}`}
        style={{
          position: 'fixed',
          top: position.y,
          left: position.x,
          width: 24,
          height: 24,
          borderRadius: '50%',
          pointerEvents: 'none',
          backgroundColor: 'rgba(255,255,255,1)',
          mixBlendMode: 'difference',
          zIndex: 9999,
        }}
      />
    </>
  )
}
