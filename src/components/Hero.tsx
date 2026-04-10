"use client";
import { useEffect, useState } from "react";
import HeroCanvas from "./HeroCanvas";

export default function Hero() {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    // Delay hero reveal until after preloader finishes
    const timer = setTimeout(() => setRevealed(true), 3400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hero" id="hero">
      <HeroCanvas />
      <div className="hero-depth-1" aria-hidden="true" />
      <div className="hero-depth-2" aria-hidden="true" />
      <div className="hero-fade" aria-hidden="true" />

      <div className={`hero-content container${revealed ? " hero-revealed" : ""}`}>
        <div className="hero-badge hero-anim hero-anim-1">
          <span className="badge-dot" />
          Premium Software Engineering
        </div>

        <h1 className="hero-h1">
          <span className="h1-line hero-anim hero-anim-2">
            <span className="h1-word">We build software</span>
          </span>
          <span className="h1-line hero-anim hero-anim-3">
            <span className="h1-word">that powers the</span>
          </span>
          <span className="h1-line hero-anim hero-anim-4">
            <span className="h1-word h1-accent">future of industry.</span>
          </span>
        </h1>

        <div className="hero-foot hero-anim hero-anim-5">
          <p className="hero-desc">
            Enterprise applications, AI platforms, cloud infrastructure, and
            digital products — engineered to the highest standard. We don&apos;t
            just write code. We architect systems that scale to millions.
          </p>
          <div className="hero-stats">
            <div className="h-stat">
              <span className="h-stat-n" data-count="50">0</span>
              <span className="h-stat-s">+</span>
              <span className="h-stat-l">Products Shipped</span>
            </div>
            <div className="h-stat">
              <span className="h-stat-n" data-count="2">0</span>
              <span className="h-stat-s">M+</span>
              <span className="h-stat-l">End Users Reached</span>
            </div>
            <div className="h-stat">
              <span className="h-stat-n" data-count="99">0</span>
              <span className="h-stat-s">.9%</span>
              <span className="h-stat-l">Uptime Guaranteed</span>
            </div>
          </div>
        </div>
      </div>

      <div className={`scroll-hint${revealed ? " hero-anim hero-anim-6" : ""}`} style={{ opacity: revealed ? undefined : 0 }}>
        <div className="scroll-line" />
        <span>Explore</span>
      </div>
    </section>
  );
}
