#!/bin/bash

# ╔══════════════════════════════════════╗
# ║         MAZE OS - GNU/Linux          ║
# ╚══════════════════════════════════════╝

clear

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
RED='\033[0;31m'
RESET='\033[0m'

echo -e "${GREEN}"
echo "  ███╗   ███╗ █████╗ ███████╗███████╗"
echo "  ████╗ ████║██╔══██╗╚══███╔╝██╔════╝"
echo "  ██╔████╔██║███████║  ███╔╝ █████╗  "
echo "  ██║╚██╔╝██║██╔══██║ ███╔╝  ██╔══╝  "
echo "  ██║ ╚═╝ ██║██║  ██║███████╗███████╗"
echo "  ╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝"
echo -e "${RESET}"
echo -e "${CYAN}  Maze OS — GNU/Linux Terminal${RESET}"
echo -e "${YELLOW}  ─────────────────────────────${RESET}"
echo ""
echo "  1. Launch Maze"
echo "  2. Install dependencies (npm install)"
echo "  3. Exit"
echo ""
read -p "  Enter your choice: " option

case $option in
  1)
    echo ""
    echo -e "${GREEN}  Launching Maze...${RESET}"
    sleep 1
    cd "$(dirname "$0")/.." && npm start
    ;;
  2)
    echo ""
    echo -e "${YELLOW}  Installing dependencies...${RESET}"
    cd "$(dirname "$0")/.." && npm install
    echo -e "${GREEN}  Done! Run this script again to launch Maze.${RESET}"
    ;;
  3)
    echo ""
    echo -e "${CYAN}  Exiting...${RESET}"
    sleep 1
    exit 0
    ;;
  *)
    echo ""
    echo -e "${RED}  Invalid option. Please try again.${RESET}"
    sleep 1
    bash "$0"
    ;;
esac