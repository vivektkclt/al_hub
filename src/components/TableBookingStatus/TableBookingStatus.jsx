import React, { useState } from "react";
import {
  BackHandler,
  Button,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import tick from "../../assets/images/png/success.png";
import Animated, {
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { BookingStatusStyles as styles } from "./BookingStatus.styles";
import { C } from "../../assets";

export default TableBookingStatusComponent = ({ props, close }) => {
  const offset = useSharedValue(0);
  const size = useSharedValue(10);
  const opacity = useSharedValue(0);
  const [rH, setRH] = useState(false);
  const [nH, setNH] = useState(false);
  const date = new Date(props?.data?.bookingDate);
  const final = new Intl.DateTimeFormat("en-us", {
    day: "2-digit",
    month: "short",
  });
  const d = final.format(date);
  console.log(props, "props in details");
  const convertToNormalTime = (time) => {
    const timeSplit = time?.split(":");
    var hour = Number(timeSplit[0]);
    const minutes = timeSplit[1];
    var ext = "";
    if (hour > 12) {
      hour = hour - 12;
      ext = "PM";
    } else if (hour < 12) {
      ext = "AM";
    } else if (hour === 12) {
      ext = "PM";
    }
    if (timeSplit[0] === 0 || timeSplit[0] - 12 === 12) {
      ext = "PM";
    }
    return `${hour.toString().length < 2 ? 0 : ""}${hour}:${minutes} ${ext}`;
  };

  const rotateZ = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
    width: size.value,
    height: size.value,
  }));
  const aniOpacity = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  useEffect(() => {
    size.value = withDelay(
      100,
      withSpring(80, {
        mass: 1,
        damping: 13,
        stiffness: 100,
        overshootClamping: false,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 2,
        reduceMotion: ReduceMotion?.System,
      })
    );
    opacity.value = withDelay(
      100,
      withTiming(1, {
        duration: 1000,
      })
    );
  }, []);

  useEffect(() => {
    const backAction = () => {
      props?.storeId
        ? navigation.navigate("StorePage", { id: Number(props?.storeId) })
        : navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
        zIndex: 2,
      }}
    >
      <View
        style={{
          height: "80%",
          width: "90%",
          marginTop: "10%",
          backgroundColor: C.colors.primary.color1,
          borderRadius: 20,
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: 100,
              height: 80,
              marginTop: 50,
            }}
          >
            <Animated.View
              style={[
                {
                  backgroundColor: "#009000",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 60,
                  elevation: 15,
                  shadowRadius: 10,
                  shadowOffset: { width: 40, height: 40 },
                },
                rotateZ,
                aniOpacity,
              ]}
            >
              <Animated.Image
                style={[{ width: "70%", height: "70%" }]}
                source={tick}
              />
            </Animated.View>
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <Animated.Text
              style={[aniOpacity, { fontSize: 20, fontWeight: "bold" }]}
            >{`Booking Confirmed! `}</Animated.Text>
          </View>
          <View
            style={{
              borderTopWidth: 1,
              width: "90%",
              marginTop: 20,
              borderColor: "rgba(0,0,0,.3)",
            }}
          />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ alignItems: "center" }}
        >
          <View
            style={{
              width: "100%",
              padding: 20,
            }}
          >
            <View style={{ width: "100%" }}>
              <Text style={{ color: "grey" }}>booking id</Text>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                {props?.data?.id}
              </Text>
            </View>
            <View style={{ width: "100%", marginTop: 20 }}>
              <Text style={{ color: "grey" }}>status</Text>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                {props?.data?.status}
              </Text>
            </View>

            <View style={{ width: "100%", marginTop: 20 }}>
              <Text style={{ color: "grey" }}>Number of guests</Text>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                {props?.data?.numberOfGuests}
              </Text>
            </View>
            <View style={{ width: "100%", marginTop: 20 }}>
              <Text style={{ color: "grey" }}>date</Text>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>{d}</Text>
            </View>

            <View style={{ width: "100%", marginTop: 20 }}>
              <Text style={{ color: "grey" }}>From</Text>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                {convertToNormalTime(props?.data?.fromTime)}
              </Text>
            </View>
            <View style={{ width: "100%", marginTop: 20 }}>
              <Text style={{ color: "grey" }}>To</Text>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                {convertToNormalTime(props?.data?.toTime)}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
      <Pressable
        style={{
          width: "90%",
          height: 40,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: C.colors.primary.color2,
          borderRadius: 5,
        }}
        onPress={close}
      >
        <Text
          style={{ color: "white", fontWeight: "bold", fontSize: 14 }}
        >{`continue `}</Text>
      </Pressable>
    </View>
  );
};
