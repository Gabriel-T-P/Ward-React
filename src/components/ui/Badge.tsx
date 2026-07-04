import { getRiskMeta } from "../../lib/risk";
import type { Risk } from "../../types";
import { cn } from "../../lib/cn";

interface RiskBadgeProps {
  risk: Risk;
  className?: string;
}

export function RiskBadge({ risk, className }: RiskBadgeProps) {
  const meta = getRiskMeta(risk);
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
        className,
      )}
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
