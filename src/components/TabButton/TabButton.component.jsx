import React from "react";
import { C } from "../../assets";
import { commonStyles } from "../../styles";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const TabButton = ({ isDisabled, isActive, hideBtm, placeHolder, onTabHandler }) => {
  return (
    <TouchableOpacity
      disabled={isDisabled}
      onPress={onTabHandler}
      style={commonStyles.align.itemsCenter}
    >
      <Text style={[styles.txt, isActive && styles.clrDrk]}>{placeHolder}</Text>
      {isActive && !hideBtm ? <View style={styles.highlighter} /> : null}
    </TouchableOpacity>
  );
};

export default TabButton;

const styles = StyleSheet.create({
  txt: {
    fontSize: 16,
    fontWeight: "600",
    textTransform: "capitalize",
    color: C.colors.text.secondary,
  },
  clrDrk: {
    color: C.colors.text.black,
  },
  highlighter: {
    height: 5,
    bottom: -8,
    width: "90%",
    borderRadius: 90,
    alignSelf: "center",
    position: "absolute",
    backgroundColor: C.colors.primary.color,
  },
});
