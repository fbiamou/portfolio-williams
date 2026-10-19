// Tous les textes sont trilingues : T(fr, es, en)
export const T = (fr, es, en) => ({ fr, es, en });

export const CONTACT = {
  email: 'williams.informatic@pm.me',
  phone: '+240 222 779 813',
  wa: 'https://wa.me/240222779813',
  formspree: 'https://formspree.io/f/xkjwpwzz',
};

export const SOCIALS = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/williamsbiamou' },
  { name: 'TikTok FR', url: 'https://www.tiktok.com/@williams_biamou' },
  { name: 'TikTok ES', url: 'https://www.tiktok.com/@williamsbiamou' },
  { name: 'Instagram', url: 'https://www.instagram.com/williams_biamou/' },
  { name: 'Facebook', url: 'https://www.facebook.com/williamsbiamou' },
  { name: 'Chariow', url: 'https://gnrwzguu.mychariow.store' },
];

export const UI = {
  nav: { work: T('Projets', 'Proyectos', 'Work'), services: T('Services', 'Servicios', 'Services'), content: T('Contenu', 'Contenido', 'Content'), about: T('Pourquoi moi', 'Por qué yo', 'Why me'), contact: T('Contact', 'Contacto', 'Contact') },
  hero: {
    eyebrow: T('Malabo · Guinée équatoriale · à distance', 'Malabo · Guinea Ecuatorial · remoto', 'Malabo · Equatorial Guinea · remote'),
    l1: T('Réseaux fiables,', 'Redes fiables,', 'Reliable networks,'),
    l2: T('marques fortes,', 'marcas fuertes,', 'strong brands,'),
    l3: T('outils simples.', 'herramientas simples.', 'simple tools.'),
    sub: T('Technicien IT et réseaux, designer et concepteur de solutions web et IA, fondateur de Williams Informatic à Malabo. J’aide les organisations à fonctionner avec une informatique fiable et des outils numériques simples.',
      'Técnico IT y de redes, diseñador y creador de soluciones web e IA, fundador de Williams Informatic en Malabo. Ayudo a las organizaciones a funcionar con una informática fiable y herramientas digitales simples.',
      'IT and network technician, web and AI solutions designer, founder of Williams Informatic in Malabo. I help organisations run on reliable IT and simple digital tools.'),
    cta1: T('Voir mes projets', 'Ver mis proyectos', 'See my work'),
    cta2: T('Me contacter', 'Contactarme', 'Get in touch'),
    stats: [
      [T('4 métiers', '4 oficios', '4 crafts'), T('IT · Design · Web · Contenu', 'IT · Diseño · Web · Contenido', 'IT · Design · Web · Content')],
      [T('3 langues', '3 idiomas', '3 languages'), T('Français · Español · English', 'Français · Español · English', 'Français · Español · English')],
      [T('30+ projets', '30+ proyectos', '30+ projects'), T('documentés et réels', 'documentados y reales', 'documented and real')],
    ],
    scroll: T('Défiler', 'Desplazar', 'Scroll'),
    film: [
      [T('Réseaux & serveurs', 'Redes y servidores', 'Networks & servers'), T('Réseaux fiables,', 'Redes fiables,', 'Reliable networks,')],
      [T('Design & marque', 'Diseño y marca', 'Design & brand'), T('marques fortes,', 'marcas fuertes,', 'strong brands,')],
      [T('Web, IA & contenu', 'Web, IA y contenido', 'Web, AI & content'), T('outils simples.', 'herramientas simples.', 'simple tools.')],
    ],
  },
  services: {
    eyebrow: T('Ce que je fais', 'Lo que hago', 'What I do'),
    title: [T('Quatre métiers,', 'Cuatro oficios,', 'Four crafts,'), T('une seule personne.', 'una sola persona.', 'one person.')],
    roleLabel: T('Mon rôle', 'Mi papel', 'My role'),
    toolsLabel: T('Au quotidien', 'Día a día', 'Day to day'),
    items: [
      { n: '01', art: 'pen', t: T('Identité de marque', 'Identidad de marca', 'Brand identity'),
        d: T('Une marque cohérente du premier regard à la carte de visite.', 'Una marca coherente desde la primera mirada hasta la tarjeta.', 'A brand that stays consistent from first glance to business card.'),
        role: T('Je conçois l’identité complète : écoute du projet, recherche d’univers, logo et déclinaisons, charte, papeterie, packaging, catalogues, flyers et kakémonos. Je livre des fichiers prêts pour l’impression comme pour le web, et j’accompagne la marque quand elle commence à communiquer.', 'Diseño la identidad completa: escucha del proyecto, búsqueda de universo, logotipo y variantes, manual de marca, papelería, packaging, catálogos, flyers y roll-ups. Entrego archivos listos para imprenta y para web, y acompaño a la marca cuando empieza a comunicar.', 'I design the complete identity: listening to the project, exploring the universe, logo and variations, guidelines, stationery, packaging, catalogues, flyers and roll-ups. I deliver files ready for print and web, and support the brand as it starts to communicate.'),
        tools: ['ai', 'ps', 'id', 'figma'], chips: [] },
      { n: '02', art: 'scroll', t: T('Web, SaaS & IA', 'Web, SaaS e IA', 'Web, SaaS & AI'),
        d: T('Des sites et applications rapides, mobiles, trilingues.', 'Sitios y aplicaciones rápidos, móviles y trilingües.', 'Fast, mobile-first, trilingual sites and apps.'),
        role: T('De la maquette Figma à la mise en ligne : je définis le parcours, dessine l’interface, développe et déploie. Je construis sites vitrines, landing pages animées et applications SaaS avec une base de données, en m’appuyant sur Claude Code pour avancer vite sans sacrifier la qualité.', 'De la maqueta en Figma a la puesta en línea: defino el recorrido, diseño la interfaz, desarrollo y despliego. Construyo sitios, landing pages animadas y aplicaciones SaaS con base de datos, apoyándome en Claude Code para avanzar rápido sin sacrificar calidad.', 'From Figma mockup to launch: I define the journey, design the interface, build and deploy. I make websites, animated landing pages and SaaS apps with a database, relying on Claude Code to move fast without sacrificing quality.'),
        tools: ['figma', 'next', 'supabase', 'vercel', 'claude', 'gsap'], chips: [] },
      { n: '03', art: 'net', t: T('IT & Réseaux', 'IT y Redes', 'IT & Networks'),
        d: T('Une informatique fiable pour bureaux et institutions.', 'Una informática fiable para oficinas e instituciones.', 'Reliable IT for offices and institutions.'),
        role: T('Sur le terrain, j’installe et je maintiens réseaux locaux, Wi-Fi, salles serveurs et postes de travail. J’audite, câble, configure, étiquette, sauvegarde et sécurise les accès, puis je documente chaque intervention pour que l’équipe reste autonome.', 'Sobre el terreno, instalo y mantengo redes locales, Wi-Fi, salas de servidores y equipos de trabajo. Audito, cableo, configuro, etiqueto, hago copias de seguridad y protejo los accesos, y documento cada intervención para que el equipo sea autónomo.', 'In the field, I install and maintain local networks, Wi-Fi, server rooms and workstations. I audit, cable, configure, label, back up and secure access, then document every intervention so the team stays autonomous.'),
        tools: [], chips: [T('Câblage structuré', 'Cableado estructurado', 'Structured cabling'), T('Wi-Fi', 'Wi-Fi', 'Wi-Fi'), T('Windows / Windows Server', 'Windows / Windows Server', 'Windows / Windows Server'), T('Sauvegardes', 'Copias de seguridad', 'Backups'), T('Contrôle d’accès', 'Control de acceso', 'Access control'), T('Onduleurs', 'SAI', 'UPS')] },
      { n: '04', art: 'spark', t: T('Contenu & Réseaux sociaux', 'Contenido y Redes sociales', 'Content & Social'),
        d: T('Des contenus qui donnent envie, en français et en espagnol.', 'Contenidos que dan ganas, en español y francés.', 'Content that makes people want more, in French and Spanish.'),
        role: T('J’imagine, scénarise, tourne, monte et designe : Reels, TikToks, carrousels et visuels pour des marques. Du script au sous-titrage, je garde une ligne éditoriale claire et des visuels cohérents avec l’identité de la marque.', 'Imagino, escribo el guion, grabo, monto y diseño: Reels, TikToks, carruseles y visuales para marcas. Del guion a los subtítulos, mantengo una línea editorial clara y visuales coherentes con la identidad de la marca.', 'I come up with ideas, script, shoot, edit and design: Reels, TikToks, carousels and visuals for brands. From script to subtitles, I keep a clear editorial line and visuals consistent with the brand identity.'),
        tools: ['ps', 'ai', 'claude', 'capcut', 'notion'], chips: [T('Montage vidéo', 'Edición de vídeo', 'Video editing'), T('Sous-titrage', 'Subtitulado', 'Subtitling'), T('Scénarisation', 'Guion', 'Scriptwriting')] },
    ],
  },
  work: {
    eyebrow: T('Réalisations', 'Realizaciones', 'Selected work'),
    title: [T('Des projets réels,', 'Proyectos reales,', 'Real projects,'), T('du réseau à la marque.', 'de la red a la marca.', 'from network to brand.')],
    filters: [['all', T('Tout', 'Todo', 'All')], ['web', T('Web & SaaS', 'Web y SaaS', 'Web & SaaS')], ['design', T('Design', 'Diseño', 'Design')], ['it', T('IT & Réseaux', 'IT y Redes', 'IT & Networks')], ['ia', T('IA & Produits', 'IA y Productos', 'AI & Products')]],
    client: T('travail pour client', 'trabajo para cliente', 'client work'),
    status: { confidential: T('Analyse confidentielle', 'Análisis confidencial', 'Confidential analysis'), live: T('En ligne', 'En línea', 'Live'), dev: T('En développement', 'En desarrollo', 'In development'), proposal: T('Proposition', 'Propuesta', 'Pitch') },
    tools: T('Outils', 'Herramientas', 'Tools'), open: T('Voir le projet', 'Ver el proyecto', 'View project'), close: T('Fermer', 'Cerrar', 'Close'),
  },
  content: {
    eyebrow: T('Création de contenu', 'Creación de contenido', 'Content creation'),
    title: [T('Vidéo, visuels', 'Vídeo, visuales', 'Video, visuals'), T('et réseaux sociaux.', 'y redes sociales.', 'and social media.')],
    sub: T('Du Reel au carrousel, tourné, monté et designé par moi. Contenus en espagnol et en français. D’autres vidéos sont sur mes profils TikTok.', 'Del Reel al carrusel, grabado, montado y diseñado por mí. Contenidos en español y en francés. Hay muchos más vídeos en mis perfiles de TikTok.', 'From Reel to carousel, shot, edited and designed by me. Content in Spanish and French. More videos live on my TikTok profiles.'),
    tabs: [['video', T('Vidéo', 'Vídeo', 'Video')], ['brand', T('Marques', 'Marcas', 'Brands')], ['posts', T('Posts', 'Posts', 'Posts')], ['carousels', T('Carrousels', 'Carruseles', 'Carousels')]],
    clientWork: T('Travail pour client', 'Trabajo para cliente', 'Client work'),
    play: T('Lire la vidéo', 'Reproducir', 'Play video'),
    langNote: T('ES = en espagnol · FR = en français', 'ES = en español · FR = en francés', 'ES = Spanish · FR = French'),
    carouselNote: T('Carrousel en français · cliquez ou glissez pour avancer', 'Carrusel en francés · haz clic o desliza para avanzar', 'Carousel in French · click or swipe to move on'),
    slides: T('slides', 'slides', 'slides'),
    count: { video: T('vidéos', 'vídeos', 'videos'), img: T('visuels', 'visuales', 'visuals'), slides: T('slides', 'slides', 'slides') },
    series: {
      BossMama: T('Reels pour une marque (travail pour client)', 'Reels para marca (trabajo para cliente)', 'Brand Reels (client work)'),
      'Cápsulas TikTok': T('Capsules éducatives et créativité', 'Cápsulas educativas y creatividad', 'Educational capsules and creativity'),
      TikTok: T('Marque personnelle et design', 'Marca personal y diseño', 'Personal brand and design'),
      'Reels y demos': T('Reels, démos produit et showreel', 'Reels, demos de producto y showreel', 'Reels, product demos and showreel'),
    },
    kinds: { Logo: T('Logos', 'Logotipos', 'Logos'), Flyers: T('Flyers', 'Flyers y paneles', 'Flyers'), Affiches: T('Affiches', 'Carteles', 'Posters'), Mockups: T('Mockups', 'Mockups', 'Mockups'), 'Bannière YouTube': T('Bannière YouTube', 'Banner YouTube', 'YouTube banner'), Posts: T('Posts', 'Posts', 'Posts'), 'Catálogo': T('Catalogue', 'Catálogo', 'Catalogue') },
    postGroups: { Facebook: T('Facebook & LinkedIn', 'Facebook y LinkedIn', 'Facebook & LinkedIn'), Visuels: T('Visuels', 'Visuales', 'Visuals') },
  },
  about: {
    eyebrow: T('Pourquoi moi ?', '¿Por qué yo?', 'Why me?'),
    title: [T('Le terrain, l’écran', 'El terreno, la pantalla', 'The field, the screen'), T('et la marque.', 'y la marca.', 'and the brand.')],
    intro: [
      T('J’aide les organisations de Malabo à fonctionner avec une informatique fiable et des outils numériques simples.', 'Ayudo a las organizaciones de Malabo a funcionar con una informática fiable y herramientas digitales simples.', 'I help organisations in Malabo run on reliable IT and simple digital tools.'),
    ],
    reasons: [
      { n: '01', t: T('Une seule personne, du câble à la marque', 'Una sola persona, del cable a la marca', 'One person, from cable to brand'), d: T('J’installe le réseau, dessine l’identité et lance le site : moins d’intermédiaires, plus de cohérence.', 'Instalo la red, diseño la identidad y lanzo el sitio: menos intermediarios, más coherencia.', 'I install the network, design the identity and launch the site: fewer middlemen, more consistency.') },
      { n: '02', t: T('Rodé aux exigences institutionnelles', 'Curtido en exigencias institucionales', 'Used to institutional standards'), d: T('De 2022 à mars 2026, technicien informatique chez UPLINKS : agences des Nations unies, banques, rapports, étiquetage, délais tenus.', 'De 2022 a marzo de 2026, técnico informático en UPLINKS: agencias de la ONU, bancos, informes, etiquetado, plazos cumplidos.', 'From 2022 to March 2026, IT technician at UPLINKS: UN agencies, banks, reports, labelling, deadlines met.') },
      { n: '03', t: T('Je lance mes propres produits', 'Lanzo mis propios productos', 'I ship my own products'), d: T('WISHOP est en ligne, WIFARM en développement, Story Book Studio produit des livres : je vais de l’idée au produit publié.', 'WISHOP está en línea, WIFARM en desarrollo, Story Book Studio produce libros: voy de la idea al producto publicado.', 'WISHOP is live, WIFARM is in development, Story Book Studio produces books: I take ideas all the way to a published product.') },
      { n: '04', t: T('À l’aise en trois langues', 'Cómodo en tres idiomas', 'At ease in three languages'), d: T('Français natif, espagnol courant au quotidien professionnel, anglais technique : mes interfaces et contenus parlent la langue du client.', 'Francés nativo, español fluido en el día a día profesional, inglés técnico: mis interfaces y contenidos hablan el idioma del cliente.', 'Native French, fluent Spanish in daily professional use, technical English: my interfaces and content speak the client’s language.') },
    ],
    pathTitle: T('Mon chemin', 'Mi camino', 'My path'),
    path: [
      ['2017', T('BTS génie électrique et informatique', 'BTS ingeniería eléctrica e informática', 'BTS electrical & computer engineering'), 'IUSS, Yaoundé'],
      ['2018', T('Licence pro. génie électrique et informatique', 'Grado prof. ingeniería eléctrica e informática', 'Professional Bachelor, electrical & computer eng.'), T('homologuée MECET', 'homologado MECET', 'MECET recognised')],
      ['2020', T('Master pro. génie thermique', 'Máster prof. ingeniería térmica', 'Professional Master, thermal engineering'), 'ENSAI, Ngaoundéré'],
      ['2022', T('Technicien informatique', 'Técnico informático', 'IT technician'), 'UPLINKS, Malabo'],
      ['2026', T('Williams Informatic', 'Williams Informatic', 'Williams Informatic'), T('consultant IT & designer, puis technicien indépendant', 'consultor IT y diseñador, luego técnico independiente', 'IT consultant & designer, then independent technician')],
    ],
    langs: T('Langues', 'Idiomas', 'Languages'),
    langList: [T('Français · natif', 'Francés · nativo', 'French · native'), T('Español · courant', 'Español · fluido', 'Spanish · fluent'), T('English · technique', 'English · técnico', 'English · technical')],
  },
  contact: {
    eyebrow: T('Contact', 'Contacto', 'Contact'),
    title: [T('Parlons de', 'Hablemos de', 'Let’s talk about'), T('votre projet.', 'tu proyecto.', 'your project.')],
    sub: T('Une marque, un site, un réseau à installer, du contenu à produire : dites-moi ce dont vous avez besoin, je réponds vite.', 'Una marca, un sitio, una red por instalar, contenido por producir: cuéntame qué necesitas y respondo rápido.', 'A brand, a site, a network to install, content to produce: tell me what you need and I’ll reply fast.'),
    name: T('Votre nom', 'Tu nombre', 'Your name'), mail: T('Votre e-mail', 'Tu email', 'Your email'), msg: T('Votre message', 'Tu mensaje', 'Your message'),
    send: T('Envoyer', 'Enviar', 'Send'), sending: T('Envoi…', 'Enviando…', 'Sending…'),
    ok: T('Merci ! Message envoyé, je reviens vers vous vite.', '¡Gracias! Mensaje enviado, te respondo pronto.', 'Thanks! Message sent, I’ll get back to you soon.'),
    ko: T('Envoi impossible. Écrivez-moi directement par e-mail ou WhatsApp.', 'No se pudo enviar. Escríbeme directamente por email o WhatsApp.', 'Could not send. Please write to me directly by email or WhatsApp.'),
    wa: T('Écrire sur WhatsApp', 'Escribir por WhatsApp', 'Message on WhatsApp'),
    find: T('Me retrouver', 'Encuéntrame', 'Find me'),
  },
  footer: T('Conçu et développé par Williams Biamou · Malabo', 'Diseñado y desarrollado por Williams Biamou · Malabo', 'Designed and built by Williams Biamou · Malabo'),
  top: T('Haut de page', 'Subir', 'Back to top'),
};

