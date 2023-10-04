@echo off
if %1 == "" (
exit
)
cmd /c uglifyjs %1 -c -e -o temp.js

cmd /c uglifyjs temp.js -c -e -o %~n1.min%~x1
del /f /s /q temp.js
cmd /c uglifyjs %~n1.min%~x1 -c -e -o temp.js
del /f /s /q %~n1.min%~x1
cmd /c uglifyjs temp.js -c -e -o %~n1.min%~x1
del /f /s /q temp.js
cmd /c uglifyjs %~n1.min%~x1 -c -e -o temp.js
del /f /s /q %~n1.min%~x1
cmd /c uglifyjs temp.js -c -e -o %~n1.min%~x1
del /f /s /q temp.js
cmd /c uglifyjs %~n1.min%~x1 -c -e -o temp.js
del /f /s /q %~n1.min%~x1
cmd /c uglifyjs temp.js -c -e -o %~n1.min%~x1
del /f /s /q temp.js