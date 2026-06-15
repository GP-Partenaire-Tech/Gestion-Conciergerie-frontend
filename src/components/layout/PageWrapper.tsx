import React, { useState } from 'react';
import { useApp, SIMULATED_USERS } from '../../store/AppContext';
import { 
  Calendar, Home, Users, CheckSquare, Bell, User, WifiOff, Sparkles, Sun, Moon, Terminal, ChevronUp, ChevronDown
} from 'lucide-react';

interface PageWrapperProps {
  children: React.ReactNode;
}

export const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  const { user, activeTab, setActiveTab, isOnline, theme, toggleTheme, switchUser } = useApp();
  const [showDevTools, setShowDevTools] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans select-none antialiased transition-colors duration-200">
      
      {/* BANDEAU HORS-LIGNE */}
      {!isOnline && (
        <div className="bg-amber-500 text-slate-900 text-xs font-bold py-2 px-4 flex items-center justify-center space-x-2 shadow-md z-50">
          <WifiOff className="w-4 h-4 text-slate-900" />
          <span>Mode hors-ligne actif. Synchronisation en attente.</span>
        </div>
      )}

      {/* HEADER PROFESSIONNEL */}
      <header className="bg-slate-900 dark:bg-slate-950 text-white border-b border-slate-800 shrink-0">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          
          {/* Logo Brand */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-slate-900" />
            </div>
            <div>
              <h1 className="text-sm font-light tracking-widest uppercase">Élite</h1>
              <p className="text-[10px] text-amber-500 tracking-wider font-semibold uppercase leading-none">Conciergerie</p>
            </div>
          </div>

          {/* Bouton Mode Jour / Nuit */}
          <button
            onClick={toggleTheme}
            aria-label="Changer de thème"
            className="p-2 bg-slate-800 dark:bg-slate-900 rounded-xl border border-slate-700 hover:border-amber-500 text-amber-500 transition-all active:scale-95"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* BODY DE L'APPLICATION */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto relative overflow-hidden">
        
        {/* SIDEBAR PC (Admin uniquement) */}
        {user.role === 'admin' && (
          <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4 shrink-0">
            <nav className="space-y-1 flex-1">
              <SidebarLink icon={<Calendar />} label="Agenda & Plannings" active={activeTab === 'agenda'} onClick={() => setActiveTab('agenda')} />
              <SidebarLink icon={<Home />} label="Biens & Villas" active={activeTab === 'properties'} onClick={() => setActiveTab('properties')} />
              <SidebarLink icon={<Users />} label="Équipes terrain" active={activeTab === 'teams'} onClick={() => setActiveTab('teams')} />
            </nav>
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center space-x-3 p-2 text-slate-600 dark:text-slate-400">
                <div className="bg-slate-100 dark:bg-slate-800 w-8 h-8 rounded-full flex items-center justify-center"><User className="w-4 h-4" /></div>
                <div className="truncate">
                  <p className="text-xs font-semibold">{user.name}</p>
                  <p className="text-[10px] text-slate-400">Gérant Élite</p>
                </div>
              </div>
            </div>
          </aside>
        )}

        {/* ZONE DE CONTENU GLOBAL */}
        <main className="flex-1 overflow-y-auto pb-32 md:pb-16 px-4 py-6">
          <div className="max-w-4xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* NAV BARRE BASSE SMARTPHONE (iOS) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 pb-safe pt-2 px-6 flex justify-around items-center z-40 shadow-[0_-8px_24px_rgba(0,0,0,0.04)]">
        {user.role === 'agent' ? (
          <>
            <TabBarButton icon={<CheckSquare />} label="Missions" active={activeTab === 'tasks'} onClick={() => setActiveTab('tasks')} />
            <TabBarButton icon={<Bell />} label="Alertes" active={activeTab === 'alerts'} onClick={() => setActiveTab('alerts')} badge={1} />
            <TabBarButton icon={<User />} label="Profil" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
          </>
        ) : (
          <>
            <TabBarButton icon={<Calendar />} label="Agenda" active={activeTab === 'agenda'} onClick={() => setActiveTab('agenda')} />
            <TabBarButton icon={<Home />} label="Biens" active={activeTab === 'properties'} onClick={() => setActiveTab('properties')} />
            <TabBarButton icon={<Users />} label="Équipes" active={activeTab === 'teams'} onClick={() => setActiveTab('teams')} />
          </>
        )}
      </nav>

      {/* PANNEAU DE SIMULATION TECHNIQUE (DEV TOOLS RETRACTABLE) */}
      <div className="fixed bottom-16 md:bottom-4 right-4 z-50 flex flex-col items-end">
        {showDevTools && (
          <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-slate-700 mb-2 w-64 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center space-x-2 text-xs font-bold text-amber-500 mb-3 border-b border-slate-800 pb-2">
              <Terminal className="w-3.5 h-3.5" />
              <span>CONSOLE DE SIMULATION DEV</span>
            </div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Changer de profil métier :</label>
            <select
              value={user.id}
              onChange={(e) => switchUser(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-xs rounded-xl px-3 py-2 text-white outline-none font-medium cursor-pointer"
            >
              {SIMULATED_USERS.map((u) => (
                <option key={u.id} value={u.id} className="text-slate-900">{u.name}</option>
              ))}
            </select>
          </div>
        )}
        <button
          onClick={() => setShowDevTools(!showDevTools)}
          className="bg-slate-900 text-slate-400 hover:text-white border border-slate-800 p-2.5 rounded-full shadow-lg flex items-center justify-center transition-all active:scale-95"
        >
          {showDevTools ? <ChevronDown className="w-4 h-4 text-amber-500" /> : <ChevronUp className="w-4 h-4" />}
        </button>
      </div>

      <style dangerouslySetInnerHTML={{__html: `.pb-safe { padding-bottom: env(safe-area-inset-bottom, 16px); }`}} />
    </div>
  );
};

const SidebarLink: React.FC<{ icon: React.ReactNode; label: string; active: boolean; onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-sm transition-all
      ${active 
        ? 'bg-slate-900 dark:bg-amber-500 text-amber-400 dark:text-slate-950 shadow-md' 
        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
      }
    `}
  >
    {React.cloneElement(icon as React.ReactElement, { className: 'w-5 h-5 shrink-0' })}
    <span>{label}</span>
  </button>
);

const TabBarButton: React.FC<{ icon: React.ReactNode; label: string; active: boolean; onClick: () => void; badge?: number }> = ({ icon, label, active, onClick, badge }) => (
  <button onClick={onClick} className={`flex flex-col items-center py-1 px-3 relative ${active ? 'text-amber-500' : 'text-slate-400 dark:text-slate-500'}`}>
    <div className="relative">
      {React.cloneElement(icon as React.ReactElement, { className: 'w-6 h-6' })}
      {badge && badge > 0 && (
        <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-white dark:border-slate-900">
          {badge}
        </span>
      )}
    </div>
    <span className="text-[10px] font-medium mt-1 tracking-wide">{label}</span>
  </button>
);