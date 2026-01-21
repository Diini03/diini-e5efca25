import { Link } from "react-router-dom";
import { ArrowLeft, MapPin, Mail, Download, GraduationCap, Briefcase, Award, CheckCircle } from "lucide-react";
import { CurrentlyLearning } from "@/components/about/CurrentlyLearning";

// Certification logos
import freecodecampLogo from "@/assets/certifications/freecodecamp.png";
import analystBuilderLogo from "@/assets/certifications/analyst-builder.png";
import courseraLogo from "@/assets/certifications/coursera.png";

const experiences = [
  {
    type: "education",
    title: "Bachelor of Computer Science",
    org: "Somali National University",
    date: "2021 - 2026",
    description: "Focus: Data Science, Machine Learning, AI",
  },
  {
    type: "work",
    title: "Data Analyst",
    org: "Fly Graphics",
    location: "Mogadishu, Somalia",
    date: "Jan 2023 - Dec 2024",
    description:
      "Analyzed business data using Power BI to create interactive dashboards and reports. Transformed raw data into actionable insights for decision-making and strategic planning.",
  },
  {
    type: "work",
    title: "Data Management Assistant",
    org: "MEDAIR",
    location: "Mogadishu, Somalia",
    date: "Jun 2020 - Jul 2020",
    description:
      "Collected, stored, and monitored large datasets using Excel for accurate reporting. Explored and cleaned data to ensure consistency and accuracy in reports.",
  },
];

const skillCategories = [
  { name: "Languages", skills: ["Python", "SQL", "JavaScript", "TypeScript", "DAX"] },
  { name: "Data Analysis", skills: ["pandas", "matplotlib", "Power BI", "Excel"] },
  { name: "Databases", skills: ["MySQL", "SQLite", "Power Query"] },
  { name: "Web Dev", skills: ["React", "HTML/CSS", "Node.js", "Tailwind CSS"] },
  { name: "AI Development", skills: ["Cursor", "Lovable", "Warp"] },
  { name: "Tools", skills: ["Git", "Jupyter", "Streamlit", "WSL/Linux"] },
];

const certifications = [
  { name: "Data Analysis with Python", provider: "freeCodeCamp", year: "2024", logo: freecodecampLogo },
  { name: "Data Analyst Bootcamp", provider: "Analyst Builder", year: "2025", logo: analystBuilderLogo },
  { name: "Google UX Design Certificate", provider: "Coursera", year: "2024", logo: courseraLogo },
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
            I'm <span className="text-primary">Diini Kahiye</span>—Data Analyst by day, 
            aspiring Data Scientist by night. Based in Mogadishu, Somalia, I use Python, SQL, 
            R, Power BI, Tableau, and JavaScript to transform complex data into insights 
            that drive real decisions.
          </p>
          <p>
            My technical toolkit spans the full data pipeline—from Python (pandas, matplotlib, 
            BeautifulSoup), R, and SQL for analysis, to Power BI, Tableau, and Plotly for 
            visualization, to React, TypeScript, and JavaScript for front-end development. 
            I leverage cutting-edge AI development tools like <span className="text-primary">Cursor</span>, 
            <span className="text-primary">Lovable</span>, and <span className="text-primary">Warp</span> to 
            accelerate development and build production-ready interfaces efficiently.
          </p>
          <p>
            Having recently graduated with my Computer Science degree from Somali National University, 
            I'm now on my journey toward becoming a full Data Scientist—building machine learning 
            models and data-driven projects along the way. I've contributed to humanitarian data 
            projects and built data visualization dashboards that drive decision-making. I'm 
            passionate about using technology to solve real-world problems in my community.
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
                <div className="text-sm text-foreground">diini@st.snu.edu.so</div>
              </div>
            </div>
          </div>
        </div>

        {/* Download CV Button - Enhanced */}
        <a 
          href="/cv.html"
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

        {/* Skills & Technologies */}
        <section className="mb-12">
          <h2 className="text-base font-semibold mb-6 flex items-center gap-2">
            <span className="text-primary">&lt;/&gt;</span>
            Skills & Technologies
          </h2>

          <div className="space-y-4">
            {skillCategories.map((category) => (
              <div key={category.name} className="terminal-card p-4">
                <div className="text-xs text-primary mb-3">{category.name}</div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-xs bg-secondary text-foreground rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications - Eye-Catching Cards */}
        <section className="mb-12">
          <h2 className="text-base font-semibold mb-6 flex items-center gap-2">
            <Award className="w-4 h-4 text-primary" />
            Certifications
          </h2>

          <div className="grid gap-4">
            {certifications.map((cert, index) => (
              <div 
                key={index}
                className="group flex items-center gap-4 p-5 border border-border rounded-xl bg-card hover:border-primary/50 hover:bg-card/80 transition-all duration-300"
              >
                {/* Logo */}
                <div className="w-14 h-14 rounded-xl bg-card overflow-hidden flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 border border-border">
                  <img 
                    src={cert.logo} 
                    alt={cert.provider} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                    {cert.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{cert.provider}</p>
                </div>
                
                {/* Year Badge */}
                <span className="px-3 py-1.5 text-xs font-mono bg-primary/10 text-primary rounded-full font-semibold shrink-0">
                  {cert.year}
                </span>
                
                {/* Verified Icon */}
                <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Currently Learning */}
        <CurrentlyLearning />
      </div>
    </div>
  );
}
