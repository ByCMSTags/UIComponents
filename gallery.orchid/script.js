/* gallery.orchid — browser behaviour. The website shell calls init(root) after the section is inserted. */
(function () {
  var orSlider = function (track, prev, next, step, root) {
    if (!track || track._orSlider) return;
    track._orSlider = true;
    var timer = null;
    var dir = function () { return getComputedStyle(track).direction === 'rtl' ? -1 : 1; };
    var by = function (n) { track.scrollBy({ left: n * step * dir(), behavior: 'smooth' }); };
    var auto = function () {
      var max = track.scrollWidth - track.clientWidth;
      if (max <= 0) return;
      if (Math.abs(track.scrollLeft) >= max - 2) track.scrollTo({ left: 0, behavior: 'smooth' });
      else by(1);
    };
    var stop = function () { if (timer) { clearInterval(timer); timer = null; } };
    var start = function () {
      stop();
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      timer = setInterval(function () { if (!document.contains(track)) return stop(); if (!track.hidden && track.offsetParent) auto(); }, 3500);
    };
    if (prev) prev.addEventListener('click', function () { by(-1); start(); });
    if (next) next.addEventListener('click', function () { by(1); start(); });
    (root || track).addEventListener('mouseenter', stop);
    (root || track).addEventListener('mouseleave', start);
    start();
    return { start: start, stop: stop };
  };

  window.CmsTagsComponents = window.CmsTagsComponents || {};
  window.CmsTagsComponents["gallery.orchid"] = {
    init: function (root) {
      var grid = root.querySelector('[data-or-grid]');
      if (!grid) return;
      var items = [].slice.call(grid.querySelectorAll('[data-or-item]'));
      var btns = [].slice.call(root.querySelectorAll('[data-view]'));
      var snav = root.querySelector('[data-or-snav]');
      var more = root.querySelector('[data-or-more]');
      var first = (root.getAttribute('data-or-view') || 'slider').trim().toLowerCase();
      var view = ['grid', 'masonry', 'slider'].indexOf(first) >= 0 ? first : 'slider';
      var all = false;
      var slider = orSlider(grid, root.querySelector('[data-or-prev]'), root.querySelector('[data-or-next]'), 300, null);
      // Grid and masonry show eight photos until View more; the slider shows them all.
      var draw = function () {
        grid.classList.toggle('is-slider', view === 'slider');
        grid.classList.toggle('is-masonry', view === 'masonry');
        btns.forEach(function (b) { b.classList.toggle('is-active', b.getAttribute('data-view') === view); });
        items.forEach(function (it, i) { it.hidden = view !== 'slider' && !all && i >= 8; });
        if (snav) snav.hidden = view !== 'slider';
        if (more) more.hidden = view === 'slider' || all || items.length <= 8;
        if (slider) { if (view === 'slider') slider.start(); else slider.stop(); }
      };
      btns.forEach(function (b) { b.addEventListener('click', function () { view = b.getAttribute('data-view'); if (view === 'slider') all = true; draw(); }); });
      if (more) more.addEventListener('click', function () { all = true; draw(); });
      draw();
      // Full-screen viewer.
      var box = root.querySelector('[data-or-box]');
      var big = root.querySelector('[data-or-big]');
      var bprev = root.querySelector('[data-or-bprev]');
      var bnext = root.querySelector('[data-or-bnext]');
      var at = 0;
      var show = function (i) {
        at = i;
        var img = items[i].querySelector('img');
        big.src = img.currentSrc || img.src;
        big.alt = img.alt || '';
        bprev.disabled = i === 0;
        bnext.disabled = i === items.length - 1;
      };
      var open = function (i) { show(i); box.hidden = false; document.body.style.overflow = 'hidden'; box.querySelector('[data-or-close]').focus(); };
      var close = function () { box.hidden = true; document.body.style.overflow = ''; if (items[at]) items[at].focus(); };
      items.forEach(function (it, i) { it.addEventListener('click', function () { open(i); }); });
      root.querySelector('[data-or-close]').addEventListener('click', close);
      bprev.addEventListener('click', function () { if (at > 0) show(at - 1); });
      bnext.addEventListener('click', function () { if (at < items.length - 1) show(at + 1); });
      box.addEventListener('click', function (e) { if (e.target === box) close(); });
      document.addEventListener('keydown', function (e) {
        if (box.hidden) return;
        var rtl = getComputedStyle(root).direction === 'rtl';
        if (e.key === 'Escape') close();
        if (e.key === (rtl ? 'ArrowRight' : 'ArrowLeft') && at > 0) show(at - 1);
        if (e.key === (rtl ? 'ArrowLeft' : 'ArrowRight') && at < items.length - 1) show(at + 1);
      });
    },
  };
})();
