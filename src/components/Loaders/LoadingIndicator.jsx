import React from "react";
import { C } from "../../assets";
import { commonStyles } from "../../styles";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const LoadingIndicator = () => (
  <View
    style={[
      styles.loader,
      commonStyles.align.absolute,
      commonStyles.align.pageFull,
    ]}
  >
    <ActivityIndicator
      style={styles.indicatorStyle}
      size={"large"}
      color={C.colors.primary.color2}
    />
  </View>
);

export default LoadingIndicator;

const styles = StyleSheet.create({
  loader: {
    backgroundColor: C.colors.bg.shadow,
  },
  indicatorStyle: {
    marginTop: 250,
  },
});
