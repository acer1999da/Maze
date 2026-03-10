#!/bin/bash

# ╔══════════════════════════════════════════════╗
# ║     Maze OS — Requirements Checker           ║
# ╚══════════════════════════════════════════════╝

clear

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
RESET='\033[0m'

echo -e "${CYAN}"
echo "  Maze OS — Requirements Checker"
echo "  ────────────────────────────────"
echo -e "${RESET}"

PASS=0
FAIL=0

check() {
  local name=$1
  local cmd=$2
  local ver_cmd=$3

  if command -v $cmd &> /dev/null; then
    VER=$($ver_cmd 2>&1 | head -1)
    echo -e "  ${GREEN}✔${RESET} $name — $VER"
    ((PASS++))
  else
    echo -e "  ${RED}✘${RESET} $name — NOT FOUND"
    ((FAIL++))
  fi
}

check "Node.js"  "node"  "node -v"
check "npm"      "npm"   "npm -v"
check "Git"      "git"   "git --version"

# Check display server
echo ""
echo -e "${CYAN}  Display:${RESET}"
if [ -n "$DISPLAY" ] || [ -n "$WAYLAND_DISPLAY" ]; then
  echo -e "  ${GREEN}✔${RESET} Display server found (${DISPLAY:-Wayland})"
  ((PASS++))
else
  echo -e "  ${YELLOW}⚠${RESET} No display server detected (headless?)"
fi

# Check node_modules
echo ""
echo -e "${CYAN}  Maze:${RESET}"
ROOT="$(dirname "$0")/.."
if [ -d "$ROOT/node_modules" ]; then
  echo -e "  ${GREEN}✔${RESET} node_modules present"
  ((PASS++))
else
  echo -e "  ${YELLOW}⚠${RESET} node_modules missing — run install.sh first"
fi

if [ -f "$ROOT/src/macos-storage.json" ]; then
  echo -e "  ${GREEN}✔${RESET} macos-storage.json found"
  ((PASS++))
else
  echo -e "  ${RED}✘${RESET} macos-storage.json missing"
  ((FAIL++))
fi

# Summary
echo ""
echo -e "${CYAN}  ────────────────────────────────${RESET}"
echo -e "  ${GREEN}Passed: $PASS${RESET}  ${RED}Failed: $FAIL${RESET}"
echo ""

if [ $FAIL -gt 0 ]; then
  echo -e "  ${YELLOW}Run linux/install.sh to fix missing dependencies.${RESET}"
else
  echo -e "  ${GREEN}All checks passed! Run linux/launch.sh to start Maze.${RESET}"
fi
echo ""