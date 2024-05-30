import { StyleSheet } from "react-native";
import { C } from "../../assets";

export const TBCStyles = StyleSheet.create({
  container: {
    width: "95%",
    backgroundColor: C.colors.primary.color1,
    borderRadius: 10,
    height: 210,
    padding: 10,
    alignSelf: "center",
    elevation: 2,
    shadowColor: C.colors.bg.shadow1,
    shadowRadius: 3,
    shadowOpacity: 0.4,
    borderBottomWidth: 0.2,
    borderColor: C.colors.border.dark,
    shadowOffset: { width: 1, height: 1 },
  },
  headingFont: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: C.colors.text.black,
  },
  chipContainer: { flexDirection: "row", justifyContent: "space-evenly" },
  arrowsContainer: {
    width: "100%",
    height: 50,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  arrowBtn: {
    marginHorizontal: 10,
    borderWidth: 1,
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  arrow: {
    height: 20,
    width: 20,
  },
  leftArrow: {
    left: -2,
  },
  rightArrow: {
    transform: [{ rotateZ: "180deg" }],
    left: 2,
  },
  calendarBtn: {
    marginHorizontal: 10,
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: C.colors.primary.color2,
  },
  calendar: {
    height: 24,
    width: 24,
  },
});
