
import React from 'react';
import { AwardCategory, ScheduleItem, Guest, GuestStatus, DresscodeCategory } from './types';

// Add missing ADDRESS field used in index.tsx
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

export const DRESSCODE_CATEGORIES: DresscodeCategory[] = [
  {
    id: 'classics',
    title: 'Clásicos',
    description: 'La elegancia atemporal de la era dorada de Hollywood.',
    coverImage: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&q=80',
    examples: [
      // 👇 PEGA TUS LINKS DE IMÁGENES AQUÍ - Categoría CLÁSICOS
      { character: 'Audrey Hepburn', movie: 'Desayuno con Diamantes', image: 'https://tulink.com/imagen1.jpg' },
      { character: 'James Dean', movie: 'Rebelde sin Causa', image: 'https://tulink.com/imagen2.jpg' },
      { character: 'Marilyn Monroe', movie: 'La Tentación Vive Arriba', image: 'https://tulink.com/imagen3.jpg' },
      { character: 'Vito Corleone', movie: 'El Padrino', image: 'https://tulink.com/imagen4.jpg' },
      { character: 'Holly Golightly', movie: 'Breakfast at Tiffany\'s', image: 'https://tulink.com/imagen5.jpg' },
      { character: 'Charlie Chaplin', movie: 'El Vagabundo', image: 'https://tulink.com/imagen6.jpg' }
    ]
  },
  {
    id: 'modern',
    title: 'Modernos',
    description: 'Iconos contemporáneos que han marcado la última década.',
    coverImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80',
    examples: [
      // 👇 PEGA TUS LINKS DE IMÁGENES AQUÍ - Categoría MODERNOS
      { character: 'Barbie', movie: 'Barbie', image: 'https://tulink.com/imagen7.jpg' },
      { character: 'Ken', movie: 'Barbie', image: 'https://tulink.com/imagen8.jpg' },
      { character: 'Harley Quinn', movie: 'Escuadrón Suicida', image: 'https://tulink.com/imagen9.jpg' },
      { character: 'Wednesday Addams', movie: 'Wednesday', image: 'https://tulink.com/imagen10.jpg' },
      { character: 'Cruella de Vil', movie: 'Cruella', image: 'https://tulink.com/imagen11.jpg' },
      { character: 'Mia Wallace', movie: 'Pulp Fiction', image: 'https://tulink.com/imagen12.jpg' }
    ]
  },
  {
    id: 'scifi',
    title: 'Sci-Fi',
    description: 'Viajeros del tiempo, rebeldes galácticos y seres cibernéticos.',
    coverImage: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&q=80',
    examples: [
      // 👇 PEGA TUS LINKS DE IMÁGENES AQUÍ - Categoría SCI-FI
      { character: 'Neo', movie: 'The Matrix', image: 'https://tulink.com/imagen13.jpg' },
      { character: 'Trinity', movie: 'The Matrix', image: 'https://tulink.com/imagen14.jpg' },
      { character: 'Leia Organa', movie: 'Star Wars', image: 'https://tulink.com/imagen15.jpg' },
      { character: 'Darth Vader', movie: 'Star Wars', image: 'https://tulink.com/imagen16.jpg' },
      { character: 'Leeloo', movie: 'El Quinto Elemento', image: 'https://tulink.com/imagen17.jpg' },
      { character: 'Furiosa', movie: 'Mad Max', image: 'https://tulink.com/imagen18.jpg' }
    ]
  },
  {
    id: 'fantasy',
    title: 'Fantasía',
    description: 'Magia, capas, hechizos y reinos lejanos.',
    coverImage: 'https://images.unsplash.com/photo-1598449356475-b9f71db7d847?auto=format&fit=crop&q=80',
    examples: [
      // 👇 PEGA TUS LINKS DE IMÁGENES AQUÍ - Categoría FANTASÍA
      { character: 'Harry Potter', movie: 'Harry Potter', image: 'https://tulink.com/imagen19.jpg' },
      { character: 'Hermione Granger', movie: 'Harry Potter', image: 'https://tulink.com/imagen20.jpg' },
      { character: 'Elphaba', movie: 'Wicked', image: 'https://tulink.com/imagen21.jpg' },
      { character: 'Glinda (RESERVADO)', movie: 'Wicked', image: 'https://tulink.com/imagen22.jpg' },
      { character: 'Maleficent', movie: 'Maléfica', image: 'https://tulink.com/imagen23.jpg' },
      { character: 'Gandalf', movie: 'El Señor de los Anillos', image: 'https://tulink.com/imagen24.jpg' }
    ]
  }
];

// Export GUEST_STATUS mapping for index.tsx compatibility
export const GUEST_STATUS = GuestStatus;

export const MOCK_GUESTS: Guest[] = [
  { id: '1', name: 'Julian Casablancas', character: 'The Joker', status: GuestStatus.CONFIRMED, registrationNumber: '001', qrCode: 'QR_001' },
  { id: '2', name: 'Mia Wallace', character: 'Pulp Fiction', status: GuestStatus.CHECKED_IN, registrationNumber: '002', qrCode: 'QR_002' }
];

export const INITIAL_AWARD_CATEGORIES: AwardCategory[] = [
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

export const SCHEDULE: ScheduleItem[] = [
  { time: '13:00', activity: 'Alfombra Roja', description: 'Recepción estelar y sesión fotográfica oficial.' },
  { time: '14:30', activity: 'Banquete de Estrellas', description: 'Comida formal y brindis de apertura.' },
  { time: '16:00', activity: 'Apertura de Votaciones', description: 'Vota por tus favoritos en tiempo real.' },
  { time: '18:30', activity: 'The Awards Ceremony', description: 'La gran entrega de estatuillas.' },
  { time: '20:00', activity: 'Cierre de la Gala', description: 'Despedida oficial y fiesta de cierre.' }
];
