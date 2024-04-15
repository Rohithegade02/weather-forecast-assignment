'use client'
import React from 'react';
import { Cloud } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  weatherdata: any;
}

export const Header: React.FC<HeaderProps> = ({ weatherdata }) => {
  const router = useRouter();

  return (
    <div
     
    className="bg-white mx-auto flex justify-evenly p-5 items-center  border-4 border-gray-200 rounded-3xl w-[80%] flex-col gap-5 lg:flex-row lg:w-[50%] "
    >
      <div >
        <p
          className="font-extrabold text-[#6366F1] cursor-pointer"
          onClick={() => router.push('/')}
        >
          <Cloud />
          WeatherApp
        </p>
      </div>
      <div className="flex gap-5 flex-col items-center lg:flex-row">
        <div>
          <h1 className='font-bold text-l cursor-pointer no-underline hover:underline hover:underline-offset-4 hover:decoration-blue-500' onClick={() => router.push(`/favourite`)}>Favourite</h1>
        </div>
        <div>
          <h2 className='font-bold text-l cursor-pointer no-underline hover:underline hover:underline-offset-4 hover:decoration-blue-500' onClick={() => router.push(`/user`)}>My location</h2>
        </div>
        <div>
          <h3 className='font-bold text-l cursor-pointer no-underline hover:underline hover:underline-offset-4 hover:decoration-blue-500' onClick={() => router.push(`/historypage`)}>History</h3>
        </div>
      </div>
    </div>
  );
};
