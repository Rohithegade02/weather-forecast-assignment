'use client';
import { useRouter } from "next/navigation";
import store from "../store";


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

  const handleContextMenu = (event: React.MouseEvent<HTMLTableRowElement>) => {
    event.preventDefault();
    const encodedCoordinates = encodeURIComponent(`${coordinates.lat},${coordinates.lon}`);
    const url = `/citypage/?coordinates=${encodedCoordinates}`;
    window.open(url, '_blank');
    store?.addVisitedLocation(name, coordinates.lat, coordinates.lon, null);
  };

  const handleClick = () => {
    const encodedCoordinates = encodeURIComponent(`${coordinates.lat},${coordinates.lon}`);
    const url = `/citypage/?coordinates=${encodedCoordinates}`;
    router.push(url);
    store?.addVisitedLocation(name, coordinates.lat, coordinates.lon, null);
  };

  const handleFav = () => {
    // Implement favorite functionality
  };
const timezoneString=(str:string)=>{ return str.slice(0,str.indexOf('/'))}
  return (
    <tr
      className="text-[#8B859B] hover:bg-[#FCE7D6] active:bg-[#FCE7D6] focus:outline-none focus:ring focus:ring-[FCE7D6]"
    >
      <td
        className="hover:underline cursor-pointer text-center mx-[2px] p-[2px] lg:p-[10px]"
        onContextMenu={handleContextMenu}
        onClick={handleClick}
      >
        {name}
      </td>
      <td className="text-center px-[10px] lg:px-[50px]">{label_en}</td>
      <td className="text-center px-[10px] lg:px-[30px]">{population}</td>
      <td className="text-center px-[10px] lg:px-[30px] font-light">{timezoneString(timezone)}</td>
      {/* <td onClick={handleFav}>icon</td> */}
    </tr>
  );
};

export default CityTableView;