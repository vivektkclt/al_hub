import React from "react";
import { C } from "../../assets";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

const SvgButton = ({
  width,
  height,
  showBg,
  isWhite,
  btnStyle,
  isDisable,
  placeholder,
  onBtnHandler,
}) => (
  <TouchableOpacity
    disabled={isDisable}
    onPress={onBtnHandler}
    style={[
      btnStyle,
      styles.btnStyle,
      {
        width,
        height,
        backgroundColor: isWhite
          ? C.colors.primary.color1
          : showBg
          ? "transparent"
          : C.colors.primary.color2,
      },
    ]}
  >
    {showBg && (
      <Image
        style={styles.btnImgStyle}
        source={require(`../../assets/images/png/button.png`)}
      />
    )}
    <Text
      style={[
        styles.txtWhite,
        {
          color: isWhite ? C.colors.text.black : C.colors.text.color1,
        },
      ]}
    >
      {placeholder}
    </Text>
  </TouchableOpacity>
);

export default SvgButton;

const styles = StyleSheet.create({
  btnStyle: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: C.colors.primary.color2,
    borderRadius: C.measures.BORDER_RADIUS,
  },
  txtWhite: {
    fontSize: 14,
    fontWeight: "700",
    color: C.colors.primary.color1,
  },
  btnImgStyle: {
    top: -9,
    width: "100%",
    position: "absolute",
    borderRadius: C.measures.BORDER_RADIUS,
  },
});
