import { useMemo, useState } from "react";
import { ChevronRight, TriangleAlert, Syringe } from "lucide-react";
import { Screen } from "../components/layout/Screen";
import { BottomSheet } from "../components/ui/BottomSheet";
import { RiskBadge } from "../components/ui/Badge";
import { getRiskMeta } from "../lib/risk";
import { formatDate } from "../lib/date";
import { getVaccineReminders } from "../lib/vaccineReminders";
import { usePremium } from "../context/subscription";
import type { Alert } from "../types";
import alertsData from "../data/alerts.json";

const baseAlerts = (alertsData as Alert[])
  .slice()
  .sort((a, b) => b.date.localeCompare(a.date));

export function Alerts() {
  const { isPremium } = usePremium();
  const [selected, setSelected] = useState<Alert | null>(null);

  // Vaccine reminders are a premium perk; disease alerts stay free.
  const alerts = useMemo(
    () => (isPremium ? [...getVaccineReminders(), ...baseAlerts] : baseAlerts),
    [isPremium],
  );

  return (
    <Screen title="Alertas" subtitle="Riscos monitorados perto de voce.">
      <ul className="flex flex-col gap-3">
        {alerts.map((alert) => {
          const meta = getRiskMeta(alert.risk);
          const isReminder = alert.kind === "reminder";
          return (
            <li key={alert.id}>
              <button
                onClick={() => setSelected(alert)}
                className="flex w-full items-center gap-3 rounded-2xl bg-card p-4 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: meta.softBg, color: meta.color }}
                >
                  {isReminder ? (
                    <Syringe size={20} />
                  ) : (
                    <TriangleAlert size={20} />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink">
                    {alert.title}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-ink-soft">
                    {isReminder
                      ? "Lembrete de vacina"
                      : `${formatDate(alert.date)} \u00b7 a ${alert.distanceKm} km`}
                  </p>
                </div>
                <ChevronRight size={18} className="shrink-0 text-ink-soft" />
              </button>
            </li>
          );
        })}
      </ul>

      <BottomSheet
        open={selected !== null}
        onClose={() => setSelected(null)}
        title={selected?.title}
      >
        {selected && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <RiskBadge risk={selected.risk} />
              <span className="text-xs text-ink-soft">
                {selected.kind === "reminder"
                  ? "Lembrete de vacina"
                  : `${formatDate(selected.date)} \u00b7 a ${selected.distanceKm} km de voce`}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-ink-soft">
              {selected.description}
            </p>
          </div>
        )}
      </BottomSheet>
    </Screen>
  );
}
