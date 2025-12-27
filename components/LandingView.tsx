
import React, { useState } from 'react';
import { EVENT_DETAILS, SCHEDULE, DRESSCODE_CATEGORIES } from '../constants';
import { AwardCategory, DresscodeCategory } from '../types';
import Countdown from './Countdown';
import { Star, MapPin, Ticket, X, Play, Lock, ExternalLink, Navigation } from 'lucide-react';

interface Props {
  onOpenRegister: () => void;
  onEnterAdmin: () => void;
  categories: AwardCategory[];
}

const LandingView: React.FC<Props> = ({ onOpenRegister, onEnterAdmin, categories }) => {
  const [selectedDresscode, setSelectedDresscode] = useState<DresscodeCategory | null>(null);

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center p-6 bg-[url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/80 z-0"></div>
        <div className="spotlight spotlight-left"></div>
        <div className="spotlight spotlight-right"></div>
        
        <div className="relative z-10 max-w-4xl space-y-6 animate-fadeIn">
          <p className="font-cinzel text-gold text-xs sm:text-sm tracking-[0.4em] uppercase">Estás invitado a la gala de</p>
          <h1 className="font-cinzel text-5xl sm:text-7xl font-black text-gold-gradient tracking-tight leading-none uppercase">
            {EVENT_DETAILS.NAME}
          </h1>
          <p className="font-playfair italic text-xl sm:text-3xl text-white/90 tracking-widest">
            {EVENT_DETAILS.HOST} &bull; {EVENT_DETAILS.SUBTITLE}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <button 
              onClick={onOpenRegister}
              className="shine-effect bg-gold-gradient text-black font-cinzel font-bold py-4 px-10 tracking-[0.2em] hover:scale-105 transition-transform shadow-[0_0_20px_rgba(212,175,55,0.3)]"
            >
              CONFIRMAR ASISTENCIA
            </button>
            <a 
              href="#itinerario"
              className="border border-gold/40 text-gold font-cinzel font-bold py-4 px-10 tracking-[0.2em] hover:bg-gold/10 transition-colors text-center"
            >
              VER ITINERARIO
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 w-full flex flex-col items-center text-gold/60 font-cinzel text-xs sm:text-lg tracking-[0.2em] space-y-4">
          <div className="flex items-center gap-4">
            <span>{EVENT_DETAILS.DATE}</span>
            <span className="h-4 w-px bg-gold/30 hidden sm:block"></span>
            <span>{EVENT_DETAILS.TIME}</span>
          </div>
          <a 
            href={EVENT_DETAILS.MAP_URL} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gold hover:text-white transition-all group"
          >
            <MapPin size={16} className="group-hover:animate-bounce" />
            <span className="border-b border-gold/20 group-hover:border-white transition-all uppercase tracking-widest">{EVENT_DETAILS.LOCATION}</span>
            <ExternalLink size={12} className="opacity-40 group-hover:opacity-100" />
          </a>
          <div className="w-px h-16 bg-gradient-to-b from-gold/40 to-transparent mt-2"></div>
        </div>
      </section>

      {/* Countdown Section */}
      <Countdown targetDate={EVENT_DETAILS.TARGET_DATE} />

      {/* Dresscode Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-cinzel text-4xl text-gold-gradient mb-4 uppercase tracking-wider">Dresscode: Personaje de Cine</h2>
          <p className="font-playfair italic text-xl text-white/50 mb-4">"{EVENT_DETAILS.DRESSCODE_QUOTE}"</p>
          <p className="text-gold font-cinzel text-[10px] tracking-[0.3em] uppercase">Selecciona una categoría para ver ejemplos reales</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DRESSCODE_CATEGORIES.map((category) => (
            <button 
              key={category.id} 
              onClick={() => setSelectedDresscode(category)}
              className="group relative aspect-[3/4] overflow-hidden gold-border bg-black text-left active:scale-95 transition-transform"
            >
              <img src={category.coverImage} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-40 transition-all duration-700" alt={category.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-6 flex flex-col justify-end">
                <div className="flex items-center gap-2 mb-2">
                   <div className="h-px w-8 bg-gold/50 group-hover:w-12 transition-all"></div>
                   <span className="text-gold font-cinzel text-[10px] tracking-widest uppercase">Click para inspirarte</span>
                </div>
                <h3 className="font-cinzel text-2xl text-white group-hover:text-gold transition-colors">{category.title}</h3>
                <p className="text-[10px] text-white/50 font-light mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {category.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Dresscode Gallery Modal */}
      {selectedDresscode && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-8 bg-black/98 backdrop-blur-xl animate-fadeIn">
          <div className="relative bg-gradient-to-b from-[#0A0A0A] to-[#050505] gold-border w-full max-w-7xl max-h-[95vh] overflow-y-auto shadow-2xl">
            <button 
              onClick={() => setSelectedDresscode(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 p-3 bg-black/80 backdrop-blur border border-gold/30 text-gold hover:bg-gold hover:text-black transition-all rounded-full shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] hover:scale-110"
            >
              <X size={20} />
            </button>

            <div className="p-6 sm:p-12 lg:p-16">
              {/* Header Section */}
              <div className="flex flex-col gap-8 mb-12 pb-8 border-b border-gold/10">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-gold/20 to-transparent border border-gold/30 flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                      <Star size={32} className="text-gold" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-3">
                    <span className="font-cinzel text-gold/60 text-xs tracking-[0.4em] uppercase block">Inspiración Dresscode</span>
                    <h3 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl text-gold-gradient uppercase font-black tracking-tight">
                      {selectedDresscode.title}
                    </h3>
                    <p className="font-playfair italic text-white/70 text-lg sm:text-xl max-w-2xl leading-relaxed">
                      {selectedDresscode.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 px-4 py-3 bg-gold/5 border border-gold/10 rounded">
                  <Lock size={16} className="text-gold/60" />
                  <p className="text-xs sm:text-sm text-gold/50 font-cinzel tracking-wider uppercase">
                    Nota: Los personajes marcados como reservados no permiten duplicados
                  </p>
                </div>
              </div>

              {/* Gallery Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6 mb-12">
                {selectedDresscode.examples.map((example, idx) => {
                  const isReserved = example.character.toLowerCase().includes("reservado");
                  return (
                    <div key={idx} className="group space-y-3">
                      <div className={`relative aspect-[2/3] overflow-hidden bg-gradient-to-br from-white/5 to-transparent border transition-all duration-500 ${
                        isReserved 
                          ? 'border-red-900/30 shadow-[0_0_20px_rgba(127,29,29,0.2)]' 
                          : 'border-gold/20 hover:border-gold/50 shadow-[0_0_20px_rgba(212,175,55,0.1)] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]'
                      }`}>
                        <img 
                          src={example.image} 
                          className={`w-full h-full object-cover transition-all duration-700 ${
                            isReserved 
                              ? 'opacity-30 grayscale' 
                              : 'group-hover:scale-110'
                          }`}
                          alt={example.character}
                          onError={(e) => {
                            // Fallback para imágenes que no cargan
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent && !parent.querySelector('.placeholder-text')) {
                              const placeholder = document.createElement('div');
                              placeholder.className = 'placeholder-text absolute inset-0 flex flex-col items-center justify-center text-center p-4';
                              placeholder.innerHTML = `
                                <div class="w-12 h-12 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mb-3">
                                  <svg class="w-6 h-6 text-gold/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                  </svg>
                                </div>
                                <span class="text-gold/40 text-[10px] font-cinzel tracking-wider uppercase">Agrega tu foto aquí</span>
                              `;
                              parent.appendChild(placeholder);
                            }
                          }}
                        />
                        {isReserved && (
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-3 bg-black/40 backdrop-blur-sm">
                            <div className="w-10 h-10 rounded-full bg-red-900/20 border border-red-900/30 flex items-center justify-center mb-2">
                              <Lock size={18} className="text-red-400" />
                            </div>
                            <span className="bg-gradient-to-r from-red-900 to-red-800 text-white px-2 py-1 font-cinzel text-[9px] font-bold tracking-widest uppercase shadow-lg">
                              Reservado
                            </span>
                            <p className="text-[9px] text-white/80 mt-2 font-cinzel leading-tight tracking-wide">
                              Personaje<br/>Exclusivo
                            </p>
                          </div>
                        )}
                        <div className={`absolute inset-0 transition-opacity duration-300 ${
                          isReserved ? 'opacity-0' : 'bg-black/20 group-hover:opacity-0'
                        }`}></div>
                      </div>
                      <div className="space-y-1">
                        <h4 className={`font-cinzel text-sm sm:text-base tracking-wide uppercase leading-tight ${
                          isReserved ? 'text-red-400/60' : 'text-gold group-hover:text-white transition-colors'
                        }`}>
                          {example.character.replace(' (RESERVADO)', '')}
                        </h4>
                        <p className="text-[9px] sm:text-[10px] text-white/40 font-cinzel tracking-widest uppercase flex items-center gap-1.5">
                          <Play size={8} className="fill-current" /> {example.movie}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Footer Button */}
              <div className="text-center pt-8 border-t border-gold/10">
                <button 
                  onClick={() => setSelectedDresscode(null)}
                  className="font-cinzel bg-gold-gradient text-black px-12 py-4 tracking-[0.2em] font-bold hover:scale-105 active:scale-95 transition-transform uppercase shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]"
                >
                  Cerrar Galería
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Categories / Awards Preview */}
      <section className="py-24 bg-black/50 border-y border-gold/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
              <p className="text-gold font-cinzel text-xs tracking-widest mb-2 uppercase">Categorías Oficiales</p>
              <h2 className="font-cinzel text-4xl uppercase tracking-wider">Estatuillas de la Noche</h2>
            </div>
            <p className="max-w-md text-white/40 text-sm text-right font-light leading-relaxed">
              Los premios serán elegidos por el público asistente mediante votación en vivo durante la gala.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map(cat => (
              <div key={cat.id} className="p-8 border border-gold/10 bg-gradient-to-br from-gold/5 to-transparent hover:border-gold/30 transition-all group">
                <span className="text-4xl mb-4 block group-hover:scale-110 transition-transform">{cat.icon}</span>
                <h4 className="font-cinzel text-gold text-lg mb-2">{cat.name}</h4>
                <p className="text-[10px] text-white/30 tracking-widest uppercase">Nominación Abierta</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section id="itinerario" className="py-32 max-w-2xl mx-auto px-6">
        <h2 className="font-cinzel text-3xl text-center mb-24 tracking-[0.5em] uppercase text-white/90">
          Itinerario de la Gala
        </h2>
        
        <div className="space-y-16 relative before:absolute before:left-[11px] before:top-4 before:bottom-0 before:w-px before:bg-gradient-to-b before:from-gold/50 before:via-gold/20 before:to-transparent">
          {SCHEDULE.map((item, i) => (
            <div key={i} className="relative pl-12 group">
              <div className="absolute left-0 top-1.5 w-[22px] h-[22px] rounded-full bg-black border-2 border-gold/40 flex items-center justify-center shadow-[0_0_15px_rgba(191,149,63,0.3)] group-hover:shadow-[0_0_20px_rgba(191,149,63,0.6)] group-hover:border-gold transition-all duration-500">
                <div className="w-2 h-2 rounded-full bg-gold/60 group-hover:bg-gold transition-colors"></div>
              </div>
              
              <div className="space-y-2">
                <div className="font-cinzel text-gold/80 text-lg tracking-widest mb-1 group-hover:text-gold transition-colors duration-500">
                  {item.time}
                </div>
                <h3 className="font-cinzel text-2xl sm:text-3xl font-bold uppercase tracking-[0.1em] text-white group-hover:text-gold-gradient transition-all duration-500">
                  {item.activity}
                </h3>
                <p className="text-white/40 text-sm sm:text-base font-light leading-relaxed max-w-lg">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Venue Section */}
      <section className="relative py-32 px-6 overflow-hidden border-t border-gold/10">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-fixed bg-center opacity-20 grayscale"></div>
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
            <span className="font-cinzel text-gold text-sm tracking-[0.5em] uppercase">The Location</span>
            <h2 className="font-cinzel text-6xl sm:text-8xl text-gold-gradient font-black uppercase tracking-tighter">
              {EVENT_DETAILS.LOCATION}
            </h2>
            <p className="font-playfair italic text-white/80 text-2xl sm:text-4xl max-w-3xl mx-auto leading-snug">
              Luces, cámara y el máximo hype. El spot oficial donde vamos a hacer historia y celebrar la noche más icónica del año.
            </p>
            <div className="pt-8">
              <a href={EVENT_DETAILS.MAP_URL} target="_blank" className="inline-flex items-center gap-4 border border-gold/30 px-12 py-5 font-cinzel tracking-widest hover:bg-gold/10 transition-all uppercase">
                <Navigation size={18}/> Ver Mapa Oficial
              </a>
            </div>
        </div>
      </section>

      {/* Redesigned Footer Section - REFINED FOR MAXIMUM LEGIBILITY */}
      <footer className="relative py-40 text-center bg-black overflow-hidden border-t border-gold/10">
        <div className="max-w-4xl mx-auto px-6 space-y-20">
          
          <h4 className="font-cinzel text-3xl sm:text-5xl text-white tracking-[0.4em] uppercase font-black animate-fadeIn">
            ¿ESTÁS LISTO PARA SER LA ESTRELLA?
          </h4>
          
          <div className="flex justify-center">
            <button 
              onClick={onOpenRegister}
              className="relative group py-7 px-20 bg-[#080808] border border-gold/40 shadow-[0_0_40px_rgba(191,149,63,0.15)] hover:shadow-[0_0_60px_rgba(191,149,63,0.3)] hover:border-gold transition-all duration-700 active:scale-95 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gold/10 via-transparent to-gold/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative z-10 font-cinzel text-gold/90 group-hover:text-gold text-base sm:text-2xl tracking-[0.5em] font-black uppercase transition-all duration-500">
                SÍ, CONFIRMO MI ASISTENCIA
              </span>
              <div className="absolute -inset-1 bg-gold/5 blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-x-16 gap-y-8 pt-10">
            <div className="flex items-center gap-3 text-white/50 font-cinzel text-xs sm:text-sm tracking-[0.4em] uppercase group cursor-default hover:text-white transition-colors">
              <MapPin size={16} className="text-gold/60 group-hover:text-gold transition-colors"/> 
              <span>{EVENT_DETAILS.LOCATION}</span>
            </div>
            <div className="flex items-center gap-3 text-white/50 font-cinzel text-xs sm:text-sm tracking-[0.4em] uppercase group cursor-default hover:text-white transition-colors">
              <Star size={16} className="text-gold/60 group-hover:text-gold transition-colors"/> 
              <span>ESTRICTO DRESSCODE</span>
            </div>
            <div className="flex items-center gap-3 text-white/50 font-cinzel text-xs sm:text-sm tracking-[0.4em] uppercase group cursor-default hover:text-white transition-colors">
              <Ticket size={16} className="text-gold/60 group-hover:text-gold transition-colors"/> 
              <span>RSVP</span>
            </div>
          </div>

          <div className="pt-24 opacity-30 hover:opacity-100 transition-opacity">
            <button 
              onClick={onEnterAdmin}
              className="font-cinzel text-[9px] sm:text-[11px] text-white/30 hover:text-gold transition-all tracking-[0.6em] uppercase cursor-pointer"
            >
              SISTEMA DE GESTIÓN ADMINISTRATIVA
            </button>
          </div>
        </div>

        {/* Cinematic Backdrop Glow Line */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[150%] h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent blur-[1px]"></div>
      </footer>
    </div>
  );
};

export default LandingView;
