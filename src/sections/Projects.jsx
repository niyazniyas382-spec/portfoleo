import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FiGithub, FiExternalLink, FiArrowUpRight } from 'react-icons/fi'
import SectionHeading from '../components/SectionHeading'
import { projects } from '../data/portfolio'

function ProjectRow({ project, darkMode, index }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "0.5 0.5"]
  })

  // Stagger alternating rows left and right
  const isEven = index % 2 === 0
  const xOffset = useTransform(scrollYProgress, [0, 1], [isEven ? -100 : 100, 0])
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1])

  return (
    <motion.div
      ref={ref}
      style={{ opacity, x: xOffset }}
      className={`group relative flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-16 items-center mb-32 last:mb-0`}
    >
      {/* Image Side - Staggered Image Mask Reveal */}
      <div className="w-full md:w-1/2 relative overflow-hidden rounded-3xl aspect-[4/3] magnetic-hover cursor-pointer">
        <motion.div 
          style={{ scale }}
          className="w-full h-full relative"
        >
          {/* Animated gradient placeholder for actual image */}
          <motion.div
            className="absolute inset-0 z-0"
            animate={{
              background: [
                `linear-gradient(135deg, ${project.color}15, ${project.color}30)`,
                `linear-gradient(225deg, ${project.color}20, ${project.color}35)`,
                `linear-gradient(135deg, ${project.color}15, ${project.color}30)`,
              ],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Large Initial Overlay */}
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <h2 className="text-[10rem] font-black opacity-10 mix-blend-overlay">
              {project.title.charAt(0)}
            </h2>
          </div>
          
          {/* Hover overlay with links */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-6 z-20">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/30 hover:scale-110 transition-all"
            >
              <FiGithub size={24} />
            </a>
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/30 hover:scale-110 transition-all"
            >
              <FiExternalLink size={24} />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Content Side with large typography */}
      <div className="w-full md:w-1/2 flex flex-col justify-center">
        <div className="flex items-center gap-4 mb-4">
          <span className={`text-xs tracking-[0.3em] font-medium uppercase ${darkMode ? 'text-accent-primary' : 'text-purple-600'}`}>
            0{index + 1}
          </span>
          <div className="h-px flex-1 bg-current opacity-20" />
        </div>
        
        <h3 className={`text-4xl md:text-5xl lg:text-7xl font-bold font-[family-name:var(--font-display)] mb-6 tracking-tighter ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          {project.title}
        </h3>
        
        <p className={`text-sm md:text-base leading-[1.8] mb-8 max-w-lg font-light ${darkMode ? 'text-dark-300' : 'text-gray-600'}`}>
          {project.description}
        </p>

        {/* Tech stack pillows */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tech.map((t) => (
            <span
              key={t}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-widest uppercase ${
                darkMode
                  ? 'bg-dark-800 text-dark-200 border border-dark-600'
                  : 'bg-white text-gray-700 border border-gray-200'
              }`}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects({ darkMode }) {
  return (
    <section id="projects" className="py-32 px-8 overflow-hidden relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          title="Featured Work"
          subtitle="Selected projects demonstrating full-stack expertise."
          light={!darkMode}
        />

        <div className="mt-24 flex flex-col">
          {projects.map((project, i) => (
            <ProjectRow
              key={project.title}
              project={project}
              darkMode={darkMode}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
