/**
 * Maze OS — Preload Script
 * Runs in renderer context before page loads.
 * Exposes safe APIs to renderer via contextBridge.
 * 
 * Note: nodeIntegration is enabled so contextBridge
 * is supplementary — used for future security hardening.
 */

const { contextBridge, ipcRenderer } = require('electron');

// Expose a safe mazeAPI to all renderer pages
contextBridge.exposeInMainWorld('mazeAPI', {
  // Storage
  getStorage: () => ipcRenderer.invoke('get-storage'),
  saveStorage: (data) => ipcRenderer.send('save-storage', data),

  // System
  getSystemInfo: () => ipcRenderer.invoke('get-system-info'),

  // Navigation
  bootComplete: () => ipcRenderer.send('boot-complete'),
  setupComplete: (userData) => ipcRenderer.send('setup-complete', userData),
  openBIOS: () => ipcRenderer.send('open-bios'),
  openBSOD: (opts) => ipcRenderer.send('open-bsod', opts),
  reload: () => ipcRenderer.send('reload'),
  shutdown: () => ipcRenderer.send('shutdown'),
  openDevTools: () => ipcRenderer.send('open-dev-tools'),
});

console.log('[Maze] Preload script loaded successfully.');