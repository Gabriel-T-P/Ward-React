import type { ReactNode } from "react";
import { usePremium } from "../../context/subscription";
import { Paywall } from "./Paywall";

interface PremiumGateProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

/** Renders children only for subscribers; otherwise shows the Paywall. */
export function PremiumGate({ children, title, description }: PremiumGateProps) {
  const { isPremium } = usePremium();
  if (!isPremium) {
    return <Paywall title={title} description={description} />;
  }
  return <>{children}</>;
}
