"use client";
import { useState } from "react";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260421_072418_508a7d2e-396d-4f6f-9d42-ec920fcf7755.mp4";

export default function EngineeringSection() {
  const [tab, setTab] = useState<"approach" | "demo">("approach");
  return (
    <section
      id="engineering"
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: "600px",
        overflow: "hidden",
        background: "#000",
      }}
    >
      {/* Background video */}
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
          filter: "saturate(0.9) brightness(0.8)",
          zIndex: 0,
        }}
      />

      {/* Brand color wash */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 25% 35%, rgba(79,125,247,0.18) 0%, transparent 55%), radial-gradient(ellipse at 75% 75%, rgba(139,108,247,0.20) 0%, transparent 55%)",
          mixBlendMode: "screen",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Top fade overlay (blends from preceding hero/black) */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "192px",
          background: "linear-gradient(to bottom, #111118 0%, transparent 100%)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          maxWidth: "1100px",
          margin: "0 auto",
          zIndex: 3,
        }}
      >
        {/* Floating pill toggle — top center */}
        <div
          data-anim="blur"
          style={{
            position: "absolute",
            top: "clamp(24px, 5vh, 56px)",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 4,
          }}
        >
          <div className="av-glass-pill" role="tablist" aria-label="Engineering view">
            <button
              role="tab"
              aria-selected={tab === "approach"}
              className={tab === "approach" ? "av-pill-gradient" : "av-pill-ghost"}
              onClick={() => setTab("approach")}
            >
              Our Approach
            </button>
            <button
              role="tab"
              aria-selected={tab === "demo"}
              className={tab === "demo" ? "av-pill-gradient" : "av-pill-ghost"}
              onClick={() => setTab("demo")}
            >
              Run a Demo
            </button>
          </div>
        </div>

        {/* Right paragraph (top-right) */}
        <p
          data-anim="fade"
          style={{
            position: "absolute",
            right: "clamp(16px, 4vw, 64px)",
            top: "30%",
            maxWidth: "500px",
            fontSize: "clamp(13px, 1.1vw, 18px)",
            lineHeight: 1.65,
            color: "rgba(240, 237, 232, 0.92)",
            fontWeight: 300,
            letterSpacing: "0.005em",
          }}
        >
          By partnering with a premium engineering team, your business can
          dramatically accelerate the build, scale, and reliability of its core
          systems. We bring battle-tested architecture, observability, and
          deployment patterns — protecting against unplanned downtime, data
          drift, and the technical debt that quietly erodes velocity.
        </p>

        {/* Left paragraph (bottom-left) */}
        <p
          data-anim="fade"
          style={{
            position: "absolute",
            left: "clamp(16px, 4vw, 64px)",
            bottom: "calc(96px + max(0px, env(safe-area-inset-bottom)))",
            maxWidth: "440px",
            fontSize: "clamp(13px, 1.1vw, 18px)",
            lineHeight: 1.65,
            color: "rgba(240, 237, 232, 0.82)",
            fontWeight: 300,
            letterSpacing: "0.005em",
          }}
        >
          Engineering software with the precision of a craft and the rigor of a
          discipline — Allevamentum platforms scale to millions while staying
          maintainable, observable, and elegant.
        </p>
      </div>

      {/* Bottom fade — blend into next dark section */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "160px",
          background: "linear-gradient(to bottom, transparent 0%, #111118 100%)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
    </section>
  );
}
