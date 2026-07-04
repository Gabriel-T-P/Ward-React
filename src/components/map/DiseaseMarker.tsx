import { useMemo } from "react";
import { Marker } from "react-leaflet";
import L from "leaflet";
import type { Disease } from "../../types";
import { getRiskMeta } from "../../lib/risk";

interface DiseaseMarkerProps {
  disease: Disease;
  onSelect: (disease: Disease) => void;
}

export function DiseaseMarker({ disease, onSelect }: DiseaseMarkerProps) {
  const icon = useMemo(() => {
    const { color } = getRiskMeta(disease.risk);
    return L.divIcon({
      className: "ward-marker",
      html: `<div class="ward-pin" data-risk="${disease.risk}" style="background:${color}"></div>`,
      iconSize: [22, 22],
      iconAnchor: [11, 11],
    });
  }, [disease.risk]);

  return (
    <Marker
      position={[disease.lat, disease.lng]}
      icon={icon}
      eventHandlers={{ click: () => onSelect(disease) }}
    />
  );
}
