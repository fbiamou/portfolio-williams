import { siNextdotjs, siVercel, siSupabase, siFigma, siClaude, siGreensock, siNotion } from 'simple-icons';

// Logos officiels (simple-icons) quand ils existent ; icônes « application » pour les outils Adobe et ComfyUI
export const TOOLS = {
  ai: { name: 'Illustrator', txt: 'Ai', bg: '#2b0f00', fg: '#ff9a00' },
  ps: { name: 'Photoshop', txt: 'Ps', bg: '#001e36', fg: '#31a8ff' },
  id: { name: 'InDesign', txt: 'Id', bg: '#2d0a1c', fg: '#ff3d8b' },
  comfy: { name: 'ComfyUI', txt: 'Cf', bg: '#1a1a2e', fg: '#ffd166' },
  figma: { name: 'Figma', icon: siFigma, bg: '#1e1e1e', fg: '#ffffff', multi: true },
  claude: { name: 'Claude Code', icon: siClaude, bg: '#2a1a14', fg: '#d97757' },
  next: { name: 'Next.js', icon: siNextdotjs, bg: '#000000', fg: '#ffffff' },
  supabase: { name: 'Supabase', icon: siSupabase, bg: '#0c2a1c', fg: '#3fcf8e' },
  vercel: { name: 'Vercel', icon: siVercel, bg: '#000000', fg: '#ffffff' },
  capcut: { name: 'CapCut', txt: 'Cc', bg: '#000000', fg: '#ffffff' },
  notion: { name: 'Notion', icon: siNotion, bg: '#ffffff', fg: '#000000' },
  gsap: { name: 'GSAP', icon: siGreensock, bg: '#0a2a10', fg: '#88ce02' },
};

function Glyph({ t, size }) {
  if (t.icon) {
    return (
      <svg viewBox="0 0 24 24" width={size * 0.58} height={size * 0.58} fill={t.fg} aria-hidden><path d={t.icon.path} /></svg>
    );
  }
  return <span className="font-bold leading-none" style={{ fontSize: size * 0.42 }}>{t.txt}</span>;
}

export function ToolIcons({ list = [], size = 28, labels = false }) {
  if (!list.length) return null;
  return (
    <ul className="flex flex-wrap items-center gap-x-4 gap-y-2" aria-label="Tools">
      {list.map((k) => {
        const t = TOOLS[k];
        if (!t) return null;
        return (
          <li key={k} className="flex items-center gap-2" title={t.name}>
            <span className="grid place-items-center rounded-lg border border-white/10 transition-transform duration-300 hover:scale-110 hover:-rotate-3 shrink-0"
              style={{ width: size, height: size, background: t.bg, color: t.fg }} role="img" aria-label={t.name}>
              <Glyph t={t} size={size} />
            </span>
            {labels && <span className="text-sm text-white/70">{t.name}</span>}
          </li>
        );
      })}
    </ul>
  );
}
