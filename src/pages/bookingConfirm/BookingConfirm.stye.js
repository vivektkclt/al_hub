import { C } from "../../assets";
import { StyleSheet } from "react-native";

export const bookingConfirmStyle = StyleSheet.create({
  cardView: {
    width: "80%",
    height: 140,
    borderWidth: 3,
    borderRadius: 6,
    borderColor: C.colors.primary.color2,
    borderStyle: "solid",
    marginTop: 24,
    borderLeftWidth: 8,
  },
  cardViewDescription: {
    width: "80%",
    height: 150,
    borderWidth: 3,
    borderRadius: 6,
    borderColor: C.colors.primary.color2,
    borderStyle: "solid",
    marginTop: 35,
    borderLeftWidth: 8,
    display: "flex",
    flexDirection: "row",
  },
  Heading: {
    fontSize: 20,
    width: "100%",
    textAlign: "left",
    fontFamily: "Times New Roman",
    fontWeight: "800",
    color: C.colors.text.black,
  },
  Image: {
    margin: 20,
    width: 100,
    height: 100,
    borderRadius: 8,
    resizeMode: "center",
    borderWidth: 1,
  },
  ImageIcon: {
    margin: 3,
    width: 15,
    height: 15,
    resizeMode: "center",
  },

  Description: {
    display: "flex",
    color: C.colors.text.black,
    marginTop: 20,
    width: 150,
    height: 100,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  DescriptionRow: {
    display: "flex",
    width: 80,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  MultiLineText: {
    height: 150,
    marginTop: 12,
    width: "100%",
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  container: {
    width: "100%",
    // height: "100%",
    backgroundColor: C.colors.primary.color1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  goBackBtn: {
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    height: 40,
    paddingHorizontal: 20,
    width: 100,
  },
  textInput: {
    width: "100%",
    height: 40,
    borderStyle: "solid",
    fontSize: 20,
    shadowColor: "#4169E1",
    alignSelf: "center",
    backgroundColor: C.colors.primary.color1,
    borderBottomWidth: 1,
    padding: 0,
    borderColor: C.colors.border.grey,
  },
  button: {
    width: "95%",
    height: 45,
    backgroundColor: C.colors.primary.color2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginTop: 25,
    padding: 5,

    color: "white",
  },
  radioButtonCard: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 10,
    alignItems: "center",
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderColor: C.colors.border.drkGrey,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  errTextStyle: {
    position: "absolute",
    bottom: -7,
    left: 30,
    backgroundColor: C.colors.primary.color1,
    color: "red",
    fontSize: 12,
  },
  radioBtnContainer: {
    flexDirection: "row",
    width: 100,
    justifyContent: "space-between",
  },
  radioFillCom: {
    width: 14,
    height: 14,
    borderRadius: 8,
  },
  multiLineTextNoramal: { borderColor: C.colors.border.dark, borderWidth: 1.5 },
  multiLineTextErr: {
    borderColor: C.colors.primary.primary4,
    borderWidth: 0.8,
  },
  singleLineTextNor: {
    borderColor: C.colors.border.grey,
    borderBottomWidth: 1,
  },
  singleLineTextErr: {
    borderColor: C.colors.primary.primary4,
    borderBottomWidth: 0.8,
  },
  keyboardAvoidingView: {
    width: "100%",
    paddingBottom: 20,
    height: "100%",
  },
  keyboardAvoidingViewContent: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  containerContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
  },
  countryCodeContainer: {
    height: 30,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    borderRightWidth: 0.2,
  },
  countryCodeItem: { fontSize: 16, lineHeight: 18, marginRight: 10 },
  componentContainer: {
    width: "95%",
    alignSelf: "center",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 20,
    borderRadius: C.measures.BORDER_RADIUS,
    backgroundColor: C.colors.primary.color1,
    elevation: 3,
    shadowOpacity: 0.4,
    borderBottomWidth: 0.2,
    borderColor: C.colors.border.dark,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: C.colors.bg.shadow1,
  },
});