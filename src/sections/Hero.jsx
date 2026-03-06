import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { personalInfo } from '../data/portfolio'

export default function Hero3D({ darkMode }) {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])
  const blur = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(10px)"])

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden perspective-1000"
    >
      <motion.div 
        style={{ y, opacity, scale, filter: blur }}
        className="relative z-10 text-center px-8 w-full max-w-5xl"
      >
        {/* Massive 3D Text Effect */}
        <motion.div
          initial={{ opacity: 0, y: 100, rotateX: 45 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1.2, cubicBezier: [0.16, 1, 0.3, 1] }}
          className="relative pointer-events-none perspective-text"
        >
          <h1 className={`text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[7vw] font-black font-[family-name:var(--font-display)] leading-[0.9] tracking-tighter mix-blend-difference ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            <span className="block mb-2 overflow-hidden">
              <motion.span 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                CREATIVE
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-4">
              <motion.span 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="block gradient-text bg-clip-text text-transparent transform translate-z-12"
              >
                DEVELOPER.
              </motion.span>
            </span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-8 md:mt-12 flex flex-col md:flex-row items-center justify-center gap-6"
        >
          <div className={`h-px w-16 md:w-32 ${darkMode ? 'bg-white/20' : 'bg-black/20'}`} />
          <p className={`text-sm tracking-[0.3em] uppercase mix-blend-difference ${darkMode ? 'text-white/70' : 'text-black/70'}`}>
            {personalInfo.name} — {personalInfo.location}
          </p>
          <div className={`h-px w-16 md:w-32 ${darkMode ? 'bg-white/20' : 'bg-black/20'}`} />
        </motion.div>

        {/* Magnetic Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, type: 'spring' }}
          className="mt-16 inline-block"
        >
          <a
            href="#projects"
            className="group relative flex items-center justify-center w-32 h-32 rounded-full border border-accent-primary/50 hover:bg-accent-primary/10 transition-colors backdrop-blur-md overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-tr from-accent-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="text-xs tracking-[0.2em] font-medium uppercase mix-blend-difference z-10">Explore</span>
            
            {/* Rotating text ring */}
            <div className="absolute inset-0 animate-spin-slow pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path id="curve" fill="transparent" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" />
                <text className={`text-[8px] uppercase tracking-widest ${darkMode ? 'fill-white' : 'fill-black'}`}>
                  <textPath href="#curve">
                    Scroll down • Discover more • Scroll down • Discover more •
                  </textPath>
                </text>
              </svg>
            </div>
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
