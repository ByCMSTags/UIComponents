/* header.basic — browser behaviour. The website shell calls init(root) after the section is inserted. */
(function () {
  window.CmsTagsComponents = window.CmsTagsComponents || {};
  window.CmsTagsComponents["header.basic"] = {
    init: function (root) {
      if (!root) return;
      function sync() {
        root.classList.toggle("is-scrolled", window.scrollY > 6);
      }
      if (root._cmsScroll) window.removeEventListener("scroll", root._cmsScroll);
      root._cmsScroll = sync;
      window.addEventListener("scroll", sync, { passive: true });
      sync();
    },
  };
})();
