import { useEffect, useRef } from 'react';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { UI } from './data';
import { useLang, useMagnetic, scrollToId } from './ui/kit';

// Mêmes cinq conditions que dans index.css (.film) : sans travelling, la page reste un hero fixe et complet.
const GATES = [
  '(max-width: 720px)',
  '(orientation: portrait) and (max-width: 1024px)',
  '(orientation: portrait) and (pointer: coarse)',
  '(orientation: landscape) and (pointer: coarse) and (max-height: 560px)',
  '(prefers-reduced-motion: reduce)',
];
const BANDS = [[0, 0.22], [0.24, 0.47], [0.49, 0.72]];
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const smooth = (p, a, b) => { const t = clamp((p - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };

export default function Film() {
  const { lang } = useLang();
  const t = UI.hero;
  const b1 = useMagnetic();
  const b2 = useMagnetic();
  const root = useRef(null);
  const video = useRef(null);

  useEffect(() => {
    const el = root.current;
    const v = video.current;
    const mqls = GATES.map((q) => matchMedia(q));
    const gated = () => mqls.some((m) => m.matches);
    const bands = [...el.querySelectorAll('[data-band]')];
    const cache = { cue: -1, veil: -1, settle: -1, vid: -1, bands: bands.map(() => ({ o: -1, k: -1 })) };
    let target = 0, shown = 0, raf = null, last = 0, onScreen = true, loaded = false, loading = false;
    let busy = false, pending = null;

    const progress = () => {
      const r = el.getBoundingClientRect();
      return clamp(-r.top / (r.height - innerHeight || 1), 0, 1);
    };
    const set = (node, key, val, slot) => { // écriture DOM seulement si la valeur change
      if (cache[slot] === val) return; cache[slot] = val; node.style.setProperty(key, val);
    };
    const paint = (p) => {
      set(el, '--cue', smooth(p, 0.02, 0.07).toFixed(3), 'cue');
      set(el, '--veil', smooth(p, 0.7, 0.8).toFixed(3), 'veil');
      set(el, '--settle', smooth(p, 0.8, 0.9).toFixed(3), 'settle');
      const done = p > 0.86; if (cache.done !== done) { cache.done = done; el.classList.toggle('film-done', done); }
      set(el, '--vid', (0.7 + 0.3 * smooth(p, 0.02, 0.2)).toFixed(3), 'vid');
      bands.forEach((b, i) => {
        const [a, z] = BANDS[i]; const f = 0.02, c = cache.bands[i];
        const o = ((i === 0 ? 1 : smooth(p, a, a + f)) * (1 - smooth(p, z - f, z))).toFixed(3);
        const k = i === 0 ? '1.000' : clamp((p - a) / 0.03, 0, 1).toFixed(3);
        if (c.o !== o) { c.o = o; b.style.opacity = o; b.style.visibility = +o === 0 ? 'hidden' : 'visible'; }
        if (c.k !== k) { c.k = k; b.style.setProperty('--k', k); }
      });
    };
    const seek = (time) => {
      if (!v.duration) return;
      if (busy) { pending = time; return; }
      busy = true; v.currentTime = time;
    };
    const onSeeked = () => { busy = false; if (pending !== null) { const x = pending; pending = null; seek(x); } };
    const onErr = () => { busy = false; pending = null; };
    const tick = (now) => {
      const dt = Math.min(100, now - (last || now)); last = now;
      shown += (target - shown) * (1 - Math.pow(1 - 0.16, dt / 16.667));
      if (Math.abs(target - shown) < 0.0005) { shown = target; raf = null; last = 0; } else raf = requestAnimationFrame(tick);
      if (loaded) seek(shown * (v.duration || 0));
      paint(shown);
    };
    const onScroll = () => {
      if (gated()) return;
      target = progress();
      if (raf === null && onScreen) raf = requestAnimationFrame(tick);
    };
    const load = async () => {
      if (loaded || loading) return; loading = true;
      try {
        const res = await fetch('/hero/scrub.mp4', { priority: 'low' });
        const blob = await res.blob();
        v.src = URL.createObjectURL(blob); v.load();
        v.addEventListener('canplay', () => { loaded = true; el.classList.add('film-ready'); seek(progress() * v.duration); }, { once: true });
      } catch { el.classList.add('film-failed'); }
    };
    const apply = () => { // décidé en direct à chaque rotation / redimensionnement
      if (gated()) { if (raf) cancelAnimationFrame(raf); raf = null; return; }
      load(); target = progress(); shown = target; paint(shown);
    };

    v.addEventListener('seeked', onSeeked); v.addEventListener('error', onErr);
    const io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; if (onScreen) onScroll(); });
    io.observe(el);
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', apply);
    mqls.forEach((m) => m.addEventListener('change', apply));
    apply();
    return () => {
      io.disconnect(); removeEventListener('scroll', onScroll); removeEventListener('resize', apply);
      mqls.forEach((m) => m.removeEventListener('change', apply));
      v.removeEventListener('seeked', onSeeked); v.removeEventListener('error', onErr);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="top" ref={root} className="film">
      <div className="film-stage">
        <div className="film-poster" aria-hidden />
        <video ref={video} className="film-video" muted playsInline preload="none" aria-hidden="true" tabIndex={-1} />
        <div className="film-scrim" aria-hidden />

        {t.film.map(([label, line], i) => (
          <div key={i} data-band className={`film-band container-x ${i === 1 ? 'film-band-em' : ''}`} style={i === 0 ? undefined : { opacity: 0, visibility: 'hidden' }} aria-hidden>
            <p className="eyebrow flex items-center gap-3 mb-6"><span className="h-px w-8 bg-accent" />{label[lang]}</p>
            <p className="font-serif font-bold text-[clamp(3rem,9vw,8.5rem)] leading-[1] film-line">{line[lang]}</p>
          </div>
        ))}

        <div className="film-veil" aria-hidden />
        <div className="film-final">
          <div className="container-x w-full flex-1 flex flex-col">
            <div className="grid lg:grid-cols-[1.15fr_.85fr] gap-8 items-center flex-1">
              <div className="relative z-10">
                <p className="eyebrow flex items-center gap-3 mb-6"><span className="h-px w-8 bg-accent" />{t.eyebrow[lang]}</p>
                <h1 className="font-serif font-bold text-[clamp(2.4rem,5.6vw,5rem)] leading-[1.02]">
                  {t.l1[lang]}<br /><span className="italic font-medium text-accent">{t.l2[lang]}</span><br />{t.l3[lang]}
                </h1>
                <p className="mt-6 max-w-xl text-base md:text-lg text-white/70 font-light leading-relaxed">{t.sub[lang]}</p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a ref={b1} href="#work" onClick={(e) => { e.preventDefault(); scrollToId('work'); }} className="btn btn-primary">{t.cta1[lang]} <ArrowDown size={17} /></a>
                  <a ref={b2} href="#contact" onClick={(e) => { e.preventDefault(); scrollToId('contact'); }} className="btn btn-ghost">{t.cta2[lang]} <ArrowUpRight size={17} /></a>
                </div>
              </div>
              <div className="relative h-[44svh] lg:h-[60svh] min-h-[300px] flex items-end justify-center">
                <div className="hero-ring absolute bottom-[8%] left-1/2 -translate-x-1/2 w-[78%] aspect-square rounded-full border border-accent/30 bg-gradient-to-b from-accent/15 to-transparent" />
                <div className="hero-ring absolute bottom-[3%] left-1/2 -translate-x-1/2 w-[98%] aspect-square rounded-full border border-line" />
                <img src="/images/fullbody.png" alt="Williams Biamou" className="hero-photo relative h-full w-auto object-contain object-bottom drop-shadow-[0_30px_60px_rgba(0,0,0,.6)]" />
                {[['IT', 'left-0 top-[18%]'], ['Design', 'right-0 top-[30%]'], ['Web · IA', 'left-[4%] bottom-[22%]'], ['Content', 'right-[2%] bottom-[12%]']].map(([c, pos], i) => (
                  <span key={c} className={`hero-pop absolute ${pos}`} style={{ '--d': 1.1 + i * 0.12 }}>
                    <span className="block animate-float rounded-full border border-line bg-background/70 backdrop-blur px-4 py-2 text-xs tracking-wide" style={{ animationDelay: `${i * 0.8}s` }}><span className="text-accent mr-1.5">●</span>{c}</span>
                  </span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-line mt-2">
              {t.stats.map(([a, b], i) => (
                <div key={i} className="py-4 sm:px-6 first:sm:pl-0 sm:border-l first:sm:border-l-0 border-line">
                  <p className="font-serif text-2xl md:text-3xl">{a[lang]}</p>
                  <p className="text-sm text-white/50 mt-1">{b[lang]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="film-cue" aria-hidden><span />{t.scroll[lang]}</div>
      </div>
    </section>
  );
}
