import { StyleSheet } from "react-native";
import { C } from "../../assets";

export const TBSpecialNotesStyles = StyleSheet.create({
  container: {
    width: "95%",
    padding: 10,
    backgroundColor: C.colors.primary.color1,
    borderRadius: 10,
    minHeight: 100,
    alignSelf: "center",
    elevation: 3,
    shadowColor: C.colors.bg.shadow1,
    marginTop: 20,
    zIndex: 1,
    shadowRadius: 3,
    shadowOpacity: 0.4,
    borderBottomWidth: 0.2,
    borderColor: C.colors.border.dark,
    shadowOffset: { width: 1, height: 1 },
  },
  heading: { fontSize: 15, fontWeight: "bold", color: C.colors.text.black },
  btn: {
    height: 25,
    borderWidth: 0.4,
    paddingHorizontal: 5,
    borderRadius: 5,
    minWidth: 80,
    alignItems: "center",

    marginHorizontal: 10,
    marginVertical: 5,
    paddingVertical: 2,
  },

  inputField: {
    borderWidth: 0.3,
    flex: 1,
    borderRadius: 10,
    padding: 10,
    borderColor: C.colors.border.grey,
    color: C.colors.text.black,
  },
});
