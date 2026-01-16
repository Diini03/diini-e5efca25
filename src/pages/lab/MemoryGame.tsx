import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, RotateCcw, Timer, MousePointer2 } from "lucide-react";
import { PageTransition } from "@/components/layout/PageTransition";
import { Button } from "@/components/ui/button";

const ICONS = ["🐍", "🗃️", "⚛️", "📊", "🤖", "☁️", "🔥", "💾"];

interface Card {
  id: number;
  icon: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const createCards = (): Card[] => {
  const pairs = [...ICONS, ...ICONS];
  return shuffleArray(pairs).map((icon, idx) => ({
    id: idx,
    icon,
    isFlipped: false,
    isMatched: false,
  }));
};

export default function MemoryGame() {
  const [cards, setCards] = useState<Card[]>(createCards);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [bestScore, setBestScore] = useState<number | null>(() => {
    const saved = localStorage.getItem("memory-best-score");
    return saved ? parseInt(saved) : null;
  });

  // Timer
  useEffect(() => {
    if (!isPlaying || isComplete) return;

    const interval = setInterval(() => {
      setTime((t) => t + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, isComplete]);

  // Check for matches
  useEffect(() => {
    if (flippedCards.length !== 2) return;

    const [first, second] = flippedCards;
    const firstCard = cards.find((c) => c.id === first);
    const secondCard = cards.find((c) => c.id === second);

    if (firstCard?.icon === secondCard?.icon) {
      // Match found
      setTimeout(() => {
        setCards((prev) =>
          prev.map((c) =>
            c.id === first || c.id === second ? { ...c, isMatched: true } : c
          )
        );
        setFlippedCards([]);
      }, 300);
    } else {
      // No match - flip back
      setTimeout(() => {
        setCards((prev) =>
          prev.map((c) =>
            c.id === first || c.id === second ? { ...c, isFlipped: false } : c
          )
        );
        setFlippedCards([]);
      }, 1000);
    }
  }, [flippedCards, cards]);

  // Check for game completion
  useEffect(() => {
    if (cards.every((c) => c.isMatched) && cards.length > 0 && isPlaying) {
      setIsComplete(true);
      setIsPlaying(false);

      // Save best score
      if (!bestScore || moves < bestScore) {
        setBestScore(moves);
        localStorage.setItem("memory-best-score", moves.toString());
      }
    }
  }, [cards, moves, bestScore, isPlaying]);

  const handleCardClick = useCallback(
    (id: number) => {
      if (flippedCards.length >= 2) return;

      const card = cards.find((c) => c.id === id);
      if (!card || card.isFlipped || card.isMatched) return;

      if (!isPlaying) setIsPlaying(true);

      setCards((prev) =>
        prev.map((c) => (c.id === id ? { ...c, isFlipped: true } : c))
      );
      setFlippedCards((prev) => [...prev, id]);
      setMoves((m) => m + 1);
    },
    [cards, flippedCards, isPlaying]
  );

  const resetGame = () => {
    setCards(createCards());
    setFlippedCards([]);
    setMoves(0);
    setTime(0);
    setIsPlaying(false);
    setIsComplete(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

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
          <h1 className="text-3xl font-mono font-bold text-foreground">Memory Game</h1>
          <p className="text-muted-foreground font-mono mt-2">
            Match all pairs with the fewest moves!
          </p>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-6 mb-8 font-mono text-sm">
          <div className="flex items-center gap-2">
            <MousePointer2 className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">Moves:</span>
            <span className="text-foreground font-bold">{moves}</span>
          </div>
          <div className="flex items-center gap-2">
            <Timer className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">Time:</span>
            <span className="text-foreground font-bold">{formatTime(time)}</span>
          </div>
          {bestScore && (
            <div>
              <span className="text-muted-foreground">Best:</span>
              <span className="text-green-500 font-bold ml-2">{bestScore} moves</span>
            </div>
          )}
        </div>

        {/* Game Board */}
        <div className="max-w-sm mx-auto">
          <div className="grid grid-cols-4 gap-3 mb-6">
            {cards.map((card) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                disabled={card.isFlipped || card.isMatched || flippedCards.length >= 2}
                className={`aspect-square flex items-center justify-center text-3xl rounded-lg border transition-all duration-300 ${
                  card.isFlipped || card.isMatched
                    ? "bg-card border-primary/50"
                    : "bg-muted border-border hover:border-primary/30"
                } ${card.isMatched ? "opacity-60" : ""}`}
              >
                {(card.isFlipped || card.isMatched) ? card.icon : "?"}
              </button>
            ))}
          </div>

          {/* Completion Message */}
          {isComplete && (
            <div className="text-center mb-6 p-4 rounded-lg border border-primary/50 bg-primary/5">
              <p className="text-lg font-mono font-bold text-green-500 mb-1">
                🎉 Congratulations!
              </p>
              <p className="text-sm text-muted-foreground font-mono">
                Completed in {moves} moves and {formatTime(time)}
              </p>
            </div>
          )}

          {/* Reset Button */}
          <Button onClick={resetGame} variant="outline" className="w-full font-mono">
            <RotateCcw className="w-4 h-4 mr-2" />
            New Game
          </Button>
        </div>
      </div>
    </PageTransition>
  );
}
