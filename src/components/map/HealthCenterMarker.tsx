import { useMemo } from "react";
import { Marker } from "react-leaflet";
import L from "leaflet";
import type { HealthCenter } from "../../types";

const centerIcon = L.divIcon({
  className: "ward-marker",
  html: `<div class="ward-center"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="3.5" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

interface HealthCenterMarkerProps {
  center: HealthCenter;
  onSelect: (center: HealthCenter) => void;
}

export function HealthCenterMarker({
  center,
  onSelect,
}: HealthCenterMarkerProps) {
  const icon = useMemo(() => centerIcon, []);
  return (
    <Marker
      position={[center.lat, center.lng]}
      icon={icon}
      eventHandlers={{ click: () => onSelect(center) }}
    />
  );
}
