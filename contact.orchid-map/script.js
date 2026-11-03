/* contact.orchid-map — browser behaviour. The website shell calls init(root) after the section is inserted. */
(function () {
  window.CmsTagsComponents = window.CmsTagsComponents || {};
  window.CmsTagsComponents["contact.orchid-map"] = {
    init: function (root) {
      var place = (root.getAttribute('data-or-place') || '').trim();
      if (!place) return;
      var zoom = parseInt(String(root.getAttribute('data-or-zoom') || '').replace(/[^\d]/g, ''), 10) || 17;
      var lang = (document.documentElement.lang || 'en').slice(0, 2);
      var q = encodeURIComponent(place);
      var frame = root.querySelector('[data-or-frame]');
      var link = root.querySelector('[data-or-link]');
      // The map frame is added here (section templates cannot hold frames).
      if (frame && !frame.querySelector('iframe')) {
        var f = document.createElement('iframe');
        f.src = 'https://www.google.com/maps?q=' + q + '&z=' + zoom + '&hl=' + lang + '&output=embed';
        f.title = frame.getAttribute('data-or-title') || place;
        f.loading = 'lazy';
        f.referrerPolicy = 'no-referrer-when-downgrade';
        f.allowFullscreen = true;
        frame.appendChild(f);
      }
      if (link) link.href = 'https://www.google.com/maps?q=' + q + '&z=' + zoom + '&hl=' + lang;
    },
  };
})();
