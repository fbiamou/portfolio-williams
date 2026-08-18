import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function LiquidCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    let lastTime = 0;
    let isMoving = false;
    let timeout;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      
      // Limiter la création d'ondes pour les performances (throttle)
      const now = Date.now();
      if (now - lastTime > 50) { // Crée une onde toutes les 50ms
        createRipple(clientX, clientY);
        lastTime = now;
      }

      isMoving = true;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        isMoving = false;
      }, 100);
    };

    const createRipple = (x, y) => {
      if (!cursorRef.current) return;
      
      const ripple = document.createElement("div");
      ripple.className = "absolute rounded-full border border-accent/40 bg-accent/5 pointer-events-none mix-blend-screen";
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.style.transform = "translate(-50%, -50%)";
      // Effet visuel "surface de l'eau" : léger flou et distorsion via CSS
      ripple.style.backdropFilter = "blur(2px) brightness(1.2)";
      ripple.style.WebkitBackdropFilter = "blur(2px) brightness(1.2)";
      
      cursorRef.current.appendChild(ripple);

      // Animation d'expansion et de dissipation (comme une goutte sur l'eau)
      gsap.fromTo(ripple, 
        { width: 10, height: 10, opacity: 0.8 },
        { 
          width: 120, 
          height: 120, 
          opacity: 0, 
          duration: 1.5, 
          ease: "power2.out", 
          onComplete: () => {
            if (ripple.parentNode) ripple.parentNode.removeChild(ripple);
          }
        }
      );
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div 
      ref={cursorRef} 
      className="fixed inset-0 pointer-events-none z-[100] overflow-hidden"
    >
      {/* Conteneur pour les ondes liquides */}
    </div>
  );
}
