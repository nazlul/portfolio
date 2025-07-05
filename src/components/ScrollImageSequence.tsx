'use client'

import { useEffect, useRef } from 'react'

export default function ScrollImageSequence() {
  const TOTAL_FRAMES = 300
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const decodedFrames = useRef(new Set<number>())
  const maxScrollRef = useRef(1)
  const targetFrame = useRef(1)
  const currentFrame = useRef(1)
  const lastDrawnFrame = useRef(1)
  const lastUpdateTime = useRef(0)
  const UPDATE_INTERVAL = 33 

  useEffect(() => {
    const loadAndDecode = async (i: number) => {
      const img = new Image()
      img.src = `/frames-1/frame_${String(i).padStart(4, '0')}.jpg`
      try {
        await img.decode()
        decodedFrames.current.add(i)
      } catch {
        decodedFrames.current.add(i)
      }
      imagesRef.current[i - 1] = img
    }

    for (let i = 1; i <= Math.min(50, TOTAL_FRAMES); i++) {
      loadAndDecode(i)
    }
    for (let i = 51; i <= TOTAL_FRAMES; i++) {
      setTimeout(() => loadAndDecode(i), (i - 50) * 100)
    }
  }, [])

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d')

    const drawFrame = (frameIndex: number) => {
      if (!ctx) return
      const img = imagesRef.current[frameIndex - 1]
      if (!img) return

      const canvasRatio = ctx.canvas.width / ctx.canvas.height
      const imgRatio = img.width / img.height
      let drawWidth = ctx.canvas.width
      let drawHeight = ctx.canvas.height
      let offsetX = 0
      let offsetY = 0

      if (imgRatio > canvasRatio) {
        drawHeight = ctx.canvas.height
        drawWidth = img.width * (drawHeight / img.height)
        offsetX = -(drawWidth - ctx.canvas.width) / 2
      } else {
        drawWidth = ctx.canvas.width
        drawHeight = img.height * (drawWidth / img.width)
        offsetY = -(drawHeight - ctx.canvas.height) / 2
      }

      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
      lastDrawnFrame.current = frameIndex
    }

    const animate = (time: number) => {
      if (!canvasRef.current) return

      const scrollY = window.scrollY
      const maxScroll = maxScrollRef.current
      const scrollFraction = scrollY / maxScroll
      targetFrame.current = Math.min(
        TOTAL_FRAMES,
        Math.max(1, scrollFraction * TOTAL_FRAMES)
      )

      currentFrame.current += (targetFrame.current - currentFrame.current) * 0.1
      const rounded = Math.round(currentFrame.current)

      if (
        time - lastUpdateTime.current > UPDATE_INTERVAL &&
        decodedFrames.current.has(rounded)
      ) {
        drawFrame(rounded)
        lastUpdateTime.current = time
      } else {
        drawFrame(lastDrawnFrame.current)
      }

      requestAnimationFrame(animate)
    }

    const onResize = () => {
      if (!canvasRef.current) return
      const canvas = canvasRef.current
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'

      const ctx = canvas.getContext('2d')
      if (ctx) ctx.setTransform(1, 0, 0, 1, 0, 0)
    }

    onResize()
    window.addEventListener('resize', onResize)

    requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  useEffect(() => {
    const updateMaxScroll = () => {
      maxScrollRef.current = document.documentElement.scrollHeight - window.innerHeight
    }

    updateMaxScroll()
    window.addEventListener('resize', updateMaxScroll)
    return () => window.removeEventListener('resize', updateMaxScroll)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1,
        pointerEvents: 'none',
        backgroundColor: '#000',
      }}
    />
  )
}
