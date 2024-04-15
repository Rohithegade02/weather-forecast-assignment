'use client'

import MainLayout from "./MainLayout";
import City from "./components/City";
interface MainLayoutProps {
  weatherdata: any;
}

export default function Home({ weatherdata }:MainLayoutProps) {

  return (
    
      <MainLayout weatherdata={weatherdata}>
      <City/>
      </MainLayout>

  );
}

