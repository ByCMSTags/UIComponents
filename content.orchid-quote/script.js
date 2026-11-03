/* content.orchid-quote — browser behaviour. The website shell calls init(root) after the section is inserted. */
(function () {
  window.CmsTagsComponents = window.CmsTagsComponents || {};
  window.CmsTagsComponents["content.orchid-quote"] = {
    init: function (root) {
      if (!('IntersectionObserver' in window)) { root.classList.add('is-visible'); return; }
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { root.classList.add('is-visible'); io.disconnect(); } });
      }, { rootMargin: '0px 0px -80px 0px', threshold: 0.1 });
      io.observe(root);
    },
  };
})();
