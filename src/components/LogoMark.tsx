interface LogoMarkProps {
  className?: string;
  animated?: boolean;
}

/**
 * "DK" monogram inside a rounded terminal frame — matches the favicon branding.
 */
export function LogoMark({ className = "w-16 h-16", animated = false }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="Diini Kahiye logo"
    >
      <defs>
        <linearGradient id="dk-stroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="hsl(var(--primary))" />
          <stop offset="100%" stopColor="hsl(var(--primary) / 0.45)" />
        </linearGradient>
      </defs>

      <rect
        x="6"
        y="6"
        width="88"
        height="88"
        rx="22"
        fill="hsl(var(--terminal-bg))"
        stroke="url(#dk-stroke)"
        strokeWidth="3"
        className={animated ? "animate-logo-enter" : undefined}
      />

      <text
        x="50"
        y="50"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="'JetBrains Mono', monospace"
        fontWeight="700"
        fontSize="34"
        fill="hsl(var(--primary))"
        className={animated ? "animate-logo-enter" : undefined}
      >
        DK
      </text>

      <rect
        x="34"
        y="72"
        width="32"
        height="4"
        rx="2"
        fill="hsl(var(--primary) / 0.5)"
        className={animated ? "animate-logo-cursor" : undefined}
      />
    </svg>
  );
}
