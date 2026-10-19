import { useEffect, useRef, useState } from 'react';
import { Play, X, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import data from './creatorData.json';
import { UI, T } from './data';
import { useLang, SplitTitle, spotMove } from './ui/kit';

const CLIENT_BRANDS = ['Tevo', 'NJ Impact', 'Tech Community', 'Freshlady Home'];
const SERIES = ['BossMama', 'Cápsulas TikTok', 'TikTok', 'Reels y demos'];

function Badge({ lang }) {
  if (!lang) return null;
  const es = lang === 'es';
  return <span className={`absolute top-2.5 left-2.5 z-10 text-[10px] font-semibold px-2 py-0.5 rounded-full ${es ? 'bg-accent text-[#031a21]' : 'bg-white/90 text-black'}`}>{es ? 'ES' : 'FR'}</span>;
}

function Video({ v, label }) {
  const [play, setPlay] = useState(false);
  return (
    <div className="c-item group relative rounded-2xl overflow-hidden bg-surface border border-line hover:border-accent/50 transition-colors duration-500">
      <Badge lang={v.lang} />
      {play ? (
        <video src={'/' + v.v} controls autoPlay playsInline className="w-full aspect-[9/16] object-contain bg-black" />
      ) : (
        <button onClick={() => setPlay(true)} className="block w-full relative cursor-pointer" aria-label={`${label}: ${v.title}`}>
          <img src={'/' + v.poster} alt={v.title} loading="lazy" className="w-full aspect-[9/16] object-cover transition-transform duration-[900ms] group-hover:scale-105" />
          <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="size-14 rounded-full bg-accent/90 text-[#031a21] flex items-center justify-center scale-90 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_40px_rgba(0,168,204,.6)]"><Play size={22} fill="currentColor" /></span>
          </span>
        </button>
      )}
      <p className="p-3.5 text-sm text-white/80">{v.title}</p>
    </div>
  );
}

function Img({ src, lang, onOpen, alt }) {
  return (
    <button onClick={() => onOpen(src)} className="c-item group relative rounded-2xl overflow-hidden bg-surface border border-line hover:border-accent/60 transition-colors duration-500 cursor-zoom-in">
      <Badge lang={lang} />
      <img src={'/' + src} alt={alt} loading="lazy" className="size-full object-cover aspect-square transition-transform duration-[900ms] group-hover:scale-110" />
    </button>
  );
}

function Lightbox({ src, onClose }) {
  useEffect(() => {
    const k = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', k);
    document.body.style.overflow = 'hidden';
    window.__lenis?.stop();
    return () => { window.removeEventListener('keydown', k); document.body.style.overflow = ''; window.__lenis?.start(); };
  }, [onClose]);
  return (
    <div onClick={onClose} className="fixed inset-0 z-[75] bg-black/92 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out" role="dialog" aria-modal>
      <button className="absolute top-5 right-5 size-11 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer" aria-label="Close"><X size={20} /></button>
      <img src={'/' + src} alt="" className="max-h-full max-w-full rounded-lg" />
    </div>
  );
}

const SERIES_NAME = {
  BossMama: T('BossMama', 'BossMama', 'BossMama'),
  'Cápsulas TikTok': T('Capsules TikTok', 'Cápsulas TikTok', 'TikTok capsules'),
  TikTok: T('TikTok', 'TikTok', 'TikTok'),
  'Reels y demos': T('Reels et démos', 'Reels y demos', 'Reels & demos'),
};

/** Carte-dossier : une couverture, un titre, un nombre d'éléments. Un clic ouvre le dossier. */
function FolderCard({ cover, title, desc, count, onOpen, tag, i }) {
  return (
    <button onClick={onOpen} onMouseMove={spotMove} style={{ '--d': i * 0.06 }}
      className="hero-in spot group relative flex flex-col text-left rounded-3xl border border-line bg-surface overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-[0_24px_60px_-30px_rgba(0,168,204,.45)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-raised">
        <img src={'/' + cover} alt={title} loading="lazy" className="size-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
        <span className="absolute right-4 top-4 rounded-full border border-line bg-background/70 backdrop-blur px-3 py-1 text-xs text-white/75">{count}</span>
        {tag && <span className="absolute left-4 top-4 rounded-full border border-accent/40 bg-background/70 backdrop-blur px-3 py-1 text-xs text-accent-soft">{tag}</span>}
      </div>
      <div className="flex items-start justify-between gap-3 p-6">
        <div className="min-w-0">
          <h3 className="font-serif text-2xl leading-tight">{title}</h3>
          {desc && <p className="mt-2 text-[0.92rem] text-white/55 font-light leading-relaxed">{desc}</p>}
        </div>
        <ArrowUpRight className="shrink-0 text-white/30 group-hover:text-accent group-hover:rotate-45 transition-all duration-500" />
      </div>
    </button>
  );
}

function Slides({ slides, alt }) {
  const [i, setI] = useState(0);
  const n = slides.length;
  const go = (d) => setI((x) => Math.min(n - 1, Math.max(0, x + d)));
  const touch = useRef(0);
  useEffect(() => {
    const k = (e) => { if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1); };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, []);
  useEffect(() => { if (slides[i + 1]) new Image().src = '/' + slides[i + 1]; }, [i, slides]);
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full flex justify-center"
        onTouchStart={(e) => { touch.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => { const dx = e.changedTouches[0].clientX - touch.current; if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1); }}>
        <button onClick={() => go(1)} aria-label="Next slide" className={`block ${i < n - 1 ? 'cursor-pointer' : 'cursor-default'}`}>
          <img key={i} src={'/' + slides[i]} alt={`${alt} ${i + 1}/${n}`} className="max-h-[62vh] w-auto max-w-full rounded-xl shadow-[0_30px_80px_-30px_rgba(0,0,0,.8)] animate-[fade_.35s_ease]" />
        </button>
        {i > 0 && <button onClick={() => go(-1)} aria-label="Previous slide" className="absolute left-0 top-1/2 -translate-y-1/2 size-11 rounded-full bg-background/80 backdrop-blur border border-white/25 flex items-center justify-center hover:bg-accent hover:text-black transition-colors cursor-pointer"><ChevronLeft size={20} /></button>}
        {i < n - 1 && <button onClick={() => go(1)} aria-label="Next slide" className="absolute right-0 top-1/2 -translate-y-1/2 size-11 rounded-full bg-background/80 backdrop-blur border border-white/25 flex items-center justify-center hover:bg-accent hover:text-black transition-colors cursor-pointer"><ChevronRight size={20} /></button>}
      </div>
      <div className="mt-5 flex items-center gap-2" aria-hidden>
        {slides.map((s, k) => <button key={s} onClick={() => setI(k)} tabIndex={-1} className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${k === i ? 'w-8 bg-accent' : 'w-1.5 bg-white/25 hover:bg-white/50'}`} />)}
      </div>
      <p className="mt-3 text-sm text-white/50">{i + 1} / {n}</p>
    </div>
  );
}

function Folder({ title, desc, onClose, narrow, children }) {
  useEffect(() => {
    const k = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', k);
    document.body.style.overflow = 'hidden';
    window.__lenis?.stop();
    return () => { window.removeEventListener('keydown', k); document.body.style.overflow = ''; window.__lenis?.start(); };
  }, [onClose]);
  return (
    <div onClick={onClose} className="fixed inset-0 z-[65] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 md:p-8" role="dialog" aria-modal aria-label={title}>
      <button onClick={onClose} aria-label="Close" className="absolute top-3 right-3 md:top-5 md:right-5 z-20 size-11 rounded-full border border-white/25 bg-background/80 backdrop-blur flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer"><X size={18} /></button>
      <div onClick={(e) => e.stopPropagation()} data-lenis-prevent className={`relative w-full ${narrow ? 'max-w-3xl' : 'max-w-6xl'} max-h-full overflow-y-auto rounded-3xl border border-line bg-surface p-6 md:p-10 animate-[pop_.5s_cubic-bezier(.2,.8,.2,1)]`}>
        <h3 className="font-serif text-3xl md:text-4xl">{title}</h3>
        {desc && <p className="text-white/55 font-light mt-2 mb-8">{desc}</p>}
        <div className={desc ? '' : 'mt-8'}>{children}</div>
      </div>
    </div>
  );
}

export default function Content() {
  const { lang } = useLang();
  const t = UI.content;
  const [tab, setTab] = useState('video');
  const [box, setBox] = useState(null);
  const [open, setOpen] = useState(null);

  const brands = [...new Set(data.images.filter((i) => i.group === 'brand').map((i) => i.brand))];
  const postGroups = [...new Set(data.images.filter((i) => i.group === 'posts').map((i) => i.brand))];
  const n = (k, c) => `${c} ${t.count[k][lang]}`;

  // chaque onglet = une liste de dossiers { id, cover, title, desc, count, tag, body }
  const folders = [];
  if (tab === 'video') SERIES.forEach((s) => {
    const vs = data.videos.filter((v) => v.series === s);
    folders.push({ id: s, cover: vs[0].poster, title: SERIES_NAME[s][lang], desc: t.series[s][lang], count: n('video', vs.length), tag: s === 'BossMama' ? t.clientWork[lang] : null,
      body: <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{vs.map((v) => <Video key={v.id} v={v} label={t.play[lang]} />)}</div> });
  });
  if (tab === 'brand') brands.forEach((b) => {
    const items = data.images.filter((i) => i.group === 'brand' && i.brand === b);
    const kinds = [...new Set(items.map((i) => i.kind))];
    folders.push({ id: b, cover: items[0].src, title: b, desc: null, count: n('img', items.length), tag: CLIENT_BRANDS.includes(b) ? t.clientWork[lang] : null,
      body: kinds.map((k) => (
        <div key={k} className="mb-7">
          <p className="text-white/55 text-sm mb-3">{t.kinds[k]?.[lang] || k}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">{items.filter((i) => i.kind === k).map((i) => <Img key={i.src} src={i.src} lang={i.lang} onOpen={setBox} alt={`${b} ${k}`} />)}</div>
        </div>)) });
  });
  if (tab === 'posts') postGroups.forEach((g) => {
    const items = data.images.filter((i) => i.group === 'posts' && i.brand === g);
    folders.push({ id: g, cover: items[0].src, title: t.postGroups[g]?.[lang] || g, desc: null, count: n('img', items.length),
      body: <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">{items.map((i) => <Img key={i.src} src={i.src} lang={i.lang} onOpen={setBox} alt="Post" />)}</div> });
  });
  if (tab === 'carousels') data.carousels.forEach((c) => {
    folders.push({ id: c.title, cover: c.slides[0], title: c.title.charAt(0).toUpperCase() + c.title.slice(1), desc: t.carouselNote[lang], count: n('slides', c.slides.length), tag: 'FR', narrow: true,
      body: <Slides slides={c.slides} alt={c.title} /> });
  });
  const cur = folders.find((f) => f.id === open);

  return (
    <section id="content" className="py-24 md:py-36">
      <div className="container-x">
        <p data-reveal className="eyebrow flex items-center gap-3 mb-5"><span className="h-px w-8 bg-accent" />{t.eyebrow[lang]}</p>
        <SplitTitle className="font-serif text-4xl md:text-6xl font-bold leading-[1.05] mb-6" lines={t.title.map((x) => x[lang])} />
        <p data-reveal className="max-w-2xl text-white/60 font-light text-lg mb-3">{t.sub[lang]}</p>
        <p data-reveal className="text-xs text-white/40 mb-10 flex items-center gap-2"><span className="bg-accent text-[#031a21] px-2 rounded-full font-semibold">ES</span><span className="bg-white/90 text-black px-2 rounded-full font-semibold">FR</span>{t.langNote[lang]}</p>

        <div data-reveal className="flex flex-wrap gap-2 mb-12" role="tablist">
          {t.tabs.map(([id, label]) => (
            <button key={id} role="tab" aria-selected={tab === id} onClick={() => setTab(id)}
              className={`rounded-full border px-5 py-2 text-sm transition-all duration-300 cursor-pointer active:scale-95 ${tab === id ? 'bg-accent border-accent text-[#031a21] font-medium' : 'border-line text-white/65 hover:border-accent/60 hover:text-white'}`}>{label[lang]}</button>
          ))}
        </div>

        <div key={tab} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
          {folders.map((f, i) => <FolderCard key={f.id} i={i} cover={f.cover} title={f.title} desc={f.desc} count={f.count} tag={f.tag} onOpen={() => setOpen(f.id)} />)}
        </div>
      </div>
      {cur && <Folder title={cur.title} desc={cur.desc} narrow={cur.narrow} onClose={() => setOpen(null)}>{cur.body}</Folder>}
      {box && <Lightbox src={box} onClose={() => setBox(null)} />}
    </section>
  );
}
