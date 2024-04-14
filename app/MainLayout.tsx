'use client';

import { useEffect, useState } from 'react';
import { Header } from './Header';
import './globals.css';

interface MainLayoutProps {
  children: React.ReactNode;
  weatherdata: any;
}

const MainLayout = ({ children, weatherdata }: MainLayoutProps) => {
    const [headerRendered, setHeaderRendered] = useState<boolean>(false);

    useEffect(() => {
      setHeaderRendered(true);
    }, []);
  return (
      <>
     {!headerRendered && <Header weatherdata={weatherdata} />}
      {children}
    </>
  );
};

export default MainLayout;