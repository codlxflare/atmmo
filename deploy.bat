@echo off
REM Скрипт для развертывания демо-версии на GitHub Pages (Windows)

echo 🚀 Начинаем развертывание демо-версии...

REM Проверяем, что мы в правильной папке
if not exist "package.json" (
    echo ❌ Ошибка: package.json не найден. Убедитесь, что вы в папке frontend-demo
    pause
    exit /b 1
)

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

echo ✅ Развертывание завершено!
echo 🌍 Ваш сайт будет доступен по адресу, указанному в homepage в package.json
echo ⏰ Обновление может занять несколько минут
pause
