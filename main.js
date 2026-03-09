const { app, BrowserWindow, ipcMain, screen, Menu, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;
const storagePath = path.join(__dirname, 'src', 'macos-storage');

function isFirstBoot() {
  try {
    if (fs.existsSync(storagePath)) {
      const data = JSON.parse(fs.readFileSync(storagePath, 'utf8'));
      return !data.setupComplete;
    }
  } catch (e) {}
  return true;
}

function readStorage() {
  try {
    if (fs.existsSync(storagePath)) {
      return JSON.parse(fs.readFileSync(storagePath, 'utf8'));
    }
  } catch (e) {}
  return {};
}

function writeStorage(data) {
  fs.writeFileSync(storagePath, JSON.stringify(data, null, 2));
}

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

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
      enableRemoteModule: true,
      webSecurity: false,
      allowRunningInsecureContent: true
    },
    icon: path.join(__dirname, 'src', 'assets', 'icon.png')
  });

  mainWindow.maximize();
  mainWindow.loadFile(path.join(__dirname, 'src', 'boot.html'));
  Menu.setApplicationMenu(null);
}

// IPC Handlers
ipcMain.on('boot-complete', () => {
  const firstBoot = isFirstBoot();
  if (firstBoot) {
    mainWindow.loadFile(path.join(__dirname, 'src', 'frontend', 'setup.html'));
  } else {
    mainWindow.loadFile(path.join(__dirname, 'src', 'frontend', 'desktop.html'));
  }
});

ipcMain.on('setup-complete', (event, userData) => {
  const existing = readStorage();
  const data = {
    ...existing,
    setupComplete: true,
    user: userData,
    bootCount: 1,
    theme: 'light',
    wallpaper: 'gradient-aurora',
    accentColor: '#0071e3',
    createdAt: new Date().toISOString()
  };
  writeStorage(data);
  mainWindow.loadFile(path.join(__dirname, 'src', 'frontend', 'desktop.html'));
});

ipcMain.handle('get-storage', () => {
  return readStorage();
});

ipcMain.on('save-storage', (event, data) => {
  writeStorage(data);
});

ipcMain.on('shutdown', () => {
  app.quit();
});

ipcMain.on('reload', () => {
  mainWindow.loadFile(path.join(__dirname, 'src', 'boot.html'));
});

ipcMain.on('toggle-fullscreen', () => {
  mainWindow.setFullScreen(!mainWindow.isFullScreen());
});

ipcMain.on('open-dev-tools', () => {
  mainWindow.webContents.openDevTools();
});

ipcMain.handle('get-system-info', () => {
  const os = require('os');
  return {
    platform: os.platform(),
    arch: os.arch(),
    cpus: os.cpus().length,
    totalMemory: Math.round(os.totalmem() / (1024 * 1024 * 1024)) + ' GB',
    freeMemory: Math.round(os.freemem() / (1024 * 1024 * 1024)) + ' GB',
    hostname: os.hostname(),
    uptime: Math.round(os.uptime() / 60) + ' min',
    nodeVersion: process.versions.node,
    electronVersion: process.versions.electron
  };
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});