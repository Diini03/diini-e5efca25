import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  FlaskConical, Zap, GraduationCap, ArrowRight, 
  RotateCcw, Trophy, Terminal, Lightbulb
} from "lucide-react";
import { PageTransition } from "@/components/layout/PageTransition";

// Tic-Tac-Toe logic
type Player = "X" | "O" | null;

const WINNING_COMBOS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

const checkWinner = (board: Player[]): Player => {
  for (const combo of WINNING_COMBOS) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
  }
  return null;
};

const getAIMove = (board: Player[]): number => {
  const empty = board.map((v, i) => (v === null ? i : -1)).filter((i) => i !== -1);
  return empty[Math.floor(Math.random() * empty.length)];
};

const codeSnippets = [
  { code: "df.groupby('category').mean()", output: "Group by category, get mean", lang: "Python" },
  { code: "SELECT COUNT(*) FROM users", output: "Count all rows in users", lang: "SQL" },
  { code: "np.array([1,2,3]) * 2", output: "[2, 4, 6]", lang: "NumPy" },
  { code: "df.dropna()", output: "Remove rows with NaN", lang: "Pandas" },
  { code: "plt.scatter(x, y)", output: "Create a scatter plot", lang: "Matplotlib" },
  { code: "df.merge(df2, on='id')", output: "Merge two DataFrames", lang: "Pandas" },
  { code: "model.fit(X_train, y_train)", output: "Train the ML model", lang: "Scikit-learn" },
];

const quickTips = [
  "Use .describe() to get quick stats on your DataFrame",
  "Always visualize your data before modeling",
  "Clean data = Better predictions",
  "Version control your notebooks with Git",
  "Document your code—future you will thank you",
  "Start simple, then iterate to complexity",
  "Test your queries on small datasets first",
];

