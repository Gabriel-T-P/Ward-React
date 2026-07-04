import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

interface FabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  label?: string;
}

export function Fab({ children, label, className, ...props }: FabProps) {
  return (
    <button
      aria-label={label}
      className={cn(
        "flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-md transition-all duration-200 ease-out hover:brightness-105 hover:shadow-lg active:scale-95",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
