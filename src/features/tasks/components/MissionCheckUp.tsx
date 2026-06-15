import React, { useState } from 'react';
import type { Mission } from '../types';
import { storage } from '../../../services/storage'; // Wrapper IndexedDB créé au début
import { useApp } from '../../../store/AppContext';
import { ArrowLeft, ChevronDown, ChevronUp, AlertTriangle, Camera, Check } from 'lucide-react';

interface MissionCheckUpProps {
  mission: Mission;
  onBack: () => void;
  onComplete: (missionId: string, comment?: string) => void; // Ajout du paramètre de commentaire
}

export const MissionCheckUp: React.FC<MissionCheckUpProps> = ({ mission, onBack, onComplete }) => {
  const { isOnline } = useApp();
  const [currentMission, setCurrentMission] = useState<Mission>(mission);
  const [openSectionId, setOpenSectionId] = useState<string | null>(mission.sections[0]?.id || null);
  
  // États pour la modale de validation secondaire
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [closureComment, setClosureComment] = useState<string>('');

  const handleToggleTask = async (sectionId: string, taskId: string) => {
    const updatedSections = currentMission.sections.map(section => {
      if (section.id !== sectionId) return section;
      return {
        ...section,
        tasks: section.tasks.map(task => {
          if (task.id !== taskId) return task;
          const newStatus = !task.done;

          storage.saveTask({
            id: task.id,
            title: task.description,
            status: newStatus ? 'completed' : 'pending',
            synced: isOnline
          });

          return { ...task, done: newStatus };
        })
      };
    });

    setCurrentMission({ ...currentMission, sections: updatedSections });
  };

  const allTasks = currentMission.sections.flatMap(s => s.tasks);
  const completedTasksCount = allTasks.filter(t => t.done).length;
  const isFormValid = completedTasksCount === allTasks.length;

  // Gestion du clic principal de clôture
  const handleCloturerClick = () => {
    if (isFormValid) {
      // Si tout est fait, on valide directement sans commentaire
      onComplete(currentMission.id, '');
    } else {
      // Si incomplet, on ouvre la fenêtre d'avertissement
      setIsModalOpen(true);
    }
  };

  // Confirmation finale dans la modale
  const handleConfirmClosure = () => {
    setIsModalOpen(false);
    onComplete(currentMission.id, closureComment);
  };

  return (
    <div className="space-y-6 pb-12 animate-in slide-in-from-right duration-200 relative">
      {/* Barre de retour */}
      <div className="flex items-center space-x-3">
        <button onClick={onBack} className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-600 dark:text-slate-400 active:scale-95 transition-all">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">{currentMission.propertyName}</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Rapport d'inspection terrain</p>
        </div>
      </div>

      {/* CONSIGNES URGENTES */}
      {currentMission.urgentMsg && (
        <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 p-4 rounded-2xl flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-red-700 dark:text-red-400 uppercase tracking-wide">Consigne Prioritaire</h4>
            <p className="text-sm text-red-600 dark:text-red-300 mt-0.5 font-medium">{currentMission.urgentMsg}</p>
          </div>
        </div>
      )}

      {/* PROGRESSION */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
        <div className="flex justify-between text-xs font-bold tracking-wide text-slate-500 dark:text-slate-400">
          <span>Avancement</span>
          <span>{completedTasksCount} / {allTasks.length} Tâches</span>
        </div>
        <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-300 ease-out ${isFormValid ? 'bg-green-500' : 'bg-amber-500'}`}
            style={{ width: `${(completedTasksCount / allTasks.length) * 100}%` }}
          />
        </div>
      </div>

      {/* ACCORDÉONS */}
      <div className="space-y-3">
        {currentMission.sections.map((section) => {
          const isSectionOpen = openSectionId === section.id;
          const sectionDoneCount = section.tasks.filter(t => t.done).length;

          return (
            <div key={section.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm transition-all">
              <button
                onClick={() => setOpenSectionId(isSectionOpen ? null : section.id)}
                className="w-full px-4 py-4 flex items-center justify-between font-semibold text-left active:bg-slate-50 dark:active:bg-slate-800/50"
              >
                <div>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{section.roomName}</span>
                  <span className="text-xs text-slate-400 dark:text-slate-500 font-medium ml-2">
                    ({sectionDoneCount}/{section.tasks.length})
                  </span>
                </div>
                {isSectionOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>

              {isSectionOpen && (
                <div className="border-t border-slate-100 dark:border-slate-800/80 px-4 py-2 bg-slate-50/50 dark:bg-slate-950/20 divide-y divide-slate-100 dark:divide-slate-800/50">
                  {section.tasks.map((task) => (
                    <label 
                      key={task.id} 
                      className={`flex items-start space-x-3 py-3.5 cursor-pointer select-none transition-colors ${task.isUrgent && !task.done ? 'text-red-500' : 'text-slate-700 dark:text-slate-300'}`}
                    >
                      <input type="checkbox" checked={task.done} onChange={() => handleToggleTask(section.id, task.id)} className="sr-only" />
                      <div className={`w-6 h-6 rounded-lg border shrink-0 flex items-center justify-center transition-all mt-0.5
                        ${task.done 
                          ? 'bg-amber-500 border-amber-500 text-slate-900' 
                          : task.isUrgent 
                            ? 'border-red-300 dark:border-red-900 bg-red-50/50 dark:bg-red-950/20' 
                            : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900'
                        }
                      `}>
                        {task.done && <Check className="w-4 h-4 stroke-[3]" />}
                      </div>
                      <div className="flex-1 text-sm leading-tight pt-0.5">
                        <span className={task.done ? 'line-through text-slate-400 dark:text-slate-600' : ''}>{task.description}</span>
                        {task.isUrgent && !task.done && <span className="block text-[10px] font-bold text-red-500 uppercase mt-1">Impératif</span>}
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* BOUTONS ACTIONS ACCESSIBLES EN PERMANENCE */}
      <div className="space-y-3 pt-2">
        <button className="w-full border border-dashed border-slate-300 dark:border-slate-700 hover:border-amber-500 dark:hover:border-amber-500 rounded-2xl py-4 flex items-center justify-center space-x-2 text-sm font-semibold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 active:scale-98 transition-all">
          <Camera className="w-4 h-4" />
          <span>Ajouter des photos de contrôle</span>
        </button>

        <button
          onClick={handleCloturerClick}
          className="w-full py-4 bg-slate-900 dark:bg-amber-500 text-white dark:text-slate-950 rounded-2xl font-bold text-sm tracking-wide shadow-lg hover:opacity-95 transition-all active:scale-98 flex items-center justify-center cursor-pointer shadow-amber-500/5"
        >
          <span>Clôturer l'intervention</span>
        </button>
      </div>

      {/* MODALE DE VALIDATION DE SÉCURITÉ (S'affiche si tâches manquantes) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            
            <div className="flex items-start space-x-3 text-amber-500">
              <AlertTriangle className="w-6 h-6 shrink-0 mt-0.5 text-amber-500" />
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Intervention incomplète</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                  Êtes-vous sûr de vouloir clôturer l'intervention ? Les missions non validées seront remontées pour être effectuées lors d'une prochaine mission.
                </p>
              </div>
            </div>

            {/* Champ Commentaire Optionnel */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Rapport ou motif de non-finalisation (facultatif)
              </label>
              <textarea
                value={closureComment}
                onChange={(e) => setClosureComment(e.target.value)}
                placeholder="Ex: Code d'accès modifié, manque de temps, produits épuisés..."
                rows={3}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 outline-none focus:border-amber-500 dark:focus:border-amber-500 transition-colors resize-none"
              />
            </div>

            {/* Actions de la modale */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                onClick={() => { setIsModalOpen(false); setClosureComment(''); }}
                className="w-full py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-bold text-xs transition-all active:scale-97 cursor-pointer"
              >
                Annuler
              </button>
              <button
                onClick={handleConfirmClosure}
                className="w-full py-3 bg-red-500 text-white rounded-xl font-bold text-xs hover:bg-red-600 transition-all active:scale-97 cursor-pointer shadow-md shadow-red-500/10"
              >
                Valider la clôture
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};