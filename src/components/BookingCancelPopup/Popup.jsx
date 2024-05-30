import {
  Dimensions,
  Image,
  Pressable,
  StatusBar,
  Text,
  View,
} from "react-native";
import React from "react";
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";
import { C } from "../../assets";

const Popup = ({ setShowPopup, props }) => {
  const SCREEN_HEIGHT = C.measures.SCREEN_HEIGHT;
  /*  const bottomTabHeight =
    Dimensions.get("screen").height -
    Dimensions.get("window").height -
    StatusBar.currentHeight;

  const noBootomTabHeight = Math.abs(
    Dimensions.get("screen").height - Dimensions.get("window").height
  );
  const SCREEN_HEIGH =
    bottomTabHeight > 0
      ? Dimensions.get("window").height -
        StatusBar.currentHeight -
        bottomTabHeight
      : Dimensions.get("screen").height -
        StatusBar.currentHeight -
        noBootomTabHeight; */

  /*   const show = useSharedValue(false);

  const showStyle = {
    duration: 200,
  };
  const hideStyle = {
    duration: 400,
  }; */

  /* const position = useDerivedValue(() => {
    return show.value ? withTiming(1, showStyle) : withTiming(0, hideStyle);
  });
  const animatedStyle = useAnimatedStyle(() => {
    const pos = interpolate(
      position.value,
      [0, 1],
      [50, -30],
      Extrapolate.CLAMP
    );
    return { transform: [{ translateY: pos }] };
  }); */

  /* useEffect(() => {
    show.value = showPopup;
  }, [showPopup]); */
  return (
    <View
      style={[
        {
          position: "absolute",
          alignSelf: "center",
          top: SCREEN_HEIGHT - 50,
          width: "95%",
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "space-between",
          height: 45,
          flexDirection: "row",
          borderRadius: 8,
          paddingHorizontal: 10,
          elevation: 1,
          zIndex: 1,
        },
      ]}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {props?.status && (
          <Image
            style={{ height: 17, width: 17, marginRight: 10 }}
            source={
              props?.status === "error"
                ? require("../../assets/images/png/errorStatus.png")
                : require("../../assets/images/png/successStatus.png")
            }
          />
        )}
        <Text style={{ color: C.colors.text.black }} numberOfLines={2}>
          {props?.message || ""}
        </Text>
      </View>
      <Pressable onPress={setShowPopup} style={{ padding: 6 }}>
        <Image
          source={require("../../assets/icon/close.png")}
          style={{ height: 20, width: 20 }}
        />
      </Pressable>
    </View>
  );
};

export default Popup;
