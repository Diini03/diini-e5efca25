import { useEffect, useState } from "react";
import { Cake } from "lucide-react";

const BIRTH_YEAR = 2004;
const BIRTH_MONTH = 9; // October (0-indexed)
const BIRTH_DAY = 26;

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function computeAge(now: Date) {
  const y = now.getUTCFullYear();
  const anniversaryThisYear = Date.UTC(y, BIRTH_MONTH, BIRTH_DAY);
  const t = now.getTime();

  // Age in completed years
  const years = (t >= anniversaryThisYear ? y : y - 1) - BIRTH_YEAR;

  // Next birthday
  const nextYear = t >= anniversaryThisYear ? y + 1 : y;
  const next = Date.UTC(nextYear, BIRTH_MONTH, BIRTH_DAY);

  // Exact calendar months + remaining days until the next birthday
  let monthsLeft = 0;
  let cursor = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate()
  );
  while (true) {
    const d = new Date(cursor);
    const step = Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate());
    if (step > next) break;
    cursor = step;
    monthsLeft += 1;
  }
  const daysLeft = Math.round((next - cursor) / 86_400_000);
  const totalDaysLeft = Math.ceil((next - t) / 86_400_000);

  return { years, nextAge: years + 1, monthsLeft, daysLeft, totalDaysLeft };
}

export function AgeCounter() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const { years, nextAge, monthsLeft, daysLeft, totalDaysLeft } = computeAge(now);
  const birthMonthName = MONTH_NAMES[BIRTH_MONTH];

  const plural = (n: number, unit: string) => `${n} ${unit}${n > 1 ? "s" : ""}`;

  const countdown =
    totalDaysLeft <= 0
      ? `turns ${nextAge - 1} today 🎉`
      : monthsLeft >= 6
        ? `turns ${nextAge} next ${birthMonthName}`
        : monthsLeft >= 1
          ? `turns ${nextAge} in ${plural(monthsLeft, "month")}${daysLeft > 0 ? ` ${plural(daysLeft, "day")}` : ""}`
          : `turns ${nextAge} in ${plural(totalDaysLeft, "day")}`;


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

