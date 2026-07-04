import { useCallback, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { SubscriptionContext } from "./subscription";

/**
 * Holds the premium subscription flag in memory. There is no real payment or
 * persistence: the flag resets on refresh, by design (academic demo).
 */
export function PremiumProvider({ children }: { children: ReactNode }) {
  const [isPremium, setPremium] = useState(false);
  const toggle = useCallback(() => setPremium((p) => !p), []);

  const value = useMemo(
    () => ({ isPremium, setPremium, toggle }),
    [isPremium, toggle],
  );

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
}
