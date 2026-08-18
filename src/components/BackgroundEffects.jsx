import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function BackgroundEffects() {
  const containerRef = useRef(null);
  const auraRef = useRef(null);
  const particlesRef = useRef([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // ---- 1. Animation de l'Aura Hypnotique (Scroll) ----
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1, // scrub fluide
        }
      });

      // Utilisation de x/y (GPU) au lieu de top/left (CPU/Reflow) pour la fluidité !
      gsap.set(auraRef.current, { x: "10vw", y: "0vh", opacity: 0.3, scale: 1 });

      tl.to(auraRef.current, { x: "70vw", y: "20vh", opacity: 0.8, scale: 1.5, duration: 1, ease: "power1.inOut" })
        .to(auraRef.current, { x: "90vw", y: "40vh", opacity: 0, scale: 0.5, duration: 0.5, ease: "power1.in" })
        .set(auraRef.current, { x: "0vw", y: "50vh" })
        .to(auraRef.current, { x: "20vw", y: "60vh", opacity: 1, scale: 2, duration: 1, ease: "power1.out" })
        .to(auraRef.current, { x: "60vw", y: "80vh", opacity: 0.6, scale: 1.2, duration: 1, ease: "power1.inOut" })
        .to(auraRef.current, { x: "50vw", y: "100vh", opacity: 0, scale: 0.8, duration: 0.5, ease: "power1.in" });

      // ---- 2. Animation continue des Particules (Uniquement Desktop) ----
      if (!isMobile) {
        particlesRef.current.forEach((particle, i) => {
          if (!particle) return;
          gsap.to(particle, {
            y: `random(-30, 30)`,
            x: `random(-30, 30)`,
            rotation: `random(-45, 45)`,
            duration: `random(3, 6)`,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.2
          });

          gsap.to(particle, {
            scrollTrigger: {
              trigger: document.body,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
            y: (i + 1) * -150, 
            ease: "none"
          });
        });

        const handleMouseMove = (e) => {
          const { clientX, clientY } = e;
          const cx = window.innerWidth / 2;
          const cy = window.innerHeight / 2;
          const moveX = (clientX - cx) / cx; 
          const moveY = (clientY - cy) / cy;

          particlesRef.current.forEach((particle, i) => {
            if (!particle) return;
            const depth = (i % 3) + 1; 
            gsap.to(particle, {
              x: moveX * depth * -40,
              y: moveY * depth * -40,
              duration: 2,
              ease: "power2.out",
              overwrite: "auto" 
            });
          });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
      }
    });

    return () => ctx.revert();
  }, [isMobile]);

  // Génération des particules uniquement si on est sur Desktop
  const particles = !isMobile ? Array.from({ length: 15 }).map((_, i) => {
    const size = Math.random() * 200 + 50; 
    const initialTop = Math.random() * 100;
    const initialLeft = Math.random() * 100;
    const opacity = Math.random() * 0.2 + 0.15; 

    return (
      <div
        key={i}
        ref={el => particlesRef.current[i] = el}
        className="absolute rounded-full pointer-events-none mix-blend-screen"
        style={{
          width: size,
          height: size,
          top: `${initialTop}%`,
          left: `${initialLeft}%`,
          background: `radial-gradient(circle, rgba(0,168,204,${opacity}) 0%, rgba(0,168,204,0) 70%)`,
          filter: "blur(4px)",
          willChange: "transform"
        }}
      />
    );
  }) : null;

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles}
      
      {/* Aura optimisée (sans mix-blend-screen lourd sur mobile) */}
      <div 
        ref={auraRef}
        className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,168,204,0.35) 0%, rgba(0,168,204,0.1) 40%, rgba(0,0,0,0) 70%)",
          filter: "blur(20px)",
          transform: "translate(-50%, -50%)",
          willChange: "transform, opacity"
        }}
      />
    </div>
  );
}
