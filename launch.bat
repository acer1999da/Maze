@echo off
title MAZE-TERMINAL
color 2
echo loading...
timeout /t 1 /nobreak > NUL
echo loading...
timeout /t 1 /nobreak > NUL
echo loading...
timeout /t 1 /nobreak > NUL
echo loading...
timeout /t 1 /nobreak > NUL
echo loading...
timeout /t 1 /nobreak > NUL
echo loading...
timeout /t 1 /nobreak > NUL
echo loading...
timeout /t 1 /nobreak > NUL

title GNU TERMUX
echo.
echo  ███╗   ███╗ █████╗ ███████╗███████╗
echo  ████╗ ████║██╔══██╗╚══███╔╝██╔════╝
echo  ██╔████╔██║███████║  ███╔╝ █████╗
echo  ██║╚██╔╝██║██╔══██║ ███╔╝  ██╔══╝
echo  ██║ ╚═╝ ██║██║  ██║███████╗███████╗
echo  ╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝
echo.
echo Welcome to GNU TERMUX
echo Please select an option:
echo.
echo  1. Launch Maze
echo  2. Exit
echo.

set /p option=  Enter your choice: 
if "%option%"=="1" (
    echo.
    echo  Launching Maze...
    timeout /t 1 /nobreak > NUL
    call npm start
    echo.
    echo  Maze launched successfully!
) else if "%option%"=="2" (
    echo.
    echo  Exiting...
    timeout /t 1 /nobreak > NUL
    exit
) else (
    echo.
    echo  Invalid option. Please try again.
    timeout /t 2 /nobreak > NUL
    call %0
)