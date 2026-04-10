const services = [
  {
    num: "01", title: "Mobile Applications",
    desc: "Native iOS & Android experiences built with Swift, Kotlin, and cross-platform frameworks. From concept to App Store.",
    tags: ["Swift", "Kotlin", "React Native", "Flutter"],
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="14" y="4" width="20" height="38" rx="4" />
        <line x1="22" y1="38" x2="26" y2="38" opacity="0.5" />
        <rect x="18" y="12" width="12" height="16" rx="2" opacity="0.2" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    num: "02", title: "AI-Powered Solutions",
    desc: "Intelligent applications with machine learning, computer vision, NLP, and predictive analytics at their core.",
    tags: ["LLMs", "Computer Vision", "ML Pipelines", "Edge AI"],
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="24" cy="20" r="8" opacity="0.3" />
        <path d="M12 36c0-8 5-12 12-12s12 4 12 12" opacity="0.2" fill="currentColor" stroke="none" />
        <circle cx="24" cy="20" r="3" /><circle cx="36" cy="16" r="2" opacity="0.5" /><circle cx="12" cy="16" r="2" opacity="0.5" />
        <line x1="24" y1="23" x2="36" y2="18" opacity="0.3" /><line x1="24" y1="23" x2="12" y2="18" opacity="0.3" />
      </svg>
    ),
  },
  {
    num: "03", title: "Cloud Platforms",
    desc: "Scalable SaaS products, microservices architectures, and real-time data platforms engineered for millions of users.",
    tags: ["AWS", "Kubernetes", "Serverless", "Real-time"],
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2">
        <ellipse cx="24" cy="24" rx="20" ry="8" /><ellipse cx="24" cy="24" rx="20" ry="8" transform="rotate(60 24 24)" /><ellipse cx="24" cy="24" rx="20" ry="8" transform="rotate(120 24 24)" />
        <circle cx="24" cy="24" r="3" fill="currentColor" opacity="0.4" />
      </svg>
    ),
  },
  {
    num: "04", title: "IoT & Connected Systems",
    desc: "Smart device ecosystems, sensor networks, and edge computing solutions that bridge the physical and digital worlds.",
    tags: ["Embedded", "Edge Computing", "BLE", "MQTT"],
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="6" y="18" width="12" height="12" rx="2" opacity="0.3" /><rect x="30" y="18" width="12" height="12" rx="2" opacity="0.3" />
        <rect x="18" y="6" width="12" height="12" rx="2" opacity="0.3" /><rect x="18" y="30" width="12" height="12" rx="2" opacity="0.3" />
        <line x1="24" y1="18" x2="24" y2="30" opacity="0.4" /><line x1="18" y1="24" x2="12" y2="24" opacity="0.4" /><line x1="30" y1="24" x2="36" y2="24" opacity="0.4" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section className="sec" id="services">
      <div className="container">
        <div className="sec-header" data-anim="blur">
          <div>
            <span className="label">What We Create</span>
            <h2 className="heading-lg">Applications that<br />redefine <em>possible</em></h2>
          </div>
        </div>
        <div className="services-grid">
          {services.map((s) => (
            <div key={s.num} className="service-card glass-card" data-glow data-anim="scale" data-tilt>
              <div className="glass-shine" />
              <div className="sc-content">
                <div className="sc-top">
                  <span className="sc-num">{s.num}</span>
                  <div className="sc-icon">{s.icon}</div>
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <div className="sc-tags">
                  {s.tags.map((t) => <span key={t}>{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
