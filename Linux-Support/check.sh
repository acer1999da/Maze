#!/bin/bash
clear
GREEN='\033[0;32m' YELLOW='\033[1;33m' RED='\033[0;31m' CYAN='\033[0;36m' RESET='\033[0m'
echo -e "${CYAN}  Maze OS — Requirements Checker${RESET}"; echo ""
PASS=0; FAIL=0
check() { command -v $2 &>/dev/null && echo -e "  ${GREEN}✔${RESET} $1 — $($3 2>&1|head -1)" && ((PASS++)) || { echo -e "  ${RED}✘${RESET} $1 — NOT FOUND"; ((FAIL++)); }; }
check "Node.js" "node" "node -v"
check "npm" "npm" "npm -v"
check "Git" "git" "git --version"
ROOT="$(dirname "$0")/.."
[ -d "$ROOT/node_modules" ] && echo -e "  ${GREEN}✔${RESET} node_modules present" && ((PASS++)) || { echo -e "  ${YELLOW}⚠${RESET} node_modules missing — run install.sh"; }
[ -f "$ROOT/storage.json" ] && echo -e "  ${GREEN}✔${RESET} storage.json found" && ((PASS++)) || { echo -e "  ${RED}✘${RESET} storage.json missing"; ((FAIL++)); }
echo ""; echo -e "  ${GREEN}Passed: $PASS${RESET}  ${RED}Failed: $FAIL${RESET}"
[ $FAIL -eq 0 ] && echo -e "  ${GREEN}All good! Run launch.sh${RESET}" || echo -e "  ${YELLOW}Run install.sh to fix issues.${RESET}"