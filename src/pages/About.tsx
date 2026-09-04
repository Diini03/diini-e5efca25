import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Download,
  Award,
  CheckCircle,
  ExternalLink,
  Lock,
  Link2,
} from "lucide-react";
import { RESUME_URL } from "@/lib/resume";
import diiniPhoto from "@/assets/gallery/about-coffee.webp";
const DIINI_PHOTO_URL = diiniPhoto;

const LINKTREE_URL = "https://linktr.ee/diinicade";

// Certification logos
import freecodecampLogo from "@/assets/certifications/freecodecamp.png";
import analystBuilderLogo from "@/assets/certifications/analyst-builder.png";
import courseraLogo from "@/assets/certifications/coursera.png";
import { Seo, personJsonLd } from "@/components/Seo";
import { AgeCounter } from "@/components/about/AgeCounter";

const skillCategories = [
  {
    name: "Languages",
    skills: ["Python", "SQL", "JavaScript", "TypeScript", "DAX"],
  },
  { name: "Data", skills: ["pandas", "matplotlib", "Power BI", "Excel"] },
  { name: "Databases", skills: ["MySQL", "SQLite", "Power Query"] },
  { name: "Web", skills: ["React", "HTML/CSS", "Node.js", "Tailwind CSS"] },
  { name: "AI Tools", skills: ["Cursor", "Lovable", "Warp"] },
  { name: "Tools", skills: ["Git", "Jupyter", "Streamlit", "WSL/Linux"] },
];

const certifications = [
  {
    name: "Data Analysis with Python",
    provider: "freeCodeCamp",
    year: "2024",
    logo: freecodecampLogo,
    url: "https://drive.google.com/file/d/1J2J4wXIgyM1MRpKoDnVCFdY38aanN41s/view?usp=drive_link",
  },
  {
    name: "Data Analyst Bootcamp",
    provider: "Analyst Builder — Alex The Analyst",
    year: "2025",
    logo: analystBuilderLogo,
    url: "https://drive.google.com/file/d/1b-eNmSMsAanGKf1zRhw8bc3mr8gg8B5Z/view",
  },
  {
    name: "Google UX Design Certificate",
    provider: "Coursera",
    year: "2024",
    logo: courseraLogo,
    url: null,
  },
];

export default function About() {
  return (
    <div className="min-h-screen">
      <Seo
        title="About Diini Kahiye — Data Analyst in Mogadishu"
        description="Who I am, how I work with data, the tools I use daily, and the certifications behind my data analysis and machine learning practice."
        path="/about"
        jsonLd={personJsonLd}
      />
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back home
        </Link>

        {/* Title */}
        <h1 className="text-2xl font-bold mb-8">
          About <span className="text-primary">Me</span>
        </h1>

        {/* Bio + Portrait */}
        <div className="grid md:grid-cols-[1fr_240px] gap-8 mb-10 items-start">
          <div className="space-y-4 text-muted-foreground text-sm leading-relaxed order-2 md:order-1">
            <p>
              I'm <span className="text-primary">Diini M. Kahiye</span>, a senior
              data analyst, where I use Python, SQL, and modern BI tools like
              Power BI to clean, analyze, and visualize data — turning raw
              numbers into clear, actionable insights.
            </p>
            <p>
              I'm a certified Data Visualization developer at freeCodeCamp, with
              real projects to back it up.{" "}
              <Link
                to="/projects"
                className="text-primary underline-offset-4 hover:underline"
              >
                View Projects →
              </Link>
            </p>
            <p>
              On the machine learning side, I've built a Fall Armyworm crop
              disease classifier, a Bitcoin analysis project, and I'm actively
              deepening my skills in statistics, supervised learning, and model
              building. The tools I work with include Python, Scikit-learn,
              Pandas, Matplotlib, Seaborn, SQL, and Power BI.
            </p>
            <p>
              Computer Science graduate from Somali National University,
              Mogadishu — continuously building, learning, and working on
              problems that matter.
            </p>
          </div>

          <div className="order-1 md:order-2">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-br from-primary/30 via-primary/10 to-transparent rounded-2xl blur-md opacity-60 group-hover:opacity-100 transition" />
              <div className="relative overflow-hidden rounded-2xl border border-border bg-card aspect-[4/5]">
                <img
                          decoding="async"
                  src={DIINI_PHOTO_URL}
                  alt="Diini Kahiye"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  loading="eager"
                />
              </div>
            </div>
            <AgeCounter />
          </div>
        </div>

        {/* Actions — CV + Linktree side by side */}
        <div className="flex flex-wrap items-center gap-3 mb-12">
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30"
          >
            <Download className="w-4 h-4" />
            Download My CV
          </a>

          <a
            href={LINKTREE_URL}
            target="_blank"
            rel="noopener noreferrer"
            title="Warning: contains every link I've ever made 👀"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-primary/40 text-sm font-medium text-primary hover:bg-primary/10 hover:border-primary/60 transition-all"
          >
            <Link2 className="w-4 h-4" />
            Peek at my Linktree
            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>


        {/* Skills & Technologies — editorial */}
        <section className="mb-12">
          <h2 className="text-base font-semibold mb-6 flex items-center gap-2">
            <span className="text-primary">&lt;/&gt;</span>
            Skills &amp; Technologies
          </h2>

          <div className="divide-y divide-border/50">
            {skillCategories.map((category) => (
              <div
                key={category.name}
                className="grid grid-cols-[110px_1fr] gap-4 items-start py-3"
              >
                <div className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/80 pt-1">
                  {category.name}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 text-xs border border-border/60 text-foreground/80 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications - Modern terminal-style cards */}
        <section className="mb-12">
          <h2 className="text-base font-semibold mb-6 flex items-center gap-2">
            <Award className="w-4 h-4 text-primary" />
            Certifications
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            {certifications.map((cert, index) => {
              const isLinked = !!cert.url;
              const Wrapper: any = isLinked ? "a" : "div";
              const wrapperProps = isLinked
                ? {
                    href: cert.url!,
                    target: "_blank",
                    rel: "noopener noreferrer",
                  }
                : {};

              return (
                <Wrapper
                  key={index}
                  {...wrapperProps}
                  className={`group relative block overflow-hidden rounded-xl border border-border bg-card/60 backdrop-blur-sm transition-all duration-300 ${
                    isLinked
                      ? "hover:border-primary/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 cursor-pointer"
                      : "opacity-90"
                  }`}
                >
                  {/* Glow accent */}
                  <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Header bar */}
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/60 bg-secondary/30">
                    <div className="flex items-center gap-1.5">
                      <div className="terminal-dot terminal-dot-orange" />
                      <div className="terminal-dot terminal-dot-blue" />
                      <div className="terminal-dot terminal-dot-purple" />
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground tracking-wider uppercase">
                      cert / {cert.year}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-5 flex gap-4">
                    <div className="w-14 h-14 rounded-lg overflow-hidden border border-border/60 bg-background shrink-0 group-hover:scale-105 transition-transform">
                      <img
                          loading="lazy"
                          decoding="async"
                        src={cert.logo}
                        alt={cert.provider}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                        {cert.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {cert.provider}
                      </p>

                      <div className="flex items-center gap-2 mt-3">
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                          <CheckCircle className="w-3 h-3" />
                          Verified
                        </span>
                        {isLinked ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 group-hover:bg-primary/20 transition-colors">
                            <ExternalLink className="w-3 h-3" />
                            View
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-secondary/60 text-muted-foreground border border-border/60">
                            <Lock className="w-3 h-3" />
                            Soon
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Wrapper>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
