import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { UI } from './data';
import { LangProvider, Nav, Marquee, useLang, useSmoothScroll, useReveal } from './ui/kit';
import { MARQUEE } from './data';
import { Hero, Services, About, Contact, Footer } from './sections';
import Work from './Work';
import Content from './Content';

const NAV = [['work', UI.nav.work], ['services', UI.nav.services], ['content', UI.nav.content], ['about', UI.nav.about], ['contact', UI.nav.contact]];

function Page() {
  const { lang } = useLang();
  useSmoothScroll();
  const root = useReveal([lang]);
  useEffect(() => { const id = setTimeout(() => ScrollTrigger.refresh(), 400); return () => clearTimeout(id); }, [lang]);

  // anciens liens #/creator → section Contenu
  useEffect(() => {
    if (location.hash.startsWith('#/creator')) setTimeout(() => document.getElementById('content')?.scrollIntoView(), 300);
  }, []);

  return (
    <div ref={root} className="grain">
      <div className="env" aria-hidden />
      <Nav items={NAV} />
      <main>
        <Hero />
        <Marquee items={MARQUEE[lang]} />
        <Services />
        <Work />
        <Content />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return <LangProvider><Page /></LangProvider>;
}
