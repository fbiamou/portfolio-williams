import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import ContactModal from './ContactModal';

export default function Hero() {
  const container = useRef(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animation timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-subtitle", {
        y: 20,
        opacity: 0,
        duration: 1,
        delay: 0.2
      })
      .from(".hero-title .char", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.05,
        ease: "expo.out"
      }, "-=0.6")
      .from(".hero-desc", {
        y: 20,
        opacity: 0,
        duration: 1
      }, "-=0.8")
      .from(".hero-btn", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        clearProps: "all"
      }, "-=0.6")
      .from(".hero-image", {
        x: 60,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out"
      }, "-=1.2");

    }, container);

    return () => ctx.revert();
  }, []);

  // Split text for animation
  const titleLine1 = "Fred Williams".split("").map((char, index) => (
    <span key={'l1-'+index} className="char inline-block">{char === " " ? "\u00A0" : char}</span>
  ));
  const titleLine2 = "BIAMOU TOWA".split("").map((char, index) => (
    <span key={'l2-'+index} className="char inline-block">{char === " " ? "\u00A0" : char}</span>
  ));

  return (
    <section ref={container} className="relative min-h-[100vh] flex flex-col justify-center overflow-hidden px-6 sm:px-12 lg:px-24 pt-32 pb-24 lg:pt-0 lg:pb-0">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:py-20">
        
        {/* Left Content */}
        <div className="flex-1 flex flex-col items-start max-w-3xl">
          <h2 className="hero-subtitle text-accent font-medium tracking-[0.2em] uppercase text-sm mb-6">
            Design Engineer & Consultant IT
          </h2>
          
          <h1 className="hero-title text-[2.5rem] leading-[1.1] sm:text-7xl lg:text-[5rem] xl:text-7xl font-serif font-bold text-white mb-8">
            <span className="block">{titleLine1}</span>
            <span className="block text-white/90">{titleLine2}</span>
          </h1>
          
          <p className="hero-desc text-white/80 text-left text-lg sm:text-xl max-w-2xl leading-relaxed mb-12 font-sans font-light">
            Je conçois des solutions digitales innovantes pour automatiser vos tâches, optimiser votre fonctionnement interne et vous positionner en leader de votre secteur.
          </p>

          <div className="flex flex-wrap gap-6">
            <button onClick={() => setIsContactModalOpen(true)} className="hero-btn group relative flex items-center justify-center gap-3 px-8 py-4 bg-accent text-background font-semibold rounded-full overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(0,168,204,0.4)] active:scale-95">
              <div className="absolute inset-0 bg-white/20 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              <span className="relative z-10">Me Contacter</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <a href="https://gnrwzguu.mychariow.store/" target="_blank" rel="noopener noreferrer" className="hero-btn group relative flex items-center justify-center gap-3 px-8 py-4 bg-surface border border-accent/20 text-textPrimary hover:text-accent font-medium rounded-full transition-all duration-300 hover:-translate-y-2 hover:border-accent/50 hover:bg-surface/50 hover:shadow-[0_0_15px_rgba(0,168,204,0.15)] active:scale-95">
              <ShoppingBag className="w-5 h-5 transition-transform group-hover:-translate-y-1" />
              <span>Ma Boutique</span>
            </a>
          </div>
        </div>

        {/* Right Content - Portrait : positionné en absolu pour couvrir toute la moitié droite */}
        <div className="hero-image hidden lg:block absolute top-0 right-0 bottom-[56px] w-[65%] xl:w-[60%] pointer-events-none z-[5]">
          {/* Lueur accent derrière */}
          <div className="absolute inset-0 bg-accent/8 blur-[100px] rounded-full pointer-events-none scale-75 translate-y-10"></div>
          {/* Image avec masque pour fondu gauche + bas */}
          <img 
            src="/images/portrait.png" 
            alt="Portrait de Fred Williams" 
            className="absolute bottom-0 right-0 w-full h-full object-contain object-bottom xl:object-right-bottom scale-[1.15] xl:scale-125 transform-origin-bottom"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 95%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 5%, black 85%, transparent 100%)',
              maskComposite: 'intersect',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 95%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 5%, black 85%, transparent 100%)',
              WebkitMaskComposite: 'source-in'
            }}
          />
        </div>

        {/* Portrait Mobile & Tablette uniquement */}
        <div className="hero-image lg:hidden w-full flex justify-center mt-12 mb-4 relative">
          <div className="absolute inset-0 bg-accent/5 blur-[80px] rounded-full pointer-events-none"></div>
          <img 
            src="/images/portrait.png" 
            alt="Portrait de Fred Williams" 
            className="relative z-10 w-[95%] max-w-[420px] sm:max-w-[550px] h-auto object-contain scale-110 sm:scale-125 origin-bottom"
            style={{
              maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%), linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
              maskComposite: 'intersect',
              WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%), linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
              WebkitMaskComposite: 'source-in'
            }}
          />
        </div>
      </div>

      {/* Bandeau défilant (Marquee) en bas du Hero */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden border-t border-accent/20 shadow-[0_0_15px_rgba(0,168,204,0.15)] bg-background/50 backdrop-blur-md py-4 pointer-events-auto z-20">
        <div className="flex whitespace-nowrap animate-marquee w-max">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 px-6">
              {['React', 'GSAP', 'Tailwind CSS', 'Figma', 'Node.js', 'Notion', 'UI/UX Design', 'Vite', 'Frontend Dev', 'Next.js', 'TypeScript', 'Webflow', 'SEO', 'Astro'].map((tool, j) => (
                <span key={j} className="text-white/40 font-mono text-sm tracking-wider uppercase flex items-center gap-12">
                  {tool}
                  <span className="text-accent/30">•</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </section>
  );
}
