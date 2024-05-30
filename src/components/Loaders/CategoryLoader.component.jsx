import React from "react";
import { StyleSheet, View } from "react-native";
import SkeltonLoader from "./SkeltonLoader.component";

const CategoryLoader = () => (
  <View style={styles.wrapView}>
    <SkeltonLoader style={[styles.loaderStyle, styles.wSm]} />
    <SkeltonLoader style={[styles.loaderStyle, styles.wSm]} />
    <SkeltonLoader style={[styles.loaderStyle, styles.wMed]} />
    <SkeltonLoader style={[styles.loaderStyle, styles.wMed]} />
    <SkeltonLoader style={[styles.loaderStyle, styles.wSm]} />
    <SkeltonLoader style={[styles.loaderStyle, styles.wSm]} />
    <SkeltonLoader style={[styles.loaderStyle, styles.wSm]} />
    <SkeltonLoader style={[styles.loaderStyle, styles.wSm]} />
    <SkeltonLoader style={[styles.loaderStyle, styles.wMed]} />
    <SkeltonLoader style={[styles.loaderStyle, styles.wMed]} />
    <SkeltonLoader style={[styles.loaderStyle, styles.wSm]} />
    <SkeltonLoader style={[styles.loaderStyle, styles.wSm]} />
    <SkeltonLoader style={[styles.loaderStyle, styles.wSm]} />
  </View>
);

export default CategoryLoader;

const styles = StyleSheet.create({
  wSm: {
    width: "25%",
  },
  wMed: {
    width: "45%",
  },
  wrapView: {
    flexWrap: "wrap",
    flexDirection: "row",
  },
  loaderStyle: {
    height: 150,
    marginTop: 10,
    marginRight: 5,
    borderRadius: 7,
  },
});
