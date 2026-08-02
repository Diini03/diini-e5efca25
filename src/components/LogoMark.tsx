interface LogoMarkProps {
  className?: string;
  animated?: boolean;
}

/**
 * Hexagon loader mark — an outer hexagon that draws itself while a fainter
 * inner hexagon counter-rotates, with a "DK" monogram at the center.
 */
export function LogoMark({ className = "w-16 h-16", animated = false }: LogoMarkProps) {
  const hex = "50,4 90,27 90,73 50,96 10,73 10,27";

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="Diini Kahiye logo"
    >
      {/* Static base ring */}
      <polygon
        points={hex}
        fill="none"
        stroke="hsl(var(--primary) / 0.15)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* Drawing arc — acts as the loading indicator */}
      <polygon
        points={hex}
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={animated ? "animate-hex-draw" : undefined}
      />

      {/* Inner counter-rotating hexagon */}
      <polygon
        points={hex}
        fill="none"
        stroke="hsl(var(--primary) / 0.28)"
        strokeWidth="1.5"
        strokeLinejoin="round"
        transform="scale(0.66) translate(25.5, 25.5)"
        className={animated ? "animate-hex-spin" : undefined}
        style={{ transformOrigin: "50px 50px" }}
      />

      <text
        x="50"
        y="52"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="'Space Grotesk', 'JetBrains Mono', monospace"
        fontWeight="700"
        fontSize="26"
        letterSpacing="2"
        fill="hsl(var(--foreground))"
        className={animated ? "animate-mono-in" : undefined}
      >
        DK
      </text>
    </svg>
  );
}