export default function Lab() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [result, setResult] = useState("");
  const [wins, setWins] = useState(0);
  const [snippetIndex, setSnippetIndex] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);

  const currentSnippet = codeSnippets[snippetIndex];

  useEffect(() => {
    const s = setInterval(() => setSnippetIndex((p) => (p + 1) % codeSnippets.length), 8000);
    const t = setInterval(() => setTipIndex((p) => (p + 1) % quickTips.length), 5000);
    return () => { clearInterval(s); clearInterval(t); };
  }, []);

  useEffect(() => {
    const winner = checkWinner(board);
    const isFull = board.every((c) => c !== null);
    if (winner) {
      setGameOver(true);
      if (winner === "X") { setResult("You won! 🎉"); setWins((w) => w + 1); }
      else setResult("AI wins! 🤖");
    } else if (isFull) {
      setGameOver(true);
      setResult("It's a tie! 🤝");
    } else if (!isPlayerTurn && !gameOver) {
      const timeout = setTimeout(() => {
        const move = getAIMove(board);
        if (move !== undefined) {
          const nb = [...board]; nb[move] = "O"; setBoard(nb); setIsPlayerTurn(true);
        }
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [board, isPlayerTurn, gameOver]);

  const handleCellClick = (idx: number) => {
    if (board[idx] || !isPlayerTurn || gameOver) return;
    const nb = [...board]; nb[idx] = "X"; setBoard(nb); setIsPlayerTurn(false);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null)); setIsPlayerTurn(true); setGameOver(false); setResult("");
  };

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center gap-3 mb-1">
          <FlaskConical className="w-7 h-7 text-primary" />
          <h1 className="text-2xl font-mono font-bold text-foreground">Lab</h1>
        </div>
        <p className="text-muted-foreground font-mono text-sm mb-8">
          Play, learn, and explore — all in one place.
        </p>

        {/* Two-column grid: Snippet + Tip side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Code Snippet */}
          <div className="border border-border rounded-xl bg-card overflow-hidden">
            <div className="terminal-header flex items-center gap-2 px-3 py-2">
              <div className="flex items-center gap-1.5">
                <div className="terminal-dot terminal-dot-orange" />
                <div className="terminal-dot terminal-dot-blue" />
                <div className="terminal-dot terminal-dot-purple" />
              </div>
              <span className="text-[10px] text-muted-foreground ml-1 font-mono">
                {currentSnippet.lang.toLowerCase()}.py
              </span>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Terminal className="w-4 h-4 text-primary" />
                <span className="text-xs font-mono text-primary font-semibold">{currentSnippet.lang}</span>
              </div>
              <code className="block font-mono text-sm text-foreground mb-3 bg-muted/50 px-3 py-2.5 rounded-lg border border-border">
                {currentSnippet.code}
              </code>
              <p className="text-xs font-mono text-muted-foreground flex items-center gap-1.5">
                <span className="text-primary">→</span> {currentSnippet.output}
              </p>
              <div className="flex gap-1 mt-3 justify-center">
                {codeSnippets.map((_, i) => (
                  <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === snippetIndex ? "bg-primary w-4" : "bg-muted"}`} />
                ))}
              </div>
            </div>
          </div>

          {/* Quick Tip */}
          <div className="border border-primary/20 rounded-xl p-4 bg-primary/5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-4 h-4 text-primary" />
                <span className="text-xs font-mono text-primary font-semibold">Quick Tip</span>
              </div>
              <p className="text-sm font-mono text-foreground leading-relaxed">
                {quickTips[tipIndex]}
              </p>
            </div>
            <div className="flex gap-1 mt-4 justify-center">
              {quickTips.map((_, i) => (
                <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === tipIndex ? "bg-primary w-4" : "bg-primary/30"}`} />
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Games — two columns */}
        <h2 className="text-lg font-mono font-semibold text-foreground mb-4 flex items-center gap-2">
          <Zap className="w-4 h-4 text-primary" />
          Interactive Games
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Tic-Tac-Toe */}
          <div className="border border-border rounded-xl p-4 bg-card">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono font-semibold text-sm text-foreground">Tic-Tac-Toe</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-muted-foreground flex items-center gap-1">
                  <Trophy className="w-3 h-3 text-yellow-500" /> {wins}
                </span>
                <button onClick={resetGame} className="p-1 rounded-md hover:bg-muted transition-colors">
                  <RotateCcw className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-1.5 mb-2 max-w-[200px] mx-auto">
              {board.map((cell, idx) => (
                <button
                  key={idx}
                  onClick={() => handleCellClick(idx)}
                  disabled={!!cell || gameOver || !isPlayerTurn}
                  className={`aspect-square rounded-md text-lg font-bold transition-all ${cell ? "bg-muted" : "bg-muted/50 hover:bg-muted"} ${cell === "X" ? "text-primary" : "text-orange-500"} disabled:cursor-default`}
                >
                  {cell}
                </button>
              ))}
            </div>

            <div className="text-center mb-3">
              {gameOver ? (
                <p className="text-xs font-mono text-foreground">{result}</p>
              ) : (
                <p className="text-[10px] font-mono text-muted-foreground">
                  {isPlayerTurn ? "Your turn (X)" : "AI thinking..."}
                </p>
              )}
            </div>

            <Link to="/lab/tic-tac-toe" className="flex items-center justify-center gap-1 text-xs font-mono text-primary hover:underline">
              Full game with difficulty levels <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Data Quiz CTA */}
          <Link
            to="/lab/data-quiz"
            className="group border border-border rounded-xl p-4 bg-card hover:border-primary/50 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <GraduationCap className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-mono font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                    Data Quiz
                  </h3>
                  <p className="text-[10px] text-muted-foreground font-mono">Test Your Knowledge</p>
                </div>
              </div>
              <p className="text-muted-foreground font-mono text-xs leading-relaxed mb-4">
                Tips, multiple-choice questions, detailed explanations, and inspiring quotes.
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-1.5">
                <span className="px-2 py-0.5 text-[10px] font-mono bg-primary/10 text-primary rounded">Tips</span>
                <span className="px-2 py-0.5 text-[10px] font-mono bg-primary/10 text-primary rounded">Quiz</span>
                <span className="px-2 py-0.5 text-[10px] font-mono bg-primary/10 text-primary rounded">Quotes</span>
              </div>
              <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        {/* Footer CTA */}
        <div className="text-center py-6 mt-6 border-t border-border">
          <p className="text-xs text-muted-foreground font-mono mb-2">Want to see how these were built?</p>
          <Link to="/projects" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/40 text-xs font-mono text-primary hover:bg-primary/10 transition-all">
            View My Projects <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}
