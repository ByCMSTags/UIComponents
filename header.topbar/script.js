/* header.topbar — browser behaviour. The website shell calls init(root) after the section is inserted. */
(function () {
  window.CmsTagsComponents = window.CmsTagsComponents || {};
  window.CmsTagsComponents["header.topbar"] = {
    init: function (root) {
      if (!root) return;
      const toggle = root.querySelector("[data-cms-nav-toggle]");
      const panel = root.querySelector("[data-cms-nav-panel]");
      if (!toggle || !panel) return;

      function close() {
        root.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }

      toggle.addEventListener("click", function () {
        const open = root.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(open));
      });

      panel.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", close);
      });

      window.addEventListener("resize", function () {
        if (window.matchMedia("(min-width: 992px)").matches) close();
      });
    },
  };
})();
