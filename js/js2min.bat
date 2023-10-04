@echo off
if %1 == "" (
exit
)
cmd /c uglifyjs %1 -c -e -o temp.js
del /f /s /q %1
cmd /c uglifyjs temp.js -c -e -o %1
del /f /s /q temp.js