import type { Risk } from "../types";

export interface RiskMeta {
  label: string;
  /** Solid hex color -- used on the map markers and badge accents */
  color: string;
  /** Translucent background for soft badges */
  softBg: string;
}

export const RISK_META: Record<Risk, RiskMeta> = {
  low: {
    label: "Baixo risco",
    color: "#22c55e",
    softBg: "rgba(34, 197, 94, 0.12)",
  },
  medium: {
    label: "Risco medio",
    color: "#f59e0b",
    softBg: "rgba(245, 158, 11, 0.14)",
  },
  high: {
    label: "Alto risco",
    color: "#ef4444",
    softBg: "rgba(239, 68, 68, 0.12)",
  },
};

export function getRiskMeta(risk: Risk): RiskMeta {
  return RISK_META[risk];
}
