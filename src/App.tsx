import { useState } from 'react';
import { AppProvider, useApp } from './store/AppContext';
import { PageWrapper } from './components/layout/PageWrapper';
import type { Mission } from './features/tasks/types';
import { MissionList } from './features/tasks/components/MissionList';
import { MissionCheckUp } from './features/tasks/components/MissionCheckUp';
import { ClipboardList } from 'lucide-react';

// Données initiales simulées pour les missions
const INITIAL_MISSIONS: Mission[] = [
  {
    id: 'm_1',
    propertyName: 'Villa Belza',
    location: 'Biarritz - Côte des Basques',
    type: 'Ménage',
    status: 'pending',
    urgentMsg: 'Nettoyage minutieux des baies vitrées face à l\'océan requis, vents forts hier.',
    sections: [
      {
        id: 's1',
        roomName: 'Grand Salon Réception',
        tasks: [
          { id: 't1', description: 'Aérer la pièce 30 minutes minimum', isUrgent: false, done: false },
          { id: 't2', description: 'Dépoussiérer le mobilier en chêne et luminaires', isUrgent: false, done: false },
          { id: 't3', description: 'Nettoyer les traces de sel sur les baies vitrées', isUrgent: true, done: false }
        ]
      },
      {
        id: 's2',
        roomName: 'Suite Parentale - Étage 1',
        tasks: [
          { id: 't4', description: 'Changement de la literie (Draps de lin blanc)', isUrgent: true, done: false },
          { id: 't5', description: 'Vérifier le fonctionnement du coffre-fort', isUrgent: false, done: false }
        ]
      }
    ]
  },
  {
    id: 'm_2',
    propertyName: 'Propriété des Landes',
    location: 'Hossegor - Lac',
    type: 'Piscine',
    status: 'pending',
    sections: [
      {
        id: 's3',
        roomName: 'Espace Bassin & Pool House',
        tasks: [
          { id: 't6', description: 'Passer l\'épuisette pour retirer les aiguilles de pin', isUrgent: true, done: false },
          { id: 't7', description: 'Analyser le taux de chlore et pH de l\'eau', isUrgent: true, done: false },
          { id: 't8', description: 'Nettoyer et ranger les transats extérieurs', isUrgent: false, done: false }
        ]
      }
    ]
  }
];
// Composant principal de l'application
function AppContent() {
  const { user, activeTab } = useApp();
  const [missions, setMissions] = useState<Mission[]>(INITIAL_MISSIONS);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);

  // Mise à jour de la clôture avec prise en compte du commentaire d'écart
  const handleCompleteMission = (missionId: string, comment?: string) => {
    setMissions(prev => prev.map(m => m.id === missionId ? { ...m, status: 'completed' } : m));
    
    if (comment && comment.trim() !== '') {
      console.log(`⚠️ ALERTE TERRAIN - Mission [${missionId}] clôturée avec anomalies : "${comment}"`);
    } else {
      console.log(`✅ SUIVI TERRAIN - Mission [${missionId}] clôturée avec succès (100% terminé).`);
    }

    setSelectedMission(null);
  };

  if (activeTab === 'tasks' && user.role === 'agent') {
    if (selectedMission) {
      return (
        <MissionCheckUp 
          mission={selectedMission} 
          onBack={() => setSelectedMission(null)} 
          onComplete={handleCompleteMission}
        />
      );
    }
    return (
      <MissionList 
        missions={missions} 
        onSelectMission={(m) => setSelectedMission(m)} 
      />
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 text-center min-h-[300px] flex flex-col justify-center items-center">
      <ClipboardList className="w-12 h-12 text-slate-300 dark:text-slate-700 mb-3" />
      <h3 className="text-lg font-bold text-slate-900 dark:text-white capitalize">Panneau : {activeTab}</h3>
      <p className="text-slate-500 text-sm max-w-xs mt-1">L'espace {activeTab} pour le rôle {user.role} sera relié aux contrôleurs de l'API Symfony très prochainement.</p>
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