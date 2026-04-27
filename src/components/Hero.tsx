"use client";
import { useEffect, useRef, useState } from "react";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260221_085953_8463b46e-ba85-4bb7-912a-1feaf346e970.mp4";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const [revealed, setRevealed] = useState(false);

  // --- Seamless video loop fade (RAF-driven) ---
  useEffect(() => {
    const video = videoRef.current;
    const overlay = overlayRef.current;
    if (!video || !overlay) return;

    const FADE_OUT_START = 1.5; // start fade out 1.5s before end
    const FADE_OUT_END = 0.3; // fully black 0.3s before end
    const FADE_IN_DURATION = 1.0; // fade in over first 1s after restart
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

  // --- Reveal hero content after preloader exits (~3400ms) ---
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 3400);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
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
      {/* Background video */}
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
          zIndex: 0,
          filter: "saturate(0.85) brightness(0.78)",
        }}
      />

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

      {/* Allevamentum gradient wash — subtle blue/purple ambience */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 28% 32%, rgba(79,125,247,0.22) 0%, transparent 55%), radial-gradient(ellipse at 72% 78%, rgba(139,108,247,0.24) 0%, transparent 55%)",
          mixBlendMode: "screen",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Bottom legibility gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(17,17,24,0.4) 0%, transparent 22%, transparent 50%, rgba(17,17,24,0.72) 78%, rgba(17,17,24,0.98) 100%)",
          zIndex: 3,
          pointerEvents: "none",
        }}
      />

      {/* Subtle scan-line / grain texture for premium feel */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.012) 0px, rgba(255,255,255,0.012) 1px, transparent 1px, transparent 3px)",
          zIndex: 4,
          pointerEvents: "none",
          mixBlendMode: "overlay",
        }}
      />

      {/* Hero content — bottom aligned, container width */}
      <div
        className={`hero-content container${revealed ? " hero-revealed" : ""}`}
        style={{
          position: "relative",
          zIndex: 5,
          textAlign: "center",
          width: "100%",
          maxWidth: "880px",
          padding: "0 28px 92px",
        }}
      >
        {/* Badge */}
        <div className="hero-anim hero-anim-1" style={{ marginBottom: 28 }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "7px 16px 7px 12px",
              borderRadius: "9999px",
              border: "1px solid rgba(255,255,255,0.13)",
              background: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
          >
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
                color: "rgba(240,237,232,0.84)",
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

        {/* Heading — three lines, staggered */}
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
                fontStyle: "italic",
                fontWeight: 500,
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

        {/* CTA buttons */}
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
          <a
            href="#contact"
            data-magnetic
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 28px",
              borderRadius: "9999px",
              background:
                "linear-gradient(135deg, #4F7DF7 0%, #8B6CF7 100%)",
              color: "#F0EDE8",
              fontSize: "14.5px",
              fontWeight: 600,
              letterSpacing: "0.01em",
              textDecoration: "none",
              transition:
                "transform 0.22s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease, filter 0.2s",
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.06) inset, 0 12px 42px rgba(79,125,247,0.36)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.transform = "translateY(-1.5px) scale(1.025)";
              el.style.boxShadow =
                "0 0 0 1px rgba(255,255,255,0.10) inset, 0 18px 56px rgba(139,108,247,0.55)";
              el.style.filter = "brightness(1.06)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.transform = "translateY(0) scale(1)";
              el.style.boxShadow =
                "0 0 0 1px rgba(255,255,255,0.06) inset, 0 12px 42px rgba(79,125,247,0.36)";
              el.style.filter = "brightness(1)";
            }}
          >
            Start a Project
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
            >
              <path d="M7 17 17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </a>

          <a
            href="#services"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 28px",
              borderRadius: "9999px",
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              color: "#F0EDE8",
              fontSize: "14.5px",
              fontWeight: 500,
              letterSpacing: "0.01em",
              textDecoration: "none",
              transition:
                "background 0.22s, border-color 0.22s, transform 0.18s",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.background = "rgba(255,255,255,0.08)";
              el.style.borderColor = "rgba(255,255,255,0.34)";
              el.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.background = "rgba(255,255,255,0.04)";
              el.style.borderColor = "rgba(255,255,255,0.18)";
              el.style.transform = "translateY(0)";
            }}
          >
            Our Work
          </a>
        </div>

        {/* Trust stats line — quiet, premium */}
        <div
          className="hero-anim hero-anim-6"
          style={{
            marginTop: "52px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0",
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

      {/* Scroll hint */}
      <div
        className={`scroll-hint${revealed ? " hero-anim hero-anim-6" : ""}`}
        style={{
          position: "absolute",
          bottom: "28px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
          opacity: revealed ? undefined : 0,
        }}
      >
        <div className="scroll-line" />
        <span
          style={{
            fontSize: "10px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(240,237,232,0.4)",
          }}
        >
          Scroll
        </span>
      </div>
    </section>
  );
}
