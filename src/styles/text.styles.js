import { C } from "../assets";
import { StyleSheet } from "react-native";

const textStyles = StyleSheet.create({
  capSmText: {
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "600",
    color: C.colors.text.dark,
    textTransform: "uppercase",
  },
});

export default textStyles;
