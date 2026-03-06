import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { FiSun, FiMoon } from 'react-icons/fi'
import { navLinks } from '../data/portfolio'

export default function Navbar({ darkMode, setDarkMode }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Update active section
      const sections = navLinks.map(l => l.href.replace('#', ''))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(sections[i])
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = (href) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-dark-900/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/10'
          : 'py-5 bg-transparent'
      } ${!darkMode ? 'bg-white/80 border-gray-200/50' : ''}`}
    >
      <div className="max-w-6xl mx-auto px-8 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#home"
          onClick={(e) => { e.preventDefault(); handleClick('#home') }}
          className="text-xl font-medium font-[family-name:var(--font-display)]"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="gradient-text">MN</span>
          <span className={darkMode ? 'text-white' : 'text-gray-900'}>.</span>
        </motion.a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '')
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleClick(link.href) }}
                className={`relative px-4 py-2 text-xs font-normal tracking-wide rounded-lg transition-colors duration-200 ${
                  isActive
                    ? 'text-accent-primary'
                    : darkMode
                      ? 'text-dark-200 hover:text-white'
                      : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-lg bg-accent-primary/10"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </a>
            )
          })}

          {/* Dark mode toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`ml-4 p-2.5 rounded-xl transition-all duration-300 ${
              darkMode
                ? 'bg-dark-700 hover:bg-dark-600 text-yellow-400'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
          >
            {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2.5 rounded-xl transition-all ${
              darkMode ? 'bg-dark-700 text-yellow-400' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`p-2.5 rounded-xl transition-all ${
              darkMode ? 'bg-dark-700 text-white' : 'bg-gray-200 text-gray-900'
            }`}
          >
            {mobileOpen ? <HiX size={22} /> : <HiMenuAlt3 size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={`md:hidden overflow-hidden border-t ${
              darkMode ? 'bg-dark-900/95 backdrop-blur-xl border-white/5' : 'bg-white/95 backdrop-blur-xl border-gray-200'
            }`}
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={(e) => { e.preventDefault(); handleClick(link.href) }}
                  className={`py-3 px-4 rounded-lg text-base font-medium transition-colors ${
                    activeSection === link.href.replace('#', '')
                      ? 'text-accent-primary bg-accent-primary/10'
                      : darkMode
                        ? 'text-dark-100 hover:bg-dark-700'
                        : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
