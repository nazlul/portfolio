'use client'

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
  MutableRefObject,
} from 'react'

interface CanvasContextType {
  canvasRef: MutableRefObject<HTMLCanvasElement | null>
  contextRef: MutableRefObject<CanvasRenderingContext2D | null>
  prepareCanvas: () => void
  startDrawing: (e: React.MouseEvent<HTMLCanvasElement>) => void
  finishDrawing: () => void
  draw: (e: React.MouseEvent<HTMLCanvasElement>) => void
  selectedColor: string
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>
  isDesktop: boolean
}

const CanvasContext = createContext<CanvasContextType | undefined>(undefined)

export const CanvasProvider = ({ children }: { children: ReactNode }) => {
  const [selectedColor, setSelectedColor] = useState<string>('#fffde8') 
  const [isDrawing, setIsDrawing] = useState<boolean>(false)
  const [isDesktop, setIsDesktop] = useState<boolean>(false)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)

  useEffect(() => {
    const checkDevice = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }
    checkDevice()
    window.addEventListener('resize', checkDevice)
    return () => window.removeEventListener('resize', checkDevice)
  }, [])

  const prepareCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.width = window.innerWidth * 2
    canvas.height = document.documentElement.scrollHeight * 2
    canvas.style.width = `${window.innerWidth}px`
    canvas.style.height = `${document.documentElement.scrollHeight}px`
    const context = canvas.getContext('2d')
    if (!context) return
    context.scale(2, 2)
    context.lineCap = 'round'
    context.lineWidth = 5
    context.strokeStyle = selectedColor
    contextRef.current = context
  }

  useEffect(() => {
    if (isDesktop) {
      prepareCanvas()
      window.addEventListener('resize', prepareCanvas)
      return () => window.removeEventListener('resize', prepareCanvas)
    }
  }, [selectedColor, isDesktop])

  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = selectedColor
    }
  }, [selectedColor])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = e.nativeEvent
    if (!contextRef.current) return
    contextRef.current.strokeStyle = selectedColor
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX, offsetY)
    setIsDrawing(true)
  }

  const finishDrawing = () => {
    if (!contextRef.current) return
    contextRef.current.closePath()
    setIsDrawing(false)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !contextRef.current) return
    const { offsetX, offsetY } = e.nativeEvent
    contextRef.current.lineTo(offsetX, offsetY)
    contextRef.current.stroke()
  }

  return (
    <CanvasContext.Provider
      value={{
        canvasRef,
        contextRef,
        prepareCanvas,
        startDrawing,
        finishDrawing,
        draw,
        selectedColor,
        setSelectedColor,
        isDesktop,
      }}
    >
      {children}
    </CanvasContext.Provider>
  )
}

export const useCanvas = () => {
  const context = useContext(CanvasContext)
  if (!context) {
    throw new Error('useCanvas must be used within a CanvasProvider')
  }
  return context
}