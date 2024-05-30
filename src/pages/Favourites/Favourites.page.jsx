import React from "react";
import { C } from "../../assets";
import { useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import { commonStyles } from "../../styles";
import { View, FlatList, Platform } from "react-native";
import { withHeader } from "../../hoc/withHeader";
import loaderData from "../../utils/data/loaderData";
import { favStyles as styles } from "./Favourites.style";
import getFavList from "../../graphql/queries/getFavList";
import StoreCard from "../../components/StoreCard/StoreCard.component";
import CustomHeader from "../../components/Headers/CustomHeader.component";
import EmptyFavs from "../../components/NoDataContainer/EmptyFavs.component";
import StoreLoaderCard from "../../components/StoreCard/StoreLoaderCard.component";
import { useNetInfo } from "@react-native-community/netinfo";
import Offlinepage from "../OffilnePage/Offline.page";

const renderEmpty = () => <EmptyFavs />;
const renderLoader = () => <StoreLoaderCard />;
const HeaderComponent = () => (
  <CustomHeader hideShadow isBack title={C.strings.FAV} />
);
const renderItem = ({ item, index }) => (
  <StoreCard data={item} isFav={item?.isFavorite} />
);

const BodyComponent = () => {
  const {
    user,
    token: { access_token: token },
  } = useSelector((state) => state.user);
  const { isConnected } = useNetInfo();

  const { data, loading, error } = useQuery(getFavList, {
    skip: !user?.id,
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      console.log(data, "favorites");
    },
  });
  console.log(data, "favorites", user?.id);
  return (
    <>
      {!isConnected && !data ? (
        <Offlinepage />
      ) : (
        <View
          style={[
            commonStyles.align.flex1,
            data?.AllFavoriteStore.length > 0 && styles.spacer,
          ]}
        >
          {loading ? (
            <FlatList
              data={loaderData}
              renderItem={renderLoader}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listStyle}
              keyExtractor={(item) => item?.id.toString()}
            />
          ) : (
            <FlatList
              scrollEnabled={data?.AllFavoriteStore.length > 0}
              renderItem={renderItem}
              data={data?.AllFavoriteStore}
              ListEmptyComponent={renderEmpty}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item?.id.toString()}
              contentContainerStyle={[styles.listStyle]}
            />
          )}
        </View>
      )}
    </>
  );
};

const FavouritesPage = withHeader({ HeaderComponent, BodyComponent });

export default FavouritesPage;
