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

export default BookingStatusComponent = ({ props, close }) => {
  console.log(props);
  const offset = useSharedValue(0);
  const size = useSharedValue(10);
  const opacity = useSharedValue(0);
  const [rH, setRH] = useState(false);
  const [nH, setNH] = useState(false);
  const date = new Date(props?.data?.clinicSlots[0]?.date);
  const final = new Intl.DateTimeFormat("en-us", {
    day: "2-digit",
    month: "short",
  });
  const d = final.format(date);

  const convertToNormalTime = () => {
    var hour = Number(
      { ...props?.data }?.clinicSlots[0]?.timeSlots.slice(0, 2)
    );
    const minutes = { ...props?.data }?.clinicSlots[0]?.timeSlots.slice(2, 5);
    var ext = "";
    if (hour > 12) {
      hour = hour - 12;
      ext = "PM";
    } else if (hour < 12) {
      ext = "AM";
    } else if (hour === 12) {
      ext = "PM";
    }
    if (hour === 0 || hour - 12 === 12) {
      ext = "PM";
    }
    return `${hour.toString().length < 2 ? 0 : ""}${hour}${minutes} ${ext}`;
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
    <View style={[styles.container]}>
      <View style={[styles.statusContainer]}>
        <View style={[styles.animationContainer]}>
          <View style={[styles.imageContainer]}>
            <Animated.View style={[styles.imageWrapper, rotateZ, aniOpacity]}>
              <Animated.Image style={[styles.imageStyle]} source={tick} />
            </Animated.View>
          </View>
          <View style={[styles.successTitleWrapper]}>
            <Animated.Text
              style={[aniOpacity, styles.successTitle]}
            >{`Booking Confirmed! `}</Animated.Text>
          </View>
          <View style={styles.seperator} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ alignItems: "center" }}
        >
          <View style={[styles.detailsContainer]}>
            <View style={[styles.detailsWrapper]}>
              <Text style={[styles.detailsKey]}>booking id</Text>
              <Text style={[styles.details]}>{props?.data?.id}</Text>
            </View>
            <View style={[styles.detailsWrapper]}>
              <Text style={[styles.detailsKey]}>status</Text>
              <Text style={[styles.details]}>{props?.data?.status}</Text>
            </View>
            <View style={[styles.detailsWrapper]}>
              <Text style={[styles.detailsKey]}>Booking for</Text>
              <Text style={[styles.details]}>
                {props?.data?.bookingFor === "myself"
                  ? props?.data?.fullName
                  : props?.data?.bookingFor}
              </Text>
            </View>
            <View style={[styles.detailsWrapper]}>
              <Text style={[styles.detailsKey]}>Phone number</Text>
              <Text style={[styles.details]}>{props?.data?.phoneNumber}</Text>
            </View>
            <View style={[styles.detailsWrapper]}>
              <Text style={[styles.detailsKey]}>date</Text>
              <Text style={[styles.details]}>
                {d + " - " + convertToNormalTime("")}
              </Text>
            </View>
            <View style={[{ width: "100%", marginTop: 20 }]}>
              <Text style={[styles.detailsKey]}>reason for visit</Text>
              <Text style={[styles.para, !rH && styles.height]}>
                {props?.data?.reasonForVisit}
              </Text>
              {props?.data?.reasonForVisit.length > 100 && (
                <Pressable onPress={() => setRH((prev) => !prev)}>
                  <Text style={{ color: C.colors.text.secondary6 }}>
                    view more
                  </Text>
                </Pressable>
              )}
            </View>
            <View
              style={[
                { width: "100%" },
                props?.data?.reasonForVisit.length > 100 && styles.marTop20,
              ]}
            >
              <Text style={[styles.detailsKey]}>notes :</Text>
              <Text style={[[styles.para], !nH && styles.height]}>
                {props?.data?.notes}
              </Text>
              {props?.data?.notes.length > 100 && (
                <Pressable onPress={() => setNH((prev) => !prev)}>
                  <Text style={{ color: C.colors.text.secondary6 }}>
                    view more
                  </Text>
                </Pressable>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
      <Pressable
        style={{
          width: "90%",
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: C.colors.primary.color2,
          borderRadius: 5,
        }}
        onPress={close}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
          {C.strings.CONTINUE}
        </Text>
      </Pressable>
    </View>
  );
};
