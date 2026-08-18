import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const container = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animation d'apparition des projets
      gsap.from(".project-card", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        },
        y: 80,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "expo.out"
      });

      // Apparition du titre principal
      gsap.from(".projects-title-line", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        },
        y: "120%",
        duration: 1.5,
        stagger: 0.1,
        ease: "expo.out"
      });
    }, container);

    return () => ctx.revert();
  }, []);

  const projects = [
    {
      title: "Portfolio Personnel & Landing Page",
      category: "Design Engineer & Frontend",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2015",
      description: "Conception et développement de bout en bout de ce portfolio interactif. Focus sur les animations GSAP fluides, une typographie éditoriale élégante, un design system sombre rigoureux et de hautes performances mobiles (sans backend).",
      url: "#"
    }
  ];

  return (
    <section id="projects" ref={container} className="relative min-h-screen py-24 px-6 sm:px-12 lg:px-24 bg-surface">
      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* En-tête de section */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h2 className="text-accent font-medium tracking-[0.2em] uppercase text-sm mb-4">Réalisations</h2>
            <h3 className="text-4xl lg:text-5xl font-serif font-bold text-textPrimary leading-[1.1]">
              <div className="overflow-hidden py-1"><div className="projects-title-line">Une sélection de</div></div>
              <div className="overflow-hidden py-1"><div className="projects-title-line text-white/60">projets récents.</div></div>
            </h3>
          </div>
          <p className="text-white/60 text-lg max-w-md font-light text-left md:text-right">
            De la réflexion UX au développement final, chaque projet est pensé pour allier esthétique et performance.
          </p>
        </div>

        {/* Grille de projets */}
        <div className="max-w-5xl mx-auto">
          {projects.map((project, index) => {
            const isClickable = project.url && project.url !== "#";
            const CardTag = isClickable ? "a" : "div";
            
            return (
              <CardTag 
                key={index} 
                href={isClickable ? project.url : undefined}
                className={`project-card group relative block overflow-hidden rounded-2xl bg-background border border-white/5 ${isClickable ? 'cursor-pointer' : 'cursor-default'}`}
              >
                {/* Conteneur Image avec overlay */}
                <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] w-full overflow-hidden">
                  <div className="absolute inset-0 bg-background/20 z-10 lg:group-hover:bg-transparent transition-colors duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/60 lg:via-background/20 to-transparent z-10" />
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out lg:group-hover:scale-105"
                  />
                </div>

                {/* Contenu Textuel */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 z-20 transform transition-transform duration-500 lg:group-hover:-translate-y-2">
                  <span className="inline-block px-4 py-1.5 bg-accent text-background text-sm font-semibold rounded-full mb-4">
                    {project.category}
                  </span>
                  <div className="flex items-center justify-between gap-4">
                    <h4 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-white">{project.title}</h4>
                    {isClickable && (
                      <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 transition-all duration-300 lg:group-hover:bg-accent lg:group-hover:text-background lg:group-hover:border-accent lg:group-hover:scale-110 shrink-0">
                        <ArrowUpRight className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                  {/* Toujours visible sur mobile, masqué sur desktop jusqu'au survol */}
                  <p className="text-white/70 mt-4 font-light max-w-2xl text-base sm:text-lg lg:opacity-0 lg:h-0 lg:mt-0 lg:group-hover:opacity-100 lg:group-hover:h-auto lg:group-hover:mt-6 transition-all duration-500">
                    {project.description}
                  </p>
                </div>
              </CardTag>
            );
          })}
        </div>

      </div>
    </section>
  );
}
