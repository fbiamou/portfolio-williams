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
    // Configuration Lenis optimisée pour mobile et synchronisée avec GSAP
    const lenis = new Lenis({
      smoothWheel: true,
      syncTouch: true // Aide à synchroniser sur mobile
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      // Transitions globales des sections (Flou et Fondu au scroll)
      const sections = document.querySelectorAll('section');
      sections.forEach((section, index) => {
        // Effet d'entrée (Flou -> Net)
        if (index > 0) {
          gsap.fromTo(section, 
            { opacity: 0.3, filter: "blur(10px)", y: 40 },
            { 
              opacity: 1, 
              filter: "blur(0px)", 
              y: 0,
              scrollTrigger: {
                trigger: section,
                start: "top 85%", // Commence quand le haut arrive en bas de l'écran
                end: "top 50%",   // Finit très vite (à la moitié de l'écran), donc l'image est claire rapidement
                scrub: 1
              }
            }
          );
        }

        // Effet de sortie (Net -> Flou)
        gsap.fromTo(section, 
          { opacity: 1, filter: "blur(0px)" },
          { 
            opacity: 0.3, 
            filter: "blur(10px)",
            scrollTrigger: {
              trigger: section,
              start: "bottom 50%", // Ne commence à se flouter QUE quand la section est à moitié sortie
              end: "bottom 0%",   // Finit de flouter quand elle est totalement sortie
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
