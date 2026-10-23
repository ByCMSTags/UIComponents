/* gallery.portfolio — category filters for the project grid. The website calls init(root). */
(function () {
  window.CmsTagsComponents = window.CmsTagsComponents || {};
  window.CmsTagsComponents["gallery.portfolio"] = {
    init: function (root) {
      if (!root) return;
      const bar = root.querySelector("[data-cms-filters]");
      const items = Array.from(root.querySelectorAll("[data-cms-item]"));
      const grid = root.querySelector("[data-cms-grid]");
      // Some projects take two columns so every row is full: as many as the last row needs (1st, 6th, …).
      function layout() {
        const shown = items.filter((el) => !el.hidden);
        const cols = grid ? getComputedStyle(grid).gridTemplateColumns.split(" ").filter(Boolean).length : 1;
        const need = cols > 1 ? (cols - (shown.length % cols)) % cols : 0;
        let left = need;
        shown.forEach((el, i) => {
          const wide = left > 0 && i % 5 === 0;
          if (wide) left -= 1;
          el.classList.toggle("is-wide", wide);
        });
        items.filter((el) => el.hidden).forEach((el) => el.classList.remove("is-wide"));
      }
      layout();
      window.addEventListener("resize", () => {
        clearTimeout(root._cmsFolioT);
        root._cmsFolioT = setTimeout(layout, 150);
      });
      if (!bar || items.length < 2) return;
      const keyOf = (el) => String(el.getAttribute("data-category") || "").trim();
      const counts = new Map();
      items.forEach((el) => {
        const key = keyOf(el);
        if (key) counts.set(key, (counts.get(key) || 0) + 1);
      });
      if (counts.size < 2) return;
      let current = "";
      const buttons = [];

      function show(value) {
        current = value;
        items.forEach((el) => {
          el.hidden = Boolean(value) && keyOf(el) !== value;
        });
        layout();
        buttons.forEach((btn) => {
          const on = btn.getAttribute("data-value") === value;
          btn.classList.toggle("is-active", on);
          btn.setAttribute("aria-pressed", on ? "true" : "false");
        });
      }

      function add(label, value, count) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "cms-folio__filter";
        btn.setAttribute("data-value", value);
        btn.append(document.createTextNode(label));
        const sup = document.createElement("sup");
        sup.textContent = String(count);
        btn.append(sup);
        btn.addEventListener("click", () => show(value));
        bar.append(btn);
        buttons.push(btn);
      }

      bar.replaceChildren();
      add(root.getAttribute("data-cms-all") || "All", "", items.length);
      counts.forEach((count, key) => add(key, key, count));
      bar.hidden = false;
      show(current);
    },
  };
})();
