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

    const ctx = gsap.context(() => {
      // Transitions globales des sections (Flou et Fondu au scroll)
      const sections = document.querySelectorAll('section');
      sections.forEach((section, index) => {
        // Effet d'entrée (Flou -> Net) pour toutes les sections sauf la première (Hero)
        // L'entrée commence quand le haut de la section atteint 80% de l'écran, et finit à 20%
        if (index > 0) {
          gsap.fromTo(section, 
            { opacity: 0.4, filter: "blur(10px)", y: 40 },
            { 
              opacity: 1, 
              filter: "blur(0px)", 
              y: 0,
              scrollTrigger: {
                trigger: section,
                start: "top 80%", 
                end: "top 20%",   
                scrub: 1
              }
            }
          );
        }

        // Effet de sortie (Net -> Flou) pour toutes les sections
        // La sortie commence quand le bas de la section atteint 80% (synchronisé avec l'entrée de la suivante)
        gsap.fromTo(section, 
          { opacity: 1, filter: "blur(0px)" },
          { 
            opacity: 0.4, 
            filter: "blur(10px)",
            scrollTrigger: {
              trigger: section,
              start: "bottom 80%",
              end: "bottom 20%",   
              scrub: 1
            }
          }
        );
      });
    });

    return () => {
      lenis.destroy();
      ctx.revert(); // Nettoyage de GSAP pour éviter les bugs au rechargement
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
