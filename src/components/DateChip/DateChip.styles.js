import { StyleSheet } from "react-native";
import { C } from "../../assets";

export const DateChipStyles = StyleSheet.create({
  chipContainer: {
    width: 45,
    height: 100,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
    borderWidth: 1,
    borderRadius: 5,
  },
  dateContainer: {
    fontSize: 20,
    fontWeight: "bold",
    height: 24,
    alignItems: "center",
  },
  date: {
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 22,
  },
  month: { fontWeight: "bold", fontSize: 15 },
  year: { fontWeight: "bold", fontSize: 13 },
  selected: {
    backgroundColor: C.colors.primary.color2,
    text: {
      color: C.colors.text.color1,
    },
  },
  notSelected: {
    backgroundColor: C.colors.primary.color1,
    text: {
      color: C.colors.text.black,
    },
  },
});
