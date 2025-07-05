'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { MenuIcon, XIcon } from 'lucide-react'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' }
  ]

  const navbarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 * i, duration: 0.5 }
    })
  }

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'backdrop-blur-md bg-[#fffde8] shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className={`text-2xl font-bold ${isScrolled ? 'text-[#a9170a]' : 'text-[#fffde8]'}`}
        >
          Portfolio
        </motion.div>

        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              custom={i}
              variants={linkVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.1 }}
              className={`focus:outline-none hover:text-[#a90a0a]  text-xl transition duration-100 transform ${
                isScrolled ? 'text-[#6a1414] hover:text-[#a90a0a]' : 'text-[#fffde8] hover:text-[#faf4b6]'
              }`}
            >
              {link.name}
            </motion.a>
          ))}
        </nav>

        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`${isScrolled ? 'text-[#a9170a]' : 'text-[#fffde8]'}`}
          >
            {isMobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>

{isMobileMenuOpen && (
  <div
    className="fixed top-[64px] left-0 w-full h-[calc(100vh-64px)] bg-[#a9170a]/80 backdrop-blur-sm z-40 flex flex-col items-center justify-center space-y-6 text-2xl font-semibold text-[#fffde8]"
    style={{ willChange: 'backdrop-filter' }}
  >
    {navLinks.map(link => (
      <a
        key={link.name}
        href={link.href}
        onClick={() => setIsMobileMenuOpen(false)}
        className="hover:text-[#d1c9ab] transition"
      >
        {link.name}
      </a>
    ))}
  </div>
)}

    </motion.header>
  )
}

export default Navbar
