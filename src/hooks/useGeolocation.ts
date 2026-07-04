import { useEffect, useState } from "react";

export type LatLng = [number, number];

interface GeolocationState {
  position: LatLng | null;
  status: "idle" | "loading" | "granted" | "denied";
}

/**
 * Requests the browser geolocation once on mount.
 * Falls back gracefully: the caller decides the fallback center.
 */
export function useGeolocation(): GeolocationState {
  const [state, setState] = useState<GeolocationState>(() => ({
    position: null,
    status: "geolocation" in navigator ? "loading" : "denied",
  }));

  useEffect(() => {
    if (state.status !== "loading") return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setState({
          position: [pos.coords.latitude, pos.coords.longitude],
          status: "granted",
        });
      },
      () => {
        setState({ position: null, status: "denied" });
      },
      { enableHighAccuracy: true, timeout: 8000 },
    );
  }, [state.status]);

  return state;
}
