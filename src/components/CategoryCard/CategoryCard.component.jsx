import React from "react";
import { C } from "../../assets";
import { navigator } from "../../routes/navigations";
import { useDispatch } from "react-redux";
import { categorySlice } from "../../redux/slices/category.slice";
import { Text, Image, StyleSheet, Pressable } from "react-native";
import FastImage from "react-native-fast-image";

const CategoryCard = ({ item, height, width, mTop, mRight }) => {
  const dispatch = useDispatch();
  const onChooseCard = () => {
    dispatch(categorySlice.actions.chooseCategory({ item }));
    navigator.navigate("CategoryDetailsPage");
  };
  const uri = item?.CategoryImage?.location;

  return (
    <Pressable
      onPress={onChooseCard}
      style={[
        styles.card,
        {
          backgroundColor: "#313036",
          marginTop: mTop ? mTop : 0,
          width: width ? width : "32%",
          height: height ? height : 150,
          marginRight: mRight ? mRight : 0,
        },
      ]}
    >
      {uri && (
        <FastImage
          style={styles.imgStyle}
          source={{ uri }}
          resizeMode={"cover"}
        />
      )}
      <Text
        style={[
          styles.txtStyle,
          {
            maxWidth: width === "45%" ? 140 : 80,
          },
        ]}
        numberOfLines={3}
      >
        {item?.name}
      </Text>
    </Pressable>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 7,
  },
  imgStyle: {
    width: "100%",
    height: "100%",
    borderRadius: 7,
  },
  txtStyle: {
    top: 15,
    left: 10,
    fontSize: 14,
    lineHeight: 20,
    height: "100%",
    fontWeight: "700",
    position: "absolute",
    color: C.colors.primary.color1,
  },
});
