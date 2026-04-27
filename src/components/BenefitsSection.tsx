"use client";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260421_072701_f6a01abb-eb30-4559-9d6e-774362defbc3.mp4";

export default function BenefitsSection() {
  return (
    <section
      id="benefits"
      style={{
        position: "relative",
        width: "100%",
        background: "#000",
        padding: "clamp(48px, 8vh, 100px) clamp(16px, 4vw, 40px)",
      }}
    >
      <div style={{ width: "100%", maxWidth: "1280px", margin: "0 auto" }}>
        {/* Heading */}
        <h2
          data-anim="blur"
          style={{
            color: "#F0EDE8",
            fontSize: "clamp(28px, 4vw, 56px)",
            fontWeight: 300,
            letterSpacing: "-0.04em",
            textAlign: "center",
            margin: "0 0 clamp(48px, 8vh, 96px)",
          }}
        >
          Key Benefits
        </h2>

        {/* 3-card grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "16px",
          }}
        >
          {/* Card 1 — top blob, headline, copy */}
          <article
            className="av-card"
            data-anim="fade"
            style={{
              position: "relative",
              height: "clamp(360px, 56vh, 460px)",
              padding: "clamp(24px, 3vw, 40px)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              className="av-blob"
              style={{
                background: "#4F7DF7",
                opacity: 0.42,
                width: 460,
                height: 460,
                top: "50%",
                left: -420,
                transform: "translateY(-50%)",
              }}
            />
            <h3
              style={{
                position: "relative",
                zIndex: 2,
                color: "#F0EDE8",
                fontSize: "clamp(20px, 2vw, 26px)",
                fontWeight: 400,
                lineHeight: 1.18,
                letterSpacing: "-0.014em",
                margin: 0,
              }}
            >
              Battle-tested architecture<br />
              <span style={{ color: "rgba(240,237,232,0.6)" }}>
                for production scale
              </span>
            </h3>
            <p
              style={{
                position: "relative",
                zIndex: 2,
                marginTop: "clamp(48px, 8vh, 80px)",
                fontSize: "clamp(13px, 1vw, 14.5px)",
                lineHeight: 1.65,
                color: "rgba(240, 237, 232, 0.68)",
                fontWeight: 300,
                maxWidth: "320px",
                letterSpacing: "0.003em",
              }}
            >
              We architect microservices, event-driven systems, and zero-downtime
              deployments engineered for Fortune-500 reliability — observability
              and resilience built in from day one.
            </p>
          </article>

          {/* Card 2 — video on top, copy below */}
          <article
            className="av-card"
            data-anim="fade"
            style={{
              position: "relative",
              height: "clamp(360px, 56vh, 460px)",
              display: "flex",
              flexDirection: "column",
              padding: 0,
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "75%",
                overflow: "hidden",
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
                  display: "block",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              {/* Bottom fade inside the video region */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "128px",
                  background:
                    "linear-gradient(to bottom, transparent 0%, rgba(10,10,16,0.92) 100%)",
                  pointerEvents: "none",
                }}
              />
            </div>
            <div
              style={{
                position: "relative",
                zIndex: 2,
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                padding: "clamp(20px, 3vw, 32px)",
              }}
            >
              <h3
                style={{
                  color: "#F0EDE8",
                  fontSize: "clamp(20px, 2vw, 26px)",
                  fontWeight: 400,
                  lineHeight: 1.18,
                  letterSpacing: "-0.014em",
                  margin: 0,
                }}
              >
                Engineering excellence<br />
                <span style={{ color: "rgba(240,237,232,0.6)" }}>
                  at every layer
                </span>
              </h3>
            </div>
          </article>

          {/* Card 3 — top-right blob, headline, body pinned to bottom */}
          <article
            className="av-card"
            data-anim="fade"
            style={{
              position: "relative",
              height: "clamp(360px, 56vh, 460px)",
              padding: "clamp(24px, 3vw, 40px)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              className="av-blob"
              style={{
                background: "#8B6CF7",
                opacity: 0.42,
                width: 224,
                height: 224,
                top: -112,
                right: -112,
              }}
            />
            <div
              className="av-blob"
              style={{
                background: "#F472B6",
                opacity: 0.20,
                width: 200,
                height: 200,
                bottom: -100,
                left: -100,
              }}
            />
            <h3
              style={{
                position: "relative",
                zIndex: 2,
                color: "#F0EDE8",
                fontSize: "clamp(20px, 2vw, 26px)",
                fontWeight: 400,
                lineHeight: 1.18,
                letterSpacing: "-0.014em",
                margin: 0,
              }}
            >
              Continuous evolution<br />
              <span style={{ color: "rgba(240,237,232,0.6)" }}>
                always shipping
              </span>
            </h3>
            <p
              style={{
                position: "relative",
                zIndex: 2,
                marginTop: "auto",
                fontSize: "clamp(13px, 1vw, 14.5px)",
                lineHeight: 1.65,
                color: "rgba(240, 237, 232, 0.68)",
                fontWeight: 300,
                maxWidth: "320px",
                letterSpacing: "0.003em",
              }}
            >
              Weekly demos, transparent dashboards, and a delivery cadence built
              for momentum — your platform evolves faster than the markets it
              serves.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
