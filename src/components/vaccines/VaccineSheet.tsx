import { CalendarCheck, MapPin, Navigation, ShieldCheck } from "lucide-react";
import type { Disease, HealthCenter, Vaccine } from "../../types";
import { BottomSheet } from "../ui/BottomSheet";
import { formatShortDate } from "../../lib/date";
import {
  getVaccineStatus,
  getVaccineStatusMeta,
  getValidityText,
} from "../../lib/vaccineStatus";
import diseasesData from "../../data/diseases.json";
import centersData from "../../data/healthCenters.json";

const diseases = diseasesData as Disease[];
const centers = centersData as HealthCenter[];

interface VaccineSheetProps {
  vaccine: Vaccine | null;
  onClose: () => void;
  onWhereToTake: (vaccineName: string) => void;
}

export function VaccineSheet({
  vaccine,
  onClose,
  onWhereToTake,
}: VaccineSheetProps) {
  const protectsAgainst = vaccine
    ? diseases.filter((d) => d.vaccineName === vaccine.name).map((d) => d.name)
    : [];
  const availableAt = vaccine
    ? centers.filter((c) => c.vaccines.includes(vaccine.name))
    : [];

  return (
    <BottomSheet open={vaccine !== null} onClose={onClose} title={vaccine?.name}>
      {vaccine && (
        <div className="flex flex-col gap-5">
          <StatusBadge vaccine={vaccine} />

          <div className="grid grid-cols-2 gap-3">
            <Stat
              icon={<CalendarCheck size={18} />}
              label="Aplicacao"
              value={vaccine.takenAt ? formatShortDate(vaccine.takenAt) : "-"}
            />
            <Stat
              icon={<ShieldCheck size={18} />}
              label="Validade"
              value={getValidityText(vaccine)}
            />
          </div>

          {protectsAgainst.length > 0 && (
            <section>
              <SectionTitle>Protege contra</SectionTitle>
              <div className="flex flex-wrap gap-2">
                {protectsAgainst.map((name) => (
                  <span
                    key={name}
                    className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-ink"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </section>
          )}

          <section>
            <SectionTitle>Onde encontrar</SectionTitle>
            {availableAt.length > 0 ? (
              <ul className="flex flex-col gap-2">
                {availableAt.map((center) => (
                  <li
                    key={center.id}
                    className="flex items-start gap-2.5 text-sm text-ink-soft"
                  >
                    <MapPin size={16} className="mt-0.5 shrink-0 text-primary" />
                    <span>
                      <span className="font-medium text-ink">
                        {center.name}
                      </span>
                      <br />
                      {center.address}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-ink-soft">
                Nenhum centro proximo com esta vacina.
              </p>
            )}
          </section>

          {availableAt.length > 0 && (
            <button
              onClick={() => onWhereToTake(vaccine.name)}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-primary text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:brightness-105 active:scale-[0.99]"
            >
              <Navigation size={18} />
              Onde tomar
            </button>
          )}
        </div>
      )}
    </BottomSheet>
  );
}

function StatusBadge({ vaccine }: { vaccine: Vaccine }) {
  const meta = getVaccineStatusMeta(getVaccineStatus(vaccine));
  return (
    <span
      className="inline-flex items-center gap-1.5 self-start rounded-full px-2.5 py-1 text-xs font-semibold"
      style={{ backgroundColor: meta.softBg, color: meta.color }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: meta.color }}
      />
      {meta.label}
    </span>
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
      <p className="mt-2 text-sm font-bold text-ink">{value}</p>
      <p className="text-xs text-ink-soft">{label}</p>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="mb-3 text-sm font-bold text-ink">{children}</h3>;
}
