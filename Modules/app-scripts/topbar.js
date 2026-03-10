/**
 * Maze OS — Topbar Module
 * Handles menubar app name updates and keyboard shortcuts.
 */
(function() {
  function updateMenubarApp(appName) {
    const el = document.getElementById('mb-app');
    if (el) el.textContent = appName;
  }

  document.querySelectorAll('.window').forEach(win => {
    win.addEventListener('mousedown', () => {
      const t = win.querySelector('.win-title');
      if (t) updateMenubarApp(t.textContent.trim());
    });
  });

  document.addEventListener('keydown', e => {
    const mod = e.metaKey || e.ctrlKey;
    if (!mod) return;
    if (e.key === ' ') { e.preventDefault(); openSpotlight?.(); }
    if (e.key === ',') { e.preventDefault(); openApp?.('settings'); }
    if (e.key === '1') { e.preventDefault(); setFinderView?.('grid'); }
    if (e.key === '2') { e.preventDefault(); setFinderView?.('list'); }
  });

  window.updateMenubarApp = updateMenubarApp;
  console.log('[Maze] Topbar module loaded');
})();