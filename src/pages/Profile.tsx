import { useNavigate } from "react-router-dom";
import { Mail, MapPin, Settings, LogOut, ChevronRight, Crown } from "lucide-react";
import { Screen } from "../components/layout/Screen";
import { Button } from "../components/ui/Button";
import { usePremium } from "../context/subscription";
import { cn } from "../lib/cn";
import type { UserProfile } from "../types";
import userData from "../data/user.json";

const user = userData as UserProfile;

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export function Profile() {
  const navigate = useNavigate();
  const { isPremium, toggle } = usePremium();

  return (
    <Screen title="Perfil">
      <section className="mb-6 flex flex-col items-center text-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
          {initials(user.name)}
        </span>
        <h2 className="mt-3 text-lg font-bold text-ink">{user.name}</h2>
        <p className="text-sm text-ink-soft">{user.email}</p>
      </section>

      {/* Ward Premium (simulated subscription toggle) */}
      <button
        onClick={toggle}
        className="mb-6 flex w-full items-center gap-3 rounded-2xl bg-card p-4 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Crown size={18} />
        </span>
        <div className="flex-1">
          <p className="text-sm font-semibold text-ink">Ward Premium</p>
          <p className="text-xs text-ink-soft">
            {isPremium ? "Assinatura ativa" : "Desbloqueie o modulo de vacinas"}
          </p>
        </div>
        <span
          className={cn(
            "relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200",
            isPremium ? "bg-primary" : "bg-line",
          )}
        >
          <span
            className={cn(
              "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-all duration-200",
              isPremium ? "left-[22px]" : "left-0.5",
            )}
          />
        </span>
      </button>

      <ul className="mb-6 flex flex-col gap-2.5">
        <InfoRow icon={<Mail size={18} />} label="Email" value={user.email} />
        <InfoRow icon={<MapPin size={18} />} label="Cidade" value={user.city} />
      </ul>

      <button className="mb-3 flex w-full items-center gap-3 rounded-2xl bg-card p-4 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface text-ink-soft">
          <Settings size={18} />
        </span>
        <span className="flex-1 text-sm font-semibold text-ink">
          Configuracoes
        </span>
        <ChevronRight size={18} className="text-ink-soft" />
      </button>

      <Button
        variant="secondary"
        fullWidth
        onClick={() => navigate("/login")}
        className="text-primary"
      >
        <LogOut size={18} />
        Sair
      </Button>
    </Screen>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <li className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-sm">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface text-ink-soft">
        {icon}
      </span>
      <div>
        <p className="text-xs text-ink-soft">{label}</p>
        <p className="text-sm font-semibold text-ink">{value}</p>
      </div>
    </li>
  );
}
