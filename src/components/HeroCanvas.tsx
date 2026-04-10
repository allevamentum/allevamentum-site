"use client";
import { useEffect, useRef } from "react";

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let w: number, h: number;
    let rafId: number;
    const mouse = { x: -1000, y: -1000 };

    function resize() {
      w = canvas!.width = canvas!.parentElement!.offsetWidth;
      h = canvas!.height = canvas!.parentElement!.offsetHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      const r = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => { mouse.x = -1000; mouse.y = -1000; };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    const spacing = 28;
    const activationRadius = 220;
    const connectionRadius = 70;
    const dotColors = [[79,125,247],[139,108,247],[45,212,191],[245,166,35]];

    type Dot = {
      baseX: number; baseY: number; x: number; y: number;
      baseAlpha: number; alpha: number; targetAlpha: number;
      size: number; targetSize: number; phase: number; color: number[];
    };

    let dots: Dot[] = [];

    function generateDots() {
      dots = [];
      const cols = Math.ceil(w / spacing) + 1;
      const rows = Math.ceil(h / spacing) + 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const roll = Math.random();
          const color = roll < 0.6 ? dotColors[0] : roll < 0.78 ? dotColors[1] : roll < 0.91 ? dotColors[2] : dotColors[3];
          dots.push({
            baseX: c * spacing, baseY: r * spacing,
            x: c * spacing, y: r * spacing,
            baseAlpha: 0.035 + Math.random() * 0.025,
            alpha: 0, targetAlpha: 0, size: 1, targetSize: 1,
            phase: Math.random() * Math.PI * 2, color,
          });
        }
      }
    }
    generateDots();
    window.addEventListener("resize", generateDots);

    let time = 0;

    function draw() {
      ctx.clearRect(0, 0, w, h);
      time += 0.005;
      const activeDots: Dot[] = [];

      for (const dot of dots) {
        dot.x = dot.baseX + Math.sin(time + dot.phase) * 1.5;
        dot.y = dot.baseY + Math.cos(time * 0.7 + dot.phase * 1.3) * 1.5;
        const dx = dot.x - mouse.x, dy = dot.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < activationRadius) {
          const proximity = 1 - dist / activationRadius;
          const pCurve = proximity * proximity;
          dot.targetAlpha = dot.baseAlpha + pCurve * 0.55;
          dot.targetSize = 1 + pCurve * 3;
          activeDots.push(dot);
          const repel = pCurve * 6;
          dot.x += (dx / dist) * repel;
          dot.y += (dy / dist) * repel;
        } else {
          dot.targetAlpha = dot.baseAlpha;
          dot.targetSize = 1;
        }

        dot.alpha += (dot.targetAlpha - dot.alpha) * 0.06;
        dot.size += (dot.targetSize - dot.size) * 0.06;

        if (dot.alpha > 0.01) {
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
          const c = dot.color;
          ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${dot.alpha})`;
          ctx.fill();
        }
      }

      for (let i = 0; i < activeDots.length; i++) {
        for (let j = i + 1; j < activeDots.length; j++) {
          const a = activeDots[i], b = activeDots[j];
          const ddx = a.x - b.x, ddy = a.y - b.y;
          const dist = Math.sqrt(ddx * ddx + ddy * ddy);
          if (dist < connectionRadius) {
            const alpha = (1 - dist / connectionRadius) * 0.14;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(79,125,247,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      const cx = w * 0.5, cy = h * 0.38;
      const triSize = Math.min(w, h) * 0.16;
      const triAlpha = 0.015 + Math.sin(time * 0.4) * 0.005;
      ctx.beginPath();
      ctx.moveTo(cx, cy - triSize);
      ctx.lineTo(cx + triSize * 0.87, cy + triSize * 0.5);
      ctx.lineTo(cx - triSize * 0.87, cy + triSize * 0.5);
      ctx.closePath();
      ctx.strokeStyle = `rgba(79,125,247,${triAlpha})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();

      const inner = triSize * 0.5;
      ctx.beginPath();
      ctx.moveTo(cx, cy - inner);
      ctx.lineTo(cx + inner * 0.87, cy + inner * 0.5);
      ctx.lineTo(cx - inner * 0.87, cy + inner * 0.5);
      ctx.closePath();
      ctx.strokeStyle = `rgba(139,108,247,${triAlpha * 0.7})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();

      rafId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("resize", generateDots);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return <canvas className="hero-canvas" ref={canvasRef} aria-hidden="true" />;
}
