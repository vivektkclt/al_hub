import React from "react";
import { C } from "../../../assets";
import { useQuery } from "@apollo/client";
import Rating from "react-native-easy-rating";
import { commonStyles } from "../../../styles";
import * as Progress from "react-native-progress";
import { useDispatch, useSelector } from "react-redux";
import sortReview from "../../../utils/data/sortReview";
import { navigator } from "../../../routes/navigations";
import { categorySlice } from "../../../redux/slices/category.slice";
import getStoreReview from "../../../graphql/queries/getStoreReview";
import getStoreDetails from "../../../graphql/queries/getStoreDetails";
import SvgButton from "../../../components/Buttons/SvgButton.component";
import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import LoadingIndicator from "../../../components/Loaders/LoadingIndicator";
import FilterChip from "../../../components/FilterChip/FilterChip.component";
import ReviewCard from "../../../components/ReviewCard/ReviewCard.component";
import EmptyComponent from "../../../components/NoDataContainer/EmptyComponent.component";

const renderItem = ({ item, index }) => <ReviewCard data={item} />;

const renderEmpty = () => (
  <EmptyComponent
    title={C.strings.NO_REVIEWS}
    viewStyle={styles.emptyStyle}
    desc={C.strings.NO_REVIEW_DESC}
  />
);

const RatingProgress = ({ title, progress }) => (
  <View style={[commonStyles.align.rowBetween, styles.wFull]}>
    <Text style={styles.txtDrk}>{title}</Text>
    <Progress.Bar
      height={10}
      borderWidth={0}
      style={styles.progress}
      color={C.colors.primary.primary3}
      width={C.measures.SCREEN_WIDTH / 2}
      unfilledColor={C.colors.secondary.color1}
      progress={progress ? progress * 0.01 : 0}
    />
  </View>
);

const StoreDetailReviewsPage = () => {
  const dispatch = useDispatch();
  const {
    token: { access_token: token },
  } = useSelector((state) => state.user);
  const { selectedStore, selectedReview } = useSelector(
    (state) => state.category
  );
  const context = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const {
    data,
    loading: detailLoading,
    error: detailErr,
  } = useQuery(getStoreDetails, {
    context,
    fetchPolicy: "cache-and-network",
    variables: {
      id: selectedStore?.Store?.id,
    },
  });

  const {
    data: storeReviewData,
    loading,
    error,
  } = useQuery(getStoreReview, {
    variables: {
      storeId: data?.Store?.id,
    },
    context,
    fetchPolicy: "cache-and-network",
  });

  const onSortHandler = (type) => {
    dispatch(categorySlice.actions.setSelectedReview(type));
  };

  const renderSortReview = ({ item, index }) => (
    <FilterChip
      title={item?.title}
      keyExtractor={(item) => item?.id.toString()}
      onHandler={() => onSortHandler(item?.title)}
      isActive={item?.title === selectedReview ? true : false}
    />
  );

  const onRateHandler = () => navigator.navigate("RatingPage");

  const renderHeader = () => (
    <>
      <View style={styles.topView}>
        <Text style={styles.txtTop}>{C.strings.RATING_DESC}</Text>
        <Text style={styles.txtRating}>
          {Math.floor(data?.Store?.averageReviewRating) || 0}
        </Text>
        <Rating
          max={5}
          iconWidth={30}
          iconHeight={30}
          editable={false}
          rating={data?.Store?.averageReviewRating}
          iconSelected={require(`../../../assets/images/png/star-selected.png`)}
          iconUnselected={require(`../../../assets/images/png/star-unselected.png`)}
        />
        {/* <View style={styles.spacer} />
        <RatingProgress progress={20} title={C.strings.EXCELLENT} />
        <RatingProgress progress={0} title={C.strings.GOOD} />
        <RatingProgress progress={10} title={C.strings.AVERAGE} />
        <RatingProgress progress={70} title={C.strings.BAD} />
        <RatingProgress progress={20} title={C.strings.POOR} /> */}
      </View>
      <View style={styles.middleView}>
        <Text style={styles.rateTxt}>{C.strings.RATE_EXP}</Text>
        <Rating
          max={5}
          rating={0}
          iconWidth={30}
          iconHeight={30}
          onRate={onRateHandler}
          iconUnselected={require(`../../../assets/images/png/rate-star.png`)}
          iconSelected={require(`../../../assets/images/png/star-selected.png`)}
        />
      </View>
      {/* <View style={styles.sortView}>
        <Text style={styles.srtTxt}>{C.strings.SORT_BY}</Text>
        <FlatList
          horizontal
          bounces={false}
          data={sortReview}
          renderItem={renderSortReview}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item?.id.toString()}
        />
      </View> */}
    </>
  );

  return (
    <>
      <FlatList
        bounces={false}
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.main}
        showsVerticalScrollIndicator={false}
        data={storeReviewData?.ReviewsByStore}
        keyExtractor={(item) => item?.id.toString()}
      />
      <SvgButton
        showBg
        height={45}
        width={"90%"}
        btnStyle={styles.bottomBtn}
        placeholder={C.strings.RATE}
        onBtnHandler={onRateHandler}
      />
      {(loading || detailLoading) && <LoadingIndicator />}
    </>
  );
};

export default StoreDetailReviewsPage;

const styles = StyleSheet.create({
  main: {
    paddingBottom: 350,
    backgroundColor: C.colors.primary.color1,
  },
  topView: {
    padding: 25,
    paddingBottom: 50,
    alignItems: "center",
    borderBottomWidth: 0.2,
    justifyContent: "center",
    borderColor: C.colors.border.grey,
    backgroundColor: C.colors.primary.color1,
  },
  txtTop: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "600",
    color: C.colors.primary.color2,
  },
  txtRating: {
    fontSize: 50,
    marginBottom: 10,
    fontWeight: "700",
    color: C.colors.primary.color2,
  },
  progress: {
    borderRadius: 10,
  },
  txtDrk: {
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: -0.8,
    color: C.colors.text.darkGry,
  },
  wFull: {
    width: "100%",
    marginBottom: 8,
  },
  spacer: {
    height: 25,
  },
  middleView: {
    padding: 15,
    alignItems: "center",
    borderBottomWidth: 0.2,
    justifyContent: "center",
    borderColor: C.colors.border.grey,
    backgroundColor: C.colors.primary.color1,
  },
  rateTxt: {
    fontSize: 20,
    marginBottom: 15,
    fontWeight: "600",
    color: C.colors.text.darkGry,
  },
  sortView: {
    padding: 15,
    borderBottomWidth: 0.2,
    justifyContent: "center",
    borderColor: C.colors.border.grey,
  },
  srtTxt: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "600",
    color: C.colors.text.darkGry,
  },
  bottomBtn: {
    alignSelf: "center",
    position: "absolute",
    bottom:
      Platform.OS === "ios"
        ? C.measures.SCREEN_HEIGHT / 4.5
        : C.measures.SCREEN_HEIGHT / 5.5,
  },
  emptyStyle: {
    paddingTop: 25,
  },
});
