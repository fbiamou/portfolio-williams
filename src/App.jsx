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
    // Configuration Lenis optimisée
    const lenis = new Lenis({
      smoothWheel: true,
      syncTouch: false // On désactive sur mobile pour laisser le scroll natif pur
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      // On active ces animations LOURDES uniquement sur Tablette et PC (>= 768px)
      // Sur mobile, l'utilisateur aura un défilement natif parfait, sans effets de flou qui causent des bugs ou des délais.
      mm.add("(min-width: 768px)", () => {
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
                  start: "top 100%", // Commence au bas de l'écran
                  end: "top 75%",   // Finit quand elle occupe 25% de l'écran visible
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
    });

    return () => {
      lenis.destroy();
      ctx.revert(); 
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
