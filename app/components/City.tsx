import React, { useState, useEffect } from "react";
import CityTableView from './CityTableView';
import Shimmer from './Shimmer';
import RootLayout from "../layout";
import MainLayout from "../MainLayout";

interface City {
  name: string;
  cou_name_en: string;
  population: number;
  timezone: string;
}

const City = () => {
  const [cityData, setCityData] = useState<City[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [filteredData, setFilteredData] = useState<City[]>([]);
  const [suggest, setSuggest] = useState<City[]>([]);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    getCityData();
    
  }, []);

  const getCityData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=100&_page=${page}`);
      const data = await response.json();
      setCityData(prevData => [...prevData, ...data.results]);
      setFilteredData(prevData => [...prevData, ...data.results]);
      setPage(prevPage => prevPage + 1);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      getCityData();
      console.log('function()')
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleInput = (value: string) => {
    setSearch(value);
    if (value.length >= 2) {
      const suggestions = cityData.filter(city => city.name.toLowerCase().startsWith(value.toLowerCase())).slice(0, 5);
      setSuggest(suggestions);
    } else {
      setSuggest([]);
    }
  };

  const handleSearch = (search: string) => {
    if (search.trim() === '') {
      setFilteredData(cityData);
    } else {
      const data = cityData.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
      setFilteredData(data);
    }
  };

  const handleSuggestionClick = (suggestion: City) => {
    setSearch(suggestion.name);
    handleSearch(suggestion.name);
    setSuggest([]);
  };

  const handleSort = (column: keyof City) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortColumn) {
      if (sortColumn === 'population') {
        return sortOrder === "asc" ? a[sortColumn] - b[sortColumn] : b[sortColumn] - a[sortColumn];
      } else {
        return sortOrder === "asc" ? a[sortColumn].localeCompare(b[sortColumn]) : b[sortColumn].localeCompare(a[sortColumn]);
      }
    }
    return 0;
  });

  return (
    <MainLayout >
      <div className="bg-gradient-to-r from-slate-50 via-[#FCE7D6] to-[#EFEEF3] flex flex-col items-center mt-5 gap-10">
        <div>
          <input
            type="search"
            value={search}
            className="p-2.5 rounded mx-5"
            placeholder="Search.."
            onChange={(e) => handleInput(e.target.value)}
          />
          <button
            onClick={() => handleSearch(search)}
            className="bg-indigo-500 hover:bg-indigo-600 text-slate-50 py-2 px-5 rounded"
          >
            Search
          </button>
          {suggest.length > 0 && (
            <ul className="w-[17vw] cursor-pointer">
              {suggest.map((suggestion, index) => (
                <li
                  key={index}
                  className="mt-0.5 p-1 ml-5 bg-slate-100 border-b-black"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex mx-2 lg:justify-center">
          {loading ? (
            <Shimmer />
          ) : (
            <table className="bg-slate-50 w-[50%] lg:w-[100%] rounded-md">
              <thead className="rounded-md">
                <tr  className="bg-[#6366F1] lg:px-[50px]">
                  <th
                      
                      className="text-[#fff] font-bold lg:p-5"
                    onClick={() => handleSort("name")}
                  >
                    CITY {sortColumn === "name" && <span>{sortOrder === "asc" ? "▲" : "▼"}</span>}
                  </th>
                  <th
                     className="text-[#fff] font-bold lg:p-5"
                    onClick={() => handleSort("cou_name_en")}
                  >
                    COUNTRY {sortColumn === "cou_name_en" && <span>{sortOrder === "asc" ? "▲" : "▼"}</span>}
                  </th>
                  <th
                     className="text-[#fff] font-bold lg:p-5"
                    onClick={() => handleSort("population")}
                  >
                    POPULATION {sortColumn === "population" && <span>{sortOrder === "asc" ? "▲" : "▼"}</span>}
                  </th>
                  <th
                     className="text-[#fff] font-bold lg:p-5"
                    onClick={() => handleSort("timezone")}
                  >
                    ZONE {sortColumn === "timezone" && <span>{sortOrder === "asc" ? "▲" : "▼"}</span>}
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedData.map((city, index) => (
                  <CityTableView key={index} {...city} />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default City;
