import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  role: 'admin' | 'agent' | 'owner';
  team?: string;
}

export const SIMULATED_USERS: UserProfile[] = [
  { id: 'u_admin', name: 'Alice (Administratrice)', role: 'admin' },
  { id: 'u_jean', name: 'Jean (Nettoyage)', role: 'agent', team: 'Ménage A' },
  { id: 'u_luc', name: 'Luc (Jardinier)', role: 'agent', team: 'Jardin B' },
  { id: 'u_proprietaire', name: 'M. Dupont (Propriétaire)', role: 'owner' }
];

export type TabType = 'agenda' | 'tasks' | 'properties' | 'teams' | 'alerts' | 'profile';
export type ThemeType = 'light' | 'dark';

interface AppContextType {
  user: UserProfile;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  isOnline: boolean;
  theme: ThemeType;
  toggleTheme: () => void;
  switchUser: (userId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(SIMULATED_USERS[0]);
  const [activeTab, setActiveTab] = useState<TabType>('agenda');
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  
  // Récupération du thème initial (localStorage ou préférence système)
  const [theme, setTheme] = useState<ThemeType>(() => {
    const savedTheme = localStorage.getItem('elite_theme') as ThemeType;
    if (savedTheme) return savedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Écoute réseau
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Effet d'application de la classe Dark au document HTML
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('elite_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const switchUser = (userId: string) => {
    const foundUser = SIMULATED_USERS.find(u => u.id === userId);
    if (foundUser) {
      setUser(foundUser);
      setActiveTab(foundUser.role === 'agent' ? 'tasks' : 'agenda');
    }
  };

  return (
    <AppContext.Provider value={{ user, activeTab, setActiveTab, isOnline, theme, toggleTheme, switchUser }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp doit être utilisé dans un AppProvider');
  return context;
};