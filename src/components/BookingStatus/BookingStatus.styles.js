import { StyleSheet } from "react-native";
import { C } from "../../assets";

export const BookingStatusStyles = StyleSheet.create({
  height: {
    height: 45,
  },
  marTop20: { marginTop: 20 },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    zIndex: 2,
  },
  statusContainer: {
    height: "80%",
    width: "90%",
    marginTop: "10%",
    backgroundColor: C.colors.primary.color1,
    borderRadius: 20,
  },
  animationContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 80,
    marginTop: 50,
  },
  imageWrapper: {
    backgroundColor: C.colors.primary.primary4,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 60,
    elevation: 15,
    shadowRadius: 10,
    shadowOffset: { width: 40, height: 40 },
  },
  imageStyle: { width: "70%", height: "70%" },
  successTitleWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  successTitle: { fontSize: 20, fontWeight: "bold", color: C.colors.text.grey },
  seperator: {
    borderTopWidth: 1,
    width: "90%",
    marginTop: 20,
    borderColor: C.colors.border.grey,
  },
  detailsContainer: {
    width: "100%",
    paddingHorizontal: 20,
  },
  detailsWrapper: { width: "100%", marginTop: 20 },
  detailsKey: { color: C.colors.text.dark, textTransform: "capitalize" },
  details: {
    color: C.colors.text.black,
    fontSize: 15,
    fontWeight: "bold",
  },
  para: { fontSize: 15, lineHeight: 21, color: C.colors.text.black },
  btn: {
    width: "90%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: C.colors.primary.color2,
    borderRadius: 5,
  },
  continueBtnText: {
    color: C.colors.primary.color1,
    fontWeight: "bold",
    fontSize: 16,
    textTransform: "capitalize",
  },
});
