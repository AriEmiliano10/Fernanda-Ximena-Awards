
const EVENT_DETAILS = {
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

const GUEST_STATUS = {
  CONFIRMED: 'CONFIRMADO',
  PENDING: 'PENDIENTE',
  CHECKED_IN: 'DENTRO'
};

const DRESSCODE_CATEGORIES = [
  {
    id: 'classics',
    title: 'Clásicos',
    description: 'La elegancia atemporal de la era dorada de Hollywood.',
    coverImage: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&q=80',
    examples: [
      // 👇 PEGA TUS LINKS DE IMÁGENES AQUÍ - Categoría CLÁSICOS
      { character: 'Joker', movie: 'The Dark Knight (2008)', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1teaNYgLoGPGjy4rf2LCagbSIOl9c21rGTA&s' },
      { character: 'Catwoman', movie: 'Batman Returns', image: 'https://live.staticflickr.com/6118/6289608444_f1f8e77dff.jpg' },
      { character: 'Jack Sparrow', movie: 'Piratas del Caribe', image: 'https://i.pinimg.com/736x/9d/19/34/9d1934ee52b431964e39a68b08059be3.jpg' },
      { character: 'Hermione Granger', movie: 'Harry Potter', image: 'https://upload.wikimedia.org/wikipedia/en/d/d3/Hermione_Granger_poster.jpg' },
      { character: 'Katniss Everdeen', movie: 'Los Juegos del Hambre', image: 'https://industrialscripts.com/wp-content/uploads/2024/01/jennifer-lawrence-hunger-games-060923-1deac39eed604acc9a8d43d42c4f8a4d.jpg' },
      { character: 'Edward Scissorhands', movie: 'El Joven Manos de Tijera', image: 'https://smithsverdict.com/wp-content/uploads/2013/02/johnny-depp-as-edward-scissorhands-1990.jpeg' }
    ]
  },
  {
    id: 'modern',
    title: 'Modernos',
    description: 'Iconos contemporáneos que han marcado la última década.',
    coverImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80',
    examples: [
      // 👇 PEGA TUS LINKS DE IMÁGENES AQUÍ - Categoría MODERNOS
      { character: 'Barbie', movie: 'Barbie (2023)', image: 'https://images.immediate.co.uk/production/volatile/sites/3/2023/07/rev-1-BAR-00362HighResJPEG-161c750-bf849b2-e1690197084134.jpg?quality=90&resize=980,654' },
      { character: 'Ken', movie: 'Barbie (2023)', image: 'https://midias.correiobraziliense.com.br/_midias/jpg/2023/10/14/640x853/1_ryan_gosling_ken_praia_divulgacao_warnerbros-30159790.jpg?20231014161955?20231014161955' },
      { character: 'Wednesday Addams', movie: 'Wednesday (Netflix)', image: 'https://people.com/thmb/U7ycvbgO1vmgwJtTSuPp0hK0qGk=/4000x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(489x329:491x331)/jenna-ortega-wednesday-netflix-1-a19921eed269457bb202cefa33a1c268.jpg' },
      { character: 'Harley Quinn', movie: 'Escuadrón Suicida', image: 'https://i.guim.co.uk/img/media/70336afc112f7ec7d2e7fb67273f5bfb02791235/0_209_1202_721/master/1202.jpg?width=1200&quality=85&auto=format&fit=max&s=3602c3bae56b7e13200acb62cd43fbc2' },
      { character: 'Miguel Rivera', movie: 'Coco (2017)', image: 'https://i.pinimg.com/736x/45/bc/0b/45bc0bf90425ef8f1ed7aacf3f19bf09.jpg' },
      { character: 'Eleven', movie: 'Stranger Things', image: 'https://images.sipse.com/mcpgd4oVFrsnGfe87kaYX070h1c=/856x748/smart/filters:format(webp)/imgs/082016/3108160222b854f.jpg' }
    ]
  },
  {
    id: 'scifi',
    title: 'Sci-Fi',
    description: 'Viajeros del tiempo, rebeldes galácticos y seres cibernéticos.',
    coverImage: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&q=80',
    examples: [
      // 👇 PEGA TUS LINKS DE IMÁGENES AQUÍ - Categoría SCI-FI
      { character: 'Spider-Man', movie: 'Spider-Man: No Way Home', image: 'https://s.abcnews.com/images/GMA/spiderman-farfromhome-ht-ml-190703_hpMain_2_16x9_992.jpg' },
      { character: 'Iron Man', movie: 'Avengers', image: 'https://m.media-amazon.com/images/I/61OGarZOViL._AC_SL1500_.jpg' },
      { character: 'Black Widow', movie: 'Avengers', image: 'https://i.pinimg.com/736x/e7/88/5e/e7885eba2b06a396a7224f17c62c3595.jpg' },
      { character: 'Rey', movie: 'Star Wars: El Despertar de la Fuerza', image: 'https://preview.redd.it/daisy-ridley-rey-palpatine-skywalker-star-wars-episode-vii-v0-pklgcax2fh3d1.jpg?width=640&crop=smart&auto=webp&s=1e050368e1f394cdf76a2aebc973c7301449098d' },
      { character: 'Stormtrooper', movie: 'Star Wars', image: 'https://i.etsystatic.com/20013954/r/il/fed59b/4462224079/il_570xN.4462224079_lai0.jpg' },
      { character: 'Rocket Raccoon', movie: 'Guardianes de la Galaxia', image: 'https://www.bostoncostume.com/images/products/13907.jpg' }
    ]
  },
  {
    id: 'fantasy',
    title: 'Fantasía',
    description: 'Magia, capas, hechizos y reinos lejanos.',
    coverImage: 'https://images.unsplash.com/photo-1598449356475-b9f71db7d847?auto=format&fit=crop&q=80',
    examples: [
      // 👇 PEGA TUS LINKS DE IMÁGENES AQUÍ - Categoría FANTASÍA
      { character: 'Harry Potter', movie: 'Harry Potter', image: 'https://www.hola.com/horizon/original_aspect_ratio/ffb9579fdfa0-dla02094016.jpg' },
      { character: 'Draco Malfoy', movie: 'Harry Potter', image: 'https://media.harrypotterfanzone.com/draco-malfoy-order-of-the-phoenix-portrait-5-1050x0-c-default.jpg' },
      { character: 'Elphaba', movie: 'Wicked', image: 'https://scontent.fmex22-1.fna.fbcdn.net/v/t51.75761-15/468129985_18481658470012485_1344803791519103282_n.jpg?stp=dst-jpg_s640x640_tt6&_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_ohc=8TfTHInXPssQ7kNvwEUS-5_&_nc_oc=Adn1lcUQg8PZUr_mE8bdn0c_wrrtbBxNyrHlNPZhNCTIA8uCNxXwufh9BTPA9SdzCkXb8QNCRI5xhi0GkN0IMMfY&_nc_zt=23&_nc_ht=scontent.fmex22-1.fna&_nc_gid=NwlMxsILPZG8swG7S0qFxw&oh=00_AfnT9RFJpaH-YfECGkIWhKod-oAXRxlJz9QVnglAfebQWw&oe=6955873C' },
      { character: 'Glinda (RESERVADO)', movie: 'Wicked', image: 'https://preview.redd.it/fanart-of-glinda-v0-7dljvb02b5ce1.jpeg?width=640&crop=smart&auto=webp&s=add5353292f40c36bb2c5876253dc0d49ae35aca' },
      { character: 'Doctor Strange', movie: 'Doctor Strange', image: 'https://ew.com/thmb/sTZOW635fD2bJkBprx3ANAiYtAk=/2000x0/filters:no_upscale():max_bytes(150000):strip_icc()/dr-strange-285176907f6c45f7a850fa0b02828f89.jpg' },
      { character: 'Loki', movie: 'Thor / Loki', image: 'https://wallpapers.com/images/hd/loki-1080-x-1920-picture-b1svc54s16bspe1t.jpg' }
    ]
  }
];

const MOCK_GUESTS = [
  { id: '1', name: 'Julian Casablancas', character: 'The Joker', status: GUEST_STATUS.CONFIRMED, registrationNumber: '001', qrCode: 'QR_001' },
  { id: '2', name: 'Mia Wallace', character: 'Pulp Fiction', status: GUEST_STATUS.CHECKED_IN, registrationNumber: '002', qrCode: 'QR_002' }
];

const INITIAL_AWARD_CATEGORIES = [
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

const SCHEDULE = [
  { time: '13:00', activity: 'Alfombra Roja', description: 'Recepción estelar y sesión fotográfica oficial.' },
  { time: '14:30', activity: 'Banquete de Estrellas', description: 'Comida formal y brindis de apertura.' },
  { time: '16:00', activity: 'Apertura de Votaciones', description: 'Vota por tus favoritos en tiempo real.' },
  { time: '18:30', activity: 'The Awards Ceremony', description: 'La gran entrega de estatuillas.' },
  { time: '20:00', activity: 'Cierre de la Gala', description: 'Despedida oficial y fiesta de cierre.' }
];

