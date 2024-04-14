import { types, flow, getRoot } from "mobx-state-tree";

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
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&limit=5&appid=b2260e95f2d04e4bbf1d82758cb11e1c`
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
          console.log('Geolocations location');
          const position = yield new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });
          self.latitude = position.coords.latitude.toString();
          self.longitude = position.coords.longitude.toString();
          console.log(self.latitude, self.longitude);
          return self.fetchCityData();
        } else {
          console.error("Geolocation API is not supported in this environment");
        }
      } catch (error) {
        if (error.code === error.PERMISSION_DENIED) {
          console.error("User denied permission to access location", error);
        } else {
          console.error("Error getting user location:", error);
        }
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

const Store = types
  .model({
    cityData: types.optional(CityData, {}),
    visitedLocations: types.optional(types.array(VisitedLocation), []),
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
  }));

const store = Store.create();
store.cityData.getUserLocation();

export default store;