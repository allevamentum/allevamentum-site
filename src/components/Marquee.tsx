const items = [
  "Native Apps", "AI Solutions", "Cloud Platforms",
  "Product Engineering", "IoT Systems", "Digital Transformation",
];

export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        <div className="marquee-inner">
          {[...items, ...items].map((item, i) => (
            <span key={i}>
              {i > 0 && <span className="mq-tri">&#9650;</span>}
              <span>{item}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
