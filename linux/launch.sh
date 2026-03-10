#!/bin/bash

# ╔══════════════════════════════════════════════╗
# ║       MAZE OS — Linux Auto Installer         ║
# ╚══════════════════════════════════════════════╝

clear

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
RED='\033[0;31m'
BOLD='\033[1m'
RESET='\033[0m'

echo -e "${GREEN}${BOLD}"
echo "  ╔══════════════════════════════════════╗"
echo "  ║     Maze OS — Linux Installer        ║"
echo "  ╚══════════════════════════════════════╝"
echo -e "${RESET}"

ROOT_DIR="$(dirname "$0")/.."

# ── CHECK: Node.js ──
echo -e "${CYAN}[1/3] Checking Node.js...${RESET}"
if command -v node &> /dev/null; then
  NODE_VER=$(node -v)
  echo -e "${GREEN}  ✔ Node.js found: $NODE_VER${RESET}"
else
  echo -e "${YELLOW}  Node.js not found. Installing via nvm...${RESET}"
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
  export NVM_DIR="$HOME/.nvm"
  source "$NVM_DIR/nvm.sh"
  nvm install --lts
  nvm use --lts
  echo -e "${GREEN}  ✔ Node.js installed.${RESET}"
fi

# ── CHECK: npm ──
echo -e "${CYAN}[2/3] Checking npm...${RESET}"
if command -v npm &> /dev/null; then
  NPM_VER=$(npm -v)
  echo -e "${GREEN}  ✔ npm found: v$NPM_VER${RESET}"
else
  echo -e "${RED}  ✘ npm not found. Please install Node.js manually from https://nodejs.org${RESET}"
  exit 1
fi

# ── INSTALL dependencies ──
echo -e "${CYAN}[3/3] Installing Maze dependencies...${RESET}"
cd "$ROOT_DIR" && npm install

if [ $? -eq 0 ]; then
  echo ""
  echo -e "${GREEN}${BOLD}  ✔ Installation complete!${RESET}"
  echo ""
  echo -e "${CYAN}  To launch Maze, run:${RESET}"
  echo -e "${YELLOW}    bash linux/launch.sh${RESET}"
  echo -e "${YELLOW}    -- or --"
  echo -e "${YELLOW}    npm start${RESET}"
  echo ""
else
  echo -e "${RED}  ✘ npm install failed. Check errors above.${RESET}"
  exit 1
fi