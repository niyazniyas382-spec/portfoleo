import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMail, HiLocationMarker, HiCheck } from 'react-icons/hi'
import { FiSend } from 'react-icons/fi'
import ScrollReveal from '../components/ScrollReveal'
import SectionHeading from '../components/SectionHeading'
import { personalInfo, socialLinks } from '../data/portfolio'

export default function Contact({ darkMode }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused] = useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setFormData({ name: '', email: '', message: '' })
  }

  const inputClasses = (field) => `w-full px-4 py-3.5 rounded-xl text-sm font-light outline-none transition-all duration-300 ${
    darkMode
      ? `bg-dark-700/30 border text-white placeholder-dark-400 ${
          focused === field
            ? 'border-accent-primary/50 ring-2 ring-accent-primary/10 bg-dark-700/50'
            : 'border-dark-500/30 hover:border-dark-400/50'
        }`
      : `bg-white/80 border text-gray-900 placeholder-gray-400 ${
          focused === field
            ? 'border-purple-400/50 ring-2 ring-purple-200/30 bg-white'
            : 'border-gray-200 hover:border-purple-200'
        }`
  }`

  return (
    <section id="contact" className="py-32 px-8 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-primary/5 rounded-full blur-[200px] float-animation" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <ScrollReveal>
          <SectionHeading
            title="Get In Touch"
            subtitle="Have a project in mind or just want to say hello? I'd love to hear from you."
            light={!darkMode}
          />
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-16 max-w-4xl mx-auto mt-4">
          {/* Info side */}
          <ScrollReveal direction="left">
            <div className="space-y-10">
              <div>
                <h3
                  className={`text-xl font-medium font-[family-name:var(--font-display)] mb-4 leading-snug ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  Let's build something{' '}
                  <span className="gradient-text">amazing</span> together
                </h3>
                <p className={`text-sm leading-[1.9] font-light ${darkMode ? 'text-dark-300' : 'text-gray-500'}`}>
                  I'm always open to discussing new projects, creative ideas, or
                  opportunities to be part of your vision.
                </p>
              </div>

              {/* Contact details */}
              <div className="space-y-4">
                {[
                  { icon: HiMail, label: 'Email', value: personalInfo.email, color: 'accent-primary' },
                  { icon: HiLocationMarker, label: 'Location', value: personalInfo.location, color: 'accent-secondary' },
                ].map((item) => (
                  <motion.div
                    key={item.label}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-4 cursor-default"
                  >
                    <motion.div
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      className={`w-11 h-11 rounded-xl bg-${item.color}/10 flex items-center justify-center text-${item.color}`}
                    >
                      <item.icon size={18} />
                    </motion.div>
                    <div>
                      <p className={`text-[10px] tracking-[0.15em] uppercase font-light ${darkMode ? 'text-dark-400' : 'text-gray-400'}`}>{item.label}</p>
                      <p className={`text-sm font-normal ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {item.value}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social links */}
              <div>
                <p className={`text-[10px] font-light tracking-[0.2em] uppercase mb-4 ${darkMode ? 'text-dark-400' : 'text-gray-400'}`}>
                  Find me on
                </p>
                <div className="flex gap-3">
                  {socialLinks.map((link, i) => (
                    <motion.a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -4, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-11 h-11 rounded-xl flex items-center justify-center text-base transition-all duration-300 magnetic-hover ${
                        darkMode
                          ? 'bg-dark-600/30 text-dark-200 hover:bg-accent-primary hover:text-white hover:shadow-lg hover:shadow-accent-primary/20'
                          : 'bg-purple-50 text-purple-400 hover:bg-accent-primary hover:text-white hover:shadow-lg hover:shadow-accent-primary/20'
                      }`}
                    >
                      <link.icon />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Form side */}
          <ScrollReveal direction="right">
            <motion.form
              onSubmit={handleSubmit}
              className={`card-premium rounded-2xl p-8 space-y-5 ${
                darkMode ? 'glass' : 'glass light-card'
              }`}
            >
              <div>
                <label className={`block text-[10px] font-light tracking-[0.15em] uppercase mb-2.5 ${darkMode ? 'text-dark-200' : 'text-gray-500'}`}>
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused(null)}
                  required
                  placeholder="John Smith"
                  className={inputClasses('name')}
                />
              </div>
              <div>
                <label className={`block text-[10px] font-light tracking-[0.15em] uppercase mb-2.5 ${darkMode ? 'text-dark-200' : 'text-gray-500'}`}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  required
                  placeholder="john@example.com"
                  className={inputClasses('email')}
                />
              </div>
              <div>
                <label className={`block text-[10px] font-light tracking-[0.15em] uppercase mb-2.5 ${darkMode ? 'text-dark-200' : 'text-gray-500'}`}>
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused(null)}
                  required
                  rows={4}
                  placeholder="Tell me about your project..."
                  className={`${inputClasses('message')} resize-none`}
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className={`glow-btn w-full py-3.5 rounded-xl font-medium text-sm tracking-wide text-white flex items-center justify-center gap-2 transition-all duration-300 ${
                  submitted
                    ? 'bg-emerald-500'
                    : 'bg-gradient-to-r from-accent-primary to-accent-secondary'
                }`}
              >
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.span
                      key="sent"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2"
                    >
                      <HiCheck size={18} /> Message Sent!
                    </motion.span>
                  ) : (
                    <motion.span
                      key="send"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2"
                    >
                      <FiSend size={14} /> Send Message
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
