import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Github, CheckCircle, Copy, Check, BarChart3, Lightbulb, ExternalLink, Trophy } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// COVID-19 Chart Images
import casesBubbleChart from "@/assets/projects/covid-19/cases-by-country-bubble.png";
import casesContinentChart from "@/assets/projects/covid-19/cases-by-continent.png";
import casesBarChart from "@/assets/projects/covid-19/cases-by-country-bar.png";
import testsChart from "@/assets/projects/covid-19/tests-by-country.png";
import timeSeriesChart from "@/assets/projects/covid-19/confirmed-over-time.png";

// Netflix Chart Images
import netflixMoviesVsTvShows from "@/assets/projects/netflix/movies-vs-tvshows.png";
import netflixContentRatings from "@/assets/projects/netflix/content-ratings.png";
import netflixMovieDurations from "@/assets/projects/netflix/movie-durations.png";
import netflixContentOverYears from "@/assets/projects/netflix/content-over-years.png";
import netflixCorrelationHeatmap from "@/assets/projects/netflix/correlation-heatmap.png";

// Fall Armyworm Chart Images
import fawClassDistribution from "@/assets/projects/fall-armyworm/class-distribution.png";
import fawSampleLeaves from "@/assets/projects/fall-armyworm/sample-leaves.png";
import fawModelArchitecture from "@/assets/projects/fall-armyworm/model-architecture.png";
import fawModel1Accuracy from "@/assets/projects/fall-armyworm/model1-accuracy.png";
import fawModel5Accuracy from "@/assets/projects/fall-armyworm/model5-accuracy.png";
import fawPredictionHealthy1 from "@/assets/projects/fall-armyworm/prediction-healthy-1.png";
import fawPredictionDiseased1 from "@/assets/projects/fall-armyworm/prediction-diseased-1.png";
import fawPredictionHealthy2 from "@/assets/projects/fall-armyworm/prediction-healthy-2.png";
import fawPredictionDiseased2 from "@/assets/projects/fall-armyworm/prediction-diseased-2.png";
import fawPredictionHealthy3 from "@/assets/projects/fall-armyworm/prediction-healthy-3.png";

// World Happiness Chart Images
import whHappinessOverTime from "@/assets/projects/world-happiness/happiness-over-time.png";
import whTop10Countries from "@/assets/projects/world-happiness/top-10-countries.png";
import whCorrelationHeatmap from "@/assets/projects/world-happiness/correlation-heatmap.png";
import whGdpVsHappiness from "@/assets/projects/world-happiness/gdp-vs-happiness.png";

// Power BI Dashboards
import somaliaForecastDashboard from "@/assets/projects/powerbi/somalia-displacement-forecast.png";
import somaliaIdpsDashboard from "@/assets/projects/powerbi/somalia-idps-unhcr.png";


interface ChartData {
  title: string;
  image: string;
  insight?: string;
}

interface StackEntry {
  name: string;
  role: string;
}

interface ProjectData {
  title: string;
  date: string;
  description: string;
  tags: string[];
  highlights?: string[];
  tools: string[];
  stack?: StackEntry[];
  role?: string;
  codeFile?: string;
  codeContent?: string;
  githubUrl?: string;
  keyInsight?: string;
  charts?: ChartData[];
  competitionUrl?: string;
  competitionName?: string;
}

