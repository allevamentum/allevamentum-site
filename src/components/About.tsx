const advantages = [
  { num: "01", title: "Product Thinking", desc: "Every application we build solves a real problem. We think in outcomes, not features." },
  { num: "02", title: "End-to-End Engineering", desc: "From system architecture to App Store submission. One team, full ownership, zero friction." },
  { num: "03", title: "Bleeding-Edge Tech", desc: "AI, real-time systems, edge computing. We use emerging technology when it creates real advantage." },
  { num: "04", title: "Built to Scale", desc: "Cloud-native architecture from day one. Your application handles 100 users or 10 million — seamlessly." },
];

export default function About() {
  return (
    <section className="sec" id="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-left">
            <span className="label" data-anim="blur">Who We Are</span>
            <h2 className="heading-lg" data-anim="blur">
              We engineer the<br />applications of <em>tomorrow</em>
            </h2>
            <p className="about-lead" data-anim="fade">
              Allevamentum is a product studio that creates intelligent,
              high-performance applications. We combine deep engineering with
              bold design to build software that redefines industries.
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
