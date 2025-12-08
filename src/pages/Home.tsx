import { Link } from "react-router-dom";
import { Github, Linkedin, ExternalLink, Star } from "lucide-react";
import { DashboardCard } from "@/components/home/DashboardCard";
import { SkillsCard } from "@/components/home/SkillsCard";
import { LanguagesChart } from "@/components/home/LanguagesChart";
import { ProjectCard } from "@/components/home/ProjectCard";
import { CompanyBadges } from "@/components/home/CompanyBadges";

const featuredProjects = [
  {
    slug: "business-analysis",
    title: "Business Analysis Dashboard",
    description:
      "Power BI dashboard to compare employee benefit packages with DAX and Excel transformations.",
    tags: ["powerbi", "dax", "excel", "analytics"],
  },
  {
    slug: "job-market-eda",
    title: "Data Science Job Market EDA",
    description:
      "Analyzed 7000+ data science job listings to gain insights on landing analytics jobs.",
    tags: ["python", "pandas", "matplotlib", "wordcloud"],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <section className="mb-12">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">
            Hey! I'm <span className="text-primary">Diini Kahiye</span>
          </h1>

          <div className="space-y-4 text-muted-foreground text-sm leading-relaxed mb-6">
            <p>
              I'm a Junior Data Scientist based in Mogadishu, Somalia. I specialize
              in transforming raw data into actionable insights using{" "}
              <a
                href="https://python.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="link-orange"
              >
                Python
              </a>
              , SQL, and Power BI.
            </p>
            <p>
              Currently pursuing my Bachelor's in Computer Science at Somali National
              University with a focus on Data Science, ML, and AI.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2 mb-8 text-sm">
            <a
              href="https://github.com/Diini03"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-primary hover:underline transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <span className="text-muted-foreground/50">|</span>
            <a
              href="https://www.linkedin.com/in/diinikahiye/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-primary hover:underline transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
            <span className="text-muted-foreground/50">||</span>
            <Link
              to="/about"
              className="flex items-center gap-1.5 text-green-500 hover:underline"
            >
              <span>More about me</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          {/* Company Badges */}
          <CompanyBadges />
        </section>

        {/* Dashboard Section */}
        <section className="mb-12">
          <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
            <span className="text-muted-foreground">//</span> Dashboard
          </h2>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <DashboardCard />
            <SkillsCard />
          </div>

          <LanguagesChart />
        </section>

        {/* Featured Projects */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold flex items-center gap-2">
              <Star className="w-4 h-4 text-muted-foreground" />
              Featured Projects
            </h2>
            <Link
              to="/projects"
              className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
            >
              View all
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} {...project} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
