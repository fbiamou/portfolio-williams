# Règle : cadrage interactif d'un CV en ligne cinématographique

## Déclencheur
Dès que l'utilisateur exprime l'intention de créer un CV en ligne, un portfolio personnel ou une page de présentation professionnelle (ex. "crée-moi un CV en ligne", "je veux un portfolio", "fais-moi une page CV") : NE COMMENCE PAS À CODER. Lance d'abord l'interview de cadrage ci-dessous en utilisant l'outil AskUserQuestion.

## Règles de conduite de l'interview ( pour toutes les questions utilise l'outil AskUserQuestion)
- Pose les questions par petits groupes thématiques (les 5 groupes ci-dessous), jamais toutes en une fois.
- Attends la réponse de l'utilisateur avant de passer au groupe suivant.
- Si une réponse est vague ou absente, propose une valeur par défaut raisonnable, annonce-la clairement, et continue — ne bloque jamais l'interview sur un point secondaire.
- Demande explicitement des références visuelles à chaque fois que c'est pertinent : liens de sites, captures d'écran, noms de polices, ou films/affiches qui inspirent l'ambiance. Accepte des liens, des descriptions écrites, ou des images déposées directement dans le chat.
- Une question par ligne, formulée simplement.

## Groupe 1 — Objectif & cible
1. Quel est l'objectif principal du site : candidature ciblée, freelance, vitrine de carrière générale ?
2. Qui est la cible principale (recruteur pressé, client potentiel, réseau professionnel) ?
3. Quelle action principale le visiteur doit-il accomplir (télécharger le CV, prendre contact, voir un projet précis) ?

## Groupe 2 — Contenu brut
4. Demande le texte définitif ou au minimum les informations brutes pour : nom/rôle, une phrase de positionnement, parcours (postes/périodes/réalisations), compétences, 3 à 5 projets (avec visuels si disponibles), formation si pertinente, coordonnées de contact.
5. Un CV PDF existe-t-il déjà et doit-il être proposé en téléchargement ?
6. Quelle(s) langue(s) pour le site ? (une seule langue recommandée au lancement, sauf besoin explicite contraire)

## Groupe 3 — Direction artistique (références obligatoires)
7. Demande 2 à 4 références visuelles concrètes (liens de sites, captures d'écran, ou noms de films/affiches) illustrant l'ambiance recherchée — insiste pour au moins une référence concrète, pas seulement des adjectifs comme "moderne" ou "épuré".
8. Palette préférée (fond sombre ou clair dominant + une couleur d'accent) ? Sinon, propose un choix et précise-le clairement.
9. Typographie préférée (nom de police si connu, ou style : serif éditoriale / grotesque affirmée / autre) ? Sinon, propose un choix.
10. Niveau d'animation souhaité : sobre (peu de mouvement) ou marqué (scroll storytelling prononcé) ? Un son est-il souhaité (toujours à activation volontaire, jamais en lecture automatique) ?

## Groupe 4 — Structure & fonctionnalités
11. Confirme la liste des sections à inclure (à partir du groupe 2) et leur ordre.
12. Un formulaire de contact classique est-il nécessaire ? Un formulaire "recruteurs intéressés" (capture volontaire de coordonnées) est-il souhaité ?
13. Rappel impératif à formuler à l'utilisateur : ce projet reste en version simple, **sans base de données ni authentification côté serveur**. Toute capture de contacts ou tout suivi de visites passe par un service externe déjà prêt à l'emploi (Formspree ou Tally pour les formulaires, Plausible ou Umami pour les statistiques de visite). Ne propose jamais de backend personnalisé, de base de données ou de système d'authentification pour ce projet, sauf si l'utilisateur le demande explicitement dans un message ultérieur.

## Groupe 5 — Contraintes techniques
14. Device prioritaire ? (mobile d'abord recommandé par défaut)
15. Nom de domaine déjà choisi, ou à définir plus tard ?
16. Hébergeur préféré, ou Vercel par défaut ?

## Une fois l'interview terminée
Résume en quelques lignes ce qui a été compris, demande une confirmation rapide ("c'est bien ça ?"), puis génère deux fichiers à la racine du projet :

### 1. `CONTEXTE-PROJET.md`
Reprend la structure : cadrage (objectif/cible/CTA) → contenu (textes réels fournis, pas de placeholder) → direction artistique (références citées, palette, typographie, niveau d'animation) → structure & fonctionnalités (sections validées et leur ordre, formulaires) → contraintes techniques (device, domaine, hébergeur). Rempli avec les réponses réelles de l'utilisateur, jamais de contenu générique inventé.

### 2. `AGENTS.md`
- **Principe directeur** : clair, pointilleux, simple — un seul type d'animation d'entrée par section, le mouvement sert la lecture, il ne la remplace jamais.
- **Design tokens** déduits de l'entretien : couleurs, typographies, échelle d'espacement 8/16/24/40/64/96px, une seule courbe d'easing signature, durées 300-600ms pour les micro-interactions et 800-1200ms pour les transitions de scène.
- **Sections validées**, dans l'ordre.
- **Contraintes non négociables** : `prefers-reduced-motion` doit toujours donner une version statique complète, contraste AA minimum, performance mobile prioritaire sur les effets visuels, aucun backend ni base de données pour ce projet.
- **Stack validée** : site statique (Astro ou Vite), Tailwind CSS, GSAP + ScrollTrigger, Lenis pour le scroll fluide, formulaires via service externe (Formspree/Tally), analytics via service externe (Plausible/Umami).

Confirme que ces deux fichiers sont désormais la référence permanente du projet, puis propose de commencer le développement section par section (une section = un prompt, jamais toutes en même temps), en committant après chaque section validée.

## Pendant tout le reste du projet
Réfère-toi systématiquement à `AGENTS.md` avant de générer ou modifier du code. Si une demande de l'utilisateur contredit une règle du fichier (par exemple ajouter un deuxième effet d'animation sur une section déjà définie, ou introduire une base de données), signale le conflit avant d'exécuter, plutôt que de l'appliquer silencieusement.