import { C } from "../../assets";
import { withHeader } from "../../hoc/withHeader";
import React, { useCallback, useEffect, useState } from "react";
import { navigator } from "../../routes/navigations";
import useLocationHandler from "../../hooks/useLocationHandler";
import getLocation, { geocode } from "../../functions/location";
import { LocateIcon, LocationBlackIcon } from "../../assets/images";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { chooseLocationStyles as styles } from "./ChooseLocation.style";
import CustomHeader from "../../components/Headers/CustomHeader.component";
import SearchContainer from "../../components/SearchContainer/SearchContainer.component";

const HeaderComponent = () => (
  <CustomHeader isBack title={C.strings.SELECT_LOCATION} />
);

function update(state, setList) {
  if (state.length === 0) {
    setList(null);
    return;
  }
  const data = {
    address: state,
  };
  geocode(data)
    .then((res) => {
      console.log(JSON.stringify(res), "LOCATION EROOR", state);
      if (typeof setList === "function" && res != null) {
        setList(res?.results);
      }
    })
    .catch((e) => {
      console.log(e, "LOCATION EROOR");
    });
}

const BodyComponent = () => {
  const [search, setSearch] = useState("");
  const { storeLocation, getLocationName, storeLocationName } =
    useLocationHandler();

  const [locationList, setLocationList] = useState([]);

  const onChooseCurrLocation = useCallback(() => {
    console.log("DATA=======");
    getLocation()
      .then(async (result) => {
        const location = {
          latitude: result.coords.latitude,
          longitude: result.coords.longitude,
        };
        const locParam = {
          latlng: result.coords.latitude + "," + result.coords.longitude,
        };
        await geocode(locParam)
          .then((res) => {
            if (res != null && res?.results.length > 0) {
              console.log("====================================");
              console.log(res?.results[0]);
              console.log("====================================");
              onChooseLocation(res?.results[0]);
            } else {
              const data = {
                address: `${location?.latitude},${location?.longitude}`,
              };
              getLocationName(data);
              storeLocation(location);
            }
          })
          .catch((e) => {
            console.log(e, "LOCATION EROOR");
          });

        navigator.navigate("HomeNavigation");
      })
      .catch((error) => console.error(error));
  }, []);

  const onChooseLocation = (locationData) => {
    const location = {
      place_id: locationData?.place_id,
      latitude: locationData?.geometry?.location?.lat,
      longitude: locationData?.geometry?.location?.lng,
    };
    console.log("====================================");
    console.log(location);
    console.log("====================================");
    storeLocation(location);
    const locationName = locationData?.address_components[1]
      ? locationData?.address_components[1]?.short_name
      : locationData?.address_components[0]?.short_name;
    storeLocationName(locationName);
    navigator.goBack();
  };

  const onChangeText = (text) => {
    setSearch(text);
    update(text, setLocationList);
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.currentLocBtn}
      onPress={() => onChooseLocation(item)}
    >
      <LocationBlackIcon />
      <Text style={styles.drk}>{item?.formatted_address}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.main}>
      <SearchContainer
        hideIcon
        value={search}
        onChange={onChangeText}
        containerStyle={styles.searchStyle}
        placeholder={"Search for area, street name.."}
      />
      <TouchableOpacity
        style={styles.currentLocBtn}
        onPress={onChooseCurrLocation}
      >
        <LocateIcon />
        <Text style={styles.drk}>Use your current Location</Text>
      </TouchableOpacity>
      <FlatList
        bounces={false}
        data={locationList}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item?.place_id?.toString()}
      />
    </View>
  );
};

const ChooseLocationPage = withHeader({ HeaderComponent, BodyComponent });

export default ChooseLocationPage;
