#!/bin/bash
clear
GREEN='\033[0;32m' YELLOW='\033[1;33m' CYAN='\033[0;36m' RED='\033[0;31m' RESET='\033[0m'
echo -e "${GREEN}  Maze OS — Linux Installer${RESET}"; echo ""
ROOT="$(dirname "$0")/.."
echo -e "${CYAN}[1/2] Checking Node.js...${RESET}"
if command -v node &>/dev/null; then
  echo -e "${GREEN}  ✔ Node.js $(node -v) found${RESET}"
else
  echo -e "${YELLOW}  Installing Node.js via nvm...${RESET}"
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
  export NVM_DIR="$HOME/.nvm"; source "$NVM_DIR/nvm.sh"
  nvm install --lts && nvm use --lts
fi
echo -e "${CYAN}[2/2] Installing Maze dependencies...${RESET}"
cd "$ROOT" && npm install && echo -e "${GREEN}  ✔ Done! Run launch.sh to start Maze.${RESET}"