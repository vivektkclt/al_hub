import React from "react";
import { C } from "../../assets";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const FilterChip = ({ title, isActive, onHandler }) => (
  <TouchableOpacity
    onPress={onHandler}
    style={[styles.chip, isActive && styles.activeCHip]}
  >
    <Text style={[styles.txt, isActive && styles.activeTxt]}>{title}</Text>
  </TouchableOpacity>
);

export default FilterChip;

const styles = StyleSheet.create({
  chip: {
    padding: 10,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: C.colors.chip.color1,
    borderRadius: C.measures.BORDER_RADIUS,
  },
  activeCHip: {
    backgroundColor: C.colors.chip.color2,
  },
  txt: {
    fontSize: 14,
    fontWeight: "400",
    letterSpacing: -0.8,
    color: C.colors.text.darkGry,
  },
  activeTxt: {
    fontWeight: "700",
    color: C.colors.text.black,
  },
});
