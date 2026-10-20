/* stats.bars — browser behaviour. The website shell calls init(root) after the section is inserted. */
(function () {
  window.CmsTagsComponents = window.CmsTagsComponents || {};
  window.CmsTagsComponents["stats.bars"] = {
    init: function (root) {
      if (!root) return;
      root.querySelectorAll("[data-cms-bar]").forEach((item) => {
        const raw = String(item.getAttribute("data-cms-bar") || "")
          .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))
          .replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
        const n = parseFloat(raw.replace(/[^\d.-]/g, ""));
        const p = Number.isFinite(n) ? Math.max(0, Math.min(100, n)) : 0;
        item.style.setProperty("--cms-bar", String(p));
        const track = item.querySelector(".cms-stat-bars__track");
        if (track) track.setAttribute("aria-valuenow", String(Math.round(p)));
      });
    },
  };
})();
