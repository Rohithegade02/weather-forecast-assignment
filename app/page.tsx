'use client'
import React from 'react';
import MainLayout from "./MainLayout";
import City from "./components/City";

interface MainLayoutProps {
  weatherdata: any;
}

const Home: React.FC<MainLayoutProps> = ({ weatherdata }) => {
  return (
    <MainLayout weatherdata={weatherdata}>
      <City/>
    </MainLayout>
  );
}

export default Home;

