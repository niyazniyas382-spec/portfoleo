import { motion } from 'framer-motion'
import { HiDownload, HiSparkles } from 'react-icons/hi'
import ScrollReveal from '../components/ScrollReveal'
import SectionHeading from '../components/SectionHeading'
import { personalInfo } from '../data/portfolio'

export default function About({ darkMode }) {
  const quickFacts = [
    { label: '5+', desc: 'Years Experience', emoji: '🚀' },
    { label: '50+', desc: 'Projects Completed', emoji: '💼' },
    { label: '30+', desc: 'Happy Clients', emoji: '🤝' },
    { label: '10+', desc: 'Open Source', emoji: '⭐' },
  ]

  return (
    <section id="about" className="py-32 px-8 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent-primary/5 rounded-full blur-[150px] float-slow" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent-secondary/5 rounded-full blur-[120px] float-reverse" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <ScrollReveal>
          <SectionHeading
            title="About Me"
            subtitle="Get to know me better — who I am, what I do, and what drives me."
            light={!darkMode}
          />
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-20 items-center mt-4">
          {/* Profile Image */}
          <ScrollReveal direction="left">
            <div className="relative mx-auto lg:mx-0 w-64 h-64 sm:w-72 sm:h-72">
              {/* Animated gradient ring */}
              <motion.div
                animate={{ rotate: [0, 5, -3, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-primary via-accent-secondary to-accent-pink p-[2px]"
              >
                <div className={`w-full h-full rounded-2xl ${darkMode ? 'bg-dark-800' : 'bg-white'}`} />
              </motion.div>
              {/* Avatar placeholder */}
              <div className="absolute inset-4 rounded-xl overflow-hidden bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10 flex items-center justify-center">
                <motion.span
                  className="text-6xl"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  👨‍💻
                </motion.span>
              </div>
              {/* Floating badge */}
              <motion.div
                className={`absolute -bottom-5 -right-5 px-4 py-2.5 rounded-xl shadow-lg pulse-glow ${
                  darkMode ? 'glass text-white' : 'bg-white border border-purple-100 text-gray-900'
                }`}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity }}
              >
                <span className="text-xs font-normal tracking-wide flex items-center gap-1.5">
                  <HiSparkles className="text-accent-primary" /> Available for work
                </span>
              </motion.div>
              {/* Decorative dots */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-3 -left-3 w-4 h-4 rounded-full bg-accent-primary/30 blur-[2px]"
              />
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute top-1/2 -right-6 w-3 h-3 rounded-full bg-accent-secondary/30 blur-[2px]"
              />
            </div>
          </ScrollReveal>

          {/* Bio */}
          <ScrollReveal direction="right">
            <div>
              <h3
                className={`text-xl font-medium font-[family-name:var(--font-display)] mb-5 leading-snug ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                A passionate developer who loves creating{' '}
                <span className="gradient-text">impactful digital products</span>
              </h3>

              <p className={`text-sm leading-[1.9] mb-10 font-light ${darkMode ? 'text-dark-200' : 'text-gray-600'}`}>
                {personalInfo.bio}
              </p>

              {/* Quick facts */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
                {quickFacts.map((fact, i) => (
                  <ScrollReveal key={fact.desc} delay={i * 0.1}>
                    <motion.div
                      whileHover={{ y: -4, scale: 1.03 }}
                      className={`card-premium rounded-xl p-4 text-center cursor-default ${
                        darkMode ? 'glass' : 'glass light-card'
                      }`}
                    >
                      <span className="text-lg block mb-1">{fact.emoji}</span>
                      <div className="text-xl font-semibold gradient-text">{fact.label}</div>
                      <div className={`text-[10px] mt-1 font-light tracking-wider uppercase ${darkMode ? 'text-dark-300' : 'text-gray-500'}`}>
                        {fact.desc}
                      </div>
                    </motion.div>
                  </ScrollReveal>
                ))}
              </div>

              {/* Resume button */}
              <motion.a
                href="#"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="glow-btn inline-flex items-center gap-2.5 px-7 py-3 rounded-xl bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-medium text-sm tracking-wide"
              >
                <HiDownload size={16} />
                Download Resume
              </motion.a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
