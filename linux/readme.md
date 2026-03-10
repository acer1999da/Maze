# Maze OS — Linux Guide

## Requirements
- Node.js v18 or higher
- npm
- A display server (X11 or Wayland)
- Git (optional)

## Quick Start

### 1. Check requirements
```bash
bash linux/check-requirements.sh
```

### 2. Install dependencies
```bash
bash linux/install.sh
```

### 3. Launch Maze
```bash
bash linux/launch.sh
```

## Manual Launch
If you prefer not to use the launcher:
```bash
npm install
npm start
```

## Tested Distros
| Distro | Status |
|--------|--------|
| Ubuntu 22.04+ | ✅ Works |
| Debian 12+ | ✅ Works |
| Fedora 38+ | ✅ Works |
| Arch Linux | ✅ Works |
| Linux Mint | ✅ Works |

## Common Issues

### Electron won't open / no display
```bash
export DISPLAY=:0
bash linux/launch.sh
```

### Permission denied on scripts
```bash
chmod +x linux/launch.sh linux/install.sh linux/check-requirements.sh
```

### Sandbox error on startup
```bash
# Add --no-sandbox flag by editing package.json:
# "start": "electron . --no-sandbox"
```

## Reset Maze
To wipe your user data and go back to the setup wizard:
```bash
echo '{"setupComplete": false}' > src/macos-storage.json
```