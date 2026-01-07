import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  isAccent: boolean;
  pulse: number;
  pulseSpeed: number;
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
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
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      const particles: Particle[] = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 28000); // Fewer particles for cleaner look

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.8 + 0.6, // Smaller, more refined particles
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.25 + 0.1, // More subtle opacity
          isAccent: Math.random() < 0.12, // 12% orange particles
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.015 + 0.005,
        });
      }
      particlesRef.current = particles;
    };

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.pulse += particle.pulseSpeed;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Pulsing opacity for subtle glow effect
        const pulseOpacity = particle.opacity * (0.7 + Math.sin(particle.pulse) * 0.3);

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        
        if (particle.isAccent) {
          // Orange accent particles - subtle glow
          ctx.fillStyle = `hsla(24, 95%, 53%, ${pulseOpacity * 0.7})`;
          ctx.shadowColor = "hsla(24, 95%, 53%, 0.3)";
          ctx.shadowBlur = 5;
        } else {
          ctx.shadowBlur = 0;
          // Theme-aware neutral particles - subtle
          if (isDark) {
            ctx.fillStyle = `hsla(220, 40%, 65%, ${pulseOpacity * 0.5})`;
          } else {
            ctx.fillStyle = `hsla(220, 30%, 40%, ${pulseOpacity * 0.35})`;
          }
        }
        
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    createParticles();
    animate();

    const handleResize = () => {
      resizeCanvas();
      createParticles();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.55 }}
    />
  );
}
