/* contact.estate — browser behaviour. The website shell calls init(root) after the section is inserted. */
(function () {
  window.CmsTagsComponents = window.CmsTagsComponents || {};
  window.CmsTagsComponents["contact.estate"] = {
    init: function (root) {
      var slot = root.querySelector('[data-cms-form-slot]');
      if (!slot) return;
      if (!slot.querySelector('form')) {
        // The first form after this section on the page.
        var el = root.nextElementSibling;
        var form = null;
        while (el && !form) {
          form = el.matches('[data-cmstags-form]') ? el : el.querySelector('[data-cmstags-form]');
          if (!form) el = el.nextElementSibling;
        }
        if (!form) return;
        slot.appendChild(form);
        if (el && el !== form) el.hidden = true;
      }
      var text = slot.getAttribute('data-submit-text');
      var button = slot.querySelector('[type="submit"]');
      if (text && button) button.textContent = text;
    },
  };
})();
