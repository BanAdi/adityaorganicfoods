// assets/js/main.js

(function () {
  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  ready(() => {
    // ===== Footer year =====
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ===== Mobile menu toggle =====
    const btn = document.getElementById("menuBtn");
    const nav = document.getElementById("navLinks");

    if (btn && nav) {
      btn.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("open");
        btn.setAttribute("aria-expanded", String(isOpen));
      });

      nav.querySelectorAll("a").forEach((a) => {
        a.addEventListener("click", () => {
          nav.classList.remove("open");
          btn.setAttribute("aria-expanded", "false");
        });
      });

      document.addEventListener("click", (e) => {
        if (!nav.classList.contains("open")) return;
        const clickedInside = nav.contains(e.target) || btn.contains(e.target);
        if (!clickedInside) {
          nav.classList.remove("open");
          btn.setAttribute("aria-expanded", "false");
        }
      });
    }

    // ===== Scroll reveal =====
    const els = document.querySelectorAll(".reveal");

    // If IntersectionObserver not supported, just show everything
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("show"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("show");
        });
      },
      { threshold: 0.12 }
    );

    els.forEach((el) => io.observe(el));
  });
})();