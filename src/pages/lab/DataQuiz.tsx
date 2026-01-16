import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Brain, Lightbulb, Quote, CheckCircle, XCircle, RotateCcw, ChevronRight } from "lucide-react";
import { PageTransition } from "@/components/layout/PageTransition";
import { Button } from "@/components/ui/button";

type QuizPhase = "tips" | "quiz" | "results";

interface Question {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const tips = [
  {
    title: "Clean Your Data First",
    content: "80% of a data analyst's time is spent cleaning and preparing data. Always check for missing values, duplicates, and outliers before analysis.",
  },
  {
    title: "Know Your Data Types",
    content: "Understanding the difference between categorical, numerical, ordinal, and nominal data is crucial for choosing the right analysis methods.",
  },
  {
    title: "Correlation ≠ Causation",
    content: "Just because two variables move together doesn't mean one causes the other. Always consider confounding variables.",
  },
  {
    title: "Visualize Before Modeling",
    content: "Create exploratory visualizations before building models. Patterns, outliers, and relationships become obvious when you plot your data.",
  },
  {
    title: "Document Everything",
    content: "Write clear comments, maintain data dictionaries, and document your methodology. Future you (and your team) will thank you.",
  },
];

const questions: Question[] = [
  {
    question: "Which Python library is primarily used for data manipulation and analysis?",
    options: ["NumPy", "Pandas", "Matplotlib", "Scikit-learn"],
    correct: 1,
    explanation: "Pandas is the go-to library for data manipulation, providing DataFrames and Series for structured data analysis.",
  },
  {
    question: "What does SQL stand for?",
    options: ["Structured Query Language", "Simple Question Language", "Standard Query Logic", "System Quality Language"],
    correct: 0,
    explanation: "SQL (Structured Query Language) is the standard language for managing and querying relational databases.",
  },
  {
    question: "Which measure of central tendency is most affected by outliers?",
    options: ["Median", "Mode", "Mean", "Range"],
    correct: 2,
    explanation: "The mean (average) is sensitive to extreme values, while median and mode are more robust to outliers.",
  },
  {
    question: "What is the purpose of a JOIN in SQL?",
    options: ["To delete rows", "To combine rows from multiple tables", "To sort data", "To create indexes"],
    correct: 1,
    explanation: "JOINs allow you to combine rows from two or more tables based on a related column between them.",
  },
  {
    question: "In machine learning, what is 'overfitting'?",
    options: ["Model is too simple", "Model memorizes training data", "Model has high bias", "Model runs too slowly"],
    correct: 1,
    explanation: "Overfitting occurs when a model learns the training data too well, including noise, and fails to generalize to new data.",
  },
  {
    question: "Which type of chart is best for showing composition?",
    options: ["Line chart", "Scatter plot", "Pie chart", "Histogram"],
    correct: 2,
    explanation: "Pie charts effectively show how parts make up a whole, making them ideal for composition/proportion data.",
  },
  {
    question: "What does ETL stand for in data engineering?",
    options: ["Extract, Transform, Load", "Enter, Test, Leave", "Edit, Transfer, Link", "Evaluate, Train, Learn"],
    correct: 0,
    explanation: "ETL (Extract, Transform, Load) is the process of extracting data from sources, transforming it, and loading it into a destination.",
  },
  {
    question: "Which Python library is commonly used for data visualization?",
    options: ["Pandas", "NumPy", "Matplotlib", "Requests"],
    correct: 2,
    explanation: "Matplotlib is the foundational plotting library in Python, with Seaborn and Plotly building on top of it.",
  },
  {
    question: "What is a 'null hypothesis' in statistics?",
    options: ["A hypothesis that is always true", "A hypothesis of no effect or difference", "A hypothesis with null values", "A rejected hypothesis"],
    correct: 1,
    explanation: "The null hypothesis states there is no significant difference or effect, serving as the default assumption to test against.",
  },
  {
    question: "Which technique is used to handle missing data?",
    options: ["Normalization", "Imputation", "Aggregation", "Indexing"],
    correct: 1,
    explanation: "Imputation fills in missing values using methods like mean, median, mode, or more sophisticated algorithms.",
  },
];

const quotes = [
  {
    text: "Data is the new oil. It's valuable, but if unrefined it cannot really be used.",
    author: "Clive Humby",
    field: "Data Science",
  },
  {
    text: "Without big data analytics, companies are blind and deaf, wandering out onto the web like deer on a freeway.",
    author: "Geoffrey Moore",
    field: "Data Analytics",
  },
  {
    text: "Machine learning is the last invention that humanity will ever need to make.",
    author: "Nick Bostrom",
    field: "Machine Learning",
  },
  {
    text: "Artificial intelligence is the new electricity.",
    author: "Andrew Ng",
    field: "AI",
  },
  {
    text: "The goal is to turn data into information, and information into insight.",
    author: "Carly Fiorina",
    field: "Data Analysis",
  },
  {
    text: "Data beats emotions.",
    author: "Sean Rad",
    field: "Data Science",
  },
  {
    text: "In God we trust. All others must bring data.",
    author: "W. Edwards Deming",
    field: "Data Analysis",
  },
  {
    text: "The world is one big data problem.",
    author: "Andrew McAfee",
    field: "Data Science",
  },
];

export default function DataQuiz() {
  const [phase, setPhase] = useState<QuizPhase>("tips");
  const [currentTip, setCurrentTip] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);

