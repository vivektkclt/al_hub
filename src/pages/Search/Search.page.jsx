import { C } from "../../assets";
import { commonStyles } from "../../styles";
import { useLazyQuery } from "@apollo/client";
import { FlashList } from "@shopify/flash-list";
import loaderData from "../../utils/data/loaderData";
import { useDispatch, useSelector } from "react-redux";
import { searchStyle as styles } from "./Search.style";
import { userSlice } from "../../redux/slices/user.slice";
import React, { useEffect, useRef, useState } from "react";
import { categorySlice } from "../../redux/slices/category.slice";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import getStoreByKeyword from "../../graphql/queries/getStoreByKeyword";
import SkeltonLoader from "../../components/Loaders/SkeltonLoader.component";
import getCategoryByKeyword from "../../graphql/queries/getCategoryByKeyword";
import CategoryCard from "../../components/CategoryCard/CategoryCard.component";
import StoreLoaderCard from "../../components/StoreCard/StoreLoaderCard.component";
import SearchStoreCard from "../../components/StoreCard/SearchStoreCard.component";
import EmptyComponent from "../../components/NoDataContainer/EmptyComponent.component";
import SearchContainer from "../../components/SearchContainer/SearchContainer.component";
import SortModal from "./SortModal";
import SortFilterComponent from "../../components/SortFilterComponent/SortFilterComponent";
import CustomStatusBar from "../../components/StatusBar/CustomStatusBar.component";
import { useNetInfo } from "@react-native-community/netinfo";
import Offlinepage from "../OffilnePage/Offline.page";

const renderItem = ({ item, index }) => <SearchStoreCard data={item} />;

const renderCategory = ({ item, index }) => (
  <CategoryCard mTop={10} mRight={10} width={150} height={110} item={item} />
);

const renderCategoryLoader = () => (
  <SkeltonLoader style={styles.categoryLoader} />
);

const renderLoader = () => <StoreLoaderCard height={110} />;

