'use client';

import MainLayout from './MainLayout';
import './globals.css';

interface RootLayoutProps {
  children: React.ReactNode;
  weatherdata: any;
}

const RootLayout = ({ children, weatherdata }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body
        style={{
          background:
            weatherdata?.weather &&
            weatherdata.weather.length > 0 &&
            weatherdata.weather[0].main.toLowerCase() === 'clouds'
              ? 'linear-gradient(to right, #817C78, #4D4E4F, #454749)'
              : weatherdata?.weather &&
                weatherdata.weather.length > 0 &&
                weatherdata.weather[0].main.toLowerCase() === 'rain'
              ? 'linear-gradient(to right, #8AB1E2, #3F75B1, #3970AB)'
              : weatherdata?.weather &&
                weatherdata.weather.length > 0 &&
                weatherdata.weather[0].main.toLowerCase() === 'clear'
              ? 'linear-gradient(to right, #8AB1E2, #3F75B1, #3970AB)'
              : 'linear-gradient(to right, #f8fafc, #FCE7D6, #EFEEF3)',
          height: '100vh',
        } as React.CSSProperties}
      >
        <MainLayout weatherdata={weatherdata}>{children}</MainLayout>
      </body>
    </html>
  );
};

export default RootLayout;