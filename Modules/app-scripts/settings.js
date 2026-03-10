/**
 * Maze OS — Settings Module
 * Persists and applies user preferences.
 */
(function() {
  async function loadPrefs() {
    try {
      const { ipcRenderer } = require('electron');
      const d = await ipcRenderer.invoke('get-storage');
      if (d.user?.theme) setTheme?.(d.user.theme);
      if (d.user?.wallpaper) setWallpaper?.(d.user.wallpaper);
      if (d.accentColor)
        document.documentElement.style.setProperty('--accent', d.accentColor);
    } catch(e) {}
  }

  async function savePrefs(prefs) {
    try {
      const { ipcRenderer } = require('electron');
      const d = await ipcRenderer.invoke('get-storage');
      ipcRenderer.send('save-storage', { ...d, ...prefs });
    } catch(e) {}
  }

  const _st = window.setTheme;
  window.setTheme = (t) => { _st?.(t); savePrefs({ theme: t }); };

  const _sw = window.setWallpaper;
  window.setWallpaper = (wp) => {
    _sw?.(wp); savePrefs({ wallpaper: wp });
    window.showNotification?.('Desktop', 'Wallpaper changed.', '🖥');
  };

  window.savePrefs = savePrefs;
  loadPrefs();
  console.log('[Maze] Settings module loaded');
})();