import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Preloader from './components/Preloader'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import WebGLBackground from './components/WebGLBackground'
import FluidCanvas from './components/FluidCanvas'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Timeline from './sections/Timeline'
import Contact from './sections/Contact'

export default function App() {
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    if (darkMode) {
      document.body.classList.remove('light-mode')
    } else {
      document.body.classList.add('light-mode')
    }
  }, [darkMode])

  return (
    <div className={`min-h-screen noise-overlay gradient-mesh ${darkMode ? '' : ''}`}>
      <Preloader darkMode={darkMode} />
      <ScrollProgress />
      <CustomCursor darkMode={darkMode} />
      <WebGLBackground darkMode={darkMode} />
      <FluidCanvas darkMode={darkMode} />
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main>
        <Hero darkMode={darkMode} />
        <div className="section-divider max-w-4xl mx-auto" />
        <About darkMode={darkMode} />
        <div className="section-divider max-w-4xl mx-auto" />
        <Skills darkMode={darkMode} />
        <div className="section-divider max-w-4xl mx-auto" />
        <Projects darkMode={darkMode} />
        <div className="section-divider max-w-4xl mx-auto" />
        <Timeline darkMode={darkMode} />
        <div className="section-divider max-w-4xl mx-auto" />
        <Contact darkMode={darkMode} />
      </main>
      <Footer darkMode={darkMode} />
    </div>
  )
}
