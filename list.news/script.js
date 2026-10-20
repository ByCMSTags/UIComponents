/* list.news — browser behaviour. The website shell calls init(root) after the section is inserted. */
(function () {
  window.CmsTagsComponents = window.CmsTagsComponents || {};
  window.CmsTagsComponents["list.news"] = {
    init: function (root) {
      if (!root) return;
      const locale = document.documentElement.lang || "en";
      const fmt = typeof Intl !== "undefined" && Intl.RelativeTimeFormat ? new Intl.RelativeTimeFormat(locale, { numeric: "always" }) : null;
      root.querySelectorAll("[data-cms-date]").forEach((el) => {
        const raw = String(el.getAttribute("data-cms-date") || el.textContent || "").trim();
        const t = Date.parse(raw);
        if (!Number.isFinite(t) || !fmt) return;
        const sec = Math.round((t - Date.now()) / 1000);
        const abs = Math.abs(sec);
        let value = sec;
        let unit = "second";
        if (abs >= 31536000) {
          value = Math.round(sec / 31536000);
          unit = "year";
        } else if (abs >= 2592000) {
          value = Math.round(sec / 2592000);
          unit = "month";
        } else if (abs >= 86400) {
          value = Math.round(sec / 86400);
          unit = "day";
        } else if (abs >= 3600) {
          value = Math.round(sec / 3600);
          unit = "hour";
        } else if (abs >= 60) {
          value = Math.round(sec / 60);
          unit = "minute";
        }
        el.textContent = fmt.format(value, unit);
      });
    },
  };
})();
