import { C } from "../../assets";
import { StyleSheet } from "react-native";

export const offerListStyle = StyleSheet.create({
  mainView: {
    padding: 15,
    height: "100%",
    backgroundColor: C.colors.primary.color1,
    justifyContent: "center",
  },
  listStyle: {
    paddingBottom: 250,
  },
  emptyStyle: {
    paddingTop: 200,
  },
});
