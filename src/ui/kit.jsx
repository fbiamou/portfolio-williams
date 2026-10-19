import { createContext, useContext, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Défilement fluide Lenis branché sur GSAP. */
export function useSmoothScroll() {
  useEffect(() => {
    if (reduced()) return;
    const lenis = new Lenis({ lerp: 0.1, syncTouch: false });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    window.__lenis = lenis;
    return () => { gsap.ticker.remove(tick); lenis.destroy(); window.__lenis = null; };
  }, []);
}

/**
 * Apparition au défilement fiable : IntersectionObserver + transitions CSS (voir index.css).
 * Rien ne dépend d'un calcul de position GSAP : un élément visible à l'écran s'affiche toujours.
 *  data-reveal="up" (défaut) | "lines" (titre ligne par ligne) | "stagger" (enfants en cascade) | "scale"
 */
export function useReveal(deps = []) {
  const root = useRef(null);
  useEffect(() => {
    const els = [...document.querySelectorAll('[data-reveal]')];
    if (reduced() || !('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('is-in')); return; }
    document.documentElement.classList.add('reveal-ready');
    els.forEach((el) => {
      const sel = el.dataset.reveal === 'stagger' ? ':scope > *' : el.dataset.reveal === 'lines' ? '.line-in' : null;
      if (sel) el.querySelectorAll(sel).forEach((c, i) => c.style.setProperty('--i', Math.min(i, 12)));
    });
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.01 });
    els.forEach((el) => { if (!el.classList.contains('is-in')) io.observe(el); });
    // filet de sécurité : contrôle de position régulier, indépendant de l'observateur (défilement rapide, onglet en arrière-plan)
    const sweep = () => {
      const left = els.filter((el) => !el.classList.contains('is-in'));
      left.forEach((el) => { if (el.getBoundingClientRect().top < innerHeight * 0.95) el.classList.add('is-in'); });
      if (!left.length) clearInterval(timer);
    };
    const timer = setInterval(sweep, 300);
    window.addEventListener('scroll', sweep, { passive: true });
    return () => { io.disconnect(); clearInterval(timer); window.removeEventListener('scroll', sweep); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return root;
}

/** Titre de section avec masque ligne par ligne. */
export function SplitTitle({ lines, className = '' }) {
  return (
    <h2 data-reveal="lines" className={className}>
      {lines.map((l, i) => (
        <span key={i} className="line-mask"><span className="line-in block">{l}</span></span>
      ))}
    </h2>
  );
}

/** Halo qui suit la souris sur les cartes .spot */
export const spotMove = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  e.currentTarget.style.setProperty('--ry', `${((e.clientX - r.left) / r.width - 0.5) * 6}deg`);
  e.currentTarget.style.setProperty('--rx', `${(0.5 - (e.clientY - r.top) / r.height) * 5}deg`);
};


/** Effet magnétique léger : utilise la propriété CSS `translate`, indépendante des transforms GSAP. */
export function useMagnetic() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced() || !window.matchMedia('(hover: hover)').matches) return;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      el.style.translate = `${(e.clientX - (r.left + r.width / 2)) * 0.2}px ${(e.clientY - (r.top + r.height / 2)) * 0.25}px`;
    };
    const leave = () => { el.style.translate = ''; };
    el.addEventListener('mousemove', move);
    el.addEventListener('mouseleave', leave);
    return () => { el.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', leave); };
  }, []);
  return ref;
}

export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -70, duration: 1.4 });
  else el.scrollIntoView({ behavior: 'smooth' });
}

const LangCtx = createContext({ lang: 'fr', setLang: () => {} });
export const useLang = () => useContext(LangCtx);
export const LANGS = ['fr', 'es', 'en'];

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      const s = localStorage.getItem('lang');
      if (LANGS.includes(s)) return s;
    } catch { /* stockage indisponible */ }
    const n = (navigator.language || 'fr').slice(0, 2);
    return LANGS.includes(n) ? n : 'fr';
  });
  const setLang = (l) => {
    setLangState(l);
    try { localStorage.setItem('lang', l); } catch { /* ignore */ }
  };
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  return <LangCtx.Provider value={{ lang, setLang }}>{children}</LangCtx.Provider>;
}

/** Barre de navigation fixe, progression de lecture et sélecteur de langue. */
export function Nav({ items }) {
  const bar = useRef(null);
  const nav = useRef(null);
  const { lang, setLang } = useLang();

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const p = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      nav.current?.classList.toggle('nav-solid', h.scrollTop > 40);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!reduced()) gsap.from(nav.current, { y: -80, opacity: 0, duration: 1, ease: 'expo.out', delay: 0.2 });
  }, []);

  const go = (e, id) => { e.preventDefault(); scrollToId(id); };

  return (
    <header ref={nav} className="fixed top-0 inset-x-0 z-50 transition-colors duration-500 [&.nav-solid]:bg-background/75 [&.nav-solid]:backdrop-blur-xl [&.nav-solid]:border-b [&.nav-solid]:border-line">
      <div ref={bar} className="absolute top-0 left-0 h-[2px] w-full origin-left bg-accent scale-x-0" />
      <div className="container-x flex items-center justify-between h-16 md:h-20">
        <a href="#top" onClick={(e) => { e.preventDefault(); window.__lenis ? window.__lenis.scrollTo(0) : window.scrollTo(0, 0); }} className="font-serif text-xl font-bold tracking-tight">
          Williams<span className="text-accent">.</span>
        </a>
        <nav className="hidden md:flex items-center gap-9 text-sm text-white/70">
          {items.map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={(e) => go(e, id)} className="link-u hover:text-white transition-colors">{label[lang]}</a>
          ))}
        </nav>
        <div role="group" aria-label="Language" className="flex rounded-full border border-line bg-background/40 p-0.5 text-xs font-medium">
          {LANGS.map((l) => (
            <button key={l} onClick={() => setLang(l)} aria-pressed={lang === l}
              className={`px-3 py-1.5 rounded-full uppercase transition-all duration-300 cursor-pointer ${lang === l ? 'bg-accent text-[#031a21]' : 'text-white/60 hover:text-white'}`}>{l}</button>
          ))}
        </div>
      </div>
    </header>
  );
}

export function Marquee({ items }) {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-line py-3 md:py-4 select-none" aria-hidden>
      <div className="flex w-max animate-marquee">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center">
            {row.map((t, i) => (
              <span key={i} className="flex items-center">
                <span className={`font-serif text-xl md:text-3xl px-6 md:px-9 whitespace-nowrap ${i % 2 ? 'outline-text' : 'text-white/85 italic'}`}>{t}</span>
                <span className="text-accent text-xl">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
