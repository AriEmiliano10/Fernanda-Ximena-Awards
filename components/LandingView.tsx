
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
        
        <div className="relative z-10 max-w-4xl space-y-6">
          <p className="font-cinzel text-gold text-xs sm:text-sm tracking-[0.4em] uppercase">Estás invitado a la gala de</p>
          <h1 className="font-cinzel text-5xl sm:text-7xl font-black text-gold-gradient tracking-tight leading-none">
            {EVENT_DETAILS.NAME.toUpperCase()}
          </h1>
          <p className="font-playfair italic text-xl sm:text-3xl text-white/90 tracking-widest">
            {EVENT_DETAILS.HOST} &bull; {EVENT_DETAILS.SUBTITLE}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <button 
              onClick={onOpenRegister}
              className="shine-effect bg-gold-gradient text-black font-cinzel font-bold py-4 px-10 tracking-[0.2em] hover:scale-105 transition-transform"
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
          <div className="relative bg-[#080808] gold-border w-full max-w-6xl max-h-[95vh] overflow-y-auto shadow-2xl">
            <button 
              onClick={() => setSelectedDresscode(null)}
              className="absolute top-6 right-6 z-10 p-2 bg-black border border-gold/30 text-gold hover:bg-gold hover:text-black transition-all rounded-full"
            >
              <X size={20} />
            </button>

            <div className="p-8 sm:p-16">
              <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8 border-b border-gold/10 pb-12">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-gold">
                    <Star size={24} />
                    <span className="font-cinzel text-xs tracking-[0.4em] uppercase">Inspiración Dresscode</span>
                  </div>
                  <h3 className="font-cinzel text-5xl text-gold-gradient uppercase font-black">{selectedDresscode.title}</h3>
                </div>
                <div className="space-y-4 max-w-md md:text-right">
                  <p className="font-playfair italic text-white/60 text-xl">
                    {selectedDresscode.description}
                  </p>
                  <div className="flex items-center gap-2 justify-end text-[10px] text-gold/40 font-cinzel tracking-widest uppercase">
                    <Lock size={12} /> Nota: Los personajes reservados no permiten duplicados
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* FIX: Map over selectedDresscode.examples instead of selectedDresscode directly */}
                {selectedDresscode.examples.map((example, idx) => {
                  const isReserved = example.character.toLowerCase().includes("glinda");
                  return (
                    <div key={idx} className={`group space-y-4 ${isReserved ? 'relative' : ''}`}>
                      <div className="relative aspect-[2/3] overflow-hidden gold-border bg-white/5">
                        <img 
                          src={example.image} 
                          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ${isReserved ? 'opacity-40 grayscale' : ''}`} 
                          alt={example.character} 
                        />
                        {isReserved && (
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                             <Lock size={32} className="text-gold mb-2" />
                             <span className="bg-gold text-black px-3 py-1 font-cinzel text-[8px] font-bold tracking-widest uppercase">Reservado</span>
                             <p className="text-[10px] text-white/80 mt-2 font-cinzel leading-tight">Personaje Exclusivo<br/>Anfitriona</p>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                      </div>
                      <div>
                        <h4 className={`font-cinzel text-lg tracking-wide uppercase ${isReserved ? 'text-white/30' : 'text-gold'}`}>
                          {example.character}
                        </h4>
                        <p className="text-[10px] text-white/40 font-cinzel tracking-widest uppercase flex items-center gap-2">
                          <Play size={8} className="fill-current" /> {example.movie}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-16 text-center">
                 <button 
                   onClick={() => setSelectedDresscode(null)}
                   className="font-cinzel bg-gold-gradient text-black px-12 py-4 tracking-[0.2em] font-bold hover:scale-105 transition-transform uppercase"
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
              <div key={cat.id} className="p-8 border border-gold/10 bg-gradient-to-br from-gold/5 to-transparent hover:border-gold/30 transition-all">
                <span className="text-4xl mb-4 block">{cat.icon}</span>
                <h4 className="font-cinzel text-gold text-lg mb-2">{cat.name}</h4>
                <p className="text-[10px] text-white/30 tracking-widest uppercase">Nominación Abierta</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section id="itinerario" className="py-24 max-w-3xl mx-auto px-6">
        <h2 className="font-cinzel text-3xl italic text-center mb-16 tracking-widest uppercase">Itinerario de la Gala</h2>
        <div className="space-y-12 relative before:absolute before:left-[11px] before:top-4 before:bottom-0 before:w-px before:bg-gold/20">
          {SCHEDULE.map((item, i) => (
            <div key={i} className="relative pl-10">
              <div className="absolute left-0 top-1.5 w-[22px] h-[22px] rounded-full bg-gold border-4 border-black shadow-[0_0_10px_rgba(212,175,55,0.8)]"></div>
              <div className="font-cinzel text-gold text-xl mb-1">{item.time}</div>
              <h3 className="font-cinzel text-2xl mb-2">{item.activity}</h3>
              <p className="text-white/40 text-sm font-light leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Venue / Location Section */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-fixed bg-center opacity-20 grayscale"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="gold-border bg-black/40 backdrop-blur-xl p-12 sm:p-20 flex flex-col items-center text-center space-y-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-12 bg-gold"></div>
              <span className="font-cinzel text-gold text-sm tracking-[0.5em] uppercase">La Sede</span>
              <div className="h-px w-12 bg-gold"></div>
            </div>
            
            <h2 className="font-cinzel text-6xl sm:text-8xl text-gold-gradient font-black uppercase tracking-tighter animate-pulse">
              {EVENT_DETAILS.LOCATION}
            </h2>
            
            <p className="font-playfair italic text-white/80 text-2xl sm:text-4xl max-w-3xl leading-snug">
              Luces, cámara y el máximo hype. El spot oficial donde vamos a hacer historia y celebrar la noche más icónica del año.
            </p>
            
            <div className="pt-8 w-full max-w-md">
              <a 
                href={EVENT_DETAILS.MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="shine-effect block w-full bg-gold-gradient text-black font-cinzel font-bold py-6 px-10 tracking-[0.3em] hover:scale-105 transition-transform flex items-center justify-center gap-4 group"
              >
                <Navigation size={20} className="group-hover:rotate-45 transition-transform" />
                CÓMO LLEGAR
              </a>
              <p className="mt-6 text-gold/40 font-cinzel text-[10px] tracking-[0.2em] uppercase leading-relaxed max-w-xs mx-auto">
                Calle Kansas 58, Nápoles, Benito Juárez, 03810 Ciudad de México, CDMX
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ticket CTA Section */}
      <section className="py-24 px-6 bg-[#080808]">
        <div className="max-w-4xl mx-auto p-1 bg-black gold-border rotate-2 hover:rotate-0 transition-transform shadow-2xl">
          <div className="bg-black/50 p-8 sm:p-12 flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 space-y-4">
              <div className="text-gold font-cinzel text-xs tracking-widest flex items-center gap-2">
                <Ticket size={16} /> TICKET DE ACCESO
              </div>
              <h3 className="font-cinzel text-3xl sm:text-4xl uppercase">Gala Exclusiva</h3>
              <p className="text-white/40 text-sm leading-relaxed">
                Presenta tu código QR en la entrada para validar tu nominación y acceso a las votaciones. El staff oficial te asignará tu mesa.
              </p>
              <div className="flex gap-4 pt-4">
                <div className="p-4 bg-white/5 border border-white/10 text-center min-w-[100px]">
                   <span className="text-[10px] text-gold/60 block mb-1">NUM.</span>
                   <span className="font-cinzel text-2xl">???</span>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 text-center flex-1">
                   <span className="text-[10px] text-gold/60 block mb-1">NOMINADO/A</span>
                   <span className="font-cinzel text-2xl tracking-tight">TÚ AQUÍ</span>
                </div>
              </div>
            </div>
            <div className="w-48 h-48 bg-white/10 border-2 border-dashed border-gold/30 flex items-center justify-center text-center p-4">
              <span className="font-cinzel text-white/20 text-xs text-center">QR DISPONIBLE TRAS REGISTRO</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 text-center border-t border-gold/10 px-6">
        <h4 className="font-cinzel text-xl text-gold mb-8 tracking-[0.2em] uppercase">¿Estás listo para ser la estrella?</h4>
        <button 
          onClick={onOpenRegister}
          className="shine-effect bg-gold text-black font-cinzel font-bold py-4 px-10 tracking-[0.2em] hover:scale-105 transition-transform mb-12"
        >
          SÍ, CONFIRMO MI ASISTENCIA
        </button>
        <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-12 text-[10px] text-white/30 font-cinzel tracking-[0.3em] uppercase">
          <a href={EVENT_DETAILS.MAP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 hover:text-gold transition-colors">
            <MapPin size={12}/> {EVENT_DETAILS.LOCATION}
          </a>
          <span className="flex items-center justify-center gap-2"><Star size={12}/> Estricto Dresscode</span>
          <span className="flex items-center justify-center gap-2"><Ticket size={12}/> RSVP</span>
        </div>
        <p 
          className="mt-12 text-white/10 font-cinzel text-[8px] cursor-pointer hover:text-gold transition-colors"
          onClick={onEnterAdmin}
        >
          SISTEMA DE GESTIÓN ADMINISTRATIVA
        </p>
      </footer>
    </div>
  );
};

export default LandingView;
