import { C } from "../../assets";
import { StyleSheet } from "react-native";

export const profileStyles = StyleSheet.create({
  topView: {
    padding: 15,
    paddingTop: 25,
    backgroundColor: C.colors.primary.color1,
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 90,
  },
  textView: {
    paddingLeft: 10,
    justifyContent: "center",
  },
  profileTxt: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: "700",
    color: C.colors.text.black,
  },
  drkTxt: {
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: -0.5,
    color: C.colors.text.dark,
  },
  editBtnStyle: {
    marginTop: 10,
  },
  capText: {
    marginTop: 10,
    marginLeft: 15,
    marginBottom: 2,
  },
  bottomView: {
    flex: 1,
    marginTop: 10,
    backgroundColor: C.colors.primary.color1,
  },
});
