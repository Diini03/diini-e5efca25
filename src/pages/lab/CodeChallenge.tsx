import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, RotateCcw, Timer, Zap, Target, ChevronRight } from "lucide-react";
import { PageTransition } from "@/components/layout/PageTransition";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

type Difficulty = "beginner" | "intermediate" | "advanced";

interface Snippet {
  code: string;
  label: string;
  lang: string;
  difficulty: Difficulty;
}

const snippets: Snippet[] = [
  // Beginner
  { code: "import pandas as pd", label: "Import Pandas", lang: "Python", difficulty: "beginner" },
  { code: "df = pd.read_csv('data.csv')", label: "Read CSV file", lang: "Pandas", difficulty: "beginner" },
  { code: "SELECT * FROM users;", label: "Select all rows", lang: "SQL", difficulty: "beginner" },
  { code: "df.head(10)", label: "Show first 10 rows", lang: "Pandas", difficulty: "beginner" },
  { code: "print(df.shape)", label: "Print DataFrame shape", lang: "Python", difficulty: "beginner" },
  // Intermediate
  { code: "df.groupby('category')['price'].mean()", label: "Group by and average", lang: "Pandas", difficulty: "intermediate" },
  { code: "SELECT name, COUNT(*) FROM orders GROUP BY name;", label: "SQL group by count", lang: "SQL", difficulty: "intermediate" },
  { code: "df.dropna(subset=['age', 'salary'])", label: "Drop nulls in columns", lang: "Pandas", difficulty: "intermediate" },
  { code: "from sklearn.model_selection import train_test_split", label: "Import train_test_split", lang: "Python", difficulty: "intermediate" },
  { code: "np.random.seed(42)", label: "Set random seed", lang: "NumPy", difficulty: "intermediate" },
  // Advanced
  { code: "X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)", label: "Split train/test data", lang: "Scikit-learn", difficulty: "advanced" },
  { code: "df.pivot_table(index='date', columns='product', values='revenue', aggfunc='sum')", label: "Pivot table aggregation", lang: "Pandas", difficulty: "advanced" },
  { code: "SELECT department, AVG(salary) FROM employees WHERE hire_date > '2020-01-01' GROUP BY department HAVING AVG(salary) > 50000;", label: "Complex SQL query", lang: "SQL", difficulty: "advanced" },
  { code: "model = Sequential([Dense(128, activation='relu'), Dropout(0.3), Dense(1, activation='sigmoid')])", label: "Build neural network", lang: "Keras", difficulty: "advanced" },
];

