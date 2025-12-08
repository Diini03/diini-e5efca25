import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";

const blogPostsData: Record<string, {
  title: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  content: string;
}> = {
  "getting-started-with-python-data-analysis": {
    title: "Getting Started with Python for Data Analysis",
    date: "2024-12-01",
    readTime: "8 min read",
    category: "tutorials",
    tags: ["python", "pandas", "beginners"],
    content: `
## Introduction

Python has become the go-to language for data analysis, and for good reason. Its simplicity, powerful libraries, and vast community make it perfect for both beginners and experienced analysts.

## Setting Up Your Environment

First, you'll need to install Python and set up a virtual environment. I recommend using Anaconda for beginners as it comes with most data science packages pre-installed.

\`\`\`bash
# Create a new conda environment
conda create -n data-analysis python=3.10
conda activate data-analysis
\`\`\`

## Essential Libraries

### Pandas
Pandas is your bread and butter for data manipulation. It provides DataFrames - powerful 2D data structures that make data cleaning and analysis intuitive.

\`\`\`python
import pandas as pd

# Load a CSV file
df = pd.read_csv('data.csv')

# Basic exploration
print(df.head())
print(df.info())
print(df.describe())
\`\`\`

### NumPy
NumPy is the foundation for numerical computing in Python. It provides efficient array operations and mathematical functions.

### Matplotlib & Seaborn
For visualization, these two libraries complement each other perfectly. Matplotlib gives you low-level control, while Seaborn provides beautiful statistical visualizations out of the box.

## Next Steps

Once you're comfortable with these basics, explore:
- Jupyter Notebooks for interactive analysis
- Scikit-learn for machine learning
- Plotly for interactive visualizations

Happy analyzing! 🐍
    `,
  },
  "power-bi-vs-tableau": {
    title: "Power BI vs Tableau: Which Should You Learn?",
    date: "2024-11-15",
    readTime: "6 min read",
    category: "career",
    tags: ["power-bi", "tableau", "career"],
    content: `
## The BI Tool Debate

As a data professional, one of the most common questions I get is: "Should I learn Power BI or Tableau?" The honest answer is: it depends on your goals.

## Power BI Advantages

- **Cost-effective**: Free desktop version, affordable Pro licenses
- **Microsoft Integration**: Seamless with Excel, Azure, and Office 365
- **DAX Power**: Powerful formula language for complex calculations
- **Growing Market Share**: Increasingly popular in enterprise settings

## Tableau Advantages

- **Visualization Excellence**: Industry-leading chart customization
- **Community**: Larger community with more learning resources
- **Platform Agnostic**: Works well in any tech stack
- **Analytics Depth**: More advanced statistical features

## My Recommendation

If you're in a Microsoft-heavy organization or are cost-conscious, start with Power BI. If you're aiming for data visualization specialist roles or consulting, Tableau might open more doors.

The good news? Skills transfer between tools. Learning one makes the other easier.

## Final Thoughts

Don't stress too much about this decision. Pick one, master it, and add the other later. Your analytical thinking and data storytelling skills matter more than any specific tool.
    `,
  },
  "exploratory-data-analysis-best-practices": {
    title: "EDA Best Practices: A Data Scientist's Checklist",
    date: "2024-11-01",
    readTime: "10 min read",
    category: "data-science",
    tags: ["eda", "data-science", "best-practices"],
    content: `
## What is EDA?

Exploratory Data Analysis (EDA) is the crucial first step in any data science project. It's where you get to know your data before building models or drawing conclusions.

## The EDA Checklist

### 1. Understand the Data Structure
\`\`\`python
# Always start here
df.shape        # Rows and columns
df.dtypes       # Data types
df.columns      # Column names
\`\`\`

### 2. Check for Missing Values
Missing data can break your analysis. Always identify and handle them appropriately.

\`\`\`python
# Missing value analysis
df.isnull().sum()
df.isnull().sum() / len(df) * 100  # Percentage
\`\`\`

### 3. Statistical Summary
Get a feel for your numerical columns with descriptive statistics.

### 4. Distribution Analysis
- Histograms for continuous variables
- Bar charts for categorical variables
- Box plots to identify outliers

### 5. Correlation Analysis
Understand relationships between variables using correlation matrices and scatter plots.

### 6. Document Everything
Keep notes on:
- Data quality issues found
- Assumptions made
- Interesting patterns discovered
- Questions for stakeholders

## Common Mistakes to Avoid

1. **Skipping EDA entirely** - Never jump straight to modeling
2. **Ignoring outliers** - They might be errors or valuable insights
3. **Not validating data types** - A numeric column might be stored as text
4. **Confirmation bias** - Look for patterns that disprove your hypothesis too

## Conclusion

Good EDA saves time and prevents costly mistakes down the line. Take your time with it, and your future self will thank you.
    `,
  },
};

export default function BlogPost() {
  const { slug } = useParams();
  const post = slug ? blogPostsData[slug] : null;

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Post not found</h1>
          <Link to="/blog" className="text-primary hover:underline">
            Back to blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen animate-fade-in">
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Back Link */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to blog
        </Link>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {post.readTime}
          </span>
          <span className="px-2 py-0.5 bg-secondary rounded capitalize">
            {post.category.replace("-", " ")}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-primary mb-6">
          {post.title}
        </h1>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 px-2 py-1 text-xs bg-secondary text-foreground rounded"
            >
              <Tag className="w-3 h-3" />
              {tag}
            </span>
          ))}
        </div>

        {/* Content */}
        <article className="prose prose-invert prose-sm max-w-none">
          <div className="terminal-card p-6 space-y-4">
            {post.content.split('\n').map((line, index) => {
              if (line.startsWith('## ')) {
                return (
                  <h2 key={index} className="text-lg font-semibold text-primary mt-6 mb-3">
                    {line.replace('## ', '')}
                  </h2>
                );
              }
              if (line.startsWith('### ')) {
                return (
                  <h3 key={index} className="text-base font-semibold text-foreground mt-4 mb-2">
                    {line.replace('### ', '')}
                  </h3>
                );
              }
              if (line.startsWith('```')) {
                return null; // Handle code blocks separately if needed
              }
              if (line.startsWith('- ')) {
                return (
                  <li key={index} className="text-sm text-muted-foreground ml-4">
                    {line.replace('- ', '')}
                  </li>
                );
              }
              if (line.match(/^\d+\./)) {
                return (
                  <li key={index} className="text-sm text-muted-foreground ml-4 list-decimal">
                    {line.replace(/^\d+\.\s*/, '')}
                  </li>
                );
              }
              if (line.trim() === '') {
                return <br key={index} />;
              }
              return (
                <p key={index} className="text-sm text-muted-foreground leading-relaxed">
                  {line}
                </p>
              );
            })}
          </div>
        </article>
      </div>
    </div>
  );
}