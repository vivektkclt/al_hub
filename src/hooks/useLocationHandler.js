import { useDispatch } from "react-redux";
import { geocode } from "../functions/location";
import { userSlice } from "../redux/slices/user.slice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useLocationHandler = () => {
  const dispatch = useDispatch();

  const storeLocation = async (location) => {
    await AsyncStorage.setItem("location", JSON.stringify(location));
    dispatch(userSlice.actions.setLocation(location));
  };

  const storeLocationName = async (name) => {
    await AsyncStorage.setItem("locationName", name);
    dispatch(userSlice.actions.setLocationName(name));
  };

  const removeLocation = async () => {
    await AsyncStorage.removeItem("location");
    dispatch(userSlice.actions.setLocation(null));
  };

  const getLocationName = (data) => {
    geocode(data)
      .then((res) => {
        const data = res?.results[0];
        const storeName = data?.address_components[1]
          ? data?.address_components[1]?.short_name
          : data?.address_components[0]?.short_name;
        storeLocationName(storeName);
        storeLocation({
          place_id: data?.place_id,
          latitude: data.geometry?.location?.lat,
          longitude: data.geometry?.location?.lng,
        });
      })
      .catch((e) => {});
  };

  return {
    storeLocation,
    removeLocation,
    getLocationName,
    storeLocationName,
  };
};

export default useLocationHandler;
