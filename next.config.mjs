import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.module.rules.push({
            test: /\.(mp3|wav)$/,
            use: {
                loader: 'file-loader',
                options: {
                    outputPath: 'static/audio', // Папка внутри /public
                    publicPath: '/_next/static/audio', // Путь, по которому будет доступен файл
                    name: '[name].[ext]',
                },
            },
        });

        config.resolve.alias = {
            ...config.resolve.alias,
            '@audio': path.resolve('./src/assets/audio'),
        };

        return config;
    },
};

export default nextConfig;
