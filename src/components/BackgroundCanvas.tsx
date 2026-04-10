"use client";
import { useEffect, useRef } from "react";

export default function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let w = window.innerWidth;
    let h = window.innerHeight;
    let rafId: number;

    function resize() {
      w = canvas!.width = window.innerWidth;
      h = canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const colors = [[79,125,247],[139,108,247],[45,212,191],[245,166,35]];
    const particles: Array<{
      x: number; y: number; vx: number; vy: number; size: number;
      color: number[]; alpha: number; phase: number; isTriangle: boolean;
      rotation: number; rotSpeed: number;
    }> = [];

    for (let i = 0; i < 55; i++) {
      particles.push({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.15 - 0.08,
        size: 1.5 + Math.random() * 2.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 0.025 + Math.random() * 0.05,
        phase: Math.random() * Math.PI * 2,
        isTriangle: Math.random() < 0.3,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.004,
      });
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx + Math.sin(p.phase + performance.now() * 0.0002) * 0.12;
        p.y += p.vy;
        p.rotation += p.rotSpeed;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        const c = p.color;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.alpha;

        if (p.isTriangle) {
          const s = p.size * 1.5;
          ctx.beginPath();
          ctx.moveTo(0, -s);
          ctx.lineTo(s * 0.87, s * 0.5);
          ctx.lineTo(-s * 0.87, s * 0.5);
          ctx.closePath();
          ctx.strokeStyle = `rgb(${c[0]},${c[1]},${c[2]})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgb(${c[0]},${c[1]},${c[2]})`;
          ctx.fill();
        }
        ctx.restore();
      }
      rafId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas className="bg-canvas" ref={canvasRef} aria-hidden="true" />;
}
