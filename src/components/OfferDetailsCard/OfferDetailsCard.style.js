import { C } from "../../assets";
import { StyleSheet } from "react-native";

export const OfferDetailsCardStyles = StyleSheet.create({
  card: {
    width: "100%",
    borderRadius: C.measures.BORDER_RADIUS,
    height: C.measures.SCREEN_HEIGHT / 1.4,
    backgroundColor: C.colors.primary.color1,
  },
  v1: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: C.measures.BORDER_RADIUS,
    borderTopRightRadius: C.measures.BORDER_RADIUS,
  },
  v2: {
    flex: 6,
    alignItems: "center",
  },
  v3: {
    flex: 3,
    alignItems: "center",
  },
  txtWhite: {
    fontSize: 25,
    fontWeight: "600",
    textTransform: "uppercase",
    color: C.colors.primary.color1,
  },
  txtDrk: {
    fontSize: 25,
    marginTop: 35,
    marginBottom: 5,
    fontWeight: "700",
    textAlign: "center",
    color: C.colors.text.darkGry,
  },
  txtRed: {
    fontSize: 25,
    marginBottom: 15,
    fontWeight: "700",
    textAlign: "center",
    color: C.colors.text.red,
  },
  nameTxt: {
    fontSize: 18,
    marginBottom: 15,
    fontWeight: "700",
    color: C.colors.text.secondary3,
  },
  txtSmDrk: {
    fontSize: 16,
    maxWidth: "95%",
    marginBottom: 20,
    fontWeight: "600",
    letterSpacing: -1,
    textAlign: "center",
    color: C.colors.text.secondary4,
  },
  txtRedMed: {
    fontSize: 16,
    marginBottom: 20,
    fontWeight: "700",
    color: C.colors.text.red,
  },
  txtUpper: {
    textTransform: "uppercase",
  },
  addTxt: {
    fontSize: 20,
    lineHeight: 30,
    maxWidth: "90%",
    fontWeight: "700",
    letterSpacing: -1,
    textAlign: "center",
    color: C.colors.text.secondary3,
  },
  absoluteIcon: {
    width: 40,
    height: 40,
    borderRadius: 90,
    position: "absolute",
    backgroundColor: C.colors.primary.primary,
  },
  absoluteLeft: {
    top: -18,
    left: -20,
  },
  absoluteRight: {
    top: -18,
    right: -20,
  },
  dash: {
    height: 80,
    width: "85%",
    alignSelf: "center",
    position: "absolute",
  },
  claimView: {
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  offerDescTxt: {
    fontSize: 16,
    fontWeight: "400",
    color: C.colors.text.darkGry,
  },
  clrRed: {
    color: C.colors.text.red,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  btnStyle: {
    marginTop: 20,
  },
  drkMedTxt: {
    fontSize: 16,
    lineHeight: 22,
    maxWidth: "90%",
    fontWeight: "700",
    textAlign: "center",
    color: C.colors.text.black,
  },
  radeemView: {
    height: 50,
    width: 250,
    marginTop: 10,
    borderWidth: 2,
    justifyContent: "center",
    borderColor: C.colors.border.grey,
    borderRadius: C.measures.BORDER_RADIUS,
  },
  radeemTxt: {
    marginBottom: 0,
    letterSpacing: 5,
  },
});
