import { View, Text, Image } from "react-native";
import React from "react";
import emptySlotsIcon from "../../assets/images/png/emptyslots.png";
import emptyCalendar from "../../assets/images/png/emptyCalendar.png";
import { C } from "../../assets";
const EmptySlotsWarning = ({
  containerHeight = 280,
  imgHeight = 200,
  imgWidth = 200,
  text = "",
}) => {
  return (
    <View
      style={{
        width: "100%",
        height: containerHeight,
        alignItems: "center",
        justifyContent: "space-around",
        marginTop: "15%",
      }}
    >
      <Image
        style={{ width: imgHeight, height: imgWidth }}
        source={emptyCalendar}
      />
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          textAlign: "center",
          color: C.colors.text.black,
        }}
      >
        Oops !
      </Text>
      <Text
        style={{
          fontSize: 14,
          textAlign: "center",
          color: C.colors.text.faded,
        }}
      >
        {text}
      </Text>
    </View>
  );
};

export default EmptySlotsWarning;
