import React from 'react';
import type { Mission } from '../types';
import { MapPin, Clock, AlertTriangle, ChevronRight, CheckCircle2 } from 'lucide-react';

interface MissionListProps {
  missions: Mission[];
  onSelectMission: (mission: Mission) => void;
}

export const MissionList: React.FC<MissionListProps> = ({ missions, onSelectMission }) => {
  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Vos Interventions</h2>
        <span className="text-xs font-semibold bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2.5 py-1 rounded-full">
          {missions.filter(m => m.status === 'completed').length}/{missions.length} Faite(s)
        </span>
      </div>

      {missions.length === 0 ? (
        <p className="text-slate-500 text-sm text-center py-8">Aucune mission assignée pour le moment.</p>
      ) : (
        <div className="space-y-3">
          {missions.map((mission) => (
            <button
              key={mission.id}
              onClick={() => onSelectMission(mission)}
              className="w-full text-left bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-amber-500 dark:hover:border-amber-500 transition-all flex items-center justify-between active:scale-[0.99]"
            >
              <div className="space-y-2 flex-1 min-w-0 pr-4">
                {/* Badge Type de mission */}
                <div className="flex items-center space-x-2">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md
                    ${mission.status === 'completed'
                      ? 'bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-900'
                      : 'bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900'
                    }
                  `}>
                    {mission.type}
                  </span>
                  {mission.urgentMsg && (
                    <span className="flex items-center text-[10px] font-bold text-red-500 uppercase tracking-wide bg-red-50 dark:bg-red-950/30 px-1.5 py-0.5 rounded">
                      <AlertTriangle className="w-3 h-3 mr-1" /> Urgent
                    </span>
                  )}
                </div>

                {/* Nom propriété */}
                <h3 className="text-base font-bold text-slate-900 dark:text-white truncate">
                  {mission.propertyName}
                </h3>

                {/* Localisation et heure */}
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" /> {mission.location}</span>
                  <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1 text-slate-400" /> 09:00</span>
                </div>
              </div>

              {/* Statut Icone à droite */}
              <div className="shrink-0 text-slate-400">
                {mission.status === 'completed' ? (
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-slate-300 dark:text-slate-700" />
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};