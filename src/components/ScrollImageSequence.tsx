'use client'

import { useEffect, useRef, useState } from 'react'

export default function ScrollImageSequence() {
  const TOTAL_FRAMES = 600
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const imagesRef = useRef<(HTMLImageElement | null)[]>([])
  const loadedRef = useRef<Set<number>>(new Set())
  const frameRef = useRef<number>(1)
  const lastDrawnRef = useRef<number>(0)
  const maxScrollRef = useRef<number>(1)
  const scrollYRef = useRef<number>(0)
  const animId = useRef<number>(0)
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [, setLoadTime] = useState<number | null>(null)

  useEffect(() => {
    let running = true
    const images: (HTMLImageElement | null)[] = Array(TOTAL_FRAMES).fill(null)
    imagesRef.current = images
    let loadedCount = 0
    const start = Date.now()
    const onLoad = () => {
      loadedCount++
      setProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100))
      if (loadedCount === TOTAL_FRAMES) {
        setLoading(false)
        setLoadTime(Date.now() - start)
      }
    }
    const load = (i: number) => {
      if (images[i]) return
      const img = new window.Image()
      img.src = `/frames/frame_${String(i + 1).padStart(4, '0')}.jpg`
      img.decoding = 'async'
      img.onload = () => {
        loadedRef.current.add(i + 1)
        onLoad()
      }
      img.onerror = onLoad
      images[i] = img
    }
    for (let i = 0; i < TOTAL_FRAMES; i++) load(i)
    return () => { running = false }
  }, [])

  useEffect(() => {
    if (loading) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const dpr = window.devicePixelRatio || 1
    const resize = () => {
      if (!canvas) return
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'
      maxScrollRef.current = document.documentElement.scrollHeight - window.innerHeight || 1
    }
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [loading])

  useEffect(() => {
    if (loading) return
    const onScroll = () => {
      scrollYRef.current = window.scrollY
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [loading])

  useEffect(() => {
    if (loading) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const draw = () => {
      const scrollFraction = Math.min(1, Math.max(0, scrollYRef.current / (maxScrollRef.current)))
      const target = 1 + scrollFraction * (TOTAL_FRAMES - 1)
      frameRef.current += (target - frameRef.current) * 0.25
      const rounded = Math.round(frameRef.current)
      const images = imagesRef.current
      if (
        rounded !== lastDrawnRef.current &&
        images[rounded - 1] &&
        loadedRef.current.has(rounded)
      ) {
        const img = images[rounded - 1] as HTMLImageElement
        const cw = canvas.width
        const ch = canvas.height
        const ir = img.width / img.height
        const cr = cw / ch
        ctx.clearRect(0, 0, cw, ch)
        if (ir > cr) {
          const h = ch
          const w = img.width * (h / img.height)
          const x = -(w - cw) / 2
          ctx.drawImage(img, x, 0, w, h)
        } else {
          const w = cw
          const h = img.height * (w / img.width)
          const y = -(h - ch) / 2
          ctx.drawImage(img, 0, y, w, h)
        }
        lastDrawnRef.current = rounded
      }
      animId.current = window.requestAnimationFrame(draw)
    }
    animId.current = window.requestAnimationFrame(draw)
    return () => window.cancelAnimationFrame(animId.current)
  }, [loading])

  return (
    <>
      {loading && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: '#a9170a',
          color: '#fffde8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '3rem',
          zIndex: 99999,
          fontFamily: 'Poppins, sans-serif',
          transition: 'opacity 0.3s',
        }}>
          {progress}%
        </div>
      )}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '3000vh',
          objectFit: 'cover',
          zIndex: 1,
          pointerEvents: 'none',
          background: '#000',
          willChange: 'transform',
        }}
      />
    </>
  )
}
