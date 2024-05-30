import { C } from "../../assets";
import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
  bg: {
    backgroundColor: C.colors.primary.color1,
  },
  bgImage: {
    width: "100%",
    height: C.measures.SCREEN_HEIGHT / 3,
    borderBottomLeftRadius: C.measures.BORDER_RADIUS,
    borderBottomRightRadius: C.measures.BORDER_RADIUS,
  },
  locIcon: {
    left: 15,
    height: 50,
    marginTop: 35,
    minWidth: "30%",
    paddingRight: 15,
    position: "absolute",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  txtWhite: {
    left: 10,
    fontSize: 16,
    fontStyle: "normal",
    color: C.colors.primary.color1,
  },
  searchStyle: {
    width: "95%",
    alignSelf: "center",
    position: "absolute",
    top: C.measures.SCREEN_HEIGHT / 3.8,
  },
  txtDark: {
    fontSize: 16,
    fontWeight: "600",
    color: C.colors.text.darkGry,
  },
  spacer: {
    marginTop: 10,
    marginLeft: 15,
    marginBottom: 10,
  },
  flatStyle: {
    padding: 12,
    paddingBottom: 100,
  },
  parallaxStyle: {
    flex: 1,
    overflow: "hidden",
    paddingBottom: 100,
  },
  emptyDataStyle: {
    paddingTop: 20,
  },
  listStyle: {
    paddingBottom: 100,
  },
  footer: {
    paddingTop: 40,
    paddingLeft: 15,
    paddingBottom: 150,
    justifyContent: "center",
  },
  footerTxt: {
    fontSize: 36,
    fontWeight: "800",
    letterSpacing: 0.5,
    color: C.colors.text.secondary1,
  },
  footerTxtBtm: {
    fontSize: 15,
    marginTop: 10,
    fontWeight: "500",
    color: C.colors.text.secondary,
  },
  recommendList: {
    marginLeft: 15,
    marginRight: 280,
  },
  offerCardTxtStyle: {
    fontSize: 18,
    fontWeight: "600",
    alignSelf: "center",
    position: "absolute",
    textTransform: "uppercase",
    color: C.colors.primary.color2,
  },
  offerCardTxtRedStyle: {
    fontSize: 18,
    fontWeight: "600",
    alignSelf: "center",
    position: "absolute",
    color: C.colors.text.red,
    textTransform: "uppercase",
  },
  offerBox: {
    bottom: 22,
    padding: 5,
    paddingLeft: 20,
    paddingRight: 20,
    alignSelf: "center",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: C.measures.BORDER_RADIUS,
    backgroundColor: C.colors.primary.color1,
  },
  actIndicator: {
    marginBottom: 5,
  },
  p10: {
    padding: 10,
  },
  masonry: {
    alignItems: "flex-start",
    width: C.measures.SCREEN_WIDTH / 2.2,
  }
});
