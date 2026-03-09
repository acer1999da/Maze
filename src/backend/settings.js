/**
 * Maze OS — Settings Module
 * Handles system preferences persistence and application
 */

(function() {
  // Load saved preferences from storage
  async function loadPreferences() {
    try {
      const { ipcRenderer } = require('electron');
      const data = await ipcRenderer.invoke('get-storage');
      if (data.theme) setTheme?.(data.theme);
      if (data.wallpaper) setWallpaper?.(data.wallpaper);
      if (data.accentColor) {
        document.documentElement.style.setProperty('--accent', data.accentColor);
      }
    } catch(e) {
      console.warn('[Maze Settings] Could not load preferences:', e);
    }
  }

  // Save preferences to storage
  async function savePreferences(prefs) {
    try {
      const { ipcRenderer } = require('electron');
      const existing = await ipcRenderer.invoke('get-storage');
      const updated = { ...existing, ...prefs };
      ipcRenderer.send('save-storage', updated);
    } catch(e) {
      console.warn('[Maze Settings] Could not save preferences:', e);
    }
  }

  // Intercept setTheme to also save
  const _origSetTheme = window.setTheme;
  window.setTheme = function(t) {
    if (_origSetTheme) _origSetTheme(t);
    savePreferences({ theme: t });
  };

  // Intercept setWallpaper to also save
  const _origSetWp = window.setWallpaper;
  window.setWallpaper = function(wp) {
    if (_origSetWp) _origSetWp(wp);
    savePreferences({ wallpaper: wp });
    showNotification?.('Desktop & Screen Saver', 'Wallpaper changed.', '🖥');
  };

  window.savePreferences = savePreferences;

  loadPreferences();
  console.log('[Maze] Settings module loaded');
})();