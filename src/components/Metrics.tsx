const metrics = [
  { count: 99, suffix: ".9%", label: "System Uptime" },
  { count: 50, suffix: "ms", label: "Avg. Response Time" },
  { count: 10, suffix: "M+", label: "API Calls / Day" },
  { count: 24, suffix: "/7", label: "Monitoring & Support" },
];

export default function Metrics() {
  return (
    <div className="metrics-banner">
      <div className="container">
        <div className="mb-grid">
          {metrics.map((m) => (
            <div key={m.label} className="mb-item" data-anim="scale">
              <span className="mb-n" data-count={m.count}>0</span>
              <span className="mb-s">{m.suffix}</span>
              <span className="mb-l">{m.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
