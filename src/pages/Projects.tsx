import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

import kulmidDarkImg from "@/assets/projects/kulmid-dark.png";
import kulmidLightImg from "@/assets/projects/kulmid-light.png";

type Project = {
  slug: string;
  title: string;
  description: string;
  category: string; // small label inside card
  imageDark?: string;
  imageLight?: string;
  liveUrl?: string;
};

const groups: { name: string; projects: Project[] }[] = [
  {
    name: "Machine Learning",
    projects: [
      {
        slug: "fall-armyworm-detection",
        title: "Fall Armyworm Leaf Disease Detection",
        description:
          "Deep learning image classification achieving 99.07% accuracy to detect Fall Armyworm damage on maize leaves. Built 5 CNN models for PyCon Somalia 2025 Hackathon.",
        category: "Python · TensorFlow · CNN",
      },
    ],
  },
  {
    name: "Data Analysis",
    projects: [
      {
        slug: "world-happiness-analysis",
        title: "World Happiness Report Analysis (2008–2021)",
        description:
          "Analyzed global happiness trends across 2,363 data points exploring GDP, social support, freedom, and corruption.",
        category: "Python · Pandas · Seaborn",
      },
      {
        slug: "covid-19-analysis",
        title: "Covid-19 Analysis & Visualization",
        description:
          "Analyzed global COVID-19 data across 209 countries using interactive Plotly visualizations including bar charts, scatter plots, and choropleth maps.",
        category: "Python · Plotly · Pandas",
      },
      {
        slug: "netflix-data-analysis",
        title: "Netflix Data Analysis & Visualization",
        description:
          "Comprehensive analysis of 8,807 Netflix titles exploring content distribution, trends over time, and country-based insights.",
        category: "Python · Pandas · EDA",
      },
    ],
  },
  {
    name: "Product Engineering",
    projects: [
      {
        slug: "kulmid",
        title: "Kulmid — Event Management Platform",
        description:
          "A full-featured event management web app where users can create, manage, and share events. Includes registration, attendee management, invitations, and ticketing.",
        category: "React · TypeScript · Supabase",
        imageDark: kulmidDarkImg,
        imageLight: kulmidLightImg,
        liveUrl: "https://www.kulmid.com/",
      },
    ],
  },
];

export default function Projects() {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen animate-fade-in">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back home
        </Link>

        <h1 className="text-2xl font-bold text-primary mb-2">Projects</h1>
        <p className="text-muted-foreground text-sm mb-12">
          Selected technical work across machine learning, data analysis, and product engineering.
        </p>

        <div className="space-y-14">
          {groups.map((group) => (
            <section key={group.name}>
              <div className="flex items-center gap-3 mb-5">
                <h2 className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground/80">
                  {group.name}
                </h2>
                <div className="flex-1 h-px bg-border/40" />
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.projects.map((project) => (
                  <Link
                    key={project.slug}
                    to={project.liveUrl ? project.liveUrl : `/projects/${project.slug}`}
                    target={project.liveUrl ? "_blank" : undefined}
                    rel={project.liveUrl ? "noopener noreferrer" : undefined}
                    className="block rounded-lg border border-border/60 bg-card/50 hover:bg-card hover:border-primary/40 transition-all group overflow-hidden flex flex-col"
                  >
                    {(project.imageDark || project.imageLight) && (
                      <div className="relative overflow-hidden h-32">
                        <img
                          src={project.imageLight || project.imageDark}
                          alt={project.title}
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                        {project.liveUrl && (
                          <span className="absolute top-2 right-2 px-2 py-0.5 bg-primary text-primary-foreground text-[10px] font-medium rounded">
                            Live
                          </span>
                        )}
                      </div>
                    )}

                    <div className="p-4 flex-1 flex flex-col">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors leading-snug">
                          {project.title}
                        </h3>
                        <ExternalLink className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" />
                      </div>
                      <p className="text-xs text-muted-foreground flex-1 line-clamp-3 mb-3">
                        {project.description}
                      </p>
                      <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground/70 mt-auto">
                        {project.category}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