export const EXPERIENCES = [
  { when: T('Août 2026 →', 'Ago. 2026 →', 'Aug 2026 →'), role: T('Technicien informatique indépendant', 'Técnico informático independiente', 'Independent IT technician'), org: 'Williams Informatic', d: T('Prestations IT facturées en direct pour la BDEAC, bureau de Malabo.', 'Servicios IT facturados directamente a la BDEAC, oficina de Malabo.', 'IT services invoiced directly to BDEAC, Malabo office.') },
  { when: T('Mars 2026 →', 'Mar. 2026 →', 'Mar 2026 →'), role: T('Consultant IT & designer freelance', 'Consultor IT y diseñador freelance', 'Freelance IT consultant & designer'), org: T('Indépendant', 'Independiente', 'Independent'), d: T('Identités de marque, sites, SaaS et audits pour des clients à Malabo et à distance.', 'Identidades de marca, sitios, SaaS y auditorías para clientes en Malabo y en remoto.', 'Brand identities, websites, SaaS and audits for clients in Malabo and remote.') },
  { when: T('Nov. 2022 – mars 2026', 'Nov. 2022 – mar. 2026', 'Nov 2022 – Mar 2026'), role: T('Technicien informatique', 'Técnico informático', 'IT technician'), org: 'UPLINKS G.E., Malabo', d: T('Salarié d’UPLINKS : interventions pour le compte de l’entreprise chez ses clients, institutions et banques (réseaux, serveurs, Wi-Fi, imprimantes, contrôle d’accès).', 'Empleado de UPLINKS: intervenciones por cuenta de la empresa en sus clientes, instituciones y bancos (redes, servidores, Wi-Fi, impresoras, control de acceso).', 'UPLINKS employee: on-site work on behalf of the company for its clients, institutions and banks (networks, servers, Wi-Fi, printers, access control).') },
  { when: T('Oct. 2021 – juil. 2022', 'Oct. 2021 – jul. 2022', 'Oct 2021 – Jul 2022'), role: T('Assistant manager de chantiers', 'Asistente de gestión de obras', 'Site assistant manager'), org: 'House Decor, Yaoundé', d: T('Encadrement des travaux sur site, approvisionnement, respect des délais.', 'Supervisión de obras, aprovisionamiento y cumplimiento de plazos.', 'On-site supervision, procurement and deadline management.') },
  { when: T('Juil. 2017 – janv. 2018', 'Jul. 2017 – ene. 2018', 'Jul 2017 – Jan 2018'), role: T('Agent technique d’exploitation', 'Agente técnico de explotación', 'Operations technical agent'), org: 'NTFoods SARL, Yaoundé', d: T('Exploitation d’une unité de transformation de céréales infantiles.', 'Explotación de una unidad de transformación de cereales infantiles.', 'Operation of a baby-cereal processing unit.') },
];

