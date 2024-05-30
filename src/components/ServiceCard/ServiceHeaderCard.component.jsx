import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import pngImages from "../../assets/images/png";
import { C } from "../../assets";

const ServiceHeaderCard = ({ data, onHandler }) => {
  const imgSource = data?.data[0]?.serviceImages[0]
    ? {
        uri: data?.data[0]?.serviceImages[0]?.location,
      }
    : require("../../assets/images/defaultStoreBanner.png");
  return (
    <TouchableOpacity style={styles.card} onPress={onHandler}>
      <Image resizeMode="cover" style={styles.img} source={imgSource} />

      <Text style={{ color: C.colors.text.black }}>{data?.title}</Text>
    </TouchableOpacity>
  );
};

export default ServiceHeaderCard;

const styles = StyleSheet.create({
  img: {
    height: 80,
    width: 110,
    borderRadius: 5,
    marginBottom: 15,
  },
  card: {
    marginRight: 10,
    alignItems: "center",
    justifyContent: "space-around",
  },
  pdf: {
    height: 80,
    width: 100,
    borderRadius: 5,
    marginBottom: 15,
  },
});
