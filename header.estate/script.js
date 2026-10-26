/* header.estate — browser behaviour. The website shell calls init(root) after the section is inserted. */
(function () {
  window.CmsTagsComponents = window.CmsTagsComponents || {};
  window.CmsTagsComponents["header.estate"] = {
    init: function (root) {
      var toggle = root.querySelector('.cms-hestate__toggle');
      var nav = root.querySelector('.cms-hestate__nav');
      document.body.style.overflow = '';
      if (toggle && nav) {
        var set = function (open) {
          nav.classList.toggle('is-open', open);
          toggle.classList.toggle('is-open', open);
          toggle.setAttribute('aria-expanded', String(open));
          document.body.style.overflow = open ? 'hidden' : '';
        };
        toggle.addEventListener('click', function () {
          set(!nav.classList.contains('is-open'));
        });
        nav.querySelectorAll('a').forEach(function (link) {
          link.addEventListener('click', function () {
            set(false);
          });
        });
      }
      // Thin line under the bar once the first section has scrolled away.
      var update = function () {
        var header = document.querySelector('[data-cms-header]');
        var first = document.querySelector('main section');
        if (!header || !first) return;
        header.classList.toggle('is-solid', window.scrollY > first.offsetTop + first.offsetHeight - 100);
      };
      if (!window.__cmsEstateHeaderScroll) {
        window.__cmsEstateHeaderScroll = true;
        window.addEventListener('scroll', update, { passive: true });
      }
      update();
    },
  };
})();
