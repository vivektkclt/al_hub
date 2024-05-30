import React from "react";
import { StyleSheet } from "react-native";
import CustomBtn from "./button";
import { toStyleArray } from "../functions/rnFunc";

export default ({ onPress, children, style, disabled = false }) => {
  let st = toStyleArray(style);
  return (
    <CustomBtn
      disabled={disabled}
      onPress={onPress}
      style={[styles.button, { backgroundColor: "#000000" }, ...st]}
    >
      {children}
    </CustomBtn>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 8,
    /* shadowColor: '#2AC062',
         shadowOpacity: 0.4,
         shadowOffset: { height: 10, width: 0 },
         shadowRadius: 20,
         elevation:5*/
  },
});
