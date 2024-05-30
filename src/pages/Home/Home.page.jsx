import { C } from "../../assets";
import React, { useCallback, useRef } from "react";
import { commonStyles } from "../../styles";
import { useEffect, useState } from "react";
import offers from "../../utils/data/offers";
import { useLazyQuery } from "@apollo/client";
import getLocation from "../../functions/location";
import imageData from "../../utils/data/imageData";
import { homeStyles as styles } from "./Home.style";
import loaderData from "../../utils/data/loaderData";
import { navigator } from "../../routes/navigations";
import { LocationRedIcon } from "../../assets/images";
import { useDispatch, useSelector } from "react-redux";
import { userSlice } from "../../redux/slices/user.slice";
import { authSlice } from "../../redux/slices/auth.slice";
import useLocationHandler from "../../hooks/useLocationHandler";
import { categorySlice } from "../../redux/slices/category.slice";
import getGuestStores from "../../graphql/queries/getGuestStores";
import getBestOffers from "../../graphql/queries/getBestOffers";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import StoreCard from "../../components/StoreCard/StoreCard.component";
import CustomHeader from "../../components/Headers/CustomHeader.component";
import SkeltonLoader from "../../components/Loaders/SkeltonLoader.component";
import CuratedCard from "../../components/CuratedCard/CuratedCard.component";
import HomeOfferCard from "../../components/OfferCard/HomeOfferCard.component";
import getStoresByCategoryId from "../../graphql/queries/getStoresByCategoryId";
import StoreLoaderCard from "../../components/StoreCard/StoreLoaderCard.component";
import getStoreByCategoryFilter from "../../graphql/queries/getStoreByCategoryFilter";
import EmptyComponent from "../../components/NoDataContainer/EmptyComponent.component";
import SearchContainer from "../../components/SearchContainer/SearchContainer.component";
import StoreRecommendedCard from "../../components/StoreCard/StoreRecommendedCard.component";
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import CustomStatusBar from "../../components/StatusBar/CustomStatusBar.component";
import { useFocusEffect } from "@react-navigation/native";
import Offlinepage from "../OffilnePage/Offline.page";
import { useNetInfo } from "@react-native-community/netinfo";

const renderEmpty = () => (
  <EmptyComponent
    title={C.strings.NO_STORES}
    desc={C.strings.NO_STORES_DESC}
    viewStyle={styles.emptyDataStyle}
  />
);

const renderLoader = () => <StoreLoaderCard />;

const renderNearByStores = ({ item, index }) => <StoreCard data={item} />;

const renderRecommendedStores = ({ item, index }) => (
  <StoreRecommendedCard data={item} />
);

const renderStickyHeader = () => (
  <CustomHeader
    onSearch={onSearch}
    title={locationName}
    isLocFun={openChangeLoc}
  />
);

const MAX_WIDTH = C.measures.SCREEN_WIDTH;
const MAX_HEIGHT = C.measures.SCREEN_HEIGHT / 3;

