import { StyleSheet } from "react-native";

const align = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  alignCenter: {
    alignItems: "center"
  },
  row: {
    flexDirection: "row",
  },
  column: {
    flexDirection: "column",
  },
  itemsCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  rowStart: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowEvenly: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  rowAround: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  absolute: {
    position: "absolute",
  },
  pageFull: {
    width: "100%",
    height: "100%",
  },
  fWrap: {
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
  }
});

export default align;
