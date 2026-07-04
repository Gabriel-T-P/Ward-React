import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import type { Disease, HealthCenter } from "../../types";
import type { LatLng } from "../../hooks/useGeolocation";
import { DiseaseMarker } from "./DiseaseMarker";
import { HealthCenterMarker } from "./HealthCenterMarker";

/** Fallback center: Sao Luis / MA, where the mock data lives. */
const FALLBACK_CENTER: LatLng = [-2.53, -44.29];

const userIcon = L.divIcon({
  className: "ward-marker",
  html: `<div class="ward-user-dot"></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

function Recenter({ center }: { center: LatLng | null }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 14, { duration: 1.2 });
    }
  }, [center, map]);
  return null;
}

interface DiseaseMapProps {
  diseases: Disease[];
  healthCenters?: HealthCenter[];
  userPosition: LatLng | null;
  focus?: LatLng | null;
  onSelect: (disease: Disease) => void;
  onSelectCenter?: (center: HealthCenter) => void;
}

export function DiseaseMap({
  diseases,
  healthCenters = [],
  userPosition,
  focus,
  onSelect,
  onSelectCenter,
}: DiseaseMapProps) {
  return (
    <MapContainer
      center={FALLBACK_CENTER}
      zoom={13}
      zoomControl={false}
      className="h-full w-full"
      attributionControl
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Recenter center={focus ?? userPosition} />

      {userPosition && <Marker position={userPosition} icon={userIcon} />}

      {diseases.map((disease) => (
        <DiseaseMarker key={disease.id} disease={disease} onSelect={onSelect} />
      ))}

      {onSelectCenter &&
        healthCenters.map((center) => (
          <HealthCenterMarker
            key={center.id}
            center={center}
            onSelect={onSelectCenter}
          />
        ))}
    </MapContainer>
  );
}
