import { C } from "../../assets";
import { StyleSheet } from "react-native";

export const chooseLocationStyles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 10,
    backgroundColor: C.colors.primary.color1,
  },
  searchStyle: {
    width: "100%",
    borderWidth: 0.5,
    alignSelf: "center",
    borderColor: "#B4B4B4",
  },
  currentLocBtn: {
    padding: 10,
    marginTop: 10,
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderColor: "#B4B4B4",
  },
  drk: {
    fontSize: 14,
    marginLeft: 10,
    fontWeight: "500",
    color: C.colors.text.black,
  },
});