export default function CodeChallenge() {
  const [difficulty, setDifficulty] = useState<Difficulty>("beginner");
  const [currentSnippet, setCurrentSnippet] = useState<Snippet | null>(null);
  const [userInput, setUserInput] = useState("");
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [stats, setStats] = useState({ wpm: 0, accuracy: 0, time: 0 });
  const [bestWpm, setBestWpm] = useState(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  const filteredSnippets = snippets.filter((s) => s.difficulty === difficulty);

  const pickRandom = useCallback(() => {
    const pool = filteredSnippets;
    return pool[Math.floor(Math.random() * pool.length)];
  }, [difficulty]);

  const startChallenge = useCallback(() => {
    const snippet = pickRandom();
    setCurrentSnippet(snippet);
    setUserInput("");
    setStarted(false);
    setFinished(false);
    setElapsed(0);
    setStats({ wpm: 0, accuracy: 0, time: 0 });
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [pickRandom]);

  useEffect(() => {
    startChallenge();
  }, [difficulty]);

  useEffect(() => {
    if (started && !finished) {
      timerRef.current = setInterval(() => {
        setElapsed(Date.now() - startTime);
      }, 100);
    }
    return () => clearInterval(timerRef.current);
  }, [started, finished, startTime]);

  const handleInput = (value: string) => {
    if (!currentSnippet) return;
    if (!started) {
      setStarted(true);
      setStartTime(Date.now());
    }
    setUserInput(value);

    if (value.length >= currentSnippet.code.length) {
      setFinished(true);
      const timeSec = (Date.now() - startTime) / 1000;
      const words = currentSnippet.code.length / 5;
      const wpm = Math.round(words / (timeSec / 60));
      let correct = 0;
      for (let i = 0; i < currentSnippet.code.length; i++) {
        if (value[i] === currentSnippet.code[i]) correct++;
      }
      const accuracy = Math.round((correct / currentSnippet.code.length) * 100);
      setStats({ wpm, accuracy, time: Math.round(timeSec * 10) / 10 });
      if (wpm > bestWpm && accuracy >= 80) setBestWpm(wpm);
    }
  };

  const progress = currentSnippet
    ? Math.min((userInput.length / currentSnippet.code.length) * 100, 100)
    : 0;

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/lab"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-mono mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Lab
          </Link>
          <h1 className="text-3xl font-mono font-bold text-foreground">Code Challenge</h1>
          <p className="text-muted-foreground font-mono mt-2">
            Type the snippet as fast and accurately as you can.
          </p>
        </div>

        {/* Difficulty */}
        <div className="flex gap-2 mb-6">
          {(["beginner", "intermediate", "advanced"] as Difficulty[]).map((d) => (
            <Button
              key={d}
              variant={difficulty === d ? "default" : "outline"}
              size="sm"
              onClick={() => setDifficulty(d)}
              className="font-mono capitalize"
            >
              {d}
            </Button>
          ))}
          {bestWpm > 0 && (
            <span className="ml-auto flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
              <Zap className="w-3.5 h-3.5 text-yellow-500" />
              Best: {bestWpm} WPM
            </span>
          )}
        </div>

        {currentSnippet && (
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Snippet info */}
            <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground">
              <span className="px-2 py-0.5 bg-primary/10 text-primary rounded">{currentSnippet.lang}</span>
              <span>{currentSnippet.label}</span>
            </div>

            {/* Code display with character highlighting */}
            <div className="border border-border rounded-xl bg-card overflow-hidden">
              <div className="terminal-header flex items-center gap-2 px-3 py-2">
                <div className="flex items-center gap-1.5">
                  <div className="terminal-dot terminal-dot-orange" />
                  <div className="terminal-dot terminal-dot-blue" />
                  <div className="terminal-dot terminal-dot-purple" />
                </div>
                <span className="text-[10px] text-muted-foreground ml-1 font-mono">snippet</span>
              </div>
              <div className="p-5 font-mono text-base leading-relaxed whitespace-pre-wrap break-all">
                {currentSnippet.code.split("").map((char, i) => {
                  let className = "text-muted-foreground/60";
                  if (i < userInput.length) {
                    className = userInput[i] === char ? "text-green-400" : "text-red-400 bg-red-400/15 rounded-sm";
                  } else if (i === userInput.length && !finished) {
                    className = "text-foreground border-b-2 border-primary animate-pulse";
                  }
                  return (
                    <span key={i} className={className}>
                      {char === " " && i < userInput.length && userInput[i] !== char ? "·" : char}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Progress bar */}
            <Progress value={progress} className="h-2" />

            {/* Input area */}
            <textarea
              ref={inputRef}
              value={userInput}
              onChange={(e) => !finished && handleInput(e.target.value)}
              disabled={finished}
              placeholder={finished ? "" : "Start typing here..."}
              className="w-full h-24 p-4 font-mono text-sm bg-secondary/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none disabled:opacity-50"
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
            />

            {/* Live stats */}
            <div className="flex items-center justify-center gap-6 text-xs font-mono text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Timer className="w-3.5 h-3.5" />
                {(elapsed / 1000).toFixed(1)}s
              </span>
              <span className="flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5" />
                {userInput.length}/{currentSnippet.code.length} chars
              </span>
            </div>

            {/* Results */}
            {finished && (
              <div className="border border-primary/30 rounded-xl p-6 bg-primary/5 text-center space-y-4">
                <h3 className="font-mono font-bold text-lg text-foreground">
                  {stats.accuracy >= 95 ? "🎯 Perfect!" : stats.accuracy >= 80 ? "👏 Nice work!" : "Keep practicing!"}
                </h3>
                <div className="flex justify-center gap-8 font-mono">
                  <div>
                    <p className="text-2xl font-bold text-primary">{stats.wpm}</p>
                    <p className="text-[10px] text-muted-foreground">WPM</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stats.accuracy}%</p>
                    <p className="text-[10px] text-muted-foreground">Accuracy</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stats.time}s</p>
                    <p className="text-[10px] text-muted-foreground">Time</p>
                  </div>
                </div>
                <Button onClick={startChallenge} className="font-mono">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Next Challenge
                </Button>
              </div>
            )}

            {/* New snippet button */}
            {!finished && (
              <div className="text-center">
                <Button onClick={startChallenge} variant="outline" size="sm" className="font-mono">
                  <ChevronRight className="w-4 h-4 mr-1" />
                  Skip snippet
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </PageTransition>
  );
}
