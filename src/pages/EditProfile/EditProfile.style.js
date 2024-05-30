import { C } from "../../assets";
import { StyleSheet } from "react-native";

export const editProfStyles = StyleSheet.create({
  view1: {
    flex: 2.5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: C.colors.primary.color1,
  },
  view2: {
    flex: 7.5,
  },
  txtSpacer: {
    marginTop: 15,
    marginLeft: 15,
    marginBottom: 2,
  },
  paddView: {
    flex: 1,
    padding: 10,
    paddingTop: 25,
    backgroundColor: C.colors.primary.color1,
  },
  bottomBtn: {
    alignSelf: "center",
    position: "absolute",
  },
  inputStyle: {
    height: 52,
    width: "100%",
    marginBottom: 12,
    justifyContent: "center",
    color: C.colors.text.darkGry,
    borderColor: C.colors.border.dark,
    borderRadius: C.measures.BORDER_RADIUS,
  },
});
