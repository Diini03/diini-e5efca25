import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Github, CheckCircle, Wrench, Copy, Check, BarChart3, Lightbulb, ExternalLink, Trophy } from "lucide-react";
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

interface ChartData {
  title: string;
  image: string;
  insight: string;
}

interface ProjectData {
  title: string;
  date: string;
  description: string;
  tags: string[];
  highlights: string[];
  tools: string[];
  codeFile: string;
  codeContent: string;
  githubUrl?: string;
  keyInsight?: string;
  charts?: ChartData[];
  competitionUrl?: string;
  competitionName?: string;
}

const projectsData: Record<string, ProjectData> = {
  "fall-armyworm-detection": {
    title: "Fall Armyworm Leaf Disease Detection Using Deep Learning",
    date: "2025",
    description: "This project focuses on building an image classification system to detect Fall Armyworm damage on maize leaves using deep learning. Fall Armyworm is a major agricultural pest that significantly affects crop yield, especially in African countries. Early and accurate detection is critical for timely intervention and food security. The goal was to train, evaluate, and compare multiple deep learning models, then select the most effective model for real-world use.",
    tags: ["python", "tensorflow", "keras", "deep-learning", "cnn", "computer-vision"],
    competitionUrl: "https://zindi.africa/competitions/combating-food-insecurity-in-somalia",
    competitionName: "PyCon Somalia 2025 Hackathon",
    keyInsight: "Transfer learning with fine-tuning dramatically outperformed custom CNNs, achieving 99.07% validation accuracy. Model 4 was selected as the final solution due to its excellent generalization, stable learning curves, and suitability for real-world agricultural decision support.",
    charts: [
      {
        title: "Dataset Class Distribution",
        image: fawClassDistribution,
        insight: "Perfectly balanced dataset with 810 healthy and 810 diseased leaf samples"
      },
      {
        title: "Sample Leaf Images",
        image: fawSampleLeaves,
        insight: "Visual examples showing clear differences between healthy and FAW-damaged leaves"
      },
      {
        title: "Simple CNN Architecture (Model 1)",
        image: fawModelArchitecture,
        insight: "Baseline CNN with 11M parameters using Conv2D, MaxPooling, and Dense layers"
      },
      {
        title: "Model 1: Training Progress",
        image: fawModel1Accuracy,
        insight: "Baseline CNN achieved ~85% accuracy with gradual convergence over 10 epochs"
      },
      {
        title: "Model 5: Lightweight Model Accuracy",
        image: fawModel5Accuracy,
        insight: "Deployment-friendly model showing stable ~91.5% validation accuracy"
      },
      {
        title: "Prediction: Healthy Leaf Sample 1",
        image: fawPredictionHealthy1,
        insight: "Model correctly classifies healthy leaf with high confidence score"
      },
      {
        title: "Prediction: Diseased Leaf Sample",
        image: fawPredictionDiseased1,
        insight: "Fall Armyworm damage detected with strong prediction confidence"
      },
      {
        title: "Prediction: Healthy Leaf Sample 2",
        image: fawPredictionHealthy2,
        insight: "Consistent healthy classification demonstrating model reliability"
      },
      {
        title: "Prediction: Diseased Leaf Sample 2",
        image: fawPredictionDiseased2,
        insight: "Another diseased sample correctly identified by the model"
      },
      {
        title: "Prediction: Healthy Leaf Sample 3",
        image: fawPredictionHealthy3,
        insight: "Final test prediction confirming model's accuracy on healthy leaves"
      }
    ],
    highlights: [
      "Built and compared 5 deep learning models: Simple CNN, Deeper CNN, MobileNetV2, Advanced Transfer Learning, and Lightweight Deployment Model",
      "Achieved 99.07% validation accuracy with Model 4 (Advanced Transfer Learning with fine-tuning)",
      "Processed 1620+ labeled leaf images with proper stratified train/validation split",
      "Implemented data augmentation and preprocessing for robust model training",
      "Created a reusable .h5 model file for deployment without retraining",
      "Developed for PyCon Somalia 2025 Hackathon - Combating Food Insecurity in Somalia challenge on Zindi"
    ],
    tools: ["Python", "TensorFlow", "Keras", "NumPy", "Pandas", "Matplotlib", "Seaborn", "OpenCV", "Scikit-learn"],
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
  "covid-19-analysis": {
    title: "Covid-19 Analysis and Visualization using Plotly Express",
    date: "2024",
    description: "Analyzed global COVID-19 data across 209 countries using interactive Plotly visualizations including bar charts, scatter plots, and choropleth maps. The project explores total cases, deaths, recoveries, and testing data across different continents and WHO regions.",
    tags: ["python", "pandas", "plotly", "matplotlib", "data-visualization"],
    keyInsight: "The USA consistently led in both total cases and testing capacity, with clear exponential growth patterns visible from February to July 2020. This analysis reveals how different regions responded to the pandemic at varying rates.",
    charts: [
      {
        title: "Total Cases by Country (Bubble Chart)",
        image: casesBubbleChart,
        insight: "USA, Brazil, and India had the highest case counts globally"
      },
      {
        title: "Cases Distribution by Continent",
        image: casesContinentChart,
        insight: "North America led with 5M+ cases, followed by South America"
      },
      {
        title: "Top 15 Countries by Total Cases",
        image: casesBarChart,
        insight: "USA alone accounted for nearly 5M confirmed cases"
      },
      {
        title: "COVID-19 Testing by Country",
        image: testsChart,
        insight: "USA conducted 60M+ tests, significantly more than other nations"
      },
      {
        title: "Confirmed Cases Over Time",
        image: timeSeriesChart,
        insight: "Exponential growth from Feb to Jul 2020 across all countries"
      }
    ],
    highlights: [
      "Imported and analyzed COVID-19 datasets covering 209 countries with 17 data columns",
      "Created interactive bar charts comparing total cases, deaths, and recoveries by country",
      "Built scatter plots showing correlation between confirmed cases and deaths",
      "Developed choropleth maps for global visualization of pandemic spread",
      "Analyzed time-series data with 35,156 entries tracking daily case changes",
    ],
    tools: ["Python", "Pandas", "Plotly Express", "Plotly Graph Objects", "Matplotlib"],
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
    date: "2024",
    description: "Comprehensive analysis of 8807 Netflix titles exploring content distribution, trends over time, and country-based insights using Python visualization libraries. The project includes data cleaning, exploratory data analysis, and multiple visualization techniques.",
    tags: ["python", "pandas", "seaborn", "matplotlib", "numpy", "eda"],
    keyInsight: "Netflix's content library is heavily movie-focused (69.6% movies vs 30.4% TV shows), with TV-MA rated content dominating the platform. Content additions peaked dramatically in 2019 before declining, likely due to increased competition from other streaming services.",
    charts: [
      {
        title: "Distribution: Movies vs TV Shows",
        image: netflixMoviesVsTvShows,
        insight: "Movies make up ~69.6% of Netflix content (5,600+) vs TV Shows (~2,300)"
      },
      {
        title: "Top 10 Content Ratings on Netflix",
        image: netflixContentRatings,
        insight: "TV-MA dominates with ~3,000 titles, followed by TV-14 (~1,900)"
      },
      {
        title: "Distribution of Movie Durations",
        image: netflixMovieDurations,
        insight: "Most movies are 90-100 minutes long, following a right-skewed distribution"
      },
      {
        title: "Content Added Over the Years",
        image: netflixContentOverYears,
        insight: "Content additions peaked in 2019 with 1,350+ movies added that year"
      },
      {
        title: "Correlation Heatmap",
        image: netflixCorrelationHeatmap,
        insight: "Weak correlations between numeric features; duration slightly correlates with release year"
      }
    ],
    highlights: [
      "Analyzed 8807 Netflix titles with 12 data columns including movies and TV shows",
      "Cleaned missing data: 2634 missing directors, 831 missing countries, 825 missing cast",
      "Created distribution charts comparing Movies vs TV Shows (6131 movies, 2676 TV shows)",
      "Visualized top 10 countries by content production with United States leading at 2818 titles",
      "Performed trend analysis showing content additions over years from 1925 to 2021",
    ],
    tools: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
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
  const [selectedChart, setSelectedChart] = useState<ChartData | null>(null);

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

        {/* Competition Badge */}
        {project.competitionUrl && project.competitionName && (
          <a
            href={project.competitionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-lg text-sm text-primary hover:bg-primary/20 transition-colors mb-6"
          >
            <Trophy className="w-4 h-4" />
            <span className="font-medium">{project.competitionName}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}

        {/* View Code Button */}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded text-sm text-primary hover:bg-secondary transition-colors mb-6 ml-3"
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
                  className="terminal-card overflow-hidden cursor-pointer group hover:border-primary/50 transition-colors"
                  onClick={() => setSelectedChart(chart)}
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
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      💡 {chart.insight}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Chart Lightbox */}
        {selectedChart && (
          <div
            className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedChart(null)}
          >
            <div
              className="terminal-card max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="terminal-header flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex items-center gap-1.5">
                    <div className="terminal-dot terminal-dot-red" />
                    <div className="terminal-dot terminal-dot-yellow" />
                    <div className="terminal-dot terminal-dot-green" />
                  </div>
                  <span className="text-sm text-foreground ml-3 font-medium">
                    {selectedChart.title}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedChart(null)}
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm px-2"
                >
                  ✕ Close
                </button>
              </div>
              <div className="p-4 overflow-auto max-h-[70vh]">
                <img
                  src={selectedChart.image}
                  alt={selectedChart.title}
                  className="w-full h-auto object-contain"
                />
                <div className="mt-4 p-3 bg-secondary/50 rounded">
                  <p className="text-sm text-foreground">
                    <span className="text-primary font-medium">💡 Key Insight:</span>{" "}
                    {selectedChart.insight}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

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
      </div>
    </div>
  );
}
