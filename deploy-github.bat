@echo off
REM Скрипт для развертывания на GitHub Pages с правильными путями (Windows)

echo 🚀 Начинаем развертывание на GitHub Pages...

REM Проверяем, что мы в правильной папке
if not exist "package.json" (
    echo ❌ Ошибка: package.json не найден. Убедитесь, что вы в папке frontend-demo
    pause
    exit /b 1
)

REM Сохраняем оригинальный homepage
for /f "tokens=2 delims=:" %%a in ('findstr "homepage" package.json') do set ORIGINAL_HOMEPAGE=%%a
set ORIGINAL_HOMEPAGE=%ORIGINAL_HOMEPAGE: =%

REM Устанавливаем homepage для GitHub Pages
echo 📝 Устанавливаем homepage для GitHub Pages...
powershell -Command "(Get-Content package.json) -replace '\"homepage\": \".*\"', '\"homepage\": \"https://codlxflare.github.io/atmmo\"' | Set-Content package.json"

REM Устанавливаем зависимости
echo 📦 Устанавливаем зависимости...
call npm install

REM Проверяем, что gh-pages установлен
npm list gh-pages >nul 2>&1
if errorlevel 1 (
    echo 📦 Устанавливаем gh-pages...
    call npm install --save-dev gh-pages
)

REM Собираем проект
echo 🔨 Собираем проект...
call npm run build

REM Развертываем на GitHub Pages
echo 🌐 Развертываем на GitHub Pages...
call npm run deploy

REM Восстанавливаем оригинальный homepage
echo 🔄 Восстанавливаем оригинальный homepage...
powershell -Command "(Get-Content package.json) -replace '\"homepage\": \".*\"', '\"homepage\": \"%ORIGINAL_HOMEPAGE%\"' | Set-Content package.json"

echo ✅ Развертывание завершено!
echo 🌍 Ваш сайт будет доступен по адресу, указанному в homepage
echo ⏰ Обновление может занять несколько минут
echo.
echo 💡 Не забудьте обновить URL в package.json на ваш реальный репозиторий!
pause
