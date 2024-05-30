import { C } from "../../assets";
import { StatusBar, StyleSheet } from "react-native";
import colors from "../../assets/values/colors";

const HEADER_IMAGE_WIDTH = C.measures.SCREEN_WIDTH;
const HEADER_IMAGE_HEIGHT = C.measures.SCREEN_HEIGHT / 3;

export const bookingStyles = StyleSheet.create({
  container: {
    backgroundColor: C.colors.primary.color1,
    height: "100%",
  },
  goBackBtn: {
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    height: 40,
    paddingHorizontal: 20,
    width: 100,
  },
  heaCon: {
    width: "100%",
    height: 40,
    justifyContent: "flex-start",
    backgroundColor: C.colors.primary.color1,
    elevation: 10,
    zIndex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  aliIteCen: {
    alignItems: "center",
  },
  hei100: {
    height: 100,
  },
  jusConSpaBet: {
    justifyContent: "space-between",
  },
  padVer10: {
    paddingVertical: 10,
  },
  fonSiz15: { fontSize: 15 },
});
