import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
} from "react-native";
import React from "react";
import {
  CategoryFocusedIcon,
  CategoryIcon,
  HomeFocusedIcon,
  LocationRedIcon,
  LoveFocusedIcon,
  LoveIcon,
  ProfileFocusedIcon,
  ProfileIcon,
  SearchHomeFocusedIcon,
  SearchIcon,
} from "../../assets/images";
import { commonStyles } from "../../styles";
import { C } from "../../assets";
import pngImages from "../../assets/images/png";
import SeacrhContainer from "../../components/SearchContainer/SearchContainer.component";
import Tooltip from "react-native-walkthrough-tooltip";
import strings from "../../assets/values/strings";
import { useState } from "react";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import getLocation, { geocode } from "../../functions/location";
import useLocationHandler from "../../hooks/useLocationHandler";

const setIsFirst = async () => {
  await AsyncStorage.setItem("isFirst", JSON.stringify(true));
};
const Tour = ({ navigation }) => {
  const { storeLocation, getLocationName, storeLocationName } =
    useLocationHandler();
  const [tour, setTour] = useState(null);
  useEffect(() => {
    setTimeout(() => {
      setTour(1);
    }, 1000);
  }, []);

  const updateCurrentLocation = () => {
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

        navigation.reset({
          index: 0,
          routes: [{ name: "HomeNavigation" }],
        });
      })
      .catch((error) => console.error(error));
  };

  const onChooseLocation = (locationData) => {
    const location = {
      place_id: locationData?.place_id,
      latitude: locationData?.geometry?.location?.lat,
      longitude: locationData?.geometry?.location?.lng,
    };
    storeLocation(location);
    const locationName = locationData?.address_components[1]
      ? locationData?.address_components[1]?.short_name
      : locationData?.address_components[0]?.short_name;
    storeLocationName(locationName);
    navigator.goBack();
  };
  const renderContent = (data, isFinish = false) => (
    <View>
      <Text
        style={{
          color: C.colors.text.black,
          fontWeight: "bold",
          fontSize: 24,
          paddingBottom: 5,
        }}
      >
        {data.title}
      </Text>
      <Text
        style={{
          fontWeight: "500",
          lineHeight: 18,
          color: C.colors.text.black,
        }}
      >
        {data?.message}
      </Text>
      <View
        style={{
          height: 30,
          // backgroundColor: "yellow",
          marginTop: 30,
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        {!isFinish ? (
          <TouchableOpacity
            onPress={() => {
              setTour(null);
              setIsFirst();
              updateCurrentLocation();
            }}
          >
            <Text
              style={{
                color: C.colors.text.black,
                fontWeight: "bold",
                fontSize: 15,
              }}
            >
              Skip
            </Text>
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity
          onPress={() => {
            if (tour === 5) {
              setTour(null);
              setIsFirst();
              updateCurrentLocation();
            } else {
              setTour(tour + 1);
            }
          }}
          style={[
            styles.toolBtn,
            { marginLeft: 10, backgroundColor: C.colors.primary.color },
          ]}
        >
          <Text
            style={{
              color: C.colors.text.color1,
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            {!isFinish ? "Next" : "Finish"}
          </Text>
          <Image
            style={{ height: 20, width: 20, marginLeft: 5 }}
            source={pngImages.arrow}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <View>
      <View style={{ height: "30%" }}>
        <ImageBackground source={pngImages.tourBanner} style={{ flex: 1 }}>
          <View style={[styles.locIcon, commonStyles.align.row]}>
            <Tooltip
              isVisible={tour === 1}
              contentStyle={[
                styles.toolContent,
                { left: Platform.OS == "ios" ? -15 : -18, bottom: 0 },
              ]}
              content={renderContent({
                message: strings.LOCATION_TOUR_MSG,
                title: "Location",
              })}
              placement="bottom"
              onClose={() => setTour(2)}
            >
              <LocationRedIcon />
            </Tooltip>
            <Text style={styles.txtWhite}>Dubai</Text>
          </View>
          <Tooltip
            isVisible={tour === 2}
            contentStyle={[styles.toolContent, { bottom: 0 }]}
            content={renderContent({
              title: "Search",
              message: strings.SEARCH_TOUR_MSG,
            })}
            placement="bottom"
            onClose={() => setTour(3)}
          >
            <View
              style={{ width: "95%", alignSelf: "center", marginTop: "34%" }}
            >
              <SeacrhContainer
                disabled={true}
                value={"Search for attractions"}
              />
            </View>
          </Tooltip>
        </ImageBackground>
      </View>
      <ImageBackground
        resizeMode="stretch"
        style={{
          resizeMode: "cover",
          height: "82%",
          padding: 30,
          // justifyContent: "flex-end",
        }}
        source={pngImages.tourImg}
      >
        <View
          style={{
            width: "100%",
            height: 60,
            backgroundColor: C.colors.primary.color1,
            top: 420,
            borderRadius: 100,
            alignSelf: "center",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <View style={styles.focusedIcon}>
            <HomeFocusedIcon />
          </View>

          <Tooltip
            isVisible={tour === 3}
            contentStyle={styles.toolContent}
            content={renderContent({
              title: "Categories",
              message: strings.CATEGORY_TOUR_MSG,
            })}
            placement="top"
            onClose={() => setTour(4)}
          >
            <View style={tour === 3 ? styles.focusedMenu : styles.icon}>
              {tour === 3 ? <CategoryFocusedIcon /> : <CategoryIcon />}
            </View>
          </Tooltip>
          <View style={tour === 2 ? styles.focusedMenu : styles.icon}>
            {tour === 2 ? <SearchHomeFocusedIcon /> : <SearchIcon />}
          </View>
          <Tooltip
            isVisible={tour === 4}
            contentStyle={styles.toolContent}
            content={renderContent({
              title: "Favorites",
              message: strings.FAVORITES_TOUR_MSG,
            })}
            placement="top"
            onClose={() => setTour(5)}
          >
            <View style={tour === 4 ? styles.focusedMenu : styles.icon}>
              {tour === 4 ? <LoveFocusedIcon /> : <LoveIcon />}
            </View>
          </Tooltip>

          <Tooltip
            isVisible={tour === 5}
            contentStyle={styles.toolContent}
            content={renderContent(
              { title: "Profile", message: strings.PROFILE_TOUR_MSG },
              true
            )}
            placement="top"
            onClose={() => {
              setTour(null);
              setIsFirst();
              updateCurrentLocation();
            }}
          >
            <View style={tour === 5 ? styles.focusedMenu : styles.icon}>
              {tour !== 5 ? <ProfileIcon /> : <ProfileFocusedIcon />}
            </View>
          </Tooltip>
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  locIcon: {
    left: 15,
    height: 50,
    marginTop: 35,
    minWidth: "30%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  toolLoc: {
    left: -15,
    height: 120,
    paddingTop: 20,
    minWidth: "30%",
    paddingRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  txtWhite: {
    left: 10,
    fontSize: 16,
    fontStyle: "normal",
    color: C.colors.primary.color1,
  },
  focusedIcon: {
    width: "25%",
    backgroundColor: C.colors.primary.color,
    height: "70%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  toolContent: {
    minHeight: 180,
    // justifyContent: "center",
    padding: 15,
    paddingTop: 30,
    // bottom: 20,
  },
  toolBtn: {
    width: "30%",
    height: "95%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: C.colors.border.grey,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  focusedMenu: {
    backgroundColor: C.colors.primary.color,
    width: 50,
    height: 50,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    // position: "absolute",
    // bottom: 20,
  },
  icon: {
    backgroundColor: C.colors.primary.color1,
  },
});
export default Tour;
