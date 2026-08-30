import { useEffect, useState } from "react";
import { Cake } from "lucide-react";

const BIRTH = new Date("2004-10-26T00:00:00Z");

function computeAge(now: Date) {
  let years = now.getUTCFullYear() - BIRTH.getUTCFullYear();
  const anniversaryThisYear = new Date(
    Date.UTC(now.getUTCFullYear(), BIRTH.getUTCMonth(), BIRTH.getUTCDate())
  );
  if (now < anniversaryThisYear) years -= 1;

  const last = new Date(
    Date.UTC(now.getUTCFullYear() - (now < anniversaryThisYear ? 1 : 0), BIRTH.getUTCMonth(), BIRTH.getUTCDate())
  );
  const next = new Date(Date.UTC(last.getUTCFullYear() + 1, BIRTH.getUTCMonth(), BIRTH.getUTCDate()));
  const fraction = (now.getTime() - last.getTime()) / (next.getTime() - last.getTime());

  const daysLeft = Math.ceil((next.getTime() - now.getTime()) / 86_400_000);
  const monthsLeft = Math.floor(daysLeft / 30);

  return { years, precise: years + fraction, next: years + 1, daysLeft, monthsLeft };
}

export function AgeCounter() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 50);
    return () => clearInterval(id);
  }, []);

  const { years, precise, next, daysLeft, monthsLeft } = computeAge(now);

  const countdown =
    daysLeft <= 1
      ? "birthday is today 🎂"
      : monthsLeft >= 1
        ? `turns ${next} in ${monthsLeft} month${monthsLeft > 1 ? "s" : ""}`
        : `turns ${next} in ${daysLeft} days`;

  return (
    <div className="mt-3 flex items-center justify-between gap-3 rounded-lg border border-border/60 bg-card/60 px-3 py-2">
      <div className="flex items-baseline gap-1.5">
        <span className="font-mono text-sm font-bold text-primary tabular-nums">
          {precise.toFixed(8)}
        </span>
        <span className="text-xs text-muted-foreground">years old</span>
      </div>
      <span className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground/80">
        <Cake className="h-3 w-3 text-primary" />
        {countdown}
      </span>
      <span className="sr-only">{years} years old</span>
    </div>
  );
}
