/* gallery.cases — browser behaviour. The website shell calls init(root) after the section is inserted. */
(function () {
  window.CmsTagsComponents = window.CmsTagsComponents || {};
  window.CmsTagsComponents["gallery.cases"] = {
    init: function (root) {
      if (!root) return;
      const track = root.querySelector("[data-cms-track]");
      const slides = Array.from(root.querySelectorAll("[data-cms-slide]"));
      const filtersEl = root.querySelector("[data-cms-filters]");
      const nav = root.querySelector("[data-cms-nav]");
      const prev = root.querySelector("[data-cms-prev]");
      const next = root.querySelector("[data-cms-next]");
      if (!track || !slides.length) return;

      let index = 0;
      let category = "";
      const allLabel = root.getAttribute("data-cms-all") || "All Projects";

      function keyOf(slide) {
        return String(slide.getAttribute("data-category") || "").trim();
      }

      function visible() {
        return slides.filter((slide) => !slide.hidden);
      }

      function counts() {
        const map = new Map();
        slides.forEach((slide) => {
          const key = keyOf(slide);
          if (!key) return;
          map.set(key, (map.get(key) || 0) + 1);
        });
        return map;
      }

      function paintFilters() {
        if (!filtersEl) return;
        const map = counts();
        filtersEl.replaceChildren();
        const keys = Array.from(map.keys());
        if (!keys.length) return;

        function add(label, value, count) {
          const btn = document.createElement("button");
          btn.type = "button";
          btn.className = "cms-cases__filter" + (value === category ? " is-active" : "");
          btn.setAttribute("data-cms-filter", value);
          btn.append(document.createTextNode(label));
          const sup = document.createElement("sup");
          sup.className = "cms-cases__count";
          sup.textContent = String(count);
          btn.append(sup);
          btn.addEventListener("click", () => {
            category = value;
            index = 0;
            apply();
            paintFilters();
          });
          filtersEl.append(btn);
        }

        add(allLabel, "", slides.length);
        keys.forEach((key) => add(key, key, map.get(key)));
        filtersEl.hidden = false;
      }

      function go(to) {
        const vis = visible();
        if (!vis.length) return;
        index = (to + vis.length) % vis.length;
        slides.forEach((slide) => {
          slide.style.flexBasis = vis.length < 2 ? "100%" : "";
        });
        const target = vis[index];
        track.style.transform = "none";
        const x = target.offsetLeft;
        track.style.transform = "translateX(" + -x + "px)";
        if (nav) nav.hidden = vis.length < 2;
      }

      function apply() {
        slides.forEach((slide) => {
          const key = keyOf(slide);
          slide.hidden = Boolean(category) && key.toLowerCase() !== category.toLowerCase();
        });
        go(index);
      }

      if (prev) prev.addEventListener("click", () => go(index - 1));
      if (next) next.addEventListener("click", () => go(index + 1));
      window.addEventListener("resize", () => go(index));

      root.classList.add("is-ready");
      paintFilters();
      apply();
    },
  };
})();
