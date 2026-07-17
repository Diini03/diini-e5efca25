import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Download,
  Printer,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Award,
  FolderGit2,
  Sparkles,
  Languages as LangIcon,
  Users,
} from "lucide-react";
import { cv } from "@/data/cv";
import { RESUME_URL } from "@/lib/resume";

export default function CV() {
  const handlePrint = () => window.print();

  return (
    <>
      {/* Print stylesheet — clean B/W layout for browser Print to PDF */}
      <style>{`
        @media print {
          @page { size: A4; margin: 14mm; }
          html, body { background: #fff !important; }
          body, body * { color: #000 !important; }
          .no-print { display: none !important; }
          .cv-print-root {
            background: #fff !important;
            box-shadow: none !important;
            padding: 0 !important;
          }
          .cv-print-root a { color: #000 !important; text-decoration: none !important; }
          .cv-print-root h1, .cv-print-root h2, .cv-print-root h3 { page-break-after: avoid; }
          .cv-print-root section, .cv-print-root article { page-break-inside: avoid; }
          .cv-print-root .print-border { border-color: #999 !important; }
          .cv-print-root .print-muted { color: #444 !important; }
        }
      `}</style>

      <div className="min-h-screen animate-fade-in">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
          {/* Toolbar — hidden on print */}
          <div className="no-print flex items-center justify-between mb-8 flex-wrap gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back home
            </Link>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border/60 text-xs font-mono text-muted-foreground hover:text-foreground hover:border-border transition-all"
              >
                <Printer className="w-3.5 h-3.5" />
                Print
              </button>
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-primary/40 bg-primary/10 text-xs font-mono text-primary hover:bg-primary/20 hover:border-primary/60 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                Download PDF
              </a>
            </div>
          </div>

          {/* Paper */}
          <article className="cv-print-root rounded-xl border border-border/60 print-border bg-card/40 p-6 sm:p-10 shadow-sm">
            {/* Header */}
            <header className="mb-8 pb-6 border-b border-border/60 print-border">
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-1">
                {cv.name}
              </h1>
              <p className="text-sm sm:text-base text-primary font-mono mb-4">
                {cv.title}
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs sm:text-[13px] text-muted-foreground print-muted">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" /> {cv.location}
                </span>
                <a
                  href={`mailto:${cv.email}`}
                  className="inline-flex items-center gap-1.5 hover:text-foreground"
                >
                  <Mail className="w-3.5 h-3.5" /> {cv.email}
                </a>
                <a
                  href={`tel:${cv.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-1.5 hover:text-foreground"
                >
                  <Phone className="w-3.5 h-3.5" /> {cv.phone}
                </a>
                {cv.links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-foreground"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    {l.label}
                  </a>
                ))}
              </div>
            </header>

            {/* Summary */}
            <Section icon={<Sparkles className="w-3.5 h-3.5" />} title="Professional Summary">
              <p className="text-[14.5px] leading-[1.75] text-foreground/90">
                {cv.summary}
              </p>
            </Section>

            {/* Skills */}
            <Section icon={<Award className="w-3.5 h-3.5" />} title="Skills">
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                {cv.skills.map((g) => (
                  <div key={g.label}>
                    <div className="text-[11px] font-mono uppercase tracking-[0.15em] text-primary mb-1">
                      {g.label}
                    </div>
                    <p className="text-[13.5px] text-foreground/85 leading-relaxed">
                      {g.items.join(" · ")}
                    </p>
                  </div>
                ))}
              </div>
            </Section>

            {/* Experience — timeline */}
            <Section icon={<Briefcase className="w-3.5 h-3.5" />} title="Experience">
              <div className="relative">
                <div className="absolute left-2 top-1 bottom-1 w-px bg-border/70 print-border hidden sm:block" />
                <ol className="space-y-6">
                  {cv.experience.map((job, i) => (
                    <li key={i} className="relative sm:pl-8">
                      <span className="hidden sm:block absolute left-[3px] top-2 w-[10px] h-[10px] rounded-full bg-primary ring-4 ring-background" />
                      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                        <h3 className="text-[15.5px] font-semibold text-foreground">
                          {job.role}{" "}
                          <span className="text-muted-foreground print-muted font-normal">
                            · {job.company}
                          </span>
                        </h3>
                        <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-muted-foreground print-muted">
                          {job.start} — {job.end}
                        </span>
                      </div>
                      <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] leading-relaxed text-foreground/85 marker:text-primary/60">
                        {job.bullets.map((b, j) => (
                          <li key={j}>{b}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ol>
              </div>
            </Section>

            {/* Projects */}
            <Section icon={<FolderGit2 className="w-3.5 h-3.5" />} title="Selected Projects">
              <div className="grid sm:grid-cols-2 gap-4">
                {cv.projects.map((p, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-border/60 print-border p-4 bg-background/40"
                  >
                    <div className="text-[14.5px] font-semibold text-foreground mb-0.5">
                      {p.name}
                    </div>
                    <div className="text-[11px] font-mono text-primary mb-2">
                      {p.stack}
                    </div>
                    <ul className="list-disc pl-4 space-y-1 text-[12.5px] leading-relaxed text-foreground/85 marker:text-primary/60">
                      {p.bullets.map((b, j) => (
                        <li key={j}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Section>

            {/* Education */}
            <Section icon={<GraduationCap className="w-3.5 h-3.5" />} title="Education">
              {cv.education.map((e, i) => (
                <div key={i} className="mb-2">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-[15px] font-semibold text-foreground">
                      {e.degree}{" "}
                      <span className="text-muted-foreground print-muted font-normal">
                        · {e.school}
                      </span>
                    </h3>
                    <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-muted-foreground print-muted">
                      {e.start} — {e.end}
                    </span>
                  </div>
                  {e.notes && (
                    <p className="text-[13px] text-foreground/80 leading-relaxed mt-1">
                      {e.notes}
                    </p>
                  )}
                </div>
              ))}
            </Section>

            {/* Certifications */}
            <Section icon={<Award className="w-3.5 h-3.5" />} title="Certifications">
              <ul className="list-disc pl-5 space-y-1 text-[13.5px] text-foreground/85 marker:text-primary/60">
                {cv.certifications.map((c, i) => (
                  <li key={i}>
                    {c.url ? (
                      <a
                        href={c.url}
                        className="hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {c.title}
                      </a>
                    ) : (
                      c.title
                    )}
                  </li>
                ))}
              </ul>
            </Section>

            {/* Professional Development */}
            <Section icon={<Sparkles className="w-3.5 h-3.5" />} title="Professional Development">
              <div className="space-y-3">
                {cv.professionalDevelopment.map((pd, i) => (
                  <div key={i}>
                    <div className="text-[14px] font-semibold text-foreground">
                      {pd.title}
                    </div>
                    <p className="text-[13.5px] text-foreground/85 leading-relaxed">
                      {pd.body}
                    </p>
                  </div>
                ))}
              </div>
            </Section>

            {/* Languages */}
            <Section icon={<LangIcon className="w-3.5 h-3.5" />} title="Languages">
              <ul className="flex flex-wrap gap-x-6 gap-y-1 text-[13.5px] text-foreground/85">
                {cv.languages.map((l) => (
                  <li key={l.name}>
                    <span className="font-semibold text-foreground">{l.name}:</span>{" "}
                    {l.level}
                  </li>
                ))}
              </ul>
            </Section>

            {/* References */}
            <Section icon={<Users className="w-3.5 h-3.5" />} title="References" last>
              <div className="grid sm:grid-cols-2 gap-4">
                {cv.references.map((r, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-border/60 print-border p-4 bg-background/40"
                  >
                    <div className="text-[14px] font-semibold text-foreground">
                      {r.name}
                    </div>
                    <div className="text-[12.5px] text-muted-foreground print-muted mb-1.5">
                      {r.title} · {r.org}
                    </div>
                    {r.phone && (
                      <div className="text-[12.5px] text-foreground/85">{r.phone}</div>
                    )}
                    {r.email && (
                      <a
                        href={`mailto:${r.email}`}
                        className="text-[12.5px] text-primary hover:underline break-all"
                      >
                        {r.email}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </Section>
          </article>
        </div>
      </div>
    </>
  );
}

function Section({
  icon,
  title,
  children,
  last = false,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <section className={last ? "" : "mb-7"}>
      <h2 className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-primary mb-3">
        {icon}
        {title}
      </h2>
      {children}
    </section>
  );
}
