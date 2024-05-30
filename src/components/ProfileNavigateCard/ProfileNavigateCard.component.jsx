import React from "react";
import { C } from "../../assets";
import { commonStyles } from "../../styles";
import { ArrowIcon } from "../../assets/images";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const ProfileNavigateCard = ({
  isDisable,
  placeholder,
  disableArrow,
  onCardHandler,
}) => {
  return (
    <TouchableOpacity
      disabled={isDisable}
      onPress={onCardHandler}
      style={[commonStyles.align.rowBetween, styles.btn]}
    >
      <Text style={styles.btnTxt}>{placeholder}</Text>
      {!disableArrow && <ArrowIcon />}
    </TouchableOpacity>
  );
};

export default ProfileNavigateCard;

const styles = StyleSheet.create({
  btn: {
    padding: 15,
    backgroundColor: C.colors.primary.color1,
  },
  btnTxt: {
    fontSize: 16,
    fontWeight: "600",
    color: C.colors.text.darkGry,
  },
});
