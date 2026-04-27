"use client";
import { useEffect, useRef, useState } from "react";
import HeroParticles from "./HeroParticles";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260221_085953_8463b46e-ba85-4bb7-912a-1feaf346e970.mp4";

// Apple's signature easing — used across iOS 26 motion
const SPRING = "cubic-bezier(0.32, 0.72, 0, 1)";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoLayerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const [revealed, setRevealed] = useState(false);

  // --- Seamless video loop fade (RAF-driven) ---
  useEffect(() => {
    const video = videoRef.current;
    const overlay = overlayRef.current;
    if (!video || !overlay) return;

    const FADE_OUT_START = 1.5;
    const FADE_OUT_END = 0.3;
    const FADE_IN_DURATION = 1.0;
    let restartTime: number | null = null;

    function tick() {
      if (!video || !overlay) return;
      const dur = video.duration;
      const cur = video.currentTime;
      if (!isNaN(dur) && dur > 0) {
        const timeLeft = dur - cur;
        if (timeLeft <= FADE_OUT_START) {
          const progress = Math.min(
            1,
            (FADE_OUT_START - timeLeft) / (FADE_OUT_START - FADE_OUT_END)
          );
          overlay.style.opacity = String(progress);
        } else if (restartTime !== null) {
          const elapsed = performance.now() / 1000 - restartTime;
          if (elapsed < FADE_IN_DURATION) {
            overlay.style.opacity = String(1 - elapsed / FADE_IN_DURATION);
          } else {
            overlay.style.opacity = "0";
            restartTime = null;
          }
        } else {
          overlay.style.opacity = "0";
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    }

    const handlePlay = () => {
      rafRef.current = requestAnimationFrame(tick);
    };
    const handleTimeUpdate = () => {
      if (video.currentTime < 0.5) {
        restartTime = performance.now() / 1000;
        overlay.style.opacity = "1";
      }
    };

    video.addEventListener("play", handlePlay);
    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  // --- Scroll parallax: video moves slower, content rises and softly fades ---
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
        // 0 at top, 1 when section has scrolled past
        const progress = Math.min(1, Math.max(0, -rect.top / h));
        // Video parallax: moves up at half speed, scales subtly
        videoLayer.style.transform = `translate3d(0, ${progress * 60}px, 0) scale(${1 + progress * 0.04})`;
        // Content parallax: rises slightly, fades as you scroll
        content.style.transform = `translate3d(0, ${-progress * 40}px, 0)`;
        content.style.opacity = String(Math.max(0, 1 - progress * 1.4));
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // --- Mouse-follow specular glow inside hero ---
  useEffect(() => {
    const section = sectionRef.current;
    const glow = glowRef.current;
    if (!section || !glow) return;

    const isTouch = window.matchMedia("(hover: none)").matches;
    if (isTouch) return;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
    };
    const tick = () => {
      curX += (targetX - curX) * 0.08;
      curY += (targetY - curY) * 0.08;
      glow.style.transform = `translate3d(${curX - 240}px, ${curY - 240}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    section.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      section.removeEventListener("mousemove", onMove);
    };
  }, []);

  // --- Reveal hero content after preloader exits (~3400ms) ---
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 3400);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero hero-cinema"
      id="hero"
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: "640px",
        overflow: "hidden",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
      }}
    >
      {/* Video parallax layer */}
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
          ref={videoRef}
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
            filter: "saturate(0.85) brightness(0.78) contrast(1.05)",
          }}
        />
      </div>

      {/* Fade-to-black overlay (RAF-controlled) */}
      <div
        ref={overlayRef}
        style={{
          position: "absolute",
          inset: 0,
          background: "#111118",
          zIndex: 1,
          opacity: 0,
          pointerEvents: "none",
        }}
      />

      {/* Brand color wash — animated radial gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 28% 32%, rgba(79,125,247,0.24) 0%, transparent 55%), radial-gradient(ellipse at 72% 78%, rgba(139,108,247,0.26) 0%, transparent 55%), radial-gradient(ellipse at 90% 18%, rgba(244,114,182,0.10) 0%, transparent 50%)",
          mixBlendMode: "screen",
          zIndex: 2,
          pointerEvents: "none",
          animation: "av-wash-drift 22s ease-in-out infinite",
        }}
      />

      {/* Network particles — extracted from the homepage FinTech canvas */}
      <div style={{ position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none", opacity: 0.85 }}>
        <HeroParticles />
      </div>

      {/* Mouse-follow specular glow hotspot */}
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
            "radial-gradient(circle at center, rgba(139,108,247,0.35) 0%, rgba(79,125,247,0.18) 35%, transparent 70%)",
          filter: "blur(40px)",
          zIndex: 4,
          pointerEvents: "none",
          mixBlendMode: "screen",
          willChange: "transform",
        }}
      />

      {/* Bottom legibility gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(17,17,24,0.4) 0%, transparent 22%, transparent 50%, rgba(17,17,24,0.74) 78%, rgba(17,17,24,0.98) 100%)",
          zIndex: 5,
          pointerEvents: "none",
        }}
      />

      {/* Subtle film grain / scan-line for premium feel */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.012) 0px, rgba(255,255,255,0.012) 1px, transparent 1px, transparent 3px)",
          zIndex: 6,
          pointerEvents: "none",
          mixBlendMode: "overlay",
        }}
      />

      {/* Hero content — bottom aligned */}
      <div
        ref={contentRef}
        className={`hero-content container${revealed ? " hero-revealed" : ""}`}
        style={{
          position: "relative",
          zIndex: 7,
          textAlign: "center",
          width: "100%",
          maxWidth: "880px",
          padding: "0 28px 96px",
          willChange: "transform, opacity",
        }}
      >
        {/* iOS 26 glass badge with specular highlight */}
        <div className="hero-anim hero-anim-1" style={{ marginBottom: 28 }}>
          <span className="ios-badge">
            <span className="ios-badge-shine" aria-hidden="true" />
            <span
              style={{
                display: "inline-block",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background:
                  "linear-gradient(135deg, #4F7DF7 0%, #8B6CF7 100%)",
                boxShadow:
                  "0 0 10px rgba(79,125,247,0.7), 0 0 20px rgba(139,108,247,0.4)",
              }}
            />
            <span
              style={{
                color: "rgba(240,237,232,0.86)",
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              Premium Software Engineering
            </span>
          </span>
        </div>

        {/* Heading — three lines, staggered, no italics */}
        <h1
          style={{
            fontSize: "clamp(38px, 7vw, 86px)",
            fontWeight: 600,
            lineHeight: 1.05,
            letterSpacing: "-0.028em",
            color: "#F0EDE8",
            marginBottom: "28px",
          }}
        >
          <span
            className="h1-line hero-anim hero-anim-2"
            style={{ display: "block" }}
          >
            We build software
          </span>
          <span
            className="h1-line hero-anim hero-anim-3"
            style={{ display: "block" }}
          >
            that powers the
          </span>
          <span
            className="h1-line hero-anim hero-anim-4"
            style={{ display: "block" }}
          >
            <span
              style={{
                background:
                  "linear-gradient(135deg, #4F7DF7 0%, #8B6CF7 55%, #F472B6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontWeight: 600,
              }}
            >
              future of industry.
            </span>
          </span>
        </h1>

        {/* Paragraph */}
        <p
          className="hero-anim hero-anim-5"
          style={{
            fontSize: "16.5px",
            lineHeight: 1.65,
            color: "rgba(240,237,232,0.62)",
            margin: "0 auto 38px",
            maxWidth: "580px",
            letterSpacing: "0.005em",
          }}
        >
          Enterprise applications, AI platforms, cloud infrastructure, and
          digital products — engineered to the highest standard. We don&apos;t
          just write code. We architect systems that scale to millions.
        </p>

        {/* CTA buttons — iOS 26 liquid-glass treatment */}
        <div
          className="hero-anim hero-anim-5"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <a href="#contact" data-magnetic className="ios-btn-primary">
            <span className="ios-btn-shine" aria-hidden="true" />
            <span style={{ position: "relative", zIndex: 1 }}>
              Start a Project
            </span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              style={{ position: "relative", zIndex: 1 }}
            >
              <path d="M7 17 17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </a>

          <a href="#services" className="ios-btn-glass">
            <span className="ios-btn-shine" aria-hidden="true" />
            <span style={{ position: "relative", zIndex: 1 }}>Our Work</span>
          </a>
        </div>

        {/* Trust line */}
        <div
          className="hero-anim hero-anim-6"
          style={{
            marginTop: "52px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 0,
            flexWrap: "wrap",
            color: "rgba(240,237,232,0.42)",
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}
        >
          <span style={{ padding: "0 18px" }}>
            <strong style={{ color: "#F0EDE8", fontWeight: 600 }}>50+</strong>
            &nbsp;Products Shipped
          </span>
          <span
            aria-hidden="true"
            style={{
              width: "3px",
              height: "3px",
              borderRadius: "50%",
              background: "rgba(240,237,232,0.3)",
            }}
          />
          <span style={{ padding: "0 18px" }}>
            <strong style={{ color: "#F0EDE8", fontWeight: 600 }}>2M+</strong>
            &nbsp;End Users Reached
          </span>
          <span
            aria-hidden="true"
            style={{
              width: "3px",
              height: "3px",
              borderRadius: "50%",
              background: "rgba(240,237,232,0.3)",
            }}
          />
          <span style={{ padding: "0 18px" }}>
            <strong style={{ color: "#F0EDE8", fontWeight: 600 }}>99.9%</strong>
            &nbsp;Uptime
          </span>
        </div>
      </div>

      {/* Inline iOS 26 polish styles */}
      <style jsx>{`
        @keyframes av-wash-drift {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(-2%, 1%, 0) scale(1.04);
          }
        }

        :global(.ios-badge) {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 18px 8px 12px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(18px) saturate(160%);
          -webkit-backdrop-filter: blur(18px) saturate(160%);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.16),
            inset 0 -1px 0 rgba(0, 0, 0, 0.18),
            0 4px 18px rgba(0, 0, 0, 0.25);
          overflow: hidden;
        }
        :global(.ios-badge-shine) {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 50%;
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.18) 0%,
            rgba(255, 255, 255, 0.04) 60%,
            transparent 100%
          );
          pointer-events: none;
          border-radius: 9999px 9999px 0 0;
        }

        :global(.ios-btn-primary),
        :global(.ios-btn-glass) {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          border-radius: 9999px;
          font-size: 14.5px;
          font-weight: 600;
          letter-spacing: 0.01em;
          text-decoration: none;
          color: #f0ede8;
          cursor: pointer;
          overflow: hidden;
          will-change: transform, box-shadow;
          transition:
            transform 0.45s ${SPRING},
            box-shadow 0.45s ${SPRING},
            filter 0.3s ease,
            background 0.35s ease,
            border-color 0.35s ease;
        }
        :global(.ios-btn-primary) {
          background: linear-gradient(135deg, #4f7df7 0%, #8b6cf7 100%);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.22),
            inset 0 -1px 0 rgba(0, 0, 0, 0.18),
            0 14px 40px rgba(79, 125, 247, 0.4),
            0 0 0 1px rgba(255, 255, 255, 0.08);
        }
        :global(.ios-btn-primary:hover) {
          transform: translateY(-2px) scale(1.025);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.3),
            inset 0 -1px 0 rgba(0, 0, 0, 0.22),
            0 22px 60px rgba(139, 108, 247, 0.55),
            0 0 0 1px rgba(255, 255, 255, 0.14);
          filter: brightness(1.06);
        }
        :global(.ios-btn-glass) {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.16);
          backdrop-filter: blur(18px) saturate(160%);
          -webkit-backdrop-filter: blur(18px) saturate(160%);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.16),
            inset 0 -1px 0 rgba(0, 0, 0, 0.18),
            0 4px 18px rgba(0, 0, 0, 0.25);
          font-weight: 500;
        }
        :global(.ios-btn-glass:hover) {
          background: rgba(255, 255, 255, 0.09);
          border-color: rgba(255, 255, 255, 0.32);
          transform: translateY(-1.5px);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.22),
            inset 0 -1px 0 rgba(0, 0, 0, 0.22),
            0 12px 36px rgba(0, 0, 0, 0.4);
        }
        :global(.ios-btn-shine) {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 50%;
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.22) 0%,
            rgba(255, 255, 255, 0.06) 60%,
            transparent 100%
          );
          pointer-events: none;
          border-radius: 9999px 9999px 0 0;
        }
      `}</style>
    </section>
  );
}
