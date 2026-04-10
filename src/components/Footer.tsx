export default function Footer() {
  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#process", label: "Process" },
    { href: "#tech", label: "Technology" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="ft-top">
          <div className="ft-brand">
            <svg width="36" height="36" viewBox="0 0 100 100" aria-hidden="true">
              <defs>
                <linearGradient id="ftGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#4F7DF7" />
                  <stop offset="100%" stopColor="#8B6CF7" />
                </linearGradient>
              </defs>
              <polygon points="50,8 92,92 8,92" fill="none" stroke="url(#ftGrad)" strokeWidth="2" />
              <polygon points="50,28 78,82 22,82" fill="none" stroke="url(#ftGrad)" strokeWidth="2" />
              <polygon points="50,44 66,74 34,74" fill="url(#ftGrad)" />
            </svg>
            <div>
              <span className="ft-name">ALLEVAMENTUM</span>
              <span className="ft-tag">Application Studio</span>
            </div>
          </div>
          <div className="ft-cols">
            <div className="ft-col">
              <h4>Navigate</h4>
              {navLinks.map((l) => (
                <a key={l.href} href={l.href}>{l.label}</a>
              ))}
            </div>
            <div className="ft-col">
              <h4>Connect</h4>
              <div className="ft-social">
                <a href="https://www.instagram.com/allevamentum/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="5" />
                    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                  </svg>
                  <span>Instagram</span>
                </a>
                <a href="https://www.facebook.com/allevamentum" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="ft-bottom">
          <span>&copy; 2026 Allevamentum. All rights reserved.</span>
          <span className="ft-latin">Instrumentum Elevationis</span>
        </div>
      </div>
    </footer>
  );
}
