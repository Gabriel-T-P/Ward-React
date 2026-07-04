import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Plus, X } from "lucide-react";
import { DiseaseMap } from "../components/map/DiseaseMap";
import { DiseaseSheet } from "../components/map/DiseaseSheet";
import { HealthCenterSheet } from "../components/map/HealthCenterSheet";
import { AlertCard } from "../components/map/AlertCard";
import { Fab } from "../components/ui/Fab";
import { useGeolocation } from "../hooks/useGeolocation";
import type { LatLng } from "../hooks/useGeolocation";
import { usePremium } from "../context/subscription";
import type { Alert, Disease, HealthCenter } from "../types";
import diseasesData from "../data/diseases.json";
import alertsData from "../data/alerts.json";
import centersData from "../data/healthCenters.json";

const diseases = diseasesData as Disease[];
const alerts = alertsData as Alert[];
const healthCenters = centersData as HealthCenter[];

export function Home() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { position } = useGeolocation();
  const { isPremium } = usePremium();
  const [selected, setSelected] = useState<Disease | null>(null);
  const [selectedCenter, setSelectedCenter] = useState<HealthCenter | null>(
    null,
  );

  const vaccineFilter = searchParams.get("vacina");

  const centers = useMemo(() => {
    if (!isPremium) return [];
    if (!vaccineFilter) return healthCenters;
    return healthCenters.filter((c) => c.vaccines.includes(vaccineFilter));
  }, [isPremium, vaccineFilter]);

  const focus: LatLng | null = useMemo(() => {
    if (isPremium && vaccineFilter && centers.length > 0) {
      return [centers[0].lat, centers[0].lng];
    }
    return null;
  }, [isPremium, vaccineFilter, centers]);

  const topAlert = useMemo(
    () =>
      [...alerts].sort(
        (a, b) => b.date.localeCompare(a.date) || a.distanceKm - b.distanceKm,
      )[0],
    [],
  );

  const clearFilter = () => {
    searchParams.delete("vacina");
    setSearchParams(searchParams, { replace: true });
  };

  return (
    <div className="relative h-full w-full">
      <DiseaseMap
        diseases={diseases}
        healthCenters={centers}
        userPosition={position}
        focus={focus}
        onSelect={setSelected}
        onSelectCenter={isPremium ? setSelectedCenter : undefined}
      />

      {/* Top overlays */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[500] flex flex-col gap-2 p-4">
        {isPremium && vaccineFilter ? (
          <div className="pointer-events-auto flex items-center gap-2 self-start rounded-full bg-card/95 py-1.5 pl-4 pr-2 text-sm shadow-md backdrop-blur-md [animation:ward-fade-in_300ms_ease-out]">
            <span className="font-medium text-ink">
              Onde tomar: <span className="text-primary">{vaccineFilter}</span>
            </span>
            <button
              onClick={clearFilter}
              aria-label="Limpar filtro"
              className="flex h-6 w-6 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-surface hover:text-ink"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          topAlert && (
            <div className="pointer-events-auto [animation:ward-fade-in_300ms_ease-out]">
              <AlertCard
                alert={topAlert}
                onClick={() => navigate("/app/alertas")}
              />
            </div>
          )
        )}
      </div>

      {/* Legend (premium) */}
      {isPremium && (
        <div className="pointer-events-none absolute bottom-5 left-5 z-[500] flex flex-col gap-1.5 rounded-2xl bg-card/95 p-3 text-[11px] shadow-md backdrop-blur-md">
          <LegendRow color="#ef4444" label="Risco de doenca" />
          <LegendRow label="Centro de vacinacao" cross />
        </div>
      )}

      {/* Floating action button */}
      <div className="absolute bottom-5 right-5 z-[500]">
        <Fab label="Registrar caso" onClick={() => navigate("/app/registrar")}>
          <Plus size={26} />
        </Fab>
      </div>

      <DiseaseSheet disease={selected} onClose={() => setSelected(null)} />
      <HealthCenterSheet
        center={selectedCenter}
        onClose={() => setSelectedCenter(null)}
      />
    </div>
  );
}

function LegendRow({
  color,
  label,
  cross,
}: {
  color?: string;
  label: string;
  cross?: boolean;
}) {
  return (
    <span className="flex items-center gap-2 text-ink">
      {cross ? (
        <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-primary bg-white text-primary">
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      ) : (
        <span
          className="h-3 w-3 rounded-full border-2 border-white"
          style={{ backgroundColor: color, boxShadow: "0 0 0 1px #ddd" }}
        />
      )}
      {label}
    </span>
  );
}
