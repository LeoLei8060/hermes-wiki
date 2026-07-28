(function () {
  const FIXED_TITLE = 'LeoLei8060知识库';

  function fixHeaderTitle() {
    document.querySelectorAll('.md-header__topic .md-ellipsis').forEach(function (el, index) {
      // Material header normally has two topic slots: site title + current page title.
      el.textContent = FIXED_TITLE;
    });
    document.querySelectorAll('[data-md-component="header-title"] .md-ellipsis').forEach(function (el) {
      el.textContent = FIXED_TITLE;
    });
    document.title = document.title.replace(/^.*?(?= - )/, FIXED_TITLE);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fixHeaderTitle);
  } else {
    fixHeaderTitle();
  }
  document.addEventListener('DOMContentLoaded', function () {
    const target = document.querySelector('.md-header__title');
    if (!target) return;
    const observer = new MutationObserver(fixHeaderTitle);
    observer.observe(target, { childList: true, subtree: true, characterData: true });
  });
})();