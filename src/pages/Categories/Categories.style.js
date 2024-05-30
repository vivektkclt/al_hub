import { C } from "../../assets";
import { StyleSheet } from "react-native";

export const categoryStyles = StyleSheet.create({
  paddView: {
    paddingTop: 0,
    paddingLeft: 9,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    marginBottom: 10,
    alignSelf: "center",
    borderColor: C.colors.border.dark,
  },
  listStyle: {
    paddingBottom: 150,
  },
  emptyStyle: {
    paddingTop: 150,
  },
});
