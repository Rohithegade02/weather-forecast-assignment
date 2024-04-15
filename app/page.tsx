'use client'

import MainLayout from "./MainLayout";
import City from "./components/City";


export default function Home({weatherdata}) {

  return (
    
      <MainLayout weatherdata={weatherdata}>
      <City/>
      </MainLayout>

  );
}

