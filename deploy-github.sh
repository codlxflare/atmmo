#!/bin/bash

# Скрипт для развертывания на GitHub Pages с правильными путями

echo "🚀 Начинаем развертывание на GitHub Pages..."

# Проверяем, что мы в правильной папке
if [ ! -f "package.json" ]; then
    echo "❌ Ошибка: package.json не найден. Убедитесь, что вы в папке frontend-demo"
    exit 1
fi

# Сохраняем оригинальный homepage
ORIGINAL_HOMEPAGE=$(grep '"homepage"' package.json | cut -d'"' -f4)

# Устанавливаем homepage для GitHub Pages
echo "📝 Устанавливаем homepage для GitHub Pages..."
sed -i 's/"homepage": ".*"/"homepage": "https:\/\/codlxflare.github.io\/atmmo"/' package.json

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

# Восстанавливаем оригинальный homepage
echo "🔄 Восстанавливаем оригинальный homepage..."
sed -i "s/\"homepage\": \".*\"/\"homepage\": \"$ORIGINAL_HOMEPAGE\"/" package.json

echo "✅ Развертывание завершено!"
echo "🌍 Ваш сайт будет доступен по адресу, указанному в homepage"
echo "⏰ Обновление может занять несколько минут"
echo ""
echo "💡 Не забудьте обновить URL в package.json на ваш реальный репозиторий!"
