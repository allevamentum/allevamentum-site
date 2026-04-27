"use client";

interface Industry {
  name: string;
  Icon: React.FC;
  blobs: { color: string; opacity: number; pos: React.CSSProperties; size: number }[];
}

const FintechIcon: React.FC = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="#F0EDE8" aria-hidden="true">
    <path d="M12 2l2.39 4.84L20 8l-4 3.9L17.28 18 12 15.27 6.72 18 8 11.9 4 8l5.61-1.16L12 2z" />
  </svg>
);
const HealthcareIcon: React.FC = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#F0EDE8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);
const EnterpriseIcon: React.FC = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="#F0EDE8" aria-hidden="true">
    <path d="M3 21V7l9-4 9 4v14h-6v-6h-6v6H3zm6-8h6v-2H9v2zm0-4h6V7H9v2z" />
  </svg>
);
const AiMlIcon: React.FC = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#F0EDE8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="2.2" fill="#F0EDE8" />
    <circle cx="6" cy="6" r="1.5" />
    <circle cx="18" cy="6" r="1.5" />
    <circle cx="6" cy="18" r="1.5" />
    <circle cx="18" cy="18" r="1.5" />
    <line x1="12" y1="12" x2="6" y2="6" />
    <line x1="12" y1="12" x2="18" y2="6" />
    <line x1="12" y1="12" x2="6" y2="18" />
    <line x1="12" y1="12" x2="18" y2="18" />
  </svg>
);

const INDUSTRIES: Industry[] = [
  {
    name: "Fintech",
    Icon: FintechIcon,
    blobs: [
      { color: "#4F7DF7", opacity: 0.4, size: 260, pos: { top: -90, left: -90 } },
    ],
  },
  {
    name: "Healthcare",
    Icon: HealthcareIcon,
    blobs: [
      { color: "#2DD4BF", opacity: 0.32, size: 260, pos: { top: -90, left: -90 } },
      { color: "#F472B6", opacity: 0.22, size: 220, pos: { bottom: -90, right: -90 } },
    ],
  },
  {
    name: "Enterprise",
    Icon: EnterpriseIcon,
    blobs: [
      { color: "#8B6CF7", opacity: 0.36, size: 260, pos: { bottom: -90, left: -90 } },
    ],
  },
  {
    name: "AI / ML",
    Icon: AiMlIcon,
    blobs: [
      { color: "#F472B6", opacity: 0.34, size: 280, pos: { top: "50%", right: -120, transform: "translateY(-50%)" } },
      { color: "#F5A623", opacity: 0.18, size: 200, pos: { top: -60, left: -60 } },
    ],
  },
];

export default function IndustriesSection() {
  return (
    <section
      id="industries"
      style={{
        position: "relative",
        width: "100%",
        background: "#000",
        padding: "clamp(48px, 8vh, 100px) clamp(16px, 4vw, 40px)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        {/* Eyebrow + heading */}
        <div data-anim="blur" style={{ marginBottom: "clamp(36px, 6vh, 72px)" }}>
          <span className="label">Industries we serve</span>
          <h2
            className="heading-lg"
            style={{ marginBottom: 0 }}
          >
            Trusted across<br />verticals that <em>matter</em>
          </h2>
        </div>

        {/* 4-card grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "16px",
          }}
        >
          {INDUSTRIES.map((ind) => (
            <div
              key={ind.name}
              className="av-card"
              data-anim="fade"
              style={{
                position: "relative",
                height: "clamp(120px, 14vh, 144px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "14px",
              }}
            >
              {ind.blobs.map((b, i) => (
                <div
                  key={i}
                  className="av-blob"
                  style={{
                    background: b.color,
                    opacity: b.opacity,
                    width: b.size,
                    height: b.size,
                    ...b.pos,
                  }}
                />
              ))}
              <div
                style={{
                  position: "relative",
                  zIndex: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <ind.Icon />
                <span
                  style={{
                    color: "#F0EDE8",
                    fontSize: "clamp(20px, 2vw, 28px)",
                    fontWeight: 600,
                    letterSpacing: "-0.012em",
                  }}
                >
                  {ind.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Below grid: paragraph + CTA */}
        <div
          style={{
            marginTop: "clamp(56px, 9vh, 112px)",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "clamp(24px, 4vw, 64px)",
            marginLeft: "auto",
            width: "100%",
            maxWidth: "70%",
          }}
          className="av-industries-foot"
        >
          <p
            style={{
              maxWidth: "440px",
              fontSize: "clamp(13px, 1.1vw, 18px)",
              lineHeight: 1.65,
              color: "rgba(240, 237, 232, 0.7)",
              fontWeight: 300,
              letterSpacing: "0.005em",
            }}
            data-anim="fade"
          >
            Premium engineering, applied with vertical discipline — we partner
            with leaders to ship platforms their customers can rely on.
          </p>
          <a
            href="#contact"
            data-magnetic
            className="av-grad-border-btn"
            data-anim="fade"
          >
            <span className="av-grad-border-btn-inner">Run a Demo</span>
          </a>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          :global(.av-industries-foot) {
            max-width: 100% !important;
            margin-left: 0 !important;
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </section>
  );
}
