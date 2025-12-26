
import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, Lock, Info } from 'lucide-react';
import { getCharacterSuggestion } from '../services/geminiService';
import { Guest } from '../types';
import { EVENT_DETAILS } from '../constants';

interface Props {
  onClose: () => void;
  onRegister: (data: Partial<Guest>) => void;
}

const RegistrationModal: React.FC<Props> = ({ onClose, onRegister }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    character: ''
  });
  const [aiSuggestion, setAiSuggestion] = useState<{ name: string; reason: string } | null>(null);
  const [registeredData, setRegisteredData] = useState<Partial<Guest> | null>(null);

  const isCharacterReserved = formData.character.toLowerCase().includes("glinda");

  const handleAiSuggestion = async () => {
    if (!formData.name && !formData.character) return;
    setAiLoading(true);
    const context = formData.character || `A person named ${formData.name}`;
    const suggestion = await getCharacterSuggestion(context);
    setAiSuggestion(suggestion);
    setAiLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCharacterReserved) {
      alert(`El personaje "${EVENT_DETAILS.RESERVED_CHARACTER}" ha sido reservado por la anfitriona. Por favor, elige otra estrella para tu actuación.`);
      return;
    }
    setLoading(true);
    // Simulating API call
    setTimeout(() => {
      const data = {
        ...formData,
        age: parseInt(formData.age),
        registrationNumber: String(Math.floor(Math.random() * 999)).padStart(3, '0'),
        qrCode: `QR_${Date.now()}`
      };
      setRegisteredData(data);
      onRegister(data);
      setStep('success');
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm">
      <div className="relative bg-[#111] gold-border w-full max-w-2xl max-h-[95vh] overflow-y-auto p-8 sm:p-12 shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gold/60 hover:text-gold transition-colors"
        >
          <X size={24} />
        </button>

        {step === 'form' ? (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <div className="text-4xl animate-bounce">🎭</div>
              <h2 className="font-cinzel text-3xl text-gold-gradient tracking-widest uppercase">Confirmar Asistencia</h2>
              <p className="font-playfair italic text-white/50">Regístrate para la gala más esperada del año</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="font-cinzel text-xs text-gold tracking-widest uppercase">Nombre Completo *</label>
                <input 
                  required
                  type="text"
                  placeholder="Ej: María Fernanda González"
                  className="w-full bg-white/5 border border-gold/20 p-4 text-white focus:outline-none focus:border-gold transition-all"
                  value={formData.name}
                  onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-cinzel text-xs text-gold tracking-widest uppercase">Edad *</label>
                  <input 
                    required
                    type="number"
                    className="w-full bg-white/5 border border-gold/20 p-4 text-white focus:outline-none focus:border-gold"
                    value={formData.age}
                    onChange={e => setFormData(p => ({ ...p, age: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-cinzel text-xs text-gold tracking-widest uppercase">Teléfono *</label>
                  <input 
                    required
                    type="tel"
                    className="w-full bg-white/5 border border-gold/20 p-4 text-white focus:outline-none focus:border-gold"
                    value={formData.phone}
                    onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-cinzel text-xs text-gold tracking-widest uppercase">Correo Electrónico *</label>
                <input 
                  required
                  type="email"
                  placeholder="tu@email.com"
                  className="w-full bg-white/5 border border-gold/20 p-4 text-white focus:outline-none focus:border-gold"
                  value={formData.email}
                  onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                />
              </div>

              <div className="space-y-4 pt-4 border-t border-gold/10">
                <div className="flex justify-between items-center">
                  <label className="font-cinzel text-xs text-gold tracking-widest uppercase">Disfraz / Personaje</label>
                  <button 
                    type="button"
                    onClick={handleAiSuggestion}
                    disabled={aiLoading}
                    className="text-[10px] font-cinzel text-gold flex items-center gap-2 hover:bg-gold/10 px-3 py-1 border border-gold/30 rounded-full transition-all disabled:opacity-50"
                  >
                    <Sparkles size={12} /> {aiLoading ? 'Pensando...' : 'IA Sugerir'}
                  </button>
                </div>
                <div className="relative">
                  <input 
                    type="text"
                    placeholder="Ej: John Wick, Mia Wallace..."
                    className={`w-full bg-white/5 border p-4 text-white focus:outline-none transition-all ${isCharacterReserved ? 'border-red-500/50 focus:border-red-500' : 'border-gold/20 focus:border-gold'}`}
                    value={formData.character}
                    onChange={e => setFormData(p => ({ ...p, character: e.target.value }))}
                  />
                  {isCharacterReserved && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-red-500 text-[10px] font-cinzel tracking-widest">
                      <Lock size={12} /> RESERVADO
                    </div>
                  )}
                </div>

                <div className="p-4 bg-white/5 border border-gold/10 rounded flex items-start gap-4">
                  <Info size={16} className="text-gold shrink-0 mt-0.5" />
                  <p className="text-[10px] text-white/50 leading-relaxed italic">
                    Protocolo de Gala: Se solicita a los distinguidos invitados evitar el personaje de <span className="text-gold font-bold">"{EVENT_DETAILS.RESERVED_CHARACTER}"</span>, ya que es el disfraz seleccionado por la anfitriona principal para la apertura de la noche.
                  </p>
                </div>
                
                {aiSuggestion && (
                  <div className="p-4 bg-gold/5 border border-gold/20 rounded animate-fadeIn">
                    <p className="text-xs text-gold font-bold mb-1">💡 Idea IA: {aiSuggestion.name}</p>
                    <p className="text-[10px] text-white/50 italic leading-relaxed">{aiSuggestion.reason}</p>
                    <button 
                      type="button"
                      onClick={() => {
                        setFormData(p => ({ ...p, character: aiSuggestion.name }));
                        setAiSuggestion(null);
                      }}
                      className="mt-2 text-[8px] uppercase tracking-widest text-gold hover:underline"
                    >
                      Usar esta idea
                    </button>
                  </div>
                )}
              </div>

              <button 
                type="submit"
                disabled={loading || isCharacterReserved}
                className="w-full shine-effect bg-gold-gradient text-black font-cinzel font-bold py-5 tracking-[0.2em] flex items-center justify-center gap-4 disabled:opacity-30 disabled:grayscale transition-all"
              >
                {loading ? 'Procesando...' : (
                  <><span>🎫</span> CONFIRMAR MI REGISTRO</>
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center space-y-8 py-8 animate-fadeIn">
            <div className="flex justify-center">
              <CheckCircle2 size={80} className="text-gold" />
            </div>
            <div>
              <h3 className="font-cinzel text-3xl text-gold-gradient mb-2 uppercase tracking-widest">¡Registro Exitoso!</h3>
              <p className="text-white/60">Tu invitación ha sido confirmada</p>
            </div>

            <div className="bg-white/5 border-2 border-gold/30 p-8 flex flex-col sm:flex-row gap-8 items-center justify-between">
              <div className="text-left space-y-4">
                 <div>
                    <span className="text-[10px] text-gold font-cinzel tracking-widest block mb-1">CÓDIGO DE ACCESO</span>
                    <span className="text-5xl font-cinzel text-white leading-none">{registeredData?.registrationNumber}</span>
                 </div>
                 <div className="font-cinzel text-lg text-white/80 uppercase tracking-tight">
                    {registeredData?.name}
                 </div>
              </div>
              <div className="w-32 h-32 bg-white p-2">
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(JSON.stringify(registeredData))}`} alt="QR" className="w-full h-full" />
              </div>
            </div>

            <p className="text-xs text-white/40 italic">
              📱 Guarda este código QR - Lo necesitarás para entrar a la gala.
            </p>

            <button 
              onClick={onClose}
              className="border border-gold text-gold font-cinzel px-8 py-4 tracking-widest hover:bg-gold/10 transition-colors"
            >
              FINALIZAR
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationModal;
