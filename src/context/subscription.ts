import { createContext, useContext } from "react";

export interface SubscriptionContextValue {
  isPremium: boolean;
  setPremium: (value: boolean) => void;
  toggle: () => void;
}

export const SubscriptionContext =
  createContext<SubscriptionContextValue | null>(null);

/** Access the (in-memory) premium subscription state. */
export function usePremium(): SubscriptionContextValue {
  const ctx = useContext(SubscriptionContext);
  if (!ctx) {
    throw new Error("usePremium precisa estar dentro de um PremiumProvider");
  }
  return ctx;
}
