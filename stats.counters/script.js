/* stats.counters — the numbers count up once when they come into view. */
(function () {
  window.CmsTagsComponents = window.CmsTagsComponents || {};
  window.CmsTagsComponents["stats.counters"] = {
    init: function (root) {
      if (!root) return;
      const nums = Array.from(root.querySelectorAll("[data-cms-count]"));
      if (!nums.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
      const lang = document.documentElement.lang || "en";
      nums.forEach((el) => {
        const target = Number(String(el.getAttribute("data-cms-count")).replace(/[^\d.]/g, ""));
        if (!Number.isFinite(target) || target <= 0) return;
        const fmt = new Intl.NumberFormat(lang);
        const io = new IntersectionObserver((entries) => {
          if (!entries.some((e) => e.isIntersecting)) return;
          io.disconnect();
          const start = performance.now();
          const step = (now) => {
            const t = Math.min(1, (now - start) / 1400);
            el.textContent = fmt.format(Math.round(target * (1 - Math.pow(1 - t, 3))));
            if (t < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }, { threshold: 0.4 });
        io.observe(el);
      });
    },
  };
})();
