import { C } from "../../assets";
import React, { memo } from "react";
import { commonStyles } from "../../styles";
import { useMutation } from "@apollo/client";
import { navigator } from "../../routes/navigations";
import { useDispatch, useSelector } from "react-redux";
import { HeartIcon, StarIcon } from "../../assets/images";
import LinearGradient from "react-native-linear-gradient";
import getFavList from "../../graphql/queries/getFavList";
import { authSlice } from "../../redux/slices/auth.slice";
import updateStoreFav from "../../graphql/mutations/updateStoreFav";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import getStoreIcon from "../../utils/getStoreIcon";

const StoreCard = ({ data, isFav }) => {
  const dispatch = useDispatch();
  const {
    user,
    token: { access_token: token },
  } = useSelector((state) => state.user);
  const navigateToLogin = () => {
    navigator.navigate("AuthNavigation", {
      screen: "LoginPage",
      params: {
        prev: "HomePage",
      },
    });
  };
  const onCardHandler = () => {
    if (user?.id) {
      navigator.navigate("StorePage", {
        id: data?.id,
      });
    } else {
      dispatch(
        authSlice.actions.setNavParams({
          mainParent: "StorePage",
          params: {
            id: data?.id,
          },
        })
      );
      navigateToLogin();
    }
  };
  const images = [];
  if (data?.StoreImages?.length > 0) {
    for (const image of data?.StoreImages) {
      const imageUrl = image?.location;
      images.push({ url: imageUrl });
    }
    if (images?.length > 1) {
      images.shift();
    }
  } else {
    images.push({
      image: require("../../assets/images/defaultStoreBanner.png"),
    });
  }

  const context = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const [
    updateStoreFun,
    {
      data: updateStoreData,
      error: updateStoreError,
      loading: updateStoreLoading,
    },
  ] = useMutation(updateStoreFav);

  const onFavPress = async () => {
    if (user?.id) {
      await updateStoreFun({
        context,
        fetchPolicy: "network-only",
        variables: {
          saveFavorite: {
            storeId: data?.id,
            isFavorite: false,
          },
        },
        refetchQueries: () => [
          {
            context,
            query: getFavList,
            fetchPolicy: "cache-and-network",
          },
        ],
      });
    } else navigateToLogin();
  };

  return (
    <TouchableOpacity onPress={onCardHandler} style={styles.mb}>
      <Image
        resizeMode={"cover"}
        style={styles.recommendImgStyle}
        source={{
          uri: getStoreIcon(data,'banner'),
        }}
      />
      {isFav ? (
        <TouchableOpacity
          onPress={onFavPress}
          style={[styles.absolute, styles.favIcon]}
        >
          <HeartIcon />
        </TouchableOpacity>
      ) : null}
      <LinearGradient
        end={{ x: 0, y: 1 }}
        start={{ x: 0, y: 0 }}
        colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.8)"]}
        style={[styles.viewRowEnd, styles.absolute]}
      >
        <TouchableOpacity
          onPress={onCardHandler}
          style={[styles.textView, styles.view1]}
        >
          {/* <View style={commonStyles.align.row}>
            {data?.averageReviewRating && (
              <>
                <StarIcon />
                <Text style={styles.txtWhite}>
                  {Math.floor(data?.averageReviewRating)}
                </Text>
              </>
            )}
          </View> */}
          <Text style={styles.txtWhite}>{data?.name}</Text>
          <Text style={[styles.txtWhite, styles.txtSm]}>{data?.location}</Text>
        </TouchableOpacity>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default memo(StoreCard);

const styles = StyleSheet.create({
  mb: {
    marginBottom: 15,
    justifyContent: "flex-end",
    borderRadius: C.measures.BORDER_RADIUS,
  },
  image: {
    height: 210,
    width: "100%",
  },
  absolute: {
    position: "absolute",
  },
  viewRowEnd: {
    padding: 10,
    width: "95%",
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
    paddingLeft: 5,
  },
  txtWhite: {
    fontSize: 16,
    fontWeight: "600",
    color: C.colors.primary.color1,
  },
  txtSm: {
    fontSize: 12,
  },
  favIcon: {
    top: 10,
    right: 10,
    zIndex: 1,
    borderRadius: 90,
  },
  carousel: {
    alignSelf: "center",
    borderRadius: C.measures.BORDER_RADIUS,
  },
  recommendImgStyle: {
    height: 200,
    width: "95%",
    alignSelf: "center",
    borderRadius: C.measures.BORDER_RADIUS,
  },
});
