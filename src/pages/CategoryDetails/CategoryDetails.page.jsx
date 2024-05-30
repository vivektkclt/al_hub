import React from "react";
import { C } from "../../assets";
import { useQuery } from "@apollo/client";
import { commonStyles } from "../../styles";
import { withHeader } from "../../hoc/withHeader";
import { View, Text, FlatList } from "react-native";
import loaderData from "../../utils/data/loaderData";
import { navigator } from "../../routes/navigations";
import { useDispatch, useSelector } from "react-redux";
import { categorySlice } from "../../redux/slices/category.slice";
import getCategoryById from "../../graphql/queries/getCategoryById";
import StoreCard from "../../components/StoreCard/StoreCard.component";
import { categoryDetailStyles as styles } from "./CategoryDetails.style";
import CustomHeader from "../../components/Headers/CustomHeader.component";
import getStoresByCategoryId from "../../graphql/queries/getStoresByCategoryId";
import StoreLoaderCard from "../../components/StoreCard/StoreLoaderCard.component";
import EmptyComponent from "../../components/NoDataContainer/EmptyComponent.component";
import { useNetInfo } from "@react-native-community/netinfo";
import Offlinepage from "../OffilnePage/Offline.page";

const HeaderComponent = () => {
  const dispatch = useDispatch();
  const selectedData = useSelector((state) => state.category.selectedCategory);
  const onSearch = () => {
    dispatch(categorySlice.actions.setSearchFlag({ flag: true }));
    navigator.navigate("SearchPage");
  };
  return <CustomHeader isBack onSearch={onSearch} title={selectedData?.name} />;
};

const renderItem = ({ item, index }) => <StoreCard data={item} />;

const renderLoader = () => <StoreLoaderCard />;

const renderEmpty = () => (
  <EmptyComponent title={C.strings.NO_STORES} viewStyle={styles.emptyStyle} />
);

const BodyComponent = () => {
  const {
    token: { access_token: token },
    location,
    locationName,
  } = useSelector((state) => state.user);
  const selectedData = useSelector((state) => state.category.selectedCategory);
  const { isConnected } = useNetInfo();
  const categoryId = selectedData?.id;

  const {
    data: categoryData,
    loading: categoryLoader,
    error: categoryError,
  } = useQuery(getCategoryById, {
    variables: { categoryId },
    fetchPolicy: "network-only",
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  });

  const { data, loading, error } = useQuery(getStoresByCategoryId, {
    variables: {
      categoryId,
      geoLocation: {
        lat: location?.latitude,
        lng: location?.longitude,
      },
      // pagination: {
      // offset: 0,
      // // limit: 100,
      // }
    },
    fetchPolicy: "network-only",
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  });

  const renderHeader = () => (
    <>
      {data?.StoresByCategory?.length > 0 && (
        <Text numberOfLines={1} ellipsizeMode={"tail"} style={styles.headTxt}>
          {selectedData?.name}
          {/*  in {locationName} */}
        </Text>
      )}
    </>
  );
  return (
    <>
      {!isConnected && !data ? (
        <Offlinepage />
      ) : (
        <View style={commonStyles.align.flex1}>
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
              renderItem={renderItem}
              data={data?.StoresByCategory}
              ListEmptyComponent={renderEmpty}
              ListHeaderComponent={renderHeader}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listStyle}
              keyExtractor={(item) => item?.id.toString()}
            />
          )}
        </View>
      )}
    </>
  );
};

const CategoryDetailsPage = withHeader({ HeaderComponent, BodyComponent });

export default CategoryDetailsPage;
