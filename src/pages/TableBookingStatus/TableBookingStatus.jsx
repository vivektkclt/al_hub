import React from "react";
import { BackHandler, Pressable, Text, View } from "react-native";
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
import { C } from "../../assets";

export default BookingStatus = () => {
  const route = useRoute();
  const props = route?.params;
  const navigation = useNavigation();
  const offset = useSharedValue(0);
  const size = useSharedValue(10);
  const opacity = useSharedValue(0);
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
          alignItems: "center",
          justifyContent: "space-around",
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
        </View>
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
        onPress={() =>
          navigation.navigate("TableBookingHistory", {
            storeId: props?.storeId,
          })
        }
      >
        <Text
          style={{
            color: C.colors.text.color1,
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          {C.strings.CONTINUE}
        </Text>
      </Pressable>
    </View>
  );
};
