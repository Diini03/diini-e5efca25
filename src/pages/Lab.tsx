import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Gamepad2, Brain, Keyboard, FlaskConical, GraduationCap, Sparkles, Coffee, Zap } from "lucide-react";
import { PageTransition } from "@/components/layout/PageTransition";

const games = [
  {
    id: "tic-tac-toe",
    title: "Tic-Tac-Toe",
    description: "Classic game with 3 AI difficulty levels. Can you beat the unbeatable?",
    icon: Gamepad2,
    badge: "3 Levels",
  },
  {
    id: "memory-game",
    title: "Memory Game",
    description: "Match programming icons and test your memory skills.",
    icon: Brain,
    badge: "8 Pairs",
  },
  {
    id: "typing-test",
    title: "Typing Test",
    description: "Test your typing speed with programming quotes.",
    icon: Keyboard,
    badge: "WPM",
  },
  {
    id: "data-quiz",
    title: "Data Quiz",
    description: "Learn tips, test your data analysis knowledge, and get inspired by quotes.",
    icon: GraduationCap,
    badge: "5 Questions",
  },
];

const funFacts = [
  "The first computer bug was an actual bug — a moth found in Harvard's Mark II computer in 1947! 🦋",
  "Python is named after Monty Python, not the snake. Guido loved British comedy! 🐍",
  "The average developer mass-produces 50-100 bugs per 1000 lines of code. You're not alone! 🐛",
  "SQL was originally called SEQUEL (Structured English Query Language). 📊",
  "The first programmer was Ada Lovelace in the 1840s — over 100 years before computers existed! 👩‍💻",
  "A programmer's keyboard lasts about 2 years on average. RIP spacebar. ⌨️",
];

const tips = [
  { icon: Coffee, text: "Take breaks! Your brain solves problems while you rest." },
  { icon: Zap, text: "Console.log is your best friend for debugging." },
  { icon: Sparkles, text: "Clean code is better than clever code." },
];

export default function Lab() {
  const [currentFact, setCurrentFact] = useState(0);
  const [currentTip, setCurrentTip] = useState(0);

  useEffect(() => {
    const factInterval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % funFacts.length);
    }, 6000);
    
    const tipInterval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 4000);

    return () => {
      clearInterval(factInterval);
      clearInterval(tipInterval);
    };
  }, []);

  const TipIcon = tips[currentTip].icon;

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <FlaskConical className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-mono font-bold text-foreground">Lab</h1>
          </div>
          <p className="text-muted-foreground font-mono mb-6">
            A collection of fun experiments and interactive games. Take a break and have some fun!
          </p>

          {/* Fun Fact Card */}
          <div className="border border-border rounded-lg p-5 bg-card mb-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="flex items-start gap-3 relative">
              <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-mono text-primary mb-1 block">Did you know?</span>
                <p className="text-sm font-mono text-foreground leading-relaxed transition-opacity duration-300">
                  {funFacts[currentFact]}
                </p>
              </div>
            </div>
            {/* Dots indicator */}
            <div className="flex gap-1 mt-3 justify-center">
              {funFacts.map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${i === currentFact ? "bg-primary" : "bg-muted"}`}
                />
              ))}
            </div>
          </div>

          {/* Quick Tip */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 border border-primary/20">
            <TipIcon className="w-4 h-4 text-primary flex-shrink-0" />
            <p className="text-sm font-mono text-foreground">
              <span className="text-primary font-semibold">Quick tip:</span> {tips[currentTip].text}
            </p>
          </div>
        </div>

        {/* Game Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {games.map((game) => (
            <Link
              key={game.id}
              to={`/lab/${game.id}`}
              className="group block p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <game.icon className="w-10 h-10 text-primary" />
                <span className="text-xs font-mono px-2 py-1 rounded bg-primary/10 text-primary">
                  {game.badge}
                </span>
              </div>
              <h2 className="text-xl font-mono font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {game.title}
              </h2>
              <p className="text-sm text-muted-foreground font-mono">
                {game.description}
              </p>
            </Link>
          ))}
        </div>

        {/* Footer note */}
        <p className="mt-12 text-center text-sm text-muted-foreground font-mono">
          More experiments coming soon... 🚀
        </p>
      </div>
    </PageTransition>
  );
}
