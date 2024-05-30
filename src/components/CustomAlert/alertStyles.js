import { StyleSheet } from "react-native";
import { C } from "../../assets";

export const alertStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: C.colors.bg.shadow2,
  },
  wrapper: {
    height: 160,
    backgroundColor: C.colors.primary.color1,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingBottom: 15,
    width: "90%",
  },
  titleContainer: {
    height: 50,
    alignItems: "flex-start",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderColor: C.colors.border.dark,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: C.colors.text.secondary3,
  },
  messageContainer: { marginTop: 10 },
  message: { color: C.colors.text.secondary1 },
  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  btnCommon: {
    marginLeft: 10,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  cancelBtn: {
    borderWidth: 1,
    borderColor: C.colors.border.grey,
    text: { color: C.colors.text.black },
  },
  confirmBnt: {
    backgroundColor: C.colors.primary.secondary,
    text: { color: C.colors.text.color1 },
  },
  textCommon: { lineHeight: 18, fontWeight: "500" },
});
