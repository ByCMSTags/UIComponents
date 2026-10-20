/* header.basic — browser behaviour. The website shell calls init(root) after the section is inserted. */
(function () {
  window.CmsTagsComponents = window.CmsTagsComponents || {};
  window.CmsTagsComponents["header.basic"] = {
    init: function (root) {
      var form = root.querySelector('form[role="search"]');
      if (form) {
        form.addEventListener("submit", function (event) {
          event.preventDefault();
        });
      }
    },
  };
})();
