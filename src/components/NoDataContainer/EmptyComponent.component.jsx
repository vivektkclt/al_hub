import React from "react";
import { C } from "../../assets";
import { commonStyles } from "../../styles";
import { StyleSheet, Text, View } from "react-native";

const EmptyComponent = ({ title, desc, viewStyle }) => (
  <View style={[commonStyles.align.itemsCenter, viewStyle ?? viewStyle]}>
    <Text style={styles.txtDark}>{title}</Text>
    <Text style={styles.txtMed}>{desc}</Text>
  </View>
);

export default EmptyComponent;

const styles = StyleSheet.create({
  txtDark: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "600",
    color: C.colors.text.darkGry,
  },
  txtMed: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    color: C.colors.text.secondary1,
  },
});
