'use client'
import React from 'react';
import { observer } from 'mobx-react-lite';
import store from '../store';
import MainLayout from '../MainLayout';

interface Location {
  name: string;
  latitude: number;
  longitude: number;
}

const Favourite = observer(() => {
  const visitedLocations: Location[] = store.favoriteLocations || [];

  return (
    <MainLayout weatherdata={null}>
      <div className='bg-gradient-to-r from-slate-50 via-[#FCE7D6] to-[#EFEEF3] flex mt-10 mx-auto gap-10 justify-center lg:w-[50%]'>
        {visitedLocations.length > 0 ? (
          <table className="bg-slate-50 w-[80%] lg:w-[100%] rounded-md">
            <thead>
              <tr className="bg-[#6366F1] px-[20px] lg:px-[50px]">
                <th className="text-[#fff] font-bold lg:p-5">Name</th>
                <th className="text-[#fff] font-bold lg:p-5">Latitude</th>
                <th className="text-[#fff] font-bold lg:p-5">Longitude</th>
              </tr>
            </thead>
            <tbody className='p-10'>
              {visitedLocations.map((location, index) => (
                <tr
                  className="text-[#8B859B] hover:bg-[#FCE7D6] px-[20px] lg:px-[20px] active:bg-[#FCE7D6] focus:outline-none focus:ring focus:ring-[FCE7D6]"
                  key={`${location.latitude}-${location.longitude}-${index}`}
                >
                  <td className="text-center p-[10px] lg:px-[50px]">{location.name}</td>
                  <td className="text-center px-[10px] lg:px-[50px]">{location.latitude}</td>
                  <td className="text-center px-[10px] lg:px-[50px]">{location.longitude}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No Favoutite locations yet.</p>
        )}
      </div>
    </MainLayout>
  );
});

export default Favourite;