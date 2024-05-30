import { StyleSheet } from "react-native";
import { C } from "../../assets";

export const BookingDetailsStyles = StyleSheet.create({
  containter: {
    width: "100%",
    borderRadius: 10,
    marginBottom: 17,
    marginTop: 17,
    backgroundColor: "white",
    height: 120,
  },
  lefBor10oth1: {
    borderLeftWidth: 10,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  comFonSty: {
    // fontFamily: "Archivo Narrow",
    lineHeight: 20,
  },
  titleFonSty: {
    fontWeight: "bold",
    fontSize: 20,
    color: C.colors.text.darkGry,
  },
  norTexSty: { color: "#B2B2B2", fontSize: 14 },
  fle1: { flex: 1 },
  aliIteCen: { alignItems: "center" },
  pad16: { padding: 16 },
  bacColTra: { backgroundColor: "#F3F3F3" },
  ImageIcon: {
    margin: 3,
    width: 15,
    height: 15,
    resizeMode: "center",
  },
});
