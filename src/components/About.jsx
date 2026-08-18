import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Briefcase, GraduationCap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const container = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animation plus dramatique (style Lusion) : easing expo.out, durée plus longue
      gsap.from(".about-reveal", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        },
        y: 30,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "expo.out"
      });

      // Effet parallax sur la lueur d'arrière-plan
      gsap.to(".about-glow", {
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
        y: 200,
        ease: "none"
      });

      // Apparition du titre principal par masquage (Mask Reveal)
      gsap.from(".about-title-line", {
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
    }, container);

    return () => ctx.revert();
  }, []);

  const experiences = [
    {
      title: "Consultant IT & Design Engineer",
      company: "Freelance",
      date: "Mars 2026 – À nos Jours",
      description: [
        "Création de Landing Page (Tunnel de vente) et de Workspace Notion pour l'optimisation des tâches.",
        "Rédaction d’un plan d’optimisation et de numérisation du trafic commercial (réduction des pertes de prospects).",
        "Conception de campagnes d'affichage de sécurité interne (HSE).",
        "Design Frontend pour la création d’une interface web e-Commerce."
      ]
    },
    {
      title: "Génie Informatique & Designer Graphique",
      company: "UPLINKS",
      date: "Nov. 2022 – Mars 2026",
      description: [
        "Prototypage d’une application de gestion commerciale et de vente.",
        "Audit SEO technique et visuel (augmentation moyenne de 35% du trafic organique).",
        "Administration des serveurs d'hébergement clients (taux de disponibilité de 99,9%)."
      ]
    }
  ];

  const certifications = [
    "Certification Professionnel DOMESTIKA : Spécialisation en Design Graphique et Communication Visuelle (2026)",
    "Certification UX Design (Domestika) (2026)"
  ];

  return (
    <section id="about" ref={container} className="relative min-h-screen py-24 px-6 sm:px-12 lg:px-24 overflow-hidden">
      {/* Background Decor avec Parallax (Désactivé sur mobile pour performances) */}
      <div className="about-glow hidden md:block absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* En-tête de section */}
        <div className="mb-16 lg:mb-20">
          <h2 className="about-reveal text-accent font-medium tracking-[0.2em] uppercase text-sm mb-4">À Propos & Vision</h2>
          <h3 className="text-4xl lg:text-5xl font-serif font-bold text-textPrimary leading-[1.1] mb-8">
            <div className="overflow-hidden py-1"><div className="about-title-line">Penser en ingénieur,</div></div>
            <div className="overflow-hidden py-1"><div className="about-title-line text-white/60">concevoir en designer.</div></div>
          </h3>
        </div>

        {/* Grille 2 colonnes : Photo à gauche | Contenu à droite */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-stretch">
          
          {/* Colonne Gauche : Photo en pied */}
          <div className="about-reveal relative w-full lg:w-[45%] flex justify-center lg:justify-start shrink-0 order-first pointer-events-none lg:-my-8">
            <div className="relative w-[95%] sm:w-[85%] max-w-[500px] lg:max-w-none lg:w-full lg:absolute lg:inset-0 lg:h-full">
              {/* Lueur accent derrière la photo */}
              <div className="absolute inset-0 bg-accent/8 blur-[70px] pointer-events-none" />
              {/* Image avec masque radial pour fondu naturel des bords */}
              <img 
                src="/images/fullbody.png" 
                alt="Fred Williams Biamou Towa en pied" 
                className="relative z-10 w-full h-full object-contain object-bottom lg:object-cover lg:object-top"
                style={{
                  maskImage: 'radial-gradient(ellipse 75% 85% at 50% 50%, black 60%, transparent 100%)',
                  WebkitMaskImage: 'radial-gradient(ellipse 75% 85% at 50% 50%, black 60%, transparent 100%)'
                }}
              />
            </div>
          </div>

          {/* Colonne Droite : Contenu texte */}
          <div className="flex-1 w-full min-w-0">
            
            {/* Introduction */}
            <p className="about-reveal text-white/80 text-lg leading-relaxed mb-6 font-sans font-light text-left">
              À l'ère du numérique, la croissance repose sur des opérations fluides et une forte présence. J'aide les entreprises et les indépendants à se positionner en leaders de leur secteur en concevant des solutions digitales innovantes.
            </p>
            <p className="about-reveal text-white/80 text-lg leading-relaxed font-sans font-light text-left mb-12">
              Mon objectif : automatiser vos tâches quotidiennes, optimiser votre fonctionnement interne et éliminer les pertes de temps pour vous permettre de vous concentrer sur le cœur de votre activité.
            </p>

            {/* Parcours / Expérience */}
            <div className="about-reveal flex items-center gap-4 mb-10">
              <div className="p-3 bg-accent/10 text-accent rounded-xl">
                <Briefcase className="w-6 h-6" />
              </div>
              <h4 className="text-3xl font-serif text-white">Mon Parcours</h4>
            </div>

            <div className="relative border-l border-white/10 ml-5 space-y-12 mb-16">
              {experiences.map((exp, index) => (
                <div key={index} className="about-reveal relative pl-8">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-accent ring-4 ring-background" />
                  
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h5 className="text-xl font-semibold text-white">{exp.title}</h5>
                    <span className="text-accent/80 text-xs sm:text-sm font-medium px-2 py-1 bg-accent/10 rounded-full shrink-0 hidden sm:inline-block">{exp.company}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="sm:hidden text-accent/80 text-xs font-medium px-2 py-1 bg-accent/10 rounded-full shrink-0">{exp.company}</span>
                    <span className="block text-white/50 text-sm">{exp.date}</span>
                  </div>
                  
                  <ul className="space-y-2">
                    {exp.description.map((item, idx) => (
                      <li key={idx} className="text-white/70 font-light text-sm sm:text-base flex gap-2">
                        <span className="text-accent/50 mt-1.5">▹</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Formations & Certifications */}
            <div className="about-reveal p-8 bg-surface border border-white/5 rounded-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-accent/10 text-accent rounded-xl">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-serif text-white">Formations & Certifications</h4>
              </div>
              <ul className="space-y-4">
                {certifications.map((cert, index) => (
                  <li key={index} className="flex gap-3 text-white/70 font-light text-sm sm:text-base">
                    <Award className="w-5 h-5 text-accent/70 shrink-0" />
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
