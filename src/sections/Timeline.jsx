import { motion } from 'framer-motion'
import { HiBriefcase, HiAcademicCap } from 'react-icons/hi'
import ScrollReveal from '../components/ScrollReveal'
import SectionHeading from '../components/SectionHeading'
import TiltCard from '../components/TiltCard'
import { experience } from '../data/portfolio'

function TimelineCard({ item, index, darkMode }) {
  const Icon = item.type === 'work' ? HiBriefcase : HiAcademicCap

  return (
    <ScrollReveal delay={index * 0.12}>
      <TiltCard
        tiltAmount={12}
        className={`rounded-2xl p-6 cursor-default h-full backdrop-blur-xl border transition-all duration-300 relative overflow-hidden ${
          darkMode
            ? 'bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.06] hover:border-accent-primary/20 shadow-lg shadow-black/10'
            : 'bg-white/70 border-white/50 hover:bg-white/90 hover:border-purple-200 shadow-lg shadow-purple-500/5'
        }`}
      >
        {/* Side accent */}
        <div className={`absolute top-0 left-0 w-1 h-full rounded-full ${
          item.type === 'work'
            ? 'bg-gradient-to-b from-accent-primary to-accent-pink'
            : 'bg-gradient-to-b from-accent-secondary to-accent-primary'
        }`} />

        <div className="pl-3">
          {/* Header row */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 15, scale: 1.15 }}
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  item.type === 'work'
                    ? 'bg-gradient-to-br from-accent-primary/20 to-accent-pink/10 text-accent-primary'
                    : 'bg-gradient-to-br from-accent-secondary/20 to-accent-primary/10 text-accent-secondary'
                }`}
              >
                <Icon size={18} />
              </motion.div>
              <div>
                <h3 className={`text-sm font-medium font-[family-name:var(--font-display)] leading-tight ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {item.title}
                </h3>
                <p className={`text-xs font-normal mt-0.5 ${
                  item.type === 'work' ? 'text-accent-primary' : 'text-accent-secondary'
                }`}>
                  {item.organization}
                </p>
              </div>
            </div>

            <span className={`px-2.5 py-1 rounded-full text-[10px] font-light tracking-wider shrink-0 ${
              item.type === 'work'
                ? darkMode ? 'bg-accent-primary/10 text-accent-primary' : 'bg-purple-50 text-purple-600'
                : darkMode ? 'bg-accent-secondary/10 text-accent-secondary' : 'bg-cyan-50 text-cyan-600'
            }`}>
              {item.period}
            </span>
          </div>

          {/* Description */}
          <p className={`text-xs leading-[1.8] font-light ${darkMode ? 'text-dark-300' : 'text-gray-500'}`}>
            {item.description}
          </p>
        </div>
      </TiltCard>
    </ScrollReveal>
  )
}

export default function Timeline({ darkMode }) {
  return (
    <section id="experience" className="py-32 px-8 relative aurora-bg">
      <div className="max-w-5xl mx-auto relative z-10">
        <ScrollReveal>
          <SectionHeading
            title="Experience & Education"
            subtitle="My professional journey and academic background."
            light={!darkMode}
          />
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-5">
          {experience.map((item, i) => (
            <TimelineCard
              key={`${item.title}-${i}`}
              item={item}
              index={i}
              darkMode={darkMode}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
