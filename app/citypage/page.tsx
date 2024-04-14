'use client'
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import RootLayout from "../layout";
import Shimmer from "../components/Shimmer";
import store from "../store";

interface WeatherData {
  weather: {
    main: string;
    description: string;
  }[];
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  coord: {
    lon: number;
    lat: number;
  };
  wind: {
    speed: number;
  };
  name: string
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
}

const CityPage: React.FC = observer(() => {
  const searchParams = useSearchParams();
  const coordinates = searchParams.get('coordinates');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [weatherdata, setWeatherData] = useState<WeatherData | null>(null);
console.log(weatherdata)
  useEffect(() => {
    if (coordinates) {
      store.cityData.setCoordinates(coordinates);
    }
  }, [coordinates]);

  useEffect(() => {
    getWeatherData();  
  }, [store.cityData.latitude, store.cityData.longitude]);

  async function getWeatherData() {
    try {
      
      setIsLoading(true);
      const data: WeatherData = await store.cityData.fetchCityData();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const temperatureToCelsius = (temp: number) => Math.round(temp - 273.15);
  const captialize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  return isLoading ? <Shimmer/>:(
    <RootLayout weatherdata={weatherdata}>
      <div style={{
       background: weatherdata?.weather && weatherdata.weather.length > 0 && weatherdata.weather[0].main.toLowerCase() === 'clouds'
          ? 'linear-gradient(to right, #817C78, #4D4E4F, #454749)'
          : weatherdata?.weather && weatherdata.weather.length > 0 && weatherdata.weather[0].main.toLowerCase() === 'rain'
            ? 'linear-gradient(to right, #8AB1E2, #3F75B1, #3970AB)'
            : weatherdata?.weather && weatherdata.weather.length > 0 && weatherdata.weather[0].main.toLowerCase() === 'clear' 
            ? 'linear-gradient(to right, #8AB1E2, #3F75B1, #3970AB)'
            : 'linear-gradient(to right, #8AB1E2, #3F75B1, #3970AB)',
    height:'100vh'
        
      }}>
        {
          weatherdata &&
          <div className="flex flex-col items-center lg:flex-row justify-center">
              <div className="flex mt-10">
              {weatherdata.weather && weatherdata.weather[0].main.toLowerCase().includes('rain') ? <span className="text-[15rem] lg:text-[25rem]">🌧️</span> : null}
              {weatherdata.weather && weatherdata.weather[0].main.toLowerCase().includes('heavy') ? <span className="text-[15rem] lg:text-[25rem]">🌧️</span> : null}
              {weatherdata.weather && weatherdata.weather[0].main.toLowerCase().includes('clouds') ? <span className="text-[15rem] lg:text-[25rem]">☁️</span> : null}
              {weatherdata.weather && weatherdata.weather[0].main.toLowerCase().includes('clear') ? <span className="text-[15rem] lg:text-[25rem]">☀️</span> : null}
              </div>
              <div className="flex justify-center items-center flex-col">
                <div className="text-[100px] font-light text-slate-50">
                  <p>{weatherdata.main ? temperatureToCelsius(weatherdata.main.temp) + '°C' : ''}</p>
                </div>
                <div className="text-[40px] font-normal text-slate-50">
                <p>{weatherdata.weather && weatherdata.weather.length > 0 ? weatherdata.weather[0].main : ''}</p>
                </div>
                <div>
                  <p className="text-[30px] font-extrabold text-slate-50">{weatherdata?.name},{weatherdata?.sys?.country }</p>
                </div>
                <div className="flex justify-center items-center gap-5 lg:gap-10">
                  <div>
                  <span style={{ fontSize: '4rem' }}>💦</span>
                  <p className="text-l font-extrabold text-slate-50">{weatherdata?.main?.humidity}% Humidity</p>
                  </div>
                  <div className="flex items-center justify-center">
                  <span style={{ fontSize: '4rem' }}>💨</span>
                    <p className="text-l font-extrabold text-slate-50"  >{weatherdata.wind.speed} km/h</p>
                    
                  </div>
                </div>
              </div>
          </div>
        }
      </div>
    </RootLayout>
  );
});

export default CityPage;
