import { StyleSheet } from "react-native";
import { C } from "../../assets";

export const inputFieldStyles = StyleSheet.create({
  container: {
    width: "95%",
    height: 70,
    marginTop: 15,
  },
  deftitleContainer: {
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  defTitle: { fontWeight: "bold", color: C.colors.text.black },
  infoBtn: { height: 15, width: 20 },
  errText: {
    position: "absolute",
    color: C.colors.text.red,
    fontSize: 12,
    top: 30,
    left: 20,
    backgroundColor: C.colors.primary.color1,
    zIndex: 1,
    paddingHorizontal: 5,
  },
  defInput: {
    borderWidth: 1,
    width: "100%",
    padding: 0,
    paddingHorizontal: 10,
    height: 40,
    borderRadius: 10,
    borderColor: C.colors.border.dark,
  },
  secureBtnContainer: {
    position: "absolute",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    width: 30,
    zIndex: 3,
  },
  secureBtn: {
    width: 18,
    height: 18,
    alignSelf: "center",
  },
  shadow: {
    elevation: 3,
    shadowOpacity: 0.4,
    borderBottomWidth: 0.2,
    borderColor: C.colors.border.dark,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: C.colors.bg.shadow1,
  },
});
