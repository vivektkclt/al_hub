// import { getLocation } from "graphql";
import { Linking, Platform } from "react-native";
import getLocation from "../../functions/location";
const checkAndOpenCabApp = async (location) => {
  const uberClientId = "w0-UfZC4Pfks2eugPu7gxLJqdx-qeg5y";
  try {
    getLocation()
      .then(async (result) => {
        const userLocation = {
          latitude: result.coords.latitude,
          longitude: result.coords.longitude,
        };

        const uberWebsite =
          "https://m.uber.com/ul/?client_id=" +
          uberClientId +
          "&action=setPickup&pickup[latitude]=" +
          userLocation?.latitude +
          "&pickup[longitude]=" +
          userLocation?.longitude +
          "&dropoff[latitude]=" +
          location?.latitude +
          "&dropoff[longitude]=" +
          location?.longitude;
        Linking.openURL(uberWebsite);
      })
      .catch((error) => console.error(error));

    // Linking.openURL(uber);
  } catch (error) {
    Linking.openURL("https://www.uber.com/");
  }
};

// Call the function to check and open the app or website
export default checkAndOpenCabApp;
