import { useEffect, useState } from "react";
import { Cake } from "lucide-react";

const BIRTH = new Date("2004-10-26T00:00:00Z");

function computeAge(now: Date) {
  let years = now.getUTCFullYear() - BIRTH.getUTCFullYear();
  const anniversaryThisYear = new Date(
    Date.UTC(now.getUTCFullYear(), BIRTH.getUTCMonth(), BIRTH.getUTCDate())
  );
  if (now < anniversaryThisYear) years -= 1;

  const next =
    now < anniversaryThisYear
      ? anniversaryThisYear
      : new Date(Date.UTC(now.getUTCFullYear() + 1, BIRTH.getUTCMonth(), BIRTH.getUTCDate()));

  const daysLeft = Math.ceil((next.getTime() - now.getTime()) / 86_400_000);
  const monthsLeft = Math.floor(daysLeft / 30.44);

  return { years, nextAge: years + 1, daysLeft, monthsLeft };
}

export function AgeCounter() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const { years, nextAge, daysLeft, monthsLeft } = computeAge(now);

  const countdown =
    daysLeft <= 1
      ? "birthday is today 🎂"
      : monthsLeft >= 3
        ? `turns ${nextAge} in the next October`
        : monthsLeft >= 1
          ? `turns ${nextAge} in ${monthsLeft} month${monthsLeft > 1 ? "s" : ""}`
          : `turns ${nextAge} in ${daysLeft} days`;

  return (
    <div className="mt-3 flex items-center justify-between gap-3 rounded-lg border border-border/60 bg-card/60 px-3 py-2">
      <span className="text-sm">
        <span className="font-mono font-bold text-primary tabular-nums">{years}</span>{" "}
        <span className="text-muted-foreground text-xs">years old</span>
      </span>
      <span className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground/80">
        <Cake className="h-3 w-3 text-primary" />
        {countdown}
      </span>
    </div>
  );
}
