import { StyleSheet } from "react-native";
import { C } from "../../assets";

export const ResendOTPStyles = StyleSheet.create({
  container: { flexDirection: "row", marginTop: 10 },
  message: { color: C.colors.text.dark, fontSize: 12 },
  sendOTPText: {
    marginLeft: 5,
    fontSize: 12,
    fontWeight: "bold",
  },
});
