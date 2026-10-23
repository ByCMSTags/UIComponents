/* hero.slides — background photos that change by themselves (fade with a slow zoom); dots pick one. */
(function () {
  window.CmsTagsComponents = window.CmsTagsComponents || {};
  window.CmsTagsComponents["hero.slides"] = {
    init: function (root) {
      if (!root) return;
      const slides = Array.from(root.querySelectorAll("[data-cms-slide]"));
      const dots = Array.from(root.querySelectorAll("[data-cms-dot]"));
      if (slides.length < 2) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const delay = 6000;
      let index = 0;
      let timer = null;

      function show(i) {
        index = (i + slides.length) % slides.length;
        slides.forEach((s, k) => s.classList.toggle("is-active", k === index));
        dots.forEach((d, k) => {
          d.classList.toggle("is-active", k === index);
          if (k === index) d.setAttribute("aria-current", "true");
          else d.removeAttribute("aria-current");
        });
      }
      function start() {
        if (reduce) return;
        stop();
        timer = setInterval(() => show(index + 1), delay);
      }
      function stop() {
        if (timer) clearInterval(timer);
        timer = null;
      }

      dots.forEach((d) =>
        d.addEventListener("click", () => {
          show(Number(d.getAttribute("data-cms-dot")) || 0);
          start();
        }),
      );
      root.addEventListener("mouseenter", stop);
      root.addEventListener("mouseleave", start);
      root.addEventListener("focusin", stop);
      root.addEventListener("focusout", start);
      document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));
      show(0);
      start();
    },
  };
})();
