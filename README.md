# Portfolio — Williams Biamou (Williams Informatic)

Page unique React + Vite, trilingue (FR / ES / EN), en ligne sur https://portfolio-williams-neon.vercel.app (déploiement automatique Vercel à chaque push sur `main`).

## Contenu
- **Hero cinématique** piloté au défilement : vidéo 3D rendue avec Blender puis encodée avec ffmpeg (`public/hero/scrub.mp4`). Repli en image fixe sur téléphone, tablette portrait et si « réduire les animations » est actif.
- **Projets et créations** en cartes-dossiers cliquables (vidéos, marques, posts) avec carrousels en diaporama (clic, flèches, swipe).
- **Traductions** FR / ES / EN : textes dans `src/data.js` et `src/projects.js`.

## Structure
- `src/Film.jsx` : hero au défilement (réexporté comme `Hero` par `sections.jsx`)
- `src/sections.jsx`, `Work.jsx`, `Content.jsx` : sections, projets, contenus
- `src/data.js`, `projects.js`, `creatorData.json` : données et traductions
- `tools/hero-film/scene.py` : scène Blender du hero

## Commandes
```bash
npm install
npm run dev      # aperçu local
npm run build    # build de production (dist/)
npm run lint
```

## Régénérer le film du hero
`blender -b -P tools/hero-film/scene.py -- <dossier_absolu>/frames 1600 900 150`, puis ffmpeg (glow `gbrp`, `-g 8`, `crf 24`, `start_number 24`).
