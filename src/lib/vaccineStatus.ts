import type { Vaccine, VaccineStatus } from "../types";
import { formatShortDate } from "./date";

const EXPIRING_WINDOW_DAYS = 60;

/** Whole days between today and an ISO date (negative if in the past). */
export function daysUntil(iso: string): number {
  const target = new Date(`${iso}T00:00:00`).getTime();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.round((target - today.getTime()) / 86_400_000);
}

export function getVaccineStatus(vaccine: Vaccine): VaccineStatus {
  if (!vaccine.taken) return "pending";
  if (!vaccine.expiresAt) return "valid";
  const days = daysUntil(vaccine.expiresAt);
  if (days < 0) return "expired";
  if (days <= EXPIRING_WINDOW_DAYS) return "expiring";
  return "valid";
}

export interface StatusMeta {
  label: string;
  color: string;
  softBg: string;
}

export const VACCINE_STATUS_META: Record<VaccineStatus, StatusMeta> = {
  valid: { label: "Em dia", color: "#22c55e", softBg: "rgba(34, 197, 94, 0.12)" },
  expiring: {
    label: "Vencendo",
    color: "#f59e0b",
    softBg: "rgba(245, 158, 11, 0.14)",
  },
  expired: {
    label: "Vencida",
    color: "#ef4444",
    softBg: "rgba(239, 68, 68, 0.12)",
  },
  pending: {
    label: "Pendente",
    color: "#9ca3af",
    softBg: "rgba(107, 114, 128, 0.1)",
  },
};

export function getVaccineStatusMeta(status: VaccineStatus): StatusMeta {
  return VACCINE_STATUS_META[status];
}

/** Whether the vaccine currently counts as active protection. */
export function isProtected(vaccine: Vaccine): boolean {
  const status = getVaccineStatus(vaccine);
  return status === "valid" || status === "expiring";
}

/** Human friendly validity description for a vaccine. */
export function getValidityText(vaccine: Vaccine): string {
  const status = getVaccineStatus(vaccine);
  if (status === "pending") return "Pendente";
  if (!vaccine.expiresAt) return "Protecao sem prazo definido";
  const days = daysUntil(vaccine.expiresAt);
  if (status === "expired") return "Protecao vencida";
  if (status === "expiring") {
    return `Vence em ${days} ${days === 1 ? "dia" : "dias"}`;
  }
  return `Valida ate ${formatShortDate(vaccine.expiresAt)}`;
}
