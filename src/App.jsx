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
                start: "top 100%", // Commence dès que la section touche le bas de l'écran
                end: "top 90%",   // Est déjà à 100% nette quand elle est entrée de 10%
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
              start: "bottom 10%", // Commence à flouter SEULEMENT quand elle est 90% sortie
              end: "bottom 0%",   // Finit de flouter quand elle disparaît
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
