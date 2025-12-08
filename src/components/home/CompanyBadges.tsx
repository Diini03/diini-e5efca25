const companies = [
  { name: "NAPAD", letter: "N", past: false },
  { name: "MEDAIR", letter: "M", past: true },
  { name: "SNU", letter: "S", past: false },
];

export function CompanyBadges() {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {companies.map((company, index) => (
        <div key={company.name} className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-secondary flex items-center justify-center text-sm font-semibold text-foreground">
              {company.letter}
            </div>
            <span className="text-sm text-muted-foreground">
              {company.name}
              {company.past && (
                <span className="text-xs text-muted-foreground/70">(Past)</span>
              )}
            </span>
          </div>
          {index < companies.length - 1 && (
            <span className="text-muted-foreground/50 mx-1">/</span>
          )}
        </div>
      ))}
    </div>
  );
}
