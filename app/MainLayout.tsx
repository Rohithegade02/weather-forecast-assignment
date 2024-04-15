'use client';
import { Header } from './Header';
import './globals.css';

interface MainLayoutProps {
  children: React.ReactNode;
  weatherdata: any;
}

const MainLayout = ({ children, weatherdata } :MainLayoutProps) => {
 
  return (
      <div  style={{
        background: weatherdata?.weather && weatherdata.weather.length > 0 && weatherdata.weather[0].main.toLowerCase() === 'clouds'
        ? 'linear-gradient(to right, #A2B2CB, #72839F, #475973)'
        : weatherdata?.weather && weatherdata.weather.length > 0 && weatherdata.weather[0].main.toLowerCase() === 'rain'
          ? 'linear-gradient(to right, #817C78, #4D4E4F, #454749)'
          : weatherdata?.weather && weatherdata.weather.length > 0 && weatherdata.weather[0].main.toLowerCase() === 'clear'
            ? 'linear-gradient(to right, #8AB1E2, #3F75B1, #3970AB)'
            : 'linear-gradient(to right, #f8fafc, #FCE7D6, #EFEEF3)',
      minHeight: '100vh',
        paddingTop: '2rem'
      } as React.CSSProperties}>
      <Header weatherdata={weatherdata} />
      {children}
    </div>
  );
};

export default MainLayout;