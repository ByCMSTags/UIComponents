/* gallery.panels — browser behaviour. The website shell calls init(root) after the section is inserted. */
(function () {
  window.CmsTagsComponents = window.CmsTagsComponents || {};
  window.CmsTagsComponents["gallery.panels"] = {
    init: function (root) {
      if (!root) return;
      const viewport = root.querySelector("[data-cms-viewport]");
      const track = root.querySelector("[data-cms-track]");
      const slides = Array.from(root.querySelectorAll("[data-cms-slide]"));
      const nav = root.querySelector("[data-cms-nav]");
      const prev = root.querySelector("[data-cms-prev]");
      const next = root.querySelector("[data-cms-next]");
      if (!viewport || !track || !slides.length) return;

      let index = 0;

      function perView() {
        const w = viewport.clientWidth || 1;
        const sw = slides[0].offsetWidth || w;
        return Math.max(1, Math.round(w / sw));
      }

      function maxIndex() {
        return Math.max(0, slides.length - perView());
      }

      function go(to) {
        const max = maxIndex();
        index = ((to % (max + 1)) + (max + 1)) % (max + 1);
        const x = slides[index] ? slides[index].offsetLeft - slides[0].offsetLeft : 0;
        track.style.transform = "translateX(" + -x + "px)";
        if (prev) prev.disabled = max === 0;
        if (next) next.disabled = max === 0;
        if (nav) nav.hidden = max === 0;
      }

      function closeAll() {
        slides.forEach((slide) => {
          slide.classList.remove("is-open");
          const btn = slide.querySelector("[data-cms-toggle]");
          if (btn) btn.setAttribute("aria-expanded", "false");
        });
      }

      slides.forEach((slide) => {
        const btn = slide.querySelector("[data-cms-toggle]");
        if (!btn) return;
        btn.addEventListener("click", () => {
          const open = slide.classList.contains("is-open");
          closeAll();
          if (!open) {
            slide.classList.add("is-open");
            btn.setAttribute("aria-expanded", "true");
          }
        });
      });

      if (prev) prev.addEventListener("click", () => go(index - 1));
      if (next) next.addEventListener("click", () => go(index + 1));
      window.addEventListener("resize", () => go(index));
      root.classList.add("is-ready");
      go(0);
    },
  };
})();