export const EDUCATION = [
  ['2020', T('Master professionnel en génie thermique', 'Máster profesional en ingeniería térmica', 'Professional Master in thermal engineering'), 'ENSAI, Ngaoundéré'],
  ['2018', T('Licence pro. génie électrique et informatique', 'Grado profesional en ingeniería eléctrica e informática', 'Professional Bachelor in electrical & computer engineering'), T('IUSS, Yaoundé · homologuée MECET', 'IUSS, Yaundé · homologado MECET', 'IUSS, Yaoundé · MECET recognised')],
  ['2017', T('BTS génie électrique et informatique', 'BTS ingeniería eléctrica e informática', 'BTS electrical & computer engineering'), 'IUSS, Yaoundé'],
];

export const SKILLS = [
  [T('IT & Réseaux', 'IT y Redes', 'IT & Networks'), [T('Câblage structuré & baies', 'Cableado estructurado y racks', 'Structured cabling & racks'), T('Wi-Fi & liaisons radio', 'Wi-Fi y radioenlaces', 'Wi-Fi & radio links'), T('Windows, Office, antivirus, sauvegardes', 'Windows, Office, antivirus, copias de seguridad', 'Windows, Office, antivirus, backups'), T('Contrôle d’accès & sécurité', 'Control de acceso y seguridad', 'Access control & security'), T('Maintenance du parc informatique', 'Mantenimiento del parque informático', 'IT fleet maintenance')]],
  [T('Design', 'Diseño', 'Design'), [T('Identité visuelle & logos', 'Identidad visual y logotipos', 'Visual identity & logos'), T('Catalogues, flyers, kakémonos', 'Catálogos, flyers, roll-ups', 'Catalogues, flyers, roll-ups'), T('Maquettes UI / UX (Figma)', 'Maquetas UI / UX (Figma)', 'UI / UX mockups (Figma)'), T('Mise en page InDesign', 'Maquetación en InDesign', 'InDesign layout'), T('Vidéo courte & motion', 'Vídeo corto y motion', 'Short video & motion')]],
  [T('Web & IA', 'Web e IA', 'Web & AI'), [T('React, Tailwind, GSAP', 'React, Tailwind, GSAP', 'React, Tailwind, GSAP'), T('Next.js, Supabase, PostgreSQL', 'Next.js, Supabase, PostgreSQL', 'Next.js, Supabase, PostgreSQL'), T('Vercel & GitHub', 'Vercel y GitHub', 'Vercel & GitHub'), T('Claude Code, ChatGPT, Gemini', 'Claude Code, ChatGPT, Gemini', 'Claude Code, ChatGPT, Gemini'), T('Agents & automatisation', 'Agentes y automatización', 'Agents & automation')]],
];

export const MARQUEE = {
  fr: ['Identité de marque', 'SaaS & Web', 'Réseaux & Serveurs', 'Contenu vidéo', 'IA appliquée', 'UI / UX'],
  es: ['Identidad de marca', 'SaaS y Web', 'Redes y Servidores', 'Contenido en vídeo', 'IA aplicada', 'UI / UX'],
  en: ['Brand identity', 'SaaS & Web', 'Networks & Servers', 'Video content', 'Applied AI', 'UI / UX'],
};
