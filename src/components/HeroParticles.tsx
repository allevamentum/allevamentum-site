"use client";
import { useEffect, useRef } from "react";

/**
 * HeroParticles — extracted & condensed FinTech network animation
 * for layering INSIDE the hero (over the video, below the content).
 *
 * Renders soft network nodes + connecting lines + traveling pulses,
 * tinted with brand blue/purple. Designed to be subtle (low alpha)
 * so the video remains the dominant background element.
 */
export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let rafId = 0;
    const mouse = { x: -2000, y: -2000 };

    function resize() {
      const parent = canvas!.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = w + "px";
      canvas!.style.height = h + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -2000;
      mouse.y = -2000;
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    // Allevamentum brand palette
    const colors = [
      [79, 125, 247], // blue
      [139, 108, 247], // purple
      [244, 114, 182], // rose accent
      [45, 212, 191], // teal accent
    ];

    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: number[];
      baseAlpha: number;
      phase: number;
      pulseSpeed: number;
    }

    const NODE_COUNT = 38;
    const nodes: Node[] = [];
    const CONNECT_DIST = 180;

    for (let i = 0; i < NODE_COUNT; i++) {
      const isLarge = Math.random() < 0.18;
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.18,
        size: isLarge ? 1.8 + Math.random() * 1.4 : 0.6 + Math.random() * 0.9,
        color: colors[Math.floor(Math.random() * colors.length)],
        baseAlpha: isLarge
          ? 0.16 + Math.random() * 0.12
          : 0.05 + Math.random() * 0.06,
        phase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.5 + Math.random() * 1.5,
      });
    }

    let time = 0;

    function frame() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      time += 0.008;

      // Connections + pulses
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.08;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(120, 140, 240, ${alpha})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();

            // Traveling pulse
            const pulsePos = (time * 0.5 + i * 0.1) % 1;
            const px = a.x + (b.x - a.x) * pulsePos;
            const py = a.y + (b.y - a.y) * pulsePos;
            ctx.beginPath();
            ctx.arc(px, py, 1.1, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(180, 195, 255, ${alpha * 3.2})`;
            ctx.fill();
          }
        }
      }

      // Nodes
      for (const n of nodes) {
        n.x += n.vx + Math.sin(time + n.phase) * 0.12;
        n.y += n.vy + Math.cos(time * 0.7 + n.phase) * 0.08;
        if (n.x < -20) n.x = w + 20;
        if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20;
        if (n.y > h + 20) n.y = -20;

        const pulse = 0.7 + 0.3 * Math.sin(time * n.pulseSpeed + n.phase);
        let alpha = n.baseAlpha * pulse;
        let sizeBoost = 0;

        // Mouse proximity
        const dxm = n.x - mouse.x;
        const dym = n.y - mouse.y;
        const distM = Math.sqrt(dxm * dxm + dym * dym);
        if (distM < 220) {
          const proximity = 1 - distM / 220;
          alpha += proximity * 0.28;
          sizeBoost = proximity * 1.6;
        }

        const c = n.color;
        const drawSize = n.size + sizeBoost;
        ctx.beginPath();
        ctx.arc(n.x, n.y, drawSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${alpha})`;
        ctx.fill();

        // Soft halo on larger nodes
        if (drawSize > 1.6) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, drawSize * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${alpha * 0.12})`;
          ctx.fill();
        }
      }

      rafId = requestAnimationFrame(frame);
    }
    frame();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}
