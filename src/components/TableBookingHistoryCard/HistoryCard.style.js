import { StyleSheet } from "react-native";
import { C } from "../../assets";

export const historyCardStyle = StyleSheet.create({
  buttondiv: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    marginTop: 10,
  },
  bottomview: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  innerButton: {
    backgroundColor: C.colors.primary.primary4,
    marginHorizontal: 5,
    borderRadius: 5,
    width: "auto",
    paddingHorizontal: 4,
  },
  innerButtonRight: {
    backgroundColor: C.colors.primary.color2,
    marginHorizontal: 5,
    borderRadius: 5,
    width: "auto",
    paddingHorizontal: 4,
    text: {
      color: C.colors.text.color1,
      fontSize: 13,
      padding: 3,
      fontWeight: "600",
    },
  },
  innerButtonTxt: {
    fontSize: 13,
    fontWeight: "600",
    padding: 3,
  },
  cardView: {
    width: "80%",
    height: 140,
    borderWidth: 3,
    borderRadius: 6,
    borderColor: C.colors.border.dark,
    borderStyle: "solid",
    marginTop: 24,
    borderLeftWidth: 8,
  },
  cardViewDescription: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    height: 150,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: C.colors.border.drkGrey,
    borderStyle: "solid",
    marginTop: 35,
    borderLeftWidth: 8,
    display: "flex",
    flexDirection: "row",
    backgroundColor: C.colors.primary.color1,
  },
  Heading: {
    marginLeft: 20,
    fontSize: 20,
    fontFamily: "Times New Roman",
    marginTop: 20,
    fontWeight: "800",
  },
  Image: {
    margin: 20,
    width: 100,
    height: 100,
    borderRadius: 8,
    resizeMode: "cover",
    borderWidth: 1,
  },
  ImageIcon: {
    margin: 3,
    width: 12,
    height: 12,
    resizeMode: "center",
    marginRight: 8,
  },

  Description: {
    display: "flex",
    marginTop: 20,
    width: "50%",
    height: 100,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  DescriptionRow: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: 1,
  },
  MultiLineText: {
    height: 80,
    marginTop: 12,
    marginLeft: 12,
    borderWidth: 0,
    padding: 10,
  },
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: C.colors.primary.color1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 10,
  },
  goBackBtn: {
    alignItems: "center",
    marginLeft: 20,
    width: "100%",
    height: 40,

    justifyContent: "flex-start",
    flexDirection: "row",
    marginBottom: 5,
  },
  textInput: {
    width: "80%",
    height: 50,
    borderColor: C.colors.border.dark,
    borderStyle: "solid",
    marginTop: 15,
    fontSize: 20,
    borderBottomWidth: 2,
  },
  button: {
    width: "80%",
    height: 40,
    backgroundColor: C.colors.primary.color2,
    marginTop: 25,
    padding: 5,
    fontSize: 20,
    color: "white",
  },
  norTexSty: {
    color: C.colors.text.grey,
    fontSize: 14,
  },
  comFonSty: {
    // fontFamily: "Archivo Narrow",
    lineHeight: 18,
    fontFamily: C.strings.ARCHIVO_NARROW_BOLD,
  },
  ImageSK: {
    margin: 20,
    width: 100,
    height: 100,
    borderRadius: 8,
    resizeMode: "center",
    overflow: "hidden",
  },
});
