#!/bin/bash

# Скрипт для развертывания демо-версии на GitHub Pages

echo "🚀 Начинаем развертывание демо-версии..."

# Проверяем, что мы в правильной папке
if [ ! -f "package.json" ]; then
    echo "❌ Ошибка: package.json не найден. Убедитесь, что вы в папке frontend-demo"
    exit 1
fi

# Устанавливаем зависимости
echo "📦 Устанавливаем зависимости..."
npm install

# Проверяем, что gh-pages установлен
if ! npm list gh-pages > /dev/null 2>&1; then
    echo "📦 Устанавливаем gh-pages..."
    npm install --save-dev gh-pages
fi

# Собираем проект
echo "🔨 Собираем проект..."
npm run build

# Развертываем на GitHub Pages
echo "🌐 Развертываем на GitHub Pages..."
npm run deploy

echo "✅ Развертывание завершено!"
echo "🌍 Ваш сайт будет доступен по адресу, указанному в homepage в package.json"
echo "⏰ Обновление может занять несколько минут"
