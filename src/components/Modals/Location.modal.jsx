import { C } from "../../assets";
import debounce from "../../functions/debounce";
import { geocode } from "../../functions/location";
import getLocation from "../../functions/location";
import React, { useState, useCallback } from "react";
import ThemedBtn from "../../components/themedbutton";
import { SearchBox } from "../../components/searchBox";
import useLocationHandler from "../../hooks/useLocationHandler";
import {
  View,
  Text,
  Image,
  Modal,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

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
      if (typeof setList === "function" && res != null) {
        setList(res?.results[0]);
      }
    })
    .catch((e) => {});
}

const LocationModal = ({ modalState, onModalDismiss }) => {
  const { storeLocation, getLocationName, storeLocationName } =
    useLocationHandler();
  const [locationList, setLocationList] = useState(null);
  const onChooseCurrLocation = useCallback(() => {
    getLocation()
      .then((result) => {
        const location = {
          latitude: result.coords.latitude,
          longitude: result.coords.longitude,
        };
        const data = {
          address: `${location?.latitude},${location?.longitude}`,
        };
        getLocationName(data);
        storeLocation(location);
        onModalDismiss();
      })
      .catch((error) => console.error(error));
  }, []);

  const onChooseLocation = () => {
    const location = {
      place_id: locationList?.place_id,
      latitude: locationList?.geometry?.location?.lat,
      longitude: locationList?.geometry?.location?.lng,
    };
    storeLocation(location);
    const locationName = locationList?.address_components[1]
      ? locationList?.address_components[1]?.short_name
      : locationList?.address_components[0]?.short_name;
    storeLocationName(locationName);
    onModalDismiss();
  };

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={modalState}
      onRequestClose={onModalDismiss}
    >
      <View
        style={[
          styles.centeredView,
          { paddingHorizontal: (C.measures.SCREEN_WIDTH * 5) / 100 },
        ]}
      >
        <View style={styles.modalView}>
          <View style={styles.modalNav}>
            <TouchableOpacity
              onPress={onModalDismiss}
              style={{ left: -5, top: 5 }}
            >
              <Image
                resizeMode="contain"
                style={styles.modalClose}
                source={require("../../assets/icon/close.png")}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.modalContent}>
            <View style={{ borderBottomWidth: 1.5 }}>
              <SearchBox
                style={{ paddingLeft: 0 }}
                placeholder="search location"
                onChangeText={debounce(
                  (text) => update(text, setLocationList),
                  450
                )}
              />
            </View>
            {locationList != null && (
              <TouchableOpacity
                onPress={onChooseLocation}
                style={styles.locationList}
              >
                <Text>{locationList?.formatted_address}</Text>
              </TouchableOpacity>
            )}
            <View style={styles.currentLocationBtn}>
              <ThemedBtn onPress={onChooseCurrLocation}>
                <Text style={{ color: "#FFFFFF" }}>Use current location</Text>
              </ThemedBtn>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export { LocationModal };

const screenWidth = Dimensions.get("screen").width;
const styles = StyleSheet.create({
  modalNav: {
    height: 25,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  modalClose: {
    flex: 1,
    aspectRatio: 1,
  },
  modalContent: {
    padding: 25,
  },
  centeredView: {
    flex: 1,
    width: screenWidth,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.75)",
  },
  modalView: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  currentLocationBtn: {
    marginTop: 15,
    alignSelf: "center",
  },
  locationList: {
    padding: 7,
    backgroundColor: "#f1f3f1",
  },
});
