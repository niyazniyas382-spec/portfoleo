import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function SectionHeading({ title, subtitle, light = false }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  // Split title into characters for staggered animation
  const letters = Array.from(title)

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: 0.1 * i },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      y: 40,
      rotateX: -90,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 200,
      },
    },
  }

  return (
    <div className="text-center mb-20" ref={ref}>
      <motion.h2
        className={`text-3xl md:text-5xl lg:text-6xl font-black font-[family-name:var(--font-display)] mb-6 tracking-tighter uppercase flex justify-center flex-wrap gap-[0.2em] ${
          light ? 'text-gray-900' : 'text-white'
        }`}
        style={{ perspective: '1000px' }}
        variants={container}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {title.split(' ').map((word, wordIndex) => (
          <span key={wordIndex} className="inline-flex overflow-hidden pb-2">
            {Array.from(word).map((letter, letterIndex) => (
              <motion.span
                variants={child}
                key={`${wordIndex}-${letterIndex}`}
                className="inline-block transform-style-3d origin-bottom"
              >
                {letter}
              </motion.span>
            ))}
          </span>
        ))}
      </motion.h2>

      {subtitle && (
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 20, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`text-sm md:text-base max-w-xl mx-auto font-light leading-relaxed tracking-wide ${
            light ? 'text-gray-500' : 'text-dark-300'
          }`}
        >
          {subtitle}
        </motion.div>
      )}

      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
        className="mt-8 mx-auto w-16 h-0.5 rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary origin-center"
      />
    </div>
  )
}
