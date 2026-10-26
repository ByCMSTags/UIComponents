/* gallery.stories — browser behaviour. The website shell calls init(root) after the section is inserted. */
(function () {
  window.CmsTagsComponents = window.CmsTagsComponents || {};
  window.CmsTagsComponents["gallery.stories"] = {
    init: function (root) {
      if (!root) return;
      const track = root.querySelector("[data-cms-track]");
      const prev = root.querySelector("[data-cms-prev]");
      const next = root.querySelector("[data-cms-next]");
      if (!track) return;

      function amount() {
        return Math.max(track.clientWidth * 0.75, 260);
      }

      function dir() {
        return getComputedStyle(track).direction === "rtl" ? -1 : 1;
      }

      if (prev) {
        prev.addEventListener("click", function () {
          track.scrollBy({ left: -dir() * amount(), behavior: "smooth" });
        });
      }
      if (next) {
        next.addEventListener("click", function () {
          track.scrollBy({ left: dir() * amount(), behavior: "smooth" });
        });
      }
    },
  };
})();
