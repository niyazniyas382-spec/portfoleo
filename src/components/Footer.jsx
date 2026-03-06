import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { FaHeart } from 'react-icons/fa'
import { socialLinks, personalInfo } from '../data/portfolio'

export default function Footer({ darkMode }) {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  })

  // Marquee effect based on scroll
  const x1 = useTransform(scrollYProgress, [0, 1], ['0%', '-50%'])
  const x2 = useTransform(scrollYProgress, [0, 1], ['-50%', '0%'])
  
  // Smooth out the scroll rotation for the logo
  const rotateSpring = useSpring(useTransform(scrollYProgress, [0, 1], [0, 360]), {
    stiffness: 100,
    damping: 30,
  })

  return (
    <footer
      ref={containerRef}
      className={`relative overflow-hidden pt-32 pb-10 mt-32 ${
        darkMode ? 'bg-dark-900 border-t border-white/5' : 'bg-white border-t border-gray-200/50'
      }`}
    >
      {/* Huge Marquee Text */}
      <div className="absolute top-10 left-0 w-[200vw] flex flex-col gap-4 pointer-events-none opacity-20 dark:opacity-10 mix-blend-difference z-0">
        <motion.div style={{ x: x1 }} className="flex whitespace-nowrap">
          <h2 className="text-[15vw] font-black font-[family-name:var(--font-display)] uppercase leading-none tracking-tighter">
            {personalInfo.name} • LET'S TALK • {personalInfo.name} • LET'S TALK •
          </h2>
        </motion.div>
        <motion.div style={{ x: x2 }} className="flex whitespace-nowrap">
          <h2 className="text-[15vw] font-black font-[family-name:var(--font-display)] uppercase leading-none tracking-tighter text-transparent" style={{ WebkitTextStroke: darkMode ? '2px rgba(255,255,255,0.5)' : '2px rgba(0,0,0,0.5)' }}>
            AVAILABLE FOR HIRE • CREATIVE DEVELOPER • AVAILABLE FOR HIRE •
          </h2>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-8 relative z-10 flex flex-col md:flex-row items-end justify-between gap-16 md:gap-5 min-h-[40vh]">
        
        {/* Left Side: Call to Action */}
        <div className="flex-1 w-full relative">
          <p className={`text-sm tracking-[0.3em] uppercase mb-4 ${darkMode ? 'text-dark-400' : 'text-gray-400'}`}>
            Got a project?
          </p>
          <a
            href={`mailto:${personalInfo.email}`}
            className="group inline-block"
          >
            <h3 className={`text-4xl sm:text-5xl md:text-7xl font-bold font-[family-name:var(--font-display)] tracking-tighter transition-all duration-500 ${
              darkMode ? 'text-white hover:text-accent-primary' : 'text-gray-900 hover:text-accent-primary'
            }`}>
              Let's connect
              <span className="inline-block ml-4 transition-transform duration-500 group-hover:translate-x-4">→</span>
            </h3>
            <div className="h-1 w-0 bg-accent-primary transition-all duration-500 group-hover:w-full mt-2" />
          </a>
        </div>

        {/* Right Side: Rotating Logo & Socials */}
        <div className="flex flex-col items-end gap-12 shrink-0">
          <motion.div 
            style={{ rotate: rotateSpring }}
            className={`w-32 h-32 rounded-full border border-dashed flex items-center justify-center ${
              darkMode ? 'border-dark-400' : 'border-gray-300'
            }`}
          >
            <span className="text-2xl font-bold gradient-text">MN.</span>
          </motion.div>

          <div className="flex flex-col items-end gap-2">
            <p className={`text-xs font-light tracking-widest uppercase mb-2 ${darkMode ? 'text-dark-400' : 'text-gray-400'}`}>
              Socials
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`text-sm font-medium uppercase tracking-widest transition-colors duration-300 magnetic-hover ${
                    darkMode
                      ? 'text-white hover:text-accent-secondary'
                      : 'text-gray-900 hover:text-accent-secondary'
                  }`}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-6xl mx-auto px-8 mt-24 flex flex-col md:flex-row items-center justify-between gap-5 relative z-10">
        <p className={`text-[10px] font-light tracking-widest uppercase ${darkMode ? 'text-dark-400' : 'text-gray-500'}`}>
          © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
        </p>
        <p className={`text-[10px] font-light tracking-widest uppercase flex items-center gap-1.5 ${darkMode ? 'text-dark-400' : 'text-gray-500'}`}>
          Made with <FaHeart className="text-accent-pink animate-pulse" /> + React
        </p>
      </div>
    </footer>
  )
}
