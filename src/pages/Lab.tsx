import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { 
  FlaskConical, Sparkles, Lightbulb, Code, Trophy, 
  ArrowRight, RotateCcw, GraduationCap, Zap, Terminal
} from "lucide-react";
import { PageTransition } from "@/components/layout/PageTransition";
import { Button } from "@/components/ui/button";

// Quick Tic-Tac-Toe for instant play
type Player = "X" | "O" | null;

const WINNING_COMBOS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

const checkWinner = (board: Player[]): Player => {
  for (const combo of WINNING_COMBOS) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

const getAIMove = (board: Player[]): number => {
  const empty = board.map((v, i) => (v === null ? i : -1)).filter((i) => i !== -1);
  return empty[Math.floor(Math.random() * empty.length)];
};

// Knowledge content
const codeSnippets = [
  { code: "df.groupby('category').mean()", output: "Group by category, get mean", lang: "Python" },
  { code: "SELECT COUNT(*) FROM users", output: "Count all rows in users", lang: "SQL" },
  { code: "np.array([1,2,3]) * 2", output: "[2, 4, 6]", lang: "NumPy" },
  { code: "df.dropna()", output: "Remove rows with NaN", lang: "Pandas" },
  { code: "plt.scatter(x, y)", output: "Create a scatter plot", lang: "Matplotlib" },
  { code: "df.merge(df2, on='id')", output: "Merge two DataFrames", lang: "Pandas" },
  { code: "model.fit(X_train, y_train)", output: "Train the ML model", lang: "Scikit-learn" },
];

const funFacts = [
  { emoji: "🦋", fact: "The first computer bug was an actual moth found in Harvard's Mark II in 1947!" },
  { emoji: "🐍", fact: "Python is named after Monty Python, not the snake." },
  { emoji: "👩‍💻", fact: "Ada Lovelace wrote the first algorithm in the 1840s—before computers existed!" },
  { emoji: "📊", fact: "SQL was originally called SEQUEL (Structured English Query Language)." },
  { emoji: "🧠", fact: "The human brain can store ~2.5 petabytes—that's 2.5 million gigabytes!" },
  { emoji: "⌨️", fact: "The average developer writes 50-100 bugs per 1000 lines of code." },
  { emoji: "💾", fact: "The first 1GB hard drive (1980) weighed 550 pounds and cost $40,000!" },
  { emoji: "🚀", fact: "Netflix's recommendation engine saves them $1 billion per year in customer retention." },
];

const quickTips = [
  "Use .describe() to get quick stats on your DataFrame",
  "Always visualize your data before modeling",
  "Clean data = Better predictions",
  "Version control your notebooks with Git",
  "Document your code—future you will thank you",
  "Use meaningful variable names, not x, y, z",
  "Start simple, then iterate to complexity",
  "Test your queries on small datasets first",
];

export default function Lab() {
  // Mini Tic-Tac-Toe state
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [result, setResult] = useState<string>("");
  const [wins, setWins] = useState(0);

  // Knowledge rotation
  const [factIndex, setFactIndex] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);
  const [snippetIndex, setSnippetIndex] = useState(0);
  
  const currentSnippet = codeSnippets[snippetIndex];

  useEffect(() => {
    const factTimer = setInterval(() => setFactIndex((p) => (p + 1) % funFacts.length), 6000);
    const tipTimer = setInterval(() => setTipIndex((p) => (p + 1) % quickTips.length), 5000);
    const snippetTimer = setInterval(() => setSnippetIndex((p) => (p + 1) % codeSnippets.length), 8000);
    return () => { clearInterval(factTimer); clearInterval(tipTimer); clearInterval(snippetTimer); };
  }, []);

  // Mini game logic
  useEffect(() => {
    const winner = checkWinner(board);
    const isFull = board.every((cell) => cell !== null);

    if (winner) {
      setGameOver(true);
      if (winner === "X") {
        setResult("You won! 🎉");
        setWins((w) => w + 1);
      } else {
        setResult("AI wins! 🤖");
      }
    } else if (isFull) {
      setGameOver(true);
      setResult("It's a tie! 🤝");
    } else if (!isPlayerTurn && !gameOver) {
      const timeout = setTimeout(() => {
        const move = getAIMove(board);
        if (move !== undefined) {
          const newBoard = [...board];
          newBoard[move] = "O";
          setBoard(newBoard);
          setIsPlayerTurn(true);
        }
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [board, isPlayerTurn, gameOver]);

  const handleCellClick = (idx: number) => {
    if (board[idx] || !isPlayerTurn || gameOver) return;
    const newBoard = [...board];
    newBoard[idx] = "X";
    setBoard(newBoard);
    setIsPlayerTurn(false);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setGameOver(false);
    setResult("");
  };

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <FlaskConical className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-mono font-bold text-foreground">Lab</h1>
        </div>
        <p className="text-muted-foreground font-mono mb-10">
          Play, learn, and explore—all in one place.
        </p>

        {/* Knowledge Cards Section - ENLARGED */}
        <div className="space-y-6 mb-10">
          {/* Code Snippet - Large Card */}
          <div className="border border-border rounded-xl bg-card overflow-hidden">
            <div className="terminal-header flex items-center gap-2 px-4 py-3">
              <div className="flex items-center gap-1.5">
                <div className="terminal-dot terminal-dot-orange" />
                <div className="terminal-dot terminal-dot-blue" />
                <div className="terminal-dot terminal-dot-purple" />
              </div>
              <span className="text-xs text-muted-foreground ml-2 font-mono">
                <span className="text-primary">snippets</span> / {currentSnippet.lang.toLowerCase()}.py
              </span>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Terminal className="w-5 h-5 text-primary" />
                <span className="text-sm font-mono text-primary font-semibold">{currentSnippet.lang}</span>
              </div>
              <code className="block font-mono text-xl text-foreground mb-4 bg-muted/50 px-5 py-4 rounded-lg border border-border">
                {currentSnippet.code}
              </code>
              <p className="text-base font-mono text-muted-foreground flex items-center gap-2">
                <span className="text-primary">→</span> {currentSnippet.output}
              </p>
              <div className="flex gap-1.5 mt-5 justify-center">
                {codeSnippets.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === snippetIndex ? "bg-primary w-6" : "bg-muted hover:bg-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Fun Fact - Large Card */}
          <div className="border border-border rounded-xl p-6 bg-card relative overflow-hidden group hover:border-primary/30 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-mono text-primary font-semibold">Did you know?</span>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-4xl">{funFacts[factIndex].emoji}</span>
                <p className="text-lg font-mono text-foreground leading-relaxed flex-1">
                  {funFacts[factIndex].fact}
                </p>
              </div>
              <div className="flex gap-1.5 mt-5 justify-center">
                {funFacts.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === factIndex ? "bg-primary w-6" : "bg-muted hover:bg-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Quick Tip - Large Card */}
          <div className="border border-primary/30 rounded-xl p-6 bg-primary/5 group hover:bg-primary/10 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <Lightbulb className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <span className="text-sm font-mono text-primary font-semibold block mb-2">Quick Tip</span>
                <p className="text-lg font-mono text-foreground leading-relaxed">
                  {quickTips[tipIndex]}
                </p>
              </div>
            </div>
            <div className="flex gap-1.5 mt-5 justify-center">
              {quickTips.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === tipIndex ? "bg-primary w-6" : "bg-primary/30 hover:bg-primary/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Games Section */}
        <h2 className="text-xl font-mono font-semibold text-foreground mb-6 flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          Interactive Games
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {/* Tic-Tac-Toe Card */}
          <div className="border border-border rounded-xl p-6 bg-card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                <span className="font-mono font-semibold text-foreground">Tic-Tac-Toe</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                  <Trophy className="w-3 h-3 text-yellow-500" /> {wins}
                </span>
                <button 
                  onClick={resetGame}
                  className="p-1.5 rounded-md hover:bg-muted transition-colors"
                >
                  <RotateCcw className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>
            
            {/* Game Board */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              {board.map((cell, idx) => (
                <button
                  key={idx}
                  onClick={() => handleCellClick(idx)}
                  disabled={!!cell || gameOver || !isPlayerTurn}
                  className={`
                    aspect-square rounded-lg text-2xl font-bold transition-all
                    ${cell ? "bg-muted" : "bg-muted/50 hover:bg-muted"}
                    ${cell === "X" ? "text-primary" : "text-orange-500"}
                    disabled:cursor-default
                  `}
                >
                  {cell}
                </button>
              ))}
            </div>

            {/* Status */}
            <div className="text-center mb-4">
              {gameOver ? (
                <p className="text-sm font-mono text-foreground">{result}</p>
              ) : (
                <p className="text-xs font-mono text-muted-foreground">
                  {isPlayerTurn ? "Your turn (X)" : "AI thinking..."}
                </p>
              )}
            </div>

            <Link 
              to="/lab/tic-tac-toe" 
              className="flex items-center justify-center gap-1 text-sm font-mono text-primary hover:underline"
            >
              Full game with difficulty levels <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Data Quiz CTA Card */}
          <Link
            to="/lab/data-quiz"
            className="group border border-border rounded-xl p-6 bg-card hover:border-primary/50 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-mono font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                    Data Quiz
                  </h3>
                  <p className="text-sm text-muted-foreground font-mono">Learn & Test Your Knowledge</p>
                </div>
              </div>
              <p className="text-muted-foreground font-mono text-sm leading-relaxed mb-6">
                Start with helpful data analysis tips, then test your skills with multiple-choice questions. 
                Get detailed explanations and inspiring quotes!
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <span className="px-2 py-1 text-xs font-mono bg-primary/10 text-primary rounded">5 Tips</span>
                <span className="px-2 py-1 text-xs font-mono bg-primary/10 text-primary rounded">5 Questions</span>
                <span className="px-2 py-1 text-xs font-mono bg-primary/10 text-primary rounded">Quotes</span>
              </div>
              <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        {/* Footer CTA */}
        <div className="text-center py-6 border-t border-border">
          <p className="text-sm text-muted-foreground font-mono mb-3">
            Want to see how these were built?
          </p>
          <Button variant="outline" asChild className="font-mono">
            <Link to="/projects">View My Projects</Link>
          </Button>
        </div>
      </div>
    </PageTransition>
  );
}
