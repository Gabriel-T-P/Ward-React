export type ClassValue = string | false | null | undefined;

/** Tiny className joiner (keeps deps minimal). */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
