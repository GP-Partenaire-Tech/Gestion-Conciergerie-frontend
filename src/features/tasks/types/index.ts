export interface TaskItem {
  id: string;
  description: string;
  isUrgent: boolean;
  done: boolean;
}

export interface TaskSection {
  id: string;
  roomName: string; // ex: "Salon", "Chambre Master", "Piscine & Pool House"
  tasks: TaskItem[];
}

export interface Mission {
  id: string;
  propertyName: string; // ex: "Villa Belza"
  location: string; // ex: "Biarritz"
  type: 'Ménage' | 'Jardinage' | 'Piscine' | 'Check-in';
  status: 'pending' | 'completed';
  urgentMsg?: string; // Consigne prioritaire du manager
  sections: TaskSection[];
}