/* list.projects — category filters for the project cards. The website calls init(root). */
(function () {
  window.CmsTagsComponents = window.CmsTagsComponents || {};
  window.CmsTagsComponents["list.projects"] = {
    init: function (root) {
      if (!root) return;
      const bar = root.querySelector("[data-cms-filters]");
      const items = Array.from(root.querySelectorAll("[data-cms-item]"));
      if (!bar || items.length < 2) return;
      const keyOf = (el) => String(el.getAttribute("data-category") || "").trim();
      const counts = new Map();
      items.forEach((el) => {
        const key = keyOf(el);
        if (key) counts.set(key, (counts.get(key) || 0) + 1);
      });
      if (counts.size < 2) return;
      const buttons = [];
      function show(value) {
        items.forEach((el) => {
          el.hidden = Boolean(value) && keyOf(el) !== value;
        });
        buttons.forEach((btn) => btn.setAttribute("aria-pressed", btn.getAttribute("data-value") === value ? "true" : "false"));
      }
      function add(label, value, count) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "cms-plist__filter";
        btn.setAttribute("data-value", value);
        btn.append(document.createTextNode(label + " "));
        const n = document.createElement("span");
        n.className = "cms-plist__count";
        n.textContent = "(" + count + ")";
        btn.append(n);
        btn.addEventListener("click", () => show(value));
        bar.append(btn);
        buttons.push(btn);
      }
      bar.replaceChildren();
      add(root.getAttribute("data-cms-all") || "All", "", items.length);
      counts.forEach((count, key) => add(key, key, count));
      bar.hidden = false;
      show("");
    },
  };
})();
