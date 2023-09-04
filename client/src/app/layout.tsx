import '@/styles/global.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type { FC } from 'react';

import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Meowvas',
  description: 'Meowvas, draw with ur frens!',
};

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className={cn('bg-gray-700 text-gray-200', inter.className)}>
        <main className="container mx-auto flex h-screen items-center justify-center">
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
