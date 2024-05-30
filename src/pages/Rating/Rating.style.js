import { C } from "../../assets";
import { StyleSheet } from "react-native";

export const ratingStyles = StyleSheet.create({
  headerView: {
    padding: 10,
    alignItems: "flex-end",
    justifyContent: "center",
    backgroundColor: C.colors.primary.color1,
  },
  closeIcon: {
    padding: 3,
  },
  parent: {
    flex: 1,
    alignItems: "center",
    backgroundColor: C.colors.primary.color1,
  },
  bottomBtn: {
    alignSelf: "center",
    position: "absolute",
  },
  topTxt: {
    fontSize: 18,
    marginTop: 15,
    marginBottom: 15,
    fontWeight: "600",
    color: C.colors.text.grey,
  },
  spacer: {
    height: 50,
  },
  txtMiddle: {
    fontSize: 15,
    marginBottom: 10,
    fontWeight: "600",
    color: C.colors.text.darkGry,
  },
  borderBtn: {
    width: "90%",
    padding: 20,
    borderWidth: 1,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderColor: C.colors.chip.color2,
    borderRadius: C.measures.BORDER_RADIUS,
  },
  inputStyle: {
    padding: 5,
    height: 180,
    width: "90%",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    color: C.colors.text.secondary,
    borderColor: C.colors.chip.color2,
  },
});
