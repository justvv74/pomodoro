import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        // Добавляем правило для обработки mp3 файлов
        config.module.rules.push({
            test: /\.(mp3|wav)$/, // Регулярное выражение для аудиофайлов
            use: {
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]', // Формат имени файла при сборке
                },
            },
        });

        // Настраиваем алиасы, чтобы они соответствовали твоему tsconfig.json
        config.resolve.alias = {
            ...config.resolve.alias,
            '@audio': path.resolve('./src/assets/audio'),
            // Добавь другие алиасы при необходимости
        };

        return config;
    },
};

export default nextConfig;
