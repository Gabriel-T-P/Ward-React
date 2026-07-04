import type { Alert, Vaccine } from "../types";
import { daysUntil, getVaccineStatus } from "./vaccineStatus";
import vaccinesData from "../data/vaccines.json";

/** Offset so reminder ids never collide with alerts.json ids. */
const REMINDER_ID_BASE = 1000;

const today = () => new Date().toISOString().slice(0, 10);

/** Builds dynamic revaccination reminders from expiring/expired vaccines. */
export function getVaccineReminders(): Alert[] {
  const vaccines = vaccinesData as Vaccine[];
  const reminders: Alert[] = [];

  for (const vaccine of vaccines) {
    const status = getVaccineStatus(vaccine);

    if (status === "expiring" && vaccine.expiresAt) {
      const days = daysUntil(vaccine.expiresAt);
      reminders.push({
        id: REMINDER_ID_BASE + vaccine.id,
        title: `Sua vacina de ${vaccine.name} vence em breve`,
        description: `A protecao da vacina de ${vaccine.name} vence em ${days} ${
          days === 1 ? "dia" : "dias"
        }. Agende a proxima dose para se manter protegido.`,
        risk: "medium",
        date: today(),
        distanceKm: 0,
        kind: "reminder",
      });
    } else if (status === "expired") {
      reminders.push({
        id: REMINDER_ID_BASE + vaccine.id,
        title: `Sua vacina de ${vaccine.name} esta vencida`,
        description: `A protecao da vacina de ${vaccine.name} venceu. Procure um centro de saude para se revacinar o quanto antes.`,
        risk: "high",
        date: vaccine.expiresAt ?? today(),
        distanceKm: 0,
        kind: "reminder",
      });
    }
  }

  return reminders;
}
