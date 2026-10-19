import { T } from './data';

const FIGMA_JONME = 'https://www.figma.com/proto/yTHeUM6CeyFlm6PlVwmwhD/JONME-%C2%B7-Maqueta-web-2026?node-id=6-34&starting-point-node-id=6%3A34&scaling=scale-down-width&content-scaling=fixed';
const UPL = T('pour le compte d’UPLINKS', 'por cuenta de UPLINKS', 'on behalf of UPLINKS');

/*
  cat      : filtres (web, design, it, ia)
  img      : visuel de couverture ; stock : photo d’ambiance (sinon carte à illustration SVG)
  gallery  : visuels de la fiche détaillée ; links : [{ url, label }]
  tools    : clés de src/ui/tools.jsx ; art : clé de src/ui/art.jsx (animation au survol)
  Une carte n’est cliquable (flèche + fiche) que si elle a une galerie ou un lien.
*/
export const PROJECTS = [
  { id: 'wishop', cat: ['web', 'ia'], title: 'WISHOP', kind: T('SaaS · PWA', 'SaaS · PWA', 'SaaS · PWA'), year: '2026', big: true, status: 'live', art: 'shop',
    img: 'projects/wishop-site/s1.jpg',
    gallery: ['projects/wishop-site/s1.jpg', 'projects/wishop-site/s2.jpg', 'projects/wishop-site/s3.jpg', 'projects/wishop-site/s4.jpg', 'projects/wishop-site/s5.jpg', 'projects/wishop-site/s6.jpg'],
    links: [{ url: 'https://wishop-saa-s.vercel.app', label: T('Ouvrir la plateforme', 'Abrir la plataforma', 'Open the platform') }],
    tools: ['next', 'supabase', 'claude', 'vercel'],
    d: T('Application de gestion pour boutiques de détail : ventes, stock, crédits clients et rappels WhatsApp, même sans internet. Interface trilingue FR / ES / EN. Produit de Williams Informatic, V1 lancée le 05/10/2026.', 'Aplicación de gestión para tiendas minoristas: ventas, stock, créditos de clientes y recordatorios por WhatsApp, incluso sin internet. Interfaz trilingüe FR / ES / EN. Producto de Williams Informatic, V1 lanzada el 05/10/2026.', 'Management app for retail shops: sales, stock, customer credit and WhatsApp reminders, even offline. Trilingual FR / ES / EN interface. A Williams Informatic product, V1 launched 05/10/2026.'), tags: ['SaaS', 'PWA', 'WhatsApp'] },

  { id: 'storybook', cat: ['ia', 'design'], title: T('Tika et la lune', 'Tika y la luna', 'Tika and the Moon'), kind: T('Livre illustré · Story Book Studio', 'Libro ilustrado · Story Book Studio', 'Illustrated book · Story Book Studio'), year: '2026', big: true, art: 'book',
    img: 'projects/storybook/p01.jpg',
    gallery: ['projects/storybook/p01.jpg', 'projects/storybook/p03.jpg', 'projects/storybook/p06.jpg', 'projects/storybook/p09.jpg', 'projects/storybook/p12.jpg', 'projects/storybook/p16.jpg', 'projects/storybook/p20.jpg', 'projects/storybook/p24.jpg'],
    tools: ['comfy', 'claude'],
    d: T('Livre jeunesse illustré créé avec mon atelier Story Book Studio : histoire page par page, personnages identiques d’une page à l’autre, PDF écran et impression.', 'Libro infantil ilustrado creado con mi taller Story Book Studio: historia página a página, personajes idénticos en todas las páginas, PDF para pantalla e impresión.', 'Illustrated children’s book made with my Story Book Studio workflow: story page by page, consistent characters throughout, screen and print PDFs.'), tags: ['Illustration', 'Édition'] },

  { id: 'wi', cat: ['design'], title: 'Williams Informatic', kind: T('Identité & documents', 'Identidad y documentos', 'Identity & documents'), year: '2026', art: 'pen',
    img: 'projects/wi/logo-blanc.jpg',
    gallery: ['projects/wi/logo-blanc.jpg', 'projects/wi/logo-couleur.jpg', 'projects/wi/card3.jpg', 'projects/wi/card4.jpg', 'projects/wi/card1.jpg', 'projects/wi/card2.jpg'],
    tools: ['ai', 'ps', 'id'],
    d: T('Logo, déclinaisons, cartes de visite et documents commerciaux de mon entreprise.', 'Logotipo, variantes, tarjetas de visita y documentos comerciales de mi empresa.', 'Logo, variations, business cards and commercial documents for my company.'), tags: ['Logo', 'Papeterie'] },

  { id: 'cocontech', cat: ['design'], title: 'CoconTech', kind: T('Identité complète', 'Identidad completa', 'Full identity'), year: '2026', art: 'pen', tools: ['ai', 'id'],
    d: T('Logo, cartes, enseigne, objets (sac, mug) et fond d’écran : l’idée à l’origine de Williams Informatic.', 'Logotipo, tarjetas, rótulo, objetos (bolsa, taza) y fondo de pantalla: la idea original de la que nació Williams Informatic.', 'Logo, cards, signage, merch (bag, mug) and wallpaper: the original idea behind Williams Informatic.'), tags: ['Branding', 'Papeterie'] },

  { id: 'freshlady', brand: 'Freshlady Home', cat: ['design'], client: true, title: 'Freshlady Home', kind: T('Identité visuelle', 'Identidad visual', 'Visual identity'), year: '2025', img: 'creator/i/121.jpg', art: 'pen', tools: ['ai', 'id'],
    d: T('Moodboard, logo et catalogue d’achat pour la marque et Freshlady’s Africa.', 'Moodboard, logotipo y catálogo de compra para la marca y Freshlady’s Africa.', 'Moodboard, logo and purchasing catalogue for the brand and Freshlady’s Africa.'), tags: ['Logo', 'Catalogue'] },

  { id: 'jonme', cat: ['design'], client: true, title: 'JONME', kind: T('Identité & catalogue', 'Identidad y catálogo', 'Identity & catalogue'), year: '2026', art: 'pen',
    img: 'projects/jonme/cat10.jpg',
    gallery: ['projects/jonme/cat10.jpg', 'projects/jonme/logo-dark.jpg', 'projects/jonme/logo.jpg', 'projects/jonme/cat11.jpg', 'projects/jonme/cat13.jpg', 'projects/jonme/cat14.jpg', 'projects/jonme/cat15.jpg', 'projects/jonme/cat16.jpg', 'projects/jonme/cat17.jpg', 'projects/jonme/cat19.jpg', 'projects/jonme/phonemock.jpg', 'projects/jonme/vinylmock.jpg'],
    links: [{ url: FIGMA_JONME, label: T('Voir la maquette Figma', 'Ver la maqueta en Figma', 'View the Figma mockup') }],
    tools: ['ai', 'ps', 'figma'],
    d: T('Identité visuelle d’une productrice, distributrice et éditrice musicale de Malabo : logo, catalogue de services, guide d’usage et maquette interactive de site dans Figma.', 'Identidad visual de una productora, distribuidora y editora musical de Malabo: logotipo, catálogo de servicios, guía de uso y maqueta interactiva del sitio en Figma.', 'Visual identity for a music producer, distributor and publisher in Malabo: logo, services catalogue, usage guide and an interactive website mockup in Figma.'), tags: ['Branding', 'Catalogue', 'UI / UX'] },

  { id: 'tevo', brand: 'Tevo', cat: ['design'], client: true, title: 'TEVO Market', kind: T('Identité & flyers', 'Identidad y flyers', 'Identity & flyers'), year: '2026', img: 'creator/i/167.jpg', art: 'pen', tools: ['ai', 'ps'],
    d: T('Logo et identité visuelle d’une poissonnerie, déclinés en flyers.', 'Logotipo e identidad visual de una pescadería, aplicados en flyers.', 'Logo and visual identity for a fishmonger, rolled out across flyers.'), tags: ['Logo', 'Flyers'] },

  { id: 'njimpact', brand: 'NJ Impact', cat: ['design'], client: true, title: 'NJ Impact', kind: T('Identité & réseaux', 'Identidad y redes', 'Identity & social'), year: '2025', img: 'creator/i/178.jpg', art: 'pen', tools: ['ai', 'ps'],
    d: T('Logo, cartes de visite, flyers, kakémono et stratégie réseaux sociaux.', 'Logotipo, tarjetas, flyers, roll-up y estrategia de redes sociales.', 'Logo, business cards, flyers, roll-up banner and social media strategy.'), tags: ['Print', 'Social'] },

  { id: 'techcom', brand: 'Tech Community', cat: ['design'], client: true, title: 'Tech Community', kind: T('Identité & visuels', 'Identidad y visuales', 'Identity & visuals'), year: '2026', img: 'creator/i/207.jpg', art: 'pen', tools: ['ai', 'ps', 'id'],
    d: T('Logo, enseigne, cartes de visite, t-shirt et banque de visuels de la marque, tous créés pour la communauté.', 'Logotipo, rótulo, tarjetas, camiseta y banco de visuales de la marca, todo creado para la comunidad.', 'Logo, signage, business cards, T-shirt and visual bank for the brand, all created for the community.'), tags: ['Logo', 'Mockups', 'Social'] },

  { id: 'wifarm', cat: ['web', 'ia'], title: 'WIFARM', kind: T('SaaS pharmacie', 'SaaS farmacia', 'Pharmacy SaaS'), year: '2026', status: 'dev', art: 'search', tools: ['next', 'supabase', 'claude'],
    d: T('Recherche de médicaments et de pharmacies de garde, comptes et abonnements. Anciennement PharmaFind, encore en cours de développement.', 'Búsqueda de medicamentos y farmacias de guardia, cuentas y suscripciones. Antes PharmaFind, todavía en desarrollo.', 'Search for medicines and on-duty pharmacies, accounts and subscriptions. Formerly PharmaFind, still in development.'), tags: ['SaaS', 'Santé'] },

  { id: 'medzen', cat: ['web', 'design'], title: 'Medzen Health', kind: T('Landing page · proposition', 'Landing page · propuesta', 'Landing page · pitch'), year: '2026', status: 'proposal', art: 'scroll', tools: ['gsap', 'claude'],
    img: 'projects/medzen-site/s1.jpg',
    gallery: ['projects/medzen-site/s1.jpg', 'projects/medzen-site/s2.jpg', 'projects/medzen-site/s3.jpg', 'projects/medzen-site/s4.jpg', 'projects/medzen-site/s5.jpg', 'projects/medzen-site/s6.jpg', 'projects/medzen-site/s7.jpg'],
    links: [{ url: 'https://medzen-health.vercel.app', label: T('Voir la landing page', 'Ver la landing page', 'View the landing page') }],
    d: T('Page d’accueil proposée à une plateforme de téléconsultation en Afrique francophone : héros animé au défilement, parcours en trois étapes, démonstration du code USSD.', 'Página de inicio propuesta a una plataforma de teleconsulta en África francófona: portada animada con el scroll, recorrido en tres pasos, demostración del código USSD.', 'Landing page pitched to a teleconsultation platform in francophone Africa: scroll-animated hero, three-step journey, USSD code demo.'), tags: ['Landing', 'Animation'] },

  { id: 'talentscout', cat: ['web', 'design'], title: 'TalentScout', kind: T('Audit UX & produit', 'Auditoría UX y producto', 'UX & product audit'), year: '2026', status: 'confidential', art: 'audit', stock: 'stock/audit.jpg',
    d: T('Audit bilingue FR / EN des espaces athlète, club et famille, distinguant constats vérifiés et hypothèses. Résultats d’analyse confidentiels.', 'Auditoría bilingüe FR / EN de los espacios atleta, club y familia, separando hallazgos verificados e hipótesis. Resultados del análisis confidenciales.', 'Bilingual FR / EN audit of the athlete, club and family spaces, separating verified findings from assumptions. Analysis results are confidential.'), tags: ['UX', 'Audit'] },

  { id: 'reseau-oms', cat: ['it'], title: T('Réseau OMS Malabo', 'Red OMS Malabo', 'WHO network, Malabo'), kind: T('Infrastructure', 'Infraestructura', 'Infrastructure'), year: '2022–26', via: UPL, stock: 'stock/oms.jpg', art: 'net',
    d: T('Architecture et installation complète du réseau local du bureau, avec onduleur Schneider 15 kVA pour la continuité du système.', 'Arquitectura e instalación completa de la red local de la oficina, con SAI Schneider de 15 kVA para la continuidad del sistema.', 'Full architecture and installation of the office LAN, with a 15 kVA Schneider UPS for system continuity.'), tags: ['LAN', 'Onduleur'] },
  { id: 'onu-serveurs', cat: ['it'], title: T('Salles serveurs ONU', 'Salas de servidores ONU', 'UN server rooms'), kind: T('Brassage & étiquetage', 'Parcheo y etiquetado', 'Patching & labelling'), year: '2022–26', via: UPL, stock: 'stock/serveurs.jpg', art: 'server',
    d: T('Remise en ordre des baies et salles serveurs de quatre agences des Nations unies à Malabo.', 'Reordenación de racks y salas de servidores de cuatro agencias de la ONU en Malabo.', 'Racks and server rooms of four UN agencies in Malabo cleaned up, re-patched and labelled.'), tags: ['Baies', 'Câblage'] },
  { id: 'onu-wifi', cat: ['it'], title: T('Wi-Fi institutionnel', 'Wi-Fi institucional', 'Institutional Wi-Fi'), kind: T('Réseaux sans fil', 'Redes inalámbricas', 'Wireless networks'), year: '2022–26', via: UPL, stock: 'stock/wifi.jpg', art: 'wifi',
    d: T('Installation et configuration de points d’accès Wi-Fi, plus une liaison hertzienne point à point entre deux bâtiments.', 'Instalación y configuración de puntos de acceso Wi-Fi, más un radioenlace punto a punto entre dos edificios.', 'Installation and configuration of Wi-Fi access points, plus a point-to-point radio link between two buildings.'), tags: ['Wi-Fi', 'Radio'] },
  { id: 'bdeac', cat: ['it'], title: 'BDEAC Malabo', kind: T('Support informatique', 'Soporte informático', 'IT support'), year: '2024 →', stock: 'stock/bdeac.jpg', art: 'shield',
    d: T('Support du bureau pour le compte d’UPLINKS, puis prestations en direct via Williams Informatic depuis août 2026 : migration de postes vers Windows 11, sauvegardes, sécurité.', 'Soporte de la oficina por cuenta de UPLINKS y, desde agosto de 2026, servicios directos con Williams Informatic: migración de equipos a Windows 11, copias de seguridad, seguridad.', 'Office support on behalf of UPLINKS, then direct services through Williams Informatic since August 2026: Windows 11 migrations, backups, security.'), tags: ['Windows', 'Sécurité'] },
  { id: 'steel', cat: ['it'], client: true, title: 'Steel Proyect', kind: T('Sécurité & numérisation', 'Seguridad y digitalización', 'Security & digitisation'), year: '2026', stock: 'stock/wifi.jpg', art: 'shield',
    d: T('Audit, sécurisation des postes stratégiques et plan de numérisation commerciale.', 'Auditoría, protección de los equipos estratégicos y plan de digitalización comercial.', 'Audit, hardening of key workstations and a commercial digitisation plan.'), tags: ['Audit', 'Conseil'] },

  { id: 'agents', cat: ['ia'], title: T('Agents & compétences IA', 'Agentes y competencias de IA', 'AI agents & skills'), kind: T('Automatisation', 'Automatización', 'Automation'), year: '2026', art: 'spark', tools: ['claude'],
    d: T('Agents de production de carrousels et de visuels de marque, playbooks et modèles HTML réutilisables.', 'Agentes que producen carruseles y visuales de marca, playbooks y plantillas HTML reutilizables.', 'Agents that produce carousels and brand visuals, with reusable playbooks and HTML templates.'), tags: ['Automatisation', 'Playbooks'] },
  { id: 'produits', cat: ['ia'], title: T('Produits numériques', 'Productos digitales', 'Digital products'), kind: T('Boutique Chariow', 'Tienda Chariow', 'Chariow store'), year: '2026', art: 'spark',
    d: T('« Le CV parfait », « Le guide du spontané » : des systèmes de prompts vendus en ligne.', '«El CV perfecto», «La guía de la candidatura espontánea»: sistemas de prompts vendidos en línea.', '“The perfect CV”, “The spontaneous application guide”: prompt systems sold online.'), tags: ['Chariow', 'Prompts'] },
];

