import { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, RotateCcw, Trophy } from "lucide-react";
import { PageTransition } from "@/components/layout/PageTransition";
import { Button } from "@/components/ui/button";

type Player = "X" | "O" | null;
type Board = Player[];
type Difficulty = "easy" | "medium" | "hard";

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6], // diagonals
];

const checkWinner = (board: Board): Player => {
  for (const [a, b, c] of WINNING_COMBINATIONS) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

const getEmptySquares = (board: Board): number[] => {
  return board.reduce<number[]>((acc, cell, idx) => {
    if (!cell) acc.push(idx);
    return acc;
  }, []);
};

// Minimax algorithm for hard difficulty
const minimax = (board: Board, isMaximizing: boolean): number => {
  const winner = checkWinner(board);
  if (winner === "O") return 10;
  if (winner === "X") return -10;
  if (getEmptySquares(board).length === 0) return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (const idx of getEmptySquares(board)) {
      board[idx] = "O";
      bestScore = Math.max(bestScore, minimax(board, false));
      board[idx] = null;
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (const idx of getEmptySquares(board)) {
      board[idx] = "X";
      bestScore = Math.min(bestScore, minimax(board, true));
      board[idx] = null;
    }
    return bestScore;
  }
};

const getBestMove = (board: Board, difficulty: Difficulty): number => {
  const emptySquares = getEmptySquares(board);
  if (emptySquares.length === 0) return -1;

  if (difficulty === "easy") {
    // Random move
    return emptySquares[Math.floor(Math.random() * emptySquares.length)];
  }

  if (difficulty === "medium") {
    // 50% chance of optimal move, 50% random
    if (Math.random() < 0.5) {
      return emptySquares[Math.floor(Math.random() * emptySquares.length)];
    }
  }

  // Hard difficulty: always optimal (minimax)
  let bestScore = -Infinity;
  let bestMove = emptySquares[0];

  for (const idx of emptySquares) {
    board[idx] = "O";
    const score = minimax(board, false);
    board[idx] = null;
    if (score > bestScore) {
      bestScore = score;
      bestMove = idx;
    }
  }

  return bestMove;
};

export default function TicTacToe() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [scores, setScores] = useState({ wins: 0, losses: 0, draws: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<Player>(null);

  const resetGame = useCallback(() => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setGameOver(false);
    setWinner(null);
  }, []);

  const handleClick = (idx: number) => {
    if (board[idx] || !isPlayerTurn || gameOver) return;

    const newBoard = [...board];
    newBoard[idx] = "X";
    setBoard(newBoard);
    setIsPlayerTurn(false);
  };

  // AI move
  useEffect(() => {
    if (isPlayerTurn || gameOver) return;

    const w = checkWinner(board);
    if (w || getEmptySquares(board).length === 0) return;

    const timeout = setTimeout(() => {
      const aiMove = getBestMove([...board], difficulty);
      if (aiMove !== -1) {
        const newBoard = [...board];
        newBoard[aiMove] = "O";
        setBoard(newBoard);
        setIsPlayerTurn(true);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [isPlayerTurn, board, difficulty, gameOver]);

  // Check game end
  useEffect(() => {
    const w = checkWinner(board);
    if (w) {
      setWinner(w);
      setGameOver(true);
      if (w === "X") {
        setScores((s) => ({ ...s, wins: s.wins + 1 }));
      } else {
        setScores((s) => ({ ...s, losses: s.losses + 1 }));
      }
    } else if (getEmptySquares(board).length === 0) {
      setGameOver(true);
      setScores((s) => ({ ...s, draws: s.draws + 1 }));
    }
  }, [board]);

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
          <h1 className="text-3xl font-mono font-bold text-foreground">Tic-Tac-Toe</h1>
          <p className="text-muted-foreground font-mono mt-2">
            You are X. Beat the AI!
          </p>
        </div>

        {/* Difficulty Selection */}
        <div className="flex gap-2 mb-6">
          {(["easy", "medium", "hard"] as Difficulty[]).map((d) => (
            <Button
              key={d}
              variant={difficulty === d ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setDifficulty(d);
                resetGame();
              }}
              className="font-mono capitalize"
            >
              {d}
            </Button>
          ))}
        </div>

        {/* Score Board */}
        <div className="flex gap-6 mb-8 font-mono text-sm">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-green-500" />
            <span className="text-muted-foreground">Wins:</span>
            <span className="text-foreground font-bold">{scores.wins}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Losses:</span>
            <span className="text-foreground font-bold ml-2">{scores.losses}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Draws:</span>
            <span className="text-foreground font-bold ml-2">{scores.draws}</span>
          </div>
        </div>

        {/* Game Board */}
        <div className="max-w-xs mx-auto">
          <div className="grid grid-cols-3 gap-2 mb-6">
            {board.map((cell, idx) => (
              <button
                key={idx}
                onClick={() => handleClick(idx)}
                disabled={!!cell || !isPlayerTurn || gameOver}
                className="aspect-square flex items-center justify-center text-4xl font-bold rounded-lg border border-border bg-card hover:border-primary/50 transition-all disabled:cursor-not-allowed"
              >
                <span className={cell === "X" ? "text-primary" : "text-muted-foreground"}>
                  {cell}
                </span>
              </button>
            ))}
          </div>

          {/* Game Status */}
          {gameOver && (
            <div className="text-center mb-6">
              <p className="text-lg font-mono font-bold">
                {winner === "X" && <span className="text-green-500">You Win! 🎉</span>}
                {winner === "O" && <span className="text-red-500">AI Wins!</span>}
                {!winner && <span className="text-yellow-500">It's a Draw!</span>}
              </p>
            </div>
          )}

          {/* Reset Button */}
          <Button
            onClick={resetGame}
            variant="outline"
            className="w-full font-mono"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            New Game
          </Button>
        </div>
      </div>
    </PageTransition>
  );
}
