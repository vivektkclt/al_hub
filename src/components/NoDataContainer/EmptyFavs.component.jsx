import React from "react";
import { C } from "../../assets";
import { NoFavIcon } from "../../assets/images";
import { navigator } from "../../routes/navigations";
import { StyleSheet, Text, View } from "react-native";
import SvgButton from "../Buttons/SvgButton.component";

const EmptyFavs = () => {
  const onFavHandler = () => navigator.navigate("HomePage");
  return (
    <View style={styles.mainView}>
      <NoFavIcon />
      <Text style={styles.txtDrk}>{C.strings.NO_FAV}</Text>
      <Text style={styles.txtGrey}>{C.strings.NO_FAV_DESC}</Text>
      <SvgButton
        height={40}
        width={150}
        btnStyle={styles.btnStyle}
        onBtnHandler={onFavHandler}
        placeholder={C.strings.ADD_FAV}
      />
    </View>
  );
};

export default EmptyFavs;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    paddingTop: 200,
    alignItems: "center",
    height: C.measures.SCREEN_HEIGHT,
    backgroundColor: C.colors.primary.color1,
  },
  btnStyle: {
    marginTop: 5,
  },
  txtDrk: {
    fontSize: 18,
    marginTop: 15,
    marginBottom: 5,
    fontWeight: "600",
    letterSpacing: -0.8,
    color: C.colors.text.black,
  },
  txtGrey: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "600",
    letterSpacing: -0.8,
    color: C.colors.text.secondary1,
  },
});
