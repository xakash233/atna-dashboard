"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { useAccent, type AccentColor } from "@/providers/AccentProvider";
import { cn } from "@/lib/cn";

// Mapping from accent color to hex values for light and dark modes
const ACCENT_COLORS: Record<AccentColor, { light: string; dark: string }> = {
  teal: { light: "13, 159, 143", dark: "45, 212, 191" },
  indigo: { light: "99, 102, 241", dark: "129, 140, 248" },
  purple: { light: "168, 85, 247", dark: "192, 132, 252" },
  rose: { light: "244, 63, 94", dark: "251, 113, 133" },
  amber: { light: "217, 119, 6", dark: "251, 191, 36" },
};

export function TechBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const { accent } = useAccent();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && theme === "dark";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track mouse position to create interactive displacement
    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Dynamic click sparks
    interface Spark {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      size: number;
    }
    const sparks: Spark[] = [];

    const handleMouseDown = (e: MouseEvent) => {
      const sparkCount = 8;
      for (let i = 0; i < sparkCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2 + 1;
        sparks.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1.0,
          size: Math.random() * 2.5 + 1.5,
        });
      }
    };

    window.addEventListener("mousedown", handleMouseDown);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Particle structure for neural connections
    const particleCount = 45;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      noiseSeed: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 1,
        noiseSeed: Math.random() * 100,
      });
    }

    let time = 0;

    // Render loop
    const render = () => {
      time += 0.002;
      ctx.clearRect(0, 0, width, height);

      // Dampen mouse movements
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      const isDark = theme === "dark";
      const rgb = isDark ? ACCENT_COLORS[accent].dark : ACCENT_COLORS[accent].light;

      // Draw Grid Matrix Network background
      ctx.strokeStyle = isDark ? `rgba(${rgb}, 0.015)` : `rgba(${rgb}, 0.03)`;
      ctx.lineWidth = 1;
      const gridSize = 80;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw rotating HUD circles in corner
      const hudX = width - 120;
      const hudY = 120;
      
      ctx.save();
      ctx.translate(hudX, hudY);
      ctx.strokeStyle = isDark ? `rgba(${rgb}, 0.06)` : `rgba(${rgb}, 0.09)`;
      ctx.lineWidth = 0.8;

      // Outer dashed ring
      ctx.beginPath();
      ctx.arc(0, 0, 75, 0, Math.PI * 2);
      ctx.setLineDash([4, 12]);
      ctx.stroke();

      // Rotating inner arcs
      ctx.rotate(time * 1.5);
      ctx.beginPath();
      ctx.arc(0, 0, 60, 0, Math.PI * 0.7);
      ctx.setLineDash([]);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, 60, Math.PI, Math.PI * 1.7);
      ctx.stroke();

      // Innermost index marks
      ctx.rotate(-time * 3);
      ctx.beginPath();
      ctx.arc(0, 0, 45, 0, Math.PI * 2);
      ctx.setLineDash([2, 8]);
      ctx.stroke();
      ctx.restore();

      // Draw 3 flowing mathematical waves representing AI flows
      const waveCount = 3;
      for (let w = 0; w < waveCount; w++) {
        ctx.beginPath();
        ctx.lineWidth = w === 0 ? 2 : 1;
        ctx.strokeStyle = isDark
          ? `rgba(${rgb}, ${0.1 - w * 0.03})`
          : `rgba(${rgb}, ${0.08 - w * 0.02})`;

        const amplitude = 40 + w * 25;
        const frequency = 0.0015 + w * 0.0005;
        const speed = time * (1 + w * 0.5);

        for (let x = 0; x < width; x += 5) {
          const distanceToMouse = Math.abs(x - mouse.x);
          const mouseDisplacement = Math.max(0, 150 - distanceToMouse) * 0.15 * Math.sin(time * 5);
          
          const y =
            height * (0.35 + w * 0.15) +
            Math.sin(x * frequency + speed) * amplitude +
            Math.cos(x * 0.005 - speed) * (amplitude * 0.3) +
            mouseDisplacement;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      // Update and draw interactive click sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.95;
        s.vy *= 0.95;
        s.alpha -= 0.025;
        if (s.alpha <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, ${s.alpha * 0.6})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, ${s.alpha * 0.1})`;
        ctx.fill();
      }

      // Draw particles & connect lines
      particles.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;

        // Boundary bounce
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Slight drift noise
        p.x += Math.sin(time + p.noiseSeed) * 0.15;
        p.y += Math.cos(time + p.noiseSeed) * 0.15;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? `rgba(${rgb}, 0.25)` : `rgba(${rgb}, 0.35)`;
        ctx.fill();

        // Glow outline for particles
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? `rgba(${rgb}, 0.04)` : `rgba(${rgb}, 0.06)`;
        ctx.fill();

        // Connect adjacent particles
        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const opacity = (1 - dist / 150) * (isDark ? 0.07 : 0.12);
            ctx.strokeStyle = `rgba(${rgb}, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Mouse connection glow
        const mouseDist = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (mouseDist < 200) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          const opacity = (1 - mouseDist / 200) * (isDark ? 0.05 : 0.08);
          ctx.strokeStyle = `rgba(${rgb}, ${opacity})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      });

      // Ambient radial center gradient flow
      const gradient = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        10,
        mouse.x,
        mouse.y,
        width * 0.4
      );
      gradient.addColorStop(0, isDark ? `rgba(${rgb}, 0.02)` : `rgba(${rgb}, 0.04)`);
      gradient.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [theme, accent]);

  return (
    <>
      {/* Loop background video */}
      <div className="fixed inset-0 -z-30 overflow-hidden h-full w-full bg-[var(--pastel-bg)]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className={cn(
            "absolute inset-0 h-full w-full object-cover pointer-events-none transition-all duration-500",
            isDark
              ? "opacity-[0.14] mix-blend-screen"
              : "opacity-[0.05] mix-blend-multiply"
          )}
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-digital-technology-background-42171-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--pastel-bg)] via-transparent to-[var(--pastel-bg)]/40 pointer-events-none" />
      </div>

      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-70 dark:opacity-85"
      />
    </>
  );
}
