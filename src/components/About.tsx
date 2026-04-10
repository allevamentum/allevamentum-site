const advantages = [
  { num: "01", title: "Enterprise-Grade Architecture", desc: "Systems engineered for Fortune 500 reliability. Microservices, event-driven design, and zero-downtime deployments from day one." },
  { num: "02", title: "Full-Stack Ownership", desc: "From infrastructure to pixel-perfect interfaces. One team owns the entire stack — backend, frontend, mobile, cloud, and DevOps." },
  { num: "03", title: "AI & Emerging Technology", desc: "Large language models, computer vision, predictive analytics. We integrate AI where it creates measurable competitive advantage." },
  { num: "04", title: "Infinite Scalability", desc: "Cloud-native architecture that handles 100 users or 100 million. Auto-scaling, global CDN, and 99.99% uptime SLA." },
];

export default function About() {
  return (
    <section className="sec" id="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-left">
            <span className="label" data-anim="blur">Who We Are</span>
            <h2 className="heading-lg" data-anim="blur">
              We build the platforms<br />that power <em>industries</em>
            </h2>
            <p className="about-lead" data-anim="fade">
              Allevamentum is a premium software engineering company. We create
              enterprise applications, AI-powered platforms, and digital
              infrastructure that operates at global scale. Our ambition is to
              build technology that defines the next era of business.
            </p>
          </div>
          <div className="about-right" data-anim="fade">
            <div className="advantage-list">
              {advantages.map((a) => (
                <div key={a.num} className="adv-item glass-card" data-glow data-anim="scale" data-depth>
                  <div className="glass-shine" />
                  <div className="adv-inner">
                    <div className="adv-num">{a.num}</div>
                    <div className="adv-text">
                      <h3>{a.title}</h3>
                      <p>{a.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
