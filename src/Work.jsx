import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { UI } from './data';
import { PROJECTS, tagOf, titleOf } from './projects';
import Art from './ui/art';
import { ToolIcons } from './ui/tools';
import creator from './creatorData.json';
import { useLang, SplitTitle, spotMove } from './ui/kit';

// Une fiche est cliquable seulement si elle a quelque chose à montrer : visuels ou lien
const galleryOf = (p) => {
  if (p.gallery?.length) return p.gallery;
  if (p.brand) return creator.images.filter((i) => i.group === 'brand' && i.brand === p.brand).map((i) => i.src);
  return [];
};
const isOpen = (p) => galleryOf(p).length > 0 || !!p.links?.length;

function Status({ p, lang }) {
  if (!p.status) return null;
  const live = p.status === 'live';
  const conf = p.status === 'confidential';
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[0.68rem] ${live ? 'border-emerald-400/40 text-emerald-300' : conf ? 'border-rose-400/40 text-rose-300' : 'border-amber-400/40 text-amber-300'}`}>
      <span className={`size-1.5 rounded-full ${live ? 'bg-emerald-300 animate-pulse' : conf ? 'bg-rose-300' : 'bg-amber-300'}`} />{UI.work.status[p.status][lang]}
    </span>
  );
}

function Card({ p, lang, onOpen, i }) {
  const t = UI.work;
  const open = isOpen(p);
  const photo = p.img || p.stock;
  const Tag = open ? 'button' : 'article';
  return (
    <Tag onClick={open ? () => onOpen(p) : undefined} onMouseMove={spotMove} style={{ '--d': Math.min(i, 9) * 0.05 }}
      className={`hero-in p-card spot group relative flex flex-col rounded-3xl border border-line bg-surface overflow-hidden text-left transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-[0_24px_60px_-30px_rgba(0,168,204,.45)] ${open ? 'cursor-pointer' : ''} ${p.big ? 'md:col-span-2' : ''}`}>
      <div className={`relative overflow-hidden bg-raised ${p.big ? 'aspect-[16/9] md:aspect-[21/9]' : 'aspect-[4/3]'}`}>
        {photo ? (
          <>
            <img src={'/' + photo} alt={titleOf(p, lang)} loading="lazy" className={`size-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110 ${p.stock && !p.img ? 'opacity-60 saturate-50 group-hover:saturate-100 group-hover:opacity-80' : ''}`} />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
            {p.stock && !p.img && <div className="absolute inset-0 bg-accent/10 mix-blend-color" />}
            {p.art && <Art name={p.art} className="absolute right-4 bottom-4 w-20 text-accent-soft opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500" />}
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,168,204,.28),transparent_60%)] transition-transform duration-[900ms] group-hover:scale-125" />
            <div className="grid-lines absolute inset-0 opacity-50" />
            {p.art && <Art name={p.art} className="absolute inset-0 m-auto w-[46%] max-w-[220px] text-accent/60 group-hover:text-accent-soft group-hover:scale-110 transition-all duration-700" />}
          </>
        )}
        <span className="absolute right-4 top-4 rounded-full border border-line bg-background/70 backdrop-blur px-3 py-1 text-xs text-white/70">{p.year}</span>
      </div>
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="eyebrow !text-[0.66rem] mb-2">{p.kind[lang]}</p>
            <h3 className="font-serif text-2xl leading-tight">{titleOf(p, lang)}</h3>
          </div>
          {open && <ArrowUpRight className="shrink-0 text-white/30 group-hover:text-accent group-hover:rotate-45 transition-all duration-500" />}
        </div>
        <p className="mt-3 mb-5 text-[0.95rem] text-white/60 font-light leading-relaxed">{p.d[lang]}</p>
        <div className="mt-auto space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Status p={p} lang={lang} />
            {p.via && <span className="tag !border-white/25 !text-white/75">{p.via[lang]}</span>}
            {p.client && <span className="tag !border-accent/40 !text-accent-soft">{t.client[lang]}</span>}
            {p.tags.map((x) => <span key={x} className="tag">{tagOf(x, lang)}</span>)}
          </div>
          {p.tools?.length > 0 && <ToolIcons list={p.tools} />}
        </div>
      </div>
    </Tag>
  );
}

function Modal({ p, lang, onClose }) {
  const t = UI.work;
  const imgs = galleryOf(p);
  const [i, setI] = useState(0);
  const go = (d) => setI((x) => (x + d + imgs.length) % imgs.length);

  useEffect(() => {
    const k = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && imgs.length) go(1);
      if (e.key === 'ArrowLeft' && imgs.length) go(-1);
    };
    window.addEventListener('keydown', k);
    document.body.style.overflow = 'hidden';
    window.__lenis?.stop();
    return () => { window.removeEventListener('keydown', k); document.body.style.overflow = ''; window.__lenis?.start(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div onClick={onClose} className="fixed inset-0 z-[70] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 md:p-8" role="dialog" aria-modal aria-label={titleOf(p, lang)}>
      <button onClick={onClose} aria-label={t.close[lang]} className="absolute top-3 right-3 md:top-5 md:right-5 z-20 size-11 rounded-full border border-white/25 bg-background/80 backdrop-blur flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer"><X size={18} /></button>
      <div onClick={(e) => e.stopPropagation()} data-lenis-prevent className="relative w-full max-w-6xl max-h-full overflow-y-auto rounded-3xl border border-line bg-surface grid grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] animate-[pop_.5s_cubic-bezier(.2,.8,.2,1)]">
        <div className="bg-background/60 p-3 md:p-5 flex flex-col gap-3 min-h-[260px]">
          {imgs.length > 0 ? (
            <>
              <div className="relative flex-1 flex items-center justify-center min-h-[240px]">
                <img key={imgs[i]} src={'/' + imgs[i]} alt={`${titleOf(p, lang)} ${i + 1}`} className="max-h-[60vh] max-w-full w-auto h-auto object-contain rounded-xl shadow-[0_30px_80px_-30px_rgba(0,0,0,.8)] animate-[fade_.4s_ease]" />
                {imgs.length > 1 && (
                  <>
                    <button onClick={() => go(-1)} aria-label="Previous" className="absolute left-1 size-10 rounded-full bg-background/70 backdrop-blur border border-white/20 flex items-center justify-center hover:bg-accent hover:text-black transition-colors cursor-pointer"><ChevronLeft size={20} /></button>
                    <button onClick={() => go(1)} aria-label="Next" className="absolute right-1 size-10 rounded-full bg-background/70 backdrop-blur border border-white/20 flex items-center justify-center hover:bg-accent hover:text-black transition-colors cursor-pointer"><ChevronRight size={20} /></button>
                  </>
                )}
              </div>
              {imgs.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {imgs.map((s, k) => (
                    <button key={s} onClick={() => setI(k)} className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden border transition-all cursor-pointer ${k === i ? 'border-accent ring-2 ring-accent/40 opacity-100' : 'border-line opacity-75 hover:opacity-100'}`}>
                      <img src={'/' + s} alt="" loading="lazy" className="size-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="flex-1 grid place-items-center font-serif italic text-7xl text-white/10">{titleOf(p, lang).slice(0, 2)}</div>
          )}
        </div>
        <div className="p-7 md:p-10 flex flex-col">
          <p className="eyebrow !text-[0.68rem] mb-3">{p.kind[lang]} · {p.year}</p>
          <h3 className="font-serif text-3xl md:text-4xl leading-tight mb-5">{titleOf(p, lang)}</h3>
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <Status p={p} lang={lang} />
            {p.via && <span className="tag !border-white/25 !text-white/75">{p.via[lang]}</span>}
            {p.client && <span className="tag !border-accent/40 !text-accent-soft">{t.client[lang]}</span>}
          </div>
          <p className="text-white/70 font-light leading-relaxed mb-6">{p.d[lang]}</p>
          <div className="flex flex-wrap gap-2 mb-6">{p.tags.map((x) => <span key={x} className="tag">{tagOf(x, lang)}</span>)}</div>
          {p.tools?.length > 0 && (
            <div className="mb-8"><p className="eyebrow !text-[0.66rem] mb-3">{t.tools[lang]}</p><ToolIcons list={p.tools} size={30} labels /></div>
          )}
          <div className="mt-auto flex flex-wrap gap-3">
            {(p.links || []).map((l, k) => (
              <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className={`btn whitespace-nowrap justify-center ${k === 0 ? 'btn-primary' : 'btn-ghost'}`}>{l.label[lang]} <ExternalLink size={16} /></a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Work() {
  const { lang } = useLang();
  const t = UI.work;
  const [f, setF] = useState('all');
  const [sel, setSel] = useState(null);
  const grid = useRef(null);
  const items = PROJECTS.filter((p) => f === 'all' || p.cat.includes(f));

  return (
    <section id="work" className="py-24 md:py-36 bg-surface/60 border-y border-line">
      <div className="container-x">
        <p data-reveal className="eyebrow flex items-center gap-3 mb-5"><span className="h-px w-8 bg-accent" />{t.eyebrow[lang]}</p>
        <SplitTitle className="font-serif text-4xl md:text-6xl font-bold leading-[1.05] mb-10" lines={t.title.map((x) => x[lang])} />
        <div data-reveal className="flex flex-wrap gap-2 mb-10" role="tablist">
          {t.filters.map(([id, label]) => (
            <button key={id} role="tab" aria-selected={f === id} onClick={() => setF(id)}
              className={`rounded-full border px-5 py-2 text-sm transition-all duration-300 cursor-pointer active:scale-95 ${f === id ? 'bg-accent border-accent text-[#031a21] font-medium' : 'border-line text-white/65 hover:border-accent/60 hover:text-white'}`}>
              {label[lang]}
            </button>
          ))}
        </div>
        <div key={f} ref={grid} className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
          {items.map((p, i) => <Card key={p.id} p={p} lang={lang} onOpen={setSel} i={i} />)}
        </div>
      </div>
      {sel && <Modal p={sel} lang={lang} onClose={() => setSel(null)} />}
    </section>
  );
}
