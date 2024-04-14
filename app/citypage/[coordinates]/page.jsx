'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const CityPage = () => {
  const router = useRouter();
  
  
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    if (router.query) {
      const { coordinates } = router.query; 
      const decodedCoordinates = decodeURIComponent(coordinates);
      const [lat, lon] = decodedCoordinates.split(',');
      setLatitude(lat);
      setLongitude(lon);
    }
  }, [router.query]);
  
  return (
    <div>
      <h1>City Page</h1>
      
      {/* Add more content or components as needed */}
    </div>
  );
};

export default CityPage;
