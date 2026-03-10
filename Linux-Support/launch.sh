#!/bin/bash
clear
GREEN='\033[0;32m' YELLOW='\033[1;33m' CYAN='\033[0;36m' RED='\033[0;31m' RESET='\033[0m'
echo -e "${GREEN}"
echo "  ███╗   ███╗ █████╗ ███████╗███████╗"
echo "  ████╗ ████║██╔══██╗╚══███╔╝██╔════╝"
echo "  ██╔████╔██║███████║  ███╔╝ █████╗  "
echo "  ██║╚██╔╝██║██╔══██║ ███╔╝  ██╔══╝  "
echo "  ██║ ╚═╝ ██║██║  ██║███████╗███████╗"
echo "  ╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝"
echo -e "${RESET}"
echo -e "${CYAN}  Maze OS — GNU/Linux Terminal${RESET}"
echo ""; echo "  1. Launch Maze"; echo "  2. Install dependencies"; echo "  3. Exit"; echo ""
read -p "  Enter your choice: " opt
case $opt in
  1) echo -e "${GREEN}  Launching Maze...${RESET}"; sleep 1; cd "$(dirname "$0")/.." && npm start ;;
  2) echo -e "${YELLOW}  Installing...${RESET}"; cd "$(dirname "$0")/.." && npm install ;;
  3) echo -e "${CYAN}  Exiting...${RESET}"; sleep 1; exit 0 ;;
  *) echo -e "${RED}  Invalid option.${RESET}"; sleep 1; bash "$0" ;;
esac