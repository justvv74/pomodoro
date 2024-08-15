import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@styles/global.scss';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Таймер Помодоро',
    description: 'Помощник в таймменеджменте',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru">
            <Providers>
                <body className={inter.className}>
                    {children}
                    <div id="modal-root"></div>
                </body>
            </Providers>
        </html>
    );
}