const projectsData: Record<string, ProjectData> = {
  "somalia-displacement-forecast": {
    title: "Somalia Displacement Forecast Dashboard",
    date: "2025",
    description: "An interactive Power BI dashboard built on a Somalia displacement dataset covering 20+ districts and 8M+ displaced people. Records were cleaned in Power Query, modeled inside Power BI, and turned into KPIs and forecast-vs-actual measures with DAX — so the same view breaks displacement down by conflict, drought and flood, and lets a decision-maker see where the trend is heading, not just where it has been.",
    tags: ["power-bi", "dax", "power-query", "data-visualization", "humanitarian"],
    role: "Data analysis · BI dashboarding",
    charts: [
      { title: "Somalia Displacement Forecast Dashboard", image: somaliaForecastDashboard },
    ],
    tools: ["Power BI", "DAX", "Power Query", "Excel"],
    stack: [
      { name: "Power BI", role: "modeling & report design" },
      { name: "Power Query", role: "cleaning and shaping the raw feed" },
      { name: "DAX", role: "KPIs, forecast vs actual measures" },
      { name: "Excel", role: "source dataset staging" },
    ],
  },
  "somalia-idps-unhcr": {
    title: "Somalia IDPs Movement Dashboard (UNHCR-PRMN)",
    date: "2025",
    description: "A Power BI report built directly on the UNHCR-PRMN August 2023 dataset — the primary tracker for internal displacement in Somalia. Power Query reshaped the raw feed, DAX measures rolled it up into region, reason and priority-need views, and the resulting dashboard lets you follow where people moved, why they moved, and what they needed on arrival.",
    tags: ["power-bi", "dax", "power-query", "unhcr", "humanitarian"],
    role: "Data analysis · BI dashboarding",
    charts: [
      { title: "Somalia IDPs Dashboard", image: somaliaIdpsDashboard },
    ],
    tools: ["Power BI", "DAX", "Power Query"],
    stack: [
      { name: "Power BI", role: "interactive report & visuals" },
      { name: "Power Query", role: "shaping UNHCR-PRMN feed" },
      { name: "DAX", role: "region/reason/priority measures" },
    ],
  },
  "fall-armyworm-detection": {
    title: "Fall Armyworm Leaf Disease Detection Using Deep Learning",
    date: "2025",
    description: "A deep learning image classification project that detects Fall Armyworm damage on maize leaves — a pest responsible for major crop losses across East Africa. Five CNN architectures were trained end-to-end in TensorFlow/Keras, evaluated on held-out leaf images, and the strongest model reached 99.07% accuracy. Built for the PyCon Somalia 2025 Hackathon to make early, in-field disease detection practical for smallholder farmers.",
    tags: ["python", "tensorflow", "keras", "deep-learning", "cnn", "computer-vision"],
    competitionUrl: "https://zindi.africa/competitions/combating-food-insecurity-in-somalia",
    competitionName: "PyCon Somalia 2025 Hackathon",
    githubUrl: "https://github.com/Diini03/Data-Analysis-with-Python",
    charts: [
      { title: "Dataset Class Distribution", image: fawClassDistribution },
      { title: "Simple CNN Architecture", image: fawModelArchitecture },
      { title: "Model 5: Training Accuracy", image: fawModel5Accuracy },
      { title: "Prediction: Diseased Leaf", image: fawPredictionDiseased1 },
    ],
    tools: ["Python", "TensorFlow", "Keras", "NumPy", "Pandas", "Matplotlib", "Seaborn", "OpenCV", "Scikit-learn"],
    role: "Deep learning · Computer vision",
    stack: [
      { name: "Python", role: "end-to-end training pipeline" },
      { name: "TensorFlow / Keras", role: "building & training 5 CNN architectures" },
      { name: "OpenCV", role: "image preprocessing and augmentation" },
      { name: "Scikit-learn", role: "train/test split & evaluation metrics" },
      { name: "Matplotlib / Seaborn", role: "accuracy & loss visualization" },
    ],
    codeFile: "Fall_Armyworm_Detection.ipynb",
    codeContent: `# Fall Armyworm Leaf Disease Detection
# Deep Learning Image Classification Pipeline

import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import cv2
from sklearn.model_selection import train_test_split

# Load and prepare dataset
train_df = pd.read_csv("train.csv")
print(f"Dataset shape: {train_df.shape}")
print(f"Class distribution:\\n{train_df['label'].value_counts()}")

# Data augmentation for training
train_datagen = ImageDataGenerator(
    rescale=1./255,
    rotation_range=20,
    width_shift_range=0.2,
    height_shift_range=0.2,
    horizontal_flip=True,
    validation_split=0.2
)

# Model 1: Simple CNN (Baseline)
model1 = Sequential([
    Conv2D(32, (3, 3), activation='relu', input_shape=(224, 224, 3)),
    MaxPooling2D(2, 2),
    Conv2D(64, (3, 3), activation='relu'),
    MaxPooling2D(2, 2),
    Conv2D(128, (3, 3), activation='relu'),
    MaxPooling2D(2, 2),
    Flatten(),
    Dense(512, activation='relu'),
    Dropout(0.5),
    Dense(1, activation='sigmoid')
])

model1.compile(
    optimizer='adam',
    loss='binary_crossentropy',
    metrics=['accuracy']
)

# Train with callbacks
callbacks = [
    EarlyStopping(patience=5, restore_best_weights=True),
    ModelCheckpoint('best_model.h5', save_best_only=True)
]

history = model1.fit(
    train_generator,
    epochs=20,
    validation_data=val_generator,
    callbacks=callbacks
)

# Model 4: Advanced Transfer Learning (Best Model - 99.07% accuracy)
from tensorflow.keras.applications import MobileNetV2

base_model = MobileNetV2(weights='imagenet', include_top=False, input_shape=(224, 224, 3))
base_model.trainable = True  # Fine-tuning enabled

model4 = Sequential([
    base_model,
    tf.keras.layers.GlobalAveragePooling2D(),
    Dense(256, activation='relu'),
    Dropout(0.5),
    Dense(1, activation='sigmoid')
])

# Evaluation and prediction
def predict_leaf(image_path, model):
    img = cv2.imread(image_path)
    img = cv2.resize(img, (224, 224))
    img = img / 255.0
    img = np.expand_dims(img, axis=0)
    
    prediction = model.predict(img)[0][0]
    label = "Diseased (FAW)" if prediction > 0.5 else "Healthy"
    confidence = prediction if prediction > 0.5 else 1 - prediction
    
    return label, confidence

# Save final model for deployment
model4.save('fall_armyworm_detector.h5')
print("Model saved successfully for future use!")`,
  },
  "world-happiness-analysis": {
    title: "World Happiness Report Analysis (2008-2021)",
    date: "2025",
    description: "An exploratory analysis of the World Happiness Report from 2008 to 2021 — 2,363 country-year observations across 166+ countries. Pandas handled the cleaning and grouping, NumPy powered the numeric work, and Matplotlib/Seaborn turned the result into trend lines, top-10 rankings, and a correlation heatmap that shows which factors (GDP, social support, freedom, corruption) actually move happiness scores.",
    tags: ["python", "pandas", "matplotlib", "seaborn", "numpy", "eda"],
    githubUrl: "https://github.com/Diini03/Data-Analysis-with-Python",
    charts: [
      { title: "Average Global Happiness Over Time", image: whHappinessOverTime },
      { title: "Top 10 Happiest Countries", image: whTop10Countries },
      { title: "Correlation Between Happiness Factors", image: whCorrelationHeatmap },
    ],
    tools: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
    role: "Exploratory data analysis",
    stack: [
      { name: "Python", role: "analysis and scripting" },
      { name: "Pandas", role: "cleaning and grouping 2,363 rows across 166+ countries" },
      { name: "NumPy", role: "numeric operations on the happiness factors" },
      { name: "Matplotlib / Seaborn", role: "trend lines, top-10 rankings, correlation heatmap" },
    ],
    codeFile: "World_Happiness_Report_2024.ipynb",
    codeContent: `# World Happiness Report Analysis
# Exploring factors that influence global happiness

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

%matplotlib inline

# Set plot styles
sns.set(style="whitegrid", palette="pastel")

# Load dataset
df = pd.read_csv("world_happiness_report.csv")
print(f"Dataset shape: {df.shape}")
df.head()

# Key columns: Country name, year, Life Ladder (happiness score),
# Log GDP per capita, Social support, Healthy life expectancy,
# Freedom to make life choices, Generosity, Perceptions of corruption,
# Positive affect, Negative affect

# Dataset statistics
print(f"Dataset contains {len(df)} rows and {len(df.columns)} columns")
df.describe()

# Average happiness over time
yearly_avg = df.groupby('year')['Life Ladder'].mean()
plt.figure(figsize=(12, 6))
plt.plot(yearly_avg.index, yearly_avg.values, marker='o')
plt.title('Average Global Happiness Over Time')
plt.xlabel('Year')
plt.ylabel('Average Happiness Score (Life Ladder)')
plt.show()

# Top 10 happiest countries (latest year)
latest_year = df['year'].max()
top_10 = df[df['year'] == latest_year].nlargest(10, 'Life Ladder')
plt.figure(figsize=(10, 8))
plt.barh(top_10['Country name'], top_10['Life Ladder'], color=plt.cm.Pastel1.colors)
plt.xlabel('Happiness Score')
plt.title(f'Top 10 Happiest Countries in {latest_year}')
plt.gca().invert_yaxis()
plt.show()

# Correlation heatmap
numeric_cols = df.select_dtypes(include=[np.number]).columns
corr_matrix = df[numeric_cols].corr()
plt.figure(figsize=(12, 10))
sns.heatmap(corr_matrix, annot=True, cmap='RdBu_r', center=0, fmt='.2f')
plt.title('Correlation Between Happiness Factors')
plt.show()

# Does money buy happiness?
plt.figure(figsize=(10, 8))
plt.scatter(df['Log GDP per capita'], df['Life Ladder'], alpha=0.5)
plt.xlabel('Log GDP per Capita')
plt.ylabel('Happiness Score (Life Ladder)')
plt.title('Does Money Buy Happiness?')
plt.show()

print("Key Finding: Social support correlates 0.72 with happiness!")
print("Key Finding: Nordic countries consistently rank highest.")`,
  },
  "covid-19-analysis": {
    title: "Covid-19 Analysis and Visualization using Plotly Express",
    date: "2025",
    description: "Global COVID-19 analysis across 209 countries using interactive Plotly visualizations — bar charts, scatter plots, and choropleth maps.",
    tags: ["python", "pandas", "plotly", "matplotlib", "data-visualization"],
    charts: [
      { title: "Total Cases by Country", image: casesBubbleChart },
      { title: "Cases Distribution by Continent", image: casesContinentChart },
      { title: "Confirmed Cases Over Time", image: timeSeriesChart },
    ],
    tools: ["Python", "Pandas", "Plotly Express", "Plotly Graph Objects", "Matplotlib"],
    role: "Interactive data visualization",
    stack: [
      { name: "Python", role: "loading and preparing the datasets" },
      { name: "Pandas", role: "shaping COVID data across 209 countries" },
      { name: "Plotly Express", role: "bar charts, scatter plots, bubble maps" },
      { name: "Plotly Graph Objects", role: "choropleth maps and custom layouts" },
    ],
    codeFile: "Covid-19_Analysis.ipynb",
    githubUrl: "https://github.com/Diini03/Data-Analysis-with-Python/blob/main/Covid-19%20Analysis%20and%20Visualization%20using%20Plotly%20Express.ipynb",
    codeContent: `# Data analysis and Manipulation
import plotly.graph_objs as go
import plotly.io as pio
import plotly.express as px
import pandas as pd

# Data Visualization
import matplotlib.pyplot as plt

# Importing Plotly
import plotly.offline as py
py.init_notebook_mode(connected=True)

# Initializing Plotly
pio.renderers.default = 'colab'

# Importing Dataset1
dataset1 = pd.read_csv("covid.csv")
dataset1.head()  # returns first 5 rows

# Information about Dataset1
# return concise summary of dataframe
dataset1.info()

# Importing Dataset2
dataset2 = pd.read_csv("covid_grouped.csv")
dataset2.head()  # return first 5 rows of dataset2

# Returns tuple of shape (Rows, columns)
print(dataset2.shape)

# Returns size of dataframe
print(dataset2.size)

# Information about Dataset2
dataset2.info()  # return concise summary of dataframe

# Columns labels of a Dataset1
dataset1.columns

# Drop NewCases, NewDeaths, NewRecovered rows from dataset1
dataset1.drop(['NewCases', 'NewDeaths', 'NewRecovered'], 
              axis=1, inplace=True)

# Select random set of values from dataset1
dataset1.sample(5)

# Creating Bar Chart for Total Cases by Country
fig = px.bar(dataset1.head(20), 
             x='Country/Region', 
             y='TotalCases',
             color='TotalCases',
             title='Total COVID-19 Cases by Country (Top 20)')
fig.show()

# Scatter plot: Total Cases vs Total Deaths
fig = px.scatter(dataset1, 
                 x='TotalCases', 
                 y='TotalDeaths',
                 color='Continent',
                 size='Population',
                 hover_name='Country/Region',
                 title='Total Cases vs Total Deaths')
fig.show()

# Choropleth Map - Global COVID-19 Cases
fig = px.choropleth(dataset1,
                    locations='iso_alpha',
                    color='TotalCases',
                    hover_name='Country/Region',
                    color_continuous_scale='Reds',
                    title='Global COVID-19 Total Cases')
fig.show()`,
  },
  "netflix-data-analysis": {
    title: "Netflix Data Analysis & Visualization",
    date: "2025",
    description: "Analysis of 8,807 Netflix titles exploring content distribution, ratings, and trends over time.",
    tags: ["python", "pandas", "seaborn", "matplotlib", "numpy", "eda"],
    charts: [
      { title: "Movies vs TV Shows", image: netflixMoviesVsTvShows },
      { title: "Top 10 Content Ratings", image: netflixContentRatings },
      { title: "Content Added Over the Years", image: netflixContentOverYears },
    ],
    tools: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
    role: "Exploratory data analysis",
    stack: [
      { name: "Python", role: "notebook workflow" },
      { name: "Pandas", role: "cleaning 8,807 Netflix titles" },
      { name: "NumPy", role: "numeric summaries" },
      { name: "Matplotlib / Seaborn", role: "distribution, trend and rating charts" },
    ],
    codeFile: "Netflix_Data_Analysis.ipynb",
    githubUrl: "https://github.com/Diini03/Data-Analysis-with-Python/blob/main/Netflix%20Data%20Analysis%20%26%20Visualization.ipynb",
    codeContent: `# Cell 1: Import necessary libraries
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# Configure visuals
sns.set(style='whitegrid')
plt.rcParams['figure.figsize'] = (10, 6)

# Load the Netflix dataset
df = pd.read_csv("netflix_titles.csv")
df.head()

# Dataset information
df.info()
print("\\nshape of dataset:", df.shape)

# Check missing values
missing_values = df.isnull().sum().sort_values(ascending=False)
missing_values[missing_values > 0]

# Dataset statistics
df.describe(include='all').T

# Data Cleaning
# Fill missing 'rating' with 'Unknown'
df['rating'].fillna('Unknown', inplace=True)

# Drop rows with missing 'country' or 'date_added'
df.dropna(subset=['country', 'date_added'], inplace=True)
print("After cleaning, dataset shape:", df.shape)

# Convert 'date_added' to datetime
df.columns = df.columns.str.strip()
df['date_added'] = df['date_added'].astype(str).str.strip()
df['date_added'] = pd.to_datetime(df['date_added'], errors='coerce', format='mixed')

# Extract year for trend analysis
df['year_added'] = df['date_added'].dt.year
df[['date_added', 'year_added']].head(10)

# Content Type Distribution (Movies vs TV Shows)
type_counts = df['type'].value_counts()
sns.barplot(x=type_counts.index, y=type_counts.values, palette='pastel')
plt.title('Distribution of Content Types on Netflix')
plt.xlabel('Type')
plt.ylabel('Count')
plt.show()

# Top 10 Countries by Content
country_counts = df['country'].value_counts().head(10)
plt.figure(figsize=(12, 6))
sns.barplot(x=country_counts.values, y=country_counts.index, palette='viridis')
plt.title('Top 10 Countries by Netflix Content')
plt.xlabel('Number of Titles')
plt.ylabel('Country')
plt.show()

# Content Added Over Years
yearly_counts = df['year_added'].value_counts().sort_index()
plt.figure(figsize=(12, 6))
plt.plot(yearly_counts.index, yearly_counts.values, marker='o', color='red')
plt.title('Netflix Content Added Over Years')
plt.xlabel('Year')
plt.ylabel('Number of Titles Added')
plt.grid(True)
plt.show()

# Rating Distribution
rating_counts = df['rating'].value_counts()
plt.figure(figsize=(12, 6))
sns.barplot(x=rating_counts.index, y=rating_counts.values, palette='coolwarm')
plt.title('Content Rating Distribution')
plt.xticks(rotation=45)
plt.xlabel('Rating')
plt.ylabel('Count')
plt.show()`,
  },
};

