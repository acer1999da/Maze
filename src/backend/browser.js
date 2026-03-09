/**
 * Maze OS — Browser Module
 * Handles Safari-like browser window functionality
 */

(function() {
  const webview = document.getElementById('browser-webview');
  if (!webview) return;

  // Update address bar when webview navigates
  webview.addEventListener('did-navigate', e => {
    const urlInput = document.getElementById('browser-url');
    if (urlInput) urlInput.value = e.url;
  });

  webview.addEventListener('did-navigate-in-page', e => {
    const urlInput = document.getElementById('browser-url');
    if (urlInput) urlInput.value = e.url;
  });

  webview.addEventListener('page-title-updated', e => {
    const titleEl = document.querySelector('#win-browser .win-title');
    if (titleEl) titleEl.textContent = e.title || 'Safari';
  });

  webview.addEventListener('did-start-loading', () => {
    const refreshBtn = document.querySelector('.browser-navbtn[onclick="browserRefresh()"]');
    if (refreshBtn) refreshBtn.textContent = '✕';
  });

  webview.addEventListener('did-stop-loading', () => {
    const refreshBtn = document.querySelector('.browser-navbtn[onclick="browserRefresh()"]');
    if (refreshBtn) refreshBtn.textContent = '↻';
  });

  console.log('[Maze] Browser module loaded');
})();