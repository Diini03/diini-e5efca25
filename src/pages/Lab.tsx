import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { 
  FlaskConical, Sparkles, Lightbulb, Code, Trophy, 
  ArrowRight, RotateCcw, Brain, Keyboard, GraduationCap,
  Zap
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
];

const funFacts = [
  { emoji: "🦋", fact: "The first computer bug was an actual moth found in Harvard's Mark II in 1947!" },
  { emoji: "🐍", fact: "Python is named after Monty Python, not the snake." },
  { emoji: "👩‍💻", fact: "Ada Lovelace wrote the first algorithm in the 1840s—before computers existed!" },
  { emoji: "📊", fact: "SQL was originally called SEQUEL (Structured English Query Language)." },
  { emoji: "🧠", fact: "The human brain can store ~2.5 petabytes—that's 2.5 million gigabytes!" },
  { emoji: "⌨️", fact: "The average developer writes 50-100 bugs per 1000 lines of code." },
];

const quickTips = [
  "Use .describe() to get quick stats on your DataFrame",
  "Always visualize your data before modeling",
  "Clean data = Better predictions",
  "Version control your notebooks with Git",
  "Document your code—future you will thank you",
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
  
  const currentSnippet = useMemo(() => 
    codeSnippets[Math.floor(Math.random() * codeSnippets.length)], 
  []);

  useEffect(() => {
    const factTimer = setInterval(() => setFactIndex((p) => (p + 1) % funFacts.length), 5000);
    const tipTimer = setInterval(() => setTipIndex((p) => (p + 1) % quickTips.length), 4000);
    return () => { clearInterval(factTimer); clearInterval(tipTimer); };
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

  const otherGames = [
    { id: "memory-game", title: "Memory Match", icon: Brain, desc: "Match icons" },
    { id: "typing-test", title: "Typing Speed", icon: Keyboard, desc: "Test WPM" },
    { id: "data-quiz", title: "Data Quiz", icon: GraduationCap, desc: "Learn & Quiz" },
  ];

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <FlaskConical className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-mono font-bold text-foreground">Lab</h1>
        </div>
        <p className="text-muted-foreground font-mono mb-8">
          Play, learn, and explore—all in one place.
        </p>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          
          {/* Left: Instant Play Tic-Tac-Toe */}
          <div className="border border-border rounded-xl p-6 bg-card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                <span className="font-mono font-semibold text-foreground">Quick Play</span>
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
            <div className="text-center">
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
              className="mt-4 flex items-center justify-center gap-1 text-xs font-mono text-primary hover:underline"
            >
              Full game with difficulty levels <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Right: Knowledge Cards */}
          <div className="space-y-4">
            {/* Code Snippet */}
            <div className="border border-border rounded-xl p-5 bg-card">
              <div className="flex items-center gap-2 mb-3">
                <Code className="w-4 h-4 text-primary" />
                <span className="text-xs font-mono text-primary">{currentSnippet.lang}</span>
              </div>
              <code className="block font-mono text-sm text-foreground mb-2 bg-muted/50 px-3 py-2 rounded-lg">
                {currentSnippet.code}
              </code>
              <p className="text-xs font-mono text-muted-foreground">
                → {currentSnippet.output}
              </p>
            </div>

            {/* Fun Fact */}
            <div className="border border-border rounded-xl p-5 bg-card relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="flex items-start gap-3 relative">
                <Sparkles className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-mono text-primary block mb-1">Did you know?</span>
                  <p className="text-sm font-mono text-foreground leading-relaxed">
                    {funFacts[factIndex].emoji} {funFacts[factIndex].fact}
                  </p>
                </div>
              </div>
              <div className="flex gap-1 mt-3 justify-center">
                {funFacts.map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      i === factIndex ? "bg-primary" : "bg-muted"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Quick Tip */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 border border-primary/20">
              <Lightbulb className="w-4 h-4 text-primary flex-shrink-0" />
              <p className="text-sm font-mono text-foreground">
                {quickTips[tipIndex]}
              </p>
            </div>
          </div>
        </div>

        {/* More Games */}
        <div className="mb-8">
          <h2 className="text-lg font-mono font-semibold text-foreground mb-4 flex items-center gap-2">
            <span>More to Explore</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {otherGames.map((game) => (
              <Link
                key={game.id}
                to={`/lab/${game.id}`}
                className="group flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary/50 transition-all"
              >
                <game.icon className="w-8 h-8 text-primary" />
                <div>
                  <h3 className="font-mono font-semibold text-foreground group-hover:text-primary transition-colors">
                    {game.title}
                  </h3>
                  <p className="text-xs text-muted-foreground font-mono">{game.desc}</p>
                </div>
              </Link>
            ))}
          </div>
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
