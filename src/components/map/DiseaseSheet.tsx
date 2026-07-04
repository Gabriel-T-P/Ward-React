import { Activity, CalendarDays, ShieldCheck, Syringe } from "lucide-react";
import type { Disease } from "../../types";
import { BottomSheet } from "../ui/BottomSheet";
import { RiskBadge } from "../ui/Badge";
import { formatDate } from "../../lib/date";

interface DiseaseSheetProps {
  disease: Disease | null;
  onClose: () => void;
}

export function DiseaseSheet({ disease, onClose }: DiseaseSheetProps) {
  return (
    <BottomSheet open={disease !== null} onClose={onClose} title={disease?.name}>
      {disease && (
        <div className="flex flex-col gap-5">
          <RiskBadge risk={disease.risk} />

          <div className="grid grid-cols-2 gap-3">
            <Stat
              icon={<Activity size={18} />}
              label="Casos"
              value={String(disease.cases)}
            />
            <Stat
              icon={<CalendarDays size={18} />}
              label="Atualizado"
              value={formatDate(disease.date)}
            />
          </div>

          <section>
            <SectionTitle icon={<ShieldCheck size={16} />}>
              Como se prevenir
            </SectionTitle>
            <ul className="flex flex-col gap-2">
              {disease.prevention.map((tip) => (
                <li
                  key={tip}
                  className="flex gap-2.5 text-sm leading-relaxed text-ink-soft"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {tip}
                </li>
              ))}
            </ul>
          </section>

          <section className="flex items-center gap-3 rounded-2xl bg-surface p-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-card text-ink-soft">
              <Syringe size={18} />
            </span>
            <div className="text-sm">
              <p className="font-semibold text-ink">
                {disease.vaccineName
                  ? disease.vaccinated
                    ? "Voce esta vacinado"
                    : "Vacina disponivel"
                  : "Sem vacina especifica"}
              </p>
              <p className="text-ink-soft">
                {disease.vaccineName
                  ? disease.vaccinated
                    ? `${disease.vaccineName} em dia`
                    : `${disease.vaccineName} pendente`
                  : "Foque nas medidas de prevencao"}
              </p>
            </div>
          </section>
        </div>
      )}
    </BottomSheet>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-surface p-4">
      <span className="text-ink-soft">{icon}</span>
      <p className="mt-2 text-lg font-bold text-ink">{value}</p>
      <p className="text-xs text-ink-soft">{label}</p>
    </div>
  );
}

function SectionTitle({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-ink">
      <span className="text-primary">{icon}</span>
      {children}
    </h3>
  );
}
