import { Link } from "react-router-dom";
import { Gamepad2, Brain, Keyboard, FlaskConical } from "lucide-react";
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
];

export default function Lab() {
  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <FlaskConical className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-mono font-bold text-foreground">Lab</h1>
          </div>
          <p className="text-muted-foreground font-mono">
            A collection of fun experiments and interactive games. Take a break and have some fun!
          </p>
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
          More experiments coming soon...
        </p>
      </div>
    </PageTransition>
  );
}
