import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: ReactNode;
}

export function Input({ label, icon, className, id, ...props }: InputProps) {
  const inputId = id ?? props.name;
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="px-1 text-xs font-medium text-ink-soft"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft">
            {icon}
          </span>
        )}
        <input
          id={inputId}
          className={cn(
            "h-12 w-full rounded-2xl border border-line bg-card px-4 text-sm text-ink outline-none transition-all duration-200 placeholder:text-ink-soft/70 focus:border-primary/60 focus:ring-2 focus:ring-primary/15",
            icon ? "pl-11" : undefined,
            className,
          )}
          {...props}
        />
      </div>
    </div>
  );
}
