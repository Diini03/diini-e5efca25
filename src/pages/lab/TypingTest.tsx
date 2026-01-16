import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, RotateCcw, Zap, Target, Timer } from "lucide-react";
import { PageTransition } from "@/components/layout/PageTransition";
import { Button } from "@/components/ui/button";

const QUOTES = [
  "The best way to predict the future is to create it.",
  "Code is like humor. When you have to explain it, it's bad.",
  "First, solve the problem. Then, write the code.",
  "Experience is the name everyone gives to their mistakes.",
  "In order to be irreplaceable, one must always be different.",
  "Java is to JavaScript what car is to carpet.",
  "Programming is the art of telling another human what one wants the computer to do.",
  "The only way to learn a new programming language is by writing programs in it.",
  "Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday's code.",
  "Measuring programming progress by lines of code is like measuring aircraft building progress by weight.",
];

type Duration = 30 | 60;

export default function TypingTest() {
  const [quote, setQuote] = useState("");
  const [input, setInput] = useState("");
  const [duration, setDuration] = useState<Duration>(30);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [bestWpm, setBestWpm] = useState<number | null>(() => {
    const saved = localStorage.getItem("typing-best-wpm");
    return saved ? parseInt(saved) : null;
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const getRandomQuote = useCallback(() => {
    return QUOTES[Math.floor(Math.random() * QUOTES.length)];
  }, []);

  const startGame = useCallback(() => {
    setQuote(getRandomQuote());
    setInput("");
    setTimeLeft(duration);
    setIsPlaying(true);
    setIsComplete(false);
    setWpm(0);
    setAccuracy(100);
    inputRef.current?.focus();
  }, [duration, getRandomQuote]);

  const resetGame = () => {
    setQuote("");
    setInput("");
    setTimeLeft(duration);
    setIsPlaying(false);
    setIsComplete(false);
    setWpm(0);
    setAccuracy(100);
  };

  // Timer
  useEffect(() => {
    if (!isPlaying || isComplete) return;

    if (timeLeft <= 0) {
      setIsComplete(true);
      setIsPlaying(false);

      // Save best WPM
      if (!bestWpm || wpm > bestWpm) {
        setBestWpm(wpm);
        localStorage.setItem("typing-best-wpm", wpm.toString());
      }
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((t) => (t - 1) as Duration);
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, timeLeft, isComplete, wpm, bestWpm]);

  // Calculate WPM and accuracy
  useEffect(() => {
    if (!isPlaying || input.length === 0) return;

    const elapsedTime = duration - timeLeft;
    if (elapsedTime <= 0) return;

    // WPM calculation (average word = 5 characters)
    const wordsTyped = input.length / 5;
    const minutes = elapsedTime / 60;
    const currentWpm = Math.round(wordsTyped / minutes);
    setWpm(currentWpm);

    // Accuracy calculation
    let correct = 0;
    for (let i = 0; i < input.length; i++) {
      if (input[i] === quote[i]) correct++;
    }
    const currentAccuracy = Math.round((correct / input.length) * 100);
    setAccuracy(currentAccuracy);
  }, [input, duration, timeLeft, isPlaying, quote]);

  // Check if quote is completed
  useEffect(() => {
    if (isPlaying && input === quote && quote.length > 0) {
      // Load next quote
      setQuote(getRandomQuote());
      setInput("");
    }
  }, [input, quote, isPlaying, getRandomQuote]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isPlaying) return;
    setInput(e.target.value);
  };

  const renderQuote = () => {
    return quote.split("").map((char, idx) => {
      let className = "text-muted-foreground";
      if (idx < input.length) {
        className = input[idx] === char ? "text-green-500" : "text-red-500 bg-red-500/20";
      }
      return (
        <span key={idx} className={className}>
          {char}
        </span>
      );
    });
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
          <h1 className="text-3xl font-mono font-bold text-foreground">Typing Test</h1>
          <p className="text-muted-foreground font-mono mt-2">
            Test your typing speed with programming quotes!
          </p>
        </div>

        {/* Duration Selection */}
        {!isPlaying && !isComplete && (
          <div className="flex gap-2 mb-6">
            {([30, 60] as Duration[]).map((d) => (
              <Button
                key={d}
                variant={duration === d ? "default" : "outline"}
                size="sm"
                onClick={() => setDuration(d)}
                className="font-mono"
              >
                {d}s
              </Button>
            ))}
          </div>
        )}

        {/* Stats */}
        {(isPlaying || isComplete) && (
          <div className="flex flex-wrap gap-6 mb-8 font-mono text-sm">
            <div className="flex items-center gap-2">
              <Timer className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">Time:</span>
              <span className={`font-bold ${timeLeft <= 10 ? "text-red-500" : "text-foreground"}`}>
                {timeLeft}s
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span className="text-muted-foreground">WPM:</span>
              <span className="text-foreground font-bold">{wpm}</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-green-500" />
              <span className="text-muted-foreground">Accuracy:</span>
              <span className="text-foreground font-bold">{accuracy}%</span>
            </div>
            {bestWpm && (
              <div>
                <span className="text-muted-foreground">Best:</span>
                <span className="text-primary font-bold ml-2">{bestWpm} WPM</span>
              </div>
            )}
          </div>
        )}

        {/* Game Area */}
        <div className="max-w-2xl mx-auto">
          {!isPlaying && !isComplete && (
            <Button onClick={startGame} className="w-full font-mono">
              Start Typing Test
            </Button>
          )}

          {isPlaying && (
            <div className="space-y-6">
              {/* Quote Display */}
              <div className="p-6 rounded-lg border border-border bg-card font-mono text-lg leading-relaxed">
                {renderQuote()}
              </div>

              {/* Input */}
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleInputChange}
                className="w-full p-4 rounded-lg border border-border bg-background font-mono text-foreground focus:outline-none focus:border-primary"
                placeholder="Start typing..."
                autoComplete="off"
                autoCapitalize="off"
                spellCheck="false"
              />
            </div>
          )}

          {isComplete && (
            <div className="space-y-6">
              {/* Results */}
              <div className="p-6 rounded-lg border border-primary/50 bg-primary/5 text-center">
                <p className="text-2xl font-mono font-bold text-foreground mb-2">
                  {wpm} WPM
                </p>
                <p className="text-muted-foreground font-mono">
                  with {accuracy}% accuracy
                </p>
                {bestWpm && wpm >= bestWpm && (
                  <p className="text-primary font-mono mt-2">🎉 New Personal Best!</p>
                )}
              </div>

              {/* Reset Button */}
              <Button onClick={resetGame} variant="outline" className="w-full font-mono">
                <RotateCcw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
