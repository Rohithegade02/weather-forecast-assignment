import { types, flow } from "mobx-state-tree";

const CityData = types
  .model({
    latitude: types.maybeNull(types.string),
    longitude: types.maybeNull(types.string),
    data: types.frozen(),
  })
  .actions((self) => ({
    setCoordinates(coordinates) {
      const decodedCoordinates = decodeURIComponent(coordinates);
      const [lat, lon] = decodedCoordinates.split(",");
      self.latitude = lat;
      self.longitude = lon;
    },
    fetchCityData: flow(function* () {
      try {
        const latitude = self.latitude;
        const longitude = self.longitude;
        if (latitude && longitude) {
          const response = yield fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&limit=5&appid=${process.env.NEXT_PUBLIC_API_KEY}`
          );
          const responseData = yield response.json();
          self.data = responseData;
          return self.data;
        }
      } catch (error) {
        console.error("Error fetching city data:", error);
      }
    }),
    getUserLocation: flow(function* () {
      try {
        if (navigator && navigator.geolocation) {
        
          const position = yield new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });
          self.latitude = position.coords.latitude.toString();
          self.longitude = position.coords.longitude.toString();
          
          return self.fetchCityData();
        } else {
          console.error("Geolocation API is not supported in this environment");
        }
      } catch (error) {
       console.log(error)
      }
    }),
  }));

const VisitedLocation = types
  .model({
    name: types.string,
    latitude: types.number,
    longitude: types.number,
    data: types.frozen(),
  })
  .actions((self) => ({}));

const FavoriteLocation = types
  .model({
    name: types.string,
    latitude: types.number,
    longitude: types.number,
  })
  .actions((self) => ({}));

const Store = types
  .model({
    cityData: types.optional(CityData, {}),
    visitedLocations: types.optional(types.array(VisitedLocation), []),
    favoriteLocations: types.optional(types.array(FavoriteLocation), []),
  })
  .actions((self) => ({
    addVisitedLocation(name: string, latitude: number, longitude: number, data: any) {
      const existingLocation = self.visitedLocations.find(
        (loc) => loc.latitude === latitude && loc.longitude === longitude
      );
      if (!existingLocation) {
        self.visitedLocations.push({ name, latitude, longitude, data });
      }
    },
    addFavoriteLocation(name: string, latitude: number, longitude: number) {
      const existingLocation = self.favoriteLocations.find(
        (loc) => loc.latitude === latitude && loc.longitude === longitude

      );
     
      if (!existingLocation) {
        self.favoriteLocations.push({ name, latitude, longitude });
      }
    },
    removeFavoriteLocation(name: string, latitude: number, longitude: number) {
      const index = self.favoriteLocations.findIndex(
        (loc) => loc.latitude === latitude && loc.longitude === longitude
      );
      if (index !== -1) {
        self.favoriteLocations.splice(index, 1);
      }
    },
  }));

const store = Store.create();
store.cityData.getUserLocation();

export default store;