# Maze OS — macOS Guide

## Requirements
- macOS 10.15 (Catalina) or higher
- Node.js v18 or higher
- npm

## Quick Start

### 1. Install dependencies
Open Terminal inside the Maze folder and run:
```bash
npm install
```

### 2. Launch Maze
Double-click `launch.command` in the Mac-Support folder,
or run in Terminal:
```bash
npm start
```

## Tested On
| macOS Version | Status |
|---------------|--------|
| macOS 15 Sequoia | ✅ Works |
| macOS 14 Sonoma  | ✅ Works |
| macOS 13 Ventura | ✅ Works |
| macOS 12 Monterey| ✅ Works |
| macOS 11 Big Sur | ✅ Works |
| macOS 10.15 Catalina | ✅ Works |

## Common Issues

### "App can't be opened because it's from an unidentified developer"
```bash
xattr -cr /path/to/Maze
```
Or go to **System Preferences → Security & Privacy → Open Anyway**

### Permission denied on launch.command
```bash
chmod +x Mac-Support/launch.command
```

### Electron won't open
Make sure Node.js is installed:
```bash
node -v
npm -v
```
If not installed, download from [nodejs.org](https://nodejs.org)

## Reset Maze
To wipe user data and go back to the setup wizard:
```bash
echo '{"setupComplete": false}' > storage.json
```