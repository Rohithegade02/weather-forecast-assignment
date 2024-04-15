'use client';

import './globals.css';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
interface RootLayoutProps {
  children: React.ReactNode;

}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;