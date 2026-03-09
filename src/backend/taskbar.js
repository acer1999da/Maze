/**
 * Maze OS — Taskbar / Dock Module
 * Handles dock behavior, app running states, and dock interactions
 */

(function() {
  // Auto-hide dock on mouse position
  let dockHidden = false;
  let dockAutoHide = false;

  function enableDockAutoHide(enabled) {
    dockAutoHide = enabled;
    const container = document.getElementById('dock-container');
    if (!enabled) {
      container.style.transform = '';
      container.style.transition = '';
      dockHidden = false;
    }
  }

  // Mouse proximity detection for auto-hide
  document.addEventListener('mousemove', e => {
    if (!dockAutoHide) return;
    const container = document.getElementById('dock-container');
    const isNearBottom = e.clientY > window.innerHeight - 80;

    if (isNearBottom && dockHidden) {
      container.style.transition = 'transform 0.3s cubic-bezier(0.34,1.2,0.64,1)';
      container.style.transform = 'translateX(-50%) translateY(0)';
      dockHidden = false;
    } else if (!isNearBottom && !dockHidden) {
      container.style.transition = 'transform 0.4s ease';
      container.style.transform = 'translateX(-50%) translateY(110%)';
      dockHidden = true;
    }
  });

  // Right-click context menu on dock items
  document.querySelectorAll('.dock-item').forEach(item => {
    item.addEventListener('contextmenu', e => {
      e.preventDefault();
      e.stopPropagation();
      // Could show dock item context menu here
    });
  });

  // Expose functions globally
  window.enableDockAutoHide = enableDockAutoHide;

  console.log('[Maze] Taskbar module loaded');
})();