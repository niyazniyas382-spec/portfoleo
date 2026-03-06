import { motion } from 'framer-motion'
import ScrollReveal from '../components/ScrollReveal'
import SectionHeading from '../components/SectionHeading'
import TiltCard from '../components/TiltCard'
import { skills } from '../data/portfolio'

function SkillItem({ skill, darkMode, index }) {
  return (
    <ScrollReveal delay={index * 0.06}>
      <TiltCard
        tiltAmount={15}
        className={`rounded-xl p-4 cursor-default h-full backdrop-blur-xl border transition-all duration-300 ${
          darkMode
            ? 'bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.06] hover:border-accent-primary/20 shadow-lg shadow-black/10'
            : 'bg-white/70 border-white/50 hover:bg-white/90 hover:border-purple-200 shadow-lg shadow-purple-500/5'
        }`}
      >
        <div className="flex items-center gap-3 mb-3">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.2 }}
            className={`w-9 h-9 rounded-lg flex items-center justify-center text-base ${
              darkMode
                ? 'bg-accent-primary/10 text-accent-primary'
                : 'bg-purple-100 text-purple-500'
            }`}
          >
            <skill.icon />
          </motion.div>
          <span className={`text-xs font-medium tracking-wide ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            {skill.name}
          </span>
        </div>
        {/* Progress ring */}
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 shrink-0">
            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
              <circle
                cx="18" cy="18" r="15"
                fill="none"
                className={darkMode ? 'stroke-dark-600/30' : 'stroke-gray-200'}
                strokeWidth="3"
              />
              <motion.circle
                cx="18" cy="18" r="15"
                fill="none"
                stroke="url(#skillGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 15}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 15 }}
                whileInView={{ strokeDashoffset: 2 * Math.PI * 15 * (1 - skill.level / 100) }}
                transition={{ duration: 1.2, delay: index * 0.08, ease: 'easeOut' }}
                viewport={{ once: true }}
              />
              <defs>
                <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
            <span className={`absolute inset-0 flex items-center justify-center text-[9px] font-semibold ${
              darkMode ? 'text-dark-100' : 'text-gray-700'
            }`}>
              {skill.level}
            </span>
          </div>
          <div className="flex-1">
            <div className={`h-1 rounded-full overflow-hidden ${darkMode ? 'bg-dark-600/20' : 'bg-gray-100'}`}>
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary"
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                transition={{ duration: 1, delay: index * 0.08, ease: 'easeOut' }}
                viewport={{ once: true }}
              />
            </div>
          </div>
        </div>
      </TiltCard>
    </ScrollReveal>
  )
}

export default function Skills({ darkMode }) {
  const categories = Object.values(skills)
  const categoryEmojis = ['🎨', '⚙️', '🛠️']

  return (
    <section id="skills" className="py-32 px-8 relative aurora-bg">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute top-20 -right-20 w-40 h-40 border border-accent-primary/5 rounded-full"
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <ScrollReveal>
          <SectionHeading
            title="Skills & Expertise"
            subtitle="Technologies and tools I use to bring ideas to life."
            light={!darkMode}
          />
        </ScrollReveal>

        {categories.map((category, ci) => (
          <div key={category.title} className={ci < categories.length - 1 ? 'mb-14' : ''}>
            <ScrollReveal delay={ci * 0.1}>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xl">{categoryEmojis[ci]}</span>
                <h3 className="text-xs font-medium tracking-[0.2em] uppercase gradient-text">
                  {category.title}
                </h3>
                <div className={`flex-1 h-px ${darkMode ? 'bg-dark-500/30' : 'bg-gray-200'}`} />
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
              {category.items.map((skill, si) => (
                <SkillItem
                  key={skill.name}
                  skill={skill}
                  darkMode={darkMode}
                  index={si + ci * 6}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
