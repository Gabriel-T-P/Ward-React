import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Crown, Plus } from "lucide-react";
import { Screen } from "../components/layout/Screen";
import { PremiumGate } from "../components/premium/PremiumGate";
import { VaccineSheet } from "../components/vaccines/VaccineSheet";
import {
  getVaccineStatus,
  getVaccineStatusMeta,
  getValidityText,
  isProtected,
} from "../lib/vaccineStatus";
import type { Vaccine, VaccineStatus } from "../types";
import vaccinesData from "../data/vaccines.json";

const vaccines = vaccinesData as Vaccine[];

const GROUPS: { title: string; statuses: VaccineStatus[] }[] = [
  { title: "Em dia", statuses: ["valid"] },
  { title: "Vencendo", statuses: ["expiring"] },
  { title: "Pendentes", statuses: ["pending", "expired"] },
];

export function Vaccines() {
  return (
    <PremiumGate
      title="Vacinas Premium"
      description="Acompanhe suas vacinas, validade e onde se vacinar."
    >
      <VaccinesContent />
    </PremiumGate>
  );
}

function VaccinesContent() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Vaccine | null>(null);

  const { score, protectedCount } = useMemo(() => {
    const protectedCount = vaccines.filter(isProtected).length;
    const score = Math.round((protectedCount / vaccines.length) * 100);
    return { score, protectedCount };
  }, []);

  const handleWhereToTake = (vaccineName: string) => {
    navigate(`/app?vacina=${encodeURIComponent(vaccineName)}`);
  };

  return (
    <Screen
      title="Vacinas"
      subtitle="Seu escudo de protecao."
      action={
        <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
          <Crown size={13} />
          Premium
        </span>
      }
    >
      {/* Protection score */}
      <section className="mb-6 rounded-3xl bg-card p-6 shadow-sm">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm font-medium text-ink-soft">
              Indice de protecao
            </p>
            <p className="mt-1 text-5xl font-extrabold tracking-tight text-ink">
              {score}
              <span className="text-2xl text-ink-soft">%</span>
            </p>
          </div>
          <p className="pb-2 text-sm text-ink-soft">
            {protectedCount} de {vaccines.length} protegidas
          </p>
        </div>
        <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-surface">
          <div
            className="h-full rounded-full bg-primary transition-all duration-700 ease-out"
            style={{ width: `${score}%` }}
          />
        </div>
      </section>

      <button
        onClick={() => navigate("/app/vacinas/registrar")}
        className="mb-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-line bg-card py-3.5 text-sm font-semibold text-primary transition-all duration-200 hover:bg-surface"
      >
        <Plus size={18} />
        Registrar vacina tomada
      </button>

      {GROUPS.map((group) => {
        const items = vaccines.filter((v) =>
          group.statuses.includes(getVaccineStatus(v)),
        );
        if (items.length === 0) return null;
        return (
          <VaccineGroup
            key={group.title}
            title={group.title}
            vaccines={items}
            onSelect={setSelected}
          />
        );
      })}

      <VaccineSheet
        vaccine={selected}
        onClose={() => setSelected(null)}
        onWhereToTake={handleWhereToTake}
      />
    </Screen>
  );
}

function VaccineGroup({
  title,
  vaccines,
  onSelect,
}: {
  title: string;
  vaccines: Vaccine[];
  onSelect: (vaccine: Vaccine) => void;
}) {
  return (
    <section className="mb-6">
      <h2 className="mb-3 px-1 text-xs font-bold uppercase tracking-wide text-ink-soft">
        {title}
      </h2>
      <ul className="flex flex-col gap-2.5">
        {vaccines.map((vaccine) => {
          const meta = getVaccineStatusMeta(getVaccineStatus(vaccine));
          return (
            <li key={vaccine.id}>
              <button
                onClick={() => onSelect(vaccine)}
                className="flex w-full items-center gap-3 rounded-2xl bg-card p-4 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: meta.color }}
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink">
                    {vaccine.name}
                  </p>
                  <p className="text-xs text-ink-soft">
                    {getValidityText(vaccine)}
                  </p>
                </div>
                <span
                  className="rounded-full px-2 py-0.5 text-[11px] font-semibold"
                  style={{ backgroundColor: meta.softBg, color: meta.color }}
                >
                  {meta.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
