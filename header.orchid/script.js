/* header.orchid — browser behaviour. The website shell calls init(root) after the section is inserted. */
(function () {
  window.CmsTagsComponents = window.CmsTagsComponents || {};
  window.CmsTagsComponents["header.orchid"] = {
    init: function (root) {
      var toggle = root.querySelector('.cms-or-header__toggle');
      var nav = root.querySelector('.cms-or-header__nav');
      if (!toggle || !nav) return;
      var set = function (open) {
        nav.classList.toggle('is-open', open);
        toggle.setAttribute('aria-expanded', String(open));
      };
      toggle.addEventListener('click', function () { set(!nav.classList.contains('is-open')); });
      nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { set(false); }); });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') set(false); });
    },
  };
})();
