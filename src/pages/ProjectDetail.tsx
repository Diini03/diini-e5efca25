import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Github, CheckCircle, Wrench } from "lucide-react";

const projectsData: Record<string, {
  title: string;
  date: string;
  description: string;
  tags: string[];
  highlights: string[];
  tools: string[];
  codeFile: string;
  codeContent: string;
  githubUrl?: string;
}> = {
  "business-analysis": {
    title: "Business Analysis Dashboard",
    date: "October 2024",
    description: "Power BI dashboard to compare employee benefit packages with DAX and Excel transformations. The dashboard provides interactive visualizations for HR teams to analyze and compare employee benefits across departments.",
    tags: ["powerbi", "dax", "excel", "analytics", "dashboard"],
    highlights: [
      "Created interactive Power BI dashboard with 10+ visualizations",
      "Implemented DAX measures for complex benefit calculations",
      "Designed data model connecting multiple Excel sources",
      "Built dynamic filters for department and role comparison",
      "Automated data refresh with Power Query transformations",
    ],
    tools: ["Power BI", "DAX", "Excel", "Power Query"],
    codeFile: "benefit-analysis.dax",
    codeContent: `// Calculate Total Benefits Value
Total Benefits = 
SUMX(
    Employees,
    [Base Salary] * [Benefit Rate] + [Fixed Benefits]
)

// Year-over-Year Comparison
YoY Growth = 
VAR CurrentYear = [Total Benefits]
VAR PreviousYear = 
    CALCULATE(
        [Total Benefits],
        DATEADD('Date'[Date], -1, YEAR)
    )
RETURN
    DIVIDE(CurrentYear - PreviousYear, PreviousYear, 0)`,
  },
  "job-market-eda": {
    title: "Data Science Job Market EDA",
    date: "April 2024",
    description: "Analyzed 7000+ data science job listings to gain insights on landing analytics jobs. The analysis reveals salary trends, required skills, and hiring patterns across different industries and locations.",
    tags: ["python", "pandas", "matplotlib", "wordcloud", "eda"],
    highlights: [
      "Analyzed 7,000+ job listings from multiple sources",
      "Identified top 10 most demanded skills in data science",
      "Created salary distribution analysis by experience level",
      "Generated word clouds for job description keywords",
      "Built correlation analysis between skills and salary",
    ],
    tools: ["Python", "pandas", "Matplotlib", "WordCloud", "Jupyter Notebook"],
    codeFile: "job-market-eda.ipynb",
    codeContent: `# Import libraries
import pandas as pd
import matplotlib.pyplot as plt
from wordcloud import WordCloud

# Load job listings data
df = pd.read_csv('job_listings.csv')
print(f"Dataset shape: {df.shape}")
df.head()

# Analyze skill frequency
skills = df['skills'].str.split(',').explode()
skill_counts = skills.value_counts().head(10)
print("Top 10 Skills:")
print(skill_counts)

# Create visualization
plt.figure(figsize=(12, 6))
skill_counts.plot(kind='barh', color='#f97316')
plt.title('Top 10 Most Demanded Skills')
plt.xlabel('Number of Job Listings')
plt.show()`,
  },
  "customer-sales": {
    title: "Customer Sales Analysis",
    date: "November 2024",
    description: "SQL-based analysis extracting insights from customer sales databases using complex queries. The project demonstrates advanced SQL techniques including window functions, CTEs, and performance optimization.",
    tags: ["sql", "python", "mysql", "analytics", "visualization"],
    highlights: [
      "Designed optimized SQL queries for large datasets",
      "Implemented window functions for trend analysis",
      "Created customer segmentation using RFM analysis",
      "Built sales forecasting models with moving averages",
      "Generated automated reports with Python integration",
    ],
    tools: ["Python", "MySQL", "pandas", "SQLAlchemy", "Jupyter Notebook"],
    codeFile: "sales-analysis.sql",
    codeContent: `-- Customer RFM Analysis
WITH customer_rfm AS (
    SELECT 
        customer_id,
        DATEDIFF(CURRENT_DATE, MAX(order_date)) as recency,
        COUNT(DISTINCT order_id) as frequency,
        SUM(total_amount) as monetary
    FROM orders
    WHERE order_date >= DATE_SUB(CURRENT_DATE, INTERVAL 1 YEAR)
    GROUP BY customer_id
),
rfm_scores AS (
    SELECT *,
        NTILE(5) OVER (ORDER BY recency DESC) as r_score,
        NTILE(5) OVER (ORDER BY frequency) as f_score,
        NTILE(5) OVER (ORDER BY monetary) as m_score
    FROM customer_rfm
)
SELECT 
    customer_id,
    CONCAT(r_score, f_score, m_score) as rfm_segment,
    CASE 
        WHEN r_score >= 4 AND f_score >= 4 THEN 'Champion'
        WHEN r_score >= 3 AND f_score >= 3 THEN 'Loyal'
        WHEN r_score >= 4 THEN 'Recent'
        ELSE 'At Risk'
    END as customer_segment
FROM rfm_scores;`,
  },
};

export default function ProjectDetail() {
  const { id } = useParams();
  const project = id ? projectsData[id] : null;

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Project not found</h1>
          <Link to="/projects" className="text-primary hover:underline">
            Back to projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Back Link */}
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to projects
        </Link>

        {/* Date */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Calendar className="w-4 h-4" />
          {project.date}
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-primary mb-6">
          {project.title}
        </h1>

        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
          {project.description}
        </p>

        {/* View Code Button */}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded text-sm text-primary hover:bg-secondary transition-colors mb-6"
          >
            <Github className="w-4 h-4" />
            View Code
          </a>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-10">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs bg-secondary text-foreground rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Key Highlights */}
        <section className="mb-10">
          <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-primary" />
            Key Highlights
          </h2>
          <div className="terminal-card p-4">
            <ol className="space-y-3">
              {project.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="w-5 h-5 rounded bg-secondary flex items-center justify-center text-xs text-foreground shrink-0">
                    {index + 1}
                  </span>
                  {highlight}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Tools & Technologies */}
        <section className="mb-10">
          <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
            <Wrench className="w-4 h-4 text-primary" />
            Tools & Technologies
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.tools.map((tool) => (
              <span
                key={tool}
                className="px-4 py-2 text-sm bg-card border border-border text-foreground rounded"
              >
                {tool}
              </span>
            ))}
          </div>
        </section>

        {/* Code Snippet */}
        <section>
          <div className="terminal-card">
            <div className="terminal-header">
              <div className="flex items-center gap-1.5">
                <div className="terminal-dot terminal-dot-red" />
                <div className="terminal-dot terminal-dot-yellow" />
                <div className="terminal-dot terminal-dot-green" />
              </div>
              <span className="text-xs text-muted-foreground ml-2">{project.codeFile}</span>
            </div>
            <div className="p-4 overflow-x-auto">
              <pre className="text-xs font-mono text-muted-foreground whitespace-pre">
                {project.codeContent.split('\n').map((line, i) => (
                  <div key={i} className="leading-relaxed">
                    {line.startsWith('#') || line.startsWith('//') || line.startsWith('--') ? (
                      <span className="text-muted-foreground/60">{line}</span>
                    ) : line.includes('import') || line.includes('from') ? (
                      <>
                        <span className="text-purple-500">{line.split(' ')[0]}</span>
                        <span> {line.slice(line.indexOf(' '))}</span>
                      </>
                    ) : (
                      <span>{line}</span>
                    )}
                  </div>
                ))}
              </pre>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
