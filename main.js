const { app, BrowserWindow, ipcMain, Menu, session } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

// ── PATHS ──
const STORAGE_PATH = path.join(__dirname, 'storage.json');
const HTML = (file) => path.join(__dirname, 'GUI', 'Html', file);

// ── STORAGE ──
function readStorage() {
  try {
    if (fs.existsSync(STORAGE_PATH))
      return JSON.parse(fs.readFileSync(STORAGE_PATH, 'utf8'));
  } catch (e) {}
  return {};
}

function writeStorage(data) {
  fs.writeFileSync(STORAGE_PATH, JSON.stringify(data, null, 2));
}

function isFirstBoot() {
  return !readStorage().setupComplete;
}

// ── WINDOW ──
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1024,
    minHeight: 700,
    frame: false,
    titleBarStyle: 'hidden',
    backgroundColor: '#000000',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webviewTag: true,
      webSecurity: false,
      allowRunningInsecureContent: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.maximize();
  mainWindow.loadFile(HTML('boot.html'));
  Menu.setApplicationMenu(null);
}

// ── HEADER BYPASS (for browser) ──
function setupHeaderBypass() {
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    const headers = { ...details.responseHeaders };
    delete headers['x-frame-options'];
    delete headers['X-Frame-Options'];
    delete headers['content-security-policy'];
    delete headers['Content-Security-Policy'];
    headers['access-control-allow-origin'] = ['*'];
    callback({ responseHeaders: headers });
  });
}

// ── IPC ──
ipcMain.on('boot-complete', () => {
  mainWindow.loadFile(HTML(isFirstBoot() ? 'setup.html' : 'desktop.html'));
});

ipcMain.on('setup-complete', (event, userData) => {
  writeStorage({
    ...readStorage(),
    setupComplete: true,
    user: userData,
    bootCount: 1,
    accentColor: '#0071e3',
    createdAt: new Date().toISOString()
  });
  mainWindow.loadFile(HTML('desktop.html'));
});

ipcMain.handle('get-storage', () => readStorage());
ipcMain.on('save-storage', (_, data) => writeStorage(data));
ipcMain.on('shutdown', () => app.quit());
ipcMain.on('reload', () => mainWindow.loadFile(HTML('boot.html')));
ipcMain.on('open-bios', () => mainWindow.loadFile(HTML('bios.html')));
ipcMain.on('open-bsod', (_, opts = {}) => {
  mainWindow.loadFile(HTML('bsod.html'), { query: opts });
});
ipcMain.on('open-dev-tools', () => mainWindow.webContents.openDevTools());

ipcMain.handle('get-system-info', () => {
  const os = require('os');
  return {
    platform: os.platform(),
    arch: os.arch(),
    cpus: os.cpus().length,
    totalMemory: Math.round(os.totalmem() / (1024 ** 3)) + ' GB',
    freeMemory: Math.round(os.freemem() / (1024 ** 3)) + ' GB',
    hostname: os.hostname(),
    nodeVersion: process.versions.node,
    electronVersion: process.versions.electron
  };
});

// ── INIT ──
app.whenReady().then(() => {
  setupHeaderBypass();
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// Windows 11 boot handler
ipcMain.on('boot-windows', () => {
  mainWindow.loadFile(path.join(__dirname, 'GUI', 'Html', 'windows.html'));
});