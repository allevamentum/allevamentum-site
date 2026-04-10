import HeroCanvas from "./HeroCanvas";

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <HeroCanvas />
      <div className="hero-depth-1" aria-hidden="true" />
      <div className="hero-depth-2" aria-hidden="true" />
      <div className="hero-fade" aria-hidden="true" />

      <div className="hero-content container">
        <div className="hero-badge" data-anim="blur" data-delay="0">
          <span className="badge-dot" />
          Application Studio
        </div>

        <h1 className="hero-h1">
          <span className="h1-line" data-anim="clip" data-delay="1">
            <span className="h1-word">We create apps</span>
          </span>
          <span className="h1-line" data-anim="clip" data-delay="2">
            <span className="h1-word">that change how</span>
          </span>
          <span className="h1-line" data-anim="clip" data-delay="3">
            <span className="h1-word h1-accent">industries work.</span>
          </span>
        </h1>

        <div className="hero-foot" data-anim="fade" data-delay="4">
          <p className="hero-desc">
            We design and engineer cutting-edge applications and digital
            solutions — from intelligent platforms to native experiences that
            define what&apos;s next.
          </p>
          <div className="hero-stats">
            <div className="h-stat">
              <span className="h-stat-n" data-count="50">0</span>
              <span className="h-stat-s">+</span>
              <span className="h-stat-l">Apps Launched</span>
            </div>
            <div className="h-stat">
              <span className="h-stat-n" data-count="2">0</span>
              <span className="h-stat-s">M+</span>
              <span className="h-stat-l">End Users Reached</span>
            </div>
            <div className="h-stat">
              <span className="h-stat-n" data-count="3">0</span>
              <span className="h-stat-s">x</span>
              <span className="h-stat-l">Faster Time-to-Market</span>
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-hint" data-anim="fade" data-delay="5">
        <div className="scroll-line" />
        <span>Explore</span>
      </div>
    </section>
  );
}
