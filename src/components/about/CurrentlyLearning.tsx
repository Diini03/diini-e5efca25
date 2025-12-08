import { BookOpen, Target, TrendingUp } from "lucide-react";

const learningTopics = [
  { name: "Machine Learning", progress: 65, icon: "🤖" },
  { name: "Deep Learning & Neural Networks", progress: 40, icon: "🧠" },
  { name: "Advanced SQL & Database Optimization", progress: 75, icon: "🗃️" },
  { name: "Cloud Computing (AWS)", progress: 30, icon: "☁️" },
];

const careerGoals = [
  "Become a Senior Data Scientist within 3 years",
  "Contribute to open-source data science projects",
  "Build AI-powered solutions for local community challenges",
  "Obtain AWS Cloud Practitioner certification",
];

export function CurrentlyLearning() {
  return (
    <section className="mb-12">
      <h2 className="text-base font-semibold mb-6 flex items-center gap-2">
        <BookOpen className="w-4 h-4 text-primary" />
        Currently Learning
      </h2>

      {/* Learning Progress */}
      <div className="terminal-card mb-6">
        <div className="terminal-header">
          <div className="flex items-center gap-1.5">
            <div className="terminal-dot terminal-dot-red" />
            <div className="terminal-dot terminal-dot-yellow" />
            <div className="terminal-dot terminal-dot-green" />
          </div>
          <span className="text-xs text-muted-foreground ml-2">learning_progress.py</span>
        </div>
        <div className="p-4 space-y-4">
          {learningTopics.map((topic, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-foreground flex items-center gap-2">
                  <span>{topic.icon}</span>
                  {topic.name}
                </span>
                <span className="text-xs text-primary">{topic.progress}%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${topic.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Career Goals */}
      <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
        <Target className="w-4 h-4 text-primary" />
        Career Goals
      </h2>
      <div className="terminal-card">
        <div className="p-4">
          <ol className="space-y-3">
            {careerGoals.map((goal, index) => (
              <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="w-5 h-5 rounded bg-primary/20 flex items-center justify-center text-xs text-primary shrink-0">
                  <TrendingUp className="w-3 h-3" />
                </span>
                {goal}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}