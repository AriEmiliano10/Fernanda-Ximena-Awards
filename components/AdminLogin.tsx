
import React, { useState } from 'react';
import { X, Lock, User, ArrowRight } from 'lucide-react';

interface Props {
  onBack: () => void;
  onLoginSuccess: () => void;
}

const AdminLogin: React.FC<Props> = ({ onBack, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      onLoginSuccess();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-black relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)] pointer-events-none"></div>
      
      <div className="relative w-full max-w-md animate-fadeIn">
        <button 
          onClick={onBack}
          className="absolute -top-12 left-0 text-white/30 hover:text-gold flex items-center gap-2 font-cinzel text-[10px] tracking-widest transition-all"
        >
          <X size={14} /> VOLVER A LA GALA
        </button>

        <div className="bg-[#0c0c0c] border border-gold/20 p-10 sm:p-12 shadow-2xl space-y-10">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 border border-gold/30 rounded-full mb-4">
              <Lock size={24} className="text-gold" />
            </div>
            <h2 className="font-cinzel text-2xl text-gold-gradient tracking-widest uppercase font-black">Admin Access</h2>
            <p className="font-playfair italic text-white/40 text-sm">Ingrese credenciales de seguridad</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2 group">
              <label className="font-cinzel text-[10px] text-gold/60 tracking-widest uppercase">Usuario</label>
              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-gold transition-colors" />
                <input 
                  autoFocus
                  required
                  type="text"
                  placeholder="admin"
                  className="w-full bg-white/5 border border-white/10 p-4 pl-12 text-white focus:outline-none focus:border-gold/50 transition-all font-cinzel text-sm"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2 group">
              <label className="font-cinzel text-[10px] text-gold/60 tracking-widest uppercase">Contraseña</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-gold transition-colors" />
                <input 
                  required
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 p-4 pl-12 text-white focus:outline-none focus:border-gold/50 transition-all font-cinzel text-sm"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-[10px] font-cinzel text-center tracking-widest animate-pulse">
                ERROR: CREDENCIALES INVÁLIDAS
              </p>
            )}

            <button 
              type="submit"
              className="w-full bg-gold-gradient text-black font-cinzel font-bold py-5 tracking-[0.3em] flex items-center justify-center gap-4 hover:scale-[1.02] transition-transform active:scale-95 shadow-xl"
            >
              AUTENTICAR <ArrowRight size={18} />
            </button>
          </form>

          <p className="text-center text-[8px] text-white/10 font-cinzel tracking-[0.2em] uppercase">
            Sistema Encriptado de Gestión de Eventos VIP
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
