'use client'

import { useEffect, useRef } from 'react'

export default function ScrollImageSequence() {
  const TOTAL_FRAMES = 300
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stateRef = useRef({
    images: Array(TOTAL_FRAMES).fill(null) as (HTMLImageElement | null)[],
    decodedFrames: new Set<number>(),
    currentFrame: 1,
    lastDrawnFrame: 0,
    scrollY: 0,
    maxScroll: 1
  })
  const animationFrameId = useRef(0)

  useEffect(() => {
    let cancelled = false
    const { images, decodedFrames } = stateRef.current

    const loadImages = async () => {
      for (let i = 1; i <= TOTAL_FRAMES; i += 20) {
        if (cancelled) break
        await Promise.all(
          Array.from({ length: 20 }, (_, j) => {
            const frame = i + j
            if (frame > TOTAL_FRAMES) return
            return new Promise<void>(resolve => {
              const img = new Image()
              img.src = `/frames/frame_${String(frame).padStart(4, '0')}.jpg`
              img.onload = () => {
                decodedFrames.add(frame)
                images[frame - 1] = img
                resolve()
              }
              img.onerror = () => resolve()
            })
          })
        )
      }
    }

    loadImages()
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const state = stateRef.current
    let ticking = false

    const drawFrame = (frameIndex: number) => {
      if (state.lastDrawnFrame === frameIndex) return
      const img = state.images[frameIndex - 1]
      if (!img) return

      const canvasRatio = canvas.width / canvas.height
      const imgRatio = img.width / img.height
      
      if (imgRatio > canvasRatio) {
        const drawHeight = canvas.height
        const drawWidth = img.width * (drawHeight / img.height)
        const offsetX = -(drawWidth - canvas.width) / 2
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, offsetX, 0, drawWidth, drawHeight)
      } else {
        const drawWidth = canvas.width
        const drawHeight = img.height * (drawWidth / img.width)
        const offsetY = -(drawHeight - canvas.height) / 2
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, offsetY, drawWidth, drawHeight)
      }
      
      state.lastDrawnFrame = frameIndex
    }

    const animate = () => {
      const scrollFraction = Math.min(1, Math.max(0, state.scrollY / state.maxScroll))
      const targetFrame = 1 + scrollFraction * (TOTAL_FRAMES - 1)
      state.currentFrame += (targetFrame - state.currentFrame) * 0.2
      const rounded = Math.round(state.currentFrame)
      
      if (state.decodedFrames.has(rounded)) {
        drawFrame(rounded)
      }
      animationFrameId.current = requestAnimationFrame(animate)
    }

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      state.maxScroll = document.documentElement.scrollHeight - window.innerHeight || 1
    }

    const handleScroll = () => {
      state.scrollY = window.scrollY
      if (!ticking) {
        requestAnimationFrame(() => { ticking = false })
        ticking = true
      }
    }

    animationFrameId.current = requestAnimationFrame(animate)
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', resize)
    resize()

    return () => {
      cancelAnimationFrame(animationFrameId.current)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', resize)
    }
  }, [])



  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '800vh',
        zIndex: 1,
        pointerEvents: 'none',
        backgroundColor: '#000',
      }}
    />
  )
}
