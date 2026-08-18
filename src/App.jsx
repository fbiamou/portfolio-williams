import { useEffect } from 'react'
import Lenis from 'lenis'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import BackgroundEffects from './components/BackgroundEffects'
import LiquidCursor from './components/LiquidCursor'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function App() {
  useEffect(() => {
    const lenis = new Lenis()
    
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    
    requestAnimationFrame(raf)

    // Transitions globales des sections (Flou et Fondu au scroll)
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
      // Effet d'entrée (Flou -> Net) pour toutes les sections sauf la première (Hero)
      if (index > 0) {
        gsap.fromTo(section, 
          { opacity: 0, filter: "blur(15px)", y: 50 },
          { 
            opacity: 1, 
            filter: "blur(0px)", 
            y: 0,
            scrollTrigger: {
              trigger: section,
              start: "top 85%", 
              end: "top 25%",   
              scrub: 1
            }
          }
        );
      }

      // Effet de sortie (Net -> Flou) pour toutes les sections
      gsap.fromTo(section, 
        { opacity: 1, filter: "blur(0px)" },
        { 
          opacity: 0, 
          filter: "blur(15px)",
          scrollTrigger: {
            trigger: section,
            start: "bottom 30%",
            end: "bottom 0%",   
            scrub: 1
          }
        }
      );
    });

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <LiquidCursor />
      <BackgroundEffects />
      <Header />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
