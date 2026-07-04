export type Risk = "low" | "medium" | "high";

export interface Disease {
  id: number;
  name: string;
  lat: number;
  lng: number;
  cases: number;
  risk: Risk;
  /** ISO date string (YYYY-MM-DD) of the latest update */
  date: string;
  prevention: string[];
  vaccineName?: string;
  vaccinated: boolean;
}

export interface Vaccine {
  id: number;
  name: string;
  taken: boolean;
  /** ISO date string when the vaccine was taken (optional) */
  takenAt?: string;
  /** ISO date string when the protection expires (optional) */
  expiresAt?: string;
}

export type VaccineStatus = "valid" | "expiring" | "expired" | "pending";

export interface HealthCenter {
  id: number;
  name: string;
  lat: number;
  lng: number;
  address: string;
  /** Names of the vaccines available at this center */
  vaccines: string[];
  hours?: string;
}

export type AlertKind = "outbreak" | "reminder";

export interface Alert {
  id: number;
  title: string;
  description: string;
  risk: Risk;
  /** ISO date string */
  date: string;
  distanceKm: number;
  /** Distinguishes disease alerts from vaccine reminders */
  kind?: AlertKind;
}

export interface UserProfile {
  name: string;
  email: string;
  city: string;
}
