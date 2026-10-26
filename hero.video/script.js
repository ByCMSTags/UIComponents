/* hero.video — browser behaviour. The website shell calls init(root) after the section is inserted. */
(function () {
  window.CmsTagsComponents = window.CmsTagsComponents || {};
  window.CmsTagsComponents["hero.video"] = {
    init: function (root) {
      if (!root) return;
      const video = root.querySelector(".cms-hvideo__film");
      if (!video) return;
      video.muted = true;
      const play = video.play();
      if (play && typeof play.catch === "function") play.catch(function () {});
    },
  };
})();
