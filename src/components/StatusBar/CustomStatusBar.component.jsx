import React from "react";
import { StatusBar, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { C } from "../../assets";

const CustomStatusBar = ({ backgroundColor, barStyle, enableTop = true }) => {
  const insets = useSafeAreaInsets();
  return (
    <>
      {enableTop && (
        <View
          style={{
            height: insets.top,
            backgroundColor: backgroundColor
              ? backgroundColor
              : C.colors.primary.color1,
          }}
        />
      )}
      <StatusBar
        translucent
        animated={true}
        showHideTransition="fade"
        backgroundColor="transparent"
        barStyle={barStyle ? barStyle : "dark-content"}
      />
    </>
  );
};

export default CustomStatusBar;
