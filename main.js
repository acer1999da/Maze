/**
 * Maze OS — Browser Module
 * Handles Safari-like browser window functionality
 */

(function() {
  const webview = document.getElementById('browser-webview');
  if (!webview) return;

  // Wait for webview to be ready
  webview.addEventListener('dom-ready', () => {
    // Update address bar when webview navigates
    webview.addEventListener('did-navigate', e => {
      const urlInput = document.getElementById('browser-url');
      if (urlInput && e.url) urlInput.value = e.url;
    });

    webview.addEventListener('did-navigate-in-page', e => {
      const urlInput = document.getElementById('browser-url');
      if (urlInput && e.url && e.isMainFrame) urlInput.value = e.url;
    });

    webview.addEventListener('page-title-updated', e => {
      const titleEl = document.querySelector('#win-browser .win-title');
      if (titleEl) titleEl.textContent = e.title || 'Safari';
    });

    webview.addEventListener('did-start-loading', () => {
      const btn = document.querySelector('#win-browser .browser-navbtn[onclick="browserRefresh()"]');
      if (btn) btn.textContent = '✕';
    });

    webview.addEventListener('did-stop-loading', () => {
      const btn = document.querySelector('#win-browser .browser-navbtn[onclick="browserRefresh()"]');
      if (btn) btn.textContent = '↻';
      // Update URL bar after load
      const urlInput = document.getElementById('browser-url');
      if (urlInput && webview.getURL) urlInput.value = webview.getURL();
    });

    webview.addEventListener('did-fail-load', (e) => {
      if (e.errorCode === -3) return; // Ignore aborted
      const container = document.getElementById('browser-content');
      // Show friendly error page
      const errDiv = document.createElement('div');
      errDiv.style.cssText = 'position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#fff;gap:12px;font-family:system-ui';
      errDiv.innerHTML = `
        <div style="font-size:48px">🌐</div>
        <div style="font-size:18px;font-weight:600;color:#1d1d1f">Can't connect to this page</div>
        <div style="font-size:13px;color:#6e6e73">${e.validatedURL}</div>
        <button onclick="this.parentElement.remove();browserRefresh()" 
          style="margin-top:8px;padding:8px 20px;border-radius:8px;border:none;background:#0071e3;color:white;font-size:14px;cursor:pointer">
          Try Again
        </button>`;
      container.appendChild(errDiv);
      setTimeout(() => errDiv.remove(), 5000);
    });
  });

  console.log('[Maze] Browser module loaded');
})();