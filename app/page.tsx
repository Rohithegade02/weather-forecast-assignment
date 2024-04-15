'use client'
import React from 'react';
import MainLayout from "./MainLayout";
import City from "./components/City";



const Home: React.FC = () => {
  return (
    <MainLayout weatherdata={null} >
      <City/>
    </MainLayout>
  );
}

export default Home;

