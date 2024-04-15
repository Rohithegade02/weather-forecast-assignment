'use client';
import { useRouter } from "next/navigation";
import store from "../store";
import { Star } from "lucide-react";
import { boolean } from "mobx-state-tree/dist/internal";
import { useEffect, useState } from "react";


interface CityTableViewProps {
  name: string;
  label_en: string;
  population: number;
  timezone: string;
  coordinates: {
    lat: number;
    lon: number;
  };
}

const CityTableView: React.FC<CityTableViewProps> = ({
  name,
  label_en,
  population,
  timezone,
  coordinates,
}) => {
  const router = useRouter();       
  const [isFill, setIsFill] = useState<boolean>(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  //right click navigate to the city weather details
  const handleContextMenu = (event: React.MouseEvent<HTMLTableRowElement>) => {
    event.preventDefault();
    const encodedCoordinates = encodeURIComponent(`${coordinates.lat},${coordinates.lon}`);
    const url = `/citypage/?coordinates=${encodedCoordinates}`;
    window.open(url, '_blank');
    store?.addVisitedLocation(name, coordinates.lat, coordinates.lon, null);
  };
//On click navigate to city weather
  const handleClick = () => {
    const encodedCoordinates = encodeURIComponent(`${coordinates.lat},${coordinates.lon}`);
    const url = `/citypage/?coordinates=${encodedCoordinates}`;
    router.push(url);
    store?.addVisitedLocation(name, coordinates.lat, coordinates.lon, null);
  };

  //favorite city location
  const handleFav = () => {
    setIsFill(!isFill);
    if (!isFill) {
      store?.addFavoriteLocation(name, coordinates.lat, coordinates.lon)
    } else {
      store?.removeFavoriteLocation(name,coordinates.lat,coordinates.lon)
    }
  };

  const timezoneString = (str: string) => { return str.slice(0, str.indexOf('/')) }
 
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <tr
      className="text-[#8B859B] hover:bg-[#FCE7D6] active:bg-[#FCE7D6] focus:outline-none focus:ring focus:ring-[FCE7D6]"
    >
      <td
        className="hover:underline cursor-pointer text-center mx-[2px] lg:p-[2px] p-[1px] lg:p-[10px]"
        onContextMenu={()=>handleContextMenu}
        onClick={handleClick}
      >
        {name}
      </td>
      <td className="text-center px-[1px] lg:py-[10px] lg:px-[50px]">{label_en}</td>
      <td className="text-center px-[1px] lg:py-[10px] lg:px-[30px]">{population}</td>
      <td className="text-center px-[1px] lg:py-[10px] lg:px-[30px] font-light">{timezoneString(timezone)}</td>
      <td  style={{ display: isMobile ? 'none' : '', width: isMobile ? 0 : 'auto', overflow: isMobile ? 'hidden' : 'visible' }}><Star onClick={handleFav} fill={isFill ?'gold':'white'} strokeWidth={isFill ? 0 : 2}
        stroke="currentColor"
        size={24} /></td> 
    </tr>
  );
};

export default CityTableView;