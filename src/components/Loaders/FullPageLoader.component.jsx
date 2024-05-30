import React from "react";
import { C } from "../../assets";
import { commonStyles } from "../../styles";
import { ActivityIndicator, View } from "react-native";

const FullPageLoader = () => (
  <View style={commonStyles.align.itemsCenter}>
    <ActivityIndicator size={"large"} color={C.colors.primary.color2} />
  </View>
);

export default FullPageLoader;
