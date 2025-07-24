import { useEffect, useState } from 'react'

export default function LoadingScreen() {
  const [percent, setPercent] = useState(0)
  useEffect(() => {
    let start = Date.now()
    let frame: number
    const animate = () => {
      const elapsed = Date.now() - start
      const p = Math.min(100, Math.round((elapsed / 2000) * 100))
      setPercent(p)
      if (p < 100) frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: '#a9170a',
      color: '#fffde8',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 99999,
      fontFamily: 'Poppins, Merriweather, sans-serif',
      letterSpacing: '0.1em',
      fontWeight: 700,
      fontSize: '4rem',
      transition: 'opacity 0.3s',
    }}>
      <span style={{ fontFamily: 'Merriweather, serif', fontWeight: 900, fontSize: '5rem', letterSpacing: '0.12em' }}>{percent}%</span>
    </div>
  )
} 