  const shuffledQuestions = useMemo(() => {
    return [...questions].sort(() => Math.random() - 0.5).slice(0, 5);
  }, []);

  const randomQuote = useMemo(() => {
    return quotes[Math.floor(Math.random() * quotes.length)];
  }, [phase]);

  const handleNextTip = () => {
    if (currentTip < tips.length - 1) {
      setCurrentTip(currentTip + 1);
    } else {
      setPhase("quiz");
    }
  };

  const handleSelectAnswer = (index: number) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
    if (index === shuffledQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
    setAnswers([...answers, index]);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < shuffledQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setPhase("results");
    }
  };

  const handleRestart = () => {
    setPhase("tips");
    setCurrentTip(0);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setAnswers([]);
  };

  const getScoreMessage = () => {
    const percentage = (score / shuffledQuestions.length) * 100;
    if (percentage === 100) return "Perfect! You're a data wizard! 🧙‍♂️";
    if (percentage >= 80) return "Excellent! You know your data! 📊";
    if (percentage >= 60) return "Good job! Keep learning! 📚";
    if (percentage >= 40) return "Not bad! Room for improvement! 💪";
    return "Keep studying! Data skills take time! 🌱";
  };

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/lab"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6 font-mono text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Lab
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <Brain className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-mono font-bold text-foreground">Data Quiz</h1>
          </div>
          <p className="text-muted-foreground font-mono">
            Learn tips, test your knowledge, and get inspired!
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center gap-2 mb-8">
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono ${phase === "tips" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
            <Lightbulb className="w-3 h-3" />
            Tips
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono ${phase === "quiz" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
            <Brain className="w-3 h-3" />
            Quiz
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono ${phase === "results" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
            <CheckCircle className="w-3 h-3" />
            Results
          </div>
        </div>

        {/* Tips Phase */}
        {phase === "tips" && (
          <div className="border border-border rounded-lg p-6 bg-card">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-muted-foreground">
                Tip {currentTip + 1} of {tips.length}
              </span>
              <Lightbulb className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-mono font-semibold text-foreground mb-3">
              {tips[currentTip].title}
            </h2>
            <p className="text-muted-foreground font-mono leading-relaxed mb-6">
              {tips[currentTip].content}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                {tips.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-colors ${i === currentTip ? "bg-primary" : "bg-muted"}`}
                  />
                ))}
              </div>
              <Button onClick={handleNextTip} className="font-mono">
                {currentTip < tips.length - 1 ? "Next Tip" : "Start Quiz"}
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* Quiz Phase */}
        {phase === "quiz" && (
          <div className="border border-border rounded-lg p-6 bg-card">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-muted-foreground">
                Question {currentQuestion + 1} of {shuffledQuestions.length}
              </span>
              <span className="text-xs font-mono text-primary">
                Score: {score}/{currentQuestion + (showExplanation ? 1 : 0)}
              </span>
            </div>
            
            <h2 className="text-lg font-mono font-semibold text-foreground mb-6">
              {shuffledQuestions[currentQuestion].question}
            </h2>

            <div className="space-y-3 mb-6">
              {shuffledQuestions[currentQuestion].options.map((option, index) => {
                const isCorrect = index === shuffledQuestions[currentQuestion].correct;
                const isSelected = index === selectedAnswer;
                
                let buttonClass = "w-full text-left p-4 rounded-lg border font-mono text-sm transition-all ";
                
                if (showExplanation) {
                  if (isCorrect) {
                    buttonClass += "border-green-500 bg-green-500/10 text-green-400";
                  } else if (isSelected && !isCorrect) {
                    buttonClass += "border-red-500 bg-red-500/10 text-red-400";
                  } else {
                    buttonClass += "border-border text-muted-foreground opacity-50";
                  }
                } else {
                  buttonClass += "border-border hover:border-primary hover:bg-primary/5 text-foreground cursor-pointer";
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleSelectAnswer(index)}
                    className={buttonClass}
                    disabled={showExplanation}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span>{option}</span>
                      {showExplanation && isCorrect && (
                        <CheckCircle className="w-4 h-4 ml-auto text-green-500" />
                      )}
                      {showExplanation && isSelected && !isCorrect && (
                        <XCircle className="w-4 h-4 ml-auto text-red-500" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {showExplanation && (
              <div className="bg-muted/50 rounded-lg p-4 mb-6">
                <p className="text-sm font-mono text-muted-foreground">
                  <span className="text-primary font-semibold">Explanation: </span>
                  {shuffledQuestions[currentQuestion].explanation}
                </p>
              </div>
            )}

            {showExplanation && (
              <div className="flex justify-end">
                <Button onClick={handleNextQuestion} className="font-mono">
                  {currentQuestion < shuffledQuestions.length - 1 ? "Next Question" : "See Results"}
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Results Phase */}
        {phase === "results" && (
          <div className="space-y-6">
            {/* Score Card */}
            <div className="border border-border rounded-lg p-8 bg-card text-center">
              <div className="text-6xl font-mono font-bold text-primary mb-2">
                {score}/{shuffledQuestions.length}
              </div>
              <p className="text-xl font-mono text-foreground mb-2">
                {getScoreMessage()}
              </p>
              <p className="text-sm text-muted-foreground font-mono mb-6">
                You got {Math.round((score / shuffledQuestions.length) * 100)}% correct
              </p>
              <Button onClick={handleRestart} className="font-mono">
                <RotateCcw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </div>

            {/* Inspirational Quote */}
            <div className="border border-border rounded-lg p-6 bg-card">
              <div className="flex items-start gap-3">
                <Quote className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="text-lg font-mono text-foreground italic mb-3">
                    "{randomQuote.text}"
                  </p>
                  <p className="text-sm font-mono text-muted-foreground">
                    — {randomQuote.author}
                  </p>
                  <span className="inline-block mt-2 text-xs font-mono px-2 py-1 rounded bg-primary/10 text-primary">
                    {randomQuote.field}
                  </span>
                </div>
              </div>
            </div>

            {/* More Quotes */}
            <div className="border border-border rounded-lg p-6 bg-card">
              <h3 className="text-lg font-mono font-semibold text-foreground mb-4 flex items-center gap-2">
                <Quote className="w-5 h-5 text-primary" />
                More Inspiration
              </h3>
              <div className="grid gap-4">
                {quotes.slice(0, 4).map((quote, index) => (
                  <div key={index} className="border-l-2 border-primary/30 pl-4">
                    <p className="text-sm font-mono text-muted-foreground italic">
                      "{quote.text}"
                    </p>
                    <p className="text-xs font-mono text-primary mt-1">
                      — {quote.author} • {quote.field}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
