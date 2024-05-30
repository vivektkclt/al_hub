import { C } from "../../assets";
import { StyleSheet } from "react-native";

export const onBoardingStyle = StyleSheet.create({
  mainView: {
    backgroundColor: C.colors.primary.color2,
  },
  txtWht: {
    fontSize: 20,
    fontWeight: "700",
    textTransform: "uppercase",
    textDecorationLine: "underline",
    color: C.colors.primary.color1,
  },
  bottomView: {
    paddingTop: 10,
    alignItems: "center",
    height: C.measures.SCREEN_HEIGHT - C.measures.SCREEN_HEIGHT / 1.2,
  },
});
