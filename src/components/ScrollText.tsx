"use client";
import { useEffect, useRef } from "react";

export default function ScrollText() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const textEl = el.querySelector(".scroll-text") as HTMLElement;
    if (!textEl) return;

    const html = textEl.innerHTML;
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    let wordIndex = 0;

    function wrapWords(node: Node): Node | DocumentFragment {
      if (node.nodeType === Node.TEXT_NODE) {
        const words = (node.textContent || "").split(/(\s+)/);
        const fragment = document.createDocumentFragment();
        words.forEach((word) => {
          if (word.trim()) {
            const span = document.createElement("span");
            span.className = "st-word";
            span.textContent = word;
            span.dataset.wordIdx = String(wordIndex++);
            fragment.appendChild(span);
          } else if (word) {
            fragment.appendChild(document.createTextNode(word));
          }
        });
        return fragment;
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const elem = node as Element;
        if (elem.tagName === "EM") {
          const fragment = document.createDocumentFragment();
          Array.from(elem.childNodes).forEach((child) => {
            if (child.nodeType === Node.TEXT_NODE) {
              const words = (child.textContent || "").split(/(\s+)/);
              words.forEach((word) => {
                if (word.trim()) {
                  const span = document.createElement("span");
                  span.className = "st-word st-em";
                  span.textContent = word;
                  span.dataset.wordIdx = String(wordIndex++);
                  fragment.appendChild(span);
                } else if (word) {
                  fragment.appendChild(document.createTextNode(word));
                }
              });
            } else {
              fragment.appendChild(wrapWords(child));
            }
          });
          return fragment;
        }
        const clone = elem.cloneNode(false);
        Array.from(elem.childNodes).forEach((child) => {
          clone.appendChild(wrapWords(child));
        });
        return clone;
      }
      return node.cloneNode(true);
    }

    const fragment = document.createDocumentFragment();
    Array.from(tempDiv.childNodes).forEach((child) => {
      fragment.appendChild(wrapWords(child));
    });
    textEl.innerHTML = "";
    textEl.appendChild(fragment);

    const words = textEl.querySelectorAll(".st-word");
    const totalWords = words.length;
    let rafId: number;

    function update() {
      const rect = textEl.getBoundingClientRect();
      const winH = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (winH * 0.7 - rect.top) / (winH * 0.5)));
      const litCount = Math.floor(progress * totalWords);
      words.forEach((w, i) => {
        w.classList.toggle("lit", i < litCount);
      });
      rafId = requestAnimationFrame(update);
    }
    update();

    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className="scroll-text-section" id="scrollText" ref={containerRef}>
      <div className="container">
        <p className="scroll-text">
          We don&apos;t just build software — we engineer <em>platforms</em> that
          become the backbone of entire industries. From enterprise AI to
          global-scale <em>cloud infrastructure</em>, we create technology
          that turns ambitious visions into <em>market-defining products</em>.
        </p>
      </div>
    </div>
  );
}
