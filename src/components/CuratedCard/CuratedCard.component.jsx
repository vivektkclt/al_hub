import React from "react";
import { C } from "../../assets";
import { Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const CuratedCard = ({ img, title, onClick, height, isSpacer }) => (
  <TouchableOpacity
    style={[
      styles.curatedCard,
      isSpacer ? styles.mb : null,
      {
        height,
      },
    ]}
    onPress={onClick}
  >
    <Image style={styles.image} resizeMode="cover" source={img} />
    <Text style={styles.txt}>{title}</Text>
  </TouchableOpacity>
);

export default CuratedCard;

const styles = StyleSheet.create({
  curatedCard: {
    width: "100%",
    display: "flex",
    borderRadius: 5,
    backgroundColor: C.colors.primary.color1,
    alignItems: "flex-start",
    justifyContent: "flex-end",
  },
  txt: {
    margin: 10,
    fontSize: 16,
    maxWidth: "60%",
    textAlign: "left",
    fontWeight: "600",
    color: C.colors.primary.color1,
  },
  mb: {
    marginBottom: 20,
  },
  image: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    borderRadius: 5,
    alignSelf: "center",
    position: "absolute",
  },
});
