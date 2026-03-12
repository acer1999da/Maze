# Maze OS
> A macOS-inspired desktop environment built with Electron.

![Version](https://img.shields.io/badge/version-2.2-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey)
![Open Source](https://img.shields.io/badge/open%20source-yes-brightgreen)

---

## Features
- 🖥 macOS-style boot screen & setup wizard
- 🗂 Finder with sidebar and file browser
- 🧭 Safari-like browser with webview
- 💻 Terminal with zsh-like commands
- 📝 Notes app
- 🔢 Calculator
- ⚙️ System Preferences with 9 panels
- 🔍 Spotlight search
- 🚀 Launchpad
- ⊞ Control Center
- 🔔 Notifications
- 🖱 Dock with magnification
- 🖥 BIOS setup screen
- 💙 BSOD simulator

---

## How to Run

### Windows
1. Extract the `.zip` file
2. Open the folder in terminal
3. Run `npm install`
4. Double-click `launch.bat` or run `npm start`

### macOS
1. Extract the `.zip` file
2. Open terminal inside the folder
3. Run `npm install`
4. Double-click `Mac-Support/launch.command` or run `npm start`

### Linux
1. Extract the `.zip` file
2. Open terminal inside the folder
3. Run `bash Linux-Support/install.sh`
4. Run `bash Linux-Support/launch.sh` or `npm start`

---

## Folder Structure
```
Maze/
├── main.js              — Electron main process
├── preload.js           — Context bridge (security)
├── package.json
├── storage.json         — User data & preferences
├── launch.bat           — Windows launcher
├── GUI/
│   ├── style.css
│   └── Html/
│       ├── boot.html
│       ├── setup.html
│       ├── desktop.html
│       ├── bios.html
│       └── bsod.html
├── Modules/
│   ├── Module.js
│   └── app-scripts/
│       ├── browser.js
│       ├── settings.js
│       ├── topbar.js
│       └── taskbar.js
├── Mac-Support/
│   ├── launch.command
│   ├── install.command
│   └── readme.md
└── Linux-Support/
    ├── launch.sh
    ├── install.sh
    └── check-requirements.sh
```

---

## Contributing
Maze OS is fully open source under the MIT License!
Feel free to:
- 🍴 Fork it and build your own version
- 🐛 Report bugs via [GitHub Issues](https://github.com/acer1999da/Maze/issues)
- 🔧 Submit pull requests to improve Maze
- ⭐ Star the repo if you like it!

---

## License
MIT License — see [LICENSE](LICENSE)

---

*Built with ❤️ by [acer1999da](https://github.com/acer1999da)*
