import React from "react";
import { C } from "../../assets";
import { useSelector } from "react-redux";
import { useQuery, useLazyQuery } from "@apollo/client";
import { commonStyles } from "../../styles";
import { withHeader } from "../../hoc/withHeader";
import { View, Text, FlatList } from "react-native";
import { navigator } from "../../routes/navigations";
import { categoryStyles as styles } from "./Categories.style";
import categoryWidthArr from "../../utils/data/categoryWidthArr";
import getAllCategories from "../../graphql/queries/getAllCategories";
import CustomHeader from "../../components/Headers/CustomHeader.component";
import CategoryLoader from "../../components/Loaders/CategoryLoader.component";
import CategoryCard from "../../components/CategoryCard/CategoryCard.component";
import EmptyComponent from "../../components/NoDataContainer/EmptyComponent.component";
import { useEffect } from "react";
import { useState } from "react";
import { useNetInfo } from "@react-native-community/netinfo";
import Offlinepage from "../OffilnePage/Offline.page";

const HeaderComponent = () => {
  const onSearch = () => navigator.navigate("SearchPage");
  return (
    <CustomHeader
      hideShadow
      isBack
      onSearch={onSearch}
      title={C.strings.CATEGORIES}
    />
  );
};

const renderItem = ({ item, index }) => (
  <CategoryCard
    mTop={10}
    mRight={5}
    item={item}
    width={categoryWidthArr[index]?.width}
  />
);

const renderEmpty = () => (
  <EmptyComponent title={C.strings.NO_CATEGORY} viewStyle={styles.emptyStyle} />
);

const BodyComponent = () => {
  const {
    token: { access_token: token },
  } = useSelector((state) => state.user);
  const [categories, setCategories] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { isConnected } = useNetInfo();
  const [onGetCategories, { loading }] = useLazyQuery(getAllCategories, {
    fetchPolicy: "network-only",
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
    onCompleted: (data) => {
      setRefreshing(false);
      setCategories(data?.AllCategories ? data?.AllCategories : []);
    },
  });
  useEffect(() => {
    onGetCategories();
  }, []);

  return (
    <>
      {!isConnected && !categories ? (
        <Offlinepage />
      ) : (
        <View style={[commonStyles.align.flex1, styles.paddView]}>
          {loading ? (
            <CategoryLoader />
          ) : (
            <FlatList
              numColumns={3}
              renderItem={renderItem}
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                onGetCategories();
              }}
              ListEmptyComponent={renderEmpty}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listStyle}
              keyExtractor={(item) => item?.id.toString()}
              data={categories}
            />
          )}
        </View>
      )}
    </>
  );
};

const CategoriesPage = withHeader({ HeaderComponent, BodyComponent });

export default CategoriesPage;
