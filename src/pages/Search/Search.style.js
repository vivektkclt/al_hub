import { C } from "../../assets";
import { StyleSheet } from "react-native";
import colors from "../../assets/values/colors";

export const searchStyle = StyleSheet.create({
  padView: {
    padding: 10,
    backgroundColor: C.colors.primary.color1,
  },
  input: {
    width: "100%",
    borderBottomWidth: 1,
    borderColor: C.colors.border.dark,
    marginBottom: 10,
  },
  flatStyle: {
    paddingBottom: 150,
  },
  drkTxt: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: "600",
    color: C.colors.text.darkGry,
  },
  categoryLoader: {
    width: 100,
    height: 110,
    marginTop: 10,
    marginBottom: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  emptyStyle: {
    paddingTop: 150,
  },
  footer: {
    paddingTop: 40,
    paddingLeft: 15,
    paddingBottom: 25,
    justifyContent: "center",
  },
  actIndicator: {
    marginBottom: 5,
  },
});
