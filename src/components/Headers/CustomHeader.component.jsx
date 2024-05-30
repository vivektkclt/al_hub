import React from "react";
import { C } from "../../assets";
import { commonStyles } from "../../styles";
import { useNavigation } from "@react-navigation/native";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BackIcon, SearchIcon, LocationBlackIcon } from "../../assets/images";

const CustomHeader = ({
  title,
  isBack,
  isLocFun,
  onSearch,
  hideShadow,
  headerStyle,
  isCustonNav,
  backgroundColor = C.colors.primary.color1,
}) => {
  const { goBack } = useNavigation();
  return (
    <View
      style={[
        !hideShadow && styles.wrapper,
        headerStyle && headerStyle,
        { backgroundColor: backgroundColor },
      ]}
    >
      <View
        style={[
          commonStyles.align.row,
          styles.viewHead,
          !hideShadow && styles.shadow,
        ]}
      >
        {isLocFun && (
          <TouchableOpacity onPress={isLocFun} style={styles.iconView}>
            <LocationBlackIcon />
          </TouchableOpacity>
        )}
        {isBack && (
          <TouchableOpacity onPress={goBack} style={styles.iconView}>
            <BackIcon />
          </TouchableOpacity>
        )}
        {isCustonNav && (
          <TouchableOpacity onPress={isCustonNav} style={styles.iconView}>
            <BackIcon />
          </TouchableOpacity>
        )}
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.txt}>
          {title}
        </Text>
        {onSearch && (
          <TouchableOpacity
            onPress={onSearch}
            style={[styles.iconView, styles.absoluteEnd]}
          >
            <SearchIcon />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  wrapper: {
    paddingBottom: 5,
    overflow: "hidden",
  },
  viewHead: {
    height: 50,
    width: "100%",
    alignItems: "center",
    backgroundColor: C.colors.primary.color1,
  },
  shadow: {
    elevation: 3,
    shadowRadius: 3,
    shadowOpacity: 0.4,
    borderBottomWidth: 0.2,
    borderColor: C.colors.border.dark,
    shadowOffset: { width: 1, height: 1 },
  },
  iconView: {
    width: 50,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  txt: {
    fontSize: 18,
    maxWidth: "70%",
    fontWeight: "600",
    color: C.colors.text.black,
  },
  absoluteEnd: {
    right: 0,
    position: "absolute",
  },
});
