import { View, Text } from "react-native";
import React from "react";
import { C } from "../../assets";

const TableBookingOffersComponent = () => {
  console.log(1);
  return (
    <View
      style={{
        marginTop: 20,
        borderWidth: 0.5,
        borderRadius: 10,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{ fontSize: 28, fontWeight: "bold", color: C.colors.text.black }}
      >
        offers and benefits
      </Text>
    </View>
  );
};

export default TableBookingOffersComponent;
