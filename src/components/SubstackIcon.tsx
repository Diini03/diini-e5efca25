interface IconProps {
  className?: string;
}

/** Substack brand mark (three bars, bottom bar filled as an envelope body). */
export function SubstackIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.5V23.64l7.932-4.31 7.932 4.31V10.5H1.46zM22.539 2.857H1.46V0h21.08v2.857z" />
    </svg>
  );
}
