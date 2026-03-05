// Shared UI behavior for all pages.
(function () {
  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  ready(() => {
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

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

    const revealEls = document.querySelectorAll(".reveal");
    if (revealEls.length) {
      if (!("IntersectionObserver" in window)) {
        revealEls.forEach((el) => el.classList.add("show"));
      } else {
        const io = new IntersectionObserver(
          (entries) => {
            entries.forEach((e) => {
              if (e.isIntersecting) e.target.classList.add("show");
            });
          },
          { threshold: 0.12 }
        );
        revealEls.forEach((el) => io.observe(el));
      }
    }

    const lb = document.getElementById("lightbox");
    if (lb) {
      const lbImg = document.getElementById("lightboxImg");
      const lbCap = document.getElementById("lightboxCaption");
      const lbClose = document.getElementById("lightboxClose");

      function openLightbox(src, caption) {
        if (!lbImg || !lbCap) return;
        lbImg.src = src;
        lbCap.textContent = caption || "Image";
        lb.classList.add("open");
        lb.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
      }

      function closeLightbox() {
        if (!lbImg) return;
        lb.classList.remove("open");
        lb.setAttribute("aria-hidden", "true");
        lbImg.src = "";
        document.body.style.overflow = "";
      }

      const lbTargets = document.querySelectorAll('img[data-lightbox="true"]');
      lbTargets.forEach((img) => {
        img.style.cursor = "zoom-in";
        img.addEventListener("click", () => openLightbox(img.src, img.alt));
      });

      if (lbClose) lbClose.addEventListener("click", closeLightbox);

      lb.addEventListener("click", (e) => {
        if (e.target === lb) closeLightbox();
      });

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && lb.classList.contains("open")) closeLightbox();
      });
    }
  });
})();