const HomePage = () => {
  const dispatch = useDispatch();
  const { top } = useSafeAreaInsets();
  const inputRef = useRef({ text: "" });
  const offsetRef = useRef({ value: 0 });
  const [storeData, setStoreData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [bestOffers, setBestOffers] = useState([]);
  const [imgUrl, setImgUrl] = useState(imageData[0]?.url);
  const { storeLocation, getLocationName } = useLocationHandler();
  const {
    user,
    clearSearch,
    googlPhotoReference: { loading: photoLoader, reference },
  } = useSelector((state) => state.user);
  const { isConnected } = useNetInfo();
  const {
    token: { access_token: token },
    location,
    locationName,
  } = useSelector((state) => state.user);

  const geoLocation = {
    radius: 2000000,
    lat: location?.latitude,
    lng: location?.longitude,
  };

  const context = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  // useEffect(() => {
  //   if (location?.place_id) {
  //     dispatch(
  //       userSlice.actions.getHomePicture({
  //         lat: location?.latitude,
  //         lng: location?.longitude,
  //       })
  //     );
  //   }
  // }, [location?.place_id]);

  const [onSearchStoreFun, { data, loading, error }] = useLazyQuery(
    getStoreByCategoryFilter,
    {
      context,
      fetchPolicy: "network-only",
      variables: {
        geoLocation: {
          lat: location?.latitude,
          lng: location?.longitude,
          radius: 20000,
        },
        pagination: {
          limit: 50,
          offset: offsetRef?.current.value,
        },
      },
      onCompleted: (data) => {
        console.log(
          {
            lat: location?.latitude,
            lng: location?.longitude,
            radius: 20000,
          },
          "TEST------"
        );
        let prevData = [];
        prevData = prevData.concat(data?.StoresByCategoryFilter);
        // for removing data which have same name...can't take id coz id is different
        prevData = [
          ...new Map(prevData.map((item) => [item["name"], item])).values(),
        ];
        setStoreData(prevData);
      },
    }
  );

  const [onGetGuestStores, { loading: guestLoading }] = useLazyQuery(
    getGuestStores,
    {
      context,
      variables: {
        geoLocation,
      },
      onCompleted: (data) => {
        let prevData = [...storeData];
        prevData = prevData.concat(data?.AllStoresGuest);
        // for removing data which have same name...can't take id coz id is different
        prevData = [
          ...new Map(prevData.map((item) => [item["name"], item])).values(),
        ];
        const filtered = prevData?.slice(0, 200);
        setStoreData(filtered);
      },
    }
  );
  const [onGetBestOffers, { loading: offerLoading }] = useLazyQuery(
    getBestOffers,
    {
      context,
      variables: {},
      onCompleted: (data) => {
        if (data?.FeaturedOffers) {
          setBestOffers(data?.FeaturedOffers);
          console.log(data?.FeaturedOffers, "FeaturedOffers");
        }
      },
    }
  );
  const [
    onGetRewardStore,
    {
      data: rewardStoreData,
      loading: rewardStoreLoading,
      error: rewardStoreError,
    },
  ] = useLazyQuery(getStoresByCategoryId, {
    context,
    fetchPolicy: "network-only",
    variables: {
      categoryId: 177,
      geoLocation: {
        lat: location?.latitude,
        lng: location?.longitude,
      },
    },
  });

  useEffect(() => {
    setStoreData([]);
    loadHomeData();
  }, [location?.latitude, location?.longitude]);
  const loadHomeData = () => {
    /*  if (user?.id) { */
    onSearchStoreFun();
    onGetRewardStore();
    onGetBestOffers();
    /* } else onGetGuestStores(); */
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };
  const onEndReached = () => {
    if (user?.id) {
      offsetRef.current.value = storeData?.length + 1;
      onSearchStoreFun();
    }
  };

  const onSearchHandler = (text) => {
    inputRef.current.text = text;
  };
  const onSearch = () => navigator.navigate("SearchPage");
  const openChangeLoc = () => navigator.navigate("ChooseLocationPage");
  const onSubmitSearch = () => {
    if (inputRef.current?.text?.length > 0) {
      navigator.navigate("SearchPage", { searchVal: inputRef.current.text });
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (inputRef.current?.text?.length > 0) {
        inputRef?.current.clear();
        onSearchHandler("");
      }
    }, [])
  );

  /* if (clearSearch === true) {
    onSearchHandler("");
    dispatch(userSlice.actions.onClearSearch({ flag: false }));
  } */

  useEffect(() => {
    if (location?.latitude === undefined || location?.longitude === undefined) {
      getUserLocation();
    }
  }, []);

  useEffect(() => {
    if (locationName === "" || locationName === undefined) {
      const data = {
        address: `${location?.latitude},${location?.longitude}`,
      };
      getLocationName(data);
    }
    const randNum = Math.floor(Math.random() * 10) + 1;
    setImgUrl(
      imageData[randNum]?.url ? imageData[randNum]?.url : imageData[0]?.url
    );
  }, [locationName, location]);

  const getUserLocation = () => {
    getLocation()
      .then(async (result) => {
        const location = {
          latitude: result.coords.latitude,
          longitude: result.coords.longitude,
        };
        storeLocation(location);
      })
      .catch((error) => console.error(error));
  };

  const onChooseSuggestedCard = (id, name) => {
    dispatch(
      categorySlice.actions.chooseCategory({
        item: {
          id,
          name,
        },
      })
    );
    if (user?.id) {
      navigator.navigate("Categories", {
        screen: "CategoryDetailsPage",
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
          prev: "HomePage",
        },
      });
    }
  };

  // const URI = reference
  //   ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&photo_reference=${reference}&key=AIzaSyDEiUAV5F31laqlntyJKANZ0jcZYEFoPKM`
  //   : "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZHViYWl8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60";

  const renderHeader = () => (
    <>
      {renderBackground()}
      {rewardStoreData?.StoresByCategory?.length > 0 && (
        <>
          <Text style={[styles.txtDark, styles.spacer]}>
            {C.strings.TRENDING_THIS_WEEK}
          </Text>
          <FlatList
            horizontal
            renderItem={renderRecommendedStores}
            showsHorizontalScrollIndicator={false}
            data={rewardStoreData?.StoresByCategory}
            contentContainerStyle={styles.recommendList}
            keyExtractor={(item) => item?.id.toString()}
          />
        </>
      )}
      {bestOffers.length > 0 ? (
        <>
          <Text style={[styles.txtDark, styles.spacer, { marginBottom: 0 }]}>
            {C.strings.BEST_OFFERS}
          </Text>
          <View style={[commonStyles.align.rowEvenly]}>
            <FlatList
              horizontal
              data={bestOffers}
              renderItem={renderOfferCard}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.recommendList}
              keyExtractor={(item) => item?.id.toString()}
            />
          </View>
        </>
      ) : null}
      <Text style={[styles.txtDark, styles.spacer, { marginBottom: 0 }]}>
        {C.strings.CURATED_FOR_YOU}
      </Text>
      <View style={[commonStyles.align.rowBetween, styles.p10]}>
        <View style={styles.masonry}>
          <CuratedCard
            isSpacer
            height={250}
            title="Newly Opened"
            img={require("../../assets/images/jpeg/curated3.jpeg")}
            onClick={() => onChooseSuggestedCard(46, "Newly Opened")}
          />
          <CuratedCard
            isSpacer
            height={100}
            title="Attractions"
            img={require("../../assets/images/jpeg/curated1.jpeg")}
            onClick={() => onChooseSuggestedCard(30, "Attractions")}
          />
        </View>
        <View style={styles.masonry}>
          <CuratedCard
            isSpacer
            height={180}
            title="Flowers"
            img={require("../../assets/images/jpeg/curated2.jpeg")}
            onClick={() => onChooseSuggestedCard(180, "Flowers")}
          />
          <CuratedCard
            isSpacer
            height={170}
            title="Kids Learning"
            img={require("../../assets/images/jpeg/curated4.jpeg")}
            onClick={() => onChooseSuggestedCard(38, "Kids Learning")}
          />
        </View>
      </View>
      {storeData?.length > 0 && (
        <Text style={[styles.txtDark, styles.spacer]}>
          {C.strings.ATTRACTIONS_NEAR_BY}
        </Text>
      )}
    </>
  );

  const renderBackground = () => (
    <View style={[commonStyles.align.flex1]}>
      {photoLoader || loading ? (
        <SkeltonLoader
          style={{
            width: MAX_WIDTH,
            height: MAX_HEIGHT,
          }}
        />
      ) : (
        <ImageBackground
          resizeMode="cover"
          style={styles.bgImage}
          source={{
            uri: imgUrl,
            width: MAX_WIDTH,
            height: MAX_HEIGHT,
          }}
        />
      )}
      <TouchableOpacity
        onPress={openChangeLoc}
        style={[styles.locIcon, commonStyles.align.row]}
      >
        <LocationRedIcon />
        <Text numberOfLines={1} style={styles.txtWhite}>
          {locationName}
        </Text>
      </TouchableOpacity>
      <SearchContainer
        ref={inputRef}
        onSubmit={onSubmitSearch}
        onChange={onSearchHandler}
        hideIcon={true}
        value={inputRef.current.text}
        placeholder={C.strings.SEARCH_DESC}
        containerStyle={styles.searchStyle}
      />
    </View>
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
      {/* <Text style={styles.footerTxt}>Live</Text>
      <Text style={styles.footerTxt}>it up!</Text>
      <Text style={styles.footerTxtBtm}>made with ♥️ LymData Labs</Text> */}
    </View>
  );

  const renderOfferCard = ({ item }) => {
    const onCardHandler = () => {
      if (user?.id) {
        navigator.navigate("StorePage", {
          id: item?.storeId,
        });
      } else {
        dispatch(
          authSlice.actions.setNavParams({
            mainParent: "StorePage",
            params: { id: item?.storeId },
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
    return (
      <HomeOfferCard
        priceType={item?.priceType || "percentage"}
        offerValue={item?.offerValue}
        title={item?.shortTitle}
        onCardHandler={onCardHandler}
        storeId={item?.storeId}
        image={item?.OfferImage?.location}
      />
    );
  };

  return (
    <>
      <CustomStatusBar enableTop={false} />
      <View style={[commonStyles.align.flex1, styles.bg]}>
        {!isConnected &&
        storeData?.length === 0 &&
        rewardStoreData?.StoresByCategory?.length === 0 &&
        bestOffers.length === 0 ? (
          <Offlinepage />
        ) : loading && storeData?.length === 0 ? (
          <FlatList
            bounces={false}
            data={loaderData}
            style={styles.listStyle}
            renderItem={renderLoader}
            ListEmptyComponent={renderEmpty}
            ListHeaderComponent={renderHeader}
            ListFooterComponent={renderFooter}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item?.id.toString()}
          />
        ) : (
          <FlatList
            bounces={false}
            data={storeData}
            renderItem={renderNearByStores}
            ListEmptyComponent={renderEmpty}
            ListHeaderComponent={renderHeader}
            ListFooterComponent={renderFooter}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item?.id.toString()}
          />
        )}
      </View>
    </>
  );
};

export default HomePage;
