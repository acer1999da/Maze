#!/bin/bash

# ╔══════════════════════════════════════════════╗
# ║       MAZE OS — macOS Auto Installer         ║
# ╚══════════════════════════════════════════════╝

clear

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
RED='\033[0;31m'
RESET='\033[0m'

echo -e "${GREEN}  Maze OS — macOS Installer${RESET}"; echo ""

ROOT="$(dirname "$0")/.."

# Check Node.js
echo -e "${CYAN}[1/2] Checking Node.js...${RESET}"
if command -v node &>/dev/null; then
  echo -e "${GREEN}  ✔ Node.js $(node -v) found${RESET}"
else
  echo -e "${YELLOW}  Node.js not found. Installing via Homebrew...${RESET}"
  if ! command -v brew &>/dev/null; then
    echo -e "${YELLOW}  Installing Homebrew first...${RESET}"
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  fi
  brew install node
  echo -e "${GREEN}  ✔ Node.js installed.${RESET}"
fi

# Install dependencies
echo -e "${CYAN}[2/2] Installing Maze dependencies...${RESET}"
cd "$ROOT" && npm install

if [ $? -eq 0 ]; then
  echo ""
  echo -e "${GREEN}  ✔ Done! Double-click launch.command to start Maze.${RESET}"
else
  echo -e "${RED}  ✘ npm install failed. Check errors above.${RESET}"
  exit 1
fi