
export const EVENT_DETAILS = {
  NAME: "The Fernanda Ximena Awards",
  HOST: "HOLLYWOOD NIGHT GALA",
  SUBTITLE: "Edición Especial 2026",
  DATE: "Sábado 24 de Enero, 2026",
  TIME: "13:00 - 20:00 HRS",
  LOCATION: "Concert Hall",
  ADDRESS: "Calle Kansas 58, Nápoles, Benito Juárez, 03810 Ciudad de México, CDMX",
  MAP_URL: "https://maps.app.goo.gl/E9EEjp7LsZd89Tcs5?g_st=iw",
  DRESSCODE_QUOTE: "No es solo un disfraz, es una actuación.",
  TARGET_DATE: new Date('2026-01-24T13:00:00').getTime(),
  RESERVED_CHARACTER: "Glinda (Wicked)"
};

export const GUEST_STATUS = {
  CONFIRMED: 'CONFIRMADO',
  PENDING: 'PENDIENTE',
  CHECKED_IN: 'DENTRO'
};

export const DRESSCODE_CATEGORIES = [
  {
    id: 'classics',
    title: 'Clásicos',
    description: 'La elegancia atemporal de la era dorada de Hollywood.',
    coverImage: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&q=80',
    examples: [
      { character: 'Vito Corleone', movie: 'The Godfather', image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=600&auto=format&fit=crop' },
      { character: 'Holly Golightly', movie: 'Breakfast at Tiffany\'s', image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=600&auto=format&fit=crop' },
      { character: 'Charlie Chaplin', movie: 'The Tramp', image: 'https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?q=80&w=600&auto=format&fit=crop' },
      { character: 'Marilyn Monroe', movie: 'The Seven Year Itch', image: 'https://images.unsplash.com/photo-1561438774-1730ce2045be?q=80&w=600&auto=format&fit=crop' }
    ]
  },
  {
    id: 'modern',
    title: 'Modernos',
    description: 'Iconos contemporáneos que han marcado la última década.',
    coverImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80',
    examples: [
      { character: 'John Wick', movie: 'John Wick', image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=600&auto=format&fit=crop' },
      { character: 'Barbie', movie: 'Barbie', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=600&auto=format&fit=crop' },
      { character: 'Mia Wallace', movie: 'Pulp Fiction', image: 'https://images.unsplash.com/photo-1512310604669-443f467a11d9?q=80&w=600&auto=format&fit=crop' },
      { character: 'Oppenheimer', movie: 'Oppenheimer', image: 'https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?q=80&w=600&auto=format&fit=crop' }
    ]
  },
  {
    id: 'scifi',
    title: 'Sci-Fi',
    description: 'Viajeros del tiempo, rebeldes galácticos y seres cibernéticos.',
    coverImage: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&q=80',
    examples: [
      { character: 'Neo', movie: 'The Matrix', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop' },
      { character: 'Leeloo', movie: 'The Fifth Element', image: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=600&auto=format&fit=crop' },
      { character: 'Darth Vader', movie: 'Star Wars', image: 'https://images.unsplash.com/photo-1546561892-65bf811416b9?q=80&w=600&auto=format&fit=crop' },
      { character: 'Rick Deckard', movie: 'Blade Runner', image: 'https://images.unsplash.com/photo-1501432377862-3d0432b874ef?q=80&w=600&auto=format&fit=crop' }
    ]
  },
  {
    id: 'fantasy',
    title: 'Fantasía',
    description: 'Magia, capas, hechizos y reinos lejanos.',
    coverImage: 'https://images.unsplash.com/photo-1598449356475-b9f71db7d847?auto=format&fit=crop&q=80',
    examples: [
      { character: 'Harry Potter', movie: 'Harry Potter', image: 'https://images.unsplash.com/photo-1598153346810-860daa814c4b?q=80&w=600&auto=format&fit=crop' },
      { character: 'Maleficent', movie: 'Maleficent', image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=600&auto=format&fit=crop' },
      { character: 'Gandalf', movie: 'Lord of the Rings', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop' },
      { character: 'Glinda (RESERVADO)', movie: 'Wicked', image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=600&auto=format&fit=crop' }
    ]
  }
];

export const MOCK_GUESTS = [
  { id: '1', name: 'Julian Casablancas', character: 'The Joker', status: GUEST_STATUS.CONFIRMED, registrationNumber: '001', qrCode: 'QR_001' },
  { id: '2', name: 'Mia Wallace', character: 'Pulp Fiction', status: GUEST_STATUS.CHECKED_IN, registrationNumber: '002', qrCode: 'QR_002' }
];

export const INITIAL_AWARD_CATEGORIES = [
  {
    id: 'cat_1',
    name: 'Mejor Vestuario',
    icon: '👗',
    description: 'Enfocado en la calidad, detalle y fidelidad del diseño textil.',
    nominees: [
      { id: 'n1', name: 'Julian', character: 'The Joker', votes: 12, emoji: '🤡' },
      { id: 'n2', name: 'Glinda', character: 'Wicked', votes: 15, emoji: '✨' }
    ]
  },
  {
    id: 'cat_2',
    name: 'Mejor Personaje Protagónico',
    icon: '🎭',
    description: 'Premia la interpretación y el carisma del personaje elegido.',
    nominees: [
      { id: 'n4', name: 'Mia Wallace', character: 'Pulp Fiction', votes: 8, emoji: '🔫' }
    ]
  },
  {
      id: 'cat_3',
      name: 'Estrella de la Noche',
      icon: '⭐',
      description: 'El look más impactante, glamuroso y digno de una alfombra roja.',
      nominees: [
        { id: 'n9', name: 'Glinda', character: 'Wicked', votes: 25, emoji: '✨' }
      ]
  }
];

export const SCHEDULE = [
  { time: '13:00', activity: 'Alfombra Roja', description: 'Recepción estelar y sesión fotográfica oficial.' },
  { time: '14:30', activity: 'Banquete de Estrellas', description: 'Comida formal y brindis de apertura.' },
  { time: '16:00', activity: 'Apertura de Votaciones', description: 'Vota por tus favoritos en tiempo real.' },
  { time: '18:30', activity: 'The Awards Ceremony', description: 'La gran entrega de estatuillas.' },
  { time: '20:00', activity: 'Cierre de la Gala', description: 'Despedida oficial y fiesta de cierre.' }
];
