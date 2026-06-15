import { AppProvider, useApp } from './store/AppContext';
import { PageWrapper } from './components/layout/PageWrapper';
import { Sparkles, ClipboardList, MapPin } from 'lucide-react';

function AppContent() {
  const { user, activeTab } = useApp();

  return (
    <div className="space-y-6">
      {/* COMPOSANT DE BIENVENUE CLIENT */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
        <div className="flex items-center space-x-3 mb-2">
          <div className="bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 w-10 h-10 rounded-2xl flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">Session Active</h2>
            <p className="text-lg font-bold text-slate-900 dark:text-white">{user.name}</p>
          </div>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
          {user.role === 'admin' 
            ? 'Console de supervision connectée. Gestion logistique en cours sur la Côte Basque et le littoral landais.' 
            : `Fiche de route opérationnelle chargée. Équipe de déploiement : ${user.team || 'Générale'}.`
          }
        </p>
      </div>

      {/* ZONE DE GRILLE / AFFICHAGE PRINCIPAL */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm min-h-[320px] flex flex-col justify-center items-center text-center transition-colors">
        <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl flex items-center justify-center mb-4 text-slate-400 dark:text-slate-500 shadow-inner">
          <ClipboardList className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 capitalize">
          Contenu : {activeTab}
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm mb-6">
          La coque applicative et le commutateur dynamique d'éclairage sont opérationnels. Prêt pour l'implantation du module d'inspection.
        </p>
        <div className="flex items-center space-x-2 text-xs font-semibold bg-slate-900 dark:bg-slate-800 border border-slate-800 dark:border-slate-700 text-amber-500 px-4 py-2 rounded-full shadow-md">
          <MapPin className="w-3.5 h-3.5" />
          <span className="tracking-wide">Région Aquitaine</span>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <PageWrapper>
        <AppContent />
      </PageWrapper>
    </AppProvider>
  );
}