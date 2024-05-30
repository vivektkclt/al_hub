import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import pngImages from "../../assets/images/png";
import { C } from "../../assets";

const ServicePdfHeaderCard = ({ data, onHandler }) => {
  console.log(data, "pdf header");
  return (
    <TouchableOpacity style={styles.card} onPress={onHandler}>
      <Image
        resizeMode="cover"
        style={[styles.wpdf]}
        source={pngImages.storeMenuIcon}
      />
      <Text style={{ color: C.colors.text.black }}>{data?.info?.title}</Text>
    </TouchableOpacity>
  );
};

export default ServicePdfHeaderCard;

const styles = StyleSheet.create({
  card: {
    marginRight: 10,
    alignItems: "center",
    justifyContent: "space-around",
  },
  pdf: {
    height: 50,
    width: 50,
    borderRadius: 5,
    marginBottom: 5,
  },
  wpdf: {
    height: 50,
    width: 50,
    borderRadius: 5,
    marginBottom: 5,
  },
});
