/* header.news — browser behaviour. The website shell calls init(root) after the section is inserted. */
(function () {
  window.CmsTagsComponents = window.CmsTagsComponents || {};
  window.CmsTagsComponents["header.news"] = {
    init: function (root) {
      if (!root || root.dataset.cmsHnewsReady === "1") return;
      root.dataset.cmsHnewsReady = "1";

      var html = document.documentElement;
      var ar = (html.lang || "").toLowerCase().indexOf("ar") === 0 || html.getAttribute("dir") === "rtl";
      var themeBtn = root.querySelector("[data-cms-theme]");
      var stored = null;
      try { stored = localStorage.getItem("cms-theme"); } catch (e) { stored = null; }
      if (!html.getAttribute("data-theme") && (stored === "dark" || stored === "light")) {
        html.setAttribute("data-theme", stored);
      }

      function themeIsDark() {
        return html.getAttribute("data-theme") === "dark";
      }

      function paintTheme() {
        var dark = themeIsDark();
        html.style.colorScheme = dark ? "dark" : "light";
        if (!themeBtn) return;
        themeBtn.setAttribute("aria-pressed", dark ? "true" : "false");
        themeBtn.setAttribute("aria-label", dark ? (ar ? "الوضع الفاتح" : "Light mode") : (ar ? "الوضع الداكن" : "Dark mode"));
      }

      paintTheme();
      if (themeBtn) {
        themeBtn.addEventListener("click", function () {
          html.setAttribute("data-theme", themeIsDark() ? "light" : "dark");
          try { localStorage.setItem("cms-theme", themeIsDark() ? "dark" : "light"); } catch (e) {}
          paintTheme();
        });
      }

      var dateEl = root.querySelector("[data-cms-date]");
      var timeEl = root.querySelector("[data-cms-time]");
      var locale = ar ? "ar-JO" : (html.lang || "en");

      function tick() {
        var now = new Date();
        var stamp = now.toISOString();
        if (dateEl) {
          dateEl.textContent = new Intl.DateTimeFormat(locale, {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
            numberingSystem: "latn",
          }).format(now);
          dateEl.setAttribute("datetime", stamp);
        }
        if (timeEl) {
          timeEl.textContent = new Intl.DateTimeFormat(locale, {
            hour: "2-digit",
            minute: "2-digit",
            hourCycle: "h23",
            numberingSystem: "latn",
          }).format(now);
          timeEl.setAttribute("datetime", stamp);
        }
      }

      tick();
      window.setInterval(tick, 30000);

      var navToggle = root.querySelector("[data-cms-nav-toggle]");
      var panel = root.querySelector("[data-cms-nav-panel]");
      var searchToggle = root.querySelector("[data-cms-search-toggle]");
      var search = root.querySelector("[data-cms-search]");

      function setMenu(open) {
        root.classList.toggle("is-open", open);
        if (navToggle) navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      }

      function setSearch(open) {
        if (!search) return;
        if (open) search.removeAttribute("hidden");
        else search.setAttribute("hidden", "");
        if (searchToggle) searchToggle.setAttribute("aria-expanded", open ? "true" : "false");
        if (open) {
          var input = search.querySelector("input");
          if (input) input.focus();
        }
      }

      if (navToggle) {
        navToggle.addEventListener("click", function () {
          setSearch(false);
          setMenu(!root.classList.contains("is-open"));
        });
      }

      if (panel) {
        panel.querySelectorAll("a").forEach(function (link) {
          link.addEventListener("click", function () { setMenu(false); });
        });
      }

      if (searchToggle) {
        searchToggle.addEventListener("click", function () {
          var willOpen = !search || search.hasAttribute("hidden");
          setMenu(false);
          setSearch(willOpen);
        });
      }

      document.addEventListener("keydown", function (event) {
        if (event.key !== "Escape") return;
        setMenu(false);
        setSearch(false);
      });

      window.addEventListener("resize", function () {
        if (window.matchMedia("(min-width: 992px)").matches) setMenu(false);
      });

      var slides = root.querySelector("[data-cms-ads]");
      if (slides && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        var frames = slides.querySelectorAll(".cms-hnews__ad");
        if (frames.length > 1) {
          var index = 0;
          var timer = 0;
          function show(next) {
            frames[index].classList.remove("is-active");
            index = (next + frames.length) % frames.length;
            frames[index].classList.add("is-active");
          }
          function play() {
            window.clearInterval(timer);
            timer = window.setInterval(function () { show(index + 1); }, 6000);
          }
          play();
          slides.addEventListener("mouseenter", function () { window.clearInterval(timer); });
          slides.addEventListener("mouseleave", play);
          slides.addEventListener("focusin", function () { window.clearInterval(timer); });
          slides.addEventListener("focusout", play);
        }
      }
    },
  };
})();
