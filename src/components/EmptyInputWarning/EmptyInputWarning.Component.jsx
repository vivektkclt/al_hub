import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { C } from "../../assets";
const EmptyInputWarningComponent = ({ warning, top, left }) => {
  return (
    <View style={[styles.container, { top, left }]}>
      <Text style={[styles.text]}>{warning}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingRight: 5,
    position: "absolute",
    paddingLeft: 5,
    backgroundColor: C.colors.primary.color1,
  },
  text: { color: C.colors.text.red, fontSize: 12 },
});
export default EmptyInputWarningComponent;
