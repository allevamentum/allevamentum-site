"use client";
import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    let rafId: number;

    function update() {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docH > 0 ? (window.scrollY / docH) * 100 : 0;
      bar!.style.width = progress + "%";
      rafId = requestAnimationFrame(update);
    }
    update();
    return () => cancelAnimationFrame(rafId);
  }, []);

  return <div className="scroll-progress" ref={barRef} aria-hidden="true" />;
}
