import { C } from "../../assets";
import { StyleSheet } from "react-native";

export const OfferCardStyles = StyleSheet.create({
  card: {
    height: 120,
    width: "100%",
    marginBottom: 10,
    flexDirection: "row",
    borderRadius: C.measures.BORDER_RADIUS,
  },
  v1: {
    flex: 1.2,
    justifyContent: "center",
    borderTopLeftRadius: C.measures.BORDER_RADIUS,
    borderBottomLeftRadius: C.measures.BORDER_RADIUS,
  },
  v2: {
    flex: 5.8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: C.colors.primary.color1,
  },
  v3: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: C.colors.primary.color1,
    borderTopRightRadius: C.measures.BORDER_RADIUS,
    borderBottomRightRadius: C.measures.BORDER_RADIUS,
  },
  upsideTxt: {
    width: 100,
    fontSize: 14,
    fontWeight: "700",
    alignSelf: "center",
    textAlign: "center",
    textTransform: "uppercase",
    color: C.colors.primary.color1,
    transform: [{ rotate: "-90deg" }],
  },
  txtRedMed: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: "700",
    color: C.colors.text.red,
    textTransform: "uppercase",
  },
  txtDrkBg: {
    fontSize: 20,
    marginBottom: 5,
    fontWeight: "700",
    textAlign: "center",
    color: C.colors.text.black,
  },
  txtDrkSm: {
    fontSize: 14,
    fontWeight: "600",
    color: C.colors.text.grey,
  },
  txtSm: {
    fontSize: 12,
    marginBottom: 5,
    fontWeight: "600",
    letterSpacing: -1,
    textAlign: "center",
    color: C.colors.text.darkGry,
  },
  txtRedBg: {
    fontSize: 20,
    fontWeight: "800",
    color: C.colors.text.red,
  },
  absoluteCircle: {
    width: 25,
    height: 30,
    borderRadius: 90,
    position: "absolute",
    backgroundColor: C.colors.primary.primary,
  },
  absoluteTop: {
    top: -10,
    left: -12,
  },
  absoluteBottom: {
    left: -12,
    bottom: -10,
  },
  dash: {
    left: 0,
    width: 1,
    height: 80,
    position: "absolute",
    flexDirection: "column",
  },
});
