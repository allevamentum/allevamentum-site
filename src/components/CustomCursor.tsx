"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth < 769) return;
    const dot = dotRef.current;
    const glow = glowRef.current;
    if (!dot || !glow) return;

    let mx = -100, my = -100, dx = -100, dy = -100, gx = -100, gy = -100;
    let rafId: number;

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    document.addEventListener("mousemove", onMove);

    function loop() {
      dx += (mx - dx) * 0.2;
      dy += (my - dy) * 0.2;
      dot!.style.left = dx + "px";
      dot!.style.top = dy + "px";
      gx += (mx - gx) * 0.1;
      gy += (my - gy) * 0.1;
      glow!.style.left = gx + "px";
      glow!.style.top = gy + "px";
      rafId = requestAnimationFrame(loop);
    }
    loop();

    const hovers = "a,button,.service-card,.adv-item,.proc-card,.tech-cat,.t-pill,.btn-av,.glass-card";
    const onOver = (e: MouseEvent) => {
      if ((e.target as Element).closest(hovers)) {
        dot!.classList.add("hovering");
        glow!.classList.add("hovering");
      }
    };
    const onOut = (e: MouseEvent) => {
      if ((e.target as Element).closest(hovers)) {
        dot!.classList.remove("hovering");
        glow!.classList.remove("hovering");
      }
    };
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <>
      <div className="cur" ref={dotRef} aria-hidden="true">
        <svg viewBox="0 0 32 36" width="32" height="36" className="cur-tri">
          <defs>
            <linearGradient id="curGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4F7DF7" />
              <stop offset="100%" stopColor="#8B6CF7" />
            </linearGradient>
          </defs>
          <polygon points="16,2 30,34 2,34" fill="none" stroke="url(#curGrad)" strokeWidth="1.5" opacity="0.6" />
          <polygon points="16,12 24,30 8,30" fill="url(#curGrad)" opacity="0.5" />
        </svg>
      </div>
      <div className="cur-glow" ref={glowRef} aria-hidden="true" />
    </>
  );
}
