/**
 * Maze OS — Taskbar / Dock Module
 * Handles dock auto-hide and interactions.
 */
(function() {
  let dockAutoHide = false;
  let dockHidden = false;

  function enableDockAutoHide(enabled) {
    dockAutoHide = enabled;
    const c = document.getElementById('dock-container');
    if (!enabled) { c.style.transform = ''; dockHidden = false; }
  }

  document.addEventListener('mousemove', e => {
    if (!dockAutoHide) return;
    const c = document.getElementById('dock-container');
    const near = e.clientY > window.innerHeight - 80;
    if (near && dockHidden) {
      c.style.transition = 'transform 0.3s cubic-bezier(.34,1.2,.64,1)';
      c.style.transform = 'translateX(-50%) translateY(0)';
      dockHidden = false;
    } else if (!near && !dockHidden) {
      c.style.transition = 'transform 0.4s ease';
      c.style.transform = 'translateX(-50%) translateY(110%)';
      dockHidden = true;
    }
  });

  window.enableDockAutoHide = enableDockAutoHide;
  console.log('[Maze] Taskbar module loaded');
})();