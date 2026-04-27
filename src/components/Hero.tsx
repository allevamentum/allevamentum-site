"use client";
import { useEffect, useRef, useState } from "react";
import HeroParticles from "./HeroParticles";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260421_074215_f4339e1c-0b1a-4f60-98b2-90e3d7840cb7.mp4";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoLayerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  // --- Reveal hero content after preloader exits (~3400ms) ---
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 3400);
    return () => clearTimeout(t);
  }, []);

  // --- Scroll parallax: video moves slower, content rises and fades ---
  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const videoLayer = videoLayerRef.current;
    if (!section || !content || !videoLayer) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const h = section.offsetHeight;
        const progress = Math.min(1, Math.max(0, -rect.top / h));
        videoLayer.style.transform = `translate3d(0, ${progress * 60}px, 0) scale(${1 + progress * 0.04})`;
        content.style.transform = `translate3d(0, ${-progress * 50}px, 0)`;
        content.style.opacity = String(Math.max(0, 1 - progress * 1.6));
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // --- Mouse-follow specular glow ---
  useEffect(() => {
    const section = sectionRef.current;
    const glow = glowRef.current;
    if (!section || !glow) return;
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (isTouch) return;
    let raf = 0;
    let tx = 0,
      ty = 0,
      cx = 0,
      cy = 0;
    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      tx = e.clientX - rect.left;
      ty = e.clientY - rect.top;
    };
    const tick = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      glow.style.transform = `translate3d(${cx - 240}px, ${cy - 240}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    section.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      section.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`hero hero-cinema${revealed ? " hero-revealed" : ""}`}
      id="hero"
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: "640px",
        overflow: "hidden",
        background: "#000",
      }}
    >
      {/* Background video — parallax */}
      <div
        ref={videoLayerRef}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          willChange: "transform",
        }}
      >
        <video
          src={VIDEO_URL}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            filter: "saturate(0.92) brightness(0.78) contrast(1.05)",
          }}
        />
      </div>

      {/* Brand color wash */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 22% 30%, rgba(79,125,247,0.22) 0%, transparent 55%), radial-gradient(ellipse at 78% 70%, rgba(139,108,247,0.24) 0%, transparent 55%), radial-gradient(ellipse at 90% 18%, rgba(244,114,182,0.10) 0%, transparent 50%)",
          mixBlendMode: "screen",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Network particles overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          opacity: 0.7,
          pointerEvents: "none",
        }}
      >
        <HeroParticles />
      </div>

      {/* Mouse-follow specular glow */}
      <div
        ref={glowRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 480,
          height: 480,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at center, rgba(139,108,247,0.32) 0%, rgba(79,125,247,0.16) 35%, transparent 70%)",
          filter: "blur(40px)",
          zIndex: 3,
          pointerEvents: "none",
          mixBlendMode: "screen",
          willChange: "transform",
        }}
      />

      {/* Content layer — massive overlapping words + paragraph + stats */}
      <div
        ref={contentRef}
        style={{
          position: "relative",
          height: "100%",
          width: "100%",
          maxWidth: "1320px",
          margin: "0 auto",
          zIndex: 5,
          willChange: "transform, opacity",
        }}
      >
        {/* Word: build (top-left) */}
        <h1
          className="hero-massive-word hero-anim hero-anim-2"
          style={{
            position: "absolute",
            left: "clamp(12px, 3vw, 40px)",
            top: "18%",
            fontSize: "clamp(110px, 18vw, 280px)",
            margin: 0,
            mixBlendMode: "difference",
          }}
        >
          build
        </h1>

        {/* Word: scale (right) */}
        <h1
          className="hero-massive-word hero-anim hero-anim-3"
          style={{
            position: "absolute",
            right: "clamp(12px, 3vw, 40px)",
            top: "38%",
            fontSize: "clamp(110px, 18vw, 280px)",
            margin: 0,
            mixBlendMode: "difference",
          }}
        >
          scale
        </h1>

        {/* Word: elevate (bottom-center) */}
        <h1
          className="hero-massive-word hero-anim hero-anim-4"
          style={{
            position: "absolute",
            left: "clamp(8%, 18%, 22%)",
            top: "58%",
            fontSize: "clamp(110px, 18vw, 280px)",
            margin: 0,
            mixBlendMode: "difference",
          }}
        >
          elevate
        </h1>

        {/* Paragraph (mid-left) */}
        <p
          className="hero-anim hero-anim-5"
          style={{
            position: "absolute",
            left: "clamp(16px, 3vw, 40px)",
            top: "46%",
            maxWidth: "320px",
            fontSize: "clamp(13px, 1.1vw, 18px)",
            lineHeight: 1.55,
            color: "rgba(255, 255, 255, 0.92)",
            fontWeight: 300,
            letterSpacing: "0.005em",
          }}
        >
          We engineer software with the precision of a craft and the rigor of a
          discipline — premium platforms that scale to millions.
        </p>

        {/* Stat: bottom-left — 50+ Products Shipped */}
        <div
          className="hero-anim hero-anim-6"
          style={{
            position: "absolute",
            left: "clamp(16px, 3vw, 40px)",
            bottom: "calc(72px + max(0px, env(safe-area-inset-bottom)))",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div>
            <div
              className="av-hero-stat-num"
              style={{ fontSize: "clamp(28px, 3vw, 56px)" }}
            >
              50+
            </div>
            <div className="av-hero-stat-cap">products shipped</div>
          </div>
          <span
            aria-hidden="true"
            className="av-hero-stat-line"
            style={{ width: "96px", transform: "rotate(-20deg)" }}
          />
        </div>

        {/* Stat: top-right — 2M+ End Users */}
        <div
          className="hero-anim hero-anim-6"
          style={{
            position: "absolute",
            right: "clamp(16px, 3vw, 40px)",
            top: "16%",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <span
            aria-hidden="true"
            className="av-hero-stat-line"
            style={{ width: "96px", transform: "rotate(20deg)" }}
          />
          <div style={{ textAlign: "right" }}>
            <div
              className="av-hero-stat-num"
              style={{ fontSize: "clamp(28px, 3vw, 56px)" }}
            >
              2M+
            </div>
            <div className="av-hero-stat-cap">end users reached</div>
          </div>
        </div>

        {/* Stat: bottom-right — 99.9% Uptime */}
        <div
          className="hero-anim hero-anim-6"
          style={{
            position: "absolute",
            right: "clamp(16px, 3vw, 40px)",
            bottom: "calc(72px + max(0px, env(safe-area-inset-bottom)))",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <span
            aria-hidden="true"
            className="av-hero-stat-line"
            style={{ width: "96px", transform: "rotate(-20deg)" }}
          />
          <div style={{ textAlign: "right" }}>
            <div
              className="av-hero-stat-num"
              style={{ fontSize: "clamp(28px, 3vw, 56px)" }}
            >
              99.9%
            </div>
            <div className="av-hero-stat-cap">uptime</div>
          </div>
        </div>
      </div>

      {/* Bottom fade for legibility & section transition */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "192px",
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(17,17,24,0.82) 60%, #111118 100%)",
          zIndex: 4,
          pointerEvents: "none",
        }}
      />
    </section>
  );
}
