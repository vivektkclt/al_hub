import { C } from "../../assets";
import React, { memo } from "react";
import { commonStyles } from "../../styles";
import { navigator } from "../../routes/navigations";
import { HeartIcon, StarIcon } from "../../assets/images";
import LinearGradient from "react-native-linear-gradient";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import getStoreIcon from "../../utils/getStoreIcon";
import { useDispatch, useSelector } from "react-redux";
import { authSlice } from "../../redux/slices/auth.slice";

const StoreRecommendedCard = ({ data, isFav }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const onCardHandler = () => {
    if (user?.id) {
      navigator.navigate("StorePage", {
        id: data?.id,
      });
    } else {
      dispatch(
        authSlice.actions.setNavParams({
          mainParent: "StorePage",
          params: { id: data?.id },
        })
      );
      navigator.navigate("AuthNavigation", {
        screen: "LoginPage",
        params: {
          prev: "HomePage",
        },
      });
    }
  };
  const images = [];
  if (data?.StoreImages?.length > 0) {
    for (const image of data?.StoreImages) {
      const imageUrl = image?.location;
      images.push(imageUrl);
    }
    if (images?.length > 1) {
      images.shift();
    }
  } else {
    images.push(
      "https://www.shutterstock.com/image-vector/vector-illustration-sample-red-grunge-600w-2065712915.jpg"
    );
  }

  return (
    <TouchableOpacity onPress={onCardHandler} style={styles.mb}>
      <Image
        resizeMode={"cover"}
        style={styles.recommendImgStyle}
        source={{
          uri: getStoreIcon(data, "banner"),
        }}
      />
      {isFav && (
        <View style={[styles.absolute, styles.favIcon]}>
          <HeartIcon />
        </View>
      )}
      <LinearGradient
        end={{ x: 0, y: 1 }}
        start={{ x: 0, y: 0 }}
        colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.8)"]}
        style={[styles.viewRowEnd, styles.absolute]}
      >
        <View onPress={onCardHandler} style={[styles.view1]}>
          {/* {data?.averageReviewRating && (
            <View style={[commonStyles.align.row, { marginBottom: 5, alignItems: "center" }]}>
              <StarIcon />
              <Text style={[styles.txtWhite, { marginLeft: 5 }]}>{Math.floor(data?.averageReviewRating)}</Text>
            </View>
          )} */}
          <Text style={styles.txtWhite}>{data?.name}</Text>
          <Text style={[styles.txtWhite, styles.txtSm, styles.spaceTop]}>
            {data?.location}
          </Text>
        </View>
        {/* <View onPress={onCardHandler} style={[styles.textView, styles.view2]}>
          <View style={styles.txtShadow}>
            <Text style={styles.txtWhite}>{data?.distance}</Text>
          </View>
        </View> */}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default memo(StoreRecommendedCard);

const styles = StyleSheet.create({
  mb: {
    marginRight: 15,
    marginBottom: 15,
    alignSelf: "center",
    justifyContent: "flex-end",
    borderRadius: C.measures.BORDER_RADIUS,
  },
  card: {
    width: "100%",
    justifyContent: "flex-end",
  },
  absolute: {
    position: "absolute",
  },
  viewRowEnd: {
    padding: 10,
    width: "100%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomLeftRadius: C.measures.BORDER_RADIUS,
    borderBottomRightRadius: C.measures.BORDER_RADIUS,
  },
  textView: {
    flex: 1,
    height: 60,
    justifyContent: "space-around",
  },
  view1: {
    paddingLeft: 10,
  },
  spaceTop: {
    marginTop: 5,
  },
  view2: {
    paddingRight: 10,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  txtWhite: {
    fontSize: 16,
    fontWeight: "600",
    color: C.colors.primary.color1,
  },
  txtSm: {
    fontSize: 12,
  },
  txtShadow: {
    padding: 3,
    borderRadius: 8,
    backgroundColor: C.colors.bg.shadow,
  },
  favIcon: {
    top: 10,
    right: 10,
    zIndex: 1,
    borderRadius: 90,
  },
  dotStyle: {
    top: -30,
  },
  recommendImgStyle: {
    height: 200,
    alignSelf: "center",
    width: C.measures.SCREEN_WIDTH - 40,
    borderRadius: C.measures.BORDER_RADIUS,
  },
});
