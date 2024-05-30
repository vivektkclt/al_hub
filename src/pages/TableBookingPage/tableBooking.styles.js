import { StyleSheet } from "react-native";
import { C } from "../../assets";

export const tableBookingStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.colors.primary.color1 },
  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
    marginBottom: 10,
    marginTop: 30,
    flex: 1,
  },
  btnBox: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignSelf: "flex-end",
    width: "100%",
    marginTop: 50,
  },
  btn: {
    width: "45%",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    borderRadius: 5,
  },
  cancelBtn: {
    backgroundColor: C.colors.primary.color1,
    borderWidth: 0.5,
    borderColor: C.colors.border.grey,
  },
});
