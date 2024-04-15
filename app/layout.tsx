'use client';

import MainLayout from './MainLayout';
import './globals.css';
import { Inter } from 'next/font/google'
 
// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ['latin'] })
interface RootLayoutProps {
  children: React.ReactNode;
  weatherdata: any;
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