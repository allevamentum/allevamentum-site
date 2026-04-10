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
    const mouse = { x: -1000, y: -1000 };

    function resize() {
      w = canvas!.width = window.innerWidth;
      h = canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    document.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    // --- FinTech Grid ---
    const gridSpacing = 80;
    const gridAlpha = 0.025;

    // --- Network Nodes (viewport-relative) ---
    interface Node {
      x: number; y: number; vx: number; vy: number;
      size: number; color: number[]; alpha: number;
      baseAlpha: number; phase: number; type: string;
      pulseSpeed: number;
    }

    const colors = [
      [79, 125, 247],
      [139, 108, 247],
      [45, 212, 191],
      [245, 166, 35],
      [100, 180, 255],
    ];

    const nodeCount = 60;
    const nodes: Node[] = [];
    const connectionDist = 180;

    for (let i = 0; i < nodeCount; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      const isLarge = Math.random() < 0.15;
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.2,
        size: isLarge ? 2.5 + Math.random() * 2 : 1 + Math.random() * 1.5,
        color,
        alpha: 0,
        baseAlpha: isLarge ? 0.1 + Math.random() * 0.08 : 0.03 + Math.random() * 0.05,
        phase: Math.random() * Math.PI * 2,
        type: Math.random() < 0.2 ? "diamond" : Math.random() < 0.3 ? "triangle" : "circle",
        pulseSpeed: 0.5 + Math.random() * 1.5,
      });
    }

    // --- Data Streams ---
    interface DataStream {
      x: number; speed: number; length: number;
      y: number; color: number[]; alpha: number; width: number;
    }
    const streams: DataStream[] = [];
    for (let i = 0; i < 12; i++) {
      streams.push({
        x: Math.random() * w,
        y: Math.random() * h * -1,
        speed: 0.5 + Math.random() * 1.5,
        length: 100 + Math.random() * 300,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 0.02 + Math.random() * 0.04,
        width: 0.5 + Math.random() * 1,
      });
    }

    // --- Floating Hexagons ---
    interface HexBlock {
      x: number; y: number; size: number;
      rotation: number; rotSpeed: number;
      alpha: number; color: number[]; phase: number;
    }
    const hexBlocks: HexBlock[] = [];
    for (let i = 0; i < 12; i++) {
      hexBlocks.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: 15 + Math.random() * 30,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.002,
        alpha: 0.015 + Math.random() * 0.025,
        color: colors[Math.floor(Math.random() * colors.length)],
        phase: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;

    function drawGrid() {
      for (let x = 0; x < w; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.strokeStyle = `rgba(79, 125, 247, ${gridAlpha})`;
        ctx.lineWidth = 0.3;
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.strokeStyle = `rgba(79, 125, 247, ${gridAlpha})`;
        ctx.lineWidth = 0.3;
        ctx.stroke();
      }

      // Grid pulses near mouse
      for (let x = 0; x < w; x += gridSpacing) {
        for (let y = 0; y < h; y += gridSpacing) {
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 300) {
            const proximity = 1 - dist / 300;
            const pulseAlpha = proximity * 0.15 * (0.7 + 0.3 * Math.sin(time * 3 + x * 0.01 + y * 0.01));
            ctx.beginPath();
            ctx.arc(x, y, 1.5 + proximity * 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(79, 125, 247, ${pulseAlpha})`;
            ctx.fill();
          }
        }
      }
    }

    function drawNodes() {
      // Connections
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.06;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(79, 125, 247, ${alpha})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();

            // Data pulse
            const pulsePos = (time * 0.5 + i * 0.1) % 1;
            const px = a.x + (b.x - a.x) * pulsePos;
            const py = a.y + (b.y - a.y) * pulsePos;
            ctx.beginPath();
            ctx.arc(px, py, 1, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(79, 125, 247, ${alpha * 3})`;
            ctx.fill();
          }
        }
      }

      // Nodes
      for (const node of nodes) {
        node.x += node.vx + Math.sin(time + node.phase) * 0.15;
        node.y += node.vy + Math.cos(time * 0.7 + node.phase) * 0.1;

        if (node.x < -20) node.x = w + 20;
        if (node.x > w + 20) node.x = -20;
        if (node.y < -20) node.y = h + 20;
        if (node.y > h + 20) node.y = -20;

        const pulse = 0.7 + 0.3 * Math.sin(time * node.pulseSpeed + node.phase);
        node.alpha = node.baseAlpha * pulse;

        const dx = node.x - mouse.x;
        const dy = node.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let sizeBoost = 0;
        if (dist < 250) {
          const proximity = 1 - dist / 250;
          node.alpha += proximity * 0.2;
          sizeBoost = proximity * 1.5;
        }

        const c = node.color;
        ctx.save();
        ctx.translate(node.x, node.y);
        ctx.globalAlpha = node.alpha;

        const drawSize = node.size + sizeBoost;

        if (node.type === "diamond") {
          const s = drawSize * 1.5;
          ctx.rotate(Math.PI / 4);
          ctx.beginPath();
          ctx.rect(-s / 2, -s / 2, s, s);
          ctx.strokeStyle = `rgb(${c[0]},${c[1]},${c[2]})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        } else if (node.type === "triangle") {
          const s = drawSize * 1.5;
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
          ctx.arc(0, 0, drawSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${node.alpha})`;
          ctx.fill();
          if (drawSize > 2.5) {
            ctx.beginPath();
            ctx.arc(0, 0, drawSize * 3, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${node.alpha * 0.12})`;
            ctx.fill();
          }
        }
        ctx.restore();
      }
    }

    function drawStreams() {
      for (const stream of streams) {
        stream.y += stream.speed;
        if (stream.y - stream.length > h) {
          stream.y = -stream.length;
          stream.x = Math.random() * w;
        }

        const grad = ctx.createLinearGradient(stream.x, stream.y - stream.length, stream.x, stream.y);
        const c = stream.color;
        grad.addColorStop(0, `rgba(${c[0]},${c[1]},${c[2]},0)`);
        grad.addColorStop(0.5, `rgba(${c[0]},${c[1]},${c[2]},${stream.alpha})`);
        grad.addColorStop(1, `rgba(${c[0]},${c[1]},${c[2]},0)`);

        ctx.beginPath();
        ctx.moveTo(stream.x, stream.y - stream.length);
        ctx.lineTo(stream.x, stream.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = stream.width;
        ctx.stroke();
      }
    }

    function drawHexBlocks() {
      for (const hex of hexBlocks) {
        hex.rotation += hex.rotSpeed;
        const floatY = Math.sin(time * 0.3 + hex.phase) * 10;
        hex.x += Math.sin(time * 0.1 + hex.phase) * 0.2;
        hex.y += Math.cos(time * 0.08 + hex.phase) * 0.15;

        if (hex.x < -50) hex.x = w + 50;
        if (hex.x > w + 50) hex.x = -50;
        if (hex.y < -50) hex.y = h + 50;
        if (hex.y > h + 50) hex.y = -50;

        const c = hex.color;
        ctx.save();
        ctx.translate(hex.x, hex.y + floatY);
        ctx.rotate(hex.rotation);
        ctx.globalAlpha = hex.alpha;

        const s = hex.size;
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i - Math.PI / 6;
          const px = s * Math.cos(angle);
          const py = s * Math.sin(angle);
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.strokeStyle = `rgb(${c[0]},${c[1]},${c[2]})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
        ctx.restore();
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      time += 0.008;
      drawGrid();
      drawStreams();
      drawHexBlocks();
      drawNodes();
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
