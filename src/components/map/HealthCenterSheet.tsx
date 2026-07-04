import { Clock, MapPin, Syringe } from "lucide-react";
import type { HealthCenter } from "../../types";
import { BottomSheet } from "../ui/BottomSheet";

interface HealthCenterSheetProps {
  center: HealthCenter | null;
  onClose: () => void;
}

export function HealthCenterSheet({ center, onClose }: HealthCenterSheetProps) {
  return (
    <BottomSheet open={center !== null} onClose={onClose} title={center?.name}>
      {center && (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2 text-sm text-ink-soft">
            <p className="flex items-center gap-2">
              <MapPin size={16} className="shrink-0 text-primary" />
              {center.address}
            </p>
            {center.hours && (
              <p className="flex items-center gap-2">
                <Clock size={16} className="shrink-0 text-primary" />
                {center.hours}
              </p>
            )}
          </div>

          <section>
            <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-ink">
              <Syringe size={16} className="text-primary" />
              Vacinas disponiveis
            </h3>
            <div className="flex flex-wrap gap-2">
              {center.vaccines.map((name) => (
                <span
                  key={name}
                  className="rounded-full bg-surface px-3 py-1.5 text-xs font-medium text-ink"
                >
                  {name}
                </span>
              ))}
            </div>
          </section>
        </div>
      )}
    </BottomSheet>
  );
}
