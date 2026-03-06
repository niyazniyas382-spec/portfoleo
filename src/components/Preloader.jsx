import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { personalInfo } from '../data/portfolio'

export default function Preloader({ darkMode }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate initial loading sequence for aesthetic impact
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center ${
            darkMode ? 'bg-dark-900' : 'bg-white'
          }`}
        >
          <div className="relative flex flex-col items-center justify-center">
            {/* Pulsing rings */}
            <motion.div
              animate={{ scale: [1, 2], opacity: [0.5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
              className="absolute w-20 h-20 rounded-full border border-accent-primary"
            />
            <motion.div
              animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut', delay: 0.2 }}
              className="absolute w-20 h-20 rounded-full border border-accent-secondary"
            />

            {/* Core logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-16 h-16 flex items-center justify-center"
            >
              <h1 className="text-3xl font-medium font-[family-name:var(--font-display)] gradient-text tracking-tighter">
                MN.
              </h1>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 overflow-hidden rounded-full w-48 h-1 bg-dark-600/30"
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 1.5, ease: 'easeInOut', repeat: Infinity }}
              className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
