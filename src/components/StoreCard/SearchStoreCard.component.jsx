import { C } from "../../assets";
import React, { useState } from "react";
import { commonStyles } from "../../styles";
import { StarIcon } from "../../assets/images";
import { navigator } from "../../routes/navigations";
import { useDispatch, useSelector } from "react-redux";
import { authSlice } from "../../redux/slices/auth.slice";
import SkeltonLoader from "../Loaders/SkeltonLoader.component";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";

const SearchStoreCard = ({ data }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [loader, setLoader] = useState(false);
  const onCardHandler = () => {
    if (user?.id) {
      navigator.navigate("StorePage", {
        id: data?.id,
      });
    } else {
      dispatch(
        authSlice.actions.setNavParams({
          mainParent: "HomeNavigation",
          subParent: "Categories",
          child: "CategoryDetailsPage",
        })
      );
      navigator.navigate("AuthNavigation", {
        screen: "LoginPage",
        params: {
          prev: "SearchPage",
        },
      });
    }
  };
  const getListIcon = () => {
    // Use findIndex to find the index of the first object with classification 'image'.
    const index = data?.StoreImages.findIndex(
      (item) => item.classification === "image"
    );

    // Use the found index to get the location of the first image or the first object.
    const result =
      index !== -1
        ? data?.StoreImages[index].location
        : data?.StoreImages.length > 0
        ? data?.StoreImages[0].location
        : null;
    return result;
  };
  return (
    <TouchableOpacity onPress={onCardHandler} style={styles.card}>
      {loader && <SkeltonLoader style={[styles.image, styles.absolute]} />}
      {data?.StoreImages[0]?.location ? (
        <FastImage
          resizeMode="cover"
          style={styles.image}
          onLoadEnd={() => setLoader(false)}
          onLoadStart={() => setLoader(true)}
          source={{ uri: getListIcon() }}
        />
      ) : (
        <FastImage
          resizeMode="cover"
          style={styles.image}
          source={require("../../assets/images/defaultStoreBanner.png")}
        />
      )}
      <View style={[commonStyles.align.rowStart, commonStyles.align.flex1]}>
        <View style={styles.itemStart}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.txtDrk}>
            {data?.name}
          </Text>
          <Text numberOfLines={2} ellipsizeMode="tail" style={styles.txtLight}>
            {data?.description}
          </Text>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.txtDrkMed}>
            {data?.location}
          </Text>
        </View>
        <>
          {/* {data?.averageReviewRating && (
            <View style={[commonStyles.align.rowCenter, styles.itemEnd]}>
              <StarIcon />
              <Text style={[styles.txtDrk, styles.ml]}>
                {Math.floor(data?.averageReviewRating)}
              </Text>
            </View>
          )} */}
        </>
      </View>
    </TouchableOpacity>
  );
};

export default SearchStoreCard;

const styles = StyleSheet.create({
  card: {
    padding: 10,
    paddingLeft: 0,
    paddingRight: 0,
    marginBottom: 10,
    flexDirection: "row",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  txtDrk: {
    fontSize: 16,
    marginTop: -2,
    maxWidth: "75%",
    fontWeight: "700",
    color: C.colors.text.darkGry,
  },
  itemStart: {
    flex: 8.5,
    height: "100%",
  },
  txtDrkMed: {
    fontSize: 12,
    maxWidth: "95%",
    fontWeight: "600",
    color: C.colors.text.darkGry,
  },
  ml: {
    marginLeft: 3,
  },
  txtLight: {
    fontSize: 12,
    maxWidth: "97%",
    marginBottom: 8,
    fontWeight: "600",
    letterSpacing: 0.5,
    color: C.colors.text.secondary,
  },
  itemEnd: {
    flex: 1.5,
    paddingTop: 5,
    height: "100%",
    alignItems: "flex-start",
  },
  absolute: {
    position: "absolute",
  },
});
