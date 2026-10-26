/* testimonials.quotes — browser behaviour. The website shell calls init(root) after the section is inserted. */
(function () {
  window.CmsTagsComponents = window.CmsTagsComponents || {};
  window.CmsTagsComponents["testimonials.quotes"] = {
    init: function (root) {
      if (!root) return;
      const stage = root.querySelector("[data-cms-stage]");
      const items = Array.prototype.slice.call(root.querySelectorAll("[data-cms-item]"));
      const prev = root.querySelector("[data-cms-prev]");
      const next = root.querySelector("[data-cms-next]");
      if (!stage || items.length < 2) return;

      let index = Math.max(0, items.findIndex(function (el) { return el.classList.contains("is-active"); }));
      let busy = false;

      function dir() {
        return getComputedStyle(root).direction === "rtl" ? -1 : 1;
      }

      function syncHeight(el) {
        stage.style.minHeight = el.offsetHeight + "px";
      }

      function show(nextIndex, slide) {
        if (busy) return;
        const toIndex = (nextIndex + items.length) % items.length;
        if (toIndex === index) return;

        busy = true;
        const from = items[index];
        const to = items[toIndex];

        from.classList.remove("is-active");
        from.classList.add(slide > 0 ? "is-out-left" : "is-out-right");

        to.classList.remove("is-out-left", "is-out-right", "is-in-left", "is-in-right");
        to.classList.add(slide > 0 ? "is-in-right" : "is-in-left");
        void to.offsetWidth;
        to.classList.remove("is-in-right", "is-in-left");
        to.classList.add("is-active");
        syncHeight(to);

        window.setTimeout(function () {
          from.classList.remove("is-out-left", "is-out-right");
          busy = false;
        }, 500);

        index = toIndex;
      }

      syncHeight(items[index]);
      if (prev) {
        prev.addEventListener("click", function () {
          show(index - 1, -dir());
        });
      }
      if (next) {
        next.addEventListener("click", function () {
          show(index + 1, dir());
        });
      }
    },
  };
})();
