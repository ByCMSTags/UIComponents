/* logos.orchid — browser behaviour. The website shell calls init(root) after the section is inserted. */
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
  window.CmsTagsComponents["logos.orchid"] = {
    init: function (root) {
      orSlider(root.querySelector('[data-or-track]'), root.querySelector('[data-or-prev]'), root.querySelector('[data-or-next]'), 220, root.querySelector('.cms-or-clients__slider'));
    },
  };
})();
