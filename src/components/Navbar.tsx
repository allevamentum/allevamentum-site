"use client";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let lastScroll = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 80);
      setHidden(y > 300 && y > lastScroll);
      lastScroll = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setMenuOpen(false);
    document.body.style.overflow = "";
    const target = document.querySelector(href);
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => {
      document.body.style.overflow = !prev ? "hidden" : "";
      return !prev;
    });
  };

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#process", label: "Process" },
    { href: "#tech", label: "Technology" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <>
      <nav
        className={`nav${scrolled ? " scrolled" : ""}${hidden ? " nav-hidden" : ""}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="nav-inner">
          <a href="#" className="nav-logo" aria-label="ALLEVAMENTUM Home" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
            <svg viewBox="0 0 100 100" width="32" height="32">
              <defs><linearGradient id="navGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#4F7DF7" /><stop offset="100%" stopColor="#8B6CF7" /></linearGradient></defs>
              <polygon points="50,8 92,92 8,92" fill="none" stroke="url(#navGrad)" strokeWidth="3" />
              <polygon points="50,28 78,82 22,82" fill="none" stroke="url(#navGrad)" strokeWidth="3" />
              <polygon points="50,44 66,74 34,74" fill="url(#navGrad)" />
            </svg>
          </a>
          <div className="nav-center">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="nav-link" onClick={(e) => { e.preventDefault(); handleLinkClick(l.href); }}>
                {l.label}
              </a>
            ))}
          </div>
          <div className="nav-social">
            <a href="https://www.instagram.com/allevamentum/" target="_blank" rel="noopener noreferrer" className="nav-social-icon" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" /></svg>
            </a>
            <a href="https://www.facebook.com/allevamentum" target="_blank" rel="noopener noreferrer" className="nav-social-icon" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
            </a>
          </div>
          <a href="#contact" className="nav-cta" data-magnetic onClick={(e) => { e.preventDefault(); handleLinkClick("#contact"); }}>
            <span className="nav-cta-dot" />
            Get in Touch
          </a>
          <button className={`burger${menuOpen ? " on" : ""}`} onClick={toggleMenu} aria-label="Toggle menu" aria-expanded={menuOpen}>
            <span className="burger-line" />
            <span className="burger-line" />
          </button>
        </div>
      </nav>

      <div className={`mob-nav${menuOpen ? " on" : ""}`} role="dialog" aria-label="Mobile navigation">
        <div className="mob-nav-inner">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="mob-link" onClick={(e) => { e.preventDefault(); handleLinkClick(l.href); }}>
              {l.label}
            </a>
          ))}
          <div className="mob-info"><span>hello@allevamentum.com</span></div>
        </div>
      </div>
    </>
  );
}
