import { Link } from "react-router-dom";
import { ArrowLeft, MapPin, Mail, Download, Award, CheckCircle, ExternalLink, Lock, Link2, Sparkles } from "lucide-react";
import { RESUME_URL } from "@/lib/resume";
import diiniPhoto from "@/assets/diini-graduation.jpeg.asset.json";

const LINKTREE_URL = "https://linktr.ee/diinikahiye";

// Certification logos
import freecodecampLogo from "@/assets/certifications/freecodecamp.png";
import analystBuilderLogo from "@/assets/certifications/analyst-builder.png";
import courseraLogo from "@/assets/certifications/coursera.png";

const experiences = [
  {
    type: "learning",
    title: "Machine Learning",
    org: "Self-directed",
    location: "",
    date: "2026 — Present",
    description:
      "Started building machine learning models — CNNs, classification, and applied deep learning projects.",
  },
  {
    type: "learning",
    title: "Data Analytics",
    org: "Self-directed",
    location: "",
    date: "Oct 2024 — Present",
    description:
      "Learning data analysis with Python, SQL, Power BI and statistics through hands-on projects and real datasets.",
  },
  {
    type: "education",
    title: "Bachelor of Computer Science",
    org: "Somali National University",
    date: "2021 - 2026",
    description: "Focus: Data Science, Machine Learning, AI",
  },
];

const skillCategories = [
  { name: "Languages", skills: ["Python", "SQL", "JavaScript", "TypeScript", "DAX"] },
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

        {/* Bio */}
        <div className="space-y-4 text-muted-foreground text-sm leading-relaxed mb-8">
          <p>
            I'm <span className="text-primary">Diini Kahiye</span>, a Junior Data Scientist based in Mogadishu, Somalia, with a background in Computer Science. I focus on machine learning and data analysis, building projects that help turn data into useful insights.
          </p>
          <p>
            I work with Python, SQL, and R to collect, clean, and analyze data, and I create dashboards using tools like Power BI and Tableau to present results clearly. I enjoy working with real datasets and using data to understand patterns and support better decisions.
          </p>
          <p>
            I have developed machine learning and data analysis projects using real-world data, including humanitarian and global datasets. These projects involve building predictive models and visual reports that help explain complex information in a practical way.
          </p>
          <p>
            After graduating from Somali National University, I continue improving my skills in Data Science and AI while working on projects that solve real problems and create meaningful impact in my community.
          </p>
        </div>

        {/* Location & Email Cards */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="terminal-card">
            <div className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Location</div>
                <div className="text-sm text-foreground">Mogadishu, Somalia</div>
              </div>
            </div>
          </div>
          <div className="terminal-card">
            <div className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Email</div>
                <div className="text-sm text-foreground">diiniyare74@gmail.com</div>
              </div>
            </div>
          </div>
        </div>

        {/* Download CV Button - Enhanced */}
        <a 
          href={RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] mb-12"
        >
          <Download className="w-5 h-5" />
          Download My CV
        </a>

        {/* Experience & Education */}
        <section className="mb-12">
          <h2 className="text-base font-semibold mb-6 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-primary" />
            Experience & Education
          </h2>

          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    {exp.type === "education" ? (
                      <GraduationCap className="w-5 h-5 text-primary" />
                    ) : (
                      <Briefcase className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                  {index < experiences.length - 1 && (
                    <div className="w-px h-full bg-border mt-2" />
                  )}
                </div>
                <div className="flex-1 pb-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">{exp.title}</h3>
                      <div className="text-sm text-primary">
                        {exp.org}
                        {exp.location && (
                          <span className="text-muted-foreground"> • {exp.location}</span>
                        )}
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap px-2 py-1 bg-secondary rounded">
                      {exp.date}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

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
                ? { href: cert.url!, target: "_blank", rel: "noopener noreferrer" }
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
                      <img src={cert.logo} alt={cert.provider} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                        {cert.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">{cert.provider}</p>

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
