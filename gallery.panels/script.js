/* gallery.panels — browser behaviour. The website shell calls init(root) after the section is inserted. */
(function () {
  window.CmsTagsComponents = window.CmsTagsComponents || {};
  window.CmsTagsComponents["gallery.panels"] = {
    init: function (root) {
      if (!root) return;
      const viewport = root.querySelector("[data-cms-viewport]");
      const track = root.querySelector("[data-cms-track]");
      const slides = Array.from(root.querySelectorAll("[data-cms-slide]"));
      const nav = root.querySelector("[data-cms-nav]");
      const prev = root.querySelector("[data-cms-prev]");
      const next = root.querySelector("[data-cms-next]");
      const sceneImgs = Array.from(root.querySelectorAll("[data-cms-scene] img"));
      if (!viewport || !track || !slides.length) return;

      let index = 0;
      let offset = 0;
      let dragging = false;
      let startX = 0;
      let startOffset = 0;
      let moved = false;

      function perView() {
        const w = viewport.clientWidth || 1;
        const sw = slides[0].offsetWidth || w;
        return Math.max(1, Math.round(w / sw));
      }

      function maxIndex() {
        return Math.max(0, slides.length - perView());
      }

      function slideX(i) {
        const slide = slides[i];
        return slide ? slide.offsetLeft - slides[0].offsetLeft : 0;
      }

      function maxX() {
        return slideX(maxIndex());
      }

      function apply(x, animate) {
        const max = maxX();
        offset = Math.max(0, Math.min(max, x));
        track.style.transition = animate ? "transform 0.45s ease" : "none";
        track.style.transform = "translateX(" + -offset + "px)";
        if (prev) prev.disabled = max === 0;
        if (next) next.disabled = max === 0;
        if (nav) nav.hidden = max === 0;
      }

      function go(to, animate) {
        const max = maxIndex();
        index = ((to % (max + 1)) + (max + 1)) % (max + 1);
        apply(slideX(index), animate !== false);
        if (!root.classList.contains("is-hovering")) sceneFromIndex();
      }

      function snap() {
        let best = 0;
        let bestDist = Infinity;
        const last = maxIndex();
        for (let i = 0; i <= last; i += 1) {
          const dist = Math.abs(slideX(i) - offset);
          if (dist < bestDist) {
            bestDist = dist;
            best = i;
          }
        }
        go(best, true);
      }

      function photoSrc(slide) {
        const img = slide && slide.querySelector(".cms-gal-panels__photo");
        return img ? img.currentSrc || img.src : "";
      }

      let sceneActive = 0;
      function setScene(src) {
        if (!src || sceneImgs.length < 2) return;
        if ((sceneImgs[sceneActive].currentSrc || sceneImgs[sceneActive].src) === src) return;
        const next = 1 - sceneActive;
        sceneImgs[next].src = src;
        sceneImgs[next].classList.add("is-active");
        sceneImgs[sceneActive].classList.remove("is-active");
        sceneActive = next;
      }

      function sceneFromIndex() {
        setScene(photoSrc(slides[index]));
      }

      function closeAll() {
        slides.forEach((slide) => slide.classList.remove("is-open"));
      }

      const canHover = window.matchMedia("(hover: hover)").matches;
      slides.forEach((slide) => {
        slide.addEventListener("mouseenter", () => {
          if (!canHover) return;
          root.classList.add("is-hovering");
          setScene(photoSrc(slide));
        });
        if (!canHover && slide.hasAttribute("data-cms-copy")) {
          slide.addEventListener("click", () => {
            if (moved) return;
            const open = slide.classList.contains("is-open");
            closeAll();
            if (!open) {
              slide.classList.add("is-open");
              setScene(photoSrc(slide));
            } else {
              sceneFromIndex();
            }
          });
        }
      });
      root.addEventListener("mouseleave", () => {
        root.classList.remove("is-hovering");
        sceneFromIndex();
      });

      viewport.addEventListener("pointerdown", (event) => {
        if (event.pointerType === "mouse" && event.button !== 0) return;
        if (event.target.closest(".cms-gal-panels__arrow")) return;
        dragging = true;
        moved = false;
        startX = event.clientX;
        startOffset = offset;
        viewport.classList.add("is-dragging");
        try {
          viewport.setPointerCapture(event.pointerId);
        } catch (err) {}
      });
      viewport.addEventListener("pointermove", (event) => {
        if (!dragging) return;
        const dx = event.clientX - startX;
        if (Math.abs(dx) > 6) moved = true;
        apply(startOffset - dx, false);
      });
      function endDrag() {
        if (!dragging) return;
        dragging = false;
        viewport.classList.remove("is-dragging");
        snap();
      }
      viewport.addEventListener("pointerup", endDrag);
      viewport.addEventListener("pointercancel", endDrag);

      if (prev) prev.addEventListener("click", () => go(index - 1));
      if (next) next.addEventListener("click", () => go(index + 1));
      window.addEventListener("resize", () => go(index));
      root.classList.add("is-ready");
      go(0, false);
      sceneFromIndex();
    },
  };
})();
