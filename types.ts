
export enum GuestStatus {
  CONFIRMED = 'CONFIRMADO',
  PENDING = 'PENDIENTE',
  CHECKED_IN = 'DENTRO'
}

export interface Nominee {
  id: string;
  name: string;
  character: string;
  votes: number;
  emoji: string;
}

export interface AwardCategory {
  id: string;
  name: string;
  icon: string;
  description?: string;
  nominees: Nominee[];
}

export interface DresscodeExample {
  character: string;
  movie: string;
  image: string;
}

export interface DresscodeCategory {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  examples: DresscodeExample[];
}

export interface Guest {
  id: string;
  name: string;
  age?: number;
  phone?: string;
  email?: string;
  character: string;
  status: GuestStatus;
  registrationNumber: string;
  qrCode: string;
}

export interface ScheduleItem {
  time: string;
  activity: string;
  description: string;
}

export type ViewMode = 'landing' | 'dashboard' | 'login';
export type DashboardTab = 'guests' | 'checkin' | 'voting' | 'results';
