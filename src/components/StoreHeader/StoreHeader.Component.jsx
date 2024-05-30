import { View, Text, TouchableOpacity, Share } from "react-native";
import React from "react";
import LinearGradient from "react-native-linear-gradient";
import { storeStyles as styles } from "../../pages/Store/Store.style";
import { useNavigation } from "@react-navigation/native";
import updateStoreFav from "../../graphql/mutations/updateStoreFav";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import getFavList from "../../graphql/queries/getFavList";
import {
  BackWhtIcon,
  FavIcon,
  ShareIcon,
  HeartIcon,
} from "../../assets/images";
import { commonStyles } from "../../styles";

const StoreHeaderComponent = ({ data, id, name }) => {
  const { top } = useSafeAreaInsets();
  const [isFav, setIsFav] = useState(data || false);
  const {
    token: { access_token: token },
  } = useSelector((state) => state.user);
  const context = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const shareOptions = {
    title: "Share the place",
    url: "https://apps.apple.com/us/app/al-hub/id1567254017",
    message: `Hey! check this place named ${name} on AL-HUB, Android: https://play.google.com/store/apps/details?id=com.alhub_client, IOS: https://apps.apple.com/us/app/al-hub/id1567254017`, // Note that according to the documentation at least one of "message" or "url" fields is required
  };
  const onShare = async () => {
    try {
      const result = await Share.share(shareOptions);
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      }
    } catch (error) {}
  };
  const [updateStoreFun] = useMutation(updateStoreFav);
  useEffect(() => {
    if (data !== undefined) {
      setIsFav(data);
    }
  }, [data]);
  const navigation = useNavigation();
  const onFavPress = async () => {
    await updateStoreFun({
      context,
      fetchPolicy: "network-only",
      variables: {
        saveFavorite: {
          storeId: id,
          isFavorite: !isFav,
        },
      },
      onCompleted: (data) => {
        setIsFav(data?.SaveFavorite?.isFavorite);
      },
      refetchQueries: () => [
        {
          context,
          query: getFavList,
          fetchPolicy: "cache-and-network",
        },
      ],
    });
  };
  const goBack = () => navigation.goBack();
  const renderTopHeader = () => (
    <LinearGradient
      style={[
        styles.linear,
        {
          paddingTop: Platform.OS === "ios" ? top : top + 20,
        },
      ]}
      colors={[
        "rgba(26, 26, 26, 0)",
        "rgba(26, 26, 26, 0.1)",
        "rgba(26, 26, 26, 0.2)",
      ]}
    >
      <TouchableOpacity onPress={goBack} style={styles.topTouch}>
        <View style={styles.btnContainer}>
          <BackWhtIcon />
        </View>
      </TouchableOpacity>
      <View style={commonStyles.align.rowEvenly}>
        <TouchableOpacity onPress={onShare} style={styles.share}>
          <View style={styles.btnContainer}>
            <ShareIcon />
          </View>
        </TouchableOpacity>
        <View style={{ width: 50 }}>
          <TouchableOpacity
            onPress={onFavPress}
            style={isFav ? styles.favIcon : styles.nonFavIcon}
          >
            <View
              style={[
                isFav && styles.btnContainer,
                { paddingTop: 3, paddingLeft: 2 },
              ]}
            >
              {isFav ? <HeartIcon /> : <FavIcon />}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
  return <>{renderTopHeader()}</>;
};

export default StoreHeaderComponent;
