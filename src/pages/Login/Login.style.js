import { C } from "../../assets";
import { StyleSheet } from "react-native";

const wWidth = C.measures.SCREEN_WIDTH;
const wHeight = C.measures.SCREEN_HEIGHT_WS;

export const loginStyle = StyleSheet.create({
  image: {
    height: wHeight,
  },
  txtView: {
    alignItems: "center",
    // marginTop: wHeight / 6,
  },
  txtWhite: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: "600",
    color: C.colors.primary.color1,
  },
  spacer: {
    marginTop: 15,
    marginBottom: 25,
  },
  line: {
    height: 1,
    width: "30%",
    borderWidth: 1,
    borderColor: C.colors.border.grey,
  },
  txtMed: {
    fontSize: 16,
    fontWeight: "500",
    color: C.colors.primary.color1,
  },
  btn: {
    width: 140,
    height: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: C.colors.primary.color1,
  },
  drkTxt: {
    fontSize: 16,
    fontWeight: "700",
    color: C.colors.text.black,
  },
  termsTxt: {
    fontSize: 18,
    color: C.colors.primary.color1,
  },
  terms: {
    flex: 1,
    marginTop: 20,
    alignItems: "center",
  },
  skipTxt: {
    fontSize: 16,
    fontWeight: "bold",
    color: C.colors.primary.color1,
  },
  skipBtn: {
    right: 30,
    position: "absolute",
  },
  tagTxt: {
    fontSize: 16,
    color: C.colors.primary.color1,
    position: "absolute",
    fontFamily: "Courgette-Regular",
  },
  tagContainer: {
    width: "100%",
    alignItems: "center",

    justifyContent: "flex-start",
  },
  loginActivity: {
    backgroundColor: "transparent",
    zIndex: 1,
    alignSelf: "center",
  },
  textInput: {
    backgroundColor: C.colors.bg.shadow3,
    width: "100%",
    height: 40,
    color: C.colors.text.color1,
  },
  textInputContainer: {
    marginTop: 10,
    width: "95%",
    height: 70,
  },
  textInputTitleStyle: {
    color: C.colors.primary.color1,
    fontWeight: "bold",
  },
  titleIconStyles: { height: 20, width: 14, marginRight: 5 },
  loginActivityContainer: {
    width: "100%",
    height: "100%",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    backgroundColor: C.colors.bg.shadow3,
  },
  container: {
    flexGrow: 1,
    justifyContent: "space-evenly",
    backgroundColor: C.colors.bg.shadow3,
  },
  authContainer: {
    width: "85%",
    alignSelf: "center",
    padding: 15,
    backgroundColor: C.colors.bg.shadow4,
    borderRadius: 10,
    height: 450,
  },
  btnForgotPassword: {
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    borderRadius: 10,
    alignSelf: "flex-end",
  },
  FPText: {
    fontWeight: "bold",
    fontSize: 12,
    color: C.colors.text.color1,
  },
  FPBtnContainer: { width: "95%" },
  signInBtn: {
    width: "95%",
    height: 40,
    backgroundColor: C.colors.primary.color1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    borderRadius: 10,
  },
  signUpBtnText: {
    marginLeft: 10,
    fontWeight: "bold",
    color: C.colors.text.color1,
  },
  signInText: { fontWeight: "bold", fontSize: 16, color: C.colors.text.black },
  signUPtext: { color: C.colors.text.color1 },
});
