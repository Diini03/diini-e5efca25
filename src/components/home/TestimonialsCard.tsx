import { useState, useEffect } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote: "Diini has an exceptional ability to transform complex data into clear, actionable insights. His attention to detail and analytical skills are outstanding.",
    name: "Prof. Dr Abdullahi Shariif",
    role: "Professor, Somali National University",
  },
  {
    quote: "Working with Diini was a great experience. He delivered high-quality data analysis work on time and was always eager to learn and improve.",
    name: "Abdirahim Abdullahi Aden",
    role: "Project Manager, NAPAD",
  },
  {
    quote: "Diini helped us analyze data and train a model for our smart event recommendation feature. His machine learning skills and dedication to the project were impressive.",
    name: "Eng Ahmed Mohammed",
    role: "Operations Manager, Kulmid",
  },
];

export function TestimonialsCard() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToPrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <div className="terminal-card">
      <div className="terminal-header">
        <div className="flex items-center gap-1.5">
          <div className="terminal-dot terminal-dot-orange" />
          <div className="terminal-dot terminal-dot-blue" />
          <div className="terminal-dot terminal-dot-purple" />
        </div>
        <span className="text-xs text-muted-foreground ml-2">testimonials.json</span>
      </div>
      <div className="p-6">
        <div className="relative">
          <Quote className="w-8 h-8 text-primary/20 absolute -top-2 -left-2" />
          <div className="min-h-[140px] flex flex-col justify-center">
            <p className="text-sm text-muted-foreground leading-relaxed mb-4 pl-6">
              "{testimonials[activeIndex].quote}"
            </p>
            <div className="pl-6">
              <div className="text-sm font-semibold text-foreground">
                {testimonials[activeIndex].name}
              </div>
              <div className="text-xs text-primary">
                {testimonials[activeIndex].role}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
          <div className="flex gap-1.5">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === activeIndex ? "bg-primary" : "bg-secondary"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={goToPrev}
              className="p-1.5 rounded bg-secondary hover:bg-secondary/80 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4 text-muted-foreground" />
            </button>
            <button
              onClick={goToNext}
              className="p-1.5 rounded bg-secondary hover:bg-secondary/80 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}