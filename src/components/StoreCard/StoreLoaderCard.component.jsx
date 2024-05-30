import React from "react";
import { C } from "../../assets";
import { StyleSheet } from "react-native";
import SkeltonLoader from "../Loaders/SkeltonLoader.component";

const StoreLoaderCard = ({ height }) => (
  <SkeltonLoader
    style={[
      styles.card,
      {
        height: height ? height : 150,
      },
    ]}
  />
);

export default StoreLoaderCard;

const styles = StyleSheet.create({
  card: {
    width: "100%",
    marginBottom: 10,
    borderRadius: C.measures.BORDER_RADIUS,
  },
});
