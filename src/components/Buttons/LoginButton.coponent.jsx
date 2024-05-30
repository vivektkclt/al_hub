import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { C } from "../../assets";
import pngImages from "../../assets/images/png";

const LoginButton = ({
  type = null,
  text = "",
  marginBottom = "6%",
  onPress = null,
}) => {
  return (
    <TouchableOpacity
      onPress={() => (onPress ? onPress() : null)}
      style={styles.container(marginBottom)}
    >
      {type && type !== "login" ? (
        <Image
          style={{ height: 25, width: 25, right: 10, resizeMode: "contain" }}
          source={pngImages[type]}
        />
      ) : null}
      <Text style={styles.btnText}>{text}</Text>
      {type && type === "login" ? (
        <Image
          style={{
            height: 20,
            width: 20,
            left: "250%",
            resizeMode: "contain",
          }}
          source={pngImages.arrow}
        />
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: (marginBottom) => ({
    width: "80%",
    backgroundColor: C.colors.primary.color2,
    height: "5%",
    alignSelf: "center",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: marginBottom,
  }),
  btnText: {
    color: C.colors.text.color1,
    fontSize: 16,
  },
});
export default LoginButton;
