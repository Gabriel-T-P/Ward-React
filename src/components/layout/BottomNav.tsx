import { NavLink } from "react-router-dom";
import { Map, PlusCircle, Bell, Syringe, User, Lock } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "../../lib/cn";
import { usePremium } from "../../context/subscription";

interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  end?: boolean;
  premium?: boolean;
}

const items: NavItem[] = [
  { to: "/app", label: "Mapa", icon: Map, end: true },
  { to: "/app/registrar", label: "Registrar", icon: PlusCircle },
  { to: "/app/alertas", label: "Alertas", icon: Bell },
  { to: "/app/vacinas", label: "Vacinas", icon: Syringe, premium: true },
  { to: "/app/perfil", label: "Perfil", icon: User },
];

export function BottomNav() {
  const { isPremium } = usePremium();

  return (
    <nav className="pointer-events-auto border-t border-line bg-card/95 backdrop-blur-md">
      <ul className="mx-auto flex max-w-md items-stretch justify-between px-2 pb-[env(safe-area-inset-bottom)]">
        {items.map(({ to, label, icon: Icon, end, premium }) => {
          const locked = premium && !isPremium;
          return (
            <li key={to} className="flex-1">
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  cn(
                    "flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors duration-200",
                    isActive ? "text-primary" : "text-ink-soft hover:text-ink",
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="relative">
                      <Icon
                        size={22}
                        strokeWidth={isActive ? 2.4 : 1.9}
                        className="transition-transform duration-200"
                      />
                      {locked && (
                        <span className="absolute -right-1.5 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary text-white">
                          <Lock size={8} strokeWidth={3} />
                        </span>
                      )}
                    </span>
                    <span>{label}</span>
                  </>
                )}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
