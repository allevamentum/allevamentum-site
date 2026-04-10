const steps = [
  { num: "01", title: "Research & Strategy", desc: "We analyze the problem space, map user journeys, and define the technical architecture before a single line of code is written." },
  { num: "02", title: "Prototype & Validate", desc: "Interactive prototypes tested with real users. We validate core assumptions before committing to full development." },
  { num: "03", title: "Engineer & Iterate", desc: "Agile sprints with continuous integration. Production-grade code, automated testing, and weekly demos from day one." },
  { num: "04", title: "Deploy & Evolve", desc: "Zero-downtime launches, real-time monitoring, and continuous optimization. We stay with your product as it grows." },
];

export default function Process() {
  return (
    <section className="sec" id="process">
      <div className="container">
        <div className="sec-header center" data-anim="blur">
          <span className="label">Our Process</span>
          <h2 className="heading-lg">From zero to<br />production-grade <em>product</em></h2>
        </div>
        <div className="process-grid">
          {steps.map((s) => (
            <div key={s.num} className="proc-card glass-card" data-glow data-anim="scale" data-depth>
              <div className="glass-shine" />
              <div className="proc-inner">
                <div className="proc-step">{s.num}</div>
                <div className="proc-line" />
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
