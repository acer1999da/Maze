/**
 * Maze OS — Topbar / Menubar Module
 * Handles menubar interactions, clock, and menu state
 */

(function() {
  // Update document title with current app
  function updateMenubarApp(appName) {
    const el = document.getElementById('mb-app');
    if (el) el.textContent = appName;
  }

  // Track active window focus to update menubar app name
  document.querySelectorAll('.window').forEach(win => {
    win.addEventListener('mousedown', () => {
      const titleEl = win.querySelector('.win-title');
      if (titleEl) updateMenubarApp(titleEl.textContent.trim());
    });
  });

  // Keyboard shortcuts for menubar actions
  document.addEventListener('keydown', e => {
    const isMod = e.metaKey || e.ctrlKey;
    if (!isMod) return;

    switch(e.key) {
      case 'f': e.preventDefault(); openSpotlight?.(); break;
      case ',': e.preventDefault(); openApp?.('settings'); break;
      case 'n': e.preventDefault(); openApp?.('finder'); break;
      case '1': e.preventDefault(); setFinderView?.('grid'); break;
      case '2': e.preventDefault(); setFinderView?.('list'); break;
    }
  });

  // Expose updateMenubarApp globally
  window.updateMenubarApp = updateMenubarApp;

  console.log('[Maze] Topbar module loaded');
})();