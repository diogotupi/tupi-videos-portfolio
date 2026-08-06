export const SITE_URL = (
  import.meta.env.VITE_SITE_URL || 'https://tupi.video'
).replace(/\/$/, '');

export const LOCALES = ['en', 'es', 'pt'];

export const messages = {
  en: {
    htmlLang: 'en',
    localeOg: 'en_US',
    title: 'TUPI — Remote Video Editor & Filmmaker',
    description:
      'Remote digital nomad — filmmaker, video editor and motion designer. 12+ years crafting reels, institutional films, docs and music videos.',
    keywords:
      'remote video editor, digital nomad editor, freelance filmmaker, motion designer, reel editor, TUPI, Diogo Tupinambá',
    skip: 'Skip to content',
    menu: 'Menu',
    navAbout: 'About',
    navWork: 'Work',
    navFaq: 'FAQ',
    navContact: 'Contact',
    heroLabel: 'Introduction',
    heroH1:
      'TUPI — remote video editor, filmmaker and motion designer',
    heroRole: 'filmmaker · editor · motion designer',
    heroCta: 'View work',
    aboutLabel: 'About',
    aboutTitle: 'Who I am',
    aboutHi: 'Hey, how’s it going?',
    aboutP1Before: 'My name is Diogo Tupinambá — you can call me Tupi. I’m a ',
    aboutP1Strong: 'producer, filmmaker, video editor and motion designer',
    aboutP1After:
      ' with about 12 years of experience. I help you communicate your idea professionally — for social, YouTube, campaigns or any other project. I work remotely as a digital nomad.',
    aboutP2:
      'Browse the portfolio below. If you like what you see, hit WhatsApp and let’s talk.',
    worksLabel: 'Portfolio',
    worksTitle: 'Selected work',
    faqLabel: 'FAQ',
    faqTitle: 'Frequently asked questions',
    faqQ1: 'What does TUPI do?',
    faqA1:
      'Production, filmmaking, video editing, reels and motion design — from social content to campaigns, YouTube and institutional projects.',
    faqQ2: 'Where do you work from?',
    faqA2:
      'I’m a remote digital nomad — I deliver projects online from wherever I am.',
    faqQ3: 'How do I get in touch?',
    faqA3:
      'WhatsApp on this site is the main channel for quotes and briefs.',
    contactLabel: 'Contact',
    contactTitle: 'Let’s talk',
    contactLede:
      'Liked the portfolio? Message me on WhatsApp and we’ll talk about your project.',
    waOpen: 'Open WhatsApp',
    lightboxLabel: 'Work player',
    lightboxClose: 'Close',
    lightboxEmpty: 'Video coming soon.',
    lightboxEmbedTitle: 'Work player',
    clientPrefix: 'Client: ',
    rolesPrefix: 'What I did: ',
    langSwitcher: 'Language',
    // work tags
    tagReels: 'Reels',
    tagTeaser: 'Teaser',
    tagMusic: 'Music video',
    tagReality: 'Reality show',
    tagInstitutional: 'Institutional',
    tagDoc: 'Documentary',
    // roles
    rolesMarcela: 'Production | Shooting | Photography | Editing | Motion Design',
    rolesJoao: 'Production | Shooting | Photography | Editing | Motion Design',
    rolesBoost: 'Script | Editing | Motion Design',
    rolesPinup: 'Production | Co-Direction | Editing | Soundtrack',
    rolesHate: 'Production | Editing | Co-Direction | Color Grade',
    rolesCeo: 'Executive Production | Motion | Editing (7 of 10 episodes) | Audio Mix',
    rolesPetro: 'Motion Design',
    rolesRio: 'Art Direction and Motion insert animation',
    altMarcela: 'Thumbnail for Nutri Marcela Tupi reel',
    altJoao: 'Thumbnail for João Markos Advogado reel',
    altBoost: 'Thumbnail for Boost Finance reel',
    altCeo: 'Thumbnail for CEO Black Ops reality series',
    schemaJobTitle: 'Filmmaker, video editor and motion designer',
    schemaPersonDesc:
      'Producer, filmmaker, video editor and motion designer with about 12 years of experience. Remote digital nomad.',
    schemaSiteDesc:
      'Portfolio of Diogo Tupinambá (TUPI) — freelance filmmaker, video editor and motion designer.',
  },
  es: {
    htmlLang: 'es',
    localeOg: 'es_ES',
    title: 'TUPI — Editor de video y filmmaker remoto',
    description:
      'Nómada digital remoto — filmmaker, editor de video y motion designer. Más de 12 años en reels, institucionales, docs y videoclips.',
    keywords:
      'editor de video remoto, nómada digital, filmmaker freelance, motion designer, editor de reels, TUPI, Diogo Tupinambá',
    skip: 'Saltar al contenido',
    menu: 'Menú',
    navAbout: 'Sobre mí',
    navWork: 'Trabajos',
    navFaq: 'FAQ',
    navContact: 'Contacto',
    heroLabel: 'Presentación',
    heroH1:
      'TUPI — editor de video, filmmaker y motion designer remoto',
    heroRole: 'filmmaker · editor · motion designer',
    heroCta: 'Ver trabajos',
    aboutLabel: 'Sobre mí',
    aboutTitle: 'Quién soy',
    aboutHi: '¡Hola! ¿Todo bien?',
    aboutP1Before: 'Me llamo Diogo Tupinambá — puedes decirme Tupi. Soy ',
    aboutP1Strong: 'productor, filmmaker, editor de video y motion designer',
    aboutP1After:
      ' con unos 12 años de experiencia. Te ayudo a comunicar tu idea con nivel profesional — redes, YouTube, campañas u otros proyectos. Trabajo remoto como nómada digital.',
    aboutP2:
      'Mira el portafolio abajo. Si te gusta, escríbeme por WhatsApp y hablamos.',
    worksLabel: 'Portafolio',
    worksTitle: 'Trabajos',
    faqLabel: 'FAQ',
    faqTitle: 'Preguntas frecuentes',
    faqQ1: '¿Qué hace TUPI?',
    faqA1:
      'Producción, filmmaking, edición de video, reels y motion design — de redes a campañas, YouTube y proyectos institucionales.',
    faqQ2: '¿Desde dónde trabajas?',
    faqA2:
      'Soy nómada digital remoto — entrego proyectos online desde donde esté.',
    faqQ3: '¿Cómo contactarte?',
    faqA3:
      'WhatsApp en este sitio es el canal principal para presupuestos y briefs.',
    contactLabel: 'Contacto',
    contactTitle: 'Hablemos',
    contactLede:
      '¿Te gustó el portafolio? Escríbeme por WhatsApp y hablamos de tu proyecto.',
    waOpen: 'Abrir WhatsApp',
    lightboxLabel: 'Reproductor del trabajo',
    lightboxClose: 'Cerrar',
    lightboxEmpty: 'Video pronto.',
    lightboxEmbedTitle: 'Reproductor del trabajo',
    clientPrefix: 'Cliente: ',
    rolesPrefix: 'Lo que hice: ',
    langSwitcher: 'Idioma',
    tagReels: 'Reels',
    tagTeaser: 'Teaser',
    tagMusic: 'Videoclip',
    tagReality: 'Reality',
    tagInstitutional: 'Institucional',
    tagDoc: 'Documental',
    rolesMarcela: 'Producción | Rodaje | Fotografía | Edición | Motion Design',
    rolesJoao: 'Producción | Rodaje | Fotografía | Edición | Motion Design',
    rolesBoost: 'Guion | Edición | Motion Design',
    rolesPinup: 'Producción | Codirección | Edición | Banda sonora',
    rolesHate: 'Producción | Edición | Codirección | Color Grade',
    rolesCeo: 'Producción ejecutiva | Motion | Edición (7 de 10 episodios) | Mezcla de audio',
    rolesPetro: 'Motion Design',
    rolesRio: 'Dirección de arte y animación de inserciones de Motion',
    altMarcela: 'Miniatura del reel Nutri Marcela Tupi',
    altJoao: 'Miniatura del reel João Markos Advogado',
    altBoost: 'Miniatura del reel Boost Finance',
    altCeo: 'Miniatura del reality CEO Black Ops',
    schemaJobTitle: 'Filmmaker, editor de video y motion designer',
    schemaPersonDesc:
      'Productor, filmmaker, editor de video y motion designer con unos 12 años de experiencia. Nómada digital remoto.',
    schemaSiteDesc:
      'Portafolio de Diogo Tupinambá (TUPI) — filmmaker, editor de video y motion designer freelance.',
  },
  pt: {
    htmlLang: 'pt-BR',
    localeOg: 'pt_BR',
    title: 'TUPI — Editor de vídeo e filmmaker remoto',
    description:
      'Nômade digital remoto — filmmaker, editor de vídeo e motion designer. 12+ anos em reels, institucionais, docs e videoclipes.',
    keywords:
      'editor de vídeo remoto, nômade digital, filmmaker freelance, motion designer, editor de reels, TUPI, Diogo Tupinambá',
    skip: 'Pular para o conteúdo',
    menu: 'Menu',
    navAbout: 'Sobre',
    navWork: 'Trabalhos',
    navFaq: 'FAQ',
    navContact: 'Contato',
    heroLabel: 'Apresentação',
    heroH1:
      'TUPI — editor de vídeo, filmmaker e motion designer remoto',
    heroRole: 'filmmaker · editor · motion designer',
    heroCta: 'Ver trabalhos',
    aboutLabel: 'Sobre',
    aboutTitle: 'Quem sou',
    aboutHi: 'E aí, tudo bem?',
    aboutP1Before: 'Meu nome é Diogo Tupinambá — pode me chamar de Tupi. Sou ',
    aboutP1Strong: 'produtor, filmmaker, editor de vídeo e motion designer',
    aboutP1After:
      ', com cerca de 12 anos de experiência. Meu objetivo é ajudar você a comunicar sua ideia de forma profissional — redes, YouTube, campanhas ou qualquer outro projeto. Trabalho remoto como nômade digital.',
    aboutP2:
      'Dá uma olhada no portfólio aqui embaixo. Se curtir o que viu, é só clicar no WhatsApp que a gente conversa.',
    worksLabel: 'Portfolio',
    worksTitle: 'Trabalhos',
    faqLabel: 'FAQ',
    faqTitle: 'Perguntas frequentes',
    faqQ1: 'O que o TUPI faz?',
    faqA1:
      'Produção, filmmaking, edição de vídeo, reels e motion design — de redes sociais a campanhas, YouTube e projetos institucionais.',
    faqQ2: 'De onde você atende?',
    faqA2:
      'Sou nômade digital remoto — entrego projetos online de onde eu estiver.',
    faqQ3: 'Como entrar em contato?',
    faqA3:
      'O WhatsApp neste site é o canal principal para orçamentos e briefings.',
    contactLabel: 'Contato',
    contactTitle: 'Vamos conversar',
    contactLede:
      'Curtiu o portfólio? Me chama no WhatsApp e a gente fala do seu projeto.',
    waOpen: 'Abrir WhatsApp',
    lightboxLabel: 'Player de trabalho',
    lightboxClose: 'Fechar',
    lightboxEmpty: 'Vídeo em breve.',
    lightboxEmbedTitle: 'Player do trabalho',
    clientPrefix: 'Cliente: ',
    rolesPrefix: 'O que eu fiz: ',
    langSwitcher: 'Idioma',
    tagReels: 'Reels',
    tagTeaser: 'Teaser',
    tagMusic: 'Music video',
    tagReality: 'Reality show',
    tagInstitutional: 'Institucional',
    tagDoc: 'Documentário',
    rolesMarcela: 'Produção | Gravação | Fotografia | Edição | Motion Design',
    rolesJoao: 'Produção | Gravação | Fotografia | Edição | Motion Design',
    rolesBoost: 'Roteiro | Edição | Motion Design',
    rolesPinup: 'Produção | Co-Direção | Edição | Trilha Sonora',
    rolesHate: 'Produção | Edição | Co-Direção | Color Grade',
    rolesCeo: 'Produção Executiva | Motion | Edição (7 de 10 episódios) | Mixagem de Áudio',
    rolesPetro: 'Motion Design',
    rolesRio: 'Direção Artística e Animação das inserções de Motion',
    altMarcela: 'Thumbnail do reel Nutri Marcela Tupi',
    altJoao: 'Thumbnail do reel João Markos Advogado',
    altBoost: 'Thumbnail do reel Boost Finance',
    altCeo: 'Thumbnail do reality CEO Black Ops',
    schemaJobTitle: 'Filmmaker, editor de vídeo e motion designer',
    schemaPersonDesc:
      'Produtor, filmmaker, editor de vídeo e motion designer com cerca de 12 anos de experiência. Nômade digital remoto.',
    schemaSiteDesc:
      'Portfólio de Diogo Tupinambá (TUPI) — filmmaker, editor de vídeo e motion designer freelance.',
  },
};

export function t(locale, key) {
  return messages[locale]?.[key] ?? messages.en[key] ?? key;
}

export function pathForLocale(locale) {
  if (locale === 'en') return '/';
  return `/${locale}/`;
}

export function detectLocale() {
  if (typeof window !== 'undefined' && window.__LOCALE__) {
    return window.__LOCALE__;
  }
  if (typeof location === 'undefined') return 'en';
  const path = location.pathname.replace(/\/+$/, '') || '/';
  if (path === '/es' || path.startsWith('/es/')) return 'es';
  if (path === '/pt' || path.startsWith('/pt/')) return 'pt';
  return 'en';
}
