/* cta.split — browser behaviour. The website shell calls init(root) after the section is inserted. */
(function () {
  window.CmsTagsComponents = window.CmsTagsComponents || {};
  window.CmsTagsComponents["cta.split"] = {
    init: function (root) {
      if (!root) return;
      const form = root.querySelector("[data-cms-form]");
      if (!form || form.getAttribute("action")) return;
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        const status = form.querySelector("[data-cms-status]");
        if (status) {
          status.hidden = false;
          status.textContent = "You're on the list — welcome aboard.";
        }
        form.reset();
      });
    },
  };
})();
