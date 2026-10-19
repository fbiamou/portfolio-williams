// Illustrations SVG qui s'animent quand la carte parente (.group) est survolée
const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };

const ARTS = {
  net: (
    <>
      <g {...S} className="art-flow" opacity=".7"><path d="M60 40 20 16M60 40l42-22M60 40 22 66M60 40l40 28M20 16l40-0M22 66h78" strokeDasharray="4 5" /></g>
      {[[60, 40, 7], [20, 16, 5], [102, 18, 5], [22, 66, 5], [100, 68, 5]].map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="currentColor" className="art-pulse" style={{ animationDelay: `${i * 0.18}s` }} />
      ))}
    </>
  ),
  wifi: (
    <>
      {[34, 24, 14].map((r, i) => (
        <path key={r} {...S} d={`M${60 - r} ${58 - r * 0.55}a${r * 1.25} ${r * 1.25} 0 0 1 ${r * 2} 0`} className="art-wave" style={{ animationDelay: `${i * 0.2}s` }} />
      ))}
      <circle cx="60" cy="62" r="5" fill="currentColor" className="art-pulse" />
    </>
  ),
  server: (
    <>
      {[10, 34, 58].map((y, i) => (
        <g key={y}>
          <rect x="18" y={y} width="84" height="18" rx="4" {...S} />
          <circle cx="32" cy={y + 9} r="3" fill="currentColor" className="art-blink" style={{ animationDelay: `${i * 0.25}s` }} />
          <circle cx="44" cy={y + 9} r="3" fill="currentColor" className="art-blink" style={{ animationDelay: `${i * 0.25 + 0.4}s` }} />
          <path {...S} d={`M62 ${y + 9}h30`} opacity=".5" />
        </g>
      ))}
    </>
  ),
  shield: (
    <>
      <path {...S} d="M60 8 24 22v20c0 20 14 31 36 38 22-7 36-18 36-38V22Z" className="art-draw" />
      <path {...S} d="m44 44 11 11 22-24" className="art-draw art-draw2" />
    </>
  ),
  pen: (
    <>
      <path {...S} d="M12 62C28 6 48 6 60 40s32 34 48-20" className="art-draw" />
      <path {...S} d="M12 62 24 62M96 22l12 0" opacity=".4" strokeDasharray="3 4" />
      {[[12, 62], [60, 40], [108, 20]].map(([x, y], i) => <rect key={i} x={x - 4} y={y - 4} width="8" height="8" rx="1.5" fill="currentColor" className="art-pop" style={{ animationDelay: `${0.15 * i}s` }} />)}
    </>
  ),
  spark: (
    <>
      <path fill="currentColor" className="art-spin" d="M60 8l7 22 22 7-22 7-7 22-7-22-22-7 22-7Z" />
      <path fill="currentColor" className="art-twinkle" d="M100 52l3 9 9 3-9 3-3 9-3-9-9-3 9-3Z" />
      <path fill="currentColor" className="art-twinkle art-t2" d="M20 50l2 6 6 2-6 2-2 6-2-6-6-2 6-2Z" />
    </>
  ),
  search: (
    <>
      <g className="art-orbit"><circle cx="54" cy="36" r="20" {...S} /><path {...S} d="m69 51 20 20" /></g>
      <path {...S} d="M54 28v16M46 36h16" className="art-pulse-s" />
    </>
  ),
  book: (
    <>
      <path {...S} d="M60 22C46 14 28 14 14 20v46c14-6 32-6 46 2 14-8 32-8 46-2V20c-14-6-32-6-46 2Z" />
      <path {...S} d="M60 22v46" />
      <path {...S} d="M60 22c14-8 32-8 46-2" className="art-flip" />
      <path fill="currentColor" className="art-twinkle" d="M88 6l2 5 5 2-5 2-2 5-2-5-5-2 5-2Z" />
    </>
  ),
  shop: (
    <>
      <path {...S} d="M20 34h80l-6 38H26Z" />
      <path {...S} d="M42 34c0-16 8-24 18-24s18 8 18 24" className="art-bounce" />
      <path {...S} d="M44 54l12 10 22-20" className="art-draw art-draw2" />
    </>
  ),
  scroll: (
    <>
      <rect x="34" y="6" width="52" height="68" rx="9" {...S} />
      <rect x="55" y="18" width="10" height="16" rx="5" fill="currentColor" className="art-scroll" />
      <path {...S} d="M46 50h28M46 60h18" opacity=".5" />
    </>
  ),
  audit: (
    <>
      <rect x="30" y="8" width="60" height="66" rx="7" {...S} />
      <path {...S} d="M42 26h36M42 38h36M42 50h20" opacity=".6" className="art-flow" strokeDasharray="5 4" />
      <rect x="62" y="48" width="26" height="22" rx="4" fill="currentColor" className="art-pop" />
      <path d="M68 48v-5a7 7 0 0 1 14 0v5" {...S} />
    </>
  ),
};

export default function Art({ name, className = '' }) {
  const art = ARTS[name];
  if (!art) return null;
  return (
    <svg viewBox="0 0 120 80" className={className} aria-hidden>
      {art}
    </svg>
  );
}
