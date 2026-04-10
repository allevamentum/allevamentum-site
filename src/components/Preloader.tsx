"use client";
import { useEffect, useState } from "react";

export default function Preloader() {
  const [out, setOut] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setOut(true), 3200);
    const hideTimer = setTimeout(() => setHidden(true), 4400);
    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      className={`loader${out ? " out" : ""}`}
      role="status"
      aria-label="Loading"
    >
      <div className="loader-inner">
        <svg
          className="loader-mark"
          viewBox="0 0 100 100"
          width="72"
          height="72"
        >
          <defs>
            <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4F7DF7" />
              <stop offset="100%" stopColor="#8B6CF7" />
            </linearGradient>
          </defs>
          <polygon className="loader-tri t1" points="50,8 92,92 8,92" />
          <polygon className="loader-tri t2" points="50,28 78,82 22,82" />
          <polygon className="loader-tri t3" points="50,44 66,74 34,74" />
        </svg>
        <div className="loader-name">ALLEVAMENTUM</div>
        <div className="loader-tagline">Instrument of Elevation</div>
        <div className="loader-line">
          <span className="loader-fill" />
        </div>
      </div>
    </div>
  );
}
