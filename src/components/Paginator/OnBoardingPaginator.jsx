import React from "react";
import { C } from "../../assets";
import { commonStyles } from "../../styles";
import { Animated, StyleSheet, View } from "react-native";

const width = C.measures.SCREEN_WIDTH;

const OnBoardingPaginator = ({ data, scrollX }) => (
  <View style={[commonStyles.align.row, styles.spacer]}>
    {data.map((_, i) => {
      const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
      const dotWidth = scrollX.interpolate({
        inputRange,
        outputRange: [10, 40, 10],
        extrapolate: "clamp",
      });
      const opacity = scrollX.interpolate({
        inputRange,
        outputRange: [0.3, 1, 0.3],
        extrapolate: "clamp",
      });
      return (
        <Animated.View
          key={i.toString()}
          style={[styles.dot, { width: dotWidth, opacity }]}
        />
      );
    })}
  </View>
);

export default OnBoardingPaginator;

const styles = StyleSheet.create({
  spacer: {
    marginBottom: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderRadius: 90,
    marginHorizontal: 8,
    backgroundColor: C.colors.primary.color1,
  },
});
