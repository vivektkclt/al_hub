import React from "react";
import { C } from "../../assets";
import { Image, StyleSheet, Text, View } from "react-native";

const OnBoardingCard = ({ data, index }) => (
  <View style={styles.bg}>
    <View style={styles.v1}>
      <Image
        source={data?.image}
        resizeMode={"cover"}
        style={[styles.imgStyle, index === 0 && styles.indexImg]}
      />
    </View>
    <View style={styles.v2}>
      <Text style={styles.txtBg}>{data?.title}</Text>
      <Text numberOfLines={2} style={styles.txtMed}>
        {data?.desc}
      </Text>
    </View>
  </View>
);

export default OnBoardingCard;

const styles = StyleSheet.create({
  bg: {
    width: C.measures.SCREEN_WIDTH,
    height: C.measures.SCREEN_HEIGHT / 1.2,
  },
  v1: {
    flex: 7,
    alignItems: "center",
  },
  v2: {
    flex: 1,
    alignItems: "center",
  },
  imgStyle: {
    width: 280,
    height: 280,
    marginTop: 150,
  },
  indexImg: {
    marginTop: 90,
    alignSelf: "flex-end",
    height: C.measures.SCREEN_HEIGHT / 1.8,
  },
  txtBg: {
    fontSize: 20,
    marginBottom: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    color: C.colors.primary.color1,
  },
  txtMed: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    color: C.colors.primary.color1,
  },
});
