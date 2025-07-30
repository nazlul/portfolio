'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Scene from './Scene'

const name = 'Nazlul Rizan'


export default function Hero() {
  const typingRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef(0)

  useEffect(() => {
    const text = 'I create amazing web experiences.'
    const typingElement = typingRef.current
    if (!typingElement) return
    let i = 0
    const step = () => {
      if (i <= text.length) {
        typingElement.textContent = text.substring(0, i) + (i < text.length ? '|' : '')
        i++
        frameRef.current = requestAnimationFrame(step)
      } else {
        typingElement.textContent = text
        cancelAnimationFrame(frameRef.current)
      }
    }
    frameRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frameRef.current)
  }, [])

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#a9170a] noise-bg"
    >
      <div className="max-w-5xl w-full z-10 px-4 text-center md:text-left md:flex md:flex-col md:items-start md:justify-center lg:text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <span className="text-lg md:text-xl text-[#fffde8]">Hello, I'm</span>
        </motion.div>
        <h1 className="flex flex-wrap justify-center lg:justify-start text-4xl md:text-6xl lg:text-7xl mb-4 font-bold text-[#fffde8]">
          {name.split('').map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              whileHover={{
                y: -10,
                textShadow: '0px 0px 8px #fffde8',
                transition: { duration: 0.2, ease: 'easeOut' },
              }}
              className="inline-block cursor-default"
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </h1>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-[#fffde8]"
        >
          Web Developer
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-xl md:text-3xl mb-8 text-[#fffde8]/80 h-10"
          ref={typingRef}
        >
          |
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-center lg:justify-start gap-4"
        >
          <a
            href="/Nazlul_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-link btn-glow px-8 py-3 bg-[#fffde8] rounded-full text-[#831010] font-medium transition-transform hover:scale-105"
          >
            Resume
          </a>
          <a
            href="#contact"
            className="cursor-link btn-glow px-8 py-3 border border-[#fffde8] rounded-full text-[#fffde8] font-medium transition-all hover:bg-[#24243e]/10"
          >
            Contact Me
          </a>
        </motion.div>
      </div>
      <div className="absolute inset-0 pointer-events-none lg:translate-x-[10vw]">
        <Scene />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
      >
        <a
          href="#about"
          className="flex flex-col items-center text-[#fffde8] hover:text-[#fffde8]/80 transition-colors"
        >
          <span className="mb-2">Scroll Down</span>
          <div className="w-5 h-10 border-2 border-[#fffde8] rounded-full flex justify-center pt-1">
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-[#fffde8] rounded-full"
            />
          </div>
        </a>
      </motion.div>
      <style>{`
        .btn-glow:hover {
          box-shadow:
            0 0 8px #fffde8,
            0 0 16px #fffde8,
            0 0 24px #a9170a,
            0 0 32px #a9170a;
          transition: box-shadow 0.3s ease;
        }
        @media (max-width: 1023px) {
          #home > div {
            text-align: center !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
          }
          #home h1 {
            justify-content: center !important;
          }
          #home div > div:last-child {
            justify-content: center !important;
          }
        }
      `}</style>
    </section>
  )
}
