import { StatusBar, StyleSheet } from "react-native";
import { C } from "../../assets";

export const historyStyle = StyleSheet.create({
  tabbar: {
    height: 50,
    display: "flex",
    width: "90%",
    marginTop: 20,
    marginHorizontal: "5%",
    borderRadius: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    // backgroundColor: "#121212",
  },
  activetab: {
    marginHorizontal: 1,
    height: 48,
    marginVertical: 1,
    width: "49%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: C.colors.primary.color1,
    borderRadius: 10,
    borderWidth: 0.5,
    text: {
      color: "black",
      fontSize: 17,
      fontWeight: "700",
      marginTop: 12,
    },
  },
  passivetab: {
    marginHorizontal: 1,
    marginVertical: 1,
    height: 48,
    width: "49%",
    display: "flex",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#b5b5b5",
    borderWidth: 0.5,
    text: {
      color: "rgba(255,255,255,.6)",
      fontSize: 17,
      fontWeight: "700",
      marginTop: 12,
    },
  },
  goBackBtn: {
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    width: 100,
    paddingHorizontal: 10,
    height: 50,
  },
  heaCon: {
    elevation: 10,
    height: 50,
    width: "100%",
    backgroundColor: C.colors.primary.color1,
  },
});
