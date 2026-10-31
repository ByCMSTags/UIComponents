/* header.agency — browser behaviour. The website shell calls init(root) after the section is inserted. */
(function () {
  window.CmsTagsComponents = window.CmsTagsComponents || {};
  window.CmsTagsComponents["header.agency"] = {
    init: function (root) {
      var toggle = root.querySelector('.cms-ag-header__toggle');
      var nav = root.querySelector('.cms-ag-header__nav');
      document.body.style.overflow = '';
      var set = function (open) {
        nav.classList.toggle('is-open', open);
        toggle.classList.toggle('is-open', open);
        toggle.setAttribute('aria-expanded', String(open));
        document.body.style.overflow = open ? 'hidden' : '';
      };
      if (toggle && nav) {
        toggle.addEventListener('click', function () {
          set(!nav.classList.contains('is-open'));
        });
        nav.querySelectorAll('a').forEach(function (a) {
          a.addEventListener('click', function () {
            set(false);
          });
        });
        document.addEventListener('keydown', function (e) {
          if (e.key === 'Escape' && nav.classList.contains('is-open')) set(false);
        });
      }
      var update = function () {
        var header = document.querySelector('[data-cms-ag-header]');
        if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);
      };
      if (!window.__cmsAgHeaderScroll) {
        window.__cmsAgHeaderScroll = true;
        window.addEventListener('scroll', update, { passive: true });
      }
      update();
    },
  };
})();
