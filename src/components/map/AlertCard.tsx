import { ChevronRight, TriangleAlert } from "lucide-react";
import type { Alert } from "../../types";
import { getRiskMeta } from "../../lib/risk";

interface AlertCardProps {
  alert: Alert;
  onClick?: () => void;
}

export function AlertCard({ alert, onClick }: AlertCardProps) {
  const meta = getRiskMeta(alert.risk);
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-2xl bg-card/95 p-3 text-left shadow-md backdrop-blur-md transition-all duration-200 hover:shadow-lg active:scale-[0.99]"
    >
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
        style={{ backgroundColor: meta.softBg, color: meta.color }}
      >
        <TriangleAlert size={20} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-ink">{alert.title}</p>
        <p className="truncate text-xs text-ink-soft">
          a {alert.distanceKm} km de voce
        </p>
      </div>
      <ChevronRight size={18} className="shrink-0 text-ink-soft" />
    </button>
  );
}