const SearchPage = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const offsetRef = useRef({ value: 0 });
  const {
    token: { access_token: token },
    location,
  } = useSelector((state) => state.user);
  const { searchFromInsideCategory } = useSelector((state) => state.category);

  const [storeData, setStoreData] = useState([]);
  const [search, setSearch] = useState(route?.params?.searchVal ?? "");
  const [option, selectOption] = useState(null);
  const [filters, setFilter] = useState([]);
  const [restaurantSelected, setRestaurant] = useState([]);
  const [sortOption, setSort] = useState("near");
  const { isConnected } = useNetInfo();

  const onSearchHandler = (text) => {
    console.log("first====", text);
    offsetRef.current.value = 0;
    selectOption(null);
    setSearch(text);
  };

  useEffect(() => {
    setSearch(route?.params?.searchVal ?? "");
  }, [route?.params?.searchVal]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      // dispatch(userSlice.actions.onClearSearch({ flag: true }));
      dispatch(categorySlice.actions.setSearchFlag({ flag: false }));
    });
    return unsubscribe;
  }, [navigation]);

  const [
    onSearchCategoryFun,
    { data: categoryData, loading: categoryLoader, error: categoryError },
  ] = useLazyQuery(getCategoryByKeyword, {
    variables: { keyword: search },
    fetchPolicy: "network-only",
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  });

  const geoLocation = {
    lat: location?.latitude,
    lng: location?.longitude,
  };

  const [onSearchStoreFun, { loading }] = useLazyQuery(getStoreByKeyword, {
    variables: {
      geoLocation,
      keywords: search !== "" ? [search] : [],
      tags: [...filters, ...restaurantSelected],
      sorting: sortOption,
      pagination: {
        limit: 30,
        offset: offsetRef?.current.value,
      },
    },
    fetchPolicy: "network-only",
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
    onCompleted: (data) => {
      console.log(
        "Request Parameters:",
        JSON.stringify({
          geoLocation,
          keywords: search !== "" ? [search] : [""],
          tags: [...filters],
          sorting: sortOption,
          pagination: {
            limit: 30,
            offset: offsetRef?.current.value,
          },
        })
      );
      console.log("Response====:", data);
      let prevData =
        search === "" && filters.length == 0 && sortOption == ""
          ? [...storeData]
          : offsetRef.current.value >= 30
          ? [...storeData]
          : [];
      prevData = prevData.concat(data?.StoresByFilter);

      // for removing data which have same name...can't take id coz id is different
      prevData = [
        ...new Map(prevData.map((item) => [item["name"], item])).values(),
      ];
      setStoreData(prevData);
    },
    onError: (error) => {
      console.log(
        "Request Parameters:",
        JSON.stringify({
          geoLocation,
          keyword: search,
          sorting: sortOption,
          tags: filters,
          pagination: {
            limit: 30,
            offset: offsetRef?.current.value,
          },
        })
      );
      console.log("sEARCH_API_ERROR=", error);
    },
  });

  useEffect(() => {
    if (!searchFromInsideCategory) {
      onSearchCategoryFun();
    }
    onSearchStoreFun();
  }, [search, sortOption, filters]);

  const onEndReached = () => {
    if (storeData?.length >= 30) {
      offsetRef.current.value = storeData?.length + 1;
      onSearchStoreFun();
    }
  };

  const renderEmpty = () => (
    <>
      {categoryData?.CategoriesByFilter?.length === 0 && (
        <EmptyComponent
          title={C.strings.NO_DATA}
          viewStyle={styles.emptyStyle}
        />
      )}
    </>
  );

  const renderFooter = () => (
    <View style={styles.footer}>
      {loading && (
        <ActivityIndicator
          size={"large"}
          style={styles.actIndicator}
          color={C.colors.primary.color2}
        />
      )}
    </View>
  );

  const renderHeader = () => (
    <>
      {!searchFromInsideCategory && (
        <>
          {categoryLoader ? (
            <FlatList
              horizontal
              bounces={false}
              data={loaderData}
              renderItem={renderCategoryLoader}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ marginBottom: 5 }}
              keyExtractor={(item) => item?.id.toString()}
            />
          ) : (
            categoryData?.CategoriesByFilter?.length > 0 && (
              <>
                <Text style={styles.drkTxt}>{C.strings.IN_CATEGORY}</Text>
                <FlatList
                  horizontal
                  bounces={false}
                  renderItem={renderCategory}
                  showsHorizontalScrollIndicator={false}
                  data={categoryData?.CategoriesByFilter}
                  contentContainerStyle={{ marginBottom: 5 }}
                  keyExtractor={(item) => item?.id.toString()}
                />
              </>
            )
          )}
        </>
      )}
      {storeData?.length > 0 && (
        <Text style={[styles.drkTxt, { marginBottom: 10 }]}>
          {C.strings.IN_STORES}
        </Text>
      )}
    </>
  );

  return (
    <>
      <CustomStatusBar />
      {!isConnected && !storeData ? (
        <Offlinepage />
      ) : (
        <View style={[commonStyles.align.flex1, styles.padView]}>
          <SearchContainer
            value={search}
            onChange={onSearchHandler}
            containerStyle={styles.input}
            placeholder={C.strings.SEARCH_DESC}
          />
          <SortFilterComponent
            option={option}
            isClear={
              filters.length > 0 || restaurantSelected.length > 0 ? true : false
            }
            onPress={(value) => {
              if (value === "clear") {
                setFilter([]);
                setRestaurant([]);
              } else {
                selectOption(value);
              }
              // setSearch(value);
            }}
          />
          {loading && storeData?.length === 0 ? (
            <FlatList
              data={loaderData}
              renderItem={renderLoader}
              ListHeaderComponent={renderHeader}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.flatStyle}
              keyExtractor={(item) => item?.id.toString()}
            />
          ) : (
            <FlashList
              data={storeData}
              renderItem={renderItem}
              initialNumToRender={30}
              estimatedItemSize={200}
              onEndReachedThreshold={0.5}
              onEndReached={onEndReached}
              ListEmptyComponent={renderEmpty}
              ListFooterComponent={renderFooter}
              ListHeaderComponent={renderHeader}
              showsVerticalScrollIndicator={false}
              //  contentContainerStyle={styles.flatStyle}
              keyExtractor={(item) => item?.id.toString()}
            />
          )}
          <SortModal
            onApply={(values) => {
              selectOption(null);
              setFilter(values?.filters);
              setRestaurant(values?.restaurant);
              setSort(values.sort);
            }}
            restaurantSelected={restaurantSelected}
            sortSelected={sortOption}
            filtersSelected={filters}
            option={option}
            isOpen={option == "sort" || option == "filter"}
          />
        </View>
      )}
    </>
  );
};

export default SearchPage;
