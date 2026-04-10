const categories = [
  { title: "Mobile", pills: ["Swift", "Kotlin", "React Native", "Flutter"] },
  { title: "AI / ML", pills: ["PyTorch", "TensorFlow", "OpenAI", "LangChain"] },
  { title: "Backend", pills: ["Node.js", "Python", "Go", "GraphQL"] },
  { title: "Cloud & DevOps", pills: ["AWS", "GCP", "Kubernetes", "Terraform"] },
  { title: "Data", pills: ["PostgreSQL", "Redis", "Kafka", "ClickHouse"] },
];

export default function Tech() {
  return (
    <section className="sec sec-dark" id="tech">
      <div className="container">
        <div className="sec-header center" data-anim="blur">
          <span className="label">Technology</span>
          <h2 className="heading-lg">Engineered with the<br />right <em>tools</em></h2>
          <p className="tech-sub" data-anim="fade">
            We pick technologies for durability, performance, and scale — not
            hype. Every choice is a deliberate engineering decision.
          </p>
        </div>
        <div className="tech-categories" data-anim="fade">
          {categories.map((c) => (
            <div key={c.title} className="tech-cat glass-card" data-glow data-depth>
              <div className="glass-shine" />
              <div className="tc-inner">
                <h4>{c.title}</h4>
                <div className="tc-pills">
                  {c.pills.map((p) => <span key={p} className="t-pill">{p}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
