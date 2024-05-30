import React from "react";
import { View } from "react-native";
import { commonStyles } from "../../styles";
import LottieView from "lottie-react-native";

export default function SkeltonLoader({ style }) {
  return (
    <View style={[style, { overflow: "hidden" }]}>
      <LottieView
        loop
        autoPlay
        resizeMode={"center"}
        style={commonStyles.align.flex1}
        source={require("../../assets/animation/skelton.json")}
      />
    </View>
  );
}
