
import React, { useState } from 'react';
import { Guest, AwardCategory, DashboardTab, GuestStatus } from '../types';
import { Users, Scan, Vote, BarChart3, ChevronLeft, Search, Trophy } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface Props {
  guests: Guest[];
  categories: AwardCategory[];
  onBack: () => void;
  onToggleStatus: (id: string) => void;
  onVote: (catId: string, nomId: string) => void;
}

const DashboardView: React.FC<Props> = ({ guests, categories, onBack, onToggleStatus, onVote }) => {
  const [tab, setTab] = useState<DashboardTab>('guests');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGuests = guests.filter(g => 
    g.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    g.character.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-gold/20 p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-gold hover:text-white transition-colors flex items-center gap-2 font-cinzel text-xs uppercase">
            <ChevronLeft size={16} /> Volver
          </button>
          <h2 className="font-cinzel text-xl text-gold-gradient tracking-[0.2em] font-black uppercase">Hollywood Admin</h2>
        </div>
        
        <nav className="flex gap-2">
          {[
            { id: 'guests', label: 'Invitados', icon: Users },
            { id: 'checkin', label: 'Check-In', icon: Scan },
            { id: 'voting', label: 'Votaciones', icon: Vote },
            { id: 'results', label: 'Resultados', icon: BarChart3 }
          ].map(item => (
            <button 
              key={item.id}
              onClick={() => setTab(item.id as DashboardTab)}
              className={`flex items-center gap-2 px-4 py-2 rounded font-cinzel text-[10px] tracking-widest transition-all ${tab === item.id ? 'bg-gold text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]' : 'text-white/50 hover:bg-white/5'}`}
            >
              <item.icon size={14} /> <span className="hidden sm:inline">{item.label}</span>
            </button>
          ))}
        </nav>
      </header>

      {/* Content */}
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        {tab === 'guests' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <h3 className="font-cinzel text-2xl">Control de Invitados</h3>
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                <input 
                  type="text" 
                  placeholder="Buscar por nombre o personaje..."
                  className="w-full bg-white/5 border border-white/10 pl-12 pr-4 py-2 rounded-full focus:outline-none focus:border-gold transition-all text-sm"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/5 font-cinzel text-gold text-xs tracking-widest uppercase">
                  <tr>
                    <th className="p-4">Nombre</th>
                    <th className="p-4">Personaje</th>
                    <th className="p-4">Estatus</th>
                    <th className="p-4 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredGuests.map(g => (
                    <tr key={g.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 font-medium">{g.name}</td>
                      <td className="p-4 italic text-white/50">{g.character}</td>
                      <td className="p-4">
                         <span className={`px-2 py-1 text-[10px] font-bold border rounded ${
                           g.status === GuestStatus.CHECKED_IN ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                           g.status === GuestStatus.CONFIRMED ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                           'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                         }`}>
                           {g.status}
                         </span>
                      </td>
                      <td className="p-4 text-right">
                         <button 
                           onClick={() => onToggleStatus(g.id)}
                           className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 border transition-all ${
                             g.status === GuestStatus.CHECKED_IN ? 'border-red-500/30 text-red-400 hover:bg-red-500/10' : 'border-gold/30 text-gold hover:bg-gold/10'
                           }`}
                         >
                           {g.status === GuestStatus.CHECKED_IN ? 'Cancelar Entrada' : 'Marcar Entrada'}
                         </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'checkin' && (
          <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-8 animate-fadeIn">
            <div className="relative w-64 h-64 border-2 border-gold/30 rounded-3xl overflow-hidden bg-black flex items-center justify-center">
              <div className="absolute top-0 left-0 w-full h-1 bg-gold shadow-[0_0_20px_rgba(212,175,55,1)] animate-scan"></div>
              <span className="font-cinzel italic text-white/20 text-sm p-8">MODO ESCÁNER ACTIVO<br/>(Cámara Simulada)</span>
            </div>
            <div className="space-y-2">
              <h4 className="font-cinzel text-xl text-gold uppercase tracking-widest">Apunta el Código QR</h4>
              <p className="max-w-xs text-white/40 text-sm font-light">
                Utiliza la cámara para validar entradas automáticamente y asignar números de participante.
              </p>
            </div>
            <style>{`
              @keyframes scan {
                0%, 100% { top: 0; }
                50% { top: calc(100% - 4px); }
              }
              .animate-scan { animation: scan 3s infinite linear; }
            `}</style>
          </div>
        )}

        {tab === 'voting' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn">
            {categories.map(cat => (
              <div key={cat.id} className="bg-white/5 border border-white/10 p-8 space-y-6">
                <div className="flex items-center gap-4 pb-4 border-b border-white/10">
                  <span className="text-3xl">{cat.icon}</span>
                  <h3 className="font-cinzel text-xl text-gold-gradient uppercase">{cat.name}</h3>
                </div>
                <div className="grid gap-3">
                  {cat.nominees.map(nom => (
                    <button 
                      key={nom.id}
                      onClick={() => onVote(cat.id, nom.id)}
                      className="group flex justify-between items-center p-4 bg-black/40 border border-white/10 hover:border-gold/50 transition-all text-left active:scale-95"
                    >
                      <div>
                        <div className="font-bold text-white group-hover:text-gold transition-colors">{nom.name}</div>
                        <div className="text-xs text-white/40 italic">como {nom.character}</div>
                      </div>
                      <div className="font-cinzel text-gold text-lg bg-gold/5 px-4 py-1 border border-gold/20">
                         {nom.votes}
                      </div>
                    </button>
                  ))}
                </div>
                <button className="w-full py-4 border-2 border-dashed border-white/10 text-white/20 font-cinzel text-xs hover:border-gold/30 hover:text-gold transition-all">
                  + AÑADIR NOMINADO
                </button>
              </div>
            ))}
          </div>
        )}

        {tab === 'results' && (
          <div className="space-y-12 animate-fadeIn">
            <div className="text-center">
              <h3 className="font-cinzel text-4xl text-gold-gradient uppercase mb-2">Ranking en Vivo</h3>
              <p className="text-white/40 text-sm">Monitorea la tendencia de votos por categoría</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {categories.map(cat => {
                const sortedNominees = [...cat.nominees].sort((a, b) => b.votes - a.votes);
                const winner = sortedNominees[0];
                const chartData = cat.nominees.map(n => ({ name: n.name, votos: n.votes }));

                return (
                  <div key={cat.id} className="relative p-10 bg-gradient-to-br from-gold/10 to-transparent border border-gold/20 shadow-2xl overflow-hidden group">
                    <Trophy className="absolute -top-4 -right-4 w-32 h-32 text-gold opacity-5 group-hover:opacity-10 transition-opacity" />
                    
                    <div className="relative z-10 space-y-8">
                      <div className="space-y-1">
                        <p className="text-gold font-cinzel text-[10px] tracking-widest uppercase">{cat.name}</p>
                        <h4 className="text-2xl font-cinzel uppercase">Líder Actual</h4>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="w-24 h-24 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center text-4xl shadow-xl">
                          {winner.emoji}
                        </div>
                        <div className="flex-1">
                          <div className="font-cinzel text-2xl text-gold-gradient">{winner.name}</div>
                          <div className="text-xs text-white/40 italic mb-2">como {winner.character}</div>
                          <div className="flex items-baseline gap-2">
                             <span className="text-4xl font-black text-white">{winner.votes}</span>
                             <span className="text-[10px] text-gold uppercase tracking-widest font-bold">Puntos</span>
                          </div>
                        </div>
                      </div>

                      <div className="h-48 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={chartData} layout="vertical">
                            <XAxis type="number" hide />
                            <YAxis dataKey="name" type="category" width={100} stroke="#D4AF37" fontSize={10} axisLine={false} tickLine={false} />
                            <Tooltip 
                               contentStyle={{backgroundColor: '#000', border: '1px solid #D4AF37', borderRadius: '4px'}}
                               cursor={{fill: 'rgba(212,175,55,0.05)'}}
                            />
                            <Bar dataKey="votos" radius={[0, 4, 4, 0]}>
                              {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.name === winner.name ? '#D4AF37' : '#ffffff20'} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="text-center pt-8">
               <button className="font-cinzel bg-red-900/50 border border-red-500 text-white px-12 py-4 tracking-widest hover:bg-red-700 transition-all uppercase">
                 Cerrar Votaciones y Definir Ganadores
               </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardView;
