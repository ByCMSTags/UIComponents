/* content.tabs — browser behaviour. The website shell calls init(root) after the section is inserted. */
(function () {
  window.CmsTagsComponents = window.CmsTagsComponents || {};
  window.CmsTagsComponents["content.tabs"] = {
    init: function (root) {
      if (!root) return;
      const nav = root.querySelector(".cms-split-tabs__nav");
      const ink = root.querySelector(".cms-split-tabs__ink");
      const tabs = root.querySelectorAll("[data-cms-tab]");
      const panes = root.querySelectorAll("[data-cms-pane]");
      const shots = root.querySelectorAll("[data-cms-shot]");
      if (!tabs.length) return;
      tabs.forEach((tab, i) => {
        tab.tabIndex = i === 0 ? 0 : -1;
      });

      function moveInk(index) {
        if (!nav || !ink || !tabs[index]) return;
        const tab = tabs[index];
        ink.style.width = `${tab.offsetWidth}px`;
        ink.style.transform = `translate(${tab.offsetLeft}px, ${tab.offsetTop + tab.offsetHeight - 2}px)`;
      }

      function show(index) {
        tabs.forEach((tab, i) => {
          const on = i === index;
          tab.classList.toggle("is-active", on);
          tab.setAttribute("aria-selected", on ? "true" : "false");
          tab.tabIndex = on ? 0 : -1;
        });
        panes.forEach((pane, i) => {
          pane.classList.toggle("is-active", i === index);
        });
        shots.forEach((shot, i) => {
          shot.classList.toggle("is-active", i === index);
        });
        moveInk(index);
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

      requestAnimationFrame(() => moveInk(0));
      window.addEventListener("resize", () => {
        const index = [...tabs].findIndex((tab) => tab.classList.contains("is-active"));
        moveInk(index < 0 ? 0 : index);
      });
    },
  };
})();
