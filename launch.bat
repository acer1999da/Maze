@echo off
title Maze-Terminal
color 2

echo Mounted Launcher...
timeout /t 1 /nobreak > NUL
echo Mounting drives...
timeout /t 1 /nobreak > NUL
echo Mounting GUI and files...
timeout /t 1 /nobreak > NUL

cls
title GNUX Terminal V2
echo.
echo  ================================
echo          GNUX TERMINAL
echo  ================================
echo.
echo  1. Start Maze OS
echo  2. Exit
echo.
set /p option=  Choose an option: 

if "%option%"=="1" goto open
if "%option%"=="2" goto leave
goto invalid

:open
cls
echo.
echo  Welcome to Maze OS!
echo  Enjoy your OS!
echo.
timeout /t 1 /nobreak > NUL
call npm start
pause
exit

:leave
cls
echo.
echo  Thank you for using Maze OS!
echo  Goodbye!
echo.
timeout /t 1 /nobreak > NUL
exit

:invalid
echo.
echo  Invalid option. Please try again.
timeout /t 2 /nobreak > NUL
call %0