// Puces : les noms propres et termes techniques restent tels quels, le reste suit la langue
export const TAGS = {
  Illustration: T('Illustration', 'Ilustración', 'Illustration'), 'Édition': T('Édition', 'Edición', 'Publishing'),
  Papeterie: T('Papeterie', 'Papelería', 'Stationery'), Catalogue: T('Catalogue', 'Catálogo', 'Catalogue'),
  'Santé': T('Santé', 'Salud', 'Health'), Animation: T('Animation', 'Animación', 'Animation'),
  Audit: T('Audit', 'Auditoría', 'Audit'), Conseil: T('Conseil', 'Consultoría', 'Consulting'),
  Onduleur: T('Onduleur', 'SAI', 'UPS'), Baies: T('Baies', 'Racks', 'Racks'), 'Câblage': T('Câblage', 'Cableado', 'Cabling'),
  Radio: T('Radio', 'Radioenlace', 'Radio link'), 'Sécurité': T('Sécurité', 'Seguridad', 'Security'),
  Automatisation: T('Automatisation', 'Automatización', 'Automation'), Print: T('Print', 'Impresión', 'Print'),
  Social: T('Social', 'Redes', 'Social'), Mockups: T('Mockups', 'Maquetas', 'Mockups'),
};
export const tagOf = (x, lang) => (TAGS[x] ? TAGS[x][lang] : x);
export const titleOf = (p, lang) => (typeof p.title === 'string' ? p.title : p.title[lang]);
