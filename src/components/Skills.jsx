import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PenTool, Code2, Network } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const container = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".skills-title-line", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        },
        y: "120%",
        duration: 1.5,
        stagger: 0.1,
        ease: "expo.out"
      });

      // Apparition des blocs de compétences
      gsap.from(".skill-block", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        },
        y: 60,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "expo.out"
      });

      // Effet parallax léger sur le background
      gsap.to(".skills-glow", {
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
        y: -150,
        ease: "none"
      });
    }, container);

    return () => ctx.revert();
  }, []);

  const skillCategories = [
    {
      title: "Brand Designer",
      icon: <PenTool className="w-8 h-8" />,
      items: [
        "Création d'identités graphiques complètes pour entreprises",
        "Développement d'images de marque (Personal Branding)",
        "Design de supports de communication (affiches, flyers, cartes)"
      ],
      tools: ["Adobe Illustrator", "Photoshop", "InDesign"]
    },
    {
      title: "Vibe Codeur",
      icon: <Code2 className="w-8 h-8" />,
      items: [
        "Création d'applications SaaS et web",
        "Conception de Landing Pages performantes",
        "Développement de bout-en-bout assisté par l'IA"
      ],
      tools: ["IA", "React", "Vite", "Tailwind CSS"]
    },
    {
      title: "Consultant IT & Systèmes",
      icon: <Network className="w-8 h-8" />,
      items: [
        "Installation et maintenance de réseaux (Ethernet & sans fil)",
        "Déploiement de systèmes de sécurité et de contrôle d'accès",
        "Installation d'OS et systèmes de gestion commerciale",
        "Création de workflows d'entreprise"
      ],
      tools: ["ZKTeco", "Hikvision", "Windows", "PacketTracer", "AOMEI", "Notion"]
    }
  ];

  return (
    <section id="skills" ref={container} className="relative min-h-screen py-24 px-6 sm:px-12 lg:px-24 overflow-hidden">
      {/* Background Decor (Désactivé sur mobile pour performances) */}
      <div className="skills-glow hidden md:block absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* En-tête de section */}
        <div className="mb-20 text-center flex flex-col items-center">
          <h2 className="text-accent font-medium tracking-[0.2em] uppercase text-sm mb-4">Expertise</h2>
          <h3 className="text-4xl lg:text-5xl font-serif font-bold text-textPrimary leading-[1.1] mb-6">
            <div className="overflow-hidden py-1"><div className="skills-title-line">L'art de concevoir</div></div>
            <div className="overflow-hidden py-1"><div className="skills-title-line text-white/60">et de construire.</div></div>
          </h3>
        </div>

        {/* Grille des compétences */}
        <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
          {skillCategories.map((category, index) => (
            <div key={index} className="skill-block w-full lg:w-[calc(50%-1.5rem)] max-w-2xl p-8 md:p-12 rounded-3xl bg-surface border border-white/5 relative group text-left">
              {/* Lueur interne au survol */}
              <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />
              
              <div className="flex items-center gap-6 mb-10">
                <div className="p-4 bg-accent/10 text-accent rounded-2xl group-hover:scale-110 transition-transform duration-500">
                  {category.icon}
                </div>
                <h4 className="text-2xl sm:text-3xl font-serif text-white">{category.title}</h4>
              </div>

              <ul className="space-y-6 mb-12">
                {category.items.map((item, idx) => (
                  <li key={idx} className="flex gap-4 items-start">
                    <span className="text-accent mt-1.5 shrink-0">▹</span>
                    <span className="text-white/80 font-light text-base sm:text-lg leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Tags visuels des outils */}
              <div className="pt-8 border-t border-white/10 mt-auto">
                <h5 className="text-sm font-medium text-white/40 uppercase tracking-widest mb-4">Outils & Technologies</h5>
                <div className="flex flex-wrap gap-3">
                  {category.tools.map((tool, idx) => (
                    <span 
                      key={idx} 
                      className="px-4 py-2 bg-background border border-white/10 rounded-full text-white/70 text-sm font-medium hover:border-accent/50 hover:text-accent transition-colors cursor-default"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
