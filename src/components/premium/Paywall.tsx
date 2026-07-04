import { Crown, Check } from "lucide-react";
import { Button } from "../ui/Button";
import { usePremium } from "../../context/subscription";

const benefits = [
  "Registrar vacinas e acompanhar a validade",
  "Lembretes de revacinacao nos alertas",
  "Centros de saude com vacinas no mapa",
  "Indice de protecao completo",
];

interface PaywallProps {
  title?: string;
  description?: string;
}

export function Paywall({
  title = "Ward Premium",
  description = "Desbloqueie o acompanhamento completo de vacinas.",
}: PaywallProps) {
  const { setPremium } = usePremium();

  return (
    <div className="flex h-full flex-col items-center justify-center px-7 py-10 text-center [animation:ward-fade-in_300ms_ease-out]">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Crown size={30} />
      </span>

      <h2 className="mt-5 text-2xl font-bold text-ink">{title}</h2>
      <p className="mt-2 max-w-xs text-sm text-ink-soft">{description}</p>

      <ul className="mt-7 flex w-full max-w-xs flex-col gap-3 text-left">
        {benefits.map((benefit) => (
          <li key={benefit} className="flex items-center gap-3 text-sm text-ink">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Check size={14} />
            </span>
            {benefit}
          </li>
        ))}
      </ul>

      <div className="mt-8 w-full max-w-xs">
        <Button size="lg" fullWidth onClick={() => setPremium(true)}>
          <Crown size={18} />
          Assinar por R$ 9,90/mes
        </Button>
        <p className="mt-3 text-xs text-ink-soft">
          Demonstracao: nenhum pagamento e realizado.
        </p>
      </div>
    </div>
  );
}
