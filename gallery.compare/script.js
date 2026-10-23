/* gallery.compare — drag (or use the arrow keys on) the handle to compare two photos. */
(function () {
  window.CmsTagsComponents = window.CmsTagsComponents || {};
  window.CmsTagsComponents["gallery.compare"] = {
    init: function (root) {
      if (!root) return;
      const stage = root.querySelector("[data-cms-compare]");
      const range = root.querySelector("[data-cms-range]");
      if (!stage || !range) return;
      const rtl = getComputedStyle(stage).direction === "rtl";
      function paint() {
        const v = Number(range.value);
        stage.style.setProperty("--cms-compare-pos", (rtl ? 100 - v : v) + "%");
      }
      range.addEventListener("input", paint);
      paint();
    },
  };
})();
