import { useEffect, useState } from "react";

export function InteractiveGradient() {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    
    checkTheme();
    
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ["class"] 
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const gradientStyle = isDark
    ? {
        background: `
          radial-gradient(
            800px circle at ${mousePosition.x}% ${mousePosition.y}%,
            hsla(24, 95%, 53%, 0.15) 0%,
            hsla(24, 95%, 53%, 0.05) 30%,
            transparent 60%
          ),
          radial-gradient(
            500px circle at ${100 - mousePosition.x}% ${100 - mousePosition.y}%,
            hsla(220, 70%, 50%, 0.08) 0%,
            transparent 50%
          )
        `,
      }
    : {
        background: `
          radial-gradient(
            800px circle at ${mousePosition.x}% ${mousePosition.y}%,
            hsla(24, 95%, 53%, 0.1) 0%,
            hsla(24, 95%, 53%, 0.03) 30%,
            transparent 60%
          ),
          radial-gradient(
            500px circle at ${100 - mousePosition.x}% ${100 - mousePosition.y}%,
            hsla(220, 70%, 60%, 0.06) 0%,
            transparent 50%
          )
        `,
      };

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 transition-all duration-200 ease-out"
      style={gradientStyle}
    />
  );
}
