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
      ? "birthday today"
      : monthsLeft >= 3
        ? `turns ${nextAge} in October`
        : monthsLeft >= 1
          ? `turns ${nextAge} in ${monthsLeft} month${monthsLeft > 1 ? "s" : ""}`
          : `turns ${nextAge} in ${daysLeft} day${daysLeft > 1 ? "s" : ""}`;

  return (
    <div className="mt-2 flex items-center gap-2 font-mono text-[11px] text-muted-foreground/80">
      <Cake className="h-3 w-3 shrink-0 text-primary" />
      <span>
        <span className="text-primary font-semibold tabular-nums">{years}</span> years old
        <span className="text-muted-foreground/40"> · </span>
        {countdown}
      </span>
    </div>
  );
}

