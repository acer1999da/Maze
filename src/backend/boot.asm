; Maze OS — Boot Assembly
; boot.asm
; Low-level boot sequence placeholder
; In a real OS this would contain the bootloader code
; For Maze (Electron), the actual boot is handled by main.js → boot.html

SECTION .text
global _start

_start:
    ; Initialize Maze kernel
    mov eax, 0x4D415A45  ; 'MAZE' signature
    
    ; Signal ready to Electron main process
    ; (IPC handled by boot.html / main.js)
    ret