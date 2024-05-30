import React from "react";
import { C } from "../../assets";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const BorderButton = ({ btnText, btnStyle, onBtnHandler }) => (
  <TouchableOpacity onPress={onBtnHandler} style={[btnStyle, styles.btn]}>
    <Text style={styles.txt}>{btnText}</Text>
  </TouchableOpacity>
);

export default BorderButton;

const styles = StyleSheet.create({
  btn: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    borderColor: C.colors.primary.color,
  },
  txt: {
    fontSize: 14,
    fontWeight: "600",
    color: C.colors.text.darkGry,
  },
});
