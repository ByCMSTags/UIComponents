/* content.tabs — browser behaviour. The website shell calls init(root) after the section is inserted. */
(function () {
  window.CmsTagsComponents = window.CmsTagsComponents || {};
  window.CmsTagsComponents["content.tabs"] = {
    init: function (root) {
      if (!root) return;
      const tabs = root.querySelectorAll("[data-cms-tab]");
      const panes = root.querySelectorAll("[data-cms-pane]");
      const shots = root.querySelectorAll("[data-cms-shot]");
      if (tabs.length < 2) return;
      tabs.forEach((tab, i) => {
        tab.tabIndex = i === 0 ? 0 : -1;
      });

      function show(index) {
        tabs.forEach((tab, i) => {
          const on = i === index;
          tab.classList.toggle("is-active", on);
          tab.setAttribute("aria-selected", on ? "true" : "false");
          tab.tabIndex = on ? 0 : -1;
        });
        panes.forEach((pane, i) => {
          pane.hidden = i !== index;
        });
        shots.forEach((shot, i) => {
          shot.hidden = i !== index;
        });
      }

      tabs.forEach((tab, i) => {
        tab.addEventListener("click", () => show(i));
        tab.addEventListener("keydown", (event) => {
          const dir = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 0;
          if (!dir) return;
          event.preventDefault();
          const next = (i + dir + tabs.length) % tabs.length;
          tabs[next].focus();
          show(next);
        });
      });
    },
  };
})();
