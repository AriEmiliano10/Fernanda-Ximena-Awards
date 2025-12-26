
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  EVENT_DETAILS, 
  SCHEDULE, 
  DRESSCODE_CATEGORIES, 
  INITIAL_AWARD_CATEGORIES, 
  MOCK_GUESTS,
  GUEST_STATUS
} from './constants'; // Removed .js to use the corrected constants.tsx
import { getCharacterSuggestion } from './services/geminiService.js';
import { 
  Star, MapPin, Ticket, X, Play, Lock, ExternalLink, Navigation, 
  Users, Scan, Vote, BarChart3, ChevronLeft, Search, Trophy, Sparkles, CheckCircle2, Info
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// --- Components ---

const Countdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance < 0) { clearInterval(timer); return; }
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <section className="py-12 bg-black/40 border-y border-gold/10">
      <div className="flex justify-center gap-4 sm:gap-12">
        {Object.entries(timeLeft).map(([label, value]) => (
          <div key={label} className="flex flex-col items-center">
            <span className="font-cinzel text-3xl sm:text-5xl text-gold mb-1">{String(value).padStart(2, '0')}</span>
            <span className="text-[10px] sm:text-xs text-white/40 font-cinzel tracking-widest uppercase">
              {label === 'days' ? 'Días' : label === 'hours' ? 'Horas' : label === 'minutes' ? 'Minutos' : 'Segundos'}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

const RegistrationModal = ({ onClose, onRegister }) => {
  const [step, setStep] = useState('form');
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', age: '', character: '' });
  const [aiSuggestion, setAiSuggestion] = useState(null);
  const [registeredData, setRegisteredData] = useState(null);

  const isCharacterReserved = formData.character.toLowerCase().includes("glinda");

  const handleAiSuggestion = async () => {
    if (!formData.name && !formData.character) return;
    setAiLoading(true);
    const suggestion = await getCharacterSuggestion(formData.character || formData.name);
    setAiSuggestion(suggestion);
    setAiLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isCharacterReserved) return;
    setLoading(true);
    setTimeout(() => {
      const data = { ...formData, registrationNumber: String(Math.floor(Math.random() * 999)).padStart(3, '0'), qrCode: `QR_${Date.now()}` };
      setRegisteredData(data);
      onRegister(data);
      setStep('success');
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm">
      <div className="relative bg-[#111] gold-border w-full max-w-2xl max-h-[95vh] overflow-y-auto p-8 sm:p-12 shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-gold/60 hover:text-gold transition-colors"><X size={24} /></button>
        {step === 'form' ? (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <div className="text-4xl animate-bounce">🎭</div>
              <h2 className="font-cinzel text-3xl text-gold-gradient tracking-widest uppercase">Confirmar Asistencia</h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input required placeholder="Nombre Completo" className="w-full bg-white/5 border border-gold/20 p-4 text-white focus:outline-none focus:border-gold" value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} />
              <div className="grid grid-cols-2 gap-6">
                <input required type="number" placeholder="Edad" className="w-full bg-white/5 border border-gold/20 p-4 text-white" value={formData.age} onChange={e => setFormData(p => ({ ...p, age: e.target.value }))} />
                <input required placeholder="Teléfono" className="w-full bg-white/5 border border-gold/20 p-4 text-white" value={formData.phone} onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))} />
              </div>
              <input required type="email" placeholder="Correo" className="w-full bg-white/5 border border-gold/20 p-4 text-white" value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} />
              <div className="space-y-4 pt-4 border-t border-gold/10">
                <div className="flex justify-between"><label className="text-gold text-xs font-cinzel tracking-widest uppercase">Disfraz / Personaje</label>
                <button type="button" onClick={handleAiSuggestion} disabled={aiLoading} className="text-[10px] text-gold border border-gold/30 px-3 py-1 rounded-full"><Sparkles size={12} className="inline mr-1"/> IA Sugerir</button></div>
                <input placeholder="Ej: John Wick" className={`w-full bg-white/5 border p-4 ${isCharacterReserved ? 'border-red-500' : 'border-gold/20'}`} value={formData.character} onChange={e => setFormData(p => ({ ...p, character: e.target.value }))} />
                {isCharacterReserved && <p className="text-red-500 text-[10px] font-cinzel">⚠️ Personaje Reservado por la anfitriona</p>}
                {aiSuggestion && (
                  <div className="p-4 bg-gold/5 border border-gold/20 rounded">
                    <p className="text-xs text-gold font-bold">💡 IA sugiere: {aiSuggestion.name}</p>
                    <button type="button" onClick={() => {setFormData(p => ({ ...p, character: aiSuggestion.name })); setAiSuggestion(null);}} className="text-[8px] text-gold underline uppercase">Usar esta idea</button>
                  </div>
                )}
              </div>
              <button type="submit" disabled={loading || isCharacterReserved} className="w-full shine-effect bg-gold-gradient text-black font-cinzel font-bold py-5 tracking-widest uppercase">{loading ? 'Procesando...' : 'Confirmar Registro'}</button>
            </form>
          </div>
        ) : (
          <div className="text-center space-y-8 animate-fadeIn">
            <CheckCircle2 size={80} className="text-gold mx-auto" />
            <h3 className="font-cinzel text-3xl text-gold-gradient uppercase">¡Registro Exitoso!</h3>
            <div className="bg-white/5 border border-gold/30 p-8 flex justify-between items-center">
              <div className="text-left"><span className="text-gold text-[10px] font-cinzel">CÓDIGO:</span><p className="text-4xl font-cinzel">{registeredData.registrationNumber}</p><p className="font-cinzel text-white/60">{registeredData.name}</p></div>
              <div className="w-24 h-24 bg-white p-1"><img src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${registeredData.registrationNumber}`} className="w-full h-full" alt="QR"/></div>
            </div>
            <button onClick={onClose} className="border border-gold text-gold px-8 py-4 font-cinzel uppercase tracking-widest">Finalizar</button>
          </div>
        )}
      </div>
    </div>
  );
};

const LandingView = ({ onOpenRegister, onEnterAdmin, categories }) => {
  const [selectedDresscode, setSelectedDresscode] = useState(null);

  return (
    <div className="relative">
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center p-6 bg-[url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/80 z-0"></div>
        <div className="relative z-10 space-y-6">
          <p className="font-cinzel text-gold text-sm tracking-[0.4em] uppercase">Invitación Exclusiva</p>
          <h1 className="font-cinzel text-5xl sm:text-7xl font-black text-gold-gradient leading-none uppercase">{EVENT_DETAILS.NAME}</h1>
          <p className="font-playfair italic text-xl text-white/90">{EVENT_DETAILS.HOST} &bull; {EVENT_DETAILS.SUBTITLE}</p>
          <div className="flex gap-4 justify-center pt-8">
            <button onClick={onOpenRegister} className="shine-effect bg-gold-gradient text-black font-cinzel font-bold py-4 px-10 tracking-widest">CONFIRMAR</button>
            <a href="#itinerario" className="border border-gold text-gold font-cinzel font-bold py-4 px-10 tracking-widest">ITINERARIO</a>
          </div>
        </div>
        <div className="absolute bottom-10 text-gold/60 font-cinzel text-xs space-y-2 uppercase tracking-widest">
          <p>{EVENT_DETAILS.DATE} | {EVENT_DETAILS.TIME}</p>
          <a href={EVENT_DETAILS.MAP_URL} target="_blank" className="flex items-center gap-2 hover:text-white transition-colors justify-center"><MapPin size={14}/> {EVENT_DETAILS.LOCATION}</a>
        </div>
      </section>

      <Countdown targetDate={EVENT_DETAILS.TARGET_DATE} />

      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16"><h2 className="font-cinzel text-4xl text-gold-gradient mb-4 uppercase">Dresscode: Cine</h2><p className="font-playfair italic text-white/50">"{EVENT_DETAILS.DRESSCODE_QUOTE}"</p></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DRESSCODE_CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => setSelectedDresscode(cat)} className="group relative aspect-[3/4] gold-border overflow-hidden bg-black text-left">
              <img src={cat.coverImage} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700" alt={cat.title}/>
              <div className="absolute inset-0 bg-gradient-to-t from-black p-6 flex flex-col justify-end"><h3 className="font-cinzel text-2xl text-white group-hover:text-gold">{cat.title}</h3></div>
            </button>
          ))}
        </div>
      </section>

      {selectedDresscode && (
        <div className="fixed inset-0 z-[110] bg-black/98 flex items-center justify-center p-8 overflow-y-auto">
          <div className="relative bg-[#080808] gold-border w-full max-w-6xl p-12">
            <button onClick={() => setSelectedDresscode(null)} className="absolute top-6 right-6 text-gold"><X size={32}/></button>
            <h3 className="font-cinzel text-5xl text-gold-gradient mb-12 uppercase">{selectedDresscode.title}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {selectedDresscode.examples.map((ex, i) => (
                <div key={i} className="space-y-4">
                  <div className="aspect-[2/3] gold-border overflow-hidden"><img src={ex.image} className="w-full h-full object-cover" alt={ex.character}/></div>
                  <h4 className="text-gold font-cinzel uppercase">{ex.character}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* NEW VENUE SECTION */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-fixed opacity-20 grayscale"></div>
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="gold-border bg-black/40 backdrop-blur-xl p-12 sm:p-20 space-y-8">
            <span className="font-cinzel text-gold text-sm tracking-[0.5em] uppercase">La Sede</span>
            <h2 className="font-cinzel text-6xl sm:text-8xl text-gold-gradient font-black uppercase tracking-tighter animate-pulse">{EVENT_DETAILS.LOCATION}</h2>
            <p className="font-playfair italic text-white/80 text-2xl sm:text-4xl max-w-3xl mx-auto leading-snug">
              Luces, cámara y el máximo hype. El spot oficial donde vamos a hacer historia y celebrar la noche más icónica del año.
            </p>
            <div className="pt-8 max-w-md mx-auto space-y-6">
              <a href={EVENT_DETAILS.MAP_URL} target="_blank" className="shine-effect block w-full bg-gold-gradient text-black font-cinzel font-bold py-6 px-10 tracking-[0.3em] flex items-center justify-center gap-4 group">
                <Navigation size={20} className="group-hover:rotate-45 transition-transform"/> CÓMO LLEGAR
              </a>
              <p className="text-gold/40 font-cinzel text-[10px] tracking-[0.2em] uppercase leading-relaxed">{EVENT_DETAILS.ADDRESS}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="itinerario" className="py-24 max-w-3xl mx-auto px-6">
        <h2 className="font-cinzel text-3xl text-center mb-16 uppercase tracking-widest">Itinerario</h2>
        <div className="space-y-12 relative before:absolute before:left-[11px] before:top-4 before:bottom-0 before:w-px before:bg-gold/20">
          {SCHEDULE.map((item, i) => (
            <div key={i} className="relative pl-10">
              <div className="absolute left-0 top-1.5 w-[22px] h-[22px] rounded-full bg-gold border-4 border-black"></div>
              <div className="font-cinzel text-gold text-xl mb-1">{item.time}</div>
              <h3 className="font-cinzel text-2xl">{item.activity}</h3>
              <p className="text-white/40 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="py-24 text-center border-t border-gold/10 px-6">
        <h4 className="font-cinzel text-xl text-gold mb-8 uppercase tracking-widest">¿Estás listo para ser la estrella?</h4>
        <button onClick={onOpenRegister} className="shine-effect bg-gold text-black font-cinzel font-bold py-4 px-12 tracking-widest uppercase">Confirmar mi asistencia</button>
        <p className="mt-12 text-white/10 font-cinzel text-[8px] cursor-pointer hover:text-gold uppercase" onClick={onEnterAdmin}>Admin Panel</p>
      </footer>
    </div>
  );
};

const DashboardView = ({ guests, categories, onBack, onToggleStatus, onVote }) => {
  const [tab, setTab] = useState('guests');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGuests = guests.filter(g => g.name.toLowerCase().includes(searchTerm.toLowerCase()) || g.character.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col">
      <header className="sticky top-0 z-40 bg-black border-b border-gold/20 p-4 flex justify-between items-center">
        <button onClick={onBack} className="text-gold flex items-center gap-2 font-cinzel text-xs uppercase"><ChevronLeft size={16}/> Volver</button>
        <nav className="flex gap-4">
          <button onClick={() => setTab('guests')} className={`px-4 py-2 font-cinzel text-xs ${tab === 'guests' ? 'text-gold underline' : 'text-white/50'}`}>Invitados</button>
          <button onClick={() => setTab('voting')} className={`px-4 py-2 font-cinzel text-xs ${tab === 'voting' ? 'text-gold underline' : 'text-white/50'}`}>Votaciones</button>
        </nav>
      </header>
      <main className="p-6 max-w-7xl mx-auto w-full">
        {tab === 'guests' ? (
          <div className="space-y-6">
            <div className="relative max-w-md"><Search className="absolute left-3 top-2.5 text-white/20" size={18}/><input placeholder="Buscar..." className="w-full bg-white/5 border border-white/10 pl-10 pr-4 py-2 rounded" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}/></div>
            <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
              <table className="w-full text-left"><thead className="bg-white/5 font-cinzel text-gold text-xs tracking-widest uppercase"><tr><th className="p-4">Nombre</th><th className="p-4">Personaje</th><th className="p-4">Estatus</th><th className="p-4">Acción</th></tr></thead>
              <tbody className="divide-y divide-white/5">{filteredGuests.map(g => (
                <tr key={g.id} className="hover:bg-white/5"><td className="p-4">{g.name}</td><td className="p-4 italic text-white/50">{g.character}</td><td className="p-4">{g.status}</td>
                <td className="p-4"><button onClick={() => onToggleStatus(g.id)} className="text-[10px] text-gold border border-gold/20 px-3 py-1 uppercase">{g.status === GUEST_STATUS.CHECKED_IN ? 'Fuera' : 'Check-in'}</button></td></tr>
              ))}</tbody></table>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map(cat => (
              <div key={cat.id} className="bg-white/5 border border-white/10 p-8 space-y-6">
                <h3 className="font-cinzel text-xl text-gold uppercase">{cat.name}</h3>
                <div className="grid gap-4">{cat.nominees.map(nom => (
                  <button key={nom.id} onClick={() => onVote(cat.id, nom.id)} className="flex justify-between items-center p-4 bg-black/40 border border-white/10 hover:border-gold/50 transition-all">
                    <div><p className="font-bold">{nom.name}</p><p className="text-xs text-white/40 italic">{nom.character}</p></div>
                    <div className="font-cinzel text-gold text-xl px-4">{nom.votes}</div>
                  </button>
                ))}</div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

// --- App Root ---

const App = () => {
  const [view, setView] = useState('landing');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [guests, setGuests] = useState(() => {
    const saved = localStorage.getItem('guest_list_v2');
    return saved ? JSON.parse(saved) : MOCK_GUESTS;
  });
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('award_cats_v2');
    return saved ? JSON.parse(saved) : INITIAL_AWARD_CATEGORIES;
  });

  useEffect(() => localStorage.setItem('guest_list_v2', JSON.stringify(guests)), [guests]);
  useEffect(() => localStorage.setItem('award_cats_v2', JSON.stringify(categories)), [categories]);

  const handleRegister = (newGuest) => {
    const guest = { id: Date.now().toString(), status: GUEST_STATUS.CONFIRMED, ...newGuest };
    setGuests(prev => [...prev, guest]);
    setIsModalOpen(false);
  };

  const handleToggleStatus = (id) => {
    setGuests(prev => prev.map(g => g.id === id ? { ...g, status: g.status === GUEST_STATUS.CHECKED_IN ? GUEST_STATUS.CONFIRMED : GUEST_STATUS.CHECKED_IN } : g));
  };

  const handleVote = (catId, nomineeId) => {
    setCategories(prev => prev.map(cat => cat.id === catId ? { ...cat, nominees: cat.nominees.map(nom => nom.id === nomineeId ? { ...nom, votes: nom.votes + 1 } : nom) } : cat));
  };

  return (
    <div className="min-h-screen">
      {view === 'landing' ? (
        <LandingView onOpenRegister={() => setIsModalOpen(true)} onEnterAdmin={() => setView('dashboard')} categories={categories}/>
      ) : (
        <DashboardView guests={guests} categories={categories} onBack={() => setView('landing')} onToggleStatus={handleToggleStatus} onVote={handleVote}/>
      )}
      {isModalOpen && <RegistrationModal onClose={() => setIsModalOpen(false)} onRegister={handleRegister}/>}
      <button onClick={() => setView(v => v === 'landing' ? 'dashboard' : 'landing')} className="fixed bottom-6 right-6 z-50 bg-black/50 backdrop-blur-md border border-gold/30 text-gold font-cinzel text-[8px] px-4 py-2 rounded-full uppercase tracking-widest hover:bg-gold/20">
        MODO: {view === 'landing' ? 'Admin' : 'Gala'}
      </button>
    </div>
  );
};

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<React.StrictMode><App /></React.StrictMode>);
