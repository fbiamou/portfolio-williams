# Règles de Conception et Développement du Portfolio

## Principe directeur
Clair, pointilleux, simple — un seul type d'animation d'entrée par section, le mouvement sert la lecture, il ne la remplace jamais.

## Design tokens
- **Couleurs :** Palette à dominante sombre (#121212) avec couleur d'accent (#00a8cc). Contraste AA minimum.
- **Typographies :** Serif éditoriale (ex: Playfair Display).
- **Échelle d'espacement :** 8 / 16 / 24 / 40 / 64 / 96px.
- **Animation (Easing & Timing) :**
  - Une seule courbe d'easing signature pour tout le site.
  - Durées : 300-600ms pour les micro-interactions.
  - Durées : 800-1200ms pour les transitions de scène.

## Sections validées (dans l'ordre)
1. Accueil (Héros)
2. À propos / Positionnement
3. Projets
4. Compétences
5. Contact

## Animations & GSAP
- **Mouvement Vertical Privilégié :** Éviter les apparitions horizontales (`x: -50`) qui peuvent causer des débordements et des bugs de scroll horizontal sur mobile. Privilégier une translation verticale douce (ex: `y: 30`) vers le haut.
- **Nettoyage GSAP :** Toujours utiliser `gsap.context()` avec `revert()` dans les `useEffect` React pour éviter les fuites de mémoire et les conflits d'animations lors des re-rendus.

## Bonnes Pratiques d'Intégration Visuelle (Images & Layouts)
- **Masquage Fluide (CSS Masks) :** Utiliser `mask-image` (avec `linear-gradient` ou `radial-gradient`) et `mask-composite` pour fondre parfaitement les images (portraits, photos en pied) dans le fond sombre sans bordures nettes.
- **Images Pleine Hauteur :** Pour qu'une image occupe toute la longueur d'une section à côté d'une colonne de texte très longue, utiliser un conteneur Flex avec `items-stretch`. L'image doit utiliser `absolute inset-0 object-cover object-top` pour s'étirer naturellement sans laisser de vide.
- **Responsivité Texte / Flexbox :** Dans une disposition en colonne (`flex-col` sur mobile), ne jamais utiliser `items-center` sur des blocs contenant de longs textes non contraints. Préférer `items-stretch` et `w-full` pour garantir que le texte s'enroule correctement aux bords de l'écran.
- **Scroll Horizontal :** Maintenir impérativement `overflow-x: hidden` sur la balise `body` pour empêcher tout comportement de défilement horizontal parasite lié au navigateur ou aux animations.

## Contraintes non négociables
- `prefers-reduced-motion` doit toujours donner une version statique complète.
- Contraste AA minimum garanti.
- Performance mobile prioritaire sur les effets visuels (conception Mobile-first).
- **Aucun backend ni base de données pour ce projet.**

## Stack validée
- **Framework :** Site statique (Astro ou Vite).
- **Style :** Tailwind CSS.
- **Animations :** GSAP + ScrollTrigger.
- **Scroll :** Lenis pour le scroll fluide.
- **Formulaires :** Service externe (Formspree / Tally).
- **Analytics :** Service externe (Plausible / Umami).
- **Hébergement :** Vercel.
