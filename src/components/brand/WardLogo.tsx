interface WardLogoProps {
  className?: string;
  title?: string;
}

/**
 * Ward emblem: a minimalist winged staff crowned by a faceted crystal.
 * Monochromatic and driven by `currentColor` -- set the color via Tailwind
 * (e.g. `text-primary`). Wings use a softer opacity to echo the two-tone
 * look of the original brand mark. Wings are mirrored so they stay symmetric.
 */
export function WardLogo({ className, title = "Ward" }: WardLogoProps) {
  const wing =
    "M244 250C186 224 120 220 70 176c6 44 30 80 74 100-30-6-58 0-82 18 44 6 84 20 118 40 0-34 24-64 64-64-40-16-72-38-100-60Z";

  return (
    <svg
      viewBox="0 0 512 512"
      className={className}
      role="img"
      aria-label={title}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>

      {/* Wings (soft) -- right wing mirrors the left for perfect symmetry */}
      <g fill="currentColor" fillOpacity="0.3">
        <path d={wing} />
        <g transform="translate(512,0) scale(-1,1)">
          <path d={wing} />
        </g>
      </g>

      {/* Staff */}
      <g fill="currentColor">
        <path d="M234 188h44l8 20-8 148c-1 20 4 39 17 56l15 20H221l15-20c13-17 18-36 17-56l-8-148 8-20Z" />
      </g>

      {/* Crystal / gem */}
      <g fill="currentColor">
        <path d="M256 44 306 86 296 150 256 190 216 150 206 86Z" />
      </g>

      {/* Gem facets and staff spiral, cut with the surface color */}
      <g
        stroke="var(--color-card)"
        strokeWidth="8"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
      >
        <path d="M206 86 306 86" />
        <path d="M256 44 216 150" />
        <path d="M256 44 296 150" />
      </g>
      <g
        stroke="var(--color-card)"
        strokeWidth="9"
        strokeLinecap="round"
        fill="none"
      >
        <path d="M240 244 276 282" />
        <path d="M236 312 274 352" />
      </g>
    </svg>
  );
}
