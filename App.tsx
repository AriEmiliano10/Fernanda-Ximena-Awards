
import React, { useState, useEffect } from 'react';
import { ViewMode, Guest, AwardCategory, GuestStatus } from './types';
import { INITIAL_AWARD_CATEGORIES, MOCK_GUESTS } from './constants';
import LandingView from './components/LandingView';
import DashboardView from './components/DashboardView';
import RegistrationModal from './components/RegistrationModal';
import AdminLogin from './components/AdminLogin';

const App: React.FC = () => {
  const [view, setView] = useState<ViewMode>('landing');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [guests, setGuests] = useState<Guest[]>(() => {
    const saved = localStorage.getItem('guest_list');
    return saved ? JSON.parse(saved) : MOCK_GUESTS;
  });
  const [categories, setCategories] = useState<AwardCategory[]>(() => {
    const saved = localStorage.getItem('award_categories');
    return saved ? JSON.parse(saved) : INITIAL_AWARD_CATEGORIES;
  });

  useEffect(() => {
    localStorage.setItem('guest_list', JSON.stringify(guests));
  }, [guests]);

  useEffect(() => {
    localStorage.setItem('award_categories', JSON.stringify(categories));
  }, [categories]);

  const handleRegister = (newGuest: Partial<Guest>) => {
    const guest: Guest = {
      id: Date.now().toString(),
      name: newGuest.name || 'Invitado VIP',
      character: newGuest.character || 'Por definir',
      status: GuestStatus.CONFIRMED,
      registrationNumber: String(guests.length + 1).padStart(3, '0'),
      qrCode: `QR_${Date.now()}`,
      ...newGuest
    };
    setGuests(prev => [...prev, guest]);
    setIsModalOpen(false);
  };

  const handleToggleStatus = (id: string) => {
    setGuests(prev => prev.map(g => {
      if (g.id === id) {
        const nextStatus = g.status === GuestStatus.CHECKED_IN ? GuestStatus.CONFIRMED : GuestStatus.CHECKED_IN;
        return { ...g, status: nextStatus };
      }
      return g;
    }));
  };

  const handleVote = (catId: string, nomineeId: string) => {
    setCategories(prev => prev.map(cat => {
      if (cat.id === catId) {
        return {
          ...cat,
          nominees: cat.nominees.map(nom => 
            nom.id === nomineeId ? { ...nom, votes: nom.votes + 1 } : nom
          )
        };
      }
      return cat;
    }));
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setView('dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {view === 'landing' && (
        <LandingView 
          onOpenRegister={() => setIsModalOpen(true)} 
          onEnterAdmin={() => setView('login')}
          categories={categories}
        />
      )}

      {view === 'login' && (
        <AdminLogin 
          onBack={() => setView('landing')} 
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {view === 'dashboard' && isAuthenticated && (
        <DashboardView 
          guests={guests} 
          categories={categories}
          onBack={() => {
            setIsAuthenticated(false);
            setView('landing');
          }} 
          onToggleStatus={handleToggleStatus}
          onVote={handleVote}
        />
      )}

      {isModalOpen && (
        <RegistrationModal 
          onClose={() => setIsModalOpen(false)} 
          onRegister={handleRegister} 
        />
      )}
    </div>
  );
};

export default App;
