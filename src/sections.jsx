import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowUpRight, ArrowDown, Mail, Phone, MessageCircle, ArrowUp } from 'lucide-react';
import { UI, CONTACT, SOCIALS } from './data';
import Art from './ui/art';
import { ToolIcons } from './ui/tools';
import { useLang, SplitTitle, spotMove, useMagnetic, scrollToId, reduced } from './ui/kit';

const Eyebrow = ({ children }) => (
  <p data-reveal className="eyebrow flex items-center gap-3 mb-5"><span className="h-px w-8 bg-accent" />{children}</p>
);

export { default as Hero } from './Film';

export function Services() {
  const { lang } = useLang();
  const t = UI.services;
  return (
    <section id="services" className="py-24 md:py-36">
      <div className="container-x">
        <Eyebrow>{t.eyebrow[lang]}</Eyebrow>
        <SplitTitle className="font-serif text-4xl md:text-6xl font-bold leading-[1.05] mb-14" lines={t.title.map((x) => x[lang])} />
        <div data-reveal="stagger" className="grid md:grid-cols-2 gap-5">
          {t.items.map((s) => (
            <article key={s.n} onMouseMove={spotMove} className="spot group relative flex flex-col rounded-3xl border border-line bg-surface p-8 md:p-10 transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-[0_24px_60px_-30px_rgba(0,168,204,.45)]">
              <div className="flex items-start justify-between gap-6">
                <span className="font-serif text-5xl text-white/15 group-hover:text-accent transition-colors duration-500">{s.n}</span>
                <Art name={s.art} className="w-24 text-accent/50 group-hover:text-accent-soft group-hover:scale-110 transition-all duration-700" />
              </div>
              <h3 className="font-serif text-2xl md:text-3xl mt-6 mb-1">{s.t[lang]}</h3>
              <p className="text-accent-soft/80 text-sm mb-5">{s.d[lang]}</p>
              <p className="eyebrow !text-[0.66rem] mb-2">{t.roleLabel[lang]}</p>
              <p className="text-white/65 font-light leading-relaxed mb-7">{s.role[lang]}</p>
              <div className="mt-auto">
                <p className="eyebrow !text-[0.66rem] mb-3">{t.toolsLabel[lang]}</p>
                {s.tools.length > 0 && <ToolIcons list={s.tools} size={34} labels />}
                {s.chips.length > 0 && <div className="flex flex-wrap gap-2 mt-3">{s.chips.map((c) => <span key={c.fr} className="tag">{c[lang]}</span>)}</div>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function About() {
  const { lang } = useLang();
  const t = UI.about;
  return (
    <section id="about" className="relative py-24 md:py-36 bg-surface/60 border-y border-line overflow-hidden">
      <div className="absolute -left-40 top-20 w-[520px] h-[520px] rounded-full bg-accent/10 blur-[130px]" />
      <div className="container-x relative">
        <Eyebrow>{t.eyebrow[lang]}</Eyebrow>
        <SplitTitle className="font-serif text-4xl md:text-6xl font-bold leading-[1.05] mb-8" lines={t.title.map((x) => x[lang])} />
        <p data-reveal className="max-w-2xl text-xl md:text-2xl font-serif text-white/80 leading-snug mb-16">{t.intro[0][lang]}</p>

        <div data-reveal="stagger" className="grid md:grid-cols-2 gap-5 mb-24">
          {t.reasons.map((r) => (
            <article key={r.n} onMouseMove={spotMove} className="spot group rounded-3xl border border-line bg-background/60 p-8 md:p-9 transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/50">
              <span className="font-serif text-4xl text-accent/70 group-hover:text-accent transition-colors">{r.n}</span>
              <h3 className="font-serif text-2xl mt-4 mb-3">{r.t[lang]}</h3>
              <p className="text-white/60 font-light leading-relaxed">{r.d[lang]}</p>
            </article>
          ))}
        </div>

        <h3 data-reveal className="eyebrow mb-10">{t.pathTitle[lang]}</h3>
        <ol data-reveal="stagger" className="relative grid sm:grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-10">
          <span className="hidden lg:block absolute left-0 right-0 top-[1.05rem] h-px bg-gradient-to-r from-accent via-line to-transparent" />
          {t.path.map(([y, title, sub]) => (
            <li key={y} className="relative group">
              <span className="relative z-10 block size-2.5 rounded-full bg-accent ring-4 ring-surface mb-5 group-hover:scale-150 transition-transform duration-300" />
              <p className="font-serif text-4xl text-white/25 group-hover:text-accent transition-colors duration-500">{y}</p>
              <p className="mt-2 leading-snug">{title[lang]}</p>
              <p className="text-sm text-white/45 mt-1">{typeof sub === 'string' ? sub : sub[lang]}</p>
            </li>
          ))}
        </ol>

        <div data-reveal className="mt-16 flex flex-wrap items-center gap-3">
          <span className="eyebrow !text-[0.66rem] mr-2">{t.langs[lang]}</span>
          {t.langList.map((l, i) => <span key={i} className="tag !text-sm !px-4 !py-1.5">{l[lang]}</span>)}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const { lang } = useLang();
  const t = UI.contact;
  const [state, setState] = useState('idle');
  const b = useMagnetic();

  const submit = async (e) => {
    e.preventDefault();
    setState('sending');
    try {
      const r = await fetch(CONTACT.formspree, { method: 'POST', body: new FormData(e.target), headers: { Accept: 'application/json' } });
      if (!r.ok) throw new Error();
      setState('ok');
      e.target.reset();
    } catch { setState('ko'); }
  };

  const field = 'w-full bg-transparent border-b border-white/20 py-3 text-lg outline-none transition-colors focus:border-accent placeholder:text-white/30';

  return (
    <section id="contact" className="relative py-24 md:py-36 overflow-hidden">
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[-30%] w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full bg-accent/15 blur-[140px] pointer-events-none" />
      <div className="container-x relative grid lg:grid-cols-2 gap-14 lg:gap-24">
        <div>
          <Eyebrow>{t.eyebrow[lang]}</Eyebrow>
          <SplitTitle className="font-serif text-5xl md:text-7xl font-bold leading-[1.02] mb-8" lines={t.title.map((x) => x[lang])} />
          <p data-reveal className="text-white/60 font-light text-lg max-w-md mb-10">{t.sub[lang]}</p>
          <div data-reveal="stagger" className="space-y-4 text-lg">
            <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-4 hover:text-accent transition-colors"><Mail size={20} className="text-accent" />{CONTACT.email}</a>
            <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="flex items-center gap-4 hover:text-accent transition-colors"><Phone size={20} className="text-accent" />{CONTACT.phone}</a>
            <a ref={b} href={CONTACT.wa} target="_blank" rel="noopener noreferrer" className="btn btn-primary self-start mt-4"><MessageCircle size={18} />{t.wa[lang]}</a>
          </div>
          <div data-reveal className="mt-12">
            <p className="eyebrow mb-4">{t.find[lang]}</p>
            <div className="flex flex-wrap gap-2">
              {SOCIALS.map((s) => <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost !py-2 !px-4 !text-sm">{s.name}</a>)}
            </div>
          </div>
        </div>

        <form data-reveal onSubmit={submit} className="rounded-3xl border border-line bg-surface/80 backdrop-blur p-8 md:p-10 space-y-8 self-start">
          <input name="name" required placeholder={t.name[lang]} className={field} />
          <input name="email" type="email" required placeholder={t.mail[lang]} className={field} />
          <textarea name="message" required rows={4} placeholder={t.msg[lang]} className={field + ' resize-none'} />
          <button disabled={state === 'sending'} className="btn btn-primary disabled:opacity-50">{state === 'sending' ? t.sending[lang] : t.send[lang]} <ArrowUpRight size={17} /></button>
          {state === 'ok' && <p className="text-accent-soft" role="status">{t.ok[lang]}</p>}
          {state === 'ko' && <p className="text-red-400" role="alert">{t.ko[lang]}</p>}
        </form>
      </div>
    </section>
  );
}

export function Footer() {
  const { lang } = useLang();
  return (
    <footer className="border-t border-line py-8">
      <div className="container-x flex flex-wrap items-center justify-between gap-4 text-sm text-white/45">
        <p>© {new Date().getFullYear()} · {UI.footer[lang]}</p>
        <button onClick={() => (window.__lenis ? window.__lenis.scrollTo(0) : window.scrollTo(0, 0))} className="flex items-center gap-2 hover:text-accent transition-colors cursor-pointer">{UI.top[lang]} <ArrowUp size={15} /></button>
      </div>
    </footer>
  );
}