export default function ProjectDetail() {
  const { id } = useParams();
  const project = id ? projectsData[id] : null;
  const [copied, setCopied] = useState(false);
  

  const handleCopyCode = async () => {
    if (project) {
      await navigator.clipboard.writeText(project.codeContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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
    <div className="min-h-screen animate-fade-in">
      <div className="max-w-4xl mx-auto px-6 py-12">
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
        <h1 className="text-2xl md:text-3xl font-bold text-primary mb-4">
          {project.title}
        </h1>

        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Key Insight */}
        {project.keyInsight && (
          <div className="terminal-card p-4 mb-6 border-l-4 border-l-primary bg-primary/5">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Key Insight</h3>
                <p className="text-sm text-muted-foreground">{project.keyInsight}</p>
              </div>
            </div>
          </div>
        )}

        {/* Spec sheet — role · stack · links */}
        <div className="terminal-card mb-10">
          <div className="terminal-header">
            <div className="flex items-center gap-1.5">
              <div className="terminal-dot terminal-dot-orange" />
              <div className="terminal-dot terminal-dot-blue" />
              <div className="terminal-dot terminal-dot-purple" />
            </div>
            <span className="text-xs text-muted-foreground ml-2">
              <span className="text-primary">project</span> / spec
            </span>
          </div>
          <div className="p-5 md:p-6 space-y-4 text-sm">
            {project.role && (
              <div className="grid grid-cols-[70px_1fr] gap-3 items-start">
                <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-muted-foreground pt-0.5">
                  role
                </span>
                <span className="text-foreground">{project.role}</span>
              </div>
            )}

            {(project.stack && project.stack.length > 0) ? (
              <div className="grid grid-cols-[70px_1fr] gap-3 items-start">
                <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-muted-foreground pt-0.5">
                  stack
                </span>
                <ul className="space-y-1.5">
                  {project.stack.map((s) => (
                    <li key={s.name} className="flex flex-wrap gap-x-2 items-baseline">
                      <span className="font-mono text-foreground">{s.name}</span>
                      <span className="text-muted-foreground/70">—</span>
                      <span className="text-muted-foreground">{s.role}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="grid grid-cols-[70px_1fr] gap-3 items-start">
                <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-muted-foreground pt-0.5">
                  stack
                </span>
                <span className="text-muted-foreground">{project.tools.join(" · ")}</span>
              </div>
            )}

            {(project.githubUrl || project.competitionUrl) && (
              <div className="grid grid-cols-[70px_1fr] gap-3 items-start">
                <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-muted-foreground pt-1.5">
                  links
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-border rounded text-xs text-primary hover:bg-secondary transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      View Code
                    </a>
                  )}
                  {project.competitionUrl && project.competitionName && (
                    <a
                      href={project.competitionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 border border-primary/30 rounded text-xs text-primary hover:bg-primary/20 transition-colors"
                    >
                      <Trophy className="w-3.5 h-3.5" />
                      {project.competitionName}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>


        {/* Visualizations Gallery */}
        {project.charts && project.charts.length > 0 && (
          <section className="mb-10">
            <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" />
              Visualizations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.charts.map((chart, index) => (
                <div
                  key={index}
                  className="terminal-card overflow-hidden"
                >
                  <div className="terminal-header">
                    <div className="flex items-center gap-1.5">
                      <div className="terminal-dot terminal-dot-red" />
                      <div className="terminal-dot terminal-dot-yellow" />
                      <div className="terminal-dot terminal-dot-green" />
                    </div>
                    <span className="text-xs text-muted-foreground ml-2 truncate">
                      {chart.title}
                    </span>
                  </div>
                  <div className="relative aspect-video bg-card overflow-hidden">
                    <img
                      src={chart.image}
                      alt={chart.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  {chart.insight && (
                    <div className="p-3 border-t border-border">
                      <p className="text-xs text-muted-foreground">
                        💡 {chart.insight}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}


        {/* Key Highlights */}
        {project.highlights && project.highlights.length > 0 && (
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
        )}


        {/* Code Snippet */}
        {project.codeContent && (
          <section>
            <div className="terminal-card">
              <div className="terminal-header flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex items-center gap-1.5">
                    <div className="terminal-dot terminal-dot-red" />
                    <div className="terminal-dot terminal-dot-yellow" />
                    <div className="terminal-dot terminal-dot-green" />
                  </div>
                  <span className="text-xs text-muted-foreground ml-2">{project.codeFile}</span>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 px-2 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-500" />
                      <span className="text-green-500">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
                <SyntaxHighlighter
                  language="python"
                  style={oneDark}
                  showLineNumbers
                  customStyle={{
                    margin: 0,
                    padding: "1rem",
                    background: "transparent",
                    fontSize: "0.75rem",
                  }}
                  lineNumberStyle={{
                    color: "hsl(var(--muted-foreground))",
                    opacity: 0.5,
                    minWidth: "2.5em",
                  }}
                >
                  {project.codeContent}
                </SyntaxHighlighter>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
