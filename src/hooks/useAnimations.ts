"use client";
import { useEffect } from "react";

export function useAnimations() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-anim]");
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = parseFloat(el.dataset.delay || "0");
            const parent = el.parentElement;
            const sibs = parent
              ? parent.querySelectorAll(":scope > [data-anim]")
              : [];
            let idx = 0;
            sibs.forEach((s, i) => {
              if (s === el) idx = i;
            });
            const totalDelay = delay ? delay * 200 : idx * 120;
            setTimeout(() => el.classList.add("in"), totalDelay);
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -30px 0px" }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

export function useCounters() {
  useEffect(() => {
    const nums = document.querySelectorAll("[data-count]");
    if (!nums.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            countUp(e.target as HTMLElement);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    nums.forEach((el) => obs.observe(el));

    function countUp(el: HTMLElement) {
      const target = parseInt(el.dataset.count || "0");
      const dur = 2200;
      const start = performance.now();
      (function tick(now: number) {
        const p = Math.min((now - start) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 4);
        el.textContent = String(Math.round(target * ease));
        if (p < 1) requestAnimationFrame(tick);
      })(start);
    }

    return () => obs.disconnect();
  }, []);
}

export function useGlowCards() {
  useEffect(() => {
    if (window.innerWidth < 769) return;
    const handler = (e: MouseEvent) => {
      document.querySelectorAll("[data-glow]").forEach((card) => {
        const r = (card as HTMLElement).getBoundingClientRect();
        (card as HTMLElement).style.setProperty(
          "--glow-x",
          e.clientX - r.left + "px"
        );
        (card as HTMLElement).style.setProperty(
          "--glow-y",
          e.clientY - r.top + "px"
        );
      });
    };
    document.addEventListener("mousemove", handler);
    return () => document.removeEventListener("mousemove", handler);
  }, []);
}

export function useTilt() {
  useEffect(() => {
    if (window.innerWidth < 769) return;
    const cards = document.querySelectorAll("[data-tilt]");

    const handlers = new Map<Element, { move: (e: MouseEvent) => void; leave: () => void }>();

    cards.forEach((card) => {
      const el = card as HTMLElement;
      const move = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(900px) rotateX(${y * -5}deg) rotateY(${x * 5}deg) translateY(-10px) scale(1.015)`;
      };
      const leave = () => {
        el.style.transform =
          "perspective(900px) rotateX(0) rotateY(0) translateY(0) scale(1)";
      };
      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", leave);
      handlers.set(card, { move, leave });
    });

    return () => {
      handlers.forEach(({ move, leave }, card) => {
        (card as HTMLElement).removeEventListener("mousemove", move);
        (card as HTMLElement).removeEventListener("mouseleave", leave);
      });
    };
  }, []);
}

export function useDepthCards() {
  useEffect(() => {
    if (window.innerWidth < 769) return;
    const cards = document.querySelectorAll("[data-depth]");
    const handlers = new Map<Element, { move: (e: MouseEvent) => void; leave: (e: MouseEvent) => void }>();

    cards.forEach((card) => {
      const el = card as HTMLElement;
      const move = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        const inner = el.querySelector(
          ".adv-inner,.proc-inner,.tc-inner"
        ) as HTMLElement;
        if (inner) {
          inner.style.transform = `translate3d(${x * 8}px, ${y * 8}px, 20px)`;
          inner.style.transition = "transform 0.3s ease-out";
        }
      };
      const leave = (e: MouseEvent) => {
        const inner = (e.currentTarget as HTMLElement).querySelector(
          ".adv-inner,.proc-inner,.tc-inner"
        ) as HTMLElement;
        if (inner) inner.style.transform = "translate3d(0,0,0)";
      };
      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", leave);
      handlers.set(card, { move, leave });
    });

    return () => {
      handlers.forEach(({ move, leave }, card) => {
        (card as HTMLElement).removeEventListener("mousemove", move);
        (card as HTMLElement).removeEventListener("mouseleave", leave);
      });
    };
  }, []);
}

export function useMagnetic() {
  useEffect(() => {
    if (window.innerWidth < 769) return;
    const els = document.querySelectorAll("[data-magnetic]");
    const handlers = new Map<Element, { move: (e: MouseEvent) => void; leave: () => void }>();

    els.forEach((el) => {
      const htmlEl = el as HTMLElement;
      const move = (e: MouseEvent) => {
        const r = htmlEl.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        htmlEl.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      };
      const leave = () => {
        htmlEl.style.transform = "translate(0, 0)";
        htmlEl.style.transition =
          "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
        setTimeout(() => (htmlEl.style.transition = ""), 500);
      };
      htmlEl.addEventListener("mousemove", move);
      htmlEl.addEventListener("mouseleave", leave);
      handlers.set(el, { move, leave });
    });

    return () => {
      handlers.forEach(({ move, leave }, el) => {
        (el as HTMLElement).removeEventListener("mousemove", move);
        (el as HTMLElement).removeEventListener("mouseleave", leave);
      });
    };
  }, []);
}

export function useTextScramble() {
  useEffect(() => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";
    const links = document.querySelectorAll(".nav-link, .ft-col a");

    const handlers = new Map<Element, (e: Event) => void>();

    links.forEach((link) => {
      const original = link.textContent || "";
      let isScrambling = false;

      const handler = () => {
        if (isScrambling) return;
        isScrambling = true;
        let iteration = 0;
        const interval = setInterval(() => {
          link.textContent = original
            .split("")
            .map((char, i) => {
              if (i < iteration) return original[i];
              if (char === " ") return " ";
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("");
          iteration += 1 / 2;
          if (iteration >= original.length) {
            link.textContent = original;
            clearInterval(interval);
            isScrambling = false;
          }
        }, 30);
      };
      link.addEventListener("mouseenter", handler);
      handlers.set(link, handler);
    });

    return () => {
      handlers.forEach((handler, link) => {
        link.removeEventListener("mouseenter", handler);
      });
    };
  }, []);
}
