import type { ReactNode } from "react";

interface ScreenProps {
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
}

/** Scrollable screen shell with a calm, spacious header. */
export function Screen({ title, subtitle, action, children }: ScreenProps) {
  return (
    <div className="h-full overflow-y-auto">
      <div className="px-5 pb-8 pt-6">
        {title && (
          <header className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-ink">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-1 text-sm text-ink-soft">{subtitle}</p>
              )}
            </div>
            {action}
          </header>
        )}
        {children}
      </div>
    </div>
  );
}
