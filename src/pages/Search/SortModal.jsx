import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  ScrollView,
} from "react-native";
import { useLazyQuery } from "@apollo/client";
import { BlurView } from "@react-native-community/blur";
import SortFilterComponent from "../../components/SortFilterComponent/SortFilterComponent";
import pngImages from "../../assets/images/png";
import colors from "../../assets/values/colors";
import sortOptions from "../../utils/data/sortOptions";
import filterOptions from "../../utils/data/filterOption";
import { hasNotch } from "react-native-device-info";
import getStoreTags from "../../graphql/queries/getStoreTags";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import getAllCategories from "../../graphql/queries/getAllCategories";
import { C } from "../../assets";
import { categorySlice } from "../../redux/slices/category.slice";
import { navigator } from "../../routes/navigations";
const SortModal = ({
  isOpen = false,
  sortSelected = "nearest",
  filtersSelected = [],
  restaurantSelected = [],
  option = "sort",
  onApply = null,
}) => {
  const dispatch = useDispatch();
  const {
    location,
    token: { access_token: token },
    user,
  } = useSelector((state) => state.user);
  const [optionType, setOptionType] = useState(option);
  const [filterOption, setFilterOption] = useState(0);
  const [restaurant, setRestaurant] = useState([]);
  // const [filterOptions, setFilterOptions] = useState([
  //   { main: "Tags", subItems: [] },
  //   { main: "Categories", subItems: [] },
  // ]);
  const [sort, setSort] = useState(sortSelected);
  const [selectedFilters, setFilters] = useState([]);
  const geoLocation = {
    lat: location?.latitude,
    lng: location?.longitude,
  };
  // const [onSearchStoreTagsFun, { loading }] = useLazyQuery(getStoreTags, {
  //   variables: {
  //     geoLocation,
  //     limit: 10,
  //   },
  //   fetchPolicy: "network-only",
  //   context: {
  //     headers: {
  //       authorization: `Bearer ${token}`,
  //     },
  //   },
  //   onCompleted: (data) => {
  //     const filterData = data?.getTags.map((value) => ({ value, name: value }));
  //     const indexOfData = filterOptions.findIndex(
  //       (item) => item?.main === "Tags"
  //     );

  //     if (indexOfData !== -1) {
  //       filterOptions[indexOfData].subItems = filterData;

  //       setFilterOptions([...filterOptions]);
  //     }
  //   },
  // });
  // const [onGetCategories, { loadingCategories }] = useLazyQuery(
  //   getAllCategories,
  //   {
  //     fetchPolicy: "network-only",
  //     context: {
  //       headers: {
  //         authorization: `Bearer ${token}`,
  //       },
  //     },
  //     onCompleted: (data) => {
  //       console.log(data?.AllCategories, "CATEGORY_DATA");
  //       // setRefreshing(false);
  //       const filterData = data?.AllCategories.map((item) => ({
  //         value: item?.id,
  //         name: item?.name,
  //         category: item,
  //       }));
  //       const indexOfData = filterOptions.findIndex(
  //         (item) => item?.main === "Categories"
  //       );
  //       if (indexOfData !== -1) {
  //         filterOptions[indexOfData].subItems = filterData;
  //         console.log(filterOptions, "OPTIONS=====");
  //         setFilterOptions([...filterOptions]);
  //       }
  //     },
  //   }
  // );
  // useEffect(() => {
  //   onSearchStoreTagsFun();
  //   onGetCategories();
  //   setOptionType(option);
  // }, [option]);
  useEffect(() => {
    setFilters(filtersSelected);
    setSort(sortSelected);
    setRestaurant(restaurantSelected);
  }, [filtersSelected, filterOptions, sortSelected, restaurantSelected]);
  const updateFilter = (item) => {
    if (!item?.isRestaurant) {
      let filters = [...selectedFilters];
      if (filters.includes(item?.value)) {
        // If the value exists in the array, remove it
        const index = filters.indexOf(item?.value);
        if (index !== -1) {
          filters.splice(index, 1);
        }
      } else {
        // If the value doesn't exist in the array, add it
        filters.push(item?.value);
      }
      setFilters(filters);
    } else {
      setRestaurant(
        restaurant.length > 0 && restaurant[0] === item?.value
          ? []
          : [item?.value]
      );
    }
  };
  const onChooseCategory = (item) => {
    onApply({ filters: selectedFilters, sort: sort });
    dispatch(categorySlice.actions.chooseCategory({ item }));
    if (user?.id) {
      navigator.navigate("CategoryDetailsPage");
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
          prev: "Categories",
        },
      });
    }
  };
  const sortList = () => {
    return (
      <FlatList
        scrollEnabled={false}
        data={sortOptions}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setSort(item?.value);
            }}
            style={styles.sortItemContainer}
          >
            <Image
              style={styles.optionSelectImg}
              source={
                sort === item?.value
                  ? pngImages.radioSelected
                  : pngImages.radioUnselect
              }
            />
            <Text style={styles.sortItemTxt}>{item?.name}</Text>
          </TouchableOpacity>
        )}
      />
    );
  };
  const filterView = () => {
    return (
      <>
        {filterOptions.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setFilterOption(filterOption === index ? null : index);
              }}
              style={{
                minHeight: 40,
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderColor: C.colors.border.grey,
              }}
            >
              <View style={styles.filterContainer}>
                <View style={styles.filterTitleContainer}>
                  <Text
                    style={{
                      color: C.colors.text.color1,
                      fontWeight: "500",
                      fontSize: 16,
                    }}
                  >
                    {item?.main}
                  </Text>
                  <Image
                    style={[
                      styles.arrowImg,
                      {
                        transform: [
                          {
                            rotate: filterOption === index ? "0deg" : "-90deg",
                          },
                        ],
                      },
                    ]}
                    source={pngImages.arrowDown}
                  />
                </View>
                {filterOption === index ? (
                  <>
                    {item?.subItems.map((subItem) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            updateFilter(subItem);
                          }}
                          style={styles.filterSubContainer}
                        >
                          <Image
                            style={{
                              height: 20,
                              width: 20,
                              tintColor: C.colors.primary.color1,
                            }}
                            source={
                              selectedFilters.includes(subItem?.value) ||
                              (restaurant.length > 0 &&
                                restaurant[0] === subItem?.value)
                                ? subItem?.isRestaurant
                                  ? pngImages.radioSelected
                                  : pngImages.checkSelected
                                : subItem?.isRestaurant
                                ? pngImages.radioUnselect
                                : pngImages.checkUnselect
                            }
                          />
                          <Text
                            style={{ color: C.colors.text.color1, left: 10 }}
                          >
                            {subItem?.label}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </>
                ) : null}
              </View>
            </TouchableOpacity>
          );
        })}
      </>
    );
  };
  return (
    <Modal transparent visible={isOpen}>
      <SafeAreaView style={{ flex: 1, minHeight: "100%" }}>
        <BlurView blurAmount={5} style={styles.background} />

        <View style={styles.contentContainer}>
          <View style={styles.topContainer}>
            <SortFilterComponent
              limit={2}
              isModal={true}
              isClear={true}
              onPress={(value) => {
                if (value === "clear") {
                  onApply({
                    filters: [],
                    sort: sort,
                    restaurant: [],
                  });
                }
              }}
              option={optionType}
            />
          </View>
          <ScrollView style={{ paddingBottom: 100 }}>
            <View style={{ width: "90%", alignSelf: "center", marginTop: 10 }}>
              <Text style={styles.titleTxt}>Sort By</Text>
              {sortList()}
            </View>
            {filterView()}
            <View style={{ height: 150 }} />
          </ScrollView>
          <TouchableOpacity
            onPress={() =>
              onApply({
                filters: selectedFilters,
                sort: sort,
                restaurant: restaurant,
              })
            }
            style={styles.applyBtn}
          >
            <Text style={styles.titleTxt}>Show Results</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    position: "absolute",
    top: 0,
    width: "100%",
    maxHeight: C.measures.SCREEN_HEIGHT,
  },
  topContainer: {
    backgroundColor: C.colors.primary.color1,
    height: Platform.OS == "ios" ? 110 : 70,
    padding: 10,
    justifyContent: "flex-end",
  },
  background: {
    flex: 1,
    minHeight: "100%",
    backgroundColor: C.colors.bg.shadow5,
  },
  cardContainer: {
    minHeight: 250,
    backgroundColor: C.colors.bg.shadow5,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    width: "100%",
    padding: 10,
  },
  sortItemContainer: {
    flexDirection: "row",
    padding: 15,
    // justifyContent: "space-between",
  },
  sortItemTxt: {
    color: colors.primary.color1,
    fontWeight: "bold",
    fontSize: 14,
    maxWidth: "90%",
    left: 10,
  },
  titleTxt: {
    color: colors.primary.color1,
    fontWeight: "bold",
    fontSize: 15,
    maxWidth: "90%",
  },
  filterItemTxt: {
    color: colors.primary.color1,
    fontWeight: "bold",
    fontSize: 14,
    maxWidth: "70%",
  },
  filterTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "95%",
    alignSelf: "center",
  },
  optionSelectImg: { width: 20, height: 20 },
  filterSelectImg: { width: 15, height: 15 },
  applyBtn: {
    width: "90%",
    height: 40,
    backgroundColor: C.colors.primary.color2,
    bottom: 30,
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 8,
    justifyContent: "center",
  },
  filterContainer: { width: "90%", alignSelf: "center", marginTop: 10 },
  filterItemContainer: {
    minHeight: 40,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: C.colors.border.grey,
    paddingBottom: 10,
  },
  btnContainer: {
    marginTop: 20,
    paddingBottom: 10,
    flexDirection: "row",
    alignSelf: "flex-end",
  },
  filterSubContainer: {
    flexDirection: "row",
    minHeight: 40,
    alignItems: "center",
    width: "85%",
    alignSelf: "center",
  },
  arrowImg: { width: 25, height: 25, marginLeft: 10, tintColor: "white" },
});

export default SortModal;
