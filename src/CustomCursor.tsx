'use client'
import { useEffect, useState } from 'react'

function getRGBValues(color: string) {
  const ctx = document.createElement('canvas').getContext('2d')!
  ctx.fillStyle = color
  const computed = ctx.fillStyle
  const match = computed.match(/rgba?\((\d+), (\d+), (\d+)/)
  if (!match) return [255, 255, 255]
  return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])]
}

function getBrightness([r, g, b]: number[]) {
  return (r * 299 + g * 587 + b * 114) / 1000
}

function findBackgroundColor(el: HTMLElement | null): string {
  while (el && el !== document.documentElement) {
    const bg = getComputedStyle(el).backgroundColor
    if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
      return bg
    }
    el = el.parentElement
  }
  return getComputedStyle(document.documentElement).backgroundColor || 'rgb(255,255,255)'
}

function findCursorColor(el: HTMLElement | null): string | null {
  while (el && el !== document.documentElement) {
    const cursorColor = el.style.getPropertyValue('--cursor-bubble-color')
    if (cursorColor) return cursorColor.trim()
    el = el.parentElement
  }
  return null
}

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [color, setColor] = useState('#fffde8')
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
      let el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null
      const manualColor = findCursorColor(el)
      if (manualColor) {
        setColor(manualColor)
        return
      }
      const bgColor = findBackgroundColor(el)
      const rgb = getRGBValues(bgColor)
      const brightness = getBrightness(rgb)
      setColor(brightness >= 250 ? '#a9170a' : '#fffde8')
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
        @media (max-width: 768px) {
          .custom-cursor {
            display: none !important;
          }
        }
      `}</style>
      <div
        className="custom-cursor"
        style={{
          position: 'fixed',
          top: position.y,
          left: position.x,
          width: 24,
          height: 24,
          borderRadius: '50%',
          pointerEvents: 'none',
          backgroundColor: color,
          zIndex: 9999,
          animation: 'pulse 1.5s ease-in-out infinite',
        }}
      />
    </>
  )
}
