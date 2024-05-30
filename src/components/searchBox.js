import React from "react";
import { View, TextInput, StyleSheet, Image } from "react-native";
import { toStyleArray } from "../functions/rnFunc";
import { C } from "../assets";
export const SearchBox = ({ placeholder, onChangeText, submit, style }) => {
  const st = toStyleArray(style);
  const callCB = (text) => {
    if (typeof onChangeText == "function") onChangeText(text);
  };
  const nav = (text) => {
    if (typeof submit == "function") {
      submit(text);
      this.textInput.clear();
    }
  };
  return (
    <View style={[styles.wrapper, ...st]}>
      <Image
        resizeMode="stretch"
        source={require("../assets/icon/search_2.png")}
        style={styles.ImageStyle}
      />

      <TextInput
        ref={(input) => {
          this.textInput = input;
        }}
        placeholder={placeholder}
        onChangeText={(text) => callCB(text)}
        style={styles.box}
        onSubmitEditing={({ nativeEvent }) => {
          if (nativeEvent.text != null) nav(nativeEvent.text);
          else return;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: C.colors.primary.color1,
    borderRadius: 10,
    paddingLeft: 20,
  },
  box: {
    flex: 1,
    color: "#606060",
    backgroundColor: C.colors.primary.color1,
    borderRadius: 10,
  },
  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 24,
    width: 24,
    alignItems: "center",
  },
});
