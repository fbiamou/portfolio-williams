import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function BackgroundEffects() {
  const containerRef = useRef(null);
  const auraRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    // ---- 1. Animation de l'Aura Hypnotique (Scroll) ----
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1, // scrub fluide
      }
    });

    // L'aura démarre en haut à gauche
    gsap.set(auraRef.current, { top: "0%", left: "10%", opacity: 0.3, scale: 1 });

    tl.to(auraRef.current, { top: "20%", left: "70%", opacity: 0.8, scale: 1.5, duration: 1, ease: "power1.inOut" })
      .to(auraRef.current, { top: "40%", left: "90%", opacity: 0, scale: 0.5, duration: 0.5, ease: "power1.in" }) // Disparaît à droite
      .set(auraRef.current, { left: "0%", top: "50%" }) // Se téléporte à gauche discrètement
      .to(auraRef.current, { top: "60%", left: "20%", opacity: 1, scale: 2, duration: 1, ease: "power1.out" }) // Réapparaît
      .to(auraRef.current, { top: "80%", left: "60%", opacity: 0.6, scale: 1.2, duration: 1, ease: "power1.inOut" })
      .to(auraRef.current, { top: "100%", left: "50%", opacity: 0, scale: 0.8, duration: 0.5, ease: "power1.in" });

    // ---- 2. Animation continue des Particules (Flottement) ----
    particlesRef.current.forEach((particle, i) => {
      // Flottement constant
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

      // Parallaxe au scroll
      gsap.to(particle, {
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: (i + 1) * -150, // Différentes vitesses selon la particule
        ease: "none"
      });
    });

    // ---- 3. Réaction à la souris (Effet 3D) ----
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      
      const moveX = (clientX - cx) / cx; // Valeur entre -1 et 1
      const moveY = (clientY - cy) / cy;

      // Déplacer les particules en fonction de la souris (répulsion douce)
      particlesRef.current.forEach((particle, i) => {
        const depth = (i % 3) + 1; // Profondeur simulée
        gsap.to(particle, {
          x: moveX * depth * -40,
          y: moveY * depth * -40,
          duration: 2,
          ease: "power2.out",
          overwrite: "auto" // Écrase l'animation de flottement sur l'axe X/Y temporairement
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      tl.kill();
    };
  }, []);

  // Génération de 15 particules aléatoires
  const particles = Array.from({ length: 15 }).map((_, i) => {
    const size = Math.random() * 200 + 50; // Entre 50px et 250px
    const initialTop = Math.random() * 100;
    const initialLeft = Math.random() * 100;
    const opacity = Math.random() * 0.2 + 0.15; // Opacité augmentée (entre 0.15 et 0.35)

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
          filter: "blur(4px)", // Flou fortement réduit
          willChange: "transform"
        }}
      />
    );
  });

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Les particules de fond */}
      {particles}

      {/* L'aura lumineuse hypnotique */}
      <div 
        ref={auraRef}
        className="absolute w-[400px] h-[400px] rounded-full pointer-events-none mix-blend-screen"
        style={{
          background: "radial-gradient(circle, rgba(0,168,204,0.5) 0%, rgba(0,168,204,0.2) 40%, rgba(0,0,0,0) 70%)",
          filter: "blur(15px)", // Flou réduit pour plus de netteté
          transform: "translate(-50%, -50%)", // Pour centrer l'aura sur ses coordonnées top/left
          willChange: "transform, top, left, opacity"
        }}
      />
    </div>
  );
